import { createPublicClient, http, parseEther } from 'viem';
import { somniaTestnet, PULSEGUARD_ABI, PULSEGUARD_ADDRESS } from '../src/lib/somnia';

const WALLET_ADDRESS = '0x94c188F8280cA706949CC030F69e42B5544514ac';

async function main() {
  const client = createPublicClient({ chain: somniaTestnet, transport: http() });
  
  console.log("🔍 Running Diagnostic on PulseGuard Contract...");
  
  try {
    const marketCount = await client.readContract({
      address: PULSEGUARD_ADDRESS as `0x${string}`,
      abi: PULSEGUARD_ABI,
      functionName: 'marketCount',
    });
    console.log(`✅ Current On-Chain Market Count: ${marketCount}`);

    console.log("--- Simulating 1 STT Bet on Market 1 ---");
    
    // This will throw an error with the EXACT reason for the revert
    await client.simulateContract({
      account: WALLET_ADDRESS as `0x${string}`,
      address: PULSEGUARD_ADDRESS as `0x${string}`,
      abi: PULSEGUARD_ABI,
      functionName: 'placeBet',
      args: [BigInt(1), true, BigInt(0), BigInt(0)],
      value: parseEther('1'),
    });
    
    console.log("🏁 Simulation result: Success! (Wait, if this succeeds, your frontend should too).");
  } catch (error: any) {
    console.log("\n❌ REVERT REASON FOUND:");
    console.log("-------------------------------------------------");
    // Extracting the specific revert reason from the long error string
    const reason = error.message.split('reverted with the following reason:')[1] || error.message;
    console.log(reason.trim());
    console.log("-------------------------------------------------");
  }
}

main();
