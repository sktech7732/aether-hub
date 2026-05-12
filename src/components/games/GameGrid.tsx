"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GameCard from './GameCard';
import { GAMES } from '@/data/games';
import { Search, Filter } from 'lucide-react';

const GameGrid = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Action', 'Puzzle', 'Arcade', 'Racing'];

  const filteredGames = GAMES.filter(game => {
    const matchesFilter = filter === 'All' || game.category === filter;
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-neon-cyan transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search game nexus..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/[0.08] transition-all"
          />
        </div>

        <div className="flex gap-2 p-1 glass rounded-2xl border-white/5 overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                ${filter === cat ? 'bg-neon-cyan text-black shadow-[0_0_15px_var(--neon-cyan)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredGames.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em]">No modules found in this sector.</p>
        </div>
      )}
    </section>
  );
};

export default GameGrid;
