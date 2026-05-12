"use client";

import React, { useState, useEffect } from 'react';

const RealTimeCounter = ({ baseValue }: { baseValue: number }) => {
  const [count, setCount] = useState(baseValue);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate 1-3 new players joining
      const newPlayers = Math.floor(Math.random() * 3) + 1;
      setCount(prev => prev + newPlayers);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span>{count.toLocaleString()}</span>
  );
};

export default RealTimeCounter;
