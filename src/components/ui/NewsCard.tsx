"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Clock } from 'lucide-react';

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
  const snippet = article.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass rounded-3xl border border-white/5 overflow-hidden flex flex-col h-full hover:border-neon-cyan/30 transition-all group"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-[10px] font-bold text-neon-cyan uppercase tracking-widest">
            {article.source}
          </span>
          <div className="flex items-center gap-2 text-slate-500 text-[10px]">
            <Calendar size={12} />
            <span>{new Date(article.pubDate).toLocaleDateString()}</span>
          </div>
        </div>

        <h3 className="text-lg font-black text-white leading-tight mb-3 group-hover:text-neon-cyan transition-colors">
          {article.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
          {snippet}
        </p>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all"
        >
          Read Full Story
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
};

export default NewsCard;
