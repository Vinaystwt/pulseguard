'use client'
import { useEffect, useState } from 'react'
import { Squad, getSquadsForMarket } from '@/lib/squads'

const MOCK_SQUADS = [
  { code: 'PLS-A1B', name: 'Crypto Bulls', side: 'YES', members: ['0x1', '0x2', '0x3'], marketId: '', totalAmount: 450, createdBy: '0x1' },
  { code: 'PLS-X9Z', name: 'No Believers', side: 'NO', members: ['0x4', '0x5', '0x6', '0x7', '0x8'], marketId: '', totalAmount: 820, createdBy: '0x4' },
  { code: 'PLS-M4K', name: 'Moon Gang', side: 'YES', members: ['0x9', '0xA'], marketId: '', totalAmount: 200, createdBy: '0x9' },
] as Squad[]

export default function SquadBoard({ marketId }: { marketId: string }) {
  const [squads, setSquads] = useState<Squad[]>([])

  useEffect(() => {
    // Load real squads + mock squads to ensure it's never empty for the demo
    const local = getSquadsForMarket(marketId)
    setSquads([...local, ...MOCK_SQUADS])
  }, [marketId])

  return (
    <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6 mt-6">
      <h3 className="text-xs font-mono uppercase tracking-wider text-white/30 mb-4 flex items-center gap-2">
        <span className="text-indigo-400">🛡</span> Active Squads
      </h3>
      
      <div className="space-y-3">
        {squads.map((squad, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-white">{squad.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  squad.side === 'YES' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {squad.side}
                </span>
              </div>
              <div className="text-[10px] font-mono text-white/40">
                {squad.members.length} members · <span className="text-white/70 font-bold">{squad.totalAmount} STT</span>
              </div>
            </div>
            <button className="text-xs font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors">
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
