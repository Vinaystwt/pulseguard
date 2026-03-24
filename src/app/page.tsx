import Link from 'next/link';

const DEMO_MARKETS = [
  { id: 1, title: "SOMI Price Hits $10.50", duration: "180s", liquidity: "4,250 STT", status: "LIVE" },
  { id: 2, title: "ETH Gas > 50 gwei", duration: "300s", liquidity: "1,120 STT", status: "LIVE" },
  { id: 3, title: "Somnia Block Time < 1s", duration: "60s", liquidity: "8,900 STT", status: "LIVE" },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Active Micro-Markets</h1>
        <p className="text-gray-400">Place your bets. Set your on-chain guards. Experience sub-second reactivity.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_MARKETS.map((market) => (
          <Link href={`/market/${market.id}`} key={market.id}>
            <div className="group relative rounded-xl bg-white/5 border border-white/10 p-6 hover:neon-border transition-all cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0" />
              
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 rounded-md bg-green-500/20 text-green-400 text-xs font-bold tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {market.status}
                </span>
                <span className="text-xs text-gray-500 font-mono">ID: {market.id}</span>
              </div>
              
              <h2 className="text-xl font-bold mb-4">{market.title}</h2>
              
              <div className="flex justify-between text-sm text-gray-400 border-t border-white/10 pt-4 mt-auto">
                <span>Duration: <span className="text-white font-mono">{market.duration}</span></span>
                <span>Vol: <span className="text-white font-mono">{market.liquidity}</span></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
