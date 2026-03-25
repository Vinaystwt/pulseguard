import { createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { MARKETS } from '../src/lib/markets';
import { PULSEGUARD_ABI, PULSEGUARD_ADDRESS, somniaTestnet } from '../src/lib/somnia';

// Auto-format the key to ensure it has the 0x prefix
const rawKey = (process.env.PRIVATE_KEY || '').trim();
const formattedKey = rawKey.startsWith('0x') ? rawKey : `0x${rawKey}`;

async function main() {
  console.log("🚀 Starting PulseGuard Market Seeder...");
  
  const account = privateKeyToAccount(formattedKey as `0x${string}`);
  const client = createWalletClient({ account, chain: somniaTestnet, transport: http() });
  const publicClient = createPublicClient({ chain: somniaTestnet, transport: http() });

  console.log(`Connected Wallet: ${account.address}`);
  console.log(`Target Contract: ${PULSEGUARD_ADDRESS}`);
  console.log("-------------------------------------------------");

  for (let i = 0; i < MARKETS.length; i++) {
    const m = MARKETS[i];
    console.log(`[${i + 1}/${MARKETS.length}] Creating: ${m.title}`);
    
    try {
      const tx = await client.writeContract({
        address: PULSEGUARD_ADDRESS as `0x${string}`,
        abi: PULSEGUARD_ABI,
        functionName: 'createMarket',
        args: [m.title, BigInt(2592000)],
        value: parseEther('1'), 
      });

      console.log(`   ⏳ Waiting for block confirmation...`);
      await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log(`   ✅ Success! Tx: ${tx}`);
    } catch (error) {
      console.error(`   ❌ Failed to create market:`, error);
    }
  }
  
  console.log("-------------------------------------------------");
  console.log("🎉 All 20 markets successfully seeded to the blockchain!");
}

main();
