import React, { useState } from 'react';
import { 
  ArrowRight, Phone, ShieldCheck, Compass, HardHat, Clock, Edit2, X, Eye, EyeOff
} from 'lucide-react';
import { TabType } from '../types';
import { useAdmin } from './AdminContext';

interface HeroProps {
  onSelectTab: (tab: TabType) => void;
}

export default function Hero({ onSelectTab }: HeroProps) {
  const { adminMode, heroContent, setHeroContent, galleryItems } = useAdmin();
  const [pickupText, setPickupText] = useState('');
  const [serviceType, setServiceType] = useState('heavy-tow');

  // Modal editor states for Hero Content
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [badgeText, setBadgeText] = useState(heroContent.badgeText);
  const [titleMain, setTitleMain] = useState(heroContent.titleMain);
  const [titleHighlight, setTitleHighlight] = useState(heroContent.titleHighlight);
  const [titleSuffix, setTitleSuffix] = useState(heroContent.titleSuffix);
  const [description, setDescription] = useState(heroContent.description);

  // Layout presentation overrides (can be toggled off/on by the admin)
  const [hideMetrics, setHideMetrics] = useState(() => {
    return localStorage.getItem('hide_home_metrics') === 'true';
  });
  const [hideShowcase, setHideShowcase] = useState(() => {
    return localStorage.getItem('hide_home_showcase') === 'true';
  });

  const handleShortcutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectTab('contact');
  };

  const handleSaveHeroEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setHeroContent({
      badgeText,
      titleMain,
      titleHighlight,
      titleSuffix,
      description
    });
    setIsEditOpen(false);
  };

  const toggleHideMetrics = () => {
    const next = !hideMetrics;
    setHideMetrics(next);
    localStorage.setItem('hide_home_metrics', String(next));
  };

  const toggleHideShowcase = () => {
    const next = !hideShowcase;
    setHideShowcase(next);
    localStorage.setItem('hide_home_showcase', String(next));
  };

  const activePhotosCount = galleryItems.length;
  const previewItems = galleryItems.slice(0, 3);

  return (
    <div id="home-hero-layout" className="w-full flex flex-col font-sans text-zinc-900 bg-white select-none">
      
      {/* Edge-to-edge Bold Layout Grid split 7/5 */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-zinc-200 relative bg-white">
        
        {/* Admin Section controls indicator */}
        {adminMode && (
          <div className="absolute top-4 right-4 z-20 bg-[#f97316] border border-black text-black px-4 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md">
            <span>Home Page Section Controls</span>
            <button
              onClick={() => setIsEditOpen(true)}
              className="bg-black text-[#f97316] hover:bg-white hover:text-black font-black py-1 px-3 border border-black text-[10px]"
              title="Edit Main Title & Copy text specs"
            >
              Edit Cover Text
            </button>
            <button
              onClick={toggleHideMetrics}
              className="bg-neutral-900 text-white hover:bg-neutral-800 font-bold py-1 px-2 text-[10px] flex items-center gap-1"
            >
              {hideMetrics ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />} 
              {hideMetrics ? 'Show Stats' : 'Hide Stats'}
            </button>
            <button
              onClick={toggleHideShowcase}
              className="bg-neutral-900 text-white hover:bg-neutral-800 font-bold py-1 px-2 text-[10px] flex items-center gap-1"
            >
              {hideShowcase ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />} 
              {hideShowcase ? 'Show Gallery' : 'Hide Gallery'}
            </button>
          </div>
        )}

        {/* Left Side Content & Direct routing triggers (7 columns) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-200 space-y-10">
          
          <div 
            onClick={() => { if (adminMode) setIsEditOpen(true); }}
            className={`space-y-4 relative rounded-none p-3 transition-all ${
              adminMode 
                ? 'border-2 border-solid border-[#f97316] bg-[#f97316]/5 ring-4 ring-[#f97316]/10 cursor-pointer' 
                : ''
            }`}
            title={adminMode ? "Click to edit cover text" : ""}
          >
            {adminMode && (
              <div id="hero-admin-bar" className="absolute -top-3.5 left-4 bg-[#f97316] text-black font-black px-2 py-0.5 text-[9px] uppercase tracking-wider flex items-center gap-1">
                <Edit2 className="w-3 h-3" /> CLICK TO EDIT COVER CONTENT
              </div>
            )}

            <div className="inline-flex items-center gap-2 bg-[#f97316]/15 border border-[#f97316]/30 px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse shrink-0" />
              <span className="text-[#f97316] font-black uppercase tracking-widest text-[9.5px]">
                {heroContent.badgeText}
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black uppercase leading-[1.0] tracking-tighter text-left text-neutral-950 font-sans">
              {heroContent.titleMain}<br />
              <span className="text-[#f97316]">{heroContent.titleHighlight}</span> {heroContent.titleSuffix || 'Unit'}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-700 font-medium max-w-lg leading-relaxed text-left">
              {heroContent.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2 text-left justify-start">
              <button
                id="btn-hero-book"
                onClick={(e) => { e.stopPropagation(); onSelectTab('contact'); }}
                className="bg-[#f97316] hover:bg-neutral-950 hover:text-white text-black font-black uppercase py-3.5 px-6 text-xs tracking-widest transition-colors border-2 border-black rounded-none flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                Order Dispatch <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                id="btn-hero-services"
                onClick={(e) => { e.stopPropagation(); onSelectTab('gallery'); }}
                className="bg-zinc-50 hover:bg-neutral-100 text-zinc-900 hover:text-black font-black uppercase py-3.5 px-6 text-xs tracking-widest transition-colors border-2 border-zinc-300 rounded-none shadow-[3px_3px_0px_0px_rgba(249,115,22,1)] cursor-pointer"
              >
                Browse Fleet
              </button>
            </div>
          </div>

          {/* Quick Booking shortcut Form inside Hero */}
          <form onSubmit={handleShortcutSubmit} className="bg-zinc-50 p-5 rounded-none border border-zinc-200 space-y-4 max-w-xl text-left">
            <h3 className="text-[10px] uppercase tracking-wider font-bold text-[#f97316]">Instant Dispatch Coordinator</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[8.5px] uppercase tracking-widest text-zinc-500 font-bold">Terminal Location</label>
                <input 
                  type="text" 
                  value={pickupText}
                  onChange={(e) => setPickupText(e.target.value)}
                  placeholder="e.g. Kisumu Highway" 
                  required
                  className="bg-white border border-zinc-300 rounded-xs px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-[#f97316] transition-colors"
                />
              </div>
              
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[8.5px] uppercase tracking-widest text-zinc-500 font-bold">Service Required</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="bg-white border border-zinc-300 rounded-xs px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-[#f97316] transition-colors"
                >
                  <option value="heavy-tow">Heavy Duty Crane</option>
                  <option value="light-tow">Flatbed / Towing</option>
                  <option value="forklift">Forklift Rental</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#f97316] hover:bg-neutral-950 hover:text-white text-black font-black uppercase py-2.5 text-[10px] tracking-wider transition-colors border border-black rounded-none flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              Order Immediate Dispatch <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

        {/* Right Side Services Grid (5 columns) */}
        <div className="lg:col-span-5 flex flex-col bg-zinc-50">
          
          {/* Services Grid with white tiles */}
          <div className="flex-1 grid grid-cols-2 bg-zinc-100">
            <div className="p-6 sm:p-8 bg-white border-b border-r border-zinc-200 flex flex-col justify-center space-y-2 text-left">
              <div className="text-[#f97316] text-xl font-black italic">01</div>
              <h4 className="font-extrabold uppercase text-xs tracking-wider text-zinc-950">24/7 Response</h4>
              <p className="text-[10px] text-zinc-650 leading-relaxed font-bold">Instant call response for off-road towing rescues.</p>
            </div>
            
            <div className="p-6 sm:p-8 bg-white border-b border-zinc-200 flex flex-col justify-center space-y-2 text-left">
              <div className="text-[#f97316] text-xl font-black italic">02</div>
              <h4 className="font-extrabold uppercase text-xs tracking-wider text-zinc-950">Heavy Crane</h4>
              <p className="text-[10px] text-zinc-650 leading-relaxed font-bold">Rotator crane rigs pulling trailer loads safely.</p>
            </div>
            
            <div className="p-6 sm:p-8 bg-white border-r border-zinc-200 flex flex-col justify-center space-y-2 text-left">
              <div className="text-[#f97316] text-xl font-black italic">03</div>
              <h4 className="font-extrabold uppercase text-xs tracking-wider text-zinc-950">Forklifts</h4>
              <p className="text-[10px] text-zinc-650 leading-relaxed font-bold">Industrial yard lifters ready for pallet dispatch.</p>
            </div>
            
            <div className="p-6 sm:p-8 bg-white flex flex-col justify-center space-y-2 text-left">
              <div className="text-[#f97316] text-xl font-black italic">04</div>
              <h4 className="font-extrabold uppercase text-xs tracking-wider text-zinc-950">GPS Dispatch</h4>
              <p className="text-[10px] text-zinc-650 leading-relaxed font-bold">Real-time driver location and transit mapping.</p>
            </div>
          </div>

        </div>

      </section>

      {/* Brand Value Metrics Row */}
      {!hideMetrics && (
        <section className="bg-zinc-50 py-10 px-6 sm:px-10 lg:px-16 border-b border-zinc-200 relative text-left">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 bg-white border border-zinc-200 rounded-none space-y-1 shadow-xs">
              <span className="text-xl font-black text-[#f97316] italic tracking-tight">ALWAYS ACTIVE</span>
              <h4 className="font-extrabold text-zinc-900 text-[10px] uppercase tracking-wider">365 Day Standby</h4>
              <p className="text-zinc-600 text-xs font-semibold">24/7 emergency dispatch crews.</p>
            </div>

            <div className="p-5 bg-[#f97316] border border-black rounded-none space-y-1 text-black shadow-xs">
              <span className="text-xl font-black italic tracking-tight text-black">EAST AFRICA</span>
              <h4 className="font-extrabold text-neutral-950 text-[10px] uppercase tracking-wider">Kenya • Uganda • Tz</h4>
              <p className="text-neutral-900 text-xs font-semibold leading-none">Borders network dispatch nodes.</p>
            </div>

            <div className="p-5 bg-white border border-zinc-200 rounded-none space-y-1 shadow-xs">
              <span className="text-xl font-black text-[#f97316] italic tracking-tight">30+ CARRIERS</span>
              <h4 className="font-extrabold text-zinc-900 text-[10px] uppercase tracking-wider">Fleet Diversified</h4>
              <p className="text-zinc-600 text-xs font-semibold">Wheel-lifts and 40-Ton wreckers.</p>
            </div>

            <div className="p-5 bg-white border border-zinc-200 rounded-none space-y-1 shadow-xs">
              <span className="text-xl font-black text-[#f97316] italic tracking-tight">INSURED HAULS</span>
              <h4 className="font-extrabold text-zinc-900 text-[10px] uppercase tracking-wider">Secure transit</h4>
              <p className="text-zinc-600 text-xs font-semibold">Comprehensive liability cover.</p>
            </div>

          </div>
        </section>
      )}

      {/* Interactive Photo Gallery Showcase on Homepage */}
      {!hideShowcase && (
        <section className="bg-white py-12 px-6 sm:px-10 lg:px-16 border-b border-zinc-200 text-left relative">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200 pb-3">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-[#f97316] uppercase tracking-[0.2em] block">
                  DEPLOYMENT CAPABILITY IMAGERY
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-950 leading-none mt-1">
                  Active Fleet &amp; Recovery Assets {activePhotosCount > 0 && `(${activePhotosCount})`}
                </h3>
              </div>
              
              <button
                onClick={() => onSelectTab('gallery')}
                className="bg-[#f97316] hover:bg-black hover:text-[#f97316] text-black font-black uppercase pr-3 pl-4 py-2 text-[10px] tracking-wider flex items-center gap-1 group self-start sm:self-center shrink-0 cursor-pointer transition-colors border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <span>Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {previewItems.length === 0 ? (
              <p className="text-zinc-500 text-xs font-semibold font-mono">No gallery photos currently loaded in active memory stack.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {previewItems.map((item, index) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelectTab('gallery')}
                    className="bg-white border-2 border-zinc-200 hover:border-[#f97316] transition-all p-3 rounded-none flex flex-col justify-between group cursor-pointer shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="aspect-[16/9] w-full overflow-hidden relative border border-zinc-200 bg-zinc-100">
                        <img 
                          src={item.image}
                          alt={item.thumbAlt}
                          className="w-full h-full object-cover transition-transform duration-305 group-hover:scale-102"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-1.5 left-1.5 bg-black border border-[#f97316] text-[#f97316] font-black text-[7.5px] uppercase tracking-wider px-1.5 py-0.5">
                          {item.badge}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-zinc-900 text-xs sm:text-sm uppercase tracking-tight group-hover:text-[#f97316] transition-colors">
                          {item.thumbAlt}
                        </h4>
                        <p className="text-[10.5px] text-zinc-650 font-medium leading-normal text-left">
                          {item.subtext}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-2.5 border-t border-zinc-100 text-[9px] text-[#f97316] font-black uppercase tracking-widest flex items-center gap-1 justify-end">
                      <span>EXPAND ASSET</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#f97316]" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ADMIN POPUP TO EDIT COVER Texts */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4">
          <form 
            onSubmit={handleSaveHeroEdit}
            className="bg-white border-3 border-[#f97316] max-w-xl w-full p-6 text-left space-y-4 shadow-xl"
          >
            <div className="flex justify-between items-center border-b border-zinc-250 pb-3">
              <h3 className="font-extrabold uppercase text-xs tracking-wider text-[#f97316] flex items-center gap-2">
                <Edit2 className="w-4 h-4" /> Edit Home Cover Messaging
              </h3>
              <button 
                type="button" 
                onClick={() => setIsEditOpen(false)}
                className="text-zinc-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs text-zinc-800">
              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-bold tracking-wider text-zinc-600">Standby Badge Banner Text</label>
                <input 
                  type="text" 
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="bg-zinc-50 border border-zinc-300 py-2.5 px-3 uppercase font-black tracking-widest focus:outline-none focus:border-[#f97316] text-black"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label className="uppercase font-bold tracking-wider text-zinc-600">Big Title Prefix</label>
                  <input 
                    type="text" 
                    value={titleMain}
                    onChange={(e) => setTitleMain(e.target.value)}
                    className="bg-zinc-50 border border-zinc-300 py-2.5 px-3 focus:outline-none focus:border-[#f97316] text-black"
                  />
                </div>
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label className="uppercase font-bold tracking-wider text-zinc-600">Color Highlight</label>
                  <input 
                    type="text" 
                    value={titleHighlight}
                    onChange={(e) => setTitleHighlight(e.target.value)}
                    className="bg-zinc-50 border border-zinc-300 py-2.5 px-3 focus:outline-none focus:border-[#f97316] text-[#f97316] font-bold"
                  />
                </div>
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label className="uppercase font-bold tracking-wider text-zinc-600">Suffix</label>
                  <input 
                    type="text" 
                    value={titleSuffix}
                    onChange={(e) => setTitleSuffix(e.target.value)}
                    className="bg-zinc-50 border border-zinc-300 py-2.5 px-3 focus:outline-none focus:border-[#f97316] text-black"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-bold tracking-wider text-zinc-600">Body Description Paragraph</label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-zinc-50 border border-zinc-300 py-2.5 px-3 focus:outline-none focus:border-[#f97316] text-zinc-800 font-medium leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold py-2.5 px-5 text-xs uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#f97316] text-black font-black py-2.5 px-7 text-xs uppercase border border-black hover:bg-neutral-900 hover:text-white"
              >
                Apply Changes
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
