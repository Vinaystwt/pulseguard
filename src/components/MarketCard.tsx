'use client'
import Link from 'next/link'
import { useReadContract } from 'wagmi'
import { PULSEGUARD_ABI, PULSEGUARD_ADDRESS } from '@/lib/somnia'

export function MarketCard({ id, title: fallbackTitle, yesOdds, noOdds, volume, trades }: any) {
  const isUserMarket = Number(id) > 40
  
  const { data: onChainMarket }: any = useReadContract({
    address: PULSEGUARD_ADDRESS as `0x${string}`,
    abi: PULSEGUARD_ABI,
    functionName: 'markets',
    args: [BigInt(id)],
    query: { enabled: isUserMarket }
  })

  const displayTitle = (isUserMarket && onChainMarket?.[0]) ? onChainMarket[0] : fallbackTitle
  const yesWidth = yesOdds || 50
  const noWidth = 100 - yesWidth

  return (
    <div className="group bg-[#0f0f13] border border-white/5 rounded-2xl p-5 hover:border-indigo-500/40 transition-all duration-500 shadow-xl">
      <Link href={`/market/${id}`}>
        <div className="space-y-4">
          <div className="flex justify-between items-start text-[8px] font-mono text-white/20 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
              Somnia Live
            </span>
            Active Pool
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug h-10 line-clamp-2">
            {displayTitle}
          </h3>
          <div className="space-y-1.5">
            <div className="h-1 w-full flex rounded-full overflow-hidden bg-white/5">
              <div style={{ width: `${yesWidth}%` }} className="bg-green-500/60" />
              <div style={{ width: `${noWidth}%` }} className="bg-red-500/60" />
            </div>
            <div className="flex justify-between text-[8px] font-mono font-bold uppercase tracking-tighter text-white/40">
              <span>{yesWidth}% YES</span>
              <span>{noWidth}% NO</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-white/5">
            <div className="flex gap-4">
              <div className="text-[8px] font-mono"><p className="text-white/20 uppercase">Vol</p><p className="text-white/60">{volume}</p></div>
              <div className="text-[8px] font-mono"><p className="text-white/20 uppercase">Trades</p><p className="text-white/60">{trades}</p></div>
            </div>
            <button className="bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded text-[8px] font-mono text-indigo-400 font-bold">💧 SEED LP</button>
          </div>
        </div>
      </Link>
    </div>
  )
}
