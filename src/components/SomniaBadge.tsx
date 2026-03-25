'use client'

export default function SomniaBadge() {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative group cursor-default">
        {/* Glowing backdrop */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-500" />
        
        {/* Main Badge */}
        <div className="relative flex items-center gap-2 bg-[#0f0f13] border border-white/10 px-4 py-2 rounded-full">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
          </div>
          
          <span className="text-[10px] font-mono font-bold tracking-widest text-white/60 uppercase">
            Powered by <span className="text-indigo-400">Somnia Reactivity</span>
          </span>
        </div>
      </div>
    </div>
  )
}
