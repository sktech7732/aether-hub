"use client";

import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, RefreshCcw } from 'lucide-react';
import { HorizontalAd } from '@/components/ads/InFeedAds';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

interface NewsGridProps {
  category: string;
}

const NewsGrid = ({ category }: NewsGridProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryMap: Record<string, string> = {
        tech: 'technology',
        ai: 'artificial intelligence',
        auto: 'automobile sector',
        business: 'business and finance',
        science: 'science',
        gaming: 'gaming industry'
      };

      const query = queryMap[category] || 'technology';
      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'ok') {
        const items = data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: item.description,
          source: item.author || 'Google News'
        }));
        setNews(items);
      } else {
        throw new Error('Failed to fetch news');
      }
    } catch (err) {
      console.error('News fetch error:', err);
      setError('Unable to load latest news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
          <div className="w-2 h-8 bg-neon-cyan rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          Latest in {category}
        </h2>
        <button 
          onClick={fetchNews}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"
        >
          <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 size={40} className="text-neon-cyan animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Scanning the Matrix...</p>
        </div>
      ) : error ? (
        <div className="glass rounded-3xl border border-red-500/20 p-10 text-center">
          <p className="text-red-400 font-bold">{error}</p>
          <button 
            onClick={fetchNews}
            className="mt-4 px-6 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {news.map((article, idx) => (
              <React.Fragment key={article.link + idx}>
                <NewsCard article={article} />
                {(idx + 1) % 6 === 0 && <HorizontalAd />}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default NewsGrid;
