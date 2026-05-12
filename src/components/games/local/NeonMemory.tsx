"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Database, Shield, HardDrive, Cpu as Cpu2, Box, Radio } from 'lucide-react';

const ICONS = [Cpu, Zap, Database, Shield, HardDrive, Cpu2, Box, Radio];

const NeonMemory = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'won'>('start');

  const initGame = useCallback(() => {
    const deck = [...ICONS, ...ICONS]
      .map((Icon, i) => ({ id: i, Icon, value: Icon.name }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameState('playing');
  }, []);

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      if (cards[newFlipped[0]].value === cards[newFlipped[1]].value) {
        setMatched(prev => [...prev, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameState('won');
    }
  }, [matched, cards]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 bg-slate-950 font-sans">
      <div className="flex justify-between w-full max-w-[500px] mb-8">
        <div className="glass px-6 py-2 rounded-2xl border-white/10">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Cycles</span>
          <span className="text-2xl font-black text-white italic">{moves}</span>
        </div>
        <button 
          onClick={initGame}
          className="glass px-6 py-2 rounded-2xl border-white/10 hover:border-neon-cyan text-slate-400 hover:text-neon-cyan transition-all"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Reboot</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full max-w-[500px]">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(i);
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlip(i)}
              className={`
                aspect-square rounded-2xl cursor-pointer transition-all duration-500 preserve-3d relative
                ${isFlipped ? 'rotate-y-180' : ''}
              `}
            >
              <div className={`
                absolute inset-0 rounded-2xl glass border border-white/10 flex items-center justify-center backface-hidden transition-all
                ${isFlipped ? 'opacity-0 scale-0' : 'opacity-100 scale-100 bg-black/40'}
              `}>
                <div className="w-4 h-4 bg-neon-cyan/20 rounded-full animate-pulse" />
              </div>
              <div className={`
                absolute inset-0 rounded-2xl border flex items-center justify-center transition-all duration-500
                ${isFlipped ? 'opacity-100 scale-100 rotate-y-180' : 'opacity-0 scale-0'}
                ${matched.includes(i) ? 'border-emerald-400/50 bg-emerald-400/10' : 'border-neon-cyan/50 bg-neon-cyan/10'}
              `}>
                <card.Icon size={32} className={matched.includes(i) ? 'text-emerald-400 shadow-[0_0_15px_#4ade80]' : 'text-neon-cyan shadow-[0_0_15px_#06b6d4]'} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {(gameState === 'start' || gameState === 'won') && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-30 glass flex flex-col items-center justify-center backdrop-blur-md bg-black/60"
          >
            <h2 className="text-5xl font-black text-white italic mb-2 tracking-tighter uppercase">
              {gameState === 'start' ? 'NEURAL MATCH' : 'SYNC COMPLETE'}
            </h2>
            <p className="text-neon-cyan font-bold mb-8 text-xs uppercase tracking-[0.4em]">
              {gameState === 'start' ? 'Sync local data clusters' : `Connection established in ${moves} cycles`}
            </p>
            <button 
              onClick={initGame}
              className="bg-neon-cyan text-black px-12 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_#06b6d4]"
            >
              {gameState === 'start' ? 'Initialize' : 'Re-Sync'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeonMemory;
