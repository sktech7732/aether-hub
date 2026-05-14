"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Video, Menu, X, Zap } from 'lucide-react';
import WeatherWidget from '../ui/WeatherWidget';
import { motion, AnimatePresence } from 'framer-motion';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'ClipForge', icon: <Video size={20} />, path: '/clip-forge' },
  ];

  return (
    <nav className="md:hidden fixed top-0 left-0 w-full z-[100] px-4 py-3">
      <div className="glass rounded-2xl border border-white/10 px-4 py-2 flex justify-between items-center backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center">
            <Zap className="text-white fill-white" size={16} />
          </div>
          <span className="text-lg font-black tracking-tighter text-white">
            AETHER<span className="text-neon-cyan">HUB</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <WeatherWidget />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            <div className="glass rounded-3xl border border-white/10 p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-4 px-5 py-4 rounded-2xl transition-all
                      ${isActive ? 'bg-neon-cyan/10 border border-neon-cyan/20 text-white' : 'text-slate-400 border border-transparent'}
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

export default MobileNav;
