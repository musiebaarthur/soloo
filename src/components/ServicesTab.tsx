/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Truck, Cpu, Coins, ShieldCheck, Scale, AlertTriangle, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { TabType } from '../types';

interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  tagline: string;
  icon: React.ReactNode;
  basePrice: number;
  perKmPrice: number;
  specs: { label: string; value: string }[];
  details: string[];
  equipment: string[];
  bestFor: string[];
}

interface ServicesTabProps {
  onSelectTab: (tab: TabType) => void;
  onPreselectService: (serviceId: string) => void;
}

export default function ServicesTab({ onSelectTab, onPreselectService }: ServicesTabProps) {
  const [activeAccordion, setActiveAccordion] = useState<string>('light-tow');
  
  // Cost Calculator States
  const [calcService, setCalcService] = useState<string>('light-tow');
  const [calcDistance, setCalcDistance] = useState<number>(15);
  const [calcNightTime, setCalcNightTime] = useState<boolean>(false);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const servicesList: ServiceDetail[] = [
    {
      id: 'light-tow',
      title: '24/7 Fleet Towing & Flatbeds',
      category: 'Standard Recovery',
      tagline: 'Reliable flatbed tow trucks for standard light and medium cargo.',
      icon: <Truck className="w-5 h-5 text-[#fbbf24]" />,
      basePrice: 5000,
      perKmPrice: 150,
      specs: [
        { label: 'Max Capacity', value: '4.5 Tons' },
        { label: 'Average Dispatch', value: '15 - 25 Minutes' },
        { label: 'Available Units', value: '14 Active Flatbeds' },
        { label: 'Operating Areas', value: 'Nairobi & Suburbs, Highways' }
      ],
      details: [
        'Hydraulic tilt-tray flatbeds optimized for low-clearance sports cars and luxury models.',
        'Zero-contact wheel lifts ideal for short-distance repossession and urban parking rescue.',
        'Fully chain-strapped tire securement to prevent suspension alignment damage.',
        'Real-time automated status updates with GPS driver tracking systems.'
      ],
      equipment: ['Isuzu FSR Flatbeds', 'Hydraulic Wheel-Lifts', 'Soft Alloy Rim Straps', 'Heavy Recovery Snatch Blocks'],
      bestFor: ['Sedans & Coupes', 'SUVs & Compact Crossovers', 'Electric Vehicles (EVs)', 'Motorcycles & ATVs']
    },
    {
      id: 'heavy-crane',
      title: 'Heavy-Duty Cranes & Rigging',
      category: 'Extreme Recovery',
      tagline: 'Gigantic diesel cranes built to recover heavy trucks, buses, and rigs.',
      icon: <Scale className="w-5 h-5 text-[#fbbf24]" />,
      basePrice: 15000,
      perKmPrice: 350,
      specs: [
        { label: 'Lifting Force', value: 'Up to 40 Tons' },
        { label: 'Boom Reach', value: '18 Meters Lateral' },
        { label: 'Rigging Standard', value: 'BS EN ISO 9001 Certified' },
        { label: 'Air-Cushion Units', value: '2 High-Pressure Sets' }
      ],
      details: [
        'Rotator cranes capable of 360-degree pivoting for deep ditch recoveries and highway pile-ups.',
        'High-pressure pneumatic air bags to upright loaded trailers without cargo offloading.',
        'Specialist dual-winching lines to hoist heavy buses and prime movers back onto pavement safely.',
        'Overturned multi-axel recovery operations coordinated by senior rigging engineers.'
      ],
      equipment: ['40-Ton Rotator Cranes', 'Heavy Underlift Wreckers', 'Pneumatic Air-Cushion Lifting Jacks', 'Grade-100 Alloy Steel Hooks'],
      bestFor: ['Prime Movers & Semi-Trailers', 'Industrial Cargo Transporters', 'Commercial Buses & Coaches', 'Earthmovers & Construction Machinery']
    },
    {
      id: 'forklift',
      title: 'Industrial Forklift Handling',
      category: 'Specialized Lifters',
      tagline: 'Heavy load container forklifts and warehouse movers available for immediate lease.',
      icon: <Cpu className="w-5 h-5 text-[#fbbf24]" />,
      basePrice: 8000,
      perKmPrice: 200,
      specs: [
        { label: 'Lifting Weight', value: '2.5 Tons - 10 Tons' },
        { label: 'Fuel Drives', value: 'Diesel & Electric Options' },
        { label: 'Power Source', value: 'Heavy Pneumatic Tyres' },
        { label: 'Special Attachments', value: 'Drum Clamps, Extension Jibs' }
      ],
      details: [
        'High mast clearance for warehouse vertical stacking and heavy machinery positioning.',
        'Skilled licensed operators with deep industrial safety rigging certifications.',
        'Robust mud-terrain forklift variants suitable for loose-gravel construction jobs and heavy yards.',
        'Same-day transportation flatbeds to deliver forklifts to your project site on short notice.'
      ],
      equipment: ['Toyota 8-Series Forklifts', 'CAT Heavy Rough-Terrain Forklifts', 'Custom Spreader Bars', 'Padded Drum Grab Clamps'],
      bestFor: ['Palletized Container Cargo', 'Heavy Generator Ingress/Egress', 'Factory Machinery Offloading', 'Steel Beam Rigging & Hoisting']
    },
    {
      id: 'roadside',
      title: 'Specialized Roadside Assist',
      category: 'Rapid Patrol',
      tagline: 'Quick-response mobile units dispatched to patch tires, supply fuel, or jump batteries.',
      icon: <ShieldCheck className="w-5 h-5 text-[#fbbf24]" />,
      basePrice: 3000,
      perKmPrice: 100,
      specs: [
        { label: 'Est. Arrival', value: '10 - 20 Minutes' },
        { label: 'Mobile Fleet', value: '8 Standby Patrol Cars' },
        { label: 'Warranty On Jump', value: '7-Day Battery Assist Peace' },
        { label: 'Tool Outfits', value: '18V Cordless Impact Wrenches' }
      ],
      details: [
        'Professional heavy jumpstarts using smart anti-surge battery boosters to safeguard electric modules.',
        'Rapid roadside spare swapping with heavy-duty pneumatic impact impact jackhammers.',
        'Emergency clean diesel or petrol deliveries (up to 20 Litres) when ran empty on remote freeways.',
        'On-the-spot OBD-II vehicle computerized diagnostics to trace fuel-pump or engine-sensor glitches.'
      ],
      equipment: ['High-Output Anti-Surge Boostpack', '12-Volt Specialized Fuel Pumps', 'Pneumatic Trolley Lift Jacks', 'Diagnostic OBD-II Scanners'],
      bestFor: ['Dead Battery Jumpstart', 'Puncture Repair & Spare Swap', 'Fuel Empty Emergency Tanking', 'Blown Fuses & Small Sensor Tracing']
    }
  ];

  // Calculator Logic
  const getSelectedServiceDetails = () => servicesList.find((s) => s.id === calcService) || servicesList[0];
  
  const calculateTotalCost = () => {
    const s = getSelectedServiceDetails();
    let total = s.basePrice + (calcDistance * s.perKmPrice);
    if (calcNightTime) {
      total += 2500; // Night-time premium surcharge
    }
    return total;
  };

  const handleBookSelected = (serviceId: string) => {
    onPreselectService(serviceId);
    onSelectTab('track-book');
  };

  return (
    <div id="services-page-container" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-16 bg-[#1a1a1a]">
      
      {/* Intro Header */}
      <div className="text-left space-y-3 max-w-4xl border-b border-white/10 pb-6">
        <span className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.25em] block">
          HEAVY FLEET &amp; RIGGING CAPABILITIES
        </span>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
          Comprehensive Heavy <br />
          <span className="text-[#fbbf24]">Recovery &amp; Dispatches</span>
        </h1>
        <p className="text-gray-400 text-xs md:text-sm max-w-2xl leading-relaxed">
          From compact motorbikes to 40-ton prime movers and industrial warehouse cargo, Soloo Recovery maintains heavy-lifting crane systems, versatile forklift fleets, and rapid-response flatbeds.
        </p>
      </div>

      {/* Services deep dive - Accordion View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
        
        {/* Accordions Left Sidebar (5 cols) */}
        <div id="services-selector-sidebar" className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
          <div>
            <div className="p-6 bg-white/5 border-b border-white/10">
              <h2 className="text-xs uppercase tracking-widest font-black text-[#fbbf24]">
                Select Target Fleet Line
              </h2>
            </div>
            
            <div className="divide-y divide-white/10">
              {servicesList.map((item) => {
                const isActive = activeAccordion === item.id;
                return (
                  <button
                    key={item.id}
                    id={`srv-btn-${item.id}`}
                    onClick={() => setActiveAccordion(item.id)}
                    className={`w-full text-left p-5 transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#fbbf24] text-black font-bold'
                        : 'bg-transparent text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-none shrink-0 ${isActive ? 'bg-black text-[#fbbf24]' : 'bg-white/5 text-white'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <span className={`text-[9px] uppercase tracking-wider block font-bold leading-none mb-1 ${isActive ? 'text-black/60' : 'text-[#fbbf24]'}`}>
                          {item.category}
                        </span>
                        <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-tight">{item.title}</h3>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180 text-black' : 'text-gray-500'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Notice Alert */}
          <div className="p-6 bg-white/5 border-t border-white/10 flex gap-3 text-left">
            <AlertTriangle className="w-5 h-5 text-[#fbbf24] shrink-0 mt-0.5" />
            <div className="text-[11px] space-y-1">
              <h4 className="font-black uppercase text-[#fbbf24] tracking-wider">Nationwide Strategic Coverage</h4>
              <p className="text-gray-400 leading-relaxed">
                If stranded outside Nairobi limits, our highway-standby network will be routed to your coordinates. High-grade industrial contracts are fully insured up to KES 20,000,000 load liability.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Expanded View Content Right (7 cols) */}
        <div id="service-details-pane" className="lg:col-span-7 bg-transparent p-6 md:p-8 space-y-8 flex flex-col justify-between text-left">
          {(() => {
            const current = servicesList.find((s) => s.id === activeAccordion)!;
            return (
              <>
                {/* Header Title */}
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div className="space-y-1">
                      <span className="text-[9px] bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-[#fbbf24] font-black uppercase px-2 py-0.5 tracking-widest">
                        {current.category}
                      </span>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-1">{current.title}</h3>
                      <p className="text-xs text-gray-400 font-medium italic">{current.tagline}</p>
                    </div>
                    
                    {/* Pricing Overview Tag */}
                    <div className="bg-[#151515] px-4 py-3 rounded-none border border-white/10 shrink-0 select-none">
                      <span className="text-[9px] uppercase text-gray-400 block font-black tracking-wider leading-none mb-1">Base Dispatch Rate</span>
                      <span className="text-lg font-black text-[#fbbf24] tracking-tight">KES {current.basePrice.toLocaleString()}</span>
                      <span className="text-[9px] text-gray-500 block font-bold mt-0.5 tracking-wider">+ KES {current.perKmPrice}/KM</span>
                    </div>
                  </div>

                  {/* Grid Technical Specifications */}
                  <div className="grid grid-cols-2 gap-3">
                    {current.specs.map((s, idx) => (
                      <div key={idx} className="bg-white/5 p-3 rounded-none border border-white/10">
                        <span className="text-[9px] uppercase text-gray-500 block font-black tracking-wider mb-0.5">{s.label}</span>
                        <span className="text-xs font-black text-white">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Rich Description List */}
                  <div className="space-y-3 pt-3">
                    <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> STRENGTHS &amp; RIG OPERATIONS
                    </h4>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-300 leading-relaxed">
                      {current.details.map((d, idx) => (
                        <li key={idx} className="bg-[#151515] border border-white/5 p-3 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#fbbf24] shrink-0 mt-1.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Equipments and Best For Badges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Equipment Handlers</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {current.equipment.map((eq, i) => (
                        <span key={i} className="text-[10px] bg-[#151515] text-gray-300 font-bold border border-white/15 px-2.5 py-1">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Optimized Best Suited For</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {current.bestFor.map((bf, i) => (
                        <span key={i} className="text-[10px] bg-[#fbbf24]/10 text-[#fbbf24] font-bold border border-[#fbbf24]/25 px-2.5 py-1">
                          {bf}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="bg-white/5 border border-white/10 p-5 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs space-y-1">
                    <p className="font-extrabold text-[#fbbf24] uppercase tracking-wider">Need this exact service dispatched?</p>
                    <p className="text-gray-400">Our live dispatchers link up with driver personnel inside 3 minutes.</p>
                  </div>
                  
                  <button
                    id={`btn-book-direct-${current.id}`}
                    onClick={() => handleBookSelected(current.id)}
                    className="bg-[#fbbf24] hover:bg-white text-black font-black uppercase px-6 py-3.5 text-xs tracking-widest transition-colors rounded-none flex items-center justify-center gap-2"
                  >
                    Select &amp; Book Now <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* cost calculator */}
      <div id="service-quote-calculator" className="bg-[#151515] border border-white/10 p-6 md:p-8 space-y-6 text-left">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#fbbf24]/10 rounded-none border border-[#fbbf24]/30">
            <Coins className="w-6 h-6 text-[#fbbf24]" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Dynamic Dispatch Cost Calculator</h2>
            <p className="text-xs text-gray-400">Calculate pre-calculated rates transparently before booking dispatches.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Service Choice */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] block">1. Choose Mobilization Target</label>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {servicesList.map((s) => (
                  <button
                    key={s.id}
                    id={`calc-select-${s.id}`}
                    onClick={() => setCalcService(s.id)}
                    className={`p-3 text-center transition-all flex flex-col items-center justify-center gap-1.5 border ${
                      calcService === s.id
                        ? 'bg-[#fbbf24]/15 border-[#fbbf24] text-[#fbbf24] font-black'
                        : 'bg-black/30 border-white/10 text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-tight line-clamp-1">{s.title.split(' ')[1] || s.title.split(' ')[0]}</span>
                    <span className="text-[9px] text-gray-500 font-mono">KES {s.basePrice} base</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Slider */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs font-black uppercase">
                <label htmlFor="calc-distance-slider" className="text-gray-400 tracking-widest">2. Expected Commute Distances (KMs)</label>
                <span className="text-[#fbbf24] text-base font-black font-mono">{calcDistance} KM</span>
              </div>
              
              <input
                id="calc-distance-slider"
                type="range"
                min="1"
                max="150"
                value={calcDistance}
                onChange={(e) => setCalcDistance(parseInt(e.target.value))}
                className="w-full accent-[#fbbf24] cursor-pointer h-1.5 bg-black rounded-none"
              />
              
              <div className="flex justify-between text-[9px] text-gray-500 font-black uppercase tracking-wider font-mono">
                <span>1 KM (Local pickup)</span>
                <span>50 KM (Regional bound)</span>
                <span>100 KM</span>
                <span>150 KM (Heavy Haul)</span>
              </div>
            </div>

            {/* Night Time Check */}
            <div className="bg-black/40 p-4 border border-white/10 rounded-none flex items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <span className="font-black uppercase tracking-wider text-white block">Night-Shift Operations (20:00 - 06:00)</span>
                <span className="text-gray-500 block">Applies a standard flat KES 2,500 premium due to specialized personnel safety mobilization.</span>
              </div>
              
              <button
                id="calc-night-toggle"
                onClick={() => setCalcNightTime(!calcNightTime)}
                className={`w-14 h-7 shrink-0 transition-colors relative rounded-none ${
                  calcNightTime ? 'bg-[#fbbf24]' : 'bg-white/10'
                }`}
                aria-label="Toggle Night Premium Surcharge"
              >
                <span className={`w-5 h-5 absolute top-1 transition-all rounded-none ${
                  calcNightTime ? 'left-8 bg-black' : 'left-1 bg-white'
                }`} />
              </button>
            </div>
          </div>

          {/* Results Display Output Card (5 cols) */}
          <div className="lg:col-span-5 bg-black/40 border border-white/10 p-6 rounded-none space-y-5">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">Rate Summary</h3>
            
            <div className="space-y-3.5 text-xs font-black uppercase tracking-wider text-gray-400 font-mono">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Base Mobilize ({getSelectedServiceDetails().title.split(' ')[0]})</span>
                <span className="text-white">KES {getSelectedServiceDetails().basePrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Distance ({calcDistance} KM @ {getSelectedServiceDetails().perKmPrice}/KM)</span>
                <span className="text-white font-bold">KES {(calcDistance * getSelectedServiceDetails().perKmPrice).toLocaleString()}</span>
              </div>

              {calcNightTime && (
                <div className="flex justify-between border-b border-white/5 pb-2 text-[#fbbf24]">
                  <span>Night Patrol Premium</span>
                  <span>KES 2,500</span>
                </div>
              )}

              <div className="flex justify-between border-b border-white/5 pb-2 text-emerald-400 tracking-widest text-[9px]">
                <span>Risk Cargo Protection</span>
                <span>INCLUDED FREE</span>
              </div>

              <div className="flex justify-between items-baseline pt-3 text-normal-case text-white leading-none">
                <span className="text-xs font-black uppercase tracking-widest">Total Est. Cost</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#fbbf24] font-mono tracking-tight">KES {calculateTotalCost().toLocaleString()}</span>
                  <span className="text-[9px] text-gray-500 block leading-tight uppercase font-mono tracking-wider mt-1">No hidden deposits</span>
                </div>
              </div>
            </div>

            <button
              id="calc-book-trigger"
              onClick={() => handleBookSelected(calcService)}
              className="w-full bg-[#fbbf24] hover:bg-white text-black font-black uppercase py-4 text-xs tracking-widest transition-colors rounded-none flex items-center justify-center gap-2"
            >
              Order Instant Rescue <ArrowRight className="w-4 h-4 text-black" />
            </button>
            
            <p className="text-[10px] text-gray-500 text-center leading-normal">
              *Estimates based on regional Nairobi highway fuel coordinates index. Final operator logistics are verified by standby handlers before departure.
            </p>
          </div>
        </div>
      </div>

      {/* Collapsible FAQ section to handle queries about pricing & locations */}
      <div id="service-faq-section" className="space-y-8 text-left pt-6">
        <div className="border-b border-white/10 pb-5">
          <span className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.25em] block">
            HAVE QUESTIONS?
          </span>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white mt-1">
            Frequently Asked <span className="text-[#fbbf24]">Queries</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm max-w-2xl mt-1.5 leading-relaxed">
            Quick, reliable answers regarding Soloo Recovery's commercial rates, response times, safety guarantees, and regional fleet dispatch boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Policy info board (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#151515] border border-white/10 p-6 rounded-none space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#fbbf24] border-b border-white/10 pb-2">
                Dispatch Policy Summary
              </h3>
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-white text-xs uppercase">No Hidden Surcharges</h4>
                  <p className="text-gray-400 leading-relaxed font-normal">
                    Our dynamic cost estimator matches solver terminals exactly. Fuel levy fluctuations, carrier tolls, and vehicle strap-downs are fully wrapped into your pre-dispatched estimate quote.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-white text-xs uppercase">Direct Coordinate Tracking</h4>
                  <p className="text-gray-400 leading-relaxed font-normal">
                    Once the Safaricom M-Pesa STK or card authorization matches, your phone number ties into our standby driver's terminal, generating accurate telemetry routes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 flex items-center justify-between gap-4">
              <div className="text-xs">
                <p className="font-extrabold text-white uppercase tracking-wider">Still confused?</p>
                <p className="text-gray-400 mt-0.5 font-normal">Connect to a live rigger instantly via chat or emergency telephone.</p>
              </div>
              <button
                onClick={() => onSelectTab('contact')}
                className="bg-[#fbbf24] hover:bg-white text-black font-black uppercase text-[10px] tracking-wider py-2.5 px-4 transition-colors rounded-none whitespace-nowrap"
              >
                Get In Touch
              </button>
            </div>
          </div>

          {/* Accordion List right side (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            {[
              {
                question: "How are your mobilization and towing fees calculated?",
                answer: "Our pricing consists of a flat Base Dispatch Rate depending on the fleet category (starting at KES 3,000 for roadside patrols and KES 5,000 for standard flatbeds) plus a transparent distance-based kilometer rate. We use official highway route trackers to calculate coordinates accurately. No hidden surcharges apply, and you can calculate precise estimates before booking."
              },
              {
                question: "Do you require an upfront deposit before dispatching an operator?",
                answer: "No, we do not require a mandatory advance deposit for standard emergency highway rescues or towing within Greater Nairobi. Payment can be comfortably settled on arrival or successful delivery via our direct simulated M-Pesa STK system, credit cards, or cash handovers."
              },
              {
                question: "Where are your standby recovery vehicles based, and what areas do you cover?",
                answer: "Our core central yard is situated on Mombasa Road, adjacent to City Cabanas, Nairobi. We also run dedicated standby patrol stations positioned strategically along Waiyaki Way (Kangemi Flyover interchange), Thika Superhighway (Clay Works), and Southern Bypass. This ensures response times remain under 25 minutes inside greater Nairobi. For long-distance heavy recovery, we support nationwide routing across Kenya."
              },
              {
                question: "What happens if my breakdown location is outside Nairobi or off-road?",
                answer: "Soloo's operations encompass active service units mapped specifically for highway transit across Nakuru, Mombasa - Nairobi highway, and Naivasha loops. If you are stuck off-road, our standard heavy flatbeds and 40-ton rotator cranes are fully fitted with pneumatic traction assists to pull stranded cargo back onto paved routes cleanly."
              },
              {
                question: "Does the standard quote cover night patrol operations?",
                answer: "For dispatches scheduled during night-shift operations (between 20:00 and 06:00), we request a flat premium of KES 2,500. This nominal surcharge is automatically generated in our quote calculator and directly supports specialized night logistics equipment and auxiliary rigging personnel safety protocols."
              },
              {
                question: "Are the vehicles and industrial cargo insured during transit?",
                answer: "Absolutely. Soloo Recovery holds comprehensive carrier insurance cover up to KES 20,000,000 in transit liability. Our hydraulic lifting platforms, Grade-100 securement alloy straps, and professional riggers fulfill strict BS EN ISO 9001 certifications so your assets are fully protected."
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  id={`faq-item-${idx}`}
                  className="bg-[#151515] border border-white/10 transition-colors"
                >
                  <button
                    id={`faq-trigger-${idx}`}
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 select-none group focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-mono font-black py-1 px-2 shrink-0 ${
                        isOpen ? 'bg-[#fbbf24] text-black' : 'bg-white/5 text-[#fbbf24]'
                      }`}>
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <h4 className={`text-xs sm:text-sm font-extrabold uppercase tracking-tight transition-colors ${
                        isOpen ? 'text-[#fbbf24]' : 'text-white group-hover:text-[#fbbf24]'
                      }`}>
                        {faq.question}
                      </h4>
                    </div>
                    
                    <span className={`p-1 border text-xs transition-all duration-300 ${
                      isOpen 
                        ? 'border-[#fbbf24] bg-[#fbbf24]/10 text-[#fbbf24] rotate-180' 
                        : 'border-white/10 text-gray-500 hover:text-white'
                    }`}>
                      <ChevronDown className="w-4 h-4 shrink-0 transition-transform" />
                    </span>
                  </button>

                  {/* Animated/Collapsible content body */}
                  <div
                    id={`faq-content-${idx}`}
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-60 border-t border-white/10' : 'max-h-0'
                    }`}
                  >
                    <div className="p-5 text-xs text-gray-400 font-normal leading-relaxed bg-black/20">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
