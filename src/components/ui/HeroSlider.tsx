"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Zap } from 'lucide-react';

const featuredNews = [
  {
    title: "Aether AI Neural Network Reaches Singular Peak",
    description: "New benchmarks show 400% increase in predictive intelligence across decentralized nodes.",
    tag: "Intelligence",
    color: "from-neon-cyan/20 to-transparent"
  },
  {
    title: "Next-Gen Quantum Automotive Drive Systems Tested",
    description: "Zero-latency transmission achieved in latest high-speed trials on the Neo-Berlin circuit.",
    tag: "Automotive",
    color: "from-neon-violet/20 to-transparent"
  },
  {
    title: "Global Cyber-Security Protocols Enforced",
    description: "The Intelligence Network implements new level 7 encryption for all digital assets.",
    tag: "Security",
    color: "from-red-500/10 to-transparent"
  }
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % featuredNews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[280px] md:h-[350px] w-full overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${featuredNews[index].color} bg-black p-8 md:p-16 flex flex-col justify-center`}
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-full h-full opacity-30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/10 blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Zap size={10} className="text-neon-cyan" />
              <span className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.2em]">{featuredNews[index].tag}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase italic">
              {featuredNews[index].title}
            </h2>
            
            <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed max-w-xl">
              {featuredNews[index].description}
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button className="px-6 py-2.5 bg-neon-cyan text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-105 transition-transform">
                Read Report
              </button>
              <div className="flex gap-2">
                {featuredNews.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-8 h-1 rounded-full transition-all duration-500 ${i === index ? 'bg-neon-cyan' : 'bg-white/10'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIndex((prev) => (prev - 1 + featuredNews.length) % featuredNews.length)}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-neon-cyan hover:text-black transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => setIndex((prev) => (prev + 1) % featuredNews.length)}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-neon-cyan hover:text-black transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
