"use client";

import { useState, useEffect, useCallback } from 'react';

const BACKEND_URL = "http://localhost:3001";

export const useBackendStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    setIsLoading(true);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    try {
      const response = await fetch(`${BACKEND_URL}/api/health`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(id);
      
      if (response.ok) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      console.log("Backend check failed:", error);
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkStatus();
    // Poll every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  return { isOnline, isLoading, checkStatus };
};
