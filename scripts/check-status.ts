import { createPublicClient, http, formatEther } from 'viem';
import { somniaTestnet } from '../src/lib/somnia';

const WALLET_ADDRESS = '0x94c188F8280cA706949CC030F69e42B5544514ac'; // Your address from the logs

async function main() {
  const client = createPublicClient({ chain: somniaTestnet, transport: http() });
  
  const balance = await client.getBalance({ address: WALLET_ADDRESS as `0x${string}` });
  console.log("-------------------------------------------------");
  console.log(`Wallet: ${WALLET_ADDRESS}`);
  console.log(`Real On-Chain Balance: ${formatEther(balance)} STT`);
  console.log("-------------------------------------------------");
  
  // Checking for the last transaction hash you got
  const lastHash = '0x0e26b2690d839f4df726f86d4a56c98224a19be545d5f1631b5a7d80f86630c6';
  try {
    const receipt = await client.getTransactionReceipt({ hash: lastHash as `0x${string}` });
    console.log(`Last Transaction (${lastHash.slice(0,10)}...): ${receipt.status === 'success' ? '✅ SUCCESS' : '❌ REVERTED'}`);
  } catch (e) {
    console.log("Last Transaction: Not found in current block history.");
  }
}

main();
