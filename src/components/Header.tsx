/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { TabType } from '../types';
import CraneLogo from './CraneLogo';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export default function Header({ currentTab, onSelectTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tabId: TabType) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div id="soloo-header-container" className="w-full flex flex-col select-none border-b border-zinc-200 font-sans z-50 sticky top-0 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Emergency Hotline Bar - Striking Orange & Black */}
      <div className="bg-[#f97316] text-black py-2.5 px-4 md:px-10 flex flex-col sm:flex-row justify-between items-center font-black text-xs md:text-sm tracking-tight gap-2">
        <span className="uppercase tracking-wider flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-ping shrink-0" />
          Emergency 24/7 Dispatch Services
        </span>
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center text-black">
          <a href="tel:0722154729" className="flex items-center gap-1.5 hover:underline font-bold">
            <span className="opacity-75 text-[9px] font-mono tracking-widest bg-black/10 px-1 py-0.5 rounded">SAFARICOM:</span> 
            <span className="font-mono">0722 154 729</span>
          </a>
          <a href="tel:0735154729" className="flex items-center gap-1.5 hover:underline font-bold">
            <span className="opacity-75 text-[9px] font-mono tracking-widest bg-black/10 px-1 py-0.5 rounded">AIRTEL:</span> 
            <span className="font-mono">0735 154 729</span>
          </a>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="px-4 md:px-10 py-4 flex justify-between items-center bg-white relative">
        <button 
          id="btn-nav-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-left focus:outline-none group select-none"
        >
          <div className="bg-zinc-50 border-2 border-[#f97316] p-1 transition-colors group-hover:bg-[#f97316]/5">
            <CraneLogo className="w-9 h-9 md:w-10 md:h-10 text-[#f97316] transition-transform duration-200 group-hover:scale-105" />
          </div>
          <div className="flex flex-col">
            <div className="bg-[#f97316] text-black px-2.5 py-1 border border-black font-black uppercase tracking-tighter text-xs md:text-sm italic leading-none transition-transform duration-150 group-hover:bg-neutral-900 group-hover:text-white select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              SOLOO TRUCKS<br />
              <span className="text-zinc-900 font-extrabold group-hover:text-white font-sans text-[8.5px] tracking-widest block mt-0.5">RECOVERY</span>
            </div>
            <span className="text-[7.5px] uppercase tracking-[0.16em] text-[#f97316] font-black mt-0.5">East Africa Network Fleet</span>
          </div>
        </button>

        {/* Desktop Navigation Links - Pristine black on white with orange highlights */}
        <nav id="desktop-nav" className="hidden lg:flex gap-8 text-xs font-black uppercase tracking-[0.15em]" aria-label="Main navigation menu">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors duration-200 pb-1 border-b-2 font-bold ${
                  isActive
                    ? 'text-[#f97316] border-[#f97316]'
                    : 'text-zinc-700 border-transparent hover:text-[#f97316]'
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
            className="hidden sm:flex items-center gap-2 bg-neutral-950 hover:bg-[#f97316] hover:text-black text-white font-black uppercase py-2 px-4.5 text-xs tracking-widest transition-colors rounded-none shadow-[2px_2px_0px_0px_rgba(249,115,22,1)]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>24h Hotline</span>
          </a>

          <button
            id="btn-mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-neutral-900 hover:text-[#f97316] transition-colors focus:outline-none"
            aria-label="Toggle Mobile Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden bg-white border-t border-zinc-200 py-4 px-4 space-y-4 animate-fade-in shadow-lg">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mb-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-none text-xs font-black uppercase tracking-[0.15em] transition-all border ${
                    isActive
                      ? 'bg-[#f97316] text-black border-black/20'
                      : 'text-zinc-800 bg-zinc-50 border-zinc-100 hover:bg-neutral-50 hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-none space-y-2.5">
            <span className="text-[10px] text-[#f97316] font-black uppercase tracking-[0.15em] block text-center">
              Active Hotline Callbacks
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:0722154729"
                className="bg-white hover:bg-zinc-100 text-zinc-950 border border-zinc-200 py-2 rounded-none text-[10px] font-black font-mono text-center flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#f97316]" /> 0722 154 729
              </a>
              <a
                href="tel:0735154729"
                className="bg-white hover:bg-zinc-100 text-zinc-950 border border-zinc-200 py-2 rounded-none text-[10px] font-black font-mono text-center flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#f97316]" /> 0735 154 729
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
