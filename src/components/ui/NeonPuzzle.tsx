"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Settings, Home, Gamepad2, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const BOARD_SIZE = 8;
const SHAPES = [
  [[1]], [[1, 1]], [[1], [1]], [[1, 1, 1]], [[1], [1], [1]],
  [[1, 1, 1, 1]], [[1], [1], [1], [1]],
  [[1, 1], [1, 1]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
  [[1, 0], [1, 1]], [[0, 1], [1, 1]], [[1, 1], [1, 0]], [[1, 1], [0, 1]],
  [[1, 0, 0], [1, 0, 0], [1, 1, 1]], [[0, 0, 1], [0, 0, 1], [1, 1, 1]],
  [[1, 1, 1], [1, 0, 0], [1, 0, 0]], [[1, 1, 1], [0, 0, 1], [0, 0, 1]]
];
const COLORS = ['blue', 'green', 'yellow', 'pink', 'orange', 'purple'];
const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-500 shadow-[0_0_15px_#3b82f6]',
  green: 'bg-emerald-500 shadow-[0_0_15px_#10b981]',
  yellow: 'bg-amber-400 shadow-[0_0_15px_#fbbf24]',
  pink: 'bg-pink-500 shadow-[0_0_15px_#ec4899]',
  orange: 'bg-orange-500 shadow-[0_0_15px_#f97316]',
  purple: 'bg-violet-600 shadow-[0_0_15px_#7c3aed]'
};

const NeonPuzzle = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [board, setBoard] = useState<(string | null)[][]>(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [tray, setTray] = useState<{ shape: number[][], color: string }[]>([]);
  const [dragging, setDragging] = useState<{ index: number, x: number, y: number } | null>(null);
  const [hoverPos, setHoverPos] = useState<{ r: number, c: number } | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('aether_neon_best');
    if (saved) setBestScore(parseInt(saved));
  }, []);

  const generateTray = useCallback(() => {
    const newTray = [];
    for (let i = 0; i < 3; i++) {
      newTray.push({
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
    setTray(newTray);
  }, []);

  const startGame = () => {
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
    setScore(0);
    setGameState('playing');
    generateTray();
  };

  const canPlace = (shape: number[][], r: number, c: number, currentBoard: (string | null)[][]) => {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          const nr = r + i;
          const nc = c + j;
          if (nr < 0 || nr >= BOARD_SIZE || nc < 0 || nc >= BOARD_SIZE || currentBoard[nr][nc]) return false;
        }
      }
    }
    return true;
  };

  const checkLines = (newBoard: (string | null)[][]) => {
    let rowsToClear = [];
    let colsToClear = [];

    for (let r = 0; r < BOARD_SIZE; r++) {
      if (newBoard[r].every(cell => cell !== null)) rowsToClear.push(r);
    }
    for (let c = 0; c < BOARD_SIZE; c++) {
      let full = true;
      for (let r = 0; r < BOARD_SIZE; r++) if (!newBoard[r][c]) full = false;
      if (full) colsToClear.push(c);
    }

    if (rowsToClear.length > 0 || colsToClear.length > 0) {
      const updatedBoard = newBoard.map(row => [...row]);
      rowsToClear.forEach(r => updatedBoard[r].fill(null));
      colsToClear.forEach(c => {
        for (let r = 0; r < BOARD_SIZE; r++) updatedBoard[r][c] = null;
      });
      
      const lines = rowsToClear.length + colsToClear.length;
      setScore(prev => prev + lines * 100 + (lines > 1 ? lines * 50 : 0));
      return updatedBoard;
    }
    return newBoard;
  };

  const handlePlace = (trayIndex: number, r: number, c: number) => {
    const shape = tray[trayIndex].shape;
    const color = tray[trayIndex].color;
    
    if (canPlace(shape, r, c, board)) {
      const newBoard = board.map(row => [...row]);
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (shape[i][j]) newBoard[r + i][c + j] = color;
        }
      }
      
      const clearedBoard = checkLines(newBoard);
      setBoard(clearedBoard);
      
      const newTray = [...tray];
      newTray[trayIndex] = null as any;
      setTray(newTray);
      
      setScore(prev => prev + 10);
      
      if (newTray.every(item => item === null)) {
        generateTray();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      {gameState === 'menu' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center glass p-12 rounded-[3rem] border-neon-cyan/20">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center mx-auto mb-8 shadow-lg shadow-neon-cyan/30">
            <Gamepad2 className="text-white" size={48} />
          </div>
          <h1 className="text-6xl font-black text-white mb-2 tracking-tighter uppercase italic">NEON<span className="text-neon-cyan">PUZZLE</span></h1>
          <p className="text-slate-400 font-bold mb-10 tracking-[0.3em] uppercase text-xs">Aether Arcade Protocol 01</p>
          
          <div className="flex flex-col gap-4">
            <button onClick={startGame} className="bg-white text-black font-black px-12 py-5 rounded-2xl text-2xl hover:bg-neon-cyan hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3">
              <Play className="fill-current" /> START GAME
            </button>
            <div className="flex items-center justify-center gap-2 text-slate-500 font-black mt-4">
              <Trophy size={20} className="text-amber-400" /> BEST SCORE: {bestScore}
            </div>
          </div>
        </motion.div>
      )}

      {gameState === 'playing' && (
        <div className="w-full max-w-md">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-slate-500 font-black text-xs uppercase tracking-widest mb-1">Current Score</p>
              <h2 className="text-4xl font-black text-white leading-none">{score}</h2>
            </div>
            <div className="text-right">
              <p className="text-slate-500 font-black text-xs uppercase tracking-widest mb-1">Best</p>
              <h2 className="text-2xl font-black text-neon-cyan leading-none">{Math.max(score, bestScore)}</h2>
            </div>
          </div>

          <div ref={boardRef} className="glass aspect-square rounded-2xl p-2 border-white/10 grid grid-cols-8 gap-1 relative">
            {board.map((row, r) => row.map((cell, c) => (
              <div 
                key={`${r}-${c}`} 
                className={`aspect-square rounded-sm border border-white/5 ${cell ? COLOR_MAP[cell] : 'bg-white/5'} transition-all`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handlePlace(dragging?.index || 0, r, c)}
              />
            )))}
          </div>

          <div className="mt-8 flex justify-between gap-4 h-32">
            {tray.map((item, i) => (
              <div key={i} className="flex-1 glass rounded-2xl flex items-center justify-center overflow-hidden border-white/5 hover:border-white/20 transition-colors">
                {item && (
                  <div 
                    draggable 
                    onDragStart={() => setDragging({ index: i, x: 0, y: 0 })}
                    className="grid gap-0.5"
                    style={{ 
                      gridTemplateColumns: `repeat(${item.shape[0].length}, 1fr)`,
                      width: `${item.shape[0].length * 20}px` 
                    }}
                  >
                    {item.shape.map((row, r) => row.map((val, c) => (
                      <div key={`${r}-${c}`} className={`aspect-square rounded-[2px] ${val ? COLOR_MAP[item.color] : 'bg-transparent'}`} />
                    )))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center gap-4">
             <button onClick={() => setGameState('menu')} className="glass p-4 rounded-2xl text-slate-400 hover:text-white transition-colors">
               <Home size={24} />
             </button>
             <button onClick={startGame} className="glass p-4 rounded-2xl text-slate-400 hover:text-white transition-colors">
               <RotateCcw size={24} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeonPuzzle;
