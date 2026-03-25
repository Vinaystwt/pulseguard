'use client'
import { useEffect, useState } from 'react'
import { PulseGuardClient } from '@/lib/somnia'

interface LogEntry {
  id: number
  marketId: string
  user: string
  isYes: boolean
  amount: string
  time: string
}

const MOCK_LOGS: LogEntry[] = [
  { id: 1, marketId: '3', user: '0x9f2a…c341', isYes: true,  amount: '50 STT',  time: '2s ago' },
  { id: 2, marketId: '1', user: '0x4d1b…a892', isYes: false, amount: '120 STT', time: '8s ago' },
  { id: 3, marketId: '5', user: '0x7e3c…f014', isYes: true,  amount: '30 STT',  time: '15s ago' },
  { id: 4, marketId: '2', user: '0x1a9d…b673', isYes: false, amount: '200 STT', time: '23s ago' },
  { id: 5, marketId: '6', user: '0x5f8e…2290', isYes: true,  amount: '75 STT',  time: '41s ago' },
]

export function LiveActivity() {
  const [logs, setLogs] = useState<LogEntry[]>(MOCK_LOGS)

  useEffect(() => {
    PulseGuardClient.subscribe(0, (event) => {
      const e = event as Record<string, unknown>
      const entry: LogEntry = {
        id: Math.random(),
        marketId: String(e.marketId ?? '?'),
        user: String(e.user ?? '0x????'),
        isYes: Boolean(e.isYes),
        amount: String(e.amount ?? '0') + ' STT',
        time: 'just now',
      }
      setLogs(prev => [entry, ...prev].slice(0, 10))
    })
  }, [])

  return (
    <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-mono uppercase tracking-wider text-white/40">Live Activity</span>
      </div>
      <div className="space-y-3">
        {logs.map(log => (
          <div key={log.id} className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${log.isYes ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {log.isYes ? 'YES' : 'NO'}
              </span>
              <span className="text-white/50">{log.user}</span>
            </div>
            <div className="flex items-center gap-3 text-white/30">
              <span className="text-white/60">{log.amount}</span>
              <span>#{log.marketId}</span>
              <span>{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
