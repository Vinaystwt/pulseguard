'use client';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function CreateMarketPage() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  const [question, setQuestion] = useState('');
  const [duration, setDuration] = useState('10 min');
  const [customDuration, setCustomDuration] = useState('');
  const [resType, setResType] = useState('Price Feed');
  const [liquidity, setLiquidity] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => setMounted(true), []);

  const handleLaunch = () => {
    if (!isConnected || !question || !liquidity) return;
    
    // Simulating the transaction delay for the hackathon UI demo
    setStatus('success');
    setTimeout(() => {
      window.location.href = '/market/1';
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Create a Market</h1>
        <p className="text-sm text-white/40 font-mono">Anyone can create a micro-prediction market. It resolves on-chain.</p>
      </div>

      <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-8 space-y-8">
        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 block">Market Question</label>
          <input 
            type="text" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Will BTC hit $110k before Friday?" 
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-indigo-500 transition-colors" 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 block">Duration</label>
          <div className="flex flex-wrap gap-3">
            {['1 min', '3 min', '10 min', 'Custom'].map(d => (
              <div 
                key={d} 
                onClick={() => setDuration(d)} 
                className={`px-5 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-all border ${duration === d ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50' : 'bg-white/5 text-white/50 border-transparent hover:bg-white/10'}`}
              >
                {d}
              </div>
            ))}
          </div>
          {duration === 'Custom' && (
            <input 
              type="number" 
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              placeholder="Duration in seconds (e.g. 3600)" 
              className="w-full mt-3 bg-black/40 border border-white/10 rounded-xl p-4 text-white font-mono outline-none focus:border-indigo-500 transition-colors" 
            />
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 block">Resolution Source</label>
          <div className="flex flex-wrap gap-3">
            {['Price Feed', 'On-Chain Event', 'Manual'].map(r => (
              <div 
                key={r} 
                onClick={() => setResType(r)} 
                className={`px-5 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-all border ${resType === r ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-white/5 text-white/50 border-transparent hover:bg-white/10'}`}
              >
                {r}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 block">Initial Liquidity (STT)</label>
          <div className="flex items-center border border-white/10 rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-colors bg-black/40">
            <input 
              type="number" 
              value={liquidity}
              onChange={(e) => setLiquidity(e.target.value)}
              placeholder="100" 
              className="flex-1 bg-transparent px-4 py-4 text-white font-mono outline-none" 
            />
            <span className="px-4 text-xs font-mono text-white/30">STT</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          {!mounted || !isConnected ? (
             <button disabled className="w-full py-4 rounded-xl bg-white/5 text-white/30 font-bold uppercase tracking-widest text-sm cursor-not-allowed">
               {mounted ? 'Connect Wallet to Launch' : 'Loading...'}
             </button>
          ) : (
            <button 
              onClick={handleLaunch} 
              disabled={status === 'success' || !question || !liquidity} 
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'success' ? 'Creating...' : 'Launch Market'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
