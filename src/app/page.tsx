"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import GameGrid from '@/components/games/GameGrid';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Sparkles } from 'lucide-react';

export default function ArcadeNexus() {
  return (
    <DashboardLayout>
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 text-neon-cyan mb-2">
            <Sparkles size={14} className="fill-neon-cyan" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Featured Release</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            ARCADE<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet">NEXUS.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg font-medium leading-relaxed">
            The premium gateway to futuristic browser gaming. High-performance, 
            zero-friction, and 100% immersive arcade modules.
          </p>
        </motion.div>
      </header>

      {/* Hero / Trending Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan">
            <TrendingUp size={20} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
            Trending Modules
          </h2>
        </div>
        
        <GameGrid />
      </section>

      {/* Platform Stats / Info Footer */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Network Uptime', value: '99.9%', color: 'text-emerald-400' },
          { label: 'Global Players', value: '5.2M', color: 'text-neon-cyan' },
          { label: 'Active Modules', value: '120+', color: 'text-neon-violet' },
        ].map((stat) => (
          <div key={stat.label} className="glass p-8 rounded-[2rem] border-white/5 text-center group hover:border-white/10 transition-all">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className={`text-4xl font-black ${stat.color} group-hover:scale-110 transition-transform`}>{stat.value}</p>
          </div>
        ))}
      </section>
    </DashboardLayout>
  );
}
