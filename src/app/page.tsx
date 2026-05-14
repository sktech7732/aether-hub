"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CategoryBar from '@/components/ui/CategoryBar';
import NewsGrid from '@/components/ui/NewsGrid';
import { Newspaper, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AetherNews() {
  const [activeCategory, setActiveCategory] = useState('tech');

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-black border border-white/5 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--neon-cyan),transparent_70%)]" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 flex items-center gap-2">
                <Sparkles size={12} className="text-neon-cyan fill-neon-cyan" />
                <span className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.2em]">Global Intelligence Feed</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-6 uppercase">
              AETHER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet">NEWS NETWORK.</span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-8 max-w-2xl">
              Real-time intelligence from the frontier of technology, AI, and the automotive sector. Decoded and delivered instantly.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Feed Status: Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="sticky top-20 z-40 bg-[#020617]/80 backdrop-blur-md -mx-4 px-4 py-4 rounded-b-3xl">
          <CategoryBar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>

        {/* News Grid */}
        <NewsGrid category={activeCategory} />
      </div>
    </DashboardLayout>
  );
}
