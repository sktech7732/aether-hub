"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SignatureFooter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const adKey = 'a85949e71198684afe139f5f7c13701d';

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector('script')) {
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
      
      containerRef.current.appendChild(script1);
      containerRef.current.appendChild(script2);
    }
  }, []);

  return (
    <footer className="mt-20 pb-10 flex flex-col items-center justify-center border-t border-white/5 pt-10 w-full">
      <div className="text-center group mb-8">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative px-8 py-3 glass rounded-full border border-white/5 group-hover:border-neon-cyan/30 transition-all duration-500 flex items-center gap-4"
          >
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
              Digital Architect
            </span>
            <div className="w-px h-4 bg-white/10 group-hover:bg-neon-cyan/30" />
            <span className="text-sm md:text-base font-black text-white tracking-[0.2em] italic drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              ⟨ OP CHOUDHARY ⟩
            </span>
          </motion.div>
        </div>
      </div>

      {/* Footer Banner Ad - Script Injection */}
      <div className="w-full flex justify-center mt-4">
        <div 
          ref={containerRef}
          className="w-full max-w-[728px] min-h-[90px] bg-white/5 border border-white/10 rounded-xl overflow-hidden relative flex items-center justify-center shadow-lg shadow-black/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-neon-violet/5 opacity-50 pointer-events-none" />
        </div>
      </div>
      
      <p className="mt-8 text-[9px] font-bold text-slate-600 uppercase tracking-widest opacity-50">
        © 2026 Aether News Network // All Intelligence Encrypted
      </p>
    </footer>
  );
};

export default SignatureFooter;
