'use client';
import { ResponsiveContainer, LineChart, Line, YAxis, XAxis, Tooltip } from 'recharts';

const mockData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  price: 0.60 + Math.random() * 0.1,
}));

export function PriceChart({ height = 300 }: { height?: number }) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData}>
          <XAxis dataKey="time" hide />
          <YAxis domain={['auto', 'auto']} hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid #1a1a1e', fontSize: '10px' }}
            itemStyle={{ color: '#6366f1' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#6366f1" 
            strokeWidth={2} 
            dot={false}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
