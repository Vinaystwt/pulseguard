'use client';
import { useReadContract } from 'wagmi';
import { PULSEGUARD_ADDRESS, PULSEGUARD_ABI } from '@/lib/somnia';
import { MARKETS as MOCK_MARKETS } from '@/lib/markets';

export function useMarkets() {
  // TODO: Implement actual useReadContract logic here once contract is finalized.
  // For now, we return the mock data to keep the UI fully functional.
  
  return {
    markets: MOCK_MARKETS,
    isLoading: false,
    isError: false,
  };
}

export function useMarket(id: string) {
  // Helper to fetch a single market by ID
  const market = MOCK_MARKETS.find(m => m.id === id);
  return {
    market,
    isLoading: false,
    isError: !market,
  };
}
