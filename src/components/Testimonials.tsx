/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, MessageSquareCode, BadgeCheck, PencilLine, Quote, AlertCircle } from 'lucide-react';
import { Testimonial } from '../types';

export default function Testimonials() {
  const defaultTestimonials: Testimonial[] = [
    {
      id: 'test-1',
      name: 'Ephraim Omwenga',
      role: 'Heavy Logistical Fleet Manager',
      rating: 5,
      message: 'Excellent service! Our 35-ton commercial trailer overturned in a deep slope near Waiyaki Way at 3:00 AM. Soloo dispatched their rotator cranes and solved everything beautifully in under an hour. Outstanding heavy-handling certified competence.',
      date: 'May 14, 2026',
      serviceType: '40-Ton Crane Hook & Heavy Rigging',
      isVerified: true
    },
    {
      id: 'test-2',
      name: 'Grace Wambui',
      role: 'Commercial Warehouse Site Supervisor',
      rating: 5,
      message: 'We hired two diesel forklifts (7 Tons lifting caps) from Soloo for offloading sensitive medical generators. Their licensed handlers did it cleanly without any issues. High quality machinery and very cooperative professionals.',
      date: 'April 28, 2026',
      serviceType: 'Toyota/CAT Forklift Rental Hire',
      isVerified: true
    },
    {
      id: 'test-3',
      name: 'Michael Kibet',
      role: 'Stranded Motorist, Nairobi Expressway',
      rating: 5,
      message: 'My Mercedes experienced complete battery and alternator meltdown. Ordered Soloo active tracking flatbed, and verified James arriving in 18 minutes! Smooth payment via M-Pesa STK prompt and excellent professional behavior.',
      date: 'March 11, 2026',
      serviceType: '24/7 Flatbed & Vehicle Towing',
      isVerified: true
    },
    {
      id: 'test-4',
      name: 'Salim Athman',
      role: 'Private SUV Owner',
      rating: 4,
      message: 'Solid puncture tire change and fuel delivery. Stranded around Githurai, and they arrived quite quickly. Great roadside support.',
      date: 'Feb 19, 2026',
      serviceType: 'Specialized Roadside Assist',
      isVerified: false
    }
  ];

  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formMessage, setFormMessage] = useState('');
  const [formService, setFormService] = useState('24/7 Flatbed & Vehicle Towing');
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load reviews from localStorage or set defaults
  useEffect(() => {
    const saved = localStorage.getItem('soloo-reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(defaultTestimonials);
      }
    } else {
      setReviews(defaultTestimonials);
    }
  }, []);

  const saveReviews = (updated: Testimonial[]) => {
    setReviews(updated);
    localStorage.setItem('soloo-reviews', JSON.stringify(updated));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formName || !formMessage) {
      setErrorMsg('Required field missing. Please fill out your Name and Review message.');
      return;
    }

    const newReview: Testimonial = {
      id: `custom-${Date.now()}`,
      name: formName,
      role: formRole || 'Verified Customer',
      rating: formRating,
      message: formMessage,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      serviceType: formService,
      isVerified: true // Set to auto-verified for simulated interface
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);

    // Reset states
    setFormName('');
    setFormRole('');
    setFormRating(5);
    setFormMessage('');
    setSuccessMsg(true);
    setFormIsOpen(false);

    // Timeout alert success
    setTimeout(() => {
      setSuccessMsg(false);
    }, 5500);
  };

  return (
    <div id="testimonials-section-widget" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 space-y-10">
      
      {/* Testimonials Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 text-left">
        <div className="space-y-2">
          <span className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.25em] block">
            REAL HIGHWAY RESCUES
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Trusted by Kenyan Motorists <br />
            <span className="text-[#fbbf24]">&amp; Logistics Firms</span>
          </h2>
          <p className="text-[#f4f4f5] text-xs md:text-sm max-w-2xl leading-relaxed font-semibold">
            Read authentic breakdown experiences from our corporate warehousing logicians, stranded cross-regional motorists, and active heavy-haul operations directors.
          </p>
        </div>

        <button
          id="btn-write-review-toggle"
          onClick={() => {
            setFormIsOpen(!formIsOpen);
            setErrorMsg('');
          }}
          className="bg-[#fbbf24] hover:bg-white text-black font-black uppercase py-4 px-6 text-xs tracking-widest transition-colors rounded-none flex items-center justify-center gap-2 shrink-0 self-start md:self-end"
        >
          <PencilLine className="w-4 h-4 text-black" /> Write A Testimonial
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-none text-center text-xs text-emerald-400 max-w-xl mx-auto tracking-wide font-bold animate-bounce shadow">
          🎉 THANK YOU! Your verified recovery review has been logged and published instantly in the customer feed!
        </div>
      )}

      {/* Review Submission Accordion Pop-up Box */}
      {formIsOpen && (
        <form
          id="review-submission-form"
          onSubmit={handleReviewSubmit}
          className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-6 md:p-8 rounded-none space-y-5 text-left"
        >
          <div className="border-b border-white/10 pb-2">
            <h3 className="text-sm font-black text-[#fbbf24] uppercase tracking-widest">Share Your Soloo Trucks Recovery Experience</h3>
            <p className="text-[10px] text-zinc-300 mt-1 font-semibold">Your feedback helps us refine response and rigging parameters.</p>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-none flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="rev-input-name" className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Your Name *</label>
              <input
                id="rev-input-name"
                type="text"
                required
                placeholder="e.g. Ephraim Mwangi"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full bg-[#151515] text-white rounded-none px-3 py-2 text-xs border border-white/15 focus:outline-none focus:border-[#fbbf24]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="rev-input-role" className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Role / Enterprise (Optional)</label>
              <input
                id="rev-input-role"
                type="text"
                placeholder="e.g. Isuzu Fleet Manager"
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
                className="w-full bg-[#151515] text-white rounded-none px-3 py-2 text-xs border border-white/15 focus:outline-none focus:border-[#fbbf24]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service Category Selection */}
            <div className="space-y-1">
              <label htmlFor="rev-input-service" className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Service Category Rendered</label>
              <select
                id="rev-input-service"
                value={formService}
                onChange={(e) => setFormService(e.target.value)}
                className="w-full bg-[#151515] text-white rounded-none px-3 py-2 text-xs border border-white/15 focus:outline-none focus:border-[#fbbf24] [&>option]:bg-[#1a1a1a]"
              >
                <option value="24/7 Flatbed & Vehicle Towing">24/7 Flatbed & Vehicle Towing</option>
                <option value="40-Ton Crane Hook & Heavy Rigging">40-Ton Crane Hook & Heavy Rigging</option>
                <option value="Toyota/CAT Forklift Rental Hire">Toyota/CAT Forklift Rental Hire</option>
                <option value="Specialized Roadside Assist">Specialized Roadside Assist</option>
              </select>
            </div>

            {/* Rating Stars choosing */}
            <div className="space-y-1">
              <label htmlFor="rev-input-rating" className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Rating Score</label>
              <div className="flex items-center gap-1.5 h-8">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormRating(num)}
                    className="p-1 hover:scale-110 transition-transform"
                    aria-label={`Rate ${num} Stars`}
                  >
                    <Star className={`w-5 h-5 ${num <= formRating ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-gray-600'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback message */}
          <div className="space-y-1">
            <label htmlFor="rev-input-msg" className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Your Review Description *</label>
            <textarea
              id="rev-input-msg"
              required
              rows={3}
              placeholder="Tell other motorists or enterprises how our operators assisted. (Response rate, driver care, safety precautions, crane heavy rigging, etc.)"
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
              className="w-full bg-[#151515] text-white rounded-none px-3 py-2 text-xs border border-white/15 focus:outline-none focus:border-[#fbbf24]"
            />
          </div>

          <div className="flex gap-4 justify-end border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setFormIsOpen(false)}
              className="px-4 py-2 text-gray-400 hover:text-white text-xs font-black uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#fbbf24] hover:bg-white text-black font-black uppercase px-6 py-3.5 text-xs tracking-widest transition-colors rounded-none"
            >
              Submit Review Profile
            </button>
          </div>
        </form>
      )}

      {/* Grid of testimonials */}
      <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-white/10">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            id={`test-card-${rev.id}`}
            className="bg-white/5 border-r border-b border-white/10 p-6 flex flex-col justify-between hover:bg-[#fbbf24]/5 transition-colors relative group text-left"
          >
            {/* Absolute decorative Quote icon */}
            <Quote className="absolute right-4 top-4 w-8 h-8 text-white/5 pointer-events-none group-hover:text-[#fbbf24]/10 transition-colors" />

            <div className="space-y-4">
              {/* Star line */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-gray-700'
                    }`}
                  />
                ))}
              </div>

              {/* Message text description */}
              <p className="text-[#f4f4f5] text-xs md:text-sm leading-relaxed italic font-medium">
                &ldquo;{rev.message}&rdquo;
              </p>
            </div>

            {/* Author Profile section */}
            <div className="border-t border-white/10 pt-4 mt-6 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-extrabold text-[#fbbf24] text-xs sm:text-sm tracking-tight">{rev.name}</h4>
                  <p className="text-[10px] text-zinc-300 leading-tight mt-0.5 font-semibold">{rev.role}</p>
                </div>
                {rev.isVerified && (
                  <div className="flex items-center gap-0.5 border border-emerald-500/30 bg-emerald-500/10 px-1 py-0.5 shrink-0" title="Verified Soloo Trucks Recovery Client">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[8px] text-emerald-400 font-black tracking-widest uppercase">Verified</span>
                  </div>
                )}
              </div>

              {/* Tag information detailing service and date */}
              <div className="flex items-center justify-between gap-2 text-[9px] text-[#cbd5e1] font-black uppercase">
                <span className="p-1 px-1.5 bg-black/30 border border-white/5 line-clamp-1 max-w-[70%] tracking-wider">{rev.serviceType}</span>
                <span className="shrink-0 tracking-tight font-mono">{rev.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
