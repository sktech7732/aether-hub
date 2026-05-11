"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Video, Gamepad2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'ClipForge', icon: <Video size={20} />, path: '/clip-forge' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 glass border-r border-white/5 z-50 hidden md:flex flex-col">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center shadow-lg shadow-neon-cyan/20 group-hover:scale-110 transition-transform">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            AETHER<span className="text-neon-cyan">HUB</span>
          </span>
        </Link>
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

      <div className="p-6 mt-auto">
        <div className="glass rounded-2xl p-4 border-neon-cyan/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_var(--neon-cyan)]" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">System Status</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            All systems nominal. AI processing nodes active.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
