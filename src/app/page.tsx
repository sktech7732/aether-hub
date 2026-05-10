"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, ArrowRight, ShieldCheck, Cpu, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-neon-cyan/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-neon-violet/10 blur-[150px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter">AETHER<span className="text-neon-cyan">HUB</span></span>
        </div>
        <Link href="/dashboard" className="glass px-6 py-2.5 rounded-full border-white/10 font-bold hover:border-neon-cyan/50 transition-all">
          Launch Console
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Next-Gen AI Protocol v2.0</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            THE FUTURE OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-violet">AI INTERACTION.</span>
          </h1>

          <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium mb-12 leading-relaxed">
            A premium command center for your local AI modules and high-performance browser tools. Unified, secured, and localized.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/dashboard" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-violet rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative px-10 py-5 bg-black rounded-2xl flex items-center gap-3 font-black text-lg transition-transform group-active:scale-95">
                ENTER THE HUB
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <button className="glass px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-colors">
              VIEW ARCHITECTURE
            </button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto w-full pb-32">
          {[
            { title: 'Local AI Power', desc: 'Process complex video models directly on your hardware.', icon: <Cpu className="text-neon-cyan" /> },
            { title: 'Secured Bridge', desc: 'Encrypted communication between web and local nodes.', icon: <ShieldCheck className="text-neon-violet" /> },
            { title: 'Cloud Ready', desc: 'Access your console from anywhere with high availability.', icon: <Globe className="text-neon-pink" /> },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass p-8 rounded-[2rem] border-white/5 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-3">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
