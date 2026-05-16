"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Zap } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
  thumbnail?: string;
}

const NewsCard = ({ article }: { article: NewsItem }) => {
  // Extract a clean snippet from description
  const snippet = article.description.replace(/<[^>]*>?/gm, '').substring(0, 110) + '...';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative glass rounded-[2rem] border border-white/5 overflow-hidden flex flex-col h-full hover:border-neon-cyan/50 transition-all group shadow-2xl shadow-black"
    >
      {/* Scanning Line Hover Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 pointer-events-none" />

      {/* Background Glow */}
      <div className="absolute -inset-20 bg-neon-cyan/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="p-7 flex flex-col h-full relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.2em]">
              {article.source}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[9px] font-bold uppercase tracking-widest">
            <Calendar size={10} />
            <span>{new Date(article.pubDate).toLocaleDateString()}</span>
          </div>
        </div>

        <h3 className="text-xl font-black text-white leading-[1.15] tracking-tight mb-4 group-hover:text-neon-cyan transition-colors line-clamp-3">
          {article.title}
        </h3>

        <p className="text-slate-400 text-[13px] leading-relaxed mb-8 flex-1 opacity-80 group-hover:opacity-100 transition-opacity">
          {snippet}
        </p>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto group/btn relative overflow-hidden flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-violet opacity-0 group-hover/btn:opacity-10 transition-opacity" />
          <span className="relative z-10">Access Intel</span>
          <Zap size={14} className="relative z-10 group-hover/btn:fill-neon-cyan transition-colors" />
        </a>
      </div>

      {/* Decorative Corner Brackets */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/10 group-hover:border-neon-cyan/50 transition-colors" />
      <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/10 group-hover:border-neon-cyan/50 transition-colors" />
      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/10 group-hover:border-neon-cyan/50 transition-colors" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/10 group-hover:border-neon-cyan/50 transition-colors" />
    </motion.div>
  );
};

export default NewsCard;
