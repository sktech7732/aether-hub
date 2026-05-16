"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Twitter, Linkedin, Radio } from 'lucide-react';

const SignatureFooter = () => {
  return (
    <footer className="mt-32 pb-12 flex flex-col items-center justify-center border-t border-white/5 pt-20 w-full space-y-16">
      {/* High-Tech Newsletter Box */}
      <div className="w-full max-w-2xl px-4">
        <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Stay Connected</h4>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Join the Aether Intelligence Stream</p>
            </div>
            
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="terminal@intel.com"
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-xs text-white focus:outline-none focus:border-neon-cyan/50 flex-1 md:w-64"
              />
              <button className="p-4 bg-neon-cyan text-black rounded-2xl hover:scale-105 transition-transform">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand & Socials */}
      <div className="flex flex-col items-center space-y-8 w-full">
        <div className="flex gap-6">
          {[Github, Twitter, Linkedin, Radio].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ y: -5, color: '#06b6d4' }}
              className="p-3 bg-white/5 rounded-2xl border border-white/10 text-slate-500 transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>

        <div className="text-center group">
          <div className="relative inline-block">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative px-10 py-4 glass rounded-full border border-white/5 group-hover:border-neon-cyan/30 transition-all duration-500 flex items-center gap-4"
            >
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                Master Architect
              </span>
              <div className="w-px h-5 bg-white/10 group-hover:bg-neon-cyan/30" />
              <span className="text-base font-black text-white tracking-[0.3em] italic">
                ⟨ OP CHOUDHARY ⟩
              </span>
            </motion.div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">System Online</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest opacity-50">
            © 2026 Aether News // All Intel Encrypted
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SignatureFooter;
