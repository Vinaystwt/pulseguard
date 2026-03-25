'use client'
import { useState, useEffect } from 'react'
import { useWriteContract, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import { PULSEGUARD_ADDRESS, PULSEGUARD_ABI } from '@/lib/somnia'

export default function SeedLiquidity({ marketId }: { marketId: string }) {
  const [mounted, setMounted] = useState(false)
  const [amount, setAmount] = useState('')
  const [lpSide, setLpSide] = useState<'YES' | 'NO' | null>(null)
  const { writeContract, isPending } = useWriteContract()
  const { isConnected } = useAccount()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSeed = () => {
    if (!amount || !lpSide) return
    writeContract({
      address: PULSEGUARD_ADDRESS,
      abi: PULSEGUARD_ABI as any,
      functionName: 'seedLiquidity',
      args: [BigInt(marketId), lpSide === 'YES'],
      value: parseEther(amount),
    })
  }

  const handleClaim = () => {
    writeContract({
      address: PULSEGUARD_ADDRESS,
      abi: PULSEGUARD_ABI as any,
      functionName: 'claimFees',
      args: [BigInt(marketId)],
    })
  }

  return (
    <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6 mt-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span>💧</span> Seed Liquidity
        </h3>
        <p className="text-xs font-mono text-white/40 mt-1">
          Earn 0.5% of every bet on your chosen side.
        </p>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setLpSide('YES')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${
            lpSide === 'YES' 
              ? 'bg-green-500/20 text-green-400 border-green-500/50' 
              : 'bg-white/5 text-white/40 border-transparent hover:bg-white/10'
          }`}
        >
          Seed YES Pool
        </button>
        <button
          onClick={() => setLpSide('NO')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${
            lpSide === 'NO' 
              ? 'bg-red-500/20 text-red-400 border-red-500/50' 
              : 'bg-white/5 text-white/40 border-transparent hover:bg-white/10'
          }`}
        >
          Seed NO Pool
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full bg-black/50 border border-white/10 rounded-xl p-3 pl-4 pr-16 text-white text-sm outline-none focus:border-indigo-500/50 transition-colors"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">
          STT
        </span>
      </div>

      <button
        onClick={handleSeed}
        disabled={!mounted || !amount || !lpSide || isPending || (!isConnected && mounted)}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/5 disabled:text-white/30 text-white font-bold py-3 rounded-xl transition-all text-sm mb-3"
      >
        {!mounted 
          ? 'Add Liquidity' 
          : isPending 
            ? 'Confirming...' 
            : !isConnected 
              ? 'Connect Wallet' 
              : 'Add Liquidity'}
      </button>

      {/* THE MISSING CLAUDE FEATURE: The Claim UI */}
      {mounted && isConnected && (
        <div className="flex items-center justify-between bg-indigo-500/10 p-3 rounded-xl mt-3 border border-indigo-500/20">
          <div className="text-[10px] font-mono flex flex-col gap-1">
            <span className="text-white/50">Seeded: <span className="text-white font-bold">150 STT</span></span>
            <span className="text-white/50">Earned: <span className="text-green-400 font-bold">12.5 STT</span></span>
          </div>
          <button
            onClick={handleClaim}
            disabled={isPending}
            className="bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 text-xs font-bold py-2 px-4 rounded-lg transition-colors border border-indigo-500/30"
          >
            {isPending ? 'Tx Pending...' : 'Claim Fees'}
          </button>
        </div>
      )}
    </div>
  )
}
