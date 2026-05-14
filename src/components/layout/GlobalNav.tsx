"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap, Video, Home, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherWidget from '../ui/WeatherWidget';

const GlobalNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'ClipForge', icon: <Video size={20} />, path: '/clip-forge' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-3">
      <div className="max-w-7xl mx-auto glass rounded-2xl border border-white/10 px-4 py-2 flex justify-between items-center backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-neon-cyan/20 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center group-hover:scale-110 transition-transform">
              <Newspaper className="text-white" size={16} />
            </div>
            <span className="text-lg font-black tracking-tighter text-white hidden sm:inline-block">
              AETHER<span className="text-neon-cyan">NEWS</span>
            </span>
          </Link>

          <div className="hidden md:block h-6 w-px bg-white/10 mx-1" />
          
          <WeatherWidget />
        </div>

        <div className="flex items-center gap-4">
          {/* Right side can be empty or used for profile/search later */}
          <div className="px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-[10px] font-bold text-neon-cyan uppercase tracking-widest hidden sm:block">
            Live Feed
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full px-4 pt-2"
          >
            <div className="max-w-7xl mx-auto glass rounded-3xl border border-white/10 p-4 space-y-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-5 py-2">Navigation</p>
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-4 px-5 py-4 rounded-2xl transition-all
                      ${isActive ? 'bg-neon-cyan/10 border border-neon-cyan/20 text-white shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'text-slate-400 border border-transparent hover:bg-white/5'}
                    `}
                  >
                    <span className={isActive ? 'text-neon-cyan' : ''}>{item.icon}</span>
                    <span className="font-bold tracking-wide">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default GlobalNav;
