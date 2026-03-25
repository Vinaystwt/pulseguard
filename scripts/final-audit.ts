import { createPublicClient, http, parseEther } from 'viem';
import { somniaTestnet, PULSEGUARD_ABI, PULSEGUARD_ADDRESS } from '../src/lib/somnia';

const WALLET = '0x94c188F8280cA706949CC030F69e42B5544514ac';

async function main() {
  const client = createPublicClient({ chain: somniaTestnet, transport: http() });
  
  console.log("🕵️ Checking Contract State...");
  const count = await client.readContract({
    address: PULSEGUARD_ADDRESS as `0x${string}`,
    abi: PULSEGUARD_ABI,
    functionName: 'marketCount',
  });
  
  console.log(`📊 On-Chain Market Count: ${count}`);
  
  if (Number(count) < 21) {
    console.log("❌ ERROR: Market 21 does NOT exist yet. Your seeder failed or used the wrong contract.");
  }

  console.log("🧪 Simulating Bet on Market 21...");
  try {
    await client.simulateContract({
      account: WALLET as `0x${string}`,
      address: PULSEGUARD_ADDRESS as `0x${string}`,
      abi: PULSEGUARD_ABI,
      functionName: 'placeBet',
      args: [BigInt(21), true, BigInt(0), BigInt(0)],
      value: parseEther('1'),
    });
    console.log("✅ SUCCESS: Simulation passed! (This means the issue is likely your MetaMask gas settings).");
  } catch (error: any) {
    console.log("\n🛑 REVERT REASON:");
    console.log(error.shortMessage || error.message);
  }
}

main();
