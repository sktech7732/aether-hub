"use client";

import React, { useState, Suspense } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NewsGrid from '@/components/ui/NewsGrid';
import CategoryBar from '@/components/ui/CategoryBar';
import { Newspaper } from 'lucide-react';
import { HorizontalAd } from '@/components/ads/InFeedAds';

export default function NewsArchive() {
  const [activeCategory, setActiveCategory] = useState('tech');

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neon-cyan/10 rounded-2xl border border-neon-cyan/20">
              <Newspaper className="text-neon-cyan" size={24} />
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
              Intelligence <span className="text-neon-cyan">Archive</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            Deciphering the global matrix // 24/7 Intel Stream
          </p>
        </header>

        <HorizontalAd />

        <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-md -mx-4 px-4 py-4 rounded-b-3xl border-b border-white/5">
          <CategoryBar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>

        <Suspense fallback={<div className="text-center py-20 text-slate-500 uppercase tracking-widest text-xs font-bold">Synchronizing Feed...</div>}>
          <NewsGrid category={activeCategory} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
