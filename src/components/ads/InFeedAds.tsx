"use client";

import React, { useEffect, useRef } from 'react';

export const HorizontalAd = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector('script')) {
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.innerHTML = `
        atOptions = {
          'key' : 'a85949e71198684afe139f5f7c13701d',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = '//www.highperformanceformat.com/a85949e71198684afe139f5f7c13701d/invoke.js';
      
      containerRef.current.appendChild(script1);
      containerRef.current.appendChild(script2);
    }
  }, []);

  return (
    <div className="col-span-full w-full py-4">
      <div className="w-full flex justify-center">
        <div 
          ref={containerRef}
          className="w-full max-w-[728px] min-h-[90px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-neon-violet/5 opacity-50 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export const VerticalAd = ({ side }: { side: 'left' | 'right' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector('script')) {
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.innerHTML = `
        atOptions = {
          'key' : '0a59a5423417ba377ceb1e52a0c7ee66',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      `;
      
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = '//www.highperformanceformat.com/0a59a5423417ba377ceb1e52a0c7ee66/invoke.js';
      
      containerRef.current.appendChild(script1);
      containerRef.current.appendChild(script2);
    }
  }, []);

  return (
    <div 
      className={`hidden 2xl:flex fixed top-48 ${side === 'left' ? 'left-4' : 'right-4'} w-[160px] h-[600px] bg-white/5 border border-white/10 rounded-xl flex-col items-center justify-center overflow-hidden z-40 shadow-2xl shadow-black`}
    >
      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-neon-violet/5 opacity-50 pointer-events-none" />
      </div>
    </div>
  );
};
