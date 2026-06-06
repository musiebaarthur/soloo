/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, Siren } from 'lucide-react';
import { TabType } from '../types';
import CraneLogo from './CraneLogo';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
  onSecretUnlock?: () => void;
}

export default function Footer({ onSelectTab, onSecretUnlock }: FooterProps) {
  const handleNavClick = (tabId: TabType) => {
    onSelectTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t-2 border-[#f97316] select-none text-xs text-white">
      {/* Upper footer directories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Information column */}
        <div className="space-y-4">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left focus:outline-none group select-none cursor-pointer"
          >
            <div className="bg-neutral-950 border border-[#f97316] p-1.5">
              <CraneLogo className="w-8 h-8 text-[#f97316]" />
            </div>
            <div className="flex flex-col">
              <div className="bg-[#f97316] text-black px-3 py-1 border border-black font-black uppercase tracking-tighter text-xs italic leading-none select-none">
                SOLOO TRUCKS<br />
                <span className="text-black font-extrabold font-sans text-[9px]">RECOVERY</span>
              </div>
            </div>
          </button>

          <p className="text-zinc-200 font-semibold leading-relaxed text-[11.5px] md:text-xs">
            Soloo Trucks Recovery provides <span className="text-[#f97316] font-extrabold">24/7 heavy rotating cranes</span>, <span className="text-white font-extrabold">reliable flatbed tow services</span>, and <span className="text-[#f97316] font-extrabold">industrial forklift rentals</span> across all major East African transport corridors.
          </p>

          <div className="space-y-2 text-white font-semibold text-[11px] leading-normal pt-1">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#f97316] shrink-0" /> 
              <span className="text-zinc-100">Kondele, Kisumu, Kenya</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#f97316] shrink-0" /> 
              <span className="text-white">dispatch@soloorecovery.com</span>
            </p>
          </div>
        </div>

        {/* Quick Navigation column - Streamlined to only the 4 core tabs */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#f97316] uppercase tracking-[0.15em] border-b border-zinc-900 pb-2">Navigation</h4>
          <div className="flex flex-col gap-2.5">
            <button onClick={() => handleNavClick('home')} className="text-left text-white hover:text-[#f97316] font-semibold transition-colors cursor-pointer">● Home Page</button>
            <button onClick={() => handleNavClick('gallery')} className="text-left text-white hover:text-[#f97316] font-semibold transition-colors cursor-pointer">● Fleet Gallery</button>
            <button onClick={() => handleNavClick('blog')} className="text-left text-white hover:text-[#f97316] font-semibold transition-colors cursor-pointer">● Our Blog</button>
            <button onClick={() => handleNavClick('contact')} className="text-left text-white hover:text-[#f97316] font-semibold transition-colors cursor-pointer">● Contact Support</button>
          </div>
        </div>

        {/* Active Support columns */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#f97316] uppercase tracking-[0.15em] border-b border-zinc-900 pb-2">Active Hotlines Line</h4>
          
          <div className="space-y-2.5">
            <a
              href="tel:0722154729"
              className="bg-neutral-950 border border-zinc-900 hover:border-[#f97316] hover:bg-neutral-900 text-white font-bold py-2.5 px-3 rounded-none flex items-center justify-between transition-all text-[11px]"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f97316]" />
                <span className="font-mono text-white">0722 154 729</span>
              </div>
              <span className="text-[8px] text-[#f97316] font-black uppercase tracking-widest bg-black px-1.5 py-0.5 border border-[#f97316]/30">Safaricom</span>
            </a>

            <a
              href="tel:0735154729"
              className="bg-neutral-950 border border-zinc-900 hover:border-[#f97316] hover:bg-neutral-900 text-white font-bold py-2.5 px-3 rounded-none flex items-center justify-between transition-all text-[11px]"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f97316]" />
                <span className="font-mono text-white">0735 154 729</span>
              </div>
              <span className="text-[8px] text-[#f97316] font-black uppercase tracking-widest bg-black px-1.5 py-0.5 border border-[#f97316]/30">Airtel</span>
            </a>
          </div>
        </div>

        {/* Action Coverage Status */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#f97316] uppercase tracking-[0.15em] border-b border-zinc-900 pb-2">HQ Dispatch</h4>
          <div className="border border-zinc-900 bg-neutral-950 p-3.5 rounded-none flex items-start gap-2.5 text-[10.5px] leading-relaxed text-white font-semibold">
            <Siren className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5 animate-pulse" />
            <span className="text-zinc-100">We maintain standby heavy operators stationed across Kenya, Uganda, and Tanzania. Contact our duty controller anytime.</span>
          </div>
        </div>

      </div>

      {/* Extreme Bottom Bar Matches Design Precisely */}
      <div className="bg-black p-5 px-4 md:px-10 border-t border-zinc-950 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-400">
        <div className="flex flex-col gap-1 text-center md:text-left font-medium select-none">
          <span 
            onDoubleClick={onSecretUnlock}
            className="cursor-default text-zinc-300 hover:text-white transition-colors uppercase font-bold"
          >
            © {currentYear} SOLOO TRUCKS RECOVERY • Licensed &amp; Insured Operators
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#f97316] rounded-full animate-pulse"></div>
            <span className="font-bold uppercase tracking-wider text-[#f97316]">East African Corridor Coverage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
