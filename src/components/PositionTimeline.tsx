'use client';

export function PositionTimeline({ marketId, entryOdds, currentOdds, stopLoss, takeProfit, isYes }: any) {
  return (
    <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6">
      <h3 className="text-xs font-mono uppercase tracking-wider text-white/30 mb-8">Active Guard Timeline</h3>
      
      <div className="relative h-14 w-full px-2">
        {/* The Main Track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 h-2 bg-white/5 rounded-full overflow-hidden flex">
          <div style={{width: `${stopLoss}%`}} className="h-full bg-red-500/40 transition-all duration-500" />
          <div style={{width: `${takeProfit - stopLoss}%`}} className="h-full bg-indigo-500/10" />
          <div style={{width: `${100 - takeProfit}%`}} className="h-full bg-green-500/40 transition-all duration-500" />
        </div>
        
        {/* Current Odds Marker (Top) */}
        <div className="absolute top-0 flex flex-col items-center z-20" style={{left: `calc(0.5rem + (100% - 1rem) * ${currentOdds/100})`}}>
          <div className="text-[10px] font-bold font-mono text-indigo-400 bg-[#0f0f13] px-1 rounded -mt-6 whitespace-nowrap shadow-[0_0_10px_rgba(99,102,241,0.2)] border border-indigo-500/30">
            Now {currentOdds}¢
          </div>
          <div className="w-0.5 h-6 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)] mt-1" />
        </div>

        {/* Entry Marker (Bottom) */}
        <div className="absolute top-1/2 flex flex-col items-center z-10" style={{left: `calc(0.5rem + (100% - 1rem) * ${entryOdds/100})`}}>
          <div className="w-0.5 h-3 bg-white/30 rounded-full" />
          <div className="text-[9px] font-mono text-white/40 mt-1 bg-[#0f0f13] px-1 whitespace-nowrap">Entry {entryOdds}¢</div>
        </div>
        
        {/* Stop Loss Marker (Bottom) */}
        <div className="absolute top-1/2 flex flex-col items-center z-10" style={{left: `calc(0.5rem + (100% - 1rem) * ${stopLoss/100})`}}>
          <div className="w-0.5 h-3 bg-red-500/80 rounded-full" />
          <div className="text-[9px] font-bold font-mono text-red-400 mt-1 bg-[#0f0f13] px-1 whitespace-nowrap">SL {stopLoss}¢</div>
        </div>
        
        {/* Take Profit Marker (Bottom) */}
        <div className="absolute top-1/2 flex flex-col items-center z-10" style={{left: `calc(0.5rem + (100% - 1rem) * ${takeProfit/100})`}}>
          <div className="w-0.5 h-3 bg-green-500/80 rounded-full" />
          <div className="text-[9px] font-bold font-mono text-green-400 mt-1 bg-[#0f0f13] px-1 whitespace-nowrap">TP {takeProfit}¢</div>
        </div>
      </div>
    </div>
  );
}
