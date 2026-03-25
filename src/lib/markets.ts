export interface Market {
  id: string
  title: string
  category: 'Price Tick' | 'On-Chain' | 'Ecosystem'
  yesOdds: number        // 0–100 integer
  noOdds: number
  volume: string
  trades: number
  endsInSeconds: number  // used for countdown
  description: string
  resolutionSource: string
}

export const MARKETS: Market[] = [
  {
    id: '1',
    title: 'BTC above $100k before April 1?',
    category: 'Price Tick',
    yesOdds: 62, noOdds: 38,
    volume: '14,200 STT', trades: 341,
    endsInSeconds: 540,
    description: 'Resolves YES if BTC/USD spot price exceeds $100,000 before April 1 2026 UTC.',
    resolutionSource: 'Chainlink BTC/USD feed'
  },
  {
    id: '2',
    title: 'ETH gas below 5 gwei next block?',
    category: 'On-Chain',
    yesOdds: 44, noOdds: 56,
    volume: '8,750 STT', trades: 198,
    endsInSeconds: 180,
    description: 'Resolves YES if the next Ethereum block base fee is under 5 gwei.',
    resolutionSource: 'On-chain block data'
  },
  {
    id: '3',
    title: 'SOMI reaches $0.50 this week?',
    category: 'Ecosystem',
    yesOdds: 71, noOdds: 29,
    volume: '22,100 STT', trades: 512,
    endsInSeconds: 300,
    description: 'Resolves YES if SOMI token price hits $0.50 on any major DEX before Sunday.',
    resolutionSource: 'DEX price oracle'
  },
  {
    id: '4',
    title: 'Somnia TPS record broken today?',
    category: 'On-Chain',
    yesOdds: 55, noOdds: 45,
    volume: '6,400 STT', trades: 87,
    endsInSeconds: 600,
    description: 'Resolves YES if Somnia Testnet reports a new all-time TPS high in the next 10 minutes.',
    resolutionSource: 'Somnia Explorer API'
  },
  {
    id: '5',
    title: 'Next block contains 1000+ txns?',
    category: 'On-Chain',
    yesOdds: 83, noOdds: 17,
    volume: '3,200 STT', trades: 204,
    endsInSeconds: 60,
    description: 'Resolves YES if the next confirmed Somnia block has 1000 or more transactions.',
    resolutionSource: 'Somnia Explorer'
  },
  {
    id: '6',
    title: 'SOL outperforms BTC in 24h?',
    category: 'Price Tick',
    yesOdds: 49, noOdds: 51,
    volume: '11,800 STT', trades: 276,
    endsInSeconds: 420,
    description: 'Resolves YES if SOL/USD % change over the next 24h exceeds BTC/USD % change.',
    resolutionSource: 'Chainlink price feeds'
  },
]
