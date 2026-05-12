"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Play } from 'lucide-react';
import { Game } from '@/data/games';

const GameCard = ({ game }: { game: Game }) => {
  return (
    <Link href={`/play/${game.id}`} className="group relative block">
      <motion.div
        whileHover={{ y: -8 }}
        className="relative overflow-hidden rounded-[2rem] glass border border-white/5 group-hover:border-white/20 transition-all duration-500"
      >
        {/* Thumbnail Image / Logo */}
        <div className="relative aspect-square overflow-hidden flex items-center justify-center p-8 bg-black/40">
          <img 
            src={game.thumbnail} 
            alt={game.title}
            className="w-full h-auto max-h-[80%] object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Decorative Grid Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          
          {/* Category Tag */}
          <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full border border-white/10 text-[10px] font-black tracking-widest text-white/70 uppercase">
            {game.category}
          </div>

          {/* Hover Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-neon-cyan/20 backdrop-blur-[2px]">
            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
              <Play fill="black" size={32} className="ml-1" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-black text-white group-hover:text-neon-cyan transition-colors truncate pr-2">
              {game.title}
            </h3>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={12} fill="currentColor" />
              <span className="text-xs font-bold">{game.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {game.playCount} PLAYS
            </span>
            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${game.color} animate-pulse`} />
          </div>
        </div>

        {/* Outer Glow Effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
      </motion.div>
    </Link>
  );
};

export default GameCard;
