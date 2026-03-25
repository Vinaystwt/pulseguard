'use client';
import { ShieldCheck } from 'lucide-react';

export function MyPositions() {
  return (
    <div className="glass-card rounded-xl p-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5" /> Active Guards
      </h3>
      <div className="space-y-3">
        <div className="p-3 bg-white/5 rounded-lg border border-indigo-500/20">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[11px] font-bold text-white leading-tight">SOMI Price Hits $10.50</div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono">YES</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-gray-500">Stop-Loss</span>
            <span className="text-red-400 font-mono font-bold">$9.80</span>
          </div>
          <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
