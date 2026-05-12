"use client";

import { useState, useEffect, useCallback } from 'react';

export const useBackendStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backendUrl, setBackendUrl] = useState("http://localhost:3001");

  const PUBLIC_BACKEND = "https://backend.ompraksh.site";

  useEffect(() => {
    const savedUrl = localStorage.getItem('clipforge_backend_url');
    if (savedUrl) setBackendUrl(savedUrl);
  }, []);

  const checkStatus = useCallback(async () => {
    setIsLoading(true);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2000);
    
    try {
      // 1. Try local first (Zero latency)
      let response = await fetch(`${backendUrl}/api/health`, { signal: controller.signal });
      
      // 2. If local fails and we are on a remote device, try the Public Tunnel
      if (!response.ok && backendUrl.includes("localhost")) {
        response = await fetch(`${PUBLIC_BACKEND}/api/health`, { signal: controller.signal });
        if (response.ok) setBackendUrl(PUBLIC_BACKEND);
      }

      if (response.ok) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      // 3. Final attempt: Try Public Tunnel if catch block was hit by localhost failure
      try {
        const pubResponse = await fetch(`${PUBLIC_BACKEND}/api/health`, { signal: controller.signal });
        if (pubResponse.ok) {
          setBackendUrl(PUBLIC_BACKEND);
          setIsOnline(true);
          return;
        }
      } catch (e) {}
      setIsOnline(false);
    } finally {
      setIsLoading(false);
      clearTimeout(id);
    }
  }, [backendUrl]);

  useEffect(() => {
    checkStatus();
    // Poll every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  return { isOnline, isLoading, checkStatus };
};
