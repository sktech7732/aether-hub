"use client";

import React from 'react';
import { PROP_AD_SCRIPT_URL } from '@/config/ads';

const AdBanner = () => {
  return (
    <div className="w-full flex justify-center mb-8 px-4">
      <div className="w-full max-w-7xl h-[120px] bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden relative group">
        {/* Placeholder/Script Container */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-neon-violet/5 opacity-50" />
        <script async src={PROP_AD_SCRIPT_URL}></script>
        <div className="relative z-10 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          Advertisement
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
