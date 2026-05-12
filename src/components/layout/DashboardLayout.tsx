"use client";

import React from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import AdBanner from '@/components/ads/AdBanner';
import SignatureFooter from './SignatureFooter';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col md:flex-row overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-cyan/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-neon-violet/5 blur-[120px] rounded-full" />
      </div>

      <Sidebar />
      <MobileNav />

      <main className="flex-1 md:ml-64 relative min-h-screen pt-20 md:pt-0">
        <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
          <AdBanner />
          <div className="flex-1 p-6 md:p-10">
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
