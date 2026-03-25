'use client';
import { useState, useEffect } from 'react';

export function ReactivityBanner() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const messages = [
    "⚡ Stop-Loss Executed — Market #3 — Block #8,291,443",
    "⚡ Odds Updated — Market #1 — Reactivity Push",
    "⚡ Market Resolved — Payouts Distributed — Block #8,291,389",
    "⚡ Guard Triggered — 0x9f2a…c341 protected — Same Block"
  ];

  useEffect(() => {
    let i = 0;
    // Fire immediately for demo purposes, then every 18s
    setTimeout(() => {
      setMessage(messages[0]);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    }, 2000);

    const interval = setInterval(() => {
      i++;
      setMessage(messages[i % messages.length]);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-6 z-50 bg-[#0a0a0c] border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)] rounded-lg p-4 animate-in slide-in-from-right-8 fade-in duration-300">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
        <div>
          <div className="text-sm font-bold text-indigo-100">{message}</div>
          <div className="text-[10px] font-mono text-white/40 mt-1">Somnia Reactivity — same-block execution</div>
        </div>
      </div>
    </div>
  );
}
