"use client";

import React from 'react';
import GlobalNav from './GlobalNav';
import { VerticalAd } from '@/components/ads/InFeedAds';
import AdBanner from '@/components/ads/AdBanner';
import SignatureFooter from './SignatureFooter';
import { motion, AnimatePresence } from 'framer-motion';

import BackgroundEffects from '../ui/BackgroundEffects';
import CustomCursor from '../ui/CustomCursor';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col overflow-x-hidden">
      <BackgroundEffects />
      <CustomCursor />

      <GlobalNav />
      
      {/* Side Ads */}
      <VerticalAd side="left" />
      <VerticalAd side="right" />

      <main className="flex-1 relative min-h-screen pt-[220px]">
        <div className="max-w-5xl mx-auto flex flex-col min-h-screen">
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
