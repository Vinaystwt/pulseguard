'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { somniaTestnet } from '@/lib/somnia';

const queryClient = new QueryClient();
const config = createConfig({
  chains: [somniaTestnet],
  transports: { [somniaTestnet.id]: http() },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
