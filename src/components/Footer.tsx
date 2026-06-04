/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, HeartHandshake, Siren } from 'lucide-react';
import { TabType } from '../types';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
}

export default function Footer({ onSelectTab }: FooterProps) {
  const handleNavClick = (tabId: TabType) => {
    onSelectTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#151515] border-t border-white/10 select-none text-xs text-white">
      {/* Upper footer directories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Information column */}
        <div className="lg:col-span-2 space-y-4">
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left focus:outline-none"
          >
            <div className="bg-[#fbbf24] text-black px-4 py-2 border-2 border-black font-black uppercase tracking-tighter text-xl italic leading-none transition-transform duration-200 group-hover:scale-102 select-none inline-block">
              SOLOO TRUCKS<br />
              <span className="text-zinc-900 font-extrabold font-sans">RECOVERY</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.2em] text-[#fbbf24] font-black mt-1">East Africa Standby Fleet</span>
          </button>

          <p className="text-zinc-200 font-medium leading-relaxed max-w-sm text-[11px] md:text-xs">
            Inspirationally designed after premium regional towing recovery models. Soloo remains specialized in 360-degree rotation heavy cranes, industrial forklift materials dispatch, flatbeds, and high-performance roadside intervention systems 24/7.
          </p>

          <div className="space-y-2 text-zinc-300 font-medium text-[11px] leading-normal pt-1">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#fbbf24] shrink-0" /> 
              Mombasa Road, adjacent to Cabanas Standby Depot, Nairobi
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#fbbf24] shrink-0" /> 
              dispatch@soloorecovery-demo.com
            </p>
          </div>
        </div>

        {/* Quick Navigation column */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#fbbf24] uppercase tracking-[0.15em] border-b border-white/10 pb-2">Core Navigation</h4>
          <div className="flex flex-col gap-2.5">
            <button onClick={() => handleNavClick('home')} className="text-left text-zinc-300 hover:text-white font-medium transition-colors">Home Page</button>
            <button onClick={() => handleNavClick('services')} className="text-left text-zinc-300 hover:text-white font-medium transition-colors">Our Services</button>
            <button onClick={() => handleNavClick('gallery')} className="text-left text-zinc-300 hover:text-white font-medium transition-colors">Fleet Photo Gallery</button>
            <button onClick={() => handleNavClick('track-book')} className="text-left text-zinc-300 hover:text-white font-medium transition-colors">Track & Book Simulator</button>
            <button onClick={() => handleNavClick('contact')} className="text-left text-zinc-300 hover:text-white font-medium transition-colors">Contact & Support</button>
          </div>
        </div>

        {/* Services column */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#fbbf24] uppercase tracking-[0.15em] border-b border-white/10 pb-2">Service Lines</h4>
          <div className="flex flex-col gap-2.5 text-zinc-300 font-medium">
            <span>Standard Flatbeds</span>
            <span>Heavy Duty rotators &amp; Cranes</span>
            <span>Heavy Lift Forklift Hire</span>
            <span>Emergency Battery &amp; Fuel Assist</span>
          </div>
        </div>

        {/* Active Support columns */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#fbbf24] uppercase tracking-[0.15em] border-b border-white/10 pb-2">24H Active Hotlines</h4>
          
          <div className="space-y-2">
            <a
              href="tel:0722154729"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-2 px-3 rounded-none flex items-center justify-between transition-colors text-[11px]"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>0722 154 729</span>
              </div>
              <span className="text-[8px] text-[#fbbf24] font-black uppercase tracking-widest">Safaricom</span>
            </a>

            <a
              href="tel:0735154729"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-2 px-3 rounded-none flex items-center justify-between transition-colors text-[11px]"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>0735 154 729</span>
              </div>
              <span className="text-[8px] text-[#fbbf24] font-black uppercase tracking-widest">Airtel</span>
            </a>
          </div>

          <div className="border border-white/10 bg-white/5 p-3 rounded-none flex items-start gap-2 text-[10px] leading-tight text-zinc-300 font-semibold">
            <Siren className="w-3.5 h-3.5 text-[#fbbf24] shrink-0 mt-0.5" />
            <span>We maintain standby highway operators across Nairobi boundaries. Fully insured rescue operations guaranteed!</span>
          </div>
        </div>

      </div>

      {/* Extreme Bottom Bar Matches Design Precisely */}
      <div className="bg-[#101010] p-4 px-4 md:px-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-400">
        <div className="flex flex-col gap-1 text-center md:text-left font-medium">
          <span>
            © {currentYear} SOLOO TRUCKS RECOVERY • Licensed & Insured Operators • Developed in inspiration with www.soloorecovery.com
          </span>
          <span className="opacity-65">
            Demo Simulation Prototype - All transactions, GPS coordinates mapping, and driver updates are mock simulated events.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#fbbf24] rounded-full"></div>
            <span className="font-bold uppercase tracking-wider text-zinc-300">Secure Payments via M-Pesa &amp; Card</span>
          </div>

          <div className="hidden lg:flex items-center gap-3 border-l border-white/10 pl-3">
            <span className="text-[#fbbf24] font-black uppercase tracking-wider text-[9px]">Kenya • Uganda • Tanzania</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
