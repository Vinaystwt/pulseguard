import { createPublicClient, http, defineChain } from 'viem'

export const somniaTestnet = defineChain({
  id: 50312,
  name: 'Somnia Testnet',
  nativeCurrency: { name: 'STT', symbol: 'STT', decimals: 18 },
  rpcUrls: { default: { http: ['https://dream-rpc.somnia.network/'] } },
  blockExplorers: {
    default: { name: 'Socialscan', url: 'https://somnia-testnet.socialscan.io/' }
  },
  testnet: true,
})

export const PULSEGUARD_ADDRESS = '0x1850d2a31CB8669Ba757159B638DE19Af532ba5e'

export const PULSEGUARD_ABI = [ { "inputs": [ { "internalType": "uint256", "name": "_marketId", "type": "uint256" } ], "name": "claimFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_marketId", "type": "uint256" }, { "internalType": "bool", "name": "_isYes", "type": "bool" } ], "name": "seedLiquidity", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_marketId", "type": "uint256" }, { "internalType": "bool", "name": "_isYes", "type": "bool" } ], "name": "seedLiquidity", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [ { "internalType": "string", "name": "_question", "type": "string" }, { "internalType": "uint256", "name": "_duration", "type": "uint256" } ], "name": "createMarket", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [], "name": "marketCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_marketId", "type": "uint256" }, { "internalType": "bool", "name": "_isYes", "type": "bool" }, { "internalType": "uint256", "name": "_stopLoss", "type": "uint256" }, { "internalType": "uint256", "name": "_takeProfit", "type": "uint256" } ], "name": "placeBet", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "positions", "outputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "isYes", "type": "bool" }, { "internalType": "uint256", "name": "stopLoss", "type": "uint256" }, { "internalType": "uint256", "name": "takeProfit", "type": "uint256" }, { "internalType": "bool", "name": "active", "type": "bool" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "markets", "outputs": [ { "internalType": "string", "name": "question", "type": "string" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "uint256", "name": "yesPool", "type": "uint256" }, { "internalType": "uint256", "name": "noPool", "type": "uint256" }, { "internalType": "bool", "name": "resolved", "type": "bool" }, { "internalType": "bool", "name": "outcomeYes", "type": "bool" }, { "internalType": "address", "name": "creator", "type": "address" } ], "stateMutability": "view", "type": "function" }
] as const

export const PulseGuardClient = createPublicClient({
  chain: somniaTestnet,
  transport: http()
})
