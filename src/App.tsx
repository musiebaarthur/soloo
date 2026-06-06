/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ContactTab from './components/ContactTab';
import LiveChat from './components/LiveChat';
import GalleryTab from './components/GalleryTab';
import BlogTab from './components/BlogTab';
import { AdminProvider, useAdmin } from './components/AdminContext';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const { adminMode, setAdminMode } = useAdmin();

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    // Smooth scroll page back to top when switching views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSecretToggle = () => {
    setAdminMode(!adminMode);
  };

  return (
    <div id="soloo-recovery-approot" className="min-h-screen bg-white font-sans flex flex-col justify-between selection:bg-[#f97316] selection:text-white">
      
      {/* Prime Header Navigation System */}
      <Header currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Main Dynamic View Layout */}
      <main className="flex-1 w-full bg-white">
        {currentTab === 'home' && (
          <div className="animate-fade-in py-1">
            <Hero onSelectTab={handleSelectTab} />
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

      {/* Persistent Floating 24/7 Live Chat Support Widget */}
      <LiveChat />

      {/* Full Directory Footer */}
      <Footer onSelectTab={handleSelectTab} onSecretUnlock={handleSecretToggle} />
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
