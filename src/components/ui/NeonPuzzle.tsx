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
  const [tray, setTray] = useState<( { shape: number[][], color: string } | null )[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ index: number, x: number, y: number, initialX: number, initialY: number } | null>(null);
  const [hoverPos, setHoverPos] = useState<{ r: number, c: number } | null>(null);
  const [cellSize, setCellSize] = useState(40); // Track actual pixel size of a board cell

  const audioRef = useRef<AudioContext | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Measure board cell size on mount and resize
  useEffect(() => {
    const updateSize = () => {
      if (boardRef.current) {
        const rect = boardRef.current.getBoundingClientRect();
        // Account for padding (8px * 2) and gaps (1px * 7)
        const pureWidth = rect.width - 16 - 7;
        setCellSize(pureWidth / 8);
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [gameState]); // Re-run when switching to 'playing'

  // Initialize Audio
  const playSound = (type: 'click' | 'clear' | 'gameover') => {
    if (!audioRef.current) {
      audioRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'clear') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  };

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
    playSound('click');
  };

  const getBoardPos = (clientX: number, clientY: number) => {
    if (!boardRef.current) return null;
    const rect = boardRef.current.getBoundingClientRect();
    const cellSize = rect.width / BOARD_SIZE;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);
    
    if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) return { r, c };
    return null;
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

  const handleDragStart = (e: React.PointerEvent, index: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDraggedItem({
      index,
      x: e.clientX,
      y: e.clientY,
      initialX: rect.left,
      initialY: rect.top
    });
    playSound('click');
  };

  const handleDragMove = (e: PointerEvent) => {
    if (!draggedItem) return;
    setDraggedItem(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
    
    const pos = getBoardPos(e.clientX, e.clientY);
    if (pos && canPlace(tray[draggedItem.index]!.shape, pos.r, pos.c, board)) {
      setHoverPos(pos);
    } else {
      setHoverPos(null);
    }
  };

  const handleDragEnd = (e: PointerEvent) => {
    if (!draggedItem) return;
    
    const pos = getBoardPos(e.clientX, e.clientY);
    if (pos && canPlace(tray[draggedItem.index]!.shape, pos.r, pos.c, board)) {
      const shape = tray[draggedItem.index]!.shape;
      const color = tray[draggedItem.index]!.color;
      
      const newBoard = board.map(row => [...row]);
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (shape[i][j]) newBoard[pos.r + i][pos.c + j] = color;
        }
      }
      
      // Clear lines logic
      let rowsToClear = [];
      let colsToClear = [];
      for (let r = 0; r < BOARD_SIZE; r++) if (newBoard[r].every(cell => cell !== null)) rowsToClear.push(r);
      for (let c = 0; c < BOARD_SIZE; c++) {
        let full = true;
        for (let r = 0; r < BOARD_SIZE; r++) if (!newBoard[r][c]) full = false;
        if (full) colsToClear.push(c);
      }

      if (rowsToClear.length > 0 || colsToClear.length > 0) {
        rowsToClear.forEach(r => newBoard[r].fill(null));
        colsToClear.forEach(c => { for (let r = 0; r < BOARD_SIZE; r++) newBoard[r][c] = null; });
        playSound('clear');
        const lines = rowsToClear.length + colsToClear.length;
        setScore(prev => prev + lines * 100 + (lines > 1 ? lines * 50 : 0));
      } else {
        playSound('click');
      }

      setBoard(newBoard);
      setScore(prev => prev + 10);
      
      const newTray = [...tray];
      newTray[draggedItem.index] = null;
      setTray(newTray);
      if (newTray.every(t => t === null)) generateTray();
    }

    setDraggedItem(null);
    setHoverPos(null);
  };

  useEffect(() => {
    if (draggedItem) {
      window.addEventListener('pointermove', handleDragMove);
      window.addEventListener('pointerup', handleDragEnd);
      return () => {
        window.removeEventListener('pointermove', handleDragMove);
        window.removeEventListener('pointerup', handleDragEnd);
      };
    }
  }, [draggedItem]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 select-none touch-none">
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
        <div className="w-full max-w-md relative">
          <div className="flex justify-between items-end mb-8 px-2">
            <div>
              <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-1">Score</p>
              <h2 className="text-4xl font-black text-white leading-none">{score}</h2>
            </div>
            <div className="text-right">
              <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-1">High Score</p>
              <h2 className="text-2xl font-black text-neon-cyan leading-none">{Math.max(score, bestScore)}</h2>
            </div>
          </div>

          {/* Game Board */}
          <div 
            ref={boardRef} 
            className="glass aspect-square rounded-2xl p-2 border-white/10 grid grid-cols-8 gap-1 relative overflow-hidden"
          >
            {board.map((row, r) => row.map((cell, c) => {
              const isHovered = hoverPos && draggedItem && 
                r >= hoverPos.r && r < hoverPos.r + tray[draggedItem.index]!.shape.length &&
                c >= hoverPos.c && c < hoverPos.c + tray[draggedItem.index]!.shape[0].length &&
                tray[draggedItem.index]!.shape[r - hoverPos.r][c - hoverPos.c];

              return (
                <div 
                  key={`${r}-${c}`} 
                  className={`aspect-square rounded-sm border border-white/5 
                    ${cell ? COLOR_MAP[cell] : isHovered ? 'bg-white/20' : 'bg-white/5'} 
                    transition-all duration-200`}
                />
              );
            }))}
          </div>

          {/* Tray Blocks */}
          <div className="mt-12 grid grid-cols-3 gap-4 h-40">
            {tray.map((item, i) => (
              <div 
                key={i} 
                className={`glass rounded-3xl flex items-center justify-center border-white/5 transition-all
                  ${item ? 'cursor-grab hover:bg-white/5 active:cursor-grabbing' : 'opacity-20'}
                `}
                onPointerDown={(e) => item && handleDragStart(e, i)}
              >
                {item && (
                  <div 
                    className="grid gap-0.5 pointer-events-none"
                    style={{ 
                      gridTemplateColumns: `repeat(${item.shape[0].length}, 1fr)`,
                      width: `${item.shape[0].length * 16}px` 
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

          {/* Floating Dragged Item */}
          <AnimatePresence>
            {draggedItem && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  // Center the block's first cell exactly under the cursor
                  x: draggedItem.x - (cellSize / 2), 
                  y: draggedItem.y - (cellSize * 1.5) // Offset slightly above touch point for visibility
                }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="fixed top-0 left-0 pointer-events-none z-[100]"
                style={{ 
                  gridTemplateColumns: `repeat(${tray[draggedItem.index]!.shape[0].length}, 1fr)`,
                  display: 'grid',
                  gap: '1px'
                }}
              >
                {tray[draggedItem.index]!.shape.map((row, r) => row.map((val, c) => (
                  <div 
                    key={`${r}-${c}`} 
                    className={`rounded-sm ${val ? COLOR_MAP[tray[draggedItem.index]!.color] : 'bg-transparent'}`} 
                    style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                  />
                )))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-8 flex justify-center gap-6">
             <button onClick={() => setGameState('menu')} className="glass p-5 rounded-2xl text-slate-400 hover:text-white transition-all hover:scale-110 active:scale-95">
               <Home size={24} />
             </button>
             <button onClick={startGame} className="glass p-5 rounded-2xl text-slate-400 hover:text-white transition-all hover:scale-110 active:scale-95">
               <RotateCcw size={24} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeonPuzzle;
