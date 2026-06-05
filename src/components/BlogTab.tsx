import React, { useState } from 'react';
import { useAdmin, BlogItem } from './AdminContext';
import { BookOpen, Search, Plus, Edit2, Trash2, Calendar, User, Tag, Clock, ArrowRight, X, Image as ImageIcon } from 'lucide-react';

export default function BlogTab() {
  const { adminMode, blogsList, setBlogsList } = useAdmin();
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form states for Add / Edit modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formCategory, setFormCategory] = useState('Industrial Rigging');
  const [formAuthor, setFormAuthor] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formDate, setFormDate] = useState('');

  const categories = ['All', 'Industrial Rigging', 'Highway Safety', 'Depot Logistics', 'General News'];

  // Handle image upload & convert to base64
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddForm = () => {
    setFormMode('add');
    setFormTitle('');
    setFormExcerpt('');
    setFormCategory('Industrial Rigging');
    setFormAuthor('Jane Doe');
    setFormContent('');
    setFormImage('');
    // Default to current date nicely formatted
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: '2-digit', year: 'numeric' };
    setFormDate(new Date().toLocaleDateString('en-US', dateOptions));
    setEditingId(null);
    setIsFormOpen(true);
  };

  const openEditForm = (blog: BlogItem, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the blog detail
    setFormMode('edit');
    setFormTitle(blog.title);
    setFormExcerpt(blog.excerpt);
    setFormCategory(blog.category);
    setFormAuthor(blog.author);
    setFormContent(blog.content);
    setFormImage(blog.image);
    setFormDate(blog.date);
    setEditingId(blog.id);
    setIsFormOpen(true);
  };

  const handleDeleteBlog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to permanently delete this blog article?')) {
      const updated = blogsList.filter(b => b.id !== id);
      setBlogsList(updated);
      setSelectedBlog(null);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formExcerpt.trim() || !formContent.trim()) {
      alert('Please fill out the Title, Excerpt, and Article Content.');
      return;
    }

    if (formMode === 'add') {
      const newBlog: BlogItem = {
        id: `blog-${Date.now()}`,
        title: formTitle,
        excerpt: formExcerpt,
        category: formCategory,
        author: formAuthor,
        content: formContent,
        image: formImage || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',
        date: formDate
      };
      setBlogsList([newBlog, ...blogsList]);
    } else if (formMode === 'edit' && editingId) {
      const updated = blogsList.map(b => b.id === editingId ? {
        ...b,
        title: formTitle,
        excerpt: formExcerpt,
        category: formCategory,
        author: formAuthor,
        content: formContent,
        image: formImage || b.image,
        date: formDate
      } : b);
      setBlogsList(updated);
      // Update selected modal too if open
      if (selectedBlog?.id === editingId) {
        setSelectedBlog(updated.find(b => b.id === editingId) || null);
      }
    }

    setIsFormOpen(false);
  };

  // Filter list
  const filteredBlogs = blogsList.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="blog-tab-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 space-y-12 bg-[#1a1a1a] text-zinc-100 font-sans">
      
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 text-left">
        <div className="space-y-2">
          <span className="text-[10px] font-black text-[#f97316] uppercase tracking-[0.25em] block">
            INSIGHTS &amp; LOGISTICS STANDARDS
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#f97316] uppercase tracking-tighter leading-none m-0">
            Soloo Operational News &amp; Blog
          </h1>
          <p className="text-zinc-200 text-xs md:text-sm mt-3 max-w-2xl font-semibold leading-relaxed">
            Stay up to date with heavy lifting safety guides, cross-border tow routes, and terminal yard optimization case-studies written by our certified rigging engineers and active dispatch staff.
          </p>
        </div>

        {/* Add Blog Button for Admin */}
        {adminMode && (
          <button
            onClick={openAddForm}
            className="bg-[#f97316] hover:bg-white text-black font-black uppercase text-xs tracking-widest py-3 px-5 border-2 border-black rounded-none flex items-center justify-center gap-2 self-start md:self-end shrink-0 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Article
          </button>
        )}
      </div>

      {/* Controls: Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-[#151515] p-5 border border-white/10">
        
        {/* Category Pill Buttons */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 border text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-[#f97316] text-black border-black' 
                  : 'bg-[#1e1e1e] text-zinc-300 border-white/10 hover:border-[#f97316]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input bar */}
        <div className="relative w-full lg:w-96">
          <input
            type="text"
            placeholder="Search blogs, authors or technical rigging terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e1e1e] text-xs text-white border-2 border-white/10 px-4 py-3 pl-10 focus:outline-none focus:border-[#f97316] uppercase font-black"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        </div>

      </div>

      {/* Grid listing of Blogs */}
      {filteredBlogs.length === 0 ? (
        <div className="p-16 border border-dashed border-white/15 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-[#f97316] mx-auto opacity-50" />
          <h3 className="font-extrabold uppercase tracking-tight text-white text-sm">No Articles Found</h3>
          <p className="text-zinc-400 text-xs max-w-sm mx-auto">Try adjusting your categories or query filters, or write a brand new article in Admin Mode.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredBlogs.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedBlog(item)}
              className="bg-[#151515] hover:bg-[#1a1a1aimg] border hover:border-[#f97316] transition-all p-4 rounded-none flex flex-col justify-between group cursor-pointer border-white/10"
            >
              <div className="space-y-4">
                {/* Blog Cover Image */}
                <div className="aspect-[16/10] w-full overflow-hidden relative border-2 border-white bg-[#1a1a1a]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black border border-[#f97316] text-[#f97316] font-black text-[9px] uppercase tracking-wider px-2.5 py-0.5">
                    {item.category}
                  </div>
                </div>

                {/* Meta details row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-zinc-400 font-bold font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#f97316]" /> {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-[#f97316]" /> {item.author}
                  </span>
                </div>

                {/* Article texts */}
                <div className="space-y-2">
                  <h3 className="text-lg font-black uppercase text-[#f97316] tracking-tight group-hover:text-white transition-colors duration-150 leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-zinc-300 font-bold leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer / Action indicators */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#f97316]">
                <div className="flex items-center gap-2">
                  <span>READ FULL INSIGHT</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#f97316]" />
                </div>

                {/* Admin quick buttons overlaid */}
                {adminMode && (
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => openEditForm(item, e)}
                      className="p-1 px-2.5 bg-zinc-800 hover:bg-[#f97316] hover:text-black border border-white/10 text-white transition-colors duration-150"
                      title="Edit article"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteBlog(item.id, e)}
                      className="p-1 px-2.5 bg-red-950 hover:bg-red-600 border border-red-800 text-red-200 hover:text-white transition-colors duration-150"
                      title="Delete article"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Safety Compliance Section */}
      <div className="border-4 border-white bg-white text-black p-8 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12 shadow-[6px_6px_0px_0px_rgba(249,115,22,1)]">
        <div className="lg:col-span-8 space-y-3">
          <span className="bg-[#f97316] text-black font-black text-[9px] uppercase px-3 py-1 tracking-widest font-mono border border-black">
            ● REGIONAL HAULAGE COMPLIANCE
          </span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-950">
            Learn and coordinate your cargo logistics according to transit laws
          </h2>
          <p className="text-xs sm:text-sm text-neutral-800 font-bold leading-relaxed">
            Our published safety papers and news bulletins empower logistics operators, refinery planners, and individual drivers with expert rigging methodologies. Soloo updates these records monthly to accommodate regional legal developments in Kenya, Uganda, and Tanzania.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3 lg:justify-end">
          <a
            href="tel:0722154729"
            className="bg-black text-[#f97316] hover:bg-[#1a1a1a] hover:text-white font-black text-xs uppercase tracking-widest py-4 px-6 text-center transition-all border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
          >
            Connect to Dispatch Desk
          </a>
        </div>
      </div>

      {/* Article Detail Presentation Overlay */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#151515] border-3 border-[#f97316] max-w-4xl w-full max-h-[90vh] flex flex-col text-left overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-black border-b border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-[#f97316] font-black uppercase tracking-widest font-mono">
                Soloo Knowledge Base • {selectedBlog.category}
              </span>
              <button
                onClick={() => setSelectedBlog(null)}
                className="text-zinc-400 hover:text-white p-2"
                title="Close reading modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
              {/* Cover Banner */}
              <div className="aspect-[21/9] w-full overflow-hidden border-2 border-white bg-black">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title & Author specs */}
              <div className="space-y-3">
                <span className="bg-[#f97316]/10 text-[#f97316] font-black text-[9px] uppercase px-3 py-1 border border-[#f97316]/25 tracking-widest">
                  {selectedBlog.category}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-tight text-white tracking-tight">
                  {selectedBlog.title}
                </h2>

                <div className="flex flex-wrap gap-4 text-xs text-zinc-400 font-bold border-b border-white/10 pb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#f97316]" /> {selectedBlog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4 text-[#f97316]" /> Author: {selectedBlog.author}
                  </span>
                </div>
              </div>

              {/* Main HTML/Markdown style layout */}
              <div className="text-zinc-100 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line font-medium max-w-3xl">
                {selectedBlog.content}
              </div>
            </div>

            {/* Modal Footer with quick admin edit if needed */}
            <div className="p-4 bg-black/50 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[10px] text-zinc-500 font-bold tracking-widest">
                DOC ID: {selectedBlog.id.toUpperCase()}
              </span>

              <div className="flex gap-2">
                {adminMode && (
                  <button
                    onClick={(e) => {
                      openEditForm(selectedBlog, e);
                    }}
                    className="bg-[#f97316] hover:bg-white text-black font-black uppercase text-xs py-2.5 px-4 rounded-none border border-black flex items-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit Article
                  </button>
                )}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-black uppercase text-xs py-2.5 px-6 rounded-none border border-white/10"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN WRITE / EDIT BLOG FORM MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          <form 
            onSubmit={handleSaveForm}
            className="bg-[#151515] border-3 border-[#f97316] max-w-3xl w-full flex flex-col text-left shadow-2xl relative"
          >
            <div className="p-4 bg-black border-b border-white/10 flex justify-between items-center">
              <h3 className="font-extrabold uppercase text-xs tracking-wider text-[#f97316] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#f97316]" /> 
                <span>{formMode === 'add' ? 'Publish New Blog Article' : 'Modify Existing Article'}</span>
              </h3>
              <button 
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-zinc-400 hover:text-white p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-5 overflow-y-auto max-h-[75vh]">
              
              {/* Title input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Safety Lifting Best Practices"
                  className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Author input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Author Name</label>
                  <input
                    type="text"
                    required
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g. Eng. Jane Doe"
                    className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316]"
                  />
                </div>

                {/* Category select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316] [&>option]:bg-[#1a1a1a]"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Excerpt text */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Excerpt (Truncated summary shown on cards)</label>
                <textarea
                  required
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="A highly condensed summary of the blog post (1-2 sentences)..."
                  className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316]"
                />
              </div>

              {/* Photo Input options - Supports base64 file upload OR URL */}
              <div className="border border-white/10 p-4 bg-black/40 space-y-3">
                <span className="text-[10px] uppercase font-black text-zinc-400 tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#f97316]" /> Choose Article Cover Photo
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload Option */}
                  <div className="flex flex-col gap-1.5 text-center p-3 border border-dashed border-white/20 bg-[#1e1e1e]">
                    <span className="text-[10px] uppercase text-[#f97316] font-bold">Select Local Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="text-xs text-zinc-400 block w-full mt-1 cursor-pointer"
                    />
                    <span className="text-[9px] text-zinc-500">Converts instantly and stores in local sandbox</span>
                  </div>

                  {/* URL Text Option */}
                  <div className="flex flex-col gap-1.5 justify-center">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Or Paste Image URL</span>
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="bg-[#1e1e1e] border-2 border-white/10 py-2 px-3 text-xs text-white focus:outline-none focus:border-[#f97316]"
                    />
                  </div>
                </div>

                {formImage && (
                  <div className="mt-2 border border-white/15 p-2 bg-[#1a1a1a]">
                    <span className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold block mb-1">Image Preview:</span>
                    <img 
                      src={formImage} 
                      alt="Mini Preview" 
                      className="max-h-24 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Calendar Date override */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Publish Date Line</label>
                <input
                  type="text"
                  required
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  placeholder="e.g. June 05, 2026"
                  className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316]"
                />
              </div>

              {/* Main Content text */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">Full Article Content (Markup supported)</label>
                <textarea
                  required
                  rows={8}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="### Section Heading&#10;Write full paragraphs here... Use standard spacing."
                  className="bg-[#1e1e1e] border-2 border-white/10 py-2.5 px-4 text-sm text-zinc-100 focus:outline-none focus:border-[#f97316]"
                />
              </div>

            </div>

            <div className="p-4 bg-black border-t border-white/10 flex justify-end gap-3.5">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-black uppercase text-xs tracking-widest py-3 px-6 rounded-none cursor-pointer border border-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#f97316] hover:bg-white text-black font-black uppercase text-xs tracking-widest py-3 px-8 rounded-none cursor-pointer border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                Save &amp; Publish
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
