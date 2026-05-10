"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBackendStatus } from '@/hooks/useBackendStatus';
import { Video, AlertCircle, RefreshCw, CheckCircle2, Play, Download, Loader2 } from 'lucide-react';

const ClipForgeUI = () => {
  const { isOnline, isLoading: isCheckingStatus, checkStatus } = useBackendStatus();
  const [url, setUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState({ progress: 0, text: 'Idle' });
  const [results, setResults] = useState<any[]>([]);

  const handleProcess = async () => {
    if (!url) return;
    setProcessing(true);
    setResults([]);
    try {
      const res = await fetch('http://localhost:3001/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.success) {
        setJobId(data.jobId);
        pollStatus(data.jobId);
      }
    } catch (e) {
      console.error(e);
      setProcessing(false);
    }
  };

  const pollStatus = async (id: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/status/${id}`);
        const data = await res.json();
        setStatus({ progress: data.progress, text: data.text });
        
        if (data.progress === 100) {
          clearInterval(interval);
          setResults(data.clips || []);
          setProcessing(false);
        } else if (data.error) {
          clearInterval(interval);
          setProcessing(false);
        }
      } catch (e) {
        clearInterval(interval);
        setProcessing(false);
      }
    }, 2000);
  };

  if (isCheckingStatus) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="text-neon-cyan animate-spin mb-4" size={48} />
        <p className="text-slate-400 font-bold animate-pulse tracking-widest uppercase text-xs">Pinging Local Node...</p>
      </div>
    );
  }

  if (isOnline === false) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-12 text-center"
      >
        <div className="glass p-12 rounded-[3rem] border-red-500/20 relative overflow-hidden">
          <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="text-red-500" size={48} />
          </div>
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Backend Offline</h2>
          <p className="text-slate-400 text-lg mb-10 font-medium leading-relaxed">
            ClipForge AI requires a local connection. Please run the <code className="bg-white/5 px-2 py-1 rounded text-neon-cyan">start-backend.bat</code> file on your PC and ensure it is connected to the internet.
          </p>
          <button 
            onClick={checkStatus}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-neon-cyan hover:text-white transition-all active:scale-95"
          >
            <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" size={20} />
            RETRY CONNECTION
          </button>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">CLIP<span className="text-neon-cyan">FORGE</span></h1>
          <div className="flex items-center gap-2 text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-xs font-black uppercase tracking-widest">Node Online: Local GPU Ready</span>
          </div>
        </div>
      </div>

      {/* Main Input Area */}
      <div className="glass p-8 md:p-12 rounded-[3rem] border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-8 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-violet rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-opacity"></div>
            <input 
              type="text" 
              placeholder="Paste YouTube or Video URL here..."
              className="relative w-full bg-black border border-white/10 rounded-2xl p-6 text-xl font-medium focus:outline-none focus:border-neon-cyan/50 transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={processing}
            />
          </div>
          
          <button 
            onClick={handleProcess}
            disabled={!url || processing}
            className={`w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all
              ${!url || processing ? 'bg-white/5 text-slate-500 cursor-not-allowed' : 'bg-white text-black hover:bg-neon-cyan hover:text-white active:scale-[0.98]'}
            `}
          >
            {processing ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                PROCESSING MODULE...
              </>
            ) : (
              <>
                <Play className="fill-current" size={24} />
                START SLICING
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Section */}
      {processing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-[2.5rem] border-white/5"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-black text-white uppercase tracking-wider">{status.text}</span>
            <span className="text-2xl font-black text-neon-cyan">{status.progress}%</span>
          </div>
          <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
            <motion.div 
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-violet rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${status.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}

      {/* Results Grid */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
          {results.map((clip, i) => (
            <div key={clip.id} className="glass group rounded-3xl overflow-hidden border-white/5 hover:border-neon-cyan/30 transition-all">
              <div className="aspect-[9/16] bg-black relative">
                <video src={`http://localhost:3001${clip.url}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" controls />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white uppercase">
                  {clip.duration}S
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Clip #{i+1}</span>
                <a 
                  href={`http://localhost:3001${clip.url}`} 
                  download 
                  className="p-3 rounded-xl bg-white/5 text-neon-cyan hover:bg-neon-cyan hover:text-white transition-all"
                >
                  <Download size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClipForgeUI;
