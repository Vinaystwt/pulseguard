'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEther } from 'viem'
import { PULSEGUARD_ABI, PULSEGUARD_ADDRESS, somniaTestnet } from '@/lib/somnia'

export default function CreateMarket() {
  const router = useRouter()
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('2592000') // 30 days default
  const [liquidity, setLiquidity] = useState('1')

  const { data: count }: any = useReadContract({
    address: PULSEGUARD_ADDRESS as `0x${string}`,
    abi: PULSEGUARD_ABI,
    functionName: 'marketCount',
  })

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (isSuccess) {
      const nextId = count ? Number(count) + 1 : 41
      // We wait a second for the blockchain state to settle
      setTimeout(() => router.push(`/market/${nextId}`), 1500)
    }
  }, [isSuccess, count, router])

  const handleCreate = () => {
    if (!isConnected) return alert("Connect Wallet First!")
    
    writeContract({
      address: PULSEGUARD_ADDRESS as `0x${string}`,
      abi: PULSEGUARD_ABI,
      functionName: 'createMarket',
      args: [title, BigInt(duration)],
      value: parseEther(liquidity),
      gas: BigInt(3000000), // Forced gas limit for Somnia
      chainId: somniaTestnet.id
    })
  }

  if (!mounted) return null

  return (
    <div className="max-w-2xl mx-auto pt-20 px-6">
      <div className="bg-[#0f0f13] border border-white/5 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-50" />
        
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Launch Market</h1>
          <p className="text-white/40 text-[10px] mt-2 font-mono uppercase tracking-[0.3em]">Protocol / New Permissionless Pool</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Market Question</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Will BTC hit $1M this year?" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-indigo-500/50 outline-none transition-all text-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Duration (Seconds)</label>
              <input 
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Initial Liquidity (STT)</label>
              <input 
                type="number"
                value={liquidity}
                onChange={(e) => setLiquidity(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-mono"
              />
            </div>
          </div>

          <button 
            onClick={handleCreate}
            disabled={isPending || isConfirming || !title}
            className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/30 transition-all disabled:opacity-20 active:scale-95"
          >
            {isPending ? 'Check MetaMask...' : isConfirming ? 'Deploying to Somnia...' : 'Initialize Market ⚡️'}
          </button>

          {writeError && (
            <p className="text-red-400 text-[10px] font-mono text-center uppercase tracking-widest">Error: {writeError.message.slice(0, 50)}...</p>
          )}
        </div>
      </div>
    </div>
  )
}
