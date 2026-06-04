/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Menu, X, Siren } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export default function Header({ currentTab, onSelectTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'track-book', label: 'Tracking & Book' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tabId: TabType) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div id="soloo-header-container" className="w-full flex flex-col select-none border-b border-white/10 font-sans z-50 sticky top-0 bg-[#1a1a1a]/95 backdrop-blur-md">
      {/* Emergency Hotline Bar */}
      <div className="bg-[#f59e0b] text-black py-2.5 px-4 md:px-10 flex flex-col sm:flex-row justify-between items-center font-black text-xs md:text-sm tracking-tight gap-2">
        <span className="uppercase tracking-wider flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-ping shrink-0" />
          Emergency 24/7 Dispatch Services
        </span>
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
          <a href="tel:0722154729" className="flex items-center gap-1.5 hover:underline">
            <span className="opacity-70 text-[9px] font-mono tracking-widest bg-black/10 px-1 py-0.5 rounded">SAFARICOM:</span> 
            <span className="font-mono">0722 154 729</span>
          </a>
          <a href="tel:0735154729" className="flex items-center gap-1.5 hover:underline mr-2">
            <span className="opacity-70 text-[9px] font-mono tracking-widest bg-black/10 px-1 py-0.5 rounded">AIRTEL:</span> 
            <span className="font-mono">0735 154 729</span>
          </a>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="px-4 md:px-10 py-5 flex justify-between items-end bg-[#1a1a1a] relative">
        <button 
          id="btn-nav-logo"
          onClick={() => handleNavClick('home')}
          className="flex flex-col text-left focus:outline-none group"
        >
          <div className="bg-[#fbbf24] text-black px-4 py-2 border-2 border-black font-black uppercase tracking-tighter text-xl md:text-2xl italic leading-none transition-transform duration-200 group-hover:scale-102 select-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            SOLOO TRUCKS<br />
            <span className="text-zinc-900 font-extrabold font-sans">RECOVERY</span>
          </div>
          <span className="text-[8px] uppercase tracking-[0.2em] text-[#fbbf24] font-black mt-1">East Africa Standby Fleet</span>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden lg:flex gap-8 text-xs font-black uppercase tracking-[0.2em] pb-1" aria-label="Main navigation menu">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors duration-200 pb-1.5 border-b-2 ${
                  isActive
                    ? 'text-[#fbbf24] border-[#fbbf24]'
                    : 'text-gray-400 border-transparent hover:text-[#fbbf24]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Call Trigger and Hamburger for mobile */}
        <div className="flex items-center gap-4">
          <a
            href="tel:0722154729"
            className="hidden sm:flex items-center gap-2 bg-[#fbbf24] hover:bg-white text-black font-black uppercase py-2 px-4 text-xs tracking-widest transition-colors rounded-sm"
          >
            <Phone className="w-3 h-3 text-black" />
            <span>HQ Dispatch</span>
          </a>

          <button
            id="btn-mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#fbbf24] hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle Mobile Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden bg-[#1a1a1a] border-t border-white/10 py-4 px-4 space-y-4 animate-fade-in">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mb-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-sm text-xs font-black uppercase tracking-[0.2em] transition-all ${
                    isActive
                      ? 'bg-[#fbbf24] text-black'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-sm space-y-3">
            <span className="text-[10px] text-[#fbbf24] font-black uppercase tracking-[0.15em] block text-center">
              Active Hotline Callbacks
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:0722154729"
                className="bg-black/40 hover:bg-black/60 text-white border border-white/10 py-2.5 rounded-sm text-[10px] font-black font-mono text-center flex items-center justify-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#fbbf24]" /> 0722154729
              </a>
              <a
                href="tel:0735154729"
                className="bg-black/40 hover:bg-black/60 text-white border border-white/10 py-2.5 rounded-sm text-[10px] font-black font-mono text-center flex items-center justify-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#fbbf24]" /> 0735154729
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
