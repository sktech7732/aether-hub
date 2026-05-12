"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPEED = 5;
const SPAWN_RATE = 400;

const NeonDodge = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(50); // Percentage
  const [obstacles, setObstacles] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  const resetGame = () => {
    setPlayerX(50);
    setObstacles([]);
    setScore(0);
    setGameState('start');
    lastSpawnRef.current = 0;
  };

  const update = useCallback((time: number) => {
    if (gameState !== 'playing' || !containerRef.current) return;

    // Obstacles
    if (time - lastSpawnRef.current > SPAWN_RATE - Math.min(score * 2, 300)) {
      setObstacles(prev => [...prev, {
        id: Date.now(),
        x: Math.random() * 100,
        y: -10,
        size: 15 + Math.random() * 20
      }]);
      lastSpawnRef.current = time;
    }

    setObstacles(prevObs => {
      const nextObs = prevObs
        .map(o => ({ ...o, y: o.y + (SPEED + score * 0.05) }))
        .filter(o => o.y < 110);

      // Collision
      for (let o of nextObs) {
        if (o.y > 85 && o.y < 95) {
          const dist = Math.abs(o.x - playerX);
          if (dist < 6) {
            setGameState('gameover');
          }
        }
      }
      return nextObs;
    });

    setScore(s => s + 0.1);
    frameRef.current = requestAnimationFrame(update);
  }, [gameState, playerX, score]);

  useEffect(() => {
    if (gameState === 'playing') {
      frameRef.current = requestAnimationFrame(update);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [gameState, update]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setPlayerX(Math.max(5, Math.min(95, x)));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full bg-[#020617] overflow-hidden cursor-none"
    >
      <div className="absolute top-8 right-8 z-10">
        <span className="text-2xl font-black text-neon-cyan italic">{Math.floor(score)}</span>
      </div>

      {/* Grid Effect */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Player */}
      <motion.div 
        animate={{ x: `${playerX}%` }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="absolute bottom-10 -translate-x-1/2 w-8 h-8 z-20"
      >
        <div className="w-full h-full bg-white rounded-full shadow-[0_0_20px_#fff]">
          <div className="absolute inset-0 bg-neon-cyan/50 animate-ping rounded-full" />
        </div>
      </motion.div>

      {/* Obstacles */}
      {obstacles.map((o, i) => (
        <motion.div 
          key={o.id}
          style={{ 
            left: `${o.x}%`, 
            top: `${o.y}%`,
            width: o.size,
            height: o.size
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 bg-neon-pink rounded-lg shadow-[0_0_15px_#ec4899] rotate-45 border border-white/20"
        />
      ))}

      <AnimatePresence>
        {gameState !== 'playing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-30 glass flex flex-col items-center justify-center backdrop-blur-md bg-black/60"
          >
            <h2 className="text-5xl font-black text-white italic mb-2 tracking-tighter uppercase">SPACE WARP</h2>
            <p className="text-neon-cyan font-bold mb-8 text-xs uppercase tracking-[0.5em]">Mouse to Navigate</p>
            <button 
              onClick={gameState === 'start' ? () => setGameState('playing') : resetGame}
              className="bg-neon-cyan text-black px-12 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_#06b6d4]"
            >
              {gameState === 'start' ? 'Initiate' : 'Reboot'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeonDodge;
