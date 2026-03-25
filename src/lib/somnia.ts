'use client'
import { createPublicClient, http } from 'viem'
import { somniaTestnet } from './wagmiConfig'

const publicClient = createPublicClient({
  chain: somniaTestnet,
  transport: http(),
})

const PULSEGUARD_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`

export const PULSEGUARD_ABI = [
  { "type": "function", "name": "createMarket", "inputs": [
      { "name": "description", "type": "string" },
      { "name": "durationSeconds", "type": "uint256" },
      { "name": "initialOraclePrice", "type": "uint256" }
    ], "outputs": [], "stateMutability": "nonpayable" },
  { "type": "function", "name": "placeBet", "inputs": [
      { "name": "marketId", "type": "uint256" },
      { "name": "isYes", "type": "bool" },
      { "name": "stopLossPrice", "type": "uint256" },
      { "name": "takeProfitPrice", "type": "uint256" }
    ], "outputs": [], "stateMutability": "payable" },
  { "type": "function", "name": "markets", "inputs": [{ "name": "", "type": "uint256" }],
    "outputs": [
      { "name": "id", "type": "uint256" },
      { "name": "description", "type": "string" },
      { "name": "endTime", "type": "uint256" },
      { "name": "yesAmount", "type": "uint256" },
      { "name": "noAmount", "type": "uint256" },
      { "name": "resolved", "type": "bool" },
      { "name": "outcome", "type": "bool" },
      { "name": "oraclePriceAtCreation", "type": "uint256" }
    ], "stateMutability": "view" },
  { "type": "event", "name": "BetPlaced", "inputs": [
      { "name": "marketId", "type": "uint256", "indexed": true },
      { "name": "user", "type": "address", "indexed": true },
      { "name": "isYes", "type": "bool" },
      { "name": "amount", "type": "uint256" }
    ] }
] as const

export class PulseGuardClient {
  static subscribe(_marketId: number, callback: (event: unknown) => void) {
    return publicClient.watchContractEvent({
      address: PULSEGUARD_ADDRESS,
      abi: PULSEGUARD_ABI,
      eventName: 'BetPlaced',
      onLogs: callback,
    })
  }
}

export { publicClient, PULSEGUARD_ADDRESS }
