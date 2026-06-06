/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Compass, Clock, Send, HardHat, FileText, AlertCircle } from 'lucide-react';

export default function ContactTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !message) {
      setErrorMsg('Kindly fill in all required fields (Name, Email, Message) to process your dispatch inquiry.');
      return;
    }

    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setCategory('Inquiry');
    setMessage('');

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div id="contact-tab-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 space-y-16 bg-white text-zinc-900 select-none">
      
      {/* Intro Header */}
      <div className="text-left pb-5 select-none border-b border-zinc-200">
        <span className="text-[10px] font-black text-[#f97316] uppercase tracking-[0.25em] block mb-2">
          24/7 ACTIVE DISPATCH RADAR
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-neutral-950 uppercase tracking-tighter leading-none m-0">
          Immediate Towing &amp; Heavy Crane Support
        </h1>
        <p className="text-zinc-650 text-xs md:text-sm mt-4 max-w-xl leading-relaxed font-bold">
          Request real-time rotator cranes, flatbed setups, or forklift equipment across East African corridors. Contact our main office directly or submit an online request ticket below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-zinc-200 shadow-xl">
        
        {/* Contact details & Phones (5 cols) */}
        <div id="contact-details-panel" className="lg:col-span-5 bg-zinc-50 p-6 md:p-8 space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-200">
          <div className="space-y-6">
            <h2 className="text-xs font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
              Direct Rescue Lines
            </h2>

            {/* Primary Quick Emergency Hotlines Card */}
            <div className="bg-[#f97316] p-6 text-black relative overflow-hidden rounded-none border border-black/15">
              <div className="space-y-4 relative z-10 text-left">
                <div className="flex items-center gap-2.5">
                  <span className="bg-black text-[#f97316] font-black text-[9px] uppercase px-3 py-1 animate-pulse tracking-widest font-mono">
                    ● ACTIVE SHIFT CREW
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight text-neutral-950 leading-snug">
                  Talk directly to duty planners for speed-focused dispatch
                </h3>

                <div className="space-y-3 pt-2">
                  <a
                    href="tel:0722154729"
                    className="bg-black text-white hover:bg-neutral-900 font-bold text-md py-3.5 px-4 flex items-center justify-between transition-colors rounded-none"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#f97316] shrink-0" />
                      <span className="font-mono text-sm sm:text-base">0722 154 729</span>
                    </div>
                    <span className="text-[9px] text-[#f97316] font-black border border-[#f97316]/30 py-0.5 px-2 tracking-wider font-mono">SAFARICOM</span>
                  </a>

                  <a
                    href="tel:0735154729"
                    className="bg-black text-white hover:bg-neutral-900 font-bold text-md py-3.5 px-4 flex items-center justify-between transition-colors rounded-none"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#f97316] shrink-0" />
                      <span className="font-mono text-sm sm:text-base">0735 154 729</span>
                    </div>
                    <span className="text-[9px] text-[#f97316] font-black border border-[#f97316]/30 py-0.5 px-2 tracking-wider font-mono">AIRTEL</span>
                  </a>
                </div>

                <p className="text-[9px] text-black/80 leading-normal font-bold italic pt-1">
                  *Our shifts are active 24/7/365 to capture breakdowns instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats overview cards */}
          <div className="bg-white border border-zinc-200 p-5 mt-6 space-y-4 text-left">
            <h4 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Network Standby Metrics</h4>
            
            <div className="space-y-3 text-xs leading-relaxed text-zinc-700 font-semibold">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                <p><strong>Rotating Shifts</strong>: Station yard riggers, mechanics, and dispatchers handle continuous operations.</p>
              </div>

              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                <p><strong>Corridor Watch</strong>: Patrol assets along Nairobi-Kisumu-Malaba routes provide immediate rescue.</p>
              </div>

              <div className="flex items-start gap-2.5">
                <HardHat className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                <p><strong>Fully Covered Carrier Liability</strong>: All recovery hoisting and transport actions are fully insured.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Support Form (7 cols) */}
        <div id="contact-messaging-panel" className="lg:col-span-7 bg-white p-6 md:p-8 space-y-6 text-left">
          <div className="border-b border-zinc-200 pb-4">
            <span className="text-[9px] text-[#f97316] font-black uppercase tracking-widest block">Operational Booking Desk</span>
            <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight text-neutral-950 mt-1 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#f97316] shrink-0" /> Web Inquiry ticketing
            </h2>
            <p className="text-xs text-zinc-650 font-bold leading-relaxed">
              Seeking a project quote, yard leasing terms, or forklift contract? Leave your parameters and a duty officer will email you back within 4 hours.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-none text-xs text-red-750 font-bold flex gap-2.5 items-start">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {submitted && (
            <div className="bg-emerald-500/15 border border-emerald-500/30 p-4 text-xs text-emerald-800 font-black text-center uppercase tracking-wider font-mono">
              Inquiry Logged: #SOLOO-TKT-{Math.floor(1000 + Math.random() * 9000)}. Our controllers will reach out to you immediately.
            </div>
          )}

          <form id="inquiring-webbox-form" onSubmit={handleMessageSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="inq-name" className="text-[9.5px] font-black text-zinc-500 uppercase tracking-widest block">Full Name *</label>
                <input
                  id="inq-name"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-50 text-black rounded-none px-4 py-2.5 text-xs border border-zinc-300 focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="inq-email" className="text-[9.5px] font-black text-zinc-500 uppercase tracking-widest block">Email Address *</label>
                <input
                  id="inq-email"
                  type="email"
                  required
                  placeholder="e.g. john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 text-black rounded-none px-4 py-2.5 text-xs border border-zinc-300 focus:outline-none focus:border-[#f97316]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="inq-phone" className="text-[9.5px] font-black text-zinc-500 uppercase tracking-widest block">Phone (Optional)</label>
                <input
                  id="inq-phone"
                  type="tel"
                  placeholder="e.g. 0722154729"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-50 text-black rounded-none px-4 py-2.5 text-xs border border-zinc-300 focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="inq-category" className="text-[9.5px] font-black text-zinc-500 uppercase tracking-widest block">Inquiry Category *</label>
                <select
                  id="inq-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-50 text-black rounded-none px-4 py-2.5 text-xs border border-zinc-300 focus:outline-none focus:border-[#f97316] [&>option]:bg-white"
                >
                  <option value="Inquiry">General Emergency Towing</option>
                  <option value="CraneContract">Heavy Duty Lifting Cranes</option>
                  <option value="ForkliftHire">Forklift Fleet Lease / Hiring</option>
                  <option value="CorporateLogistics">Specialized Depot Contracting</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="inq-message" className="text-[9.5px] font-black text-zinc-500 uppercase tracking-widest block">Requirement Details *</label>
              <textarea
                id="inq-message"
                required
                rows={4}
                placeholder="Specify truck specifications, breakdown coordinates, preferred equipment types, or lease timings..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-zinc-50 text-black rounded-none px-4 py-2.5 text-xs border border-zinc-300 focus:outline-none focus:border-[#f97316]"
              />
            </div>

            <button
              id="btn-inq-submit"
              type="submit"
              className="w-full bg-[#f97316] hover:bg-neutral-950 hover:text-white text-black font-black py-4.5 text-xs uppercase tracking-widest transition-colors border-2 border-black rounded-none flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              Submit Dispatch Ticket <Send className="w-4 h-4 text-black" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
