'use client';
import { useParams } from 'next/navigation';
import { useMarket } from '@/hooks/useMarkets';
import { BetForm } from '@/components/BetForm';
import { DepthHeatmap } from '@/components/DepthHeatmap';
import Link from 'next/link';

export default function MarketPage() {
  const params = useParams();
  const id = params?.id as string;
  const { market, isLoading } = useMarket(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-indigo-400 font-mono text-sm">
        <div className="w-4 h-4 rounded-full bg-indigo-500 animate-ping mr-3" />
        Syncing with Somnia...
      </div>
    );
  }

  if (!market) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-white/30 font-mono text-sm">
        Market not found.
      </div>
    );
  }

  const rawVol = parseInt(market.volume.replace(/\D/g, '')) || 10000;
  const yesVol = Math.round(rawVol * (market.yesOdds / 100));
  const noVol = Math.round(rawVol * (market.noOdds / 100));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link href="/" className="text-xs font-mono text-white/30 hover:text-white/60 transition-colors mb-6 inline-block">
        ← Back to Markets
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">

          <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/40">
                {market.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">{market.title}</h1>
            <p className="text-sm text-white/40 mb-4">{market.description}</p>
            <div className="flex flex-wrap gap-6 text-xs font-mono text-white/30">
              <span>Source: <span className="text-white/60">{market.resolutionSource}</span></span>
              <span>Volume: <span className="text-white/60">{market.volume}</span></span>
              <span>Trades: <span className="text-white/60">{market.trades}</span></span>
            </div>
          </div>

          <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-white/30 mb-4">Market Odds</p>
            <div className="flex gap-4 mb-4">
              <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-green-400">{market.yesOdds}¢</p>
                <p className="text-xs text-green-400/60 font-mono mt-1">YES</p>
              </div>
              <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-red-400">{market.noOdds}¢</p>
                <p className="text-xs text-red-400/60 font-mono mt-1">NO</p>
              </div>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden flex">
              <div className="bg-green-500 h-full transition-all" style={{ width: `${market.yesOdds}%` }} />
              <div className="bg-red-500 h-full transition-all" style={{ width: `${market.noOdds}%` }} />
            </div>
          </div>

          <DepthHeatmap yesOdds={market.yesOdds} yesVolume={yesVol} noVolume={noVol} />
          
        </div>

        <div className="w-full lg:w-[380px]">
          <BetForm
            marketId={market.id}
            yesOdds={market.yesOdds}
            noOdds={market.noOdds}
            marketTitle={market.title}
          />
        </div>
      </div>
    </div>
  );
}
