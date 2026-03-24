'use client';
import { useState, use } from 'react';

export default function MarketDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [amount, setAmount] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <a href="/" className="hover:text-white transition-colors">← Back to Markets</a>
        <span>/</span>
        <span>Market #{unwrappedParams.id}</span>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">SOMI Price Hits $10.50</h1>
            <p className="text-gray-400">Resolves in <span className="text-white font-mono">02:45</span> • Oracle: Pyth Network</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="text-sm text-gray-400 mb-1">Current YES Pool</div>
              <div className="text-2xl font-mono text-green-400">2,100 STT</div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="text-sm text-gray-400 mb-1">Current NO Pool</div>
              <div className="text-2xl font-mono text-red-400">2,150 STT</div>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/10">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-500 rounded-sm" />
              Configure PulseGuard Position
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Bet Amount (STT)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 flex justify-between">
                  <span>Reactive Stop-Loss Trigger (Oracle Price)</span>
                  <span className="text-indigo-400 text-xs bg-indigo-400/10 px-2 py-0.5 rounded">Optional</span>
                </label>
                <input 
                  type="number" 
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                  placeholder="e.g. $9.80"
                />
                <p className="text-xs text-gray-500 mt-2">If oracle hits this price, Somnia Reactivity instantly exits your position to prevent total loss.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="py-4 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all font-bold text-lg">
                Bet YES
              </button>
              <button className="py-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all font-bold text-lg">
                Bet NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
