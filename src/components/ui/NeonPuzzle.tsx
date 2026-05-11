"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Play, RotateCcw, Trophy, Home, Gamepad2, Volume2, VolumeX, Loader2 } from 'lucide-react';

const BOARD_SIZE = 8;
const SHAPES = [
  [[1]], [[1, 1]], [[1], [1]], [[1, 1, 1]], [[1], [1], [1]],
  [[1, 1, 1, 1]], [[1], [1], [1], [1]],
  [[1, 1], [1, 1]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
  [[1, 0], [1, 1]], [[0, 1], [1, 1]], [[1, 1], [1, 0]], [[1, 1], [0, 1]],
  [[1, 0, 0], [1, 0, 0], [1, 1, 1]], [[0, 0, 1], [0, 0, 1], [1, 1, 1]],
  [[1, 1, 1], [1, 0, 0], [1, 0, 0]], [[1, 1, 1], [0, 0, 1], [0, 0, 1]],
  [[1, 1, 1], [0, 1, 0]], [[0, 1, 0], [1, 1, 1]], [[1, 0], [1, 1], [1, 0]], [[0, 1], [1, 1], [0, 1]]
];

const COLORS = ['blue', 'green', 'yellow', 'pink', 'orange', 'purple'];
const COLOR_MAP: Record<string, string> = {
  blue: 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] border-cyan-300/50',
  green: 'bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)] border-emerald-300/50',
  yellow: 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)] border-yellow-200/50',
  pink: 'bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.6)] border-fuchsia-300/50',
  orange: 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)] border-orange-300/50',
  purple: 'bg-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.6)] border-violet-400/50'
};

// --- Audio Engine ---
class NeonAudio {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  bgmGain: GainNode | null = null;
  isMuted: boolean = false;
  bgmInterval: any = null;

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.master = this.ctx.createGain();
    this.bgmGain = this.ctx.createGain();
    this.master.connect(this.ctx.destination);
    this.bgmGain.connect(this.master);
    this.bgmGain.gain.value = 0.15;
    this.startBGM();
  }

  startBGM() {
    if (!this.ctx) return;
    const playNote = (freq: number, time: number, duration: number) => {
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(0.1, time + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.connect(g);
      g.connect(this.bgmGain!);
      osc.start(time);
      osc.stop(time + duration);
    };

    const sequence = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    let count = 0;
    
    const loop = () => {
      const now = this.ctx!.currentTime;
      playNote(sequence[count % 4], now, 2);
      playNote(sequence[(count + 2) % 4] * 0.5, now, 4);
      count++;
    };

    loop();
    this.bgmInterval = setInterval(loop, 2000);
  }

  playSFX(type: 'pickup' | 'place' | 'clear' | 'error') {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.connect(g);
    g.connect(this.master!);

    if (type === 'pickup') {
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      g.gain.setValueAtTime(0.2, now);
      g.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(); osc.stop(now + 0.1);
    } else if (type === 'place') {
      osc.frequency.setValueAtTime(200, now);
      g.gain.setValueAtTime(0.3, now);
      g.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(); osc.stop(now + 0.2);
    } else if (type === 'clear') {
      [600, 800, 1000].forEach((f, i) => {
        const o = this.ctx!.createOscillator();
        const gn = this.ctx!.createGain();
        o.frequency.setValueAtTime(f, now + i * 0.05);
        gn.gain.setValueAtTime(0.2, now + i * 0.05);
        gn.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.2);
        o.connect(gn); gn.connect(this.master!);
        o.start(now + i * 0.05); o.stop(now + i * 0.05 + 0.2);
      });
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.master) this.master.gain.value = this.isMuted ? 0 : 1;
    return this.isMuted;
  }
}

const audio = new NeonAudio();

const NeonPuzzle = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [board, setBoard] = useState<(string | null)[][]>(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [tray, setTray] = useState<( { shape: number[][], color: string } | null )[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ 
    index: number, 
    x: number, 
    y: number, 
    offsetX: number, // Pixel offset from top-left of block where user touched
    offsetY: number 
  } | null>(null);
  const [hoverPos, setHoverPos] = useState<{ r: number, c: number } | null>(null);
  const [cellSize, setCellSize] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, color: string}[]>([]);

  const boardRef = useRef<HTMLDivElement>(null);

  // --- Core Game Logic ---
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

  const checkGameOver = useCallback((currentBoard: (string | null)[][], currentTray: any[]) => {
    const activeTrayItems = currentTray.filter(t => t !== null);
    if (activeTrayItems.length === 0) return false;

    for (const item of activeTrayItems) {
      for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
          if (canPlace(item.shape, r, c, currentBoard)) return false;
        }
      }
    }
    return true;
  }, []);

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

  // --- Handlers ---
  const startGame = () => {
    audio.init();
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
    setScore(0);
    setGameState('playing');
    generateTray();
    audio.playSFX('pickup');
  };

  const updateCellSize = useCallback(() => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const pureWidth = rect.width - 16 - 7; // padding + gaps
      setCellSize(pureWidth / 8);
    }
  }, []);

  useEffect(() => {
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [gameState, updateCellSize]);

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    const item = tray[index];
    if (!item) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Calculate the exact offset from the top-left of the block
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDraggedItem({
      index,
      x: e.clientX,
      y: e.clientY,
      offsetX,
      offsetY
    });
    audio.playSFX('pickup');
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!draggedItem) return;
    
    // Smoothly track position
    setDraggedItem(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);

    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const cellTotal = cellSize + 1; // cell + gap

      // Calculate where the TOP-LEFT of the block is relative to the board
      // Subtracting the pickup offset ensures the block stays glued to finger
      const blockVisualX = e.clientX - draggedItem.offsetX;
      const blockVisualY = e.clientY - draggedItem.offsetY;

      const boardX = blockVisualX - rect.left - 8; // Subtract board padding
      const boardY = blockVisualY - rect.top - 8;

      const c = Math.round(boardX / cellTotal);
      const r = Math.round(boardY / cellTotal);

      if (canPlace(tray[draggedItem.index]!.shape, r, c, board)) {
        setHoverPos({ r, c });
      } else {
        setHoverPos(null);
      }
    }
  };

  const handlePointerUp = () => {
    if (!draggedItem) return;

    if (hoverPos) {
      const shape = tray[draggedItem.index]!.shape;
      const color = tray[draggedItem.index]!.color;
      const newBoard = board.map(row => [...row]);

      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (shape[i][j]) newBoard[hoverPos.r + i][hoverPos.c + j] = color;
        }
      }

      // Clear Lines
      let linesCleared = 0;
      const finalBoard = newBoard.map(row => [...row]);
      
      const rowsToClear = [];
      for (let r = 0; r < BOARD_SIZE; r++) if (newBoard[r].every(cell => cell !== null)) rowsToClear.push(r);
      
      const colsToClear = [];
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (Array.from({length: BOARD_SIZE}).every((_, r) => newBoard[r][c] !== null)) colsToClear.push(c);
      }

      rowsToClear.forEach(r => finalBoard[r].fill(null));
      colsToClear.forEach(c => { for (let r = 0; r < BOARD_SIZE; r++) finalBoard[r][c] = null; });

      linesCleared = rowsToClear.length + colsToClear.length;

      if (linesCleared > 0) {
        audio.playSFX('clear');
        setScore(s => s + linesCleared * 100 + (linesCleared > 1 ? linesCleared * 50 : 0));
        // Add particles
        const newParticles = Array.from({length: 10}).map(() => ({
          id: Math.random(),
          x: Math.random() * 300,
          y: Math.random() * 300,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        }));
        setParticles(newParticles);
      } else {
        audio.playSFX('place');
      }

      setBoard(finalBoard);
      setScore(s => s + 10);
      
      const newTray = [...tray];
      newTray[draggedItem.index] = null;
      setTray(newTray);

      if (newTray.every(t => t === null)) {
        generateTray();
      } else {
        if (checkGameOver(finalBoard, newTray)) {
          setTimeout(() => setGameState('gameover'), 500);
        }
      }
    }

    setDraggedItem(null);
    setHoverPos(null);
  };

  useEffect(() => {
    if (draggedItem) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [draggedItem, hoverPos]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-4 select-none touch-none bg-slate-950/20 rounded-[3rem] backdrop-blur-sm border border-white/5">
      
      {/* HUD */}
      <div className="w-full max-w-md flex justify-between items-center mb-8 px-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
            <Gamepad2 className="text-neon-cyan" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol 01</p>
            <h2 className="text-3xl font-black text-white leading-none">{score}</h2>
          </div>
        </div>
        <button 
          onClick={() => setIsMuted(audio.toggleMute())}
          className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
        >
          {isMuted ? <VolumeX className="text-red-500" size={20} /> : <Volume2 className="text-neon-cyan" size={20} />}
        </button>
      </div>

      {gameState === 'menu' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center p-12 glass rounded-[3rem] border-neon-cyan/20">
          <div className="relative mb-12">
             <div className="absolute inset-0 bg-neon-cyan/20 blur-3xl rounded-full" />
             <h1 className="relative text-7xl font-black text-white tracking-tighter italic leading-none">
               NEON<br /><span className="text-neon-cyan">BLOCKS</span>
             </h1>
          </div>
          <button onClick={startGame} className="group relative px-12 py-6 bg-white text-black font-black rounded-2xl text-2xl hover:bg-neon-cyan hover:text-white transition-all active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
             <div className="absolute -inset-1 bg-neon-cyan blur opacity-0 group-hover:opacity-30 transition-opacity rounded-2xl" />
             START PROTOCOL
          </button>
        </motion.div>
      )}

      {gameState === 'playing' && (
        <div className="w-full max-w-md">
          {/* Main Board */}
          <div 
            ref={boardRef}
            className="glass aspect-square rounded-[2rem] p-2 border-white/10 grid grid-cols-8 gap-1 relative overflow-hidden bg-black/40"
          >
            {board.map((row, r) => row.map((cell, c) => {
              const isGhost = hoverPos && draggedItem && 
                r >= hoverPos.r && r < hoverPos.r + tray[draggedItem.index]!.shape.length &&
                c >= hoverPos.c && c < hoverPos.c + tray[draggedItem.index]!.shape[0].length &&
                tray[draggedItem.index]!.shape[r - hoverPos.r][c - hoverPos.c];

              return (
                <div 
                  key={`${r}-${c}`} 
                  className={`aspect-square rounded-lg border border-white/5 transition-all duration-300 relative
                    ${cell ? COLOR_MAP[cell] : isGhost ? 'bg-white/10 border-white/20' : 'bg-white/[0.02]'}
                  `}
                >
                  {isGhost && (
                    <motion.div 
                      layoutId="ghost"
                      className={`absolute inset-1 rounded-md ${COLOR_MAP[tray[draggedItem.index]!.color]} opacity-40 blur-[2px]`} 
                    />
                  )}
                </div>
              );
            }))}
            
            {/* Particles */}
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
                animate={{ y: p.y - 100, scale: 0, opacity: 0 }}
                className={`absolute w-2 h-2 rounded-full ${COLOR_MAP[p.color]}`}
              />
            ))}
          </div>

          {/* Tray Selection Area */}
          <div className="mt-12 grid grid-cols-3 gap-6 h-44">
            {tray.map((item, i) => (
              <div 
                key={i}
                className={`relative glass rounded-3xl flex items-center justify-center border-white/5 transition-all duration-500
                  ${item ? 'cursor-grab hover:bg-white/5 active:scale-95' : 'opacity-10'}
                  ${draggedItem?.index === i ? 'opacity-0' : 'opacity-100'}
                `}
                onPointerDown={(e) => handlePointerDown(e, i)}
              >
                {item && (
                  <div 
                    className="grid gap-1"
                    style={{ 
                      gridTemplateColumns: `repeat(${item.shape[0].length}, 1fr)`,
                      width: `${item.shape[0].length * (cellSize * 0.4)}px` 
                    }}
                  >
                    {item.shape.map((row, r) => row.map((val, c) => (
                      <div key={`${r}-${c}`} 
                        className={`aspect-square rounded-[2px] ${val ? COLOR_MAP[item.color] : 'bg-transparent'}`} 
                        style={{ width: `${cellSize * 0.4}px`, height: `${cellSize * 0.4}px` }}
                      />
                    )))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actual Dragged Block Overlay */}
      <AnimatePresence>
        {draggedItem && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: draggedItem.x - draggedItem.offsetX,
              y: draggedItem.y - draggedItem.offsetY - 20 // Slight lift for visual clearance
            }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
            className="fixed top-0 left-0 pointer-events-none z-[1000]"
            style={{ 
              gridTemplateColumns: `repeat(${tray[draggedItem.index]!.shape[0].length}, 1fr)`,
              display: 'grid',
              gap: '1px'
            }}
          >
            {tray[draggedItem.index]!.shape.map((row, r) => row.map((val, c) => (
              <div 
                key={`${r}-${c}`} 
                className={`rounded-lg border-2 ${val ? COLOR_MAP[tray[draggedItem.index]!.color] : 'bg-transparent border-transparent'}`} 
                style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
              />
            )))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Modal */}
      {gameState === 'gameover' && (
        <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-12 rounded-[3rem] border-red-500/20 text-center max-w-sm w-full">
            <h2 className="text-5xl font-black text-white mb-2 uppercase tracking-tighter italic">GAME<br /><span className="text-red-500">OVER</span></h2>
            <p className="text-slate-400 font-bold mb-8 uppercase tracking-widest text-xs">Final Score: {score}</p>
            <button onClick={startGame} className="w-full py-5 bg-white text-black font-black rounded-2xl text-xl hover:bg-neon-cyan hover:text-white transition-all flex items-center justify-center gap-3">
              <RotateCcw /> TRY AGAIN
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NeonPuzzle;
