"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Video, Gamepad2, ArrowUpRight, Zap, Activity, Clock } from 'lucide-react';
import Link from 'next/link';

const DashboardPage = () => {
  const stats = [
  const stats = [
    { name: 'AI Slices', value: '124', icon: <Video size={16} />, trend: '+12%', color: 'text-neon-cyan' },
    { name: 'GPU Clusters', value: 'Active', icon: <Zap size={16} />, trend: 'Healthy', color: 'text-neon-violet' },
    { name: 'Backend Latency', value: '45ms', icon: <Activity size={16} />, trend: 'Stable', color: 'text-emerald-400' },
  ];

  const tools = [
    {
      name: 'ClipForge',
      description: 'Ultra-fast GPU video slicing and shorts generation.',
      path: '/clip-forge',
      icon: <Video size={32} />,
      color: 'from-neon-cyan to-blue-600',
      tag: 'LOCAL AI'
    }
  ];

  return (
    <DashboardLayout>
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 text-neon-cyan mb-2">
            <Zap size={14} className="fill-neon-cyan" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Protocol Alpha Active</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet">Commander.</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg font-medium">
            Your personal AI command center is online. Access your tools and monitoring systems below.
          </p>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass p-6 rounded-3xl border-white/5 relative overflow-hidden group"
          >
            <div className={`mb-4 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{stat.name}</p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded-lg bg-white/5 ${stat.color}`}>
                {stat.trend}
              </div>
            </div>
            <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 group-hover:scale-125 transition-transform duration-500">
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          Active Modules
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
        </h2>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <Link href={tool.path} className="group relative block h-full">
              <div className="glass h-full p-8 rounded-[2.5rem] border-white/5 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.08] relative overflow-hidden">
                <div className="flex justify-between items-start mb-12">
                  <div className={`p-5 rounded-3xl bg-gradient-to-br ${tool.color} text-white shadow-lg`}>
                    {tool.icon}
                  </div>
                  <div className="glass px-4 py-2 rounded-2xl border-white/10 text-[10px] font-black tracking-widest text-white/50 uppercase group-hover:text-neon-cyan transition-colors">
                    {tool.tag}
                  </div>
                </div>

                <h3 className="text-3xl font-black text-white mb-4 flex items-center gap-3 group-hover:translate-x-2 transition-transform">
                  {tool.name}
                  <ArrowUpRight className="text-slate-500 group-hover:text-neon-cyan transition-colors" />
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  {tool.description}
                </p>

                {/* Decorative Gradient Glow */}
                <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
