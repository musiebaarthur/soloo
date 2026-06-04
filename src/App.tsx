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
import Testimonials from './components/Testimonials';
import LiveChat from './components/LiveChat';
import GalleryTab from './components/GalleryTab';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string>('light-tow');

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    // Smooth scroll page back to top when switching views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreselectService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
  };

  return (
    <div id="soloo-recovery-approot" className="min-h-screen bg-[#1a1a1a] font-sans flex flex-col justify-between selection:bg-[#fbbf24] selection:text-black">
      
      {/* Prime Header Navigation System */}
      <Header currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Main Dynamic View Layout */}
      <main className="flex-1 w-full bg-[#1a1a1a]">
        {currentTab === 'home' && (
          <div className="space-y-16 animate-fade-in py-1">
            <Hero onSelectTab={handleSelectTab} />
            <Testimonials />
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
      </main>

      {/* Persistent Floating 24/7 Live Chat Support Widget */}
      <LiveChat />

      {/* Full Directory Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
