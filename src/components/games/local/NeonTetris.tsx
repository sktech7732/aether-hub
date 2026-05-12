"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLS = 10;
const ROWS = 20;

const TETROMINOS: any = {
  'I': { shape: [[1, 1, 1, 1]], color: '#06b6d4' },
  'J': { shape: [[1, 0, 0], [1, 1, 1]], color: '#3b82f6' },
  'L': { shape: [[0, 0, 1], [1, 1, 1]], color: '#fb923c' },
  'O': { shape: [[1, 1], [1, 1]], color: '#facc15' },
  'S': { shape: [[0, 1, 1], [1, 1, 0]], color: '#4ade80' },
  'T': { shape: [[0, 1, 0], [1, 1, 1]], color: '#7c3aed' },
  'Z': { shape: [[1, 1, 0], [0, 1, 1]], color: '#f43f5e' }
};

const NeonTetris = () => {
  const [grid, setGrid] = useState<any[][]>(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  const [activePiece, setActivePiece] = useState<any>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const spawnPiece = useCallback(() => {
    const keys = Object.keys(TETROMINOS);
    const type = keys[Math.floor(Math.random() * keys.length)];
    const piece = {
      pos: { x: Math.floor(COLS / 2) - 1, y: 0 },
      ...TETROMINOS[type]
    };
    
    // Check game over
    if (checkCollision(piece.pos, piece.shape, grid)) {
      setGameState('gameover');
      return null;
    }
    return piece;
  }, [grid]);

  const checkCollision = (pos: any, shape: number[][], currentGrid: any[][]) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && currentGrid[newY][newX])) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const resetGame = () => {
    setGrid(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setScore(0);
    setLevel(1);
    setGameState('start');
    setActivePiece(null);
  };

  const startGame = () => {
    const firstPiece = {
      pos: { x: Math.floor(COLS / 2) - 1, y: 0 },
      ...TETROMINOS['T'] // Hardcoded first piece for stability
    };
    setActivePiece(firstPiece);
    setGameState('playing');
  };

  const mergePiece = useCallback(() => {
    const newGrid = grid.map(row => [...row]);
    activePiece.shape.forEach((row: number[], y: number) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const gridY = activePiece.pos.y + y;
          const gridX = activePiece.pos.x + x;
          if (gridY >= 0) newGrid[gridY][gridX] = activePiece.color;
        }
      });
    });

    // Clear lines
    let clearedLines = 0;
    const finalGrid = newGrid.filter(row => {
      const isFull = row.every(cell => cell !== null);
      if (isFull) clearedLines++;
      return !isFull;
    });

    while (finalGrid.length < ROWS) {
      finalGrid.unshift(Array(COLS).fill(null));
    }

    if (clearedLines > 0) {
      setScore(s => s + clearedLines * 100 * level);
      if (score > level * 1000) setLevel(l => l + 1);
    }

    setGrid(finalGrid);
    const next = spawnPiece();
    setActivePiece(next);
  }, [activePiece, grid, level, score, spawnPiece]);

  const move = useCallback((dx: number, dy: number) => {
    if (gameState !== 'playing' || !activePiece) return;

    if (!checkCollision({ x: activePiece.pos.x + dx, y: activePiece.pos.y + dy }, activePiece.shape, grid)) {
      setActivePiece((prev: any) => ({ ...prev, pos: { x: prev.pos.x + dx, y: prev.pos.y + dy } }));
    } else if (dy > 0) {
      mergePiece();
    }
  }, [activePiece, gameState, grid, mergePiece]);

  const rotate = useCallback(() => {
    if (gameState !== 'playing' || !activePiece) return;
    const newShape = activePiece.shape[0].map((_: any, index: number) => 
      activePiece.shape.map((col: any) => col[index]).reverse()
    );
    if (!checkCollision(activePiece.pos, newShape, grid)) {
      setActivePiece((prev: any) => ({ ...prev, shape: newShape }));
    }
  }, [activePiece, gameState, grid]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(() => {
        move(0, 1);
      }, Math.max(100, 800 - (level - 1) * 100));
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, level, move]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') move(-1, 0);
      else if (e.key === 'ArrowRight') move(1, 0);
      else if (e.key === 'ArrowDown') move(0, 1);
      else if (e.key === 'ArrowUp') rotate();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, rotate]);

  return (
    <div className="flex h-full w-full items-center justify-center p-4 bg-slate-950 font-sans">
      <div className="flex gap-8 max-w-4xl w-full">
        {/* Main Grid */}
        <div className="relative glass p-2 rounded-2xl border-white/5 bg-black/40 flex-1 aspect-[1/2] max-h-[80vh]">
          <div className="grid grid-cols-10 grid-rows-20 gap-1 h-full w-full">
            {grid.map((row, y) => 
              row.map((cell, x) => {
                let color = cell;
                if (activePiece) {
                  const py = y - activePiece.pos.y;
                  const px = x - activePiece.pos.x;
                  if (py >= 0 && py < activePiece.shape.length && px >= 0 && px < activePiece.shape[0].length) {
                    if (activePiece.shape[py][px]) color = activePiece.color;
                  }
                }
                return (
                  <div 
                    key={`${x}-${y}`} 
                    className={`rounded-sm border border-white/5 ${color ? '' : 'bg-slate-900/20'}`}
                    style={{ 
                      backgroundColor: color || 'transparent',
                      boxShadow: color ? `0 0 10px ${color}44` : 'none'
                    }}
                  />
                );
              })
            )}
          </div>

          <AnimatePresence>
            {gameState !== 'playing' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 glass rounded-2xl flex flex-col items-center justify-center backdrop-blur-md bg-black/60"
              >
                <h2 className="text-4xl font-black text-white italic mb-2 tracking-tighter uppercase">
                  {gameState === 'start' ? 'NEON TETRIS' : 'SYSTEM OVERLOAD'}
                </h2>
                <button 
                  onClick={gameState === 'start' ? startGame : resetGame}
                  className="bg-neon-cyan text-black px-10 py-3 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_#06b6d4]"
                >
                  {gameState === 'start' ? 'Initialize' : 'Reboot'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Info */}
        <div className="hidden md:flex flex-col gap-4 w-48 pt-4">
          <div className="glass p-6 rounded-3xl border-white/5">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Nexus Score</span>
            <span className="text-3xl font-black text-white italic">{score}</span>
          </div>
          <div className="glass p-6 rounded-3xl border-white/5">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Level</span>
            <span className="text-2xl font-black text-neon-cyan italic">{level}</span>
          </div>
          <div className="mt-auto glass p-4 rounded-2xl border-white/5 text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
            Arrows to move<br/>
            Up to rotate<br/>
            Down to drop
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeonTetris;
