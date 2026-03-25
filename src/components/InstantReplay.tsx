'use client';
import { useEffect, useState } from 'react';

interface InstantReplayProps {
  trigger: 'BET_PLACED' | 'STOP_LOSS' | 'RESOLVED'
  marketTitle: string
  blockNumber: number
  onClose: () => void
}

export function InstantReplay({ trigger, marketTitle, blockNumber, onClose }: InstantReplayProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 0);
    const t2 = setTimeout(() => setStep(2), 600);
    const t3 = setTimeout(() => setStep(3), 1200);
    const t4 = setTimeout(() => setStep(4), 1800);
    const t5 = setTimeout(() => onClose(), 4800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); }
  }, [onClose]);

  const stepsText = [
    `Bet Placed — Block #${blockNumber}`,
    `Price Oracle Pushed — Same Block`,
    trigger === 'STOP_LOSS' ? 'Guard Triggered ⚡' : trigger === 'RESOLVED' ? 'Market Resolved ⚡' : 'Position Opened ✓',
    `Payout Distributed — 0 Keepers Used`
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-[#09090f] border border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)] rounded-xl p-5 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <h3 className="text-sm font-bold text-white mb-4 border-b border-white/10 pb-2 truncate">{marketTitle}</h3>
      <div className="space-y-3 mb-4">
        {stepsText.map((text, i) => (
          <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${step > i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 text-[10px] font-bold">✓</div>
            <div className="text-xs text-white/80">{text}</div>
          </div>
        ))}
      </div>
      <div className={`text-[10px] text-indigo-300 font-mono text-center border-t border-white/10 pt-3 transition-opacity duration-500 ${step > 3 ? 'opacity-100' : 'opacity-0'}`}>
        All 4 actions. One block. Zero intermediaries.
      </div>
    </div>
  );
}
