"use client";

import React from 'react';
import GlobalNav from './GlobalNav';
import { VerticalAd } from '@/components/ads/InFeedAds';
import AdBanner from '@/components/ads/AdBanner';
import SignatureFooter from './SignatureFooter';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-cyan/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-neon-violet/5 blur-[120px] rounded-full" />
      </div>

      <GlobalNav />
      
      {/* Side Ads */}
      <VerticalAd side="left" />
      <VerticalAd side="right" />

      <main className="flex-1 relative min-h-screen pt-[220px]">
        <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
          <AdBanner />
          <div className="flex-1 p-4 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key="page-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <SignatureFooter />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
