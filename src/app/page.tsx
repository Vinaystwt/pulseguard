'use client';
import { Market } from '@/lib/markets'
import { useMarkets } from '@/hooks/useMarkets'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function MarketCard({ market }: { market: Market }) {
  const [timeLeft, setTimeLeft] = useState(market.endsInSeconds)
  
  useEffect(() => {
    const int = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(int)
  }, [])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  return (
    <Link href={`/market/${market.id}`} className="bg-[#0f0f13] border border-white/5 rounded-xl p-5 block hover:border-indigo-500/30 transition-all hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/60 font-bold uppercase tracking-wider">{market.category}</span>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40 bg-white/5 px-2 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {mins}:{secs.toString().padStart(2, '0')}
        </div>
      </div>
      <h3 className="text-base font-bold text-white mb-5 line-clamp-2 h-12 leading-snug">{market.title}</h3>
      
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex mb-3">
        <div className="h-full bg-green-500 transition-all duration-500" style={{width: `${market.yesOdds}%`}} />
        <div className="h-full bg-red-500 transition-all duration-500" style={{width: `${market.noOdds}%`}} />
      </div>

      <div className="flex justify-between text-xs font-bold mb-5 font-mono">
        <span className="text-green-400">YES {market.yesOdds}¢</span>
        <span className="text-red-400">NO {market.noOdds}¢</span>
      </div>

      <div className="flex justify-between text-[10px] font-mono text-white/30 border-t border-white/5 pt-3">
        <span>Vol: {market.volume}</span>
        <span>{market.trades} Trades</span>
      </div>
    </Link>
  )
}

export default function Home() {
  const { markets } = useMarkets()

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8 mt-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Live Prediction Markets</h1>
        <p className="text-sm text-white/40 font-mono">Place your bets. Set your on-chain guards. Experience sub-second reactivity.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map(m => <MarketCard key={m.id} market={m} />)}
      </div>
    </div>
  )
}
