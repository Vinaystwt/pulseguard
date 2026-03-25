'use client'
import { useState, useEffect } from 'react'
import { MARKETS } from '@/lib/markets'
import { MarketCard } from '@/components/MarketCard'
import { useReadContract } from 'wagmi'
import { PULSEGUARD_ABI, PULSEGUARD_ADDRESS } from '@/lib/somnia'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const { data: count }: any = useReadContract({
    address: PULSEGUARD_ADDRESS as `0x${string}`,
    abi: PULSEGUARD_ABI,
    functionName: 'marketCount',
  })

  const totalOnChain = count ? Number(count) : 40
  const userMarketIds = totalOnChain > 40 
    ? Array.from({ length: totalOnChain - 40 }, (_, i) => (i + 41).toString()) 
    : []

  if (!mounted) return null

  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 pb-12 space-y-10">
      <section className="space-y-6">
        <div className="flex justify-between items-end px-1">
          <div>
            <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Verified Markets</h2>
            <p className="text-[9px] font-mono text-indigo-400 uppercase tracking-[0.3em] mt-1">Curated by Somnia Node</p>
          </div>
          <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">{MARKETS.length} Active Registry</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MARKETS.map((market) => (
            <MarketCard key={market.id} {...market} />
          ))}
        </div>
      </section>

      {userMarketIds.length > 0 && (
        <section className="space-y-6 border-t border-white/5 pt-10">
          <div className="flex justify-between items-end px-1">
            <div>
              <h2 className="text-xl font-black text-indigo-400 tracking-tighter uppercase italic">Permissionless Feed</h2>
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] mt-1">Community Protocol Layer</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {userMarketIds.map((id) => (
              <MarketCard key={id} id={id} title={`Market #${id}`} yesOdds={50} noOdds={50} volume="New" trades={0} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
