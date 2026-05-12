"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRAVITY = 0.8;
const JUMP = -15;
const SPEED = 7;
const OBSTACLE_SPAWN_RATE = 1200;

const NeonTRex = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [dinoY, setDinoY] = useState(0);
  const [dinoVel, setDinoVel] = useState(0);
  const [obstacles, setObstacles] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  const resetGame = () => {
    setDinoY(0);
    setDinoVel(0);
    setObstacles([]);
    setScore(0);
    setGameState('start');
    lastSpawnRef.current = 0;
  };

  const jump = useCallback(() => {
    if (gameState === 'start') setGameState('playing');
    if (gameState === 'playing' && dinoY === 0) {
      setDinoVel(JUMP);
    }
  }, [dinoY, gameState]);

  const update = useCallback((time: number) => {
    if (gameState !== 'playing' || !containerRef.current) return;

    // Dino Physics
    setDinoY(prevY => {
      let nextY = prevY + dinoVel;
      if (nextY > 0) {
        nextY = 0;
        setDinoVel(0);
      }
      return nextY;
    });
    if (dinoY < 0) setDinoVel(v => v + GRAVITY);

    // Obstacle Spawning
    if (time - lastSpawnRef.current > OBSTACLE_SPAWN_RATE) {
      setObstacles(prev => [...prev, {
        x: containerRef.current!.offsetWidth,
        width: 20 + Math.random() * 30,
        height: 30 + Math.random() * 40,
        passed: false
      }]);
      lastSpawnRef.current = time;
    }

    // Obstacle Physics
    setObstacles(prevObs => {
      const nextObs = prevObs
        .map(o => ({ ...o, x: o.x - SPEED }))
        .filter(o => o.x > -100);

      // Collision
      for (let o of nextObs) {
        if (o.x < 100 + 40 && o.x + o.width > 100) {
          if (dinoY > -o.height) {
            setGameState('gameover');
          }
        }
        if (!o.passed && o.x + o.width < 100) {
          o.passed = true;
          setScore(s => s + 1);
        }
      }
      return nextObs;
    });

    frameRef.current = requestAnimationFrame(update);
  }, [dinoVel, dinoY, gameState]);

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
      className="relative w-full h-full bg-slate-950 overflow-hidden cursor-pointer flex flex-col justify-end"
    >
      <div className="absolute top-8 left-8 z-10">
        <span className="text-4xl font-black text-white italic tracking-tighter">SCORE: {score}</span>
      </div>

      {/* Ground */}
      <div className="w-full h-1 bg-neon-cyan shadow-[0_0_10px_#06b6d4] mb-20" />

      {/* Dino */}
      <motion.div 
        animate={{ y: dinoY }}
        transition={{ duration: 0 }}
        className="absolute left-[100px] bottom-20 w-12 h-12 z-20"
      >
        <div className="w-full h-full bg-emerald-400 rounded-md shadow-[0_0_15px_#4ade80] flex items-center justify-center">
          <div className="w-8 h-4 bg-slate-900 rounded-sm opacity-50 mb-4" />
        </div>
      </motion.div>

      {/* Obstacles */}
      {obstacles.map((o, i) => (
        <div 
          key={i}
          style={{ 
            left: o.x, 
            height: o.height, 
            width: o.width,
            bottom: 80 
          }}
          className="absolute bg-neon-pink shadow-[0_0_15px_#ec4899] rounded-t-lg"
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
              {gameState === 'start' ? 'NEON RUNNER' : 'SYSTEM CRASH'}
            </h2>
            <p className="text-neon-cyan font-bold mb-8 text-xs uppercase tracking-[0.5em]">
              {gameState === 'start' ? 'Initiate Sequence' : `Rebooting... Last Score: ${score}`}
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

export default NeonTRex;
