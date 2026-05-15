"use client";

import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudLightning, Sun, Wind, MapPin, AlertCircle, Droplets, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherData {
  temp: number;
  condition: string;
  city: string;
  wind: number;
  humidity: number;
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
        const city = geoData.address.city || geoData.address.town || geoData.address.village || "New Delhi";

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m`
        );
        const weatherData = await weatherResponse.json();

        setWeather({
          temp: Math.round(weatherData.current_weather.temperature),
          condition: getWeatherCondition(weatherData.current_weather.weathercode),
          city: city,
          wind: Math.round(weatherData.current_weather.windspeed),
          humidity: weatherData.hourly.relative_humidity_2m[0] || 45
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
          // Default to Jaipur/Delhi coordinates if location denied
          fetchWeather(26.9124, 75.7873);
        }
      );
    } else {
      fetchWeather(26.9124, 75.7873);
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
    const props = { size: 18, className: "text-neon-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" };
    switch (condition) {
      case "Clear": return <Sun {...props} />;
      case "Raining":
      case "Showers": return <CloudRain {...props} />;
      case "Stormy": return <CloudLightning {...props} />;
      default: return <Cloud {...props} />;
    }
  };

  if (!mounted) return null;

  if (loading) return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 rounded-2xl border border-white/5 w-[180px]">
      <div className="w-4 h-4 bg-neon-cyan/20 rounded-full animate-pulse" />
      <div className="flex flex-col gap-1">
        <div className="w-16 h-2 bg-white/5 rounded animate-pulse" />
        <div className="w-20 h-3 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  );

  if (!weather) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 px-5 py-3 bg-white/5 rounded-2xl border border-white/5 hover:border-neon-cyan/30 transition-all duration-500 group relative overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex flex-col shrink-0">
        <div className="flex items-center gap-1.5 mb-1">
          <MapPin size={10} className="text-neon-cyan animate-pulse" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
            {weather.city}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white/5 rounded-lg">
            {getIcon(weather.condition)}
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white leading-none tracking-tighter">
              {weather.temp}°C
            </span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
              {weather.condition}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex h-10 w-px bg-white/10" />

      <div className="hidden md:flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Wind size={12} className="text-slate-500" />
          <span className="text-[10px] font-black text-slate-400">
            {weather.wind} <span className="text-slate-600">KM/H</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets size={12} className="text-slate-500" />
          <span className="text-[10px] font-black text-slate-400">
            {weather.humidity}<span className="text-slate-600">%</span> <span className="text-slate-600">HUMID</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
