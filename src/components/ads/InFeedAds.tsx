"use client";

import React from 'react';

export const HorizontalAd = () => {
  return (
    <div className="col-span-full w-full py-4 flex justify-center">
      <div className="w-full max-w-[728px] min-h-[90px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden relative shadow-lg shadow-black/50">
        <iframe 
          src="/ads/h-banner.html"
          width="728"
          height="90"
          frameBorder="0"
          scrolling="no"
          title="ad-h"
          className="relative z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-neon-violet/5 opacity-50 pointer-events-none" />
      </div>
    </div>
  );
};

export const VerticalAd = ({ side }: { side: 'left' | 'right' }) => {
  return (
    <div 
      className={`hidden xl:flex fixed top-48 ${side === 'left' ? 'left-4' : 'right-4'} w-[160px] h-[600px] bg-white/5 border border-white/10 rounded-xl flex-col items-center justify-center overflow-hidden z-40 shadow-2xl shadow-black`}
    >
      <iframe 
        src={side === 'left' ? "/ads/v-left.html" : "/ads/v-right.html"}
        width="160"
        height="600"
        frameBorder="0"
        scrolling="no"
        title={`ad-v-${side}`}
        className="relative z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-neon-violet/5 opacity-50 pointer-events-none" />
    </div>
  );
};
