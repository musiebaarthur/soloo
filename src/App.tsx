/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServicesTab from './components/ServicesTab';
import TrackingDashboard from './components/TrackingDashboard';
import ContactTab from './components/ContactTab';
import LiveChat from './components/LiveChat';
import GalleryTab from './components/GalleryTab';
import BlogTab from './components/BlogTab';
import { AdminProvider, useAdmin } from './components/AdminContext';
import { Shield, RefreshCw } from 'lucide-react';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string>('light-tow');
  const { adminMode, setAdminMode, resetToDefaults } = useAdmin();

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    // Smooth scroll page back to top when switching views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreselectService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
  };

  return (
    <div id="soloo-recovery-approot" className="min-h-screen bg-[#1a1a1a] font-sans flex flex-col justify-between selection:bg-[#f97316] selection:text-black">
      
      {/* Prime Header Navigation System */}
      <Header currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Main Dynamic View Layout */}
      <main className="flex-1 w-full bg-[#1a1a1a]">
        {currentTab === 'home' && (
          <div className="animate-fade-in py-1">
            <Hero onSelectTab={handleSelectTab} />
          </div>
        )}

        {currentTab === 'services' && (
          <div className="animate-fade-in py-4">
            <ServicesTab 
              onSelectTab={handleSelectTab} 
              onPreselectService={handlePreselectService} 
            />
          </div>
        )}

        {currentTab === 'track-book' && (
          <div className="animate-fade-in py-4">
            <TrackingDashboard 
              preselectedServiceId={preselectedServiceId} 
            />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="animate-fade-in py-4">
            <ContactTab />
          </div>
        )}

        {currentTab === 'gallery' && (
          <div className="animate-fade-in py-4">
            <GalleryTab />
          </div>
        )}

        {currentTab === 'blog' && (
          <div className="animate-fade-in py-4">
            <BlogTab />
          </div>
        )}
      </main>

      {/* Floating Admin Control Panel Widget (Bottom Left Opposite of Chat Widget) */}
      <div className="fixed bottom-6 left-6 z-[60] font-sans select-none">
        <div className="bg-[#151515] border-2 border-[#f97316] text-[#f97316] p-3 rounded-none shadow-2xl flex flex-col gap-2 max-w-[280px]">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-1.5">
            <span className="text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#f97316]" /> Soloo Admin Portal
            </span>
            <div className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${adminMode ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${adminMode ? 'bg-emerald-500' : 'bg-red-500'}`} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[9px] font-extrabold uppercase text-white tracking-widest">
              {adminMode ? 'MODE: ACTIVE' : 'MODE: DISABLED'}
            </span>
            <button
              onClick={() => setAdminMode(!adminMode)}
              className={`text-[9px] font-black uppercase px-2.5 py-1.5 cursor-pointer border tracking-widest transition-all ${
                adminMode 
                  ? 'bg-red-950 hover:bg-red-900 text-red-200 border-red-800' 
                  : 'bg-[#f97316] hover:bg-white text-black border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
              }`}
            >
              {adminMode ? 'CLOSE CONTROLS' : 'ADMIN CONTROLS'}
            </button>
          </div>

          {adminMode && (
            <div className="pt-1.5 border-t border-white/5 flex flex-col gap-1 text-[9px] font-bold text-zinc-400 text-left">
              <span className="leading-tight mb-2 text-zinc-300">
                You are now in Admin Mode! You can now dynamically edit or delete slides, update services, rephrase home titles, and fully append or remove news articles.
              </span>
              <button
                onClick={resetToDefaults}
                className="w-full bg-neutral-900 hover:bg-zinc-800 text-[#f97316] border border-[#f97316]/30 py-1.5 font-black flex items-center justify-center gap-1 uppercase cursor-pointer"
                title="Reset all content to original defaults"
              >
                <RefreshCw className="w-3 h-3 text-[#f97316]" /> Reset Back to Baseline
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Floating 24/7 Live Chat Support Widget */}
      <LiveChat />

      {/* Full Directory Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
