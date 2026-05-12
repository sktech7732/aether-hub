"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRAVITY = 0.6;
const JUMP = -8;
const PIPE_SPEED = 3.5;
const PIPE_SPAWN_RATE = 1500;
const PIPE_WIDTH = 60;
const PIPE_GAP = 160;

const CyberBird = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [birdY, setBirdY] = useState(250);
  const [birdVel, setBirdVel] = useState(0);
  const [pipes, setPipes] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastPipeRef = useRef<number>(0);

  const spawnPipe = useCallback(() => {
    if (!containerRef.current) return;
    const height = containerRef.current.offsetHeight;
    const minPipeHeight = 50;
    const maxPipeHeight = height - PIPE_GAP - minPipeHeight;
    const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;
    
    setPipes(prev => [...prev, {
      x: containerRef.current!.offsetWidth,
      topHeight,
      passed: false
    }]);
  }, []);

  const resetGame = () => {
    setBirdY(250);
    setBirdVel(0);
    setPipes([]);
    setScore(0);
    setGameState('start');
    lastPipeRef.current = 0;
  };

  const jump = useCallback(() => {
    if (gameState === 'start') setGameState('playing');
    if (gameState === 'playing') setBirdVel(JUMP);
  }, [gameState]);

  const update = useCallback((time: number) => {
    if (gameState !== 'playing' || !containerRef.current) return;

    const height = containerRef.current.offsetHeight;
    const width = containerRef.current.offsetWidth;

    // Bird Physics
    setBirdY(prevY => {
      const newY = prevY + birdVel;
      if (newY < 0 || newY > height - 30) {
        setGameState('gameover');
      }
      return newY;
    });
    setBirdVel(prevVel => prevVel + GRAVITY);

    // Pipe Physics
    if (time - lastPipeRef.current > PIPE_SPAWN_RATE) {
      spawnPipe();
      lastPipeRef.current = time;
    }

    setPipes(prevPipes => {
      const nextPipes = prevPipes
        .map(p => ({ ...p, x: p.x - PIPE_SPEED }))
        .filter(p => p.x > -PIPE_WIDTH);

      // Collision detection & Scoring
      for (let p of nextPipes) {
        // Hit pipe
        if (p.x < 100 + 30 && p.x + PIPE_WIDTH > 100) {
          if (birdY < p.topHeight || birdY + 30 > p.topHeight + PIPE_GAP) {
            setGameState('gameover');
          }
        }
        // Score
        if (!p.passed && p.x + PIPE_WIDTH < 100) {
          p.passed = true;
          setScore(s => s + 1);
        }
      }

      return nextPipes;
    });

    frameRef.current = requestAnimationFrame(update);
  }, [birdVel, birdY, gameState, spawnPipe]);

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
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-neon-violet to-transparent" />
        <div className="absolute top-0 w-full h-full grid grid-cols-12 gap-1">
          {Array(12).fill(0).map((_, i) => (
            <div key={i} className="h-full border-r border-white/5" />
          ))}
        </div>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <span className="text-6xl font-black text-white italic opacity-20 tracking-tighter absolute -inset-1 blur-xl">{score}</span>
        <span className="text-6xl font-black text-white italic tracking-tighter relative">{score}</span>
      </div>

      {/* Bird */}
      <motion.div 
        animate={{ y: birdY, rotate: birdVel * 3 }}
        transition={{ duration: 0.1 }}
        className="absolute left-[100px] w-10 h-8 z-20"
      >
        <div className="w-full h-full bg-neon-cyan rounded-lg shadow-[0_0_15px_#06b6d4] relative">
          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full" />
          <div className="absolute -right-2 top-3 w-4 h-2 bg-orange-500 rounded-full" />
        </div>
      </motion.div>

      {/* Pipes */}
      {pipes.map((p, i) => (
        <React.Fragment key={i}>
          {/* Top Pipe */}
          <div 
            style={{ left: p.x, height: p.topHeight, width: PIPE_WIDTH }}
            className="absolute top-0 bg-gradient-to-b from-slate-900 to-neon-violet border-x border-b border-white/10 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
          />
          {/* Bottom Pipe */}
          <div 
            style={{ left: p.x, top: p.topHeight + PIPE_GAP, width: PIPE_WIDTH, bottom: 0 }}
            className="absolute bg-gradient-to-t from-slate-900 to-neon-violet border-x border-t border-white/10 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
          />
        </React.Fragment>
      ))}

      <AnimatePresence>
        {gameState !== 'playing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-30 glass flex flex-col items-center justify-center backdrop-blur-md bg-black/60"
          >
            <h2 className="text-5xl font-black text-white italic mb-2 tracking-tighter uppercase">
              {gameState === 'start' ? 'CYBER BIRD' : 'CORE CRASHED'}
            </h2>
            <p className="text-neon-cyan font-bold mb-8 text-xs uppercase tracking-[0.5em]">
              {gameState === 'start' ? 'Tap to Initiate Flight' : `Protocol Failure at ${score} Nodes`}
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

export default CyberBird;
