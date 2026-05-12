"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Cpu, HardDrive, Database, Shield } from 'lucide-react';

const UPGRADES = [
  { id: 'cpu', name: 'Neural Link', cost: 15, power: 1, icon: Cpu, color: 'text-neon-cyan' },
  { id: 'drive', name: 'Data Drive', cost: 100, power: 5, icon: HardDrive, color: 'text-neon-violet' },
  { id: 'db', name: 'Mainframe', cost: 500, power: 25, icon: Database, color: 'text-neon-pink' },
  { id: 'shield', name: 'Nexus Shield', cost: 2000, power: 100, icon: Shield, color: 'text-emerald-400' },
];

const NeonClicker = () => {
  const [data, setData] = useState(0);
  const [power, setPower] = useState(1);
  const [cps, setCps] = useState(0);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number, value: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setData(prev => prev + power);
    setClicks(prev => [...prev, { id: Date.now(), x, y, value: power }]);
    
    // Remove click animation after 1s
    setTimeout(() => {
      setClicks(prev => prev.filter(c => Date.now() - c.id < 1000));
    }, 1000);
  };

  const buyUpgrade = (upgrade: typeof UPGRADES[0]) => {
    if (data >= upgrade.cost) {
      setData(prev => prev - upgrade.cost);
      if (upgrade.id === 'cpu') setPower(p => p + upgrade.power);
      else setCps(p => p + upgrade.power);
      upgrade.cost = Math.floor(upgrade.cost * 1.5);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (cps > 0) setData(prev => prev + cps);
    }, 1000);
    return () => clearInterval(timer);
  }, [cps]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950 font-sans p-6 gap-8">
      {/* Click Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="mb-8 text-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] block mb-2">Harvested Intelligence</span>
          <h2 className="text-6xl font-black text-white italic tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {Math.floor(data)}
          </h2>
          <span className="text-neon-cyan font-bold text-xs uppercase tracking-widest mt-2 block">+{cps} per second</span>
        </div>

        <button 
          onClick={handleClick}
          className="relative group outline-none"
        >
          <div className="absolute -inset-8 bg-neon-cyan/20 blur-3xl rounded-full group-active:scale-110 transition-transform" />
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-48 h-48 rounded-full glass border-2 border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl"
          >
            <Zap size={64} className="text-neon-cyan fill-neon-cyan group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan/10 to-transparent" />
          </motion.div>

          <AnimatePresence>
            {clicks.map(click => (
              <motion.span
                key={click.id}
                initial={{ y: click.y, x: click.x, opacity: 1, scale: 1 }}
                animate={{ y: click.y - 100, opacity: 0, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="absolute text-neon-cyan font-black italic pointer-events-none text-xl"
              >
                +{click.value}
              </motion.span>
            ))}
          </AnimatePresence>
        </button>
      </div>

      {/* Upgrades Sidebar */}
      <div className="w-full md:w-80 space-y-4">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 px-2">Hardware Upgrades</h3>
        {UPGRADES.map(upgrade => (
          <button
            key={upgrade.id}
            onClick={() => buyUpgrade(upgrade)}
            disabled={data < upgrade.cost}
            className={`
              w-full glass p-4 rounded-2xl border flex items-center gap-4 transition-all
              ${data >= upgrade.cost ? 'border-white/10 hover:border-white/30 cursor-pointer' : 'border-transparent opacity-40 grayscale cursor-not-allowed'}
            `}
          >
            <div className={`p-3 rounded-xl bg-black/40 ${upgrade.color}`}>
              <upgrade.icon size={24} />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-black text-white uppercase italic">{upgrade.name}</h4>
              <p className="text-[10px] font-bold text-slate-500">
                {upgrade.id === 'cpu' ? `+${upgrade.power} Click Power` : `+${upgrade.power} Auto Harvest`}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-neon-cyan">{upgrade.cost}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NeonClicker;
