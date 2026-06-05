import React, { useState } from 'react';
import { Truck, Cpu, AlertTriangle, ArrowRight, CheckCircle2, ChevronDown, Edit2, Trash2, Plus, X, ListPlus, ShieldCheck, Scale } from 'lucide-react';
import { TabType } from '../types';
import { useAdmin, ServiceDetail } from './AdminContext';

interface ServicesTabProps {
  onSelectTab: (tab: TabType) => void;
  onPreselectService: (serviceId: string) => void;
}

export default function ServicesTab({ onSelectTab, onPreselectService }: ServicesTabProps) {
  const { adminMode, servicesList, setServicesList } = useAdmin();

  const [activeAccordion, setActiveAccordion] = useState<string>('light-tow');
  
  // Cost Calculator States
  const [calcService, setCalcService] = useState<string>('light-tow');
  const [calcDistance, setCalcDistance] = useState<number>(15);
  const [calcNightTime, setCalcNightTime] = useState<boolean>(false);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form states for Add / Edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [editId, setEditId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formBasePrice, setFormBasePrice] = useState<number>(5000);
  const [formPerKmPrice, setFormPerKmPrice] = useState<number>(150);
  
  // Comma separated strings or inline values for arrays
  const [formSpecsStr, setFormSpecsStr] = useState(''); // "Max Capacity:4.5 Tons, Dispatch:15 mins"
  const [formDetailsStr, setFormDetailsStr] = useState(''); // line summary details
  const [formEquipmentStr, setFormEquipmentStr] = useState(''); // Comma separated list
  const [formBestForStr, setFormBestForStr] = useState(''); // Comma separated list

  // Safeguard active state indicator
  const safeAccordionId = (servicesList.find(s => s.id === activeAccordion) ? activeAccordion : servicesList[0]?.id) || '';

  // Calculator Logic helper
  const getSelectedServiceDetails = () => servicesList.find((s) => s.id === calcService) || servicesList[0];
  
  const calculateTotalCost = () => {
    const s = getSelectedServiceDetails();
    if (!s) return 0;
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

  const openAddModal = () => {
    setModalType('add');
    setFormTitle('');
    setFormCategory('Standard Recovery');
    setFormTagline('');
    setFormBasePrice(5000);
    setFormPerKmPrice(150);
    setFormSpecsStr('Max Weight: 5 Tons, Response Standby: 20 Mins');
    setFormDetailsStr('Fully tilt-tray dispatch hydraulic operation.\nZero contact wheel safe lifters.\nChain strapped tires protect align structures.');
    setFormEquipmentStr('Isuzu FSR Flatbeds, Hydraulic Lift Jib, Alloy Rim Straps');
    setFormBestForStr('Sedans & Coupes, Light SUVs, Motorcycles');
    setEditId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceDetail, e: React.MouseEvent) => {
    e.stopPropagation();
    setModalType('edit');
    setFormTitle(service.title);
    setFormCategory(service.category);
    setFormTagline(service.tagline);
    setFormBasePrice(service.basePrice);
    setFormPerKmPrice(service.perKmPrice);
    
    // Parse specs array into string
    const specsString = service.specs.map(s => `${s.label}:${s.value}`).join(', ');
    setFormSpecsStr(specsString);

    // Parse details, equipment, and bestfor
    setFormDetailsStr(service.details.join('\n'));
    setFormEquipmentStr(service.equipment.join(', '));
    setFormBestForStr(service.bestFor.join(', '));
    
    setEditId(service.id);
    setIsModalOpen(true);
  };

  const handleDeleteService = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to permanently delete this service line?')) {
      const updated = servicesList.filter(s => s.id !== id);
      setServicesList(updated);
      setSelectedAccordionAfterDelete(updated);
    }
  };

  const setSelectedAccordionAfterDelete = (newList: ServiceDetail[]) => {
    if (newList.length > 0) {
      setActiveAccordion(newList[0].id);
    } else {
      setActiveAccordion('');
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formCategory.trim() || !formTagline.trim()) {
      alert('Please fill out the Title, Category, and Slogan Tagline fields.');
      return;
    }

    // Parse Specs
    const parsedSpecs = formSpecsStr.split(',').map(s => {
      const parts = s.split(':');
      return {
        label: (parts[0] || 'Specification').trim(),
        value: (parts[1] || 'Compliant').trim()
      };
    }).filter(s => s.label.length > 0);

    // Parse Details
    const parsedDetails = formDetailsStr.split('\n').map(d => d.trim()).filter(d => d.length > 0);

    // Parse Equipment
    const parsedEquipment = formEquipmentStr.split(',').map(eq => eq.trim()).filter(eq => eq.length > 0);

    // Parse BestFor
    const parsedBestFor = formBestForStr.split(',').map(bf => bf.trim()).filter(bf => bf.length > 0);

    if (modalType === 'add') {
      const newService: ServiceDetail = {
        id: `srv-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        tagline: formTagline,
        basePrice: Number(formBasePrice),
        perKmPrice: Number(formPerKmPrice),
        specs: parsedSpecs,
        details: parsedDetails,
        equipment: parsedEquipment,
        bestFor: parsedBestFor
      };
      const updated = [...servicesList, newService];
      setServicesList(updated);
      setActiveAccordion(newService.id);
    } else if (modalType === 'edit' && editId) {
      const updated = servicesList.map(s => s.id === editId ? {
        ...s,
        title: formTitle,
        category: formCategory,
        tagline: formTagline,
        basePrice: Number(formBasePrice),
        perKmPrice: Number(formPerKmPrice),
        specs: parsedSpecs,
        details: parsedDetails,
        equipment: parsedEquipment,
        bestFor: parsedBestFor
      } : s);
      setServicesList(updated);
    }

    setIsModalOpen(false);
  };

  // Icon mapping helper fallback
  const renderFallbackIcon = (category: string) => {
    if (category.toLowerCase().includes('extreme') || category.toLowerCase().includes('crane')) {
      return <Scale className="w-5 h-5 text-[#f97316]" />;
    } else if (category.toLowerCase().includes('special') || category.toLowerCase().includes('fork')) {
      return <Cpu className="w-5 h-5 text-[#f97316]" />;
    } else if (category.toLowerCase().includes('patrol') || category.toLowerCase().includes('road')) {
      return <ShieldCheck className="w-5 h-5 text-[#f97316]" />;
    }
    return <Truck className="w-5 h-5 text-[#f97316]" />;
  };

  return (
    <div id="services-page-container" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-16 bg-[#1a1a1a] text-zinc-100 font-sans">
      
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 text-left select-none">
        <div className="space-y-2">
          <span className="text-[10px] font-black text-[#f97316] uppercase tracking-[0.25em] block mb-2">
            HEAVY FLEET &amp; RIGGING CAPABILITIES
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#f97316] uppercase tracking-tighter leading-none m-0">
            Comprehensive Heavy Recovery &amp; Dispatches
          </h1>
          <p className="text-zinc-100 text-xs md:text-sm mt-4 max-w-2xl leading-relaxed font-bold">
            From compact motorbikes to 40-ton prime movers and industrial warehouse cargo, Soloo Trucks Recovery maintains heavy-lifting crane systems, versatile forklift fleets, and rapid-response flatbeds across Kenya, Uganda, and Tanzania.
          </p>
        </div>

        {/* Add Service button for admin */}
        {adminMode && (
          <button
            onClick={openAddModal}
            className="bg-[#f97316] hover:bg-white text-black font-black uppercase text-xs tracking-widest py-3 px-5 border-2 border-black rounded-none flex items-center justify-center gap-2 self-start md:self-end shrink-0 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Fleet Service Range
          </button>
        )}
      </div>

      {servicesList.length === 0 ? (
        <div className="p-16 border bg-[#151515] border-dashed border-white/15 text-center space-y-3">
          <AlertTriangle className="w-12 h-12 text-[#f97316] mx-auto opacity-50" />
          <h3 className="font-extrabold uppercase tracking-tight text-white text-sm">No Fleet Services Configured</h3>
          <p className="text-zinc-400 text-xs max-w-sm mx-auto">Use Admin mode controls to restore or append specialized transport and salvage utilities.</p>
          {adminMode && (
            <button
              onClick={openAddModal}
              className="mt-2 bg-[#f97316] hover:bg-white text-black font-bold uppercase text-xs py-2.5 px-5"
            >
              Add First Service
            </button>
          )}
        </div>
      ) : (
        /* Services deep dive - Accordion View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
          
          {/* Accordions Left Sidebar (5 cols) */}
          <div id="services-selector-sidebar" className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <div>
              <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xs uppercase tracking-widest font-black text-[#f97316]">
                  Select Target Fleet Line
                </h2>
                <span className="text-[9px] font-mono font-bold text-zinc-500">
                  {servicesList.length} Active categories
                </span>
              </div>
              
              <div className="divide-y divide-white/10 max-h-[500px] overflow-y-auto">
                {servicesList.map((item) => {
                  const isActive = safeAccordionId === item.id;
                  return (
                    <div 
                      key={item.id}
                      className={`w-full transition-all group flex items-center justify-between pr-4 ${
                        isActive ? 'bg-[#f97316] text-black font-bold text-neutral-950' : 'bg-transparent text-zinc-100 hover:bg-white/5'
                      }`}
                    >
                      <button
                        id={`srv-btn-${item.id}`}
                        onClick={() => setActiveAccordion(item.id)}
                        className="flex-1 text-left p-5 flex items-center gap-4 focus:outline-none"
                      >
                        <div className={`p-2 rounded-none shrink-0 ${isActive ? 'bg-black text-[#f97316]' : 'bg-white/5 text-white'}`}>
                          {renderFallbackIcon(item.category)}
                        </div>
                        <div>
                          <span className={`text-[9px] uppercase tracking-wider block font-black leading-none mb-1 ${isActive ? 'text-black/60' : 'text-[#f97316]'}`}>
                            {item.category}
                          </span>
                          <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-tight">{item.title}</h3>
                        </div>
                      </button>

                      <div className="flex items-center gap-1.5 pl-2">
                        {adminMode && (
                          <>
                            <button
                              onClick={(e) => openEditModal(item, e)}
                              className={`p-1.5 border hover:scale-105 transition-transform ${
                                isActive 
                                  ? 'bg-black/90 border-black text-white hover:bg-black/70' 
                                  : 'bg-zinc-800 border-white/10 text-white hover:bg-[#f97316] hover:text-black hover:border-black'
                              }`}
                              title="Edit service details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteService(item.id, e)}
                              className={`p-1.5 border hover:scale-105 transition-transform ${
                                isActive 
                                  ? 'bg-red-950 border-red-800 text-white hover:bg-red-700' 
                                  : 'bg-zinc-800 border-white/10 text-white hover:bg-red-600 hover:border-red-800'
                              }`}
                              title="Delete service line"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180 text-black' : 'text-zinc-100'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Notice Alert */}
            <div className="p-6 bg-white/5 border-t border-white/10 flex gap-3 text-left">
              <AlertTriangle className="w-5 h-5 text-[#f97316] shrink-0 mt-0.5" />
              <div className="text-[11px] space-y-1">
                <h4 className="font-black uppercase text-[#f97316] tracking-wider">East African Regional Coverage</h4>
                <p className="text-white font-bold leading-relaxed">
                  Operating across regional highway corridors. Our robust East African network supports border transit logistics and high-capacity dispatch routes in Kenya, Uganda, and Tanzania.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Expanded View Content Right (7 cols) */}
          <div id="service-details-pane" className="lg:col-span-12 xl:col-span-7 bg-transparent p-6 md:p-8 space-y-8 flex flex-col justify-between text-left">
            {(() => {
              const current = servicesList.find((s) => s.id === safeAccordionId);
              if (!current) return <p className="text-sm font-semibold text-zinc-500">Select an active category above</p>;
              return (
                <>
                  {/* Header Title */}
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                      <div className="space-y-1">
                        <span className="text-[9px] bg-[#f97316]/10 border border-[#f97316]/30 text-[#f97316] font-black uppercase px-2 py-0.5 tracking-widest">
                          {current.category}
                        </span>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-1">{current.title}</h3>
                        <p className="text-xs text-zinc-100 font-extrabold italic">{current.tagline}</p>
                      </div>
                      
                      {/* Pricing Overview Tag */}
                      <div className="bg-[#151515] px-4 py-3 rounded-none border border-white/10 shrink-0 select-none">
                        <span className="text-[9px] uppercase text-zinc-100 block font-black tracking-wider leading-none mb-1">Base Dispatch Rate</span>
                        <span className="text-lg font-black text-[#f97316] tracking-tight">KES {current.basePrice.toLocaleString()}</span>
                        <span className="text-[9px] text-[#f97316] block font-extrabold mt-0.5 tracking-wider">+ KES {current.perKmPrice}/KM</span>
                      </div>
                    </div>

                    {/* Grid Technical Specifications */}
                    <div className="grid grid-cols-2 gap-3">
                      {current.specs.map((s, idx) => (
                        <div key={idx} className="bg-white/5 p-3 rounded-none border border-white/10">
                          <span className="text-[9px] uppercase text-white/50 block font-black tracking-wider mb-0.5">{s.label}</span>
                          <span className="text-xs font-black text-[#f97316]">{s.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Rich Description List */}
                    {current.details && current.details.length > 0 && (
                      <div className="space-y-3 pt-3">
                        <h4 className="text-xs font-black text-[#f97316] uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> STRENGTHS &amp; RIG OPERATIONS
                        </h4>
                        
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-100 leading-relaxed">
                          {current.details.map((d, idx) => (
                            <li key={idx} className="bg-[#151515] border border-white/5 p-3 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-[#f97316] shrink-0 mt-1.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Equipments and Best For Badges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-black text-[#f97316] uppercase tracking-widest">Active Equipment Handlers</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {current.equipment.map((eq, i) => (
                          <span key={i} className="text-[10px] bg-[#151515] text-zinc-105 font-bold border border-white/15 px-2.5 py-1">
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[9px] font-black text-[#f97316] uppercase tracking-widest">Optimized Best Suited For</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {current.bestFor.map((bf, i) => (
                          <span key={i} className="text-[10px] bg-[#f97316]/10 text-[#f97316] font-bold border border-[#f97316]/25 px-2.5 py-1">
                            {bf}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direct Action */}
                  <div className="bg-white/5 border border-white/10 p-5 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs space-y-1">
                      <p className="font-extrabold text-[#f97316] uppercase tracking-wider">Need this exact service dispatched?</p>
                      <p className="text-zinc-105 font-bold">Our live dispatchers link up with driver personnel inside 3 minutes.</p>
                    </div>
                    
                    <button
                      id={`btn-book-direct-${current.id}`}
                      onClick={() => handleBookSelected(current.id)}
                      className="bg-[#f97316] hover:bg-white text-black font-black uppercase px-6 py-3.5 text-xs tracking-widest transition-colors rounded-none flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-2 border-black"
                    >
                      Select &amp; Book Now <ArrowRight className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* COST CALCULATOR BLOCK PERSISTS AS HIGH QUALITY ADDITION */}
      <section className="bg-[#121212] border-2 border-white/10 p-6 md:p-10 text-left space-y-8">
        <div className="border-b border-white/10 pb-4">
          <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#f97316]">
            UPFRONT COST CLARITY
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mt-0.5">
            Instant Estimate Cost Calculator
          </h3>
        </div>

        {servicesList.length === 0 ? (
          <p className="text-zinc-400 text-xs font-semibold">Define service models to enable dispatch computations.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Select service */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black text-white/50 tracking-wider">Select Dispatched Vehicle Suite</label>
                  <select 
                    value={calcService}
                    onChange={(e) => setCalcService(e.target.value)}
                    className="bg-[#1e1e1e] border-2 border-white/10 outline-none text-white text-xs px-4 py-3 rounded-none focus:border-[#f97316] uppercase font-bold [&>option]:bg-[#1a1a1a]"
                  >
                    {servicesList.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>

                {/* Distance */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black text-white/50 tracking-wider flex justify-between">
                    <span>Est. Transit Distance</span>
                    <span className="text-[#f97316] font-bold font-mono">{calcDistance} Kilometers</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range"
                      min={5}
                      max={300}
                      step={5}
                      value={calcDistance}
                      onChange={(e) => setCalcDistance(Number(e.target.value))}
                      className="flex-1 accent-[#f97316] h-1.5 cursor-pointer rounded bg-white/20"
                    />
                    <input 
                      type="number"
                      min={5}
                      max={900}
                      value={calcDistance}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val > 0) setCalcDistance(val);
                      }}
                      className="bg-[#1e1e1e] border border-white/10 text-white text-xs px-2 py-2 text-center font-bold font-mono w-16 focus:outline-none focus:border-[#f97316]"
                    />
                  </div>
                </div>
              </div>

              {/* Night time slider */}
              <div 
                onClick={() => setCalcNightTime(!calcNightTime)}
                className="bg-[#1e1e1e] p-4 border border-white/5 rounded-none flex items-center justify-between cursor-pointer select-none group"
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs uppercase font-extrabold text-white group-hover:text-[#f97316] transition-colors">Emergency Midnight Operations Dispatch (10PM - 6AM)</h4>
                  <p className="text-[10px] text-zinc-400 font-bold leading-normal">Adds flat KES 2,500 overnight security mobilization premium to base route rate.</p>
                </div>
                <div className={`w-10 h-6 shrink-0 transition-colors rounded-full p-1 flex items-center ${calcNightTime ? 'bg-[#f97316]' : 'bg-white/15'}`}>
                  <div className={`w-4 h-4 bg-black rounded-full transition-all ${calcNightTime ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>

            </div>

            {/* Price Presentation HUD */}
            <div className="lg:col-span-5 bg-black border-2 border-[#f97316] p-6 space-y-4 text-center">
              <div>
                <span className="text-[9px] text-[#f97316] uppercase font-black font-mono tracking-widest block">Computed Mobilization Cost</span>
                <span className="text-4xl sm:text-5xl font-black text-[#f97316] tracking-tighter block mt-1">
                  KES {calculateTotalCost().toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-400 font-bold font-mono block mt-1 tracking-wider uppercase">Estimate inclusive of active rig loaders</span>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                <button
                  onClick={() => handleBookSelected(calcService)}
                  className="w-full bg-[#f97316] hover:bg-white text-black font-black uppercase text-xs py-3 tracking-widest transition-colors cursor-pointer border border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                >
                  Direct Dispatch This Estimate
                </button>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* ADMIN SERVICE DIALOG MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          <form 
            onSubmit={handleSaveModal}
            className="bg-[#151515] border-3 border-[#f97316] max-w-3xl w-full flex flex-col text-left shadow-2xl relative"
          >
            <div className="p-4 bg-black border-b border-white/10 flex justify-between items-center">
              <h3 className="font-extrabold uppercase text-xs tracking-wider text-[#f97316] flex items-center gap-2">
                <ListPlus className="w-5 h-5 text-[#f97316]" /> 
                <span>{modalType === 'add' ? 'Add New Fleet Service Range' : 'Modify Fleet Details'}</span>
              </h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-4 overflow-y-auto max-h-[75vh]">
              
              {/* Title input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Service Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. 24/7 Heavy Flatbeds & Carriers"
                  className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category select */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Category</label>
                  <input
                    type="text"
                    required
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="e.g. Standard Recovery or Extreme Lifting"
                    className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316]"
                  />
                </div>

                {/* Tagline select */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Short Tagline Description</label>
                  <input
                    type="text"
                    required
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    placeholder="e.g. Reliable operations for high loads."
                    className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316]"
                  />
                </div>
              </div>

              {/* Pricing settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Base Price (KES)</label>
                  <input
                    type="number"
                    required
                    value={formBasePrice}
                    onChange={(e) => setFormBasePrice(Number(e.target.value))}
                    className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316] font-mono font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Surcharge Rate Per KM (KES)</label>
                  <input
                    type="number"
                    required
                    value={formPerKmPrice}
                    onChange={(e) => setFormPerKmPrice(Number(e.target.value))}
                    className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316] font-mono font-bold"
                  />
                </div>
              </div>

              {/* Specs comma-separated */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Specs (Label:Value separated by commas)</label>
                <input
                  type="text"
                  required
                  value={formSpecsStr}
                  onChange={(e) => setFormSpecsStr(e.target.value)}
                  placeholder="Max weight:4.5 Tons, ETA:15 Mins, Areas:Nairobi Corridor"
                  className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316]"
                />
              </div>

              {/* Details newline */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Core Strengths Checklist (Double-space or newline separated)</label>
                <textarea
                  rows={3}
                  required
                  value={formDetailsStr}
                  onChange={(e) => setFormDetailsStr(e.target.value)}
                  placeholder="Low clearance wheel lifts&#10;Anti-surge battery triggers&#10;Alloy secure straps prevent frame align shifts"
                  className="bg-[#1e1e1e] border-2 border-white/10 py-2 px-3 text-xs text-white focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Equipment comma-separated */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-[#f97316] tracking-wider font-mono">Active Equipment Class (Comma separated)</label>
                  <input
                    type="text"
                    required
                    value={formEquipmentStr}
                    onChange={(e) => setFormEquipmentStr(e.target.value)}
                    placeholder="Isuzu high loaders, Soft rim alloy straps"
                    className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#f97316]"
                  />
                </div>

                {/* Best For comma-separated */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-[#f97316] tracking-wider font-mono">Optimized Best Suited For (Comma separated)</label>
                  <input
                    type="text"
                    required
                    value={formBestForStr}
                    onChange={(e) => setFormBestForStr(e.target.value)}
                    placeholder="Truck prime movers, Flatbed lowloads, Container trailers"
                    className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#f97316]"
                  />
                </div>
              </div>

            </div>

            <div className="p-4 bg-black border-t border-white/10 flex justify-end gap-3 font-mono">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-black uppercase text-xs tracking-widest py-3 px-6 rounded-none cursor-pointer border border-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#f97316] hover:bg-white text-black font-black uppercase text-xs tracking-widest py-3 px-8 rounded-none cursor-pointer border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                Save service range
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
