"use client";

import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'tech', label: 'Technology', icon: '🚀' },
  { id: 'ai', label: 'Artificial Intelligence', icon: '🤖' },
  { id: 'auto', label: 'Auto Sector', icon: '🏎️' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'science', label: 'Science', icon: '🧪' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
];

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const CategoryBar = ({ activeCategory, onCategoryChange }: CategoryBarProps) => {
  return (
    <div className="w-full overflow-x-auto pb-4 no-scrollbar">
      <div className="flex gap-3 min-w-max px-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all duration-300
              ${activeCategory === cat.id 
                ? 'bg-neon-cyan/20 border-neon-cyan text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}
            `}
          >
            <span className="text-sm">{cat.icon}</span>
            <span className="text-xs font-bold uppercase tracking-widest">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
