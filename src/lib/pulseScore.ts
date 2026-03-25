export function getPulseScore(address: string): {
  score: number
  tier: 'Novice' | 'Trader' | 'Pulse' | 'Oracle'
  winRate: number
  streak: number
} {
  const seed = parseInt(address.slice(-4) || '0000', 16) % 1000
  const score = seed
  const winRate = 40 + (seed % 40)
  const streak = seed % 12
  const tier = score < 250 ? 'Novice' : score < 500 ? 'Trader' : score < 750 ? 'Pulse' : 'Oracle'
  return { score, tier, winRate, streak }
}
