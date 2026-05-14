"use client";

import React from 'react';
import { PROP_AD_SCRIPT_URL } from '@/config/ads';

export const HorizontalAd = () => {
  return (
    <div className="col-span-full w-full py-4">
      <div className="w-full h-[120px] bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden relative group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--neon-cyan),transparent_80%)] opacity-5" />
        <script async src={PROP_AD_SCRIPT_URL}></script>
        <div className="relative z-10 text-[9px] font-bold text-slate-700 uppercase tracking-[0.3em]">
          Sponsored Content
        </div>
      </div>
    </div>
  );
};

export const VerticalAd = ({ side }: { side: 'left' | 'right' }) => {
  return (
    <div className={`hidden 2xl:flex fixed top-48 ${side === 'left' ? 'left-4' : 'right-4'} w-[160px] h-[600px] bg-white/5 border border-white/10 rounded-3xl items-center justify-center overflow-hidden z-40 shadow-2xl shadow-black`}>
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-neon-violet/5 opacity-50" />
      <script async src={PROP_AD_SCRIPT_URL}></script>
      <div className="relative z-10 text-[9px] font-bold text-slate-700 uppercase tracking-widest rotate-90 whitespace-nowrap">
        Advertisement
      </div>
    </div>
  );
};
