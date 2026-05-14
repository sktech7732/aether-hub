"use client";

import React from 'react';

// Using the EXACT Magnificent tag script from the dashboard for In-Page Push Banners
export const HorizontalAd = () => {
  return (
    <div className="col-span-full w-full py-4">
      <div className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-neon-violet/5 opacity-50" />
        <div 
          className="relative z-10 w-full flex justify-center"
          dangerouslySetInnerHTML={{
            __html: `<script src="https://quge5.com/pfe/current/tag.min.js?z=11006892" data-cfasync="false" async></script>`
          }}
        />
        <div className="absolute top-2 right-4 text-[8px] font-bold text-slate-700 uppercase tracking-widest z-0 opacity-50">
          Intelligence Feed Ad
        </div>
      </div>
    </div>
  );
};

export const VerticalAd = ({ side }: { side: 'left' | 'right' }) => {
  return (
    <div 
      className={`hidden 2xl:flex fixed top-48 ${side === 'left' ? 'left-4' : 'right-4'} w-[160px] h-[600px] bg-white/5 border border-white/10 rounded-3xl flex-col items-center justify-center overflow-hidden z-40 shadow-2xl shadow-black`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-neon-violet/5 opacity-50" />
      <div 
        className="relative z-10 w-full flex justify-center"
        dangerouslySetInnerHTML={{
          __html: `<script src="https://quge5.com/pfe/current/tag.min.js?z=11006892" data-cfasync="false" async></script>`
        }}
      />
      <div className="relative z-0 text-[9px] font-bold text-slate-700 uppercase tracking-widest rotate-90 whitespace-nowrap opacity-30">
        Vertical Network Ad
      </div>
    </div>
  );
};
