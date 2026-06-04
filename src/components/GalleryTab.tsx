/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, ChevronRight, ChevronLeft, Maximize2, ShieldAlert, CheckCircle2, Info, ArrowRight, Eye } from 'lucide-react';

export default function GalleryTab() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 'slide-bus',
      image: '/src/assets/images/soloo_orange_bus_1780592084508.png',
      thumbAlt: 'Soloo Orange Recovery Bus',
      badge: 'Heavy Crane Lift Support',
      title: 'WE PROVIDE HIGHEST QUALITY CRANE LIFTING & BUS RECOVERY',
      subtext: 'Fast, courteous and highly efficient crane and plant movement services in Kenya.',
      spec: 'Rigged for 360-degree swamp/ditch pulls and mass-transit recovery loops.'
    },
    {
      id: 'slide-fleet',
      image: '/src/assets/images/soloo_recovery_fleet_1780592101760.png',
      thumbAlt: 'Soloo Active Fleet Yard',
      badge: 'Soloo Standby Yard & Patrols',
      title: '24/7 NATIONWIDE CO-ORDINATIVE FLEET ON STANDBY',
      subtext: 'Modern yellow wreckers, sliding flatbed loaders, and high-capacity rotator rigging rigs.',
      spec: 'Central station on Mombasa Road (Cabanas) with patrol nodes stretching across all major bypasses.'
    },
    {
      id: 'slide-tractor',
      image: '/src/assets/images/soloo_tractor_carrier_1780592118988.png',
      thumbAlt: 'Tractors transported on Lowbed Trailer',
      badge: 'Multi-Axle Heavy Haul',
      title: 'WE PROVIDE HIGHEST QUALITY TOWING & ESCORT TRANSPORTATION',
      subtext: 'Safe cargo delivery of agricultural machinery, multi-ton transformers and oversized structures.',
      spec: 'Tfitted with military-grade securement chains and comprehensive 20M liability insurance.'
    },
    {
      id: 'slide-forklift',
      image: '/src/assets/images/soloo_hyster_forklift_1780592138839.png',
      thumbAlt: 'Soloo Yellow Hyster Forklift',
      badge: 'Industrial Warehouse Riggers',
      title: 'WE PROVIDE HIGHEST QUALITY FORKLIFT & DEPOT LOGISTICS',
      subtext: 'Toyota & Hyster forklift rentals (2.5 Tons up to 10 Tons capacity) with licensed heavy handlers.',
      spec: 'Available for immediate short/long term hire at highly cost-effective rates.'
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div id="gallery-tab-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 space-y-16 bg-[#1a1a1a]">
      
      {/* Intro Header */}
      <div className="text-left border-b border-white/10 pb-6 max-w-4xl">
        <span className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.25em] block">
          SUPERIOR CLARITY • VERIFIED GALLERY
        </span>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mt-2 leading-none">
          Active Fleet &amp; <br />
          <span className="text-[#fbbf24]">Operational Photography</span>
        </h1>
        <p className="text-[#e4e4e7] text-xs md:text-sm mt-3 max-w-2xl leading-relaxed font-semibold">
          Explore real-life, ultra high-resolution photos of Soloo Trucks Recovery fleets operating on-site. These photos represent our active tow trucks, heavy rotator cranes, and transport machinery.
        </p>
      </div>

      {/* Main Interactive Slideshow Banner (Matches Screencaps layout) */}
      <div className="relative border-4 border-white/15 bg-black overflow-hidden group select-none">
        
        {/* Dynamic Image Canvas */}
        <div className="relative aspect-[16/9] w-full min-h-[300px] md:min-h-[500px] max-h-[650px] transition-all duration-500">
          <img
            src={galleryItems[activeSlide].image}
            alt={galleryItems[activeSlide].thumbAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />
        </div>

        {/* Content Overlay styled for EXTREME CLARITY */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 text-left space-y-3 sm:space-y-4">
          <span className="bg-[#fbbf24] text-black font-black text-[9px] uppercase px-3 py-1 tracking-widest font-mono">
            {galleryItems[activeSlide].badge}
          </span>
          
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {galleryItems[activeSlide].title}
          </h2>

          <p className="text-[#f4f4f5] text-xs sm:text-sm md:text-base max-w-3xl font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {galleryItems[activeSlide].subtext}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/20">
            <span className="text-xs text-[#fbbf24] font-black uppercase font-mono tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{galleryItems[activeSlide].spec}</span>
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setFullscreenImage(galleryItems[activeSlide].image)}
                className="bg-white/10 hover:bg-white text-white hover:text-black transition-all p-2 rounded-none border border-white/15 cursor-pointer flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5"
                title="View Full Size High Resolution Image"
              >
                <Maximize2 className="w-3.5 h-3.5" /> High Clarity Zoom
              </button>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 bg-black/60 text-white hover:text-[#fbbf24] p-3 text-lg border border-white/10 transition-all rounded-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 bg-black/60 text-white hover:text-[#fbbf24] p-3 text-lg border border-white/10 transition-all rounded-none"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Bullet Progress */}
        <div className="absolute right-4 top-4 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1 flex items-center gap-3">
          <span className="text-xs text-[#fbbf24] font-mono font-black">
            {(activeSlide + 1).toString().padStart(2, '0')} / {galleryItems.length.toString().padStart(2, '0')}
          </span>
          <div className="flex gap-1">
            {galleryItems.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 transition-all ${
                  idx === activeSlide ? 'bg-[#fbbf24] w-3' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid view showing thumbnail selection items with clear statistics */}
      <div className="space-y-6 text-left">
        <h3 className="text-xs font-black uppercase text-[#fbbf24] tracking-widest pb-3 border-b border-white/10 flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#fbbf24]" /> Select Image Focus Unit
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveSlide(idx)}
              className={`text-left bg-[#151515] hover:bg-[#202020] border-2 transition-all p-3 rounded-none relative group flex flex-col justify-between ${
                activeSlide === idx ? 'border-[#fbbf24] scale-[1.01]' : 'border-white/10'
              }`}
            >
              <div className="space-y-3">
                <div className="aspect-[4/3] w-full overflow-hidden relative border border-white/5">
                  <img
                    src={item.image}
                    alt={item.thumbAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {activeSlide === idx && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center border border-[#fbbf24]">
                      <span className="bg-[#fbbf24] text-black font-black text-[9px] uppercase px-2.5 py-1 tracking-wider">
                        ACTIVE IN BANNER
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-[#fbbf24] font-black uppercase tracking-wider font-mono">
                    Slide 0{idx + 1} • {item.badge}
                  </span>
                  <h4 className="font-extrabold text-white text-xs uppercase tracking-tight leading-tight line-clamp-1 group-hover:text-[#fbbf24] transition-colors">
                    {item.thumbAlt}
                  </h4>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#fbbf24]">
                <span>VIEW SPEC DETAILS</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#fbbf24]" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Safety & Operational Guarantee Banner */}
      <div className="bg-[#fbbf24] p-6 text-black border border-black/15 text-left grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-2">
          <div className="inline-flex items-center gap-2 bg-black text-[#fbbf24] font-black text-[9px] uppercase px-3 py-1 tracking-widest font-mono">
            ● GUARATEED CARGO SAFETY
          </div>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-neutral-950">
            Professional fleet safety standards that guarantee no-stress transits
          </h3>
          <p className="text-sm text-neutral-900 font-bold leading-relaxed max-w-4xl">
            Soloo Trucks Recovery operators follow strict securement standards. Every mechanical lift, excavator haul, and bus rigging action is coordinated under licensed site riggers to prevent secondary impacts.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3 lg:justify-end">
          <a
            href="tel:0722154729"
            className="bg-black hover:bg-neutral-900 text-white font-black text-xs uppercase tracking-widest py-4 px-6 text-center transition-colors rounded-none whitespace-nowrap"
          >
            Call Duty Riggers
          </a>
        </div>
      </div>

      {/* Fullscreen Modal Slider Overlay */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center p-4 cursor-pointer"
        >
          <div className="absolute top-4 right-4 text-white hover:text-[#fbbf24] font-black uppercase tracking-wider text-xs">
            [ Click anywhere to close ]
          </div>
          <img
            src={fullscreenImage}
            alt="Fullscreen zoom view"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[85vh] object-contain border border-white/20 shadow-2xl"
          />
          <div className="mt-4 p-4 text-center text-xs text-[#e4e4e7] max-w-2xl bg-black/50 border border-white/10 font-black uppercase tracking-widest">
            SOLOO TRUCKS RECOVERY • OPERATIONAL HIGH-RESOLUTION EVIDENCE ARCHIVE
          </div>
        </div>
      )}

    </div>
  );
}
