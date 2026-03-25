'use client';
import { PulseScoreBadge } from '@/components/PulseScoreBadge';
import { getPulseScore } from '@/lib/pulseScore';

const WALLETS = [
  "0x8f3C2a9B4e1D7F5c6A8B2E0d9C4F1a3B5c7D9e2F",
  "0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B",
  "0xF1e2D3c4B5a6F7e8D9c0B1a2F3e4D5c6B7a8F9e0",
  "0x4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
  "0xd9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0",
  "0x11223344556677889900aabbccddeeff00112233",
  "0xffeeccbbaa0099887766554433221100ffeeddcc",
  "0x0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
  "0x9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a",
  "0x2468024680246802468024680246802468024680",
  "0x1357913579135791357913579135791357913579",
  "0xabababababababababababababababababababab"
];

export default function LeaderboardPage() {
  const rankedData = WALLETS.map(w => ({ address: w, ...getPulseScore(w) }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Pulse Scores</h1>
        <p className="text-sm text-white/40 font-mono">Ranked by prediction accuracy, not capital. Updated every block.</p>
      </div>

      <div className="bg-[#0f0f13] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/40 border-b border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
              <th className="p-4 pl-6">Rank</th>
              <th className="p-4">Trader</th>
              <th className="p-4">Pulse Score</th>
              <th className="p-4 text-right">Win Rate</th>
              <th className="p-4 text-right">Streak</th>
              <th className="p-4 pr-6 text-right">Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rankedData.map((data, idx) => {
              const rank = idx + 1;
              const borderColors = ['border-amber-400', 'border-gray-300', 'border-amber-700'];
              const leftBorder = rank <= 3 ? `border-l-4 ${borderColors[rank-1]}` : 'border-l-4 border-transparent';
              
              return (
                <tr key={data.address} className={`hover:bg-white/[0.02] transition-colors ${leftBorder}`}>
                  <td className="p-4 pl-6 text-sm font-bold text-white/60">#{rank}</td>
                  <td className="p-4 text-sm font-mono text-indigo-300">
                    {data.address.slice(0, 6)}…{data.address.slice(-4)}
                  </td>
                  <td className="p-4">
                    <PulseScoreBadge address={data.address} />
                  </td>
                  <td className="p-4 text-right text-sm font-mono text-white/80">{data.winRate}%</td>
                  <td className="p-4 text-right text-sm font-mono text-white/80">{data.streak} 🔥</td>
                  <td className="p-4 pr-6 text-right text-sm font-mono text-white/40">{(data.score * 85).toLocaleString()} STT</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="p-4 text-center bg-black/40 border-t border-white/5 text-[10px] font-mono text-indigo-400/70">
          Your wallet connects automatically. Beat the Oracles.
        </div>
      </div>
    </div>
  );
}
