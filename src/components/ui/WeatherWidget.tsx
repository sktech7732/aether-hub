"use client";

import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudLightning, Sun, Wind, MapPin, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherData {
  temp: number;
  condition: string;
  city: string;
}

const WeatherWidget = () => {
  const [mounted, setMounted] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Handle Hydration (Next.js requirement)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const geoData = await geoResponse.json();
        const city = geoData.address.city || geoData.address.town || geoData.address.village || "Unknown Location";

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        setWeather({
          temp: Math.round(weatherData.current_weather.temperature),
          condition: getWeatherCondition(weatherData.current_weather.weathercode),
          city: city
        });
        setLoading(false);
      } catch (err) {
        console.error("Weather error:", err);
        setError("Network error");
        setLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          if (err.code === 1) {
            setError("Location access denied");
          } else {
            setError("Location unavailable");
          }
          setLoading(false);
        }
      );
    } else {
      setError("Not supported");
      setLoading(false);
    }
  }, [mounted]);

  const getWeatherCondition = (code: number) => {
    if (code === 0) return "Clear";
    if (code >= 1 && code <= 3) return "Partly Cloudy";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 67) return "Raining";
    if (code >= 71 && code <= 77) return "Snowing";
    if (code >= 80 && code <= 82) return "Showers";
    if (code >= 95) return "Stormy";
    return "Cloudy";
  };

  const getIcon = (condition: string) => {
    const props = { size: 16, className: "text-neon-cyan" };
    switch (condition) {
      case "Clear": return <Sun {...props} />;
      case "Raining":
      case "Showers": return <CloudRain {...props} />;
      case "Stormy": return <CloudLightning {...props} />;
      default: return <Cloud {...props} />;
    }
  };

  // Prevent server-side rendering issues
  if (!mounted) return null;

  if (loading) return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
      <div className="w-4 h-4 bg-neon-cyan/20 rounded-full animate-ping" />
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Detecting...</span>
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-2 px-3 py-2 bg-red-500/5 rounded-xl border border-red-500/10">
      <AlertCircle size={12} className="text-red-500" />
      <span className="text-[9px] font-bold text-red-400 uppercase tracking-tighter">{error}</span>
    </div>
  );

  if (!weather) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors group"
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <MapPin size={10} className="text-slate-500" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter truncate max-w-[80px]">
            {weather.city}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {getIcon(weather.condition)}
          <span className="text-sm font-black text-white">{weather.temp}°C</span>
          <span className="text-[9px] font-medium text-slate-500 uppercase tracking-wider hidden group-hover:inline-block">
            {weather.condition}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
