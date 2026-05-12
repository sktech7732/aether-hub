"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 4;

type Board = (number | null)[][];

const Neon2048 = () => {
  const [board, setBoard] = useState<Board>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initGame = useCallback(() => {
    let newBoard = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
    newBoard = addRandomTile(newBoard);
    newBoard = addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const addRandomTile = (currentBoard: Board) => {
    const emptyCells = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentBoard[r][c] === null) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return currentBoard;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = [...currentBoard.map(row => [...row])];
    newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
  };

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return;

    let newBoard = [...board.map(row => [...row])];
    let moved = false;
    let newScore = score;

    const rotate = (times: number) => {
      for (let t = 0; t < times; t++) {
        const tempBoard = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
        for (let r = 0; r < GRID_SIZE; r++) {
          for (let c = 0; c < GRID_SIZE; c++) {
            tempBoard[c][GRID_SIZE - 1 - r] = newBoard[r][c];
          }
        }
        newBoard = tempBoard;
      }
    };

    if (direction === 'up') rotate(3);
    else if (direction === 'right') rotate(2);
    else if (direction === 'down') rotate(1);

    for (let r = 0; r < GRID_SIZE; r++) {
      let row = newBoard[r].filter(val => val !== null);
      for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
          row[i]! *= 2;
          newScore += row[i]!;
          row.splice(i + 1, 1);
          moved = true;
        }
      }
      const newRow = [...row, ...Array(GRID_SIZE - row.length).fill(null)];
      if (JSON.stringify(newBoard[r]) !== JSON.stringify(newRow)) moved = true;
      newBoard[r] = newRow;
    }

    if (direction === 'up') rotate(1);
    else if (direction === 'right') rotate(2);
    else if (direction === 'down') rotate(3);

    if (moved) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
      
      // Check Game Over
      if (isGameOver(newBoard)) setGameOver(true);
    }
  }, [board, gameOver, score]);

  const isGameOver = (currentBoard: Board) => {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentBoard[r][c] === null) return false;
        if (c < GRID_SIZE - 1 && currentBoard[r][c] === currentBoard[r][c + 1]) return false;
        if (r < GRID_SIZE - 1 && currentBoard[r][c] === currentBoard[r + 1][c]) return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'w', 'W'].includes(e.key)) move('up');
      else if (['ArrowDown', 's', 'S'].includes(e.key)) move('down');
      else if (['ArrowLeft', 'a', 'A'].includes(e.key)) move('left');
      else if (['ArrowRight', 'd', 'D'].includes(e.key)) move('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const getTileColor = (val: number) => {
    switch (val) {
      case 2: return 'bg-slate-800 text-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]';
      case 4: return 'bg-slate-800 text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.3)]';
      case 8: return 'bg-slate-800 text-neon-violet shadow-[0_0_15px_rgba(124,58,237,0.3)]';
      case 16: return 'bg-slate-800 text-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.3)]';
      case 32: return 'bg-slate-800 text-neon-pink shadow-[0_0_15px_rgba(236,72,153,0.3)]';
      case 64: return 'bg-slate-800 text-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.3)]';
      case 128: return 'bg-slate-800 text-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.4)]';
      case 256: return 'bg-slate-800 text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]';
      case 512: return 'bg-slate-800 text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.5)]';
      case 1024: return 'bg-slate-800 text-teal-400 shadow-[0_0_30px_rgba(45,212,191,0.6)]';
      case 2048: return 'bg-slate-800 text-neon-cyan animate-pulse shadow-[0_0_40px_rgba(6,182,212,0.8)]';
      default: return 'bg-slate-900/50 text-slate-500';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <div className="flex justify-between w-full max-w-[400px] mb-6">
        <div className="glass px-6 py-2 rounded-2xl border-white/10">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Score</span>
          <span className="text-2xl font-black text-white italic">{score}</span>
        </div>
        <button 
          onClick={initGame}
          className="glass px-6 py-2 rounded-2xl border-white/10 hover:border-neon-cyan text-slate-400 hover:text-neon-cyan transition-all"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Restart</span>
        </button>
      </div>

      <div className="relative aspect-square w-full max-w-[400px] glass p-3 rounded-[2rem] border-white/5 grid grid-cols-4 gap-3 bg-black/40">
        {board.flat().map((tile, i) => (
          <div key={i} className="aspect-square bg-slate-950/40 rounded-xl border border-white/5" />
        ))}
        
        <div className="absolute inset-3 grid grid-cols-4 gap-3 pointer-events-none">
          <AnimatePresence>
            {board.map((row, r) => 
              row.map((tile, c) => tile !== null && (
                <motion.div
                  key={`${r}-${c}-${tile}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  style={{
                    gridRow: r + 1,
                    gridColumn: c + 1
                  }}
                  className={`
                    w-full h-full rounded-xl flex items-center justify-center 
                    text-xl font-black italic border border-white/10
                    ${getTileColor(tile)}
                  `}
                >
                  {tile}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {gameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 glass rounded-[2rem] flex flex-col items-center justify-center backdrop-blur-md bg-black/60"
          >
            <h2 className="text-4xl font-black text-white italic mb-4 tracking-tighter">GAME OVER</h2>
            <button 
              onClick={initGame}
              className="bg-neon-cyan text-black px-8 py-3 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </div>

      <div className="mt-8 text-center text-slate-500">
        <p className="text-[10px] font-black uppercase tracking-widest">Use Arrow Keys or WASD to Move</p>
      </div>
    </div>
  );
};

export default Neon2048;
