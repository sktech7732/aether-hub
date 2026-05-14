"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Video, Zap, Settings, Globe, Cloud } from 'lucide-react';
import WeatherWidget from '../ui/WeatherWidget';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const pathname = usePathname();
  const [showSettings, setShowSettings] = React.useState(false);
  const [tempUrl, setTempUrl] = React.useState("");

  React.useEffect(() => {
    setTempUrl(localStorage.getItem('clipforge_backend_url') || "http://localhost:3001");
  }, []);

  const saveUrl = () => {
    localStorage.setItem('clipforge_backend_url', tempUrl);
    window.location.reload(); // Refresh to update hook
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'ClipForge', icon: <Video size={20} />, path: '/clip-forge' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 glass border-r border-white/5 z-50 hidden md:flex flex-col">
      <div className="p-8 pb-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center shadow-lg shadow-neon-cyan/20 group-hover:scale-110 transition-transform">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            AETHER<span className="text-neon-cyan">HUB</span>
          </span>
        </Link>
        
        <div className="mt-6">
          <WeatherWidget />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className="relative block"
            >
              <div className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}>
                <span className={`${isActive ? 'text-neon-cyan' : 'group-hover:text-neon-cyan transition-colors'}`}>
                  {item.icon}
                </span>
                <span className="font-medium tracking-wide">{item.name}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent border-l-2 border-neon-cyan rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto space-y-4">
        <div className="glass rounded-2xl p-4 border-neon-cyan/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_var(--neon-cyan)]" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">System Status</span>
            </div>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="text-slate-500 hover:text-neon-cyan transition-colors"
            >
              <Settings size={14} />
            </button>
          </div>
          
          <AnimatePresence>
            {showSettings ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 overflow-hidden"
              >
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Backend Node IP</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="http://192.168.1.5:3001"
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white focus:border-neon-cyan outline-none"
                    />
                    <button 
                      onClick={saveUrl}
                      className="bg-neon-cyan/20 hover:bg-neon-cyan/40 text-neon-cyan p-1 rounded-lg transition-all"
                    >
                      <Zap size={12} />
                    </button>
                  </div>
                </div>
                <p className="text-[9px] text-slate-600 leading-tight">
                  Enter your PC's IP or Ngrok URL for remote access.
                </p>
              </motion.div>
            ) : (
              <p className="text-[10px] text-slate-500 leading-relaxed">
                All systems nominal. AI processing nodes active.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
