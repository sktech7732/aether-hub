"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRAVITY = 0.8;
const JUMP = -12;
const SPEED = 6;
const SPAWN_RATE = 1500;

const NeonJump = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [playerVel, setPlayerVel] = useState(0);
  const [obstacles, setObstacles] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  const resetGame = () => {
    setPlayerY(0);
    setPlayerVel(0);
    setObstacles([]);
    setScore(0);
    setGameState('start');
    lastSpawnRef.current = 0;
  };

  const jump = useCallback(() => {
    if (gameState === 'start') setGameState('playing');
    if (gameState === 'playing' && playerY === 0) {
      setPlayerVel(JUMP);
    }
  }, [playerY, gameState]);

  const update = useCallback((time: number) => {
    if (gameState !== 'playing' || !containerRef.current) return;

    // Physics
    setPlayerY(prevY => {
      let nextY = prevY + playerVel;
      if (nextY > 0) {
        nextY = 0;
        setPlayerVel(0);
      }
      return nextY;
    });
    if (playerY < 0) setPlayerVel(v => v + GRAVITY);

    // Obstacles
    if (time - lastSpawnRef.current > SPAWN_RATE - Math.min(score * 10, 800)) {
      setObstacles(prev => [...prev, {
        x: containerRef.current!.offsetWidth,
        type: Math.random() > 0.5 ? 'low' : 'high',
        passed: false
      }]);
      lastSpawnRef.current = time;
    }

    setObstacles(prevObs => {
      const nextObs = prevObs
        .map(o => ({ ...o, x: o.x - (SPEED + score * 0.1) }))
        .filter(o => o.x > -100);

      // Collision
      for (let o of nextObs) {
        if (o.x < 100 + 40 && o.x + 40 > 100) {
          if (o.type === 'low' && playerY > -40) {
            setGameState('gameover');
          }
          if (o.type === 'high' && playerY < -60) {
            setGameState('gameover');
          }
        }
        if (!o.passed && o.x < 100) {
          o.passed = true;
          setScore(s => s + 1);
        }
      }
      return nextObs;
    });

    frameRef.current = requestAnimationFrame(update);
  }, [playerVel, playerY, gameState, score]);

  useEffect(() => {
    if (gameState === 'playing') {
      frameRef.current = requestAnimationFrame(update);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [gameState, update]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp') jump();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  return (
    <div 
      ref={containerRef} 
      onClick={jump}
      className="relative w-full h-full bg-slate-950 overflow-hidden cursor-pointer"
    >
      <div className="absolute top-8 left-8 z-10 flex items-center gap-4">
        <div className="glass px-4 py-1 rounded-xl">
          <span className="text-2xl font-black text-white italic">{score}</span>
        </div>
      </div>

      {/* Ground Line */}
      <div className="absolute bottom-[100px] w-full h-[2px] bg-white/10" />
      <div className="absolute bottom-[100px] w-full h-[1px] bg-neon-cyan shadow-[0_0_15px_#06b6d4]" />

      {/* Player */}
      <motion.div 
        animate={{ y: playerY, rotate: playerY < 0 ? playerVel * 10 : 0 }}
        transition={{ duration: 0 }}
        className="absolute left-[100px] bottom-[100px] w-10 h-10 z-20"
      >
        <div className="w-full h-full bg-neon-cyan rounded-md shadow-[0_0_20px_#06b6d4] border border-white/50" />
      </motion.div>

      {/* Obstacles */}
      {obstacles.map((o, i) => (
        <div 
          key={i}
          style={{ 
            left: o.x, 
            bottom: o.type === 'low' ? 100 : 200,
            width: 40,
            height: o.type === 'low' ? 40 : 100
          }}
          className={`absolute rounded-lg border border-white/20 ${o.type === 'low' ? 'bg-neon-pink shadow-[0_0_15px_#ec4899]' : 'bg-neon-violet shadow-[0_0_15px_#7c3aed]'}`}
        />
      ))}

      <AnimatePresence>
        {gameState !== 'playing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-30 glass flex flex-col items-center justify-center backdrop-blur-md bg-black/60"
          >
            <h2 className="text-5xl font-black text-white italic mb-2 tracking-tighter uppercase">
              {gameState === 'start' ? 'NEON JUMP' : 'CORE SHATTERED'}
            </h2>
            <p className="text-neon-cyan font-bold mb-8 text-xs uppercase tracking-[0.5em]">
              {gameState === 'start' ? 'Initiate Quantum Leap' : `Rebooting... Best: ${score}`}
            </p>
            <button 
              onClick={gameState === 'start' ? jump : resetGame}
              className="bg-neon-cyan text-black px-12 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_#06b6d4]"
            >
              {gameState === 'start' ? 'Initialize' : 'Reboot'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeonJump;
