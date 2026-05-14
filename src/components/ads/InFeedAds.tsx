"use client";

import React, { useEffect, useRef } from 'react';
import { PROP_AD_SCRIPT_URL } from '@/config/ads';

export const HorizontalAd = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = PROP_AD_SCRIPT_URL;
      script.async = true;
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="col-span-full w-full py-4">
      <div 
        ref={adRef}
        className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-neon-violet/5 opacity-50" />
        <div className="absolute top-2 right-4 text-[8px] font-bold text-slate-700 uppercase tracking-widest z-10">
          Sponsored
        </div>
      </div>
    </div>
  );
};

export const VerticalAd = ({ side }: { side: 'left' | 'right' }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = PROP_AD_SCRIPT_URL;
      script.async = true;
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div 
      ref={adRef}
      className={`hidden 2xl:flex fixed top-48 ${side === 'left' ? 'left-4' : 'right-4'} w-[160px] h-[600px] bg-white/5 border border-white/10 rounded-3xl flex-col items-center justify-center overflow-hidden z-40 shadow-2xl shadow-black`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-neon-violet/5 opacity-50" />
      <div className="relative z-10 text-[9px] font-bold text-slate-700 uppercase tracking-widest rotate-90 whitespace-nowrap">
        Advertisement
      </div>
    </div>
  );
};
