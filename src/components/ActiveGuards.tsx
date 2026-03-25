'use client';
import { ShieldAlert, Zap } from 'lucide-react';

export function ActiveGuards() {
  return (
    <div className="p-4 glass-panel rounded-xl border-indigo-500/20">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-2 mb-4">
        <ShieldAlert className="w-4 h-4" /> Active Reactivity Guards
      </h4>
      <div className="space-y-3">
        <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10">
          <div className="flex justify-between text-[11px] font-bold mb-2">
            <span>SOMI Price Target</span>
            <span className="text-indigo-400 uppercase italic">Active</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono mb-2">
            <span className="text-gray-500">Stop-Loss @</span>
            <span className="text-red-400">$9.80</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
