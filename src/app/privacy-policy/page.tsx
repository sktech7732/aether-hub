"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        <header className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-4 rounded-3xl bg-neon-cyan/10 border border-neon-cyan/20 mb-4"
          >
            <Shield className="text-neon-cyan" size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Privacy <span className="text-neon-cyan">Policy</span>
          </h1>
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Last Updated: May 2026 // Aether Intelligence Network</p>
        </header>

        <div className="grid gap-8">
          <Section 
            icon={<Lock className="text-neon-cyan" size={20} />}
            title="Data Collection"
            content="At Aether News, we value your digital security. We collect minimal data required to provide our news services, including basic device information and browsing behavior to optimize your experience."
          />
          
          <Section 
            icon={<Eye className="text-neon-violet" size={20} />}
            title="Advertising Partners"
            content="We use third-party advertising partners like Adsterra to serve ads. These partners may use cookies and web beacons to collect data such as your IP address and ISP to provide personalized advertisements."
          />

          <Section 
            icon={<FileText className="text-neon-cyan" size={20} />}
            title="Cookie Policy"
            content="Cookies are used to store information about your preferences and to record user-specific information on which pages you access or visit. This helps us customize our content based on your browser type."
          />

          <div className="glass p-8 rounded-[2.5rem] border-white/5 space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Your Rights</h3>
            <p className="text-slate-400 leading-relaxed">
              You have the right to opt-out of personalized advertising and clear your cookies at any time through your browser settings. We are committed to transparency in how your data is handled within the Aether Intelligence Network.
            </p>
            <div className="pt-4 border-t border-white/5">
              <p className="text-sm text-slate-500 italic">
                For further inquiries, please contact our Intelligence Terminal at: <span className="text-neon-cyan">privacy@aethernews.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Section({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass p-8 rounded-[2rem] border-white/5 hover:border-white/10 transition-colors"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
          {icon}
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h2>
      </div>
      <p className="text-slate-400 leading-relaxed text-lg">
        {content}
      </p>
    </motion.div>
  );
}
