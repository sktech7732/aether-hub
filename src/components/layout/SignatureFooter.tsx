"use client";

import { PROP_AD_SCRIPT_URL } from '@/config/ads';

import { motion } from 'framer-motion';

const SignatureFooter = () => {
  return (
    <footer className="mt-20 pb-10 flex flex-col items-center justify-center border-t border-white/5 pt-10">
      <div className="text-center group">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-2 group-hover:text-neon-cyan transition-colors">
          Digital Architect
        </p>
        <div className="relative inline-block">
          {/* Neon Glow behind the name */}
          <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative px-6 py-2 glass rounded-full border border-white/5 group-hover:border-neon-cyan/30 transition-all duration-500"
          >
            <span className="text-sm md:text-base font-black text-white tracking-[0.2em] italic drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              ⟨ OP CHOUDHARY ⟩
            </span>
          </motion.div>
        </div>
        
        {/* PropellerAds Banner */}
        <div className="flex justify-center my-4">
          <script async src={PROP_AD_SCRIPT_URL}></script>
        </div>

      </div>
    </footer>
  );
};

export default SignatureFooter;
