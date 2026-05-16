"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Zap, Cpu, ShieldCheck } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
  thumbnail?: string;
}

const NewsCard = ({ article }: { article: NewsItem }) => {
  const snippet = article.description.replace(/<[^>]*>?/gm, '').substring(0, 110) + '...';

  const playHoverSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 0.05;
    audio.play().catch(() => {}); // Ignore if browser blocks auto-play
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onMouseEnter={playHoverSound}
      whileHover={{ y: -8 }}
      className="relative glass rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col h-full hover:border-neon-cyan/50 transition-all group shadow-2xl shadow-black"
    >
      {/* AI Intelligence Chip */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 backdrop-blur-md">
          <Cpu size={10} className="text-neon-cyan" />
          <span className="text-[8px] font-black text-neon-cyan uppercase tracking-widest">AI Analyzed</span>
        </div>
      </div>

      {/* Scanning Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-cyan opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 pointer-events-none" />

      <div className="p-8 flex flex-col h-full relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-neon-cyan" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              {article.source}
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
            {new Date(article.pubDate).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-xl font-black text-white leading-[1.2] tracking-tight mb-4 group-hover:text-neon-cyan transition-colors">
          {article.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1 opacity-70 group-hover:opacity-100 transition-opacity">
          {snippet}
        </p>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto relative group/btn overflow-hidden flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all hover:border-neon-cyan hover:bg-neon-cyan/10"
        >
          <span className="relative z-10">Read More</span>
          <ExternalLink size={14} className="relative z-10 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Reading Progress Indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-neon-cyan/20 w-0 group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
};

export default NewsCard;
