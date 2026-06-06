import React, { useState } from 'react';
import { Camera, ChevronRight, ChevronLeft, Info, Eye, Edit2, Trash, Plus, X, Image as ImageIcon } from 'lucide-react';
import { useAdmin, GalleryItem } from './AdminContext';

export default function GalleryTab() {
  const { adminMode, galleryItems, setGalleryItems } = useAdmin();
  const [activeSlide, setActiveSlide] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Form states for adding or editing gallery slide
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [editId, setEditId] = useState<string | null>(null);

  const [formImage, setFormImage] = useState('');
  const [formThumbAlt, setFormThumbAlt] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formSubtext, setFormSubtext] = useState('');
  const [formSpec, setFormSpec] = useState('');

  // Safeguard active index
  const currentActiveIdx = activeSlide >= galleryItems.length ? 0 : activeSlide;
  const activeItem = galleryItems[currentActiveIdx];

  const handleNext = () => {
    if (galleryItems.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    if (galleryItems.length === 0) return;
    setActiveSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setModalType('add');
    setFormImage('');
    setFormThumbAlt('');
    setFormBadge('Active Recovery');
    setFormTitle('');
    setFormSubtext('');
    setFormSpec('Rigged and operated by qualified engineers.');
    setEditId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setModalType('edit');
    setFormImage(item.image);
    setFormThumbAlt(item.thumbAlt);
    setFormBadge(item.badge);
    setFormTitle(item.title);
    setFormSubtext(item.subtext);
    setFormSpec(item.spec);
    setEditId(item.id);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this photo/slide?')) {
      const updated = galleryItems.filter(item => item.id !== id);
      setGalleryItems(updated);
      setActiveSlide(0);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImage || !formTitle || !formSubtext) {
      alert('Please fully specify Title, Description and Select / Paste an Image.');
      return;
    }

    if (modalType === 'add') {
      const newItem: GalleryItem = {
        id: `slide-${Date.now()}`,
        image: formImage,
        thumbAlt: formThumbAlt || formTitle,
        badge: formBadge,
        title: formTitle.toUpperCase(),
        subtext: formSubtext,
        spec: formSpec
      };
      const updated = [...galleryItems, newItem];
      setGalleryItems(updated);
      setActiveSlide(updated.length - 1);
    } else if (modalType === 'edit' && editId) {
      const updated = galleryItems.map(item => item.id === editId ? {
        ...item,
        image: formImage,
        thumbAlt: formThumbAlt || formTitle,
        badge: formBadge,
        title: formTitle.toUpperCase(),
        subtext: formSubtext,
        spec: formSpec
      } : item);
      setGalleryItems(updated);
    }

    setIsModalOpen(false);
  };

  return (
    <div id="gallery-tab-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 space-y-12 bg-white text-zinc-900 font-sans">
      
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-5 text-left select-none">
        <div className="space-y-1">
          <span className="text-[9.5px] font-black text-[#f97316] uppercase tracking-[0.25em] block mb-1">
            SUPERIOR CLARITY • VERIFIED GALLERY
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-950 uppercase tracking-tighter leading-none m-0">
            Active Fleet Operational Photography
          </h1>
          <p className="text-zinc-600 text-xs md:text-sm mt-3 max-w-2xl font-bold leading-relaxed">
            Explore real-life, ultra high-resolution photos of Soloo Trucks Recovery fleets operating on-site across Kenya, Uganda, and Tanzania.
          </p>
        </div>

        {adminMode && (
          <button
            onClick={openAddModal}
            className="bg-[#f97316] hover:bg-black hover:text-[#f97316] text-black font-black uppercase text-xs tracking-widest py-3 px-5 border-2 border-black rounded-none flex items-center justify-center gap-2 self-start md:self-end shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Photo
          </button>
        )}
      </div>

      {/* Main Interactive Slideshow Banner */}
      {galleryItems.length === 0 ? (
        <div className="p-16 border-2 border-dashed border-zinc-300 text-center space-y-3 bg-zinc-55">
          <Camera className="w-12 h-12 text-[#f97316] mx-auto opacity-50" />
          <h3 className="font-extrabold uppercase tracking-tight text-zinc-950 text-sm">No Fleet Photos in Gallery</h3>
          <p className="text-zinc-500 text-xs max-w-sm mx-auto">Toggle or utilize Admin options to instantly upload high-resolution photography files.</p>
          {adminMode && (
            <button
              onClick={openAddModal}
              className="mt-2 bg-[#f97316] hover:bg-neutral-900 hover:text-white text-black font-bold uppercase text-xs py-2 px-4 rounded-none"
            >
              Upload First Slide
            </button>
          )}
        </div>
      ) : (
        <div className={`relative border-4 overflow-hidden group select-none shadow-xl transition-all ${
          adminMode ? 'border-[#f97316] ring-4 ring-[#f97316]/20' : 'border-zinc-200'
        }`}>
          
          {adminMode && (
            <div className="absolute top-4 left-4 z-20 bg-[#f97316] text-black px-3 py-1 text-[9px] font-black uppercase font-mono tracking-wider shadow-lg">
              [ EDITABLE PORTAL BANNER ASSET ]
            </div>
          )}

          {/* Dynamic Image Canvas */}
          <div className="relative aspect-[16/9] w-full min-h-[280px] md:min-h-[450px] max-h-[600px] transition-all duration-500 bg-zinc-100">
            <img
              src={activeItem.image}
              alt={activeItem.thumbAlt}
              className="w-full h-full object-cover opacity-100"
              referrerPolicy="no-referrer"
            />
            {/* Soft gradient overlay for optimal readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Content Overlay styled for high-end feel */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 text-left space-y-3">
            <span className="bg-[#f97316] text-black font-black text-[9px] uppercase px-3 py-1 tracking-widest font-mono">
              {activeItem.badge}
            </span>
            
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)]">
              {activeItem.title}
            </h2>

            <p className="text-zinc-200 text-xs sm:text-sm max-w-3xl font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              {activeItem.subtext}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/20">
              <span className="text-xs text-[#f97316] font-black uppercase font-mono tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <span>{activeItem.spec}</span>
              </span>

              <div className="flex items-center gap-2">
                {adminMode && (
                  <>
                    <button
                      onClick={(e) => openEditModal(activeItem, e)}
                      className="bg-black/80 hover:bg-[#f97316] hover:text-black text-white hover:border-black font-black transition-all p-2 rounded-none border-2 border-[#f97316] cursor-pointer flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-4 py-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={(e) => handleDeleteItem(activeItem.id, e)}
                      className="bg-red-950 hover:bg-red-700 text-red-200 border-2 border-red-800 transition-all p-2 rounded-none cursor-pointer flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-4 py-1.5"
                    >
                      <Trash className="w-3.5 h-3.5" /> Delete
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => setFullscreenImage(activeItem.image)}
                  className="bg-[#f97316] hover:bg-white text-black font-black transition-all p-2 rounded-none border-2 border-black cursor-pointer flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-4 py-1.5"
                >
                  <Eye className="w-4 h-4" /> Zoom Image
                </button>
              </div>
            </div>
          </div>

          {/* Slide Controls */}
          {galleryItems.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-75 hover:opacity-100 bg-black/85 text-[#f97316] hover:bg-[#f97316] hover:text-black p-2.5 border-2 border-black transition-all rounded-none cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 stroke-[3]" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-75 hover:opacity-100 bg-black/85 text-[#f97316] hover:bg-[#f97316] hover:text-black p-2.5 border-2 border-black transition-all rounded-none cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 stroke-[3]" />
              </button>
            </>
          )}

          {/* Bullet Progress */}
          <div className="absolute right-4 top-4 bg-black border-2 border-[#f97316] px-3 py-1 flex items-center gap-3">
            <span className="text-xs text-[#f97316] font-mono font-black animate-pulse">
              {(currentActiveIdx + 1).toString().padStart(2, '0')} / {galleryItems.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      {/* Grid view showing thumbnail selection items */}
      {galleryItems.length > 0 && (
        <div className="space-y-4 text-left">
          <h3 className="text-[11px] font-black uppercase text-zinc-950 tracking-widest pb-2 border-b border-zinc-200 flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#f97316]" /> Select Active Focus
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={item.id}
                className={`flex flex-col justify-between bg-zinc-50 border-2 transition-all p-3 rounded-none relative group ${
                  currentActiveIdx === idx ? 'border-[#f97316] bg-[#f97316]/5' : 'border-zinc-200'
                }`}
              >
                <div className="space-y-3 cursor-pointer" onClick={() => setActiveSlide(idx)}>
                  <div className="aspect-[4/3] w-full overflow-hidden relative border border-zinc-200 bg-zinc-100">
                    <img
                      src={item.image}
                      alt={item.thumbAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    {currentActiveIdx === idx && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-[#f97316] text-black font-black text-[9px] uppercase px-2 py-0.5 tracking-wider">
                          ACTIVE
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[8.5px] text-[#f97316] font-black uppercase tracking-wider font-mono block">
                      Slide 0{idx + 1} • {item.badge}
                    </span>
                    <h4 className="font-black text-zinc-900 text-xs uppercase tracking-tight leading-tight line-clamp-1 group-hover:text-[#f97316] transition-colors">
                      {item.thumbAlt}
                    </h4>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#f97316]">
                  <button 
                    onClick={() => setActiveSlide(idx)}
                    className="flex items-center gap-1 hover:underline"
                  >
                    <span>SELECT SLIDE</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#f97316]" />
                  </button>

                  {adminMode && (
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => openEditModal(item, e)}
                        className="p-1 px-2 bg-zinc-800 text-white hover:bg-[#f97316] hover:text-black border border-transparent"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteItem(item.id, e)}
                        className="p-1 px-2 bg-red-950 text-red-200 hover:bg-red-700 hover:text-white border border-transparent"
                      >
                        <Trash className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cargo Safety Guarantee banner */}
      <div className="bg-[#f97316] p-6 text-black border border-black text-left grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="lg:col-span-8 space-y-2">
          <div className="inline-flex items-center gap-2 bg-black text-[#f97316] font-black text-[9px] uppercase px-3 py-1 tracking-widest font-mono">
            ● GUARANTEED CARGO SAFETY
          </div>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-neutral-950">
            Professional fleet safety standards that guarantee stress-free transits
          </h3>
          <p className="text-xs text-neutral-900 font-bold leading-relaxed max-w-4xl">
            Soloo Trucks Recovery operators follow strict securement standards. Every mechanical lift, excavator haul, and rig action is coordinated under licensed site riggers.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3 lg:justify-end">
          <a
            href="tel:0722154729"
            className="bg-black hover:bg-neutral-900 hover:text-white text-[#f97316] font-black text-xs uppercase tracking-widest py-3.5 px-6 text-center transition-colors rounded-none whitespace-nowrap shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
          >
            Call Duty Riggers
          </a>
        </div>
      </div>

      {/* Fullscreen zoom */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center p-4 cursor-pointer animate-fade-in"
        >
          <div className="absolute top-4 right-4 text-[#f97316] bg-black border-2 border-[#f97316] px-4 py-2 font-black uppercase tracking-wider text-xs">
            [ Click anywhere to close ]
          </div>
          <img
            src={fullscreenImage}
            alt="Fullscreen zoom view"
            className="max-w-full max-h-[85vh] object-contain border-4 border-white shadow-2xl bg-white"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Admin input dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          <form 
            onSubmit={handleSaveModal}
            className="bg-white border-3 border-[#f97316] max-w-xl w-full flex flex-col text-left shadow-2xl relative"
          >
            <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-extrabold uppercase text-xs tracking-wider text-[#f97316] flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#f97316]" /> 
                <span>{modalType === 'add' ? 'Upload Gallery Photo Slide' : 'Modify Slide Details'}</span>
              </h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-black p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-zinc-800">
              <div className="border border-zinc-200 p-4 bg-zinc-50 space-y-3">
                <span className="text-[10px] uppercase font-black text-zinc-500 tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#f97316]" /> Choose Fleet Slide Photo
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-center p-3 border border-dashed border-zinc-350 bg-white">
                    <span className="text-[10px] uppercase text-[#f97316] font-bold">Select Local Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="text-xs text-zinc-500 block w-full mt-1 cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 justify-center">
                    <span className="text-[10px] uppercase font-bold text-zinc-500">Or Paste Image URL</span>
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="bg-white border border-zinc-350 py-2 px-3 text-xs text-black focus:outline-none focus:border-[#f97316]"
                    />
                  </div>
                </div>

                {formImage && (
                  <div className="mt-2 border border-zinc-200 p-1.5 bg-white">
                    <img 
                      src={formImage} 
                      alt="Mini Preview" 
                      className="max-h-24 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-zinc-500 tracking-wider">Slide Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. EXTRA LARGE GENERATOR RIGGING"
                  className="bg-white border border-zinc-300 py-2 px-3 text-xs text-black focus:outline-none focus:border-[#f97316] uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-zinc-500 tracking-wider">Badge Line</label>
                  <input
                    type="text"
                    required
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="bg-white border border-zinc-300 py-2 px-3 text-xs text-black focus:outline-none focus:border-[#f97316]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-black text-zinc-500 tracking-wider">Accessibility Alternative Text</label>
                  <input
                    type="text"
                    value={formThumbAlt}
                    onChange={(e) => setFormThumbAlt(e.target.value)}
                    className="bg-white border border-zinc-300 py-2 px-3 text-xs text-black focus:outline-none focus:border-[#f97316]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-zinc-500 tracking-wider">Detailed Description</label>
                <textarea
                  required
                  rows={3}
                  value={formSubtext}
                  onChange={(e) => setFormSubtext(e.target.value)}
                  className="bg-white border border-zinc-300 py-2 px-3 text-xs text-black focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black text-zinc-500 tracking-wider">Technical Rigging Specification Details</label>
                <input
                  type="text"
                  value={formSpec}
                  onChange={(e) => setFormSpec(e.target.value)}
                  className="bg-white border border-zinc-300 py-2 px-3 text-xs text-black focus:outline-none focus:border-[#f97316]"
                />
              </div>

            </div>

            <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex justify-end gap-3 font-sans">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-black uppercase text-xs py-2 px-4 rounded-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#f97316] hover:bg-neutral-900 hover:text-white text-black font-black uppercase text-xs py-2 px-6 rounded-none cursor-pointer border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Save Slide
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
