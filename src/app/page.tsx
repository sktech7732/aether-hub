"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CategoryBar from '@/components/ui/CategoryBar';
import NewsGrid from '@/components/ui/NewsGrid';
import { Sparkles } from 'lucide-react';
import HeroSlider from '@/components/ui/HeroSlider';

export default function AetherNews() {
  const [activeCategory, setActiveCategory] = useState('tech');

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Dynamic Hero Slider */}
        <HeroSlider />

        {/* Categories Bar */}
        <div className="sticky top-20 z-40 bg-[#020617]/80 backdrop-blur-md -mx-4 px-4 py-3 rounded-b-2xl">
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
