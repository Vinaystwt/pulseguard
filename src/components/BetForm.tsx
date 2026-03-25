'use client'
import { useState, useEffect } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { PULSEGUARD_ABI, PULSEGUARD_ADDRESS } from '@/lib/somnia'
import { InstantReplay } from './InstantReplay'
import { PositionTimeline } from './PositionTimeline'

const STOP_LOSS_OPTIONS = [5, 10, 15, 20]
const TAKE_PROFIT_OPTIONS = [10, 25, 50, 100]

interface BetFormProps {
  marketId: string
  yesOdds: number
  noOdds: number
  marketTitle?: string
}

export function BetForm({ marketId, yesOdds, noOdds, marketTitle = "PulseGuard Market" }: BetFormProps) {
  const { address, isConnected } = useAccount()
  const { writeContract, isPending } = useWriteContract()

  const [mounted, setMounted] = useState(false)
  const [side, setSide] = useState<'YES' | 'NO' | null>(null)
  const [amount, setAmount] = useState('')
  const [guardMode, setGuardMode] = useState(false)
  const [stopLoss, setStopLoss] = useState(10)
  const [takeProfit, setTakeProfit] = useState(25)
  const [txStatus, setTxStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showReplay, setShowReplay] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const estimatedPayout = () => {
    if (!amount || !side) return null
    const odds = side === 'YES' ? yesOdds : noOdds
    return (parseFloat(amount) / (odds / 100)).toFixed(3)
  }

  // Calculate live dynamic odds for the timeline based on percentages
  const activeOdds = side === 'NO' ? noOdds : yesOdds
  const slOdds = Math.max(1, Math.round(activeOdds * (1 - stopLoss / 100)))
  const tpOdds = Math.min(99, Math.round(activeOdds * (1 + takeProfit / 100)))

  const handleBet = () => {
    if (!isConnected || !side || !amount) return
    
    setShowReplay(true)
    
    writeContract(
      {
        address: PULSEGUARD_ADDRESS,
        abi: PULSEGUARD_ABI,
        functionName: 'placeBet',
        args: [
          BigInt(marketId),
          side === 'YES',
          guardMode ? BigInt(stopLoss) : BigInt(0),
          guardMode ? BigInt(takeProfit) : BigInt(0),
        ],
        value: parseEther(amount),
      },
      {
        onSuccess: () => setTxStatus('success'),
        onError: () => setTxStatus('error'),
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6 space-y-5">
        <p className="text-xs font-mono uppercase tracking-wider text-white/30">Place Your Bet</p>

        {showReplay && (
          <InstantReplay 
            trigger={guardMode ? 'STOP_LOSS' : 'BET_PLACED'} 
            marketTitle={marketTitle} 
            blockNumber={8291443} 
            onClose={() => setShowReplay(false)} 
          />
        )}

        {/* YES / NO selector */}
        <div className="flex gap-3">
          <button
            onClick={() => setSide('YES')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${
              side === 'YES'
                ? 'bg-green-500/20 border-green-500 text-green-400'
                : 'border-white/10 text-white/40 hover:border-green-500/40 hover:text-green-400/60'
            }`}
          >
            YES {yesOdds}¢
          </button>
          <button
            onClick={() => setSide('NO')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${
              side === 'NO'
                ? 'bg-red-500/20 border-red-500 text-red-400'
                : 'border-white/10 text-white/40 hover:border-red-500/40 hover:text-red-400/60'
            }`}
          >
            NO {noOdds}¢
          </button>
        </div>

        {/* Amount input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-white/30 uppercase tracking-wider">Amount (STT)</label>
          <div className="flex items-center border border-white/10 rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-colors">
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
            />
            <span className="px-4 text-xs font-mono text-white/30">STT</span>
          </div>
          <div className="flex gap-2 mt-2">
            {['10', '50', '100', '500'].map(v => (
              <button
                key={v}
                onClick={() => setAmount(v)}
                className="flex-1 text-[11px] font-mono py-1.5 rounded-lg border border-white/10 text-white/40 hover:border-indigo-500/40 hover:text-indigo-400 transition-colors"
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Guard Mode toggle */}
        <div className="border border-white/5 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Guard Mode</p>
              <p className="text-[11px] text-white/30 font-mono mt-0.5">Auto-exit fires in the same block</p>
            </div>
            <button
              onClick={() => setGuardMode(g => !g)}
              className={`relative w-11 h-6 rounded-full transition-colors ${guardMode ? 'bg-indigo-600' : 'bg-white/10'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${guardMode ? 'left-6' : 'left-1'}`} />
            </button>
          </div>

          {guardMode && (
            <div className="space-y-4 pt-2 border-t border-white/5">
              <div className="space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-wider text-red-400/70">Stop-Loss</p>
                <div className="flex gap-2">
                  {STOP_LOSS_OPTIONS.map(v => (
                    <button
                      key={v}
                      onClick={() => setStopLoss(v)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                        stopLoss === v
                          ? 'border-red-500 bg-red-500/20 text-red-400'
                          : 'border-white/10 text-white/30 hover:border-red-500/30'
                      }`}
                    >
                      -{v}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-wider text-green-400/70">Take-Profit</p>
                <div className="flex gap-2">
                  {TAKE_PROFIT_OPTIONS.map(v => (
                    <button
                      key={v}
                      onClick={() => setTakeProfit(v)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                        takeProfit === v
                          ? 'border-green-500 bg-green-500/20 text-green-400'
                          : 'border-white/10 text-white/30 hover:border-green-500/30'
                      }`}
                    >
                      +{v}%
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[10px] font-mono text-white/20">
                No keepers. No off-chain bots. Pure Somnia Reactivity.
              </p>
            </div>
          )}
        </div>

        {/* Estimated payout */}
        {estimatedPayout() && side && (
          <div className="flex justify-between text-xs font-mono text-white/30 px-1">
            <span>Estimated payout if {side} wins</span>
            <span className="text-white/60">{estimatedPayout()} STT</span>
          </div>
        )}

        {/* Place Bet button */}
        {!mounted || !isConnected ? (
          <button
            disabled={!mounted}
            onClick={() => !mounted ? null : undefined}
            className="w-full py-3.5 rounded-xl text-sm font-semibold bg-white/5 text-white/20 cursor-not-allowed"
          >
            {mounted ? 'Connect Wallet to Bet' : 'Loading…'}
          </button>
        ) : (
          <button
            onClick={handleBet}
            disabled={!side || !amount || isPending}
            className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all ${
              !side || !amount
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : side === 'YES'
                ? 'bg-green-600 hover:bg-green-500 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
          >
            {isPending ? 'Placing…' : side ? `Bet ${side}${guardMode ? ' + Guard 🛡' : ''}` : 'Select YES or NO'}
          </button>
        )}

        {txStatus === 'success' && (
          <p className="text-xs font-mono text-green-400 text-center">✓ Bet placed on-chain</p>
        )}
        {txStatus === 'error' && (
          <p className="text-xs font-mono text-red-400 text-center">Transaction failed — check wallet</p>
        )}
      </div>

      {/* Live Reacting Timeline */}
      <PositionTimeline 
        marketId={marketId} 
        entryOdds={activeOdds} 
        currentOdds={activeOdds} 
        stopLoss={guardMode ? slOdds : 1} 
        takeProfit={guardMode ? tpOdds : 99} 
        isYes={side !== 'NO'} 
      />
    </div>
  )
}
