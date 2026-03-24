import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseGuard | Reactive Micro-Bets",
  description: "Instant guards. Zero latency. Built on Somnia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0f] text-white selection:bg-indigo-500/30">
        <Providers>
          <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <span className="font-bold text-xl tracking-tight neon-text">PulseGuard</span>
              </div>
              <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors font-medium text-sm">
                Connect Wallet
              </button>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-6 py-12">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
