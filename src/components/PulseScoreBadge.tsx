'use client';
import { getPulseScore } from '@/lib/pulseScore';

export function PulseScoreBadge({ address }: { address: string }) {
  const { score, tier } = getPulseScore(address);
  const colorMap = {
    Novice: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    Trader: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Pulse: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    Oracle: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${colorMap[tier]}`}>
      <span>{tier}</span>
      <span className="opacity-50">|</span>
      <span className="font-mono">{score}</span>
    </div>
  );
}
