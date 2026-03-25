'use client';
import Link from 'next/link';
import { PriceChart } from './PriceChart';
import { Clock, TrendingUp } from 'lucide-react';

export function MarketCard({ id, title, yes, no, vol }: any) {
  return (
    <Link href={`/market/${id}`} className="group glass-panel rounded-xl p-4 hover:neon-border-indigo transition-all">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
          <span className="text-[9px] font-black bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded uppercase italic">Pulse</span>
          <span className="text-[9px] font-bold bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded uppercase">Live</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
          <Clock className="w-3 h-3" /> 02:45:12
        </div>
      </div>

      <h3 className="text-sm font-bold mb-4 h-10 line-clamp-2 group-hover:text-indigo-400 transition-colors">{title}</h3>

      <div className="h-16 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
        <PriceChart height={64} />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-green-500/5 border border-green-500/10 rounded-lg p-2 text-center transition-all group-hover:bg-green-500/10">
          <div className="text-[9px] text-green-500 uppercase font-black">Yes</div>
          <div className="text-lg font-mono font-black text-green-400">${yes}</div>
        </div>
        <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-2 text-center transition-all group-hover:bg-red-500/10">
          <div className="text-[9px] text-red-500 uppercase font-black">No</div>
          <div className="text-lg font-mono font-black text-red-400">${no}</div>
        </div>
      </div>

      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3">
        <div className="h-full bg-green-500" style={{ width: `${yes * 100}%` }} />
      </div>

      <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {vol} STT Vol
        </div>
        <div>642 Trades</div>
      </div>
    </Link>
  );
}
