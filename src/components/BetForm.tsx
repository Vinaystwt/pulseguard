'use client'
import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { PULSEGUARD_ABI, PULSEGUARD_ADDRESS, somniaTestnet } from '@/lib/somnia'
import { InstantReplay } from './InstantReplay'
import { PositionTimeline } from './PositionTimeline'

const QUICK_AMOUNTS = ['1', '10', '50', '100']

export function BetForm({ marketId, yesOdds, noOdds, marketTitle = "PulseGuard Market" }: any) {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const { data: posData, refetch }: any = useReadContract({
    address: PULSEGUARD_ADDRESS as `0x${string}`,
    abi: PULSEGUARD_ABI,
    functionName: 'positions',
    args: [BigInt(marketId), address],
    query: { enabled: !!address }
  })

  const hasPosition = posData ? posData[4] : false
  const posAmount = posData ? formatEther(posData[0]) : '0'
  const posIsYes = posData ? posData[1] : true

  const [mounted, setMounted] = useState(false)
  const [side, setSide] = useState<'YES' | 'NO'>('YES')
  const [amount, setAmount] = useState('10')
  const [guardMode, setGuardMode] = useState(true)
  const [stopLoss, setStopLoss] = useState(10)
  const [takeProfit, setTakeProfit] = useState(25)
  const [showReplay, setShowReplay] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { if (isSuccess) { setShowReplay(true); refetch(); } }, [isSuccess, refetch])

  const payout = (amt: string) => (parseFloat(amt || '0') / ((side === 'YES' ? yesOdds : noOdds) / 100)).toFixed(2)
  const activeOdds = side === 'NO' ? noOdds : yesOdds
  const slOdds = Math.max(1, Math.round(activeOdds * (1 - stopLoss / 100)))
  const tpOdds = Math.min(99, Math.round(activeOdds * (1 + takeProfit / 100)))

  const handleBet = () => {
    writeContract({
      address: PULSEGUARD_ADDRESS as `0x${string}`,
      abi: PULSEGUARD_ABI,
      functionName: 'placeBet',
      args: [BigInt(marketId), side === 'YES', guardMode ? BigInt(stopLoss) : BigInt(0), guardMode ? BigInt(takeProfit) : BigInt(0)],
      value: parseEther(amount),
      gas: BigInt(3000000), 
      chainId: somniaTestnet.id
    })
  }

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {hasPosition && (
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-5 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest">Active Position</p>
            <span className="bg-green-500/20 text-green-400 text-[9px] px-2 py-0.5 rounded border border-green-500/20 animate-pulse">LIVE</span>
          </div>
          <h4 className="text-white font-black text-xl">{posAmount} STT on {posIsYes ? 'YES' : 'NO'}</h4>
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
            <div className="text-[10px] text-white/40 uppercase">Potential Payout: <span className="text-white font-mono ml-2">{(parseFloat(posAmount) / ((posIsYes ? yesOdds : noOdds)/100)).toFixed(2)} STT</span></div>
          </div>
        </div>
      )}

      <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30" />
        {showReplay && <InstantReplay trigger={guardMode ? 'STOP_LOSS' : 'BET_PLACED'} marketTitle={marketTitle} blockNumber={777} onClose={() => setShowReplay(false)} />}
        
        <div className="flex gap-2">
          <button onClick={() => setSide('YES')} className={`flex-1 py-4 rounded-xl font-bold text-sm border transition-all ${side === 'YES' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-white/5 border-transparent text-white/20'}`}>YES {yesOdds}¢</button>
          <button onClick={() => setSide('NO')} className={`flex-1 py-4 rounded-xl font-bold text-sm border transition-all ${side === 'NO' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-white/5 border-transparent text-white/20'}`}>NO {noOdds}¢</button>
        </div>

        <div className="space-y-3">
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-lg focus:border-indigo-500/50 outline-none" placeholder="10" />
          <div className="grid grid-cols-4 gap-2">
            {QUICK_AMOUNTS.map(v => <button key={v} onClick={() => setAmount(v)} className="py-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono text-white/30 hover:text-white transition-all">{v} STT</button>)}
          </div>
        </div>

        <div className={`border rounded-xl p-4 space-y-4 ${guardMode ? 'bg-indigo-500/[0.03] border-indigo-500/20' : 'bg-white/[0.02] border-white/5'}`}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-white/80">Guard Mode 🛡</p>
            <button onClick={() => setGuardMode(!guardMode)} className={`w-10 h-5 rounded-full transition-colors ${guardMode ? 'bg-indigo-600' : 'bg-white/10'} relative`}>
              <span className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${guardMode ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
          {guardMode && (
            <div className="space-y-4 pt-4 border-t border-white/5">
               <div className="flex gap-1.5">{[5, 10, 15, 20].map(v => <button key={v} onClick={() => setStopLoss(v)} className={`flex-1 py-2 rounded-lg text-[10px] font-mono border ${stopLoss === v ? 'border-red-500/50 text-red-400' : 'border-white/5 text-white/20'}`}>-{v}%</button>)}</div>
               <div className="flex gap-1.5">{[10, 25, 50, 100].map(v => <button key={v} onClick={() => setTakeProfit(v)} className={`flex-1 py-2 rounded-lg text-[10px] font-mono border ${takeProfit === v ? 'border-green-500/50 text-green-400' : 'border-white/5 text-white/20'}`}>+{v}%</button>)}</div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono uppercase text-white/20 tracking-tighter">
          <span>Potential Return</span>
          <span className="text-indigo-400 font-bold text-sm">{payout(amount)} STT (+{((parseFloat(payout(amount)) / parseFloat(amount || '1') - 1) * 100).toFixed(0)}%)</span>
        </div>

        <button onClick={handleBet} disabled={isPending || isConfirming || hasPosition} className={`w-full py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${hasPosition ? 'bg-white/5 text-white/10 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'}`}>
          {hasPosition ? 'Position Active' : isPending ? 'Check Wallet...' : isConfirming ? 'Finalizing...' : `Place ${side} Bet`}
        </button>
      </div>

      <PositionTimeline marketId={marketId} entryOdds={activeOdds} currentOdds={activeOdds} stopLoss={guardMode ? slOdds : 1} takeProfit={guardMode ? tpOdds : 99} isYes={side !== 'NO'} />
    </div>
  )
}
