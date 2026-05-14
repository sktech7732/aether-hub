"use client";

import React, { useEffect, useRef } from 'react';

const BANNER_ZONE_ID = "11006892";
const AD_SCRIPT_BASE = "https://quge5.com/pfe/current/tag.min.js";

export const HorizontalAd = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector('script')) {
      const s = document.createElement('script');
      s.src = `${AD_SCRIPT_BASE}?z=${BANNER_ZONE_ID}`;
      s.async = true;
      containerRef.current.appendChild(s);
    }
  }, []);

  return (
    <div className="col-span-full w-full py-4">
      <div 
        ref={containerRef}
        className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-neon-violet/5 opacity-50 pointer-events-none" />
        <div className="absolute top-2 right-4 text-[8px] font-bold text-slate-700 uppercase tracking-widest z-0 opacity-50">
          News Network Sponsored
        </div>
      </div>
    </div>
  );
};

export const VerticalAd = ({ side }: { side: 'left' | 'right' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector('script')) {
      const s = document.createElement('script');
      s.src = `${AD_SCRIPT_BASE}?z=${BANNER_ZONE_ID}`;
      s.async = true;
      containerRef.current.appendChild(s);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`hidden 2xl:flex fixed top-48 ${side === 'left' ? 'left-4' : 'right-4'} w-[160px] h-[600px] bg-white/5 border border-white/10 rounded-3xl flex-col items-center justify-center overflow-hidden z-40 shadow-2xl shadow-black`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-neon-violet/5 opacity-50 pointer-events-none" />
      <div className="relative z-0 text-[9px] font-bold text-slate-700 uppercase tracking-widest rotate-90 whitespace-nowrap opacity-30">
        Vertical Ad Network
      </div>
    </div>
  );
};
