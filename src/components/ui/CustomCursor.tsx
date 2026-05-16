"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-neon-cyan pointer-events-none z-[9999] hidden lg:block mix-blend-difference"
    >
      <div className="absolute inset-0 rounded-full bg-neon-cyan/20 blur-[4px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-neon-cyan rounded-full" />
    </motion.div>
  );
};

export default CustomCursor;
