"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };

const NeonSnake = () => {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      const onSnake = currentSnake.some(segment => segment.x === newFood!.x && segment.y === newFood!.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
    setIsPaused(true);
    setFood(generateFood([{ x: 10, y: 10 }]));
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const newHead = {
        x: (prevSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED - Math.min(score / 5, 100));
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y !== 1) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y !== -1) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x !== 1) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x !== -1) setDirection({ x: 1, y: 0 }); break;
        case ' ': setIsPaused(p => !p); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 font-sans">
      <div className="flex justify-between w-full max-w-[400px] mb-6">
        <div className="glass px-6 py-2 rounded-2xl border-white/10">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Core Score</span>
          <span className="text-2xl font-black text-white italic">{score}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="glass px-4 py-2 rounded-2xl border-white/10 hover:border-neon-cyan text-slate-400 hover:text-neon-cyan transition-all"
          >
             <span className="text-[10px] font-black uppercase tracking-widest">{isPaused ? 'Start' : 'Pause'}</span>
          </button>
          <button 
            onClick={resetGame}
            className="glass px-4 py-2 rounded-2xl border-white/10 hover:border-neon-cyan text-slate-400 hover:text-neon-cyan transition-all"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Reset</span>
          </button>
        </div>
      </div>

      <div className="relative aspect-square w-full max-w-[400px] glass p-2 rounded-[2rem] border-white/5 bg-black/40 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10">
          {Array(GRID_SIZE * GRID_SIZE).fill(0).map((_, i) => (
            <div key={i} className="border-[0.5px] border-neon-cyan" />
          ))}
        </div>

        {/* Food */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{
            position: 'absolute',
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
          }}
          className="p-1"
        >
          <div className="w-full h-full bg-neon-pink rounded-full shadow-[0_0_15px_#ec4899]" />
        </motion.div>

        {/* Snake */}
        {snake.map((segment, i) => (
          <motion.div
            key={`${i}-${segment.x}-${segment.y}`}
            style={{
              position: 'absolute',
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              zIndex: snake.length - i
            }}
            className="p-[1px]"
          >
            <div 
              className={`
                w-full h-full rounded-sm shadow-[0_0_10px_#06b6d4]
                ${i === 0 ? 'bg-white shadow-[0_0_20px_#fff]' : 'bg-neon-cyan'}
              `} 
              style={{ opacity: 1 - (i / snake.length) * 0.6 }}
            />
          </motion.div>
        ))}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 z-20 glass rounded-[2rem] flex flex-col items-center justify-center backdrop-blur-sm bg-black/40">
            <h2 className="text-2xl font-black text-neon-cyan italic mb-4 tracking-widest animate-pulse uppercase">Ready to Engage?</h2>
            <button 
              onClick={() => setIsPaused(false)}
              className="bg-neon-cyan text-black px-8 py-3 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 glass rounded-[2rem] flex flex-col items-center justify-center backdrop-blur-md bg-black/60"
          >
            <h2 className="text-4xl font-black text-white italic mb-2 tracking-tighter">CONNECTION LOST</h2>
            <p className="text-neon-pink font-bold mb-6 text-xs uppercase tracking-[0.3em]">Critical Collision Detected</p>
            <button 
              onClick={resetGame}
              className="bg-neon-pink text-white px-8 py-3 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(236,72,153,0.5)]"
            >
              Reboot Session
            </button>
          </motion.div>
        )}
      </div>

      <div className="mt-8 text-center text-slate-500">
        <p className="text-[10px] font-black uppercase tracking-widest">Arrows to navigate • Space to pause</p>
      </div>
    </div>
  );
};

export default NeonSnake;
