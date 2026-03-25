export interface Squad {
  code: string        
  name: string        
  members: string[]   
  marketId: string
  side: 'YES' | 'NO'
  totalAmount: number 
  createdBy: string   
}

export function generateCode(): string {
  return 'PLS-' + Math.random().toString(36).slice(2, 5).toUpperCase()
}

export function createSquad(name: string, marketId: string, side: 'YES' | 'NO', creatorAddress: string, amount: number): Squad {
  const squad: Squad = {
    code: generateCode(),
    name,
    members: [creatorAddress],
    marketId,
    side,
    totalAmount: amount,
    createdBy: creatorAddress,
  }
  const existing = getSquads()
  existing.push(squad)
  if (typeof window !== 'undefined') {
    localStorage.setItem('pulseguard_squads', JSON.stringify(existing))
  }
  return squad
}

export function joinSquad(code: string, address: string, amount: number): Squad | null {
  const squads = getSquads()
  const idx = squads.findIndex(s => s.code === code)
  if (idx === -1) return null
  if (!squads[idx].members.includes(address)) {
    squads[idx].members.push(address)
  }
  squads[idx].totalAmount += amount
  if (typeof window !== 'undefined') {
    localStorage.setItem('pulseguard_squads', JSON.stringify(squads))
  }
  return squads[idx]
}

export function getSquadsForMarket(marketId: string): Squad[] {
  return getSquads().filter(s => s.marketId === marketId)
}

export function getSquads(): Squad[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem('pulseguard_squads') || '[]')
  } catch { return [] }
}
