"use client";

import React, { useState, Suspense } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CategoryBar from '@/components/ui/CategoryBar';
import NewsGrid from '@/components/ui/NewsGrid';
import { Sparkles } from 'lucide-react';
export default function AetherNews() {
  const [activeCategory, setActiveCategory] = useState('tech');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Original Slim Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-black to-slate-900 border border-white/5 px-6 py-8 md:px-10">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--neon-cyan),transparent_60%)]" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-2 py-0.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 flex items-center gap-2">
                  <Sparkles size={10} className="text-neon-cyan fill-neon-cyan" />
                  <span className="text-[9px] font-black text-neon-cyan uppercase tracking-[0.2em]">Live Intelligence Feed</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-black text-white leading-none tracking-tighter uppercase mb-3">
                AETHER <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet font-black">NEWS NETWORK.</span>
              </h1>
              
              <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
                Real-time intelligence from the frontier of technology, AI, and the automotive sector.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-md -mx-4 px-4 py-3 rounded-b-2xl border-b border-white/5">
          <CategoryBar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>

        {/* News Grid */}
        <Suspense fallback={<div className="text-center py-20 text-slate-500 uppercase tracking-widest text-xs font-bold">Synchronizing Feed...</div>}>
          <NewsGrid category={activeCategory} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
