import React, { useState } from 'react';
import { 
  Truck, ArrowRight, ShieldAlert, Phone, Compass, 
  HelpCircle, Scale, ShieldCheck, Cpu, Siren, Edit2, X, Eye, EyeOff
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

  const activeRescues = 8;
  const dispatchTime = '18 Mins';
  const satisfiedRating = '4.95 / 5';

  const handleShortcutSubmit = () => {
    onSelectTab('track-book');
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

  // Get active photos from Gallery state limit to 3 items for homepage card gallery
  const activePhotosCount = galleryItems.length;
  const previewItems = galleryItems.slice(0, 3);

  return (
    <div id="home-hero-layout" className="w-full flex flex-col font-sans text-white select-none bg-[#1a1a1a]">
      
      {/* Edge-to-edge Bold Layout Grid split 7/5 */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-white/10 relative">
        
        {/* Admin Section controls indicator */}
        {adminMode && (
          <div className="absolute top-4 right-4 z-20 bg-[#f97316]/95 border border-black text-black px-4 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            <span>Home Page Section Controls</span>
            <button
              onClick={() => setIsEditOpen(true)}
              className="bg-black text-[#f97316] hover:bg-white hover:text-black font-black py-1 px-3.5 border border-black text-[10px]"
              title="Edit Main Title & Copy text specs"
            >
              Edit Cover Text
            </button>
            <button
              onClick={toggleHideMetrics}
              className="bg-neutral-900 text-white hover:bg-neutral-800 font-bold py-1 px-2 text-[10px] flex items-center gap-1"
              title="Hide or show the numbers stats block row"
            >
              {hideMetrics ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />} 
              {hideMetrics ? 'Show Stats Row' : 'Hide Stats Row'}
            </button>
            <button
              onClick={toggleHideShowcase}
              className="bg-neutral-900 text-white hover:bg-neutral-800 font-bold py-1 px-2 text-[10px] flex items-center gap-1"
              title="Hide or show the cargo project photos showcase"
            >
              {hideShowcase ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />} 
              {hideShowcase ? 'Show Photo Gallery' : 'Hide Photo Gallery'}
            </button>
          </div>
        )}

        {/* Left Side Content & Direct booking form (7 columns) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 space-y-12">
          
          <div className={`space-y-6 relative rounded-none p-2 ${adminMode ? 'border-2 border-dashed border-[#f97316]/60 bg-[#f97316]/5' : ''}`}>
            
            {adminMode && (
              <button
                onClick={() => setIsEditOpen(true)}
                className="absolute -top-3.5 -left-3.5 bg-[#f97316] text-black font-black p-1.5 border border-black"
                title="Edit Headline Block"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}

            <div className="inline-flex items-center gap-2 bg-[#f97316]/10 border border-[#f97316]/20 px-3 py-1 rounded-none text-xs">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-ping shrink-0" />
              <span className="text-[#f97316] font-black uppercase tracking-widest text-[10px]">
                {heroContent.badgeText}
              </span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-black uppercase leading-[0.85] tracking-tighter text-left">
              {heroContent.titleMain}<br />
              <span className="text-[#f97316]">{heroContent.titleHighlight}</span> {heroContent.titleSuffix || 'Unit'}
            </h2>

            <p className="text-base sm:text-lg text-[#f4f4f5] font-extrabold max-w-xl leading-relaxed drop-shadow-md text-left">
              {heroContent.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-left justify-start">
              <button
                id="btn-hero-book"
                onClick={() => onSelectTab('track-book')}
                className="bg-[#f97316] hover:bg-white text-black font-black uppercase py-4 px-6 text-xs tracking-widest transition-colors border-2 border-black rounded-none flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                Order Direct Dispatch Now <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="btn-hero-services"
                onClick={() => onSelectTab('services')}
                className="bg-[#f97316] hover:bg-white text-black font-black uppercase py-4 px-6 text-xs tracking-widest transition-colors border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                Explore Services &amp; Rates
              </button>
            </div>
          </div>

          {/* Quick Booking shortcut Form inside Hero */}
          <div className="bg-white/5 p-6 rounded-none border border-white/10 space-y-4 max-w-xl">
            <h3 className="text-xs uppercase tracking-[0.2em] font-black text-[#f97316] text-left">Instant Request Coordinator</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Pickup Location</label>
                <input 
                  type="text" 
                  value={pickupText}
                  onChange={(e) => setPickupText(e.target.value)}
                  placeholder="e.g. Kondele, Kisumu or Malaba Border" 
                  className="bg-transparent border-b border-white/20 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-[#f97316] transition-colors"
                />
              </div>
              
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Service Type Required</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="bg-transparent border-b border-white/20 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-[#f97316] transition-colors [&>option]:bg-[#1a1a1a]"
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
              className="w-full bg-[#f97316] hover:bg-white text-black font-black uppercase py-3.5 text-xs tracking-widest transition-colors border-2 border-black rounded-none flex items-center justify-center gap-1.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] cursor-pointer"
            >
              Initialize Dispatch &amp; Estimate Rate <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>

        </div>

        {/* Right Side Services Grid (5 columns) */}
        <div className="lg:col-span-5 flex flex-col">
          
          {/* Services Matrix Indicators */}
          <div className="flex-1 grid grid-cols-2 bg-white/5">
            <div className="p-6 border-b border-r border-white/10 flex flex-col justify-center space-y-3 text-left">
              <div className="text-[#f97316] text-3xl font-black italic">01</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">24/7 Dispatch</h4>
              <p className="text-[11px] text-[#cbd5e1] font-bold leading-normal">Instant coordination for emergency highway and off-road vehicles rescue.</p>
            </div>
            
            <div className="p-6 border-b border-white/10 flex flex-col justify-center space-y-3 text-left">
              <div className="text-[#f97316] text-3xl font-black italic">02</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">Heavy Crane</h4>
              <p className="text-[11px] text-[#cbd5e1] font-bold leading-normal">Pivoting rotator rigs capable of pulling trucks from ditch salvages.</p>
            </div>
            
            <div className="p-6 border-b lg:border-b-0 border-r border-white/10 flex flex-col justify-center space-y-3 text-left">
              <div className="text-[#f97316] text-3xl font-black italic">03</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">Forklift Service</h4>
              <p className="text-[11px] text-[#cbd5e1] font-bold leading-normal">Precision warehouse and heavy port generator lifting arrays instantly.</p>
            </div>
            
            <div className="p-6 border-b lg:border-b-0 border-white/10 flex flex-col justify-center space-y-3 text-left">
              <div className="text-[#f97316] text-3xl font-black italic">04</div>
              <h4 className="font-extrabold uppercase text-xs sm:text-sm tracking-wider text-white">GPS Mapping</h4>
              <p className="text-[11px] text-[#cbd5e1] font-bold leading-normal">Dynamic tracking maps to oversee response team routing and speeds.</p>
            </div>
          </div>

        </div>

      </section>

      {/* Brand Value Metrics Row (Supports Deletion/Hiding by Admin) */}
      {!hideMetrics && (
        <section className="bg-[#151515] py-12 px-6 sm:px-10 lg:px-16 border-b border-white/10 relative">
          
          {adminMode && (
            <div className="absolute top-2 right-2 flex gap-1 bg-black/80 px-2 py-1 text-[9px] font-mono border border-red-800 text-red-500">
              <span>Stats Row active</span>
              <button onClick={toggleHideMetrics} className="underline hover:text-white">Hide section</button>
            </div>
          )}

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            
            <div className="p-5 bg-[#151515] border border-white/10 rounded-none space-y-3">
              <span className="text-3xl font-black text-[#f97316] italic tracking-tight block">24 / 7 / 365</span>
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider animate-pulse text-left">ALWAYS ON WATCH</h4>
              <p className="text-zinc-200 text-xs font-bold leading-relaxed">
                Our live operators and standby heavy riggers remain operational through late-night conditions.
              </p>
            </div>

            <div className="p-5 bg-[#f97316] border-2 border-[#f97316] rounded-none space-y-3 text-black">
              <span className="text-3xl font-black italic tracking-tight block">EAST AFRICA</span>
              <h4 className="font-extrabold text-zinc-950 text-xs uppercase tracking-wider font-sans text-left">KENYA • UGANDA • TANZANIA</h4>
              <p className="text-neutral-900 text-xs font-bold leading-relaxed text-left">
                Broad network dispatch extending across borders with unified fleet standby nodes across EA corridors.
              </p>
            </div>

            <div className="p-5 bg-[#151515] border border-white/10 rounded-none space-y-3">
              <span className="text-3xl font-black text-[#f97316] italic tracking-tight block">30+ HEAVY CARRIERS</span>
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider font-sans text-left">DIVERSIFIED FLEET</h4>
              <p className="text-zinc-200 text-xs font-bold leading-relaxed">
                From compact wheel-lifts to 40-ton cranes and warehouse forklifts, we handle all weight ratios.
              </p>
            </div>

            <div className="p-5 bg-[#151515] border border-white/10 rounded-none space-y-3">
              <span className="text-3xl font-black text-[#f97316] italic tracking-tight block">LIVE GPS HUD</span>
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider font-sans text-left">REAL-TIME TRAFFIC</h4>
              <p className="text-zinc-200 text-xs font-bold leading-relaxed">
                Eliminate critical guesswork. High-frequency tracking shows exact dispatcher GPS telemetry.
              </p>
            </div>

          </div>
        </section>
      )}

      {/* NEW PROMINENT INTERACTIVE PHOTO GALLERY SHOWCASE UNIT (Supports Deletion/Hiding by Admin) */}
      {!hideShowcase && (
        <section className="bg-[#111111] py-16 px-6 sm:px-10 lg:px-16 border-b border-white/10 text-left relative">
          
          {adminMode && (
            <div className="absolute top-2 right-2 flex gap-1 bg-black/80 px-2 py-1 text-[9px] font-mono border border-red-800 text-red-500">
              <span>Photo Grid Row active</span>
              <button onClick={toggleHideShowcase} className="underline hover:text-white">Hide section</button>
            </div>
          )}

          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-[#f97316] uppercase tracking-[0.25em] block">
                  SPECIALIZED HIGHWAY DEPLOYMENT PHOTOS
                </span>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-[#f97316] leading-none mt-1">
                  Active Fleet &amp; Recovery Projects {activePhotosCount > 0 && `(${activePhotosCount})`}
                </h3>
              </div>
              <button
                onClick={() => onSelectTab('gallery')}
                className="bg-[#f97316] hover:bg-white text-black font-black uppercase pr-4 pl-5 py-3 text-xs tracking-widest flex items-center gap-2 group self-start sm:self-center shrink-0 cursor-pointer transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                <span>Explore High Clarity Gallery</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {previewItems.length === 0 ? (
              <p className="text-zinc-400 text-xs font-bold font-mono">No gallery photos currently loaded in active memory stack.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {previewItems.map((item, index) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelectTab('gallery')}
                    className="bg-[#1a1a1a] border-2 border-[#f97316] hover:bg-neutral-900 transition-all p-4 rounded-none flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-3.5">
                      <div className="aspect-[16/9] w-full overflow-hidden relative border-2 border-white bg-white">
                        <img 
                          src={item.image}
                          alt={item.thumbAlt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 bg-black border border-[#f97316] text-[#f97316] font-black text-[8px] uppercase tracking-wider px-2 py-0.5">
                          {item.badge}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-extrabold text-[#f97316] text-xs uppercase tracking-tight group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#cbd5e1] font-bold leading-relaxed line-clamp-3">
                          {item.subtext}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3.5 border-t border-white/5 text-[10px] text-[#f97316] font-black uppercase tracking-widest flex items-center gap-1.5 justify-end">
                      <span>ZOOM ACTIVE ASSET</span>
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
            className="bg-[#151515] border-3 border-[#f97316] max-w-xl w-full p-6 text-left space-y-4"
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-extrabold uppercase text-xs tracking-wider text-[#f97316] flex items-center gap-2">
                <Edit2 className="w-4 h-4" /> Edit Home Cover Messaging
              </h3>
              <button 
                type="button" 
                onClick={() => setIsEditOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs text-zinc-300">
              <div className="flex flex-col gap-1">
                <label className="uppercase font-bold tracking-wider">Standby Badge Banner Text</label>
                <input 
                  type="text" 
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="bg-[#1e1e1e] border border-white/10 py-2.5 px-3 uppercase font-black tracking-widest focus:outline-none focus:border-[#f97316] text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="uppercase font-bold tracking-wider">Big Title Prefix</label>
                  <input 
                    type="text" 
                    value={titleMain}
                    onChange={(e) => setTitleMain(e.target.value)}
                    className="bg-[#1e1e1e ] border border-white/10 py-2.5 px-3 focus:outline-none focus:border-[#f97316] text-white bg-[#1e1e1e]"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="uppercase font-bold tracking-wider">Color Highlight</label>
                  <input 
                    type="text" 
                    value={titleHighlight}
                    onChange={(e) => setTitleHighlight(e.target.value)}
                    className="bg-[#1e1e1e] border border-white/10 py-2.5 px-3 focus:outline-none focus:border-[#f97316] text-[#f97316] font-bold"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="uppercase font-bold tracking-wider">Suffix</label>
                  <input 
                    type="text" 
                    value={titleSuffix}
                    onChange={(e) => setTitleSuffix(e.target.value)}
                    className="bg-[#1e1e1e] border border-white/10 py-2.5 px-3 focus:outline-none focus:border-[#f97316] text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="uppercase font-bold tracking-wider">Body Description Paragraph</label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-[#1e1e1e] border border-white/10 py-2.5 px-3 focus:outline-none focus:border-[#f97316] text-zinc-150 font-medium leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-3 font-mono">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 px-5 text-xs uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#f97316] text-black font-black py-2.5 px-7 text-xs uppercase border border-black hover:bg-white"
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
