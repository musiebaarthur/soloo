/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, ChevronRight, ChevronLeft, Maximize2, Info, Eye } from 'lucide-react';

import tractorCarrier from '../assets/images/soloo_tractor_carrier_1780592118988.png';
import hysterForklift from '../assets/images/soloo_hyster_forklift_1780592138839.png';

export default function GalleryTab() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 'slide-tractor',
      image: tractorCarrier,
      thumbAlt: 'Tractors transported on Lowbed Trailer',
      badge: 'Multi-Axle Heavy Haul',
      title: 'TOWING & ESCORT TRANSPORTATION',
      subtext: 'Safe cargo delivery of agricultural machinery, multi-ton generators and oversized structures.',
      spec: 'Fitted with robust securement chains and full regional transit clearances.'
    },
    {
      id: 'slide-forklift',
      image: hysterForklift,
      thumbAlt: 'Soloo Yellow Hyster Forklift',
      badge: 'Industrial Depot Riggers',
      title: 'FORKLIFT & MATERIAL HANDLING',
      subtext: 'High-mast warehouse lift rentals (2.5 to 10 Tons capacity) with professional certified handlers.',
      spec: 'Available for immediate delivery at highly competitive rates.'
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div id="gallery-tab-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 space-y-16 bg-[#1a1a1a] font-sans">
      
      {/* Intro Header - Yellow Background with Black Font for extreme compliance! */}
      <div className="text-left pb-6">
        <div className="inline-block bg-[#fbbf24] text-black px-6 py-5 border-4 border-black select-none max-w-4xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-1">
            SUPERIOR CLARITY • VERIFIED GALLERY
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none m-0">
            Active Fleet &amp; <br />
            Operational Photography
          </h1>
        </div>
        <p className="text-[#f4f4f5] text-xs md:text-sm mt-6 max-w-2xl leading-relaxed font-semibold">
          Explore real-life, ultra high-resolution photos of Soloo Trucks Recovery fleets operating on-site across Kenya, Uganda, and Tanzania. These photos represent our active tow trucks, heavy rotator cranes, and transport machinery.
        </p>
      </div>

      {/* Main Interactive Slideshow Banner - Styled with White Border and high-clarity background */}
      <div className="relative border-4 border-white bg-white overflow-hidden group select-none shadow-2xl">
        
        {/* Dynamic Image Canvas */}
        <div className="relative aspect-[16/9] w-full min-h-[300px] md:min-h-[500px] max-h-[650px] transition-all duration-500 bg-white">
          <img
            src={galleryItems[activeSlide].image}
            alt={galleryItems[activeSlide].thumbAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-100 transition-transform duration-700 hover:scale-102"
          />
          {/* Subtle gradient overlay to keep text highly legible while keeping full image opacity */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />
        </div>

        {/* Content Overlay styled for EXTREME CLARITY */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 text-left space-y-3 sm:space-y-4">
          <span className="bg-[#fbbf24] text-black font-black text-[9px] uppercase px-3 py-1 tracking-widest font-mono">
            {galleryItems[activeSlide].badge}
          </span>
          
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {galleryItems[activeSlide].title}
          </h2>

          <p className="text-zinc-200 text-xs sm:text-sm md:text-base max-w-3xl font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
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
                className="bg-[#fbbf24] hover:bg-white text-black font-black transition-all p-2 rounded-none border-2 border-black cursor-pointer flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-4 py-2"
                title="View Full Size High Resolution Image"
              >
                <Eye className="w-4 h-4" /> Zoom Image
              </button>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 bg-black text-[#fbbf24] hover:bg-[#fbbf24] hover:text-black p-3 border-2 border-black transition-all rounded-none cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 bg-black text-[#fbbf24] hover:bg-[#fbbf24] hover:text-black p-3 border-2 border-black transition-all rounded-none cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Bullet Progress */}
        <div className="absolute right-4 top-4 bg-black border-2 border-[#fbbf24] px-3 py-1 flex items-center gap-3">
          <span className="text-xs text-[#fbbf24] font-mono font-black">
            {(activeSlide + 1).toString().padStart(2, '0')} / {galleryItems.length.toString().padStart(2, '0')}
          </span>
          <div className="flex gap-1">
            {galleryItems.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 transition-all ${
                  idx === activeSlide ? 'bg-[#fbbf24] w-3' : 'bg-white/40'
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
              className={`text-left bg-black hover:bg-neutral-900 border-2 transition-all p-3 rounded-none relative group flex flex-col justify-between ${
                activeSlide === idx ? 'border-[#fbbf24] scale-[1.01]' : 'border-white/10'
              }`}
            >
              <div className="space-y-3">
                <div className="aspect-[4/3] w-full overflow-hidden relative border-2 border-white bg-white">
                  <img
                    src={item.image}
                    alt={item.thumbAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {activeSlide === idx && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center border-2 border-[#fbbf24]">
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

              <div className="mt-4 pt-3.5 border-t border-white/15 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#fbbf24]">
                <span>VIEW SPEC DETAILS</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#fbbf24]" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Safety & Operational Guarantee Banner */}
      <div className="bg-[#fbbf24] p-6 text-black border-4 border-black text-left grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
        <div className="lg:col-span-8 space-y-2">
          <div className="inline-flex items-center gap-2 bg-black text-[#fbbf24] font-black text-[9px] uppercase px-3 py-1 tracking-widest font-mono">
            ● GUARANTEED CARGO SAFETY
          </div>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-neutral-950">
            Professional fleet safety standards that guarantee no-stress transits
          </h3>
          <p className="text-sm text-neutral-900 font-bold leading-relaxed max-w-4xl">
            Soloo Trucks Recovery operators follow strict securement standards. Every mechanical lift, excavator haul, and bus rigging action is coordinated under licensed site riggers across our East African network to prevent secondary impacts.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3 lg:justify-end">
          <a
            href="tel:0722154729"
            className="bg-[#fbbf24] hover:bg-white text-black font-black text-xs uppercase tracking-widest py-4 px-6 text-center transition-colors border-2 border-black rounded-none whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
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
          <div className="absolute top-4 right-4 text-[#fbbf24] bg-black border-2 border-[#fbbf24] px-4 py-2 font-black uppercase tracking-wider text-xs">
            [ Click anywhere to close ]
          </div>
          <img
            src={fullscreenImage}
            alt="Fullscreen zoom view"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[85vh] object-contain border-4 border-white shadow-2xl bg-white"
          />
          <div className="mt-4 p-4 text-center text-xs text-black bg-[#fbbf24] font-black uppercase tracking-widest border-2 border-black">
            SOLOO TRUCKS RECOVERY • OPERATIONAL HIGH-RESOLUTION EVIDENCE ARCHIVE
          </div>
        </div>
      )}

    </div>
  );
}
