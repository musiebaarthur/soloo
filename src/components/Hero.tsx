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

import recoveryFleet from '../assets/images/soloo_recovery_fleet_1780592101760.png';
import tractorCarrier from '../assets/images/soloo_tractor_carrier_1780592118988.png';
import hysterForklift from '../assets/images/soloo_hyster_forklift_1780592138839.png';

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

            <p className="text-base sm:text-lg text-[#f4f4f5] font-extrabold max-w-xl leading-relaxed drop-shadow-md">
              Specialized roadside assistance, pivot rotator cranes, and forklift services. Real-time fleet tracking ensures we reach you in minutes, not hours. Operating 24/7 across Kenya, Uganda, and Tanzania.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="btn-hero-book"
                onClick={() => onSelectTab('track-book')}
                className="bg-[#fbbf24] hover:bg-white text-black font-black uppercase py-4 px-6 text-xs tracking-widest transition-colors border-2 border-black rounded-none flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                Order Direct Dispatch Now <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="btn-hero-services"
                onClick={() => onSelectTab('services')}
                className="bg-[#fbbf24] hover:bg-white text-black font-black uppercase py-4 px-6 text-xs tracking-widest transition-colors border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
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
                  placeholder="e.g. Kondele, Kisumu or Malaba Border" 
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
              className="w-full bg-[#fbbf24] hover:bg-white text-black font-black uppercase py-3.5 text-xs tracking-widest transition-colors border-2 border-black rounded-none flex items-center justify-center gap-1.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
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
              <p className="text-[11px] text-[#cbd5e1] font-bold leading-normal">Instant coordination for emergency highway and off-road vehicles rescue.</p>
            </div>
            
            <div className="p-6 border-b border-white/10 flex flex-col justify-center space-y-3">
              <div className="text-[#fbbf24] text-3xl font-black italic">02</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">Heavy Crane</h4>
              <p className="text-[11px] text-[#cbd5e1] font-bold leading-normal">Pivoting rotator rigs capable of pulling trucks from ditch salvages.</p>
            </div>
            
            <div className="p-6 border-b lg:border-b-0 border-r border-white/10 flex flex-col justify-center space-y-3">
              <div className="text-[#fbbf24] text-3xl font-black italic">03</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">Forklift Service</h4>
              <p className="text-[11px] text-[#cbd5e1] font-bold leading-normal">Precision warehouse and heavy port generator lifting arrays instantly.</p>
            </div>
            
            <div className="p-6 border-b lg:border-b-0 border-white/10 flex flex-col justify-center space-y-3">
              <div className="text-[#fbbf24] text-3xl font-black italic">04</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">GPS Mapping</h4>
              <p className="text-[11px] text-[#cbd5e1] font-bold leading-normal">Dynamic tracking maps to oversee response team routing and speeds.</p>
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
          
          <div className="p-5 bg-[#151515] border border-white/10 rounded-none space-y-3">
            <span className="text-3xl font-black text-[#fbbf24] italic tracking-tight block">24 / 7 / 365</span>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider animate-pulse">ALWAYS ON WATCH</h4>
            <p className="text-zinc-200 text-xs font-bold leading-relaxed">
              Our live operators and standby heavy riggers remain operational through late-night conditions.
            </p>
          </div>

          <div className="p-5 bg-[#fbbf24] border-2 border-[#fbbf24] rounded-none space-y-3 text-black">
            <span className="text-3xl font-black italic tracking-tight block">EAST AFRICA</span>
            <h4 className="font-extrabold text-zinc-950 text-xs uppercase tracking-wider font-sans text-left">KENYA • UGANDA • TANZANIA</h4>
            <p className="text-neutral-900 text-xs font-bold leading-relaxed text-left">
              Broad network dispatch extending across borders with unified fleet standby nodes across EA corridors.
            </p>
          </div>

          <div className="p-5 bg-[#151515] border border-white/10 rounded-none space-y-3">
            <span className="text-3xl font-black text-[#fbbf24] italic tracking-tight block">30+ HEAVY CARRIERS</span>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider font-sans">DIVERSIFIED FLEET</h4>
            <p className="text-zinc-200 text-xs font-bold leading-relaxed">
              From compact wheel-lifts to 40-ton cranes and warehouse forklifts, we handle all weight ratios.
            </p>
          </div>

          <div className="p-5 bg-[#151515] border border-white/10 rounded-none space-y-3">
            <span className="text-3xl font-black text-[#fbbf24] italic tracking-tight block">LIVE GPS HUD</span>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider font-sans">REAL-TIME TRAFFIC</h4>
            <p className="text-zinc-200 text-xs font-bold leading-relaxed">
              Eliminate critical guesswork. High-frequency tracking shows exact dispatcher GPS telemetry.
            </p>
          </div>

        </div>
      </section>

      {/* NEW PROMINENT INTERACTIVE PHOTO GALLERY SHOWCASE UNIT (Requested active photos!) */}
      <section className="bg-[#111111] py-16 px-6 sm:px-10 lg:px-16 border-b border-white/10 text-left">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.25em] block">
                SPECIALIZED HIGHWAY DEPLOYMENT PHOTOS
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-white leading-none mt-1">
                Active Fleet &amp; Recovery Projects
              </h3>
            </div>
            <button
              onClick={() => onSelectTab('gallery')}
              className="bg-[#fbbf24] hover:bg-white text-black font-black uppercase pr-4 pl-5 py-3 text-xs tracking-widest flex items-center gap-2 group self-start sm:self-center shrink-0 cursor-pointer transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
              <span>Explore High Clarity Gallery</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 (Active Wreckers) */}
            <div 
              onClick={() => onSelectTab('gallery')}
              className="bg-[#1a1a1a] border-2 border-[#fbbf24] hover:bg-neutral-900 transition-all p-4 rounded-none flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="aspect-[16/9] w-full overflow-hidden relative border-2 border-white bg-white">
                  <img 
                    src={recoveryFleet}
                    alt="Soloo Recovery Fleet"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-black text-[#fbbf24] font-black text-[8px] uppercase tracking-wider px-2 py-0.5">
                    Dispatch Depot
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-[#fbbf24] text-xs uppercase tracking-tight group-hover:text-white transition-colors">
                    Central Standard Wrecker Depot
                  </h4>
                  <p className="text-[11px] text-[#cbd5e1] font-bold leading-relaxed line-clamp-3">
                    Our Kisumu Kondele headquarters hosting heavy rotator cranes, active flatbeds and emergency support cars.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-white/5 text-[10px] text-[#fbbf24] font-black uppercase tracking-widest flex items-center gap-1.5 justify-end">
                <span>ZOOM IMAGE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#fbbf24]" />
              </div>
            </div>

            {/* Box 2 (Tractors Transport) */}
            <div 
              onClick={() => onSelectTab('gallery')}
              className="bg-[#1a1a1a] border-2 border-[#fbbf24] hover:bg-neutral-900 transition-all p-4 rounded-none flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="aspect-[16/9] w-full overflow-hidden relative border-2 border-white bg-white">
                  <img 
                    src={tractorCarrier}
                    alt="Tractor Carry on Trailer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-black text-[#fbbf24] font-black text-[8px] uppercase tracking-wider px-2 py-0.5">
                    Heavy Haul Cargo
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-[#fbbf24] text-xs uppercase tracking-tight group-hover:text-white transition-colors">
                    Tractors &amp; Plant Transportation
                  </h4>
                  <p className="text-[11px] text-[#cbd5e1] font-bold leading-relaxed line-clamp-3">
                    Multi-axle low loader trailers carrying heavy agricultural and industrial apparatus on regional paths.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-white/5 text-[10px] text-[#fbbf24] font-black uppercase tracking-widest flex items-center gap-1.5 justify-end">
                <span>ZOOM IMAGE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#fbbf24]" />
              </div>
            </div>

            {/* Box 3 (Yellow Forklift) */}
            <div 
              onClick={() => onSelectTab('gallery')}
              className="bg-[#1a1a1a] border-2 border-[#fbbf24] hover:bg-neutral-900 transition-all p-4 rounded-none flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="aspect-[16/9] w-full overflow-hidden relative border-2 border-white bg-white">
                  <img 
                    src={hysterForklift}
                    alt="Yellow Forklift"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-350 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-black text-[#fbbf24] font-black text-[8px] uppercase tracking-wider px-2 py-0.5">
                    Warehouse Lift
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-[#fbbf24] text-xs uppercase tracking-tight group-hover:text-white transition-colors">
                    Hyster Industrial Forklift Lease
                  </h4>
                  <p className="text-[11px] text-[#cbd5e1] font-bold leading-relaxed line-clamp-3">
                    High mast container lifts, pallet positioning and shipyard cargo handling machinery of all weights.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-white/5 text-[10px] text-[#fbbf24] font-black uppercase tracking-widest flex items-center gap-1.5 justify-end">
                <span>ZOOM IMAGE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#fbbf24]" />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
