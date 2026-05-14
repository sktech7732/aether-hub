"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, Zap, Video, Home, Newspaper, 
  Search, Globe, Share2,
  User, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherWidget from '../ui/WeatherWidget';
import CategoryBar from '../ui/CategoryBar';
import AdBanner from '../ads/AdBanner';

const GlobalNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateTime, setDateTime] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setDateTime(now.toLocaleDateString('en-US', options));
  }, []);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'NEWS', path: '/news' },
    { name: 'EGOV WATCH', path: '#' },
    { name: 'INTERVIEWS', path: '#' },
    { name: 'EDITORIALS', path: '#' },
    { name: 'FEATURES', path: '#' },
    { name: 'VIDEOS', path: '#' },
    { name: 'CLIPFORGE', path: '/clip-forge', highlight: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] flex flex-col bg-black">
      {/* 1. Top Strip */}
      <div className="w-full bg-[#0a0a0a] border-b border-white/5 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 px-2 py-0.5 rounded">
               <span className="text-white">{dateTime}</span>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <Link href="#" className="hover:text-white transition-colors">Advertise With Us</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors border-r border-white/10 pr-4">
              <User size={12} />
              <span>Sign In</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={12} className="hover:text-neon-cyan cursor-pointer transition-colors" />
              <Share2 size={12} className="hover:text-neon-violet cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Branding Area */}
      <div className="w-full bg-black py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex flex-col group">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-neon-cyan/20">
                <Newspaper className="text-white" size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter text-white leading-none uppercase">
                  AETHER<span className="text-neon-cyan">NEWS</span>
                </span>
                <span className="text-[9px] font-black text-slate-500 tracking-[0.4em] uppercase mt-1">Intelligence Network</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <WeatherWidget />
            <div className="hidden sm:block h-10 w-px bg-white/10" />
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest">Global Status</span>
              <span className="text-[9px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Systems Online // 24/7 Feed</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <div className="w-full bg-[#0a0a0a] border-y border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                className={`
                  px-5 py-4 text-[11px] font-black tracking-widest transition-all relative group
                  ${pathname === item.path ? 'text-white bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  ${item.highlight ? 'text-neon-cyan' : ''}
                `}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-cyan" />
                )}
              </Link>
            ))}
          </nav>

          <div className="lg:hidden flex items-center px-4 py-3 w-full justify-between">
             <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest">Navigation Menu</span>
             <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 bg-white/5 rounded-lg">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-6">
            <button className="p-3 text-slate-400 hover:text-white transition-colors">
              <Search size={18} />
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-3 transition-colors ${isOpen ? 'text-neon-cyan' : 'text-slate-400 hover:text-white'}`}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Full Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-[#050505] border-b border-white/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.2em]">Sections</h4>
                <div className="flex flex-col gap-2">
                  {navItems.slice(0, 4).map(i => <Link key={i.name} href={i.path} className="text-sm text-slate-400 hover:text-white">{i.name}</Link>)}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-neon-violet uppercase tracking-[0.2em]">Resources</h4>
                <div className="flex flex-col gap-2">
                  {navItems.slice(4).map(i => <Link key={i.name} href={i.path} className="text-sm text-slate-400 hover:text-white">{i.name}</Link>)}
                </div>
              </div>
              <div className="col-span-2">
                 <div className="glass p-6 rounded-3xl border-white/5 h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-black text-white mb-2">Aether News Premium</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Subscribe to our newsletter for the latest in AI and Cyberpunk tech updates delivered to your terminal.</p>
                    </div>
                    <button className="mt-6 w-full py-3 bg-neon-cyan text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-[1.02] transition-transform">
                      Subscribe Now
                    </button>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default GlobalNav;
