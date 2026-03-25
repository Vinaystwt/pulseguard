'use client';

export function OrderBook() {
  const bids = [
    { price: 0.65, size: '2.1k' },
    { price: 0.64, size: '4.8k' },
    { price: 0.63, size: '1.5k' },
  ];
  const asks = [
    { price: 0.66, size: '1.2k' },
    { price: 0.67, size: '0.9k' },
    { price: 0.68, size: '5.4k' },
  ];

  return (
    <div className="glass-card rounded-xl p-4 h-full flex flex-col font-mono">
      <h3 className="text-xs font-bold uppercase text-gray-500 mb-4">Order Book</h3>
      <div className="flex-1 space-y-0.5">
        {asks.reverse().map((o, i) => (
          <div key={i} className="flex justify-between text-[11px] text-red-400/80">
            <span>{o.price}</span>
            <span>{o.size}</span>
          </div>
        ))}
        <div className="py-3 text-center border-y border-white/5 my-2">
          <span className="text-lg font-bold text-white">$0.655</span>
          <div className="text-[10px] text-gray-500 tracking-widest uppercase">Spread: 0.01</div>
        </div>
        {bids.map((o, i) => (
          <div key={i} className="flex justify-between text-[11px] text-green-400/80">
            <span>{o.price}</span>
            <span>{o.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
