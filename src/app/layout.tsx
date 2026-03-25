'use client'
import './globals.css'
import { WagmiProvider, useConnect, useAccount, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/lib/wagmiConfig'
import { useState, useEffect } from 'react'
import { ReactivityBanner } from '@/components/ReactivityBanner'
import { WelcomeModal } from '@/components/WelcomeModal'

function WalletButton() {
  const { connect } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return (
      <button className="text-sm px-3 py-1.5 rounded-md bg-indigo-600 font-medium opacity-0">
        Connect Wallet
      </button>
    )
  }

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="text-sm font-mono px-3 py-1.5 rounded-md border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10 transition-colors"
      >
        {address.slice(0, 6)}…{address.slice(-4)}
      </button>
    )
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="text-sm px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 transition-colors font-medium"
    >
      Connect Wallet
    </button>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <html lang="en">
      <body className="bg-[#09090f] text-white antialiased">
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <nav className="border-b border-white/5 px-6 py-3 flex items-center justify-between sticky top-0 z-40 bg-[#09090f]/90 backdrop-blur">
              <a href="/" className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="font-bold text-lg tracking-tight hover:text-indigo-400 transition-colors">PulseGuard</span>
                <span className="text-xs text-white/30 font-mono ml-1">on Somnia</span>
              </a>
              <div className="flex items-center gap-6 text-sm text-white/50">
                <a href="/" className="hover:text-white transition-colors">Markets</a>
                <a href="/create" className="hover:text-white transition-colors">Create</a>
                <a href="/leaderboard" className="hover:text-white transition-colors">Pulse Scores</a>
              </div>
              <WalletButton />
            </nav>
            {children}
            <ReactivityBanner />
            <WelcomeModal />
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
