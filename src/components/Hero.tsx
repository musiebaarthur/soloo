/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Truck, ArrowRight, ShieldAlert, Phone, Compass, 
  HelpCircle, Scale, ShieldCheck, Cpu, Siren 
} from 'lucide-react';
import { TabType } from '../types';

interface HeroProps {
  onSelectTab: (tab: TabType) => void;
}

export default function Hero({ onSelectTab }: HeroProps) {
  const [pickupText, setPickupText] = useState('');
  const [serviceType, setServiceType] = useState('heavy-tow');

  const activeRescues = 8;
  const dispatchTime = '18 Mins';
  const satisfiedRating = '4.95 / 5';

  const handleShortcutSubmit = () => {
    // Go to track-book tab and we can let the user's input guide them
    onSelectTab('track-book');
  };

  return (
    <div id="home-hero-layout" className="w-full flex flex-col font-sans text-white select-none bg-[#1a1a1a]">
      
      {/* Edge-to-edge Bold Layout Grid split 7/5 */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-white/10">
        
        {/* Left Side Content & Direct booking form (7 columns) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 space-y-12">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#fbbf24]/10 border border-[#fbbf24]/20 px-3 py-1 rounded-none text-xs">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-ping shrink-0" />
              <span className="text-[#fbbf24] font-black uppercase tracking-widest text-[10px]">ACTIVE STANDBY FLEET (24/7)</span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-black uppercase leading-[0.85] tracking-tighter">
              Heavy Duty<br />
              <span className="text-[#fbbf24]">Response</span> Unit
            </h2>

            <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed">
              Specialized roadside assistance, pivot rotator cranes, and forklift services. Real-time fleet tracking ensures we reach you in minutes, not hours. Fully bonded and active across all regional highways.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="btn-hero-book"
                onClick={() => onSelectTab('track-book')}
                className="bg-[#fbbf24] hover:bg-white text-black font-black uppercase py-4 px-6 text-xs tracking-widest transition-colors rounded-none flex items-center gap-2"
              >
                Order Direct Dispatch Now <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="btn-hero-services"
                onClick={() => onSelectTab('services')}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase py-4 px-6 text-xs tracking-widest transition-colors rounded-none"
              >
                Explore Services &amp; Rates
              </button>
            </div>
          </div>

          {/* Quick Booking shortcut Form inside Hero */}
          <div className="bg-white/5 p-6 rounded-none border border-white/10 space-y-4 max-w-xl">
            <h3 className="text-xs uppercase tracking-[0.2em] font-black text-[#fbbf24]">Instant Request Coordinator</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Pickup Location</label>
                <input 
                  type="text" 
                  value={pickupText}
                  onChange={(e) => setPickupText(e.target.value)}
                  placeholder="e.g. Cabanas Metro, Nairobi" 
                  className="bg-transparent border-b border-white/20 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-[#fbbf24] transition-colors"
                />
              </div>
              
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Service Type Required</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="bg-transparent border-b border-white/20 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-[#fbbf24] transition-colors [&>option]:bg-[#1a1a1a]"
                >
                  <option value="heavy-tow">Heavy Duty Crane Salvage</option>
                  <option value="light-tow">Flatbed / Wheel Lift Towing</option>
                  <option value="forklift">Warehouse Forklift Dispatch</option>
                  <option value="roadside">Roadside Jumpstart &amp; Fuel</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleShortcutSubmit}
              className="w-full bg-[#fbbf24] hover:bg-white text-black font-black uppercase py-3.5 text-xs tracking-widest transition-colors rounded-none flex items-center justify-center gap-1.5"
            >
              Initialize Dispatch &amp; Estimate Rate <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>

        </div>

        {/* Right Side Services Grid and Testimonial block (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          
          {/* Services Matrix Indicators */}
          <div className="flex-1 grid grid-cols-2 bg-white/5">
            <div className="p-6 border-b border-r border-white/10 flex flex-col justify-center space-y-3">
              <div className="text-[#fbbf24] text-3xl font-black italic">01</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">24/7 Dispatch</h4>
              <p className="text-[11px] text-gray-400 leading-normal">Instant coordination for emergency highway and off-road vehicles rescue.</p>
            </div>
            
            <div className="p-6 border-b border-white/10 flex flex-col justify-center space-y-3">
              <div className="text-[#fbbf24] text-3xl font-black italic">02</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">Heavy Crane</h4>
              <p className="text-[11px] text-gray-400 leading-normal">Pivoting rotator rigs capable of pulling trucks from ditch salvages.</p>
            </div>
            
            <div className="p-6 border-b lg:border-b-0 border-r border-white/10 flex flex-col justify-center space-y-3">
              <div className="text-[#fbbf24] text-3xl font-black italic">03</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">Forklift Service</h4>
              <p className="text-[11px] text-gray-400 leading-normal">Precision warehouse and heavy port generator lifting arrays instantly.</p>
            </div>
            
            <div className="p-6 border-b lg:border-b-0 border-white/10 flex flex-col justify-center space-y-3">
              <div className="text-[#fbbf24] text-3xl font-black italic">04</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">GPS Mapping</h4>
              <p className="text-[11px] text-gray-400 leading-normal">Dynamic tracking maps to oversee response team routing and speeds.</p>
            </div>
          </div>

          {/* Bold Amber Customer Feedback block (testimonial) */}
          <div className="p-8 md:p-10 bg-[#fbbf24] text-black">
            <h3 className="text-[9px] uppercase font-black tracking-[0.25em] text-black/55 mb-4">Core Fleet Endorsement</h3>
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-black italic leading-tight text-black tracking-tight">
                "Fastest response time in Nairobi. Their heavy rotator crane operators managed a difficult ditch recovery off Mombasa Road with zero additional damage."
              </p>
              <div className="flex justify-between items-center border-t border-black/10 pt-3">
                <span className="text-xs font-black uppercase text-black">— Marcus Toroitich, Logistics Director</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-black text-xs">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Brand Value Metrics Row */}
      <section className="bg-[#151515] py-12 px-6 sm:px-10 lg:px-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-5 bg-white/5 border border-white/10 rounded-none space-y-3">
            <span className="text-3xl font-black text-[#fbbf24] italic tracking-tight block">24 / 7 / 365</span>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">ALWAYS ON WATCH</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Our live operators and standby heavy riggers remain operational through late-night conditions.
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-none space-y-3">
            <span className="text-3xl font-black text-[#fbbf24] italic tracking-tight block">KES 20,000,000</span>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">COMPREHENSIVE BOND</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Every transport is protected by custom logistics cargo variables safeguarding vehicle payloads.
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-none space-y-3">
            <span className="text-3xl font-black text-[#fbbf24] italic tracking-tight block">30+ HEAVY CARRIERS</span>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">DIVERSIFIED FLEET</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              From compact wheel-lifts to 40-ton cranes and warehouse forklifts, we handle all weight ratios.
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-none space-y-3">
            <span className="text-3xl font-black text-[#fbbf24] italic tracking-tight block">LIVE GPS HUD</span>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider font-sans">REAL-TIME TRAFFIC</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Eliminate critical guesswork. High-frequency tracking shows exact dispatcher GPS telemetry.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
