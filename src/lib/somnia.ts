import { createPublicClient, http, defineChain } from 'viem';
import { SomniaReactivity } from '@somnia-chain/reactivity';

export const somniaTestnet = defineChain({
  id: 50312,
  name: 'Somnia Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Somnia Testnet Token',
    symbol: 'STT',
  },
  rpcUrls: {
    default: { http: ['https://dream-rpc.somnia.network/'] },
    public: { http: ['https://dream-rpc.somnia.network/'] },
  },
  blockExplorers: {
    default: { name: 'SocialScan', url: 'https://somnia-testnet.socialscan.io' },
  },
});

export const publicClient = createPublicClient({
  chain: somniaTestnet,
  transport: http(),
});

export const reactivity = new SomniaReactivity({
  publicClient: publicClient as any, 
});

export const PULSEGUARD_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';

export const PULSEGUARD_ABI = [
  "function createMarket(string description, uint256 durationSeconds, uint256 initialOraclePrice) external returns (uint256)",
  "function placeBet(uint256 marketId, bool isYes, uint256 stopLossPrice, uint256 takeProfitPrice) external payable",
  "function markets(uint256) external view returns (uint256 id, string description, uint256 endTime, uint256 yesAmount, uint256 noAmount, bool resolved, bool outcome, uint256 oraclePriceAtCreation)",
  "event MarketCreated(uint256 indexed marketId, string description, uint256 endTime, uint256 oraclePriceAtCreation)",
  "event BetPlaced(uint256 indexed marketId, address indexed user, bool isYes, uint256 amount, uint256 stopLossPrice, uint256 takeProfitPrice)",
  "event StopLossExecuted(uint256 indexed marketId, address indexed user, uint256 payout, uint256 executePrice)"
] as const;

export class PulseGuardClient {
  static subscribeToMarketEvents(marketId: number, onEvent: (data: any) => void) {
    console.log(`[Reactivity] Subscribing to market ${marketId}...`);
    
    const subscription = reactivity.subscribe({
      address: PULSEGUARD_CONTRACT_ADDRESS,
      topics: [],
    }, (event) => {
      console.log("[Reactivity] Same-block event received:", event);
      onEvent(event);
    });

    return subscription;
  }
}
