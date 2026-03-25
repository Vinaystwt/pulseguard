'use client';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export function DepthHeatmap({ yesOdds, yesVolume, noVolume }: { yesOdds: number, yesVolume: number, noVolume: number }) {
  const data = [10, 20, 30, 40, 50, 60, 70, 80, 90].map(prob => {
    const distance = Math.abs(prob - yesOdds);
    const volume = Math.max(100, 5000 - (distance * 100)) + Math.random() * 500;
    return { prob, volume };
  });

  return (
    <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-mono uppercase tracking-wider text-white/30">Market Conviction</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Live</span>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="prob" tick={{fontSize: 10, fill: '#666'}} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
            <YAxis hide />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}} 
              contentStyle={{backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px'}} 
              itemStyle={{color: '#fff', fontSize: '12px', fontFamily: 'monospace'}} 
              labelStyle={{display: 'none'}} 
              formatter={(val: any) => [Math.round(Number(val)) + ' STT', 'Volume']} 
            />
            <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => {
                const isYes = entry.prob > 50;
                const isCenter = entry.prob === 50;
                const fill = isCenter ? '#52525b' : isYes ? '#4f46e5' : '#e11d48';
                const opacity = isCenter ? 0.5 : isYes ? entry.prob/100 : (100-entry.prob)/100;
                return <Cell key={`cell-${index}`} fill={fill} fillOpacity={opacity} />;
              })}
            </Bar>
            <ReferenceLine x={Math.round(yesOdds / 10) * 10} stroke="#4f46e5" strokeDasharray="3 3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-[11px] font-mono text-white/40 mt-4 pt-4 border-t border-white/5">
        <span>YES Pool: {yesVolume.toLocaleString()} STT</span>
        <span>NO Pool: {noVolume.toLocaleString()} STT</span>
      </div>
    </div>
  );
}
