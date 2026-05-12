"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { GAMES } from '@/data/games';
import { motion } from 'framer-motion';
import { Maximize2, RotateCcw, Heart, Share2, ArrowLeft, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

const PlayPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const game = GAMES.find(g => g.id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!game) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-black text-white">Game Not Found</h2>
          <Link href="/" className="text-neon-cyan mt-4 block underline">Back to Arcade</Link>
        </div>
      </DashboardLayout>
    );
  }

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-frame');
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation / Breadcrumb */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-neon-cyan transition-colors group font-bold uppercase tracking-widest text-xs"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Nexus
          </button>
          
          <div className="flex items-center gap-2 text-neon-cyan">
            <Gamepad2 size={14} className="fill-neon-cyan" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Active Session</span>
          </div>
        </div>

        {/* Game Container */}
        <div className="relative group">
          {/* Main Stage */}
          <div className={`
            relative aspect-video rounded-[2.5rem] overflow-hidden glass border border-white/10 shadow-2xl shadow-black/50
            ${isFullscreen ? 'fixed inset-0 z-[100] rounded-none' : ''}
          `}>
            <iframe 
              id="game-frame"
              src={game.sourceUrl} 
              className="w-full h-full border-none"
              title={game.title}
              allow="fullscreen"
            />
            
            {/* Loading Overlay (Simple) */}
            <div className="absolute inset-0 bg-[#020617] -z-10 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-neon-cyan/20 border-t-neon-cyan rounded-full animate-spin" />
            </div>
          </div>

          {/* Floating Controls Overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={toggleFullscreen} className="text-slate-400 hover:text-neon-cyan transition-colors flex flex-col items-center gap-1">
              <Maximize2 size={18} />
              <span className="text-[8px] font-black uppercase">Full</span>
            </button>
            <button onClick={() => window.location.reload()} className="text-slate-400 hover:text-neon-cyan transition-colors flex flex-col items-center gap-1">
              <RotateCcw size={18} />
              <span className="text-[8px] font-black uppercase">Reset</span>
            </button>
            <div className="w-[1px] h-8 bg-white/10 mx-2" />
            <button className="text-slate-400 hover:text-pink-500 transition-colors flex flex-col items-center gap-1">
              <Heart size={18} />
              <span className="text-[8px] font-black uppercase">Fav</span>
            </button>
            <button className="text-slate-400 hover:text-neon-cyan transition-colors flex flex-col items-center gap-1">
              <Share2 size={18} />
              <span className="text-[8px] font-black uppercase">Link</span>
            </button>
          </div>
        </div>

        {/* Info & Metadata */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-5xl font-black text-white tracking-tighter italic">
              {game.title.toUpperCase()}
            </h1>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              {game.description}
            </p>
            <div className="flex gap-4">
              <div className="glass px-4 py-2 rounded-xl border-white/5 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${game.color}`} />
                <span className="text-xs font-black text-white uppercase tracking-widest">{game.category}</span>
              </div>
              <div className="glass px-4 py-2 rounded-xl border-white/5 flex items-center gap-2">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-black text-white">{game.rating}</span>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl border-white/5 min-w-[280px]">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Transmission Info</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">Total Play Sessions</span>
                <span className="text-xs font-black text-white">{game.playCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">Status</span>
                <span className="text-xs font-black text-emerald-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  STABLE
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">Engine</span>
                <span className="text-xs font-black text-neon-cyan">HTML5 / GLES2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlayPage;
