'use client';
import { useState, useEffect } from 'react';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show once per session for the judges
    const hasSeen = sessionStorage.getItem('pulseguard_welcome');
    if (!hasSeen) {
      setIsOpen(true);
      sessionStorage.setItem('pulseguard_welcome', 'true');
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0f0f13] border border-indigo-500/30 rounded-2xl max-w-md w-full p-8 shadow-[0_0_40px_rgba(99,102,241,0.15)] relative animate-in zoom-in-95 duration-300">
        
        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/30">
          <div className="w-4 h-4 rounded-full bg-indigo-500 animate-pulse" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-2">Welcome to PulseGuard</h2>
        <p className="text-white/60 text-sm mb-6 leading-relaxed">
          You are looking at a micro-prediction market built for the Somnia Testnet. We leverage Somnia's sub-second finality to do something new.
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
            <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">1. Place a Bet</h3>
            <p className="text-xs text-white/50">Predict the outcome of high-frequency events.</p>
          </div>
          <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
            <h3 className="text-xs font-mono text-green-400 uppercase tracking-wider mb-1">2. Set the Guard</h3>
            <p className="text-xs text-white/50">Toggle Guard Mode to set on-chain Stop-Loss and Take-Profit bounds.</p>
          </div>
          <div className="bg-black/40 border border-white/5 p-4 rounded-xl border-l-2 border-l-amber-500">
            <h3 className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">3. Same-Block Execution</h3>
            <p className="text-xs text-white/50">When the oracle updates, Somnia's Reactivity executes your guard in the exact same block. No keepers. No off-chain bots.</p>
          </div>
        </div>

        <button 
          onClick={() => setIsOpen(false)}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-wide text-sm transition-all"
        >
          Explore Markets
        </button>
      </div>
    </div>
  );
}
