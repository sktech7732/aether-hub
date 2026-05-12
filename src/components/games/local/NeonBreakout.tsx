"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const BALL_RADIUS = 8;
const BRICK_ROWS = 5;
const BRICK_COLS = 8;
const BRICK_HEIGHT = 20;
const PADDLE_SPEED = 8;

const NeonBreakout = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'won'>('start');
  const [score, setScore] = useState(0);
  const [paddleX, setPaddleX] = useState(0);
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [ballVel, setBallVel] = useState({ x: 4, y: -4 });
  const [bricks, setBricks] = useState<any[]>([]);

  const initBricks = useCallback(() => {
    const newBricks = [];
    for (let r = 0; r < BRICK_ROWS; r++) {
      for (let c = 0; c < BRICK_COLS; c++) {
        newBricks.push({
          x: c,
          y: r,
          active: true,
          color: r === 0 ? '#06b6d4' : r === 1 ? '#7c3aed' : r === 2 ? '#ec4899' : r === 3 ? '#fb923c' : '#4ade80'
        });
      }
    }
    setBricks(newBricks);
  }, []);

  const resetGame = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    setPaddleX(width / 2 - PADDLE_WIDTH / 2);
    setBallPos({ x: width / 2, y: height - 50 });
    setBallVel({ x: 4, y: -4 });
    setScore(0);
    setGameState('start');
    initBricks();
  }, [initBricks]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const update = useCallback(() => {
    if (gameState !== 'playing' || !containerRef.current) return;

    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    setBallPos(prev => {
      let nextX = prev.x + ballVel.x;
      let nextY = prev.y + ballVel.y;
      let nextVelX = ballVel.x;
      let nextVelY = ballVel.y;

      // Wall collisions
      if (nextX <= BALL_RADIUS || nextX >= width - BALL_RADIUS) nextVelX *= -1;
      if (nextY <= BALL_RADIUS) nextVelY *= -1;

      // Paddle collision
      if (nextY >= height - PADDLE_HEIGHT - BALL_RADIUS && 
          nextX >= paddleX && nextX <= paddleX + PADDLE_WIDTH) {
        nextVelY = -Math.abs(nextVelY);
        // Add some spin based on where it hit the paddle
        const hitPoint = (nextX - (paddleX + PADDLE_WIDTH / 2)) / (PADDLE_WIDTH / 2);
        nextVelX = hitPoint * 6;
      }

      // Brick collisions
      const brickWidth = width / BRICK_COLS;
      const updatedBricks = [...bricks];
      let hit = false;

      for (let i = 0; i < updatedBricks.length; i++) {
        const b = updatedBricks[i];
        if (!b.active) continue;

        const bx = b.x * brickWidth + 2;
        const by = b.y * (BRICK_HEIGHT + 5) + 50;

        if (nextX >= bx && nextX <= bx + brickWidth - 4 &&
            nextY >= by && nextY <= by + BRICK_HEIGHT) {
          updatedBricks[i].active = false;
          nextVelY *= -1;
          setScore(s => s + 10);
          hit = true;
          break;
        }
      }

      if (hit) setBricks(updatedBricks);

      // Floor collision
      if (nextY >= height) {
        setGameState('gameover');
      }

      // Win condition
      if (updatedBricks.every(b => !b.active)) {
        setGameState('won');
      }

      if (nextVelX !== ballVel.x || nextVelY !== ballVel.y) {
        setBallVel({ x: nextVelX, y: nextVelY });
      }

      return { x: nextX, y: nextY };
    });
  }, [ballVel, bricks, gameState, paddleX]);

  useEffect(() => {
    const interval = setInterval(update, 16);
    return () => clearInterval(interval);
  }, [update]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      if (e.key === 'ArrowLeft') setPaddleX(p => Math.max(0, p - PADDLE_SPEED * 2));
      if (e.key === 'ArrowRight') setPaddleX(p => Math.min(width - PADDLE_WIDTH, p + PADDLE_SPEED * 2));
      if (e.key === ' ' && gameState === 'start') setGameState('playing');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-slate-950 overflow-hidden font-sans">
      <div className="absolute top-4 left-6 glass px-4 py-1 rounded-xl border-white/10 z-10">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-2">Score</span>
        <span className="text-xl font-black text-white italic">{score}</span>
      </div>

      {/* Bricks */}
      <div className="absolute inset-0 pt-[50px] px-0">
        <div className="grid grid-cols-8 gap-1 h-full">
          {bricks.map((b, i) => (
            <div 
              key={i} 
              style={{ 
                visibility: b.active ? 'visible' : 'hidden',
                backgroundColor: b.color,
                height: BRICK_HEIGHT,
                boxShadow: `0 0 10px ${b.color}44`
              }}
              className="rounded-sm border border-white/10 transition-opacity"
            />
          ))}
        </div>
      </div>

      {/* Paddle */}
      <motion.div 
        animate={{ x: paddleX }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        className="absolute bottom-0 h-[PADDLE_HEIGHT] rounded-t-xl bg-neon-cyan shadow-[0_-5px_20px_#06b6d4]"
        style={{ width: PADDLE_WIDTH, height: PADDLE_HEIGHT, bottom: 0 }}
      />

      {/* Ball */}
      <motion.div 
        animate={{ x: ballPos.x - BALL_RADIUS, y: ballPos.y - BALL_RADIUS }}
        transition={{ type: 'just' }}
        className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff] z-10"
      />

      <AnimatePresence>
        {gameState !== 'playing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 glass flex flex-col items-center justify-center backdrop-blur-md bg-black/60"
          >
            <h2 className="text-4xl font-black text-white italic mb-2 tracking-tighter uppercase">
              {gameState === 'start' ? 'System Ready' : gameState === 'won' ? 'Nexus Secured' : 'System Failure'}
            </h2>
            <p className="text-neon-cyan font-bold mb-8 text-[10px] uppercase tracking-[0.4em]">
              {gameState === 'start' ? 'Press Space to Initiate' : 'Rebooting Required'}
            </p>
            <button 
              onClick={gameState === 'start' ? () => setGameState('playing') : resetGame}
              className="bg-neon-cyan text-black px-10 py-3 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_#06b6d4]"
            >
              {gameState === 'start' ? 'Initialize' : 'Reset'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeonBreakout;
