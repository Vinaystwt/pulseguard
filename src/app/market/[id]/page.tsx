'use client'
import { use, useState, useEffect } from 'react'
import { MARKETS } from '@/lib/markets'
import { BetForm } from '@/components/BetForm'
import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { PULSEGUARD_ABI, PULSEGUARD_ADDRESS, somniaTestnet } from '@/lib/somnia'
import Link from 'next/link'

export default function MarketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [lpAmount, setLpAmount] = useState('10')
  useEffect(() => { setMounted(true) }, [])

  const staticMarket = MARKETS.find((m) => m.id === id)
  const { data: onChainMarket }: any = useReadContract({
    address: PULSEGUARD_ADDRESS as `0x${string}`,
    abi: PULSEGUARD_ABI,
    functionName: 'markets',
    args: [BigInt(id)],
  })

  const { writeContract } = useWriteContract()

  if (!mounted) return null

  const handleSeed = (isYes: boolean) => {
    writeContract({
      address: PULSEGUARD_ADDRESS as `0x${string}`,
      abi: PULSEGUARD_ABI,
      functionName: 'seedLiquidity',
      args: [BigInt(id), isYes],
      value: parseEther(lpAmount),
      gas: BigInt(2500000),
      chainId: somniaTestnet.id
    })
  }

  const handleClaim = () => {
    writeContract({
      address: PULSEGUARD_ADDRESS as `0x${string}`,
      abi: PULSEGUARD_ABI,
      functionName: 'claimFees',
      args: [BigInt(id)],
      chainId: somniaTestnet.id
    })
  }

  const question = staticMarket?.title || onChainMarket?.[0] || "Syncing with Somnia..."
  
  let displayYesPool = "0.5"
  let displayNoPool = "0.5"

  if (staticMarket) {
    const rawVol = parseInt(staticMarket.volume.replace(/,/g, ''))
    displayYesPool = Math.round(rawVol * (staticMarket.yesOdds / 100)).toLocaleString()
    displayNoPool = Math.round(rawVol * (staticMarket.noOdds / 100)).toLocaleString()
  } else if (onChainMarket) {
    displayYesPool = parseFloat(formatEther(onChainMarket[2])).toFixed(1)
    displayNoPool = parseFloat(formatEther(onChainMarket[3])).toFixed(1)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20 pb-20">
      <Link href="/" className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] hover:text-indigo-400 mb-6 inline-block">
        ← HUB_TERMINAL
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight leading-tight">{question}</h1>
            <div className="flex gap-4 mt-4 text-[9px] font-mono text-white/20 uppercase tracking-widest">
              <p>Registry: <span className="text-white/60">#{id}</span></p>
              <p>Volume: <span className="text-white/60">{staticMarket?.volume || (parseFloat(displayYesPool) + parseFloat(displayNoPool)).toFixed(1) + " STT"}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6 shadow-xl border-l-2 border-l-green-500/40">
                <p className="text-3xl font-black text-green-400 mb-1">{staticMarket?.yesOdds || 50}¢</p>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">YES POOL: {displayYesPool} STT</p>
             </div>
             <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6 shadow-xl border-l-2 border-l-red-500/40">
                <p className="text-3xl font-black text-red-400 mb-1">{staticMarket?.noOdds || 50}¢</p>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">NO POOL: {displayNoPool} STT</p>
             </div>
          </div>

          <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
               <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Market Sentiment Index</p>
               <span className="flex items-center gap-2 px-2 py-0.5 rounded border border-green-500/20 bg-green-500/5">
                 <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[8px] font-mono text-green-500 uppercase">Live Feed</span>
               </span>
            </div>
            <div className="h-32 flex items-end gap-2 px-2">
               {[20, 45, 30, 65, 80, 50, 40, 25, 60, 45].map((h, i) => (
                 <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-500/10 border-t border-indigo-500/30 rounded-t-sm" />
               ))}
            </div>
          </div>

          {/* 💧 SEED LIQUIDITY HUB - ALIGNMENT FIX */}
          <div className="bg-indigo-500/[0.03] border border-indigo-500/20 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">💧</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Seed Liquidity Hub</h3>
              </div>
              <button onClick={handleClaim} className="text-[8px] font-bold bg-indigo-500 text-white px-3 py-1.5 rounded uppercase tracking-widest hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20">Claim Fees</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Provision Capital</p>
                <div className="space-y-3">
                  <input type="number" value={lpAmount} onChange={(e) => setLpAmount(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm outline-none focus:border-indigo-500/40 transition-all" />
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleSeed(true)} className="py-3 rounded-xl border border-green-500/30 text-[9px] font-bold text-green-400 hover:bg-green-500/10 uppercase transition-all">Seed YES</button>
                    <button onClick={() => handleSeed(false)} className="py-3 rounded-xl border border-red-500/30 text-[9px] font-bold text-red-400 hover:bg-red-500/10 uppercase transition-all">Seed NO</button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Recent LP Activity</p>
                <div className="space-y-2 bg-black/20 rounded-xl p-4">
                  {[
                    { addr: '0x94c...14ac', act: 'Seeded 50 STT YES', time: '2m ago' },
                    { addr: '0x21b...e92f', act: 'Claimed 4.2 STT Fees', time: '14m ago' }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <span className="text-indigo-400">{row.addr}</span>
                      <span className="text-white/60">{row.act}</span>
                      <span className="text-white/20">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <BetForm marketId={id} yesOdds={staticMarket?.yesOdds || 50} noOdds={staticMarket?.noOdds || 50} marketTitle={question} />
        </div>
      </div>
    </div>
  )
}
