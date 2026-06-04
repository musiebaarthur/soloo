/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Compass, Clock, CheckCircle2, ChevronRight, HardHat, FileText, AlertCircle } from 'lucide-react';

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

  const officesPool = [
    {
      title: 'Central Command & Dispatch HQs',
      address: 'Soloo Tower yard, Mombasa Road (Adj. City Cabanas), Nairobi, Kenya',
      hours: '24 Hours / 7 Days / 365 Days',
      phones: ['0722154729', '0735154729'],
      scope: 'Heavy crane mobilization, warehouse loading forklifts, flatbeds, and nationwide logistics routing.'
    },
    {
      title: 'Waiyaki Way Patrol Standby Node',
      address: 'Standby Wrecker Station (Near Regen/Kangemi Flyover Interchange), Nairobi',
      hours: '24 Hours Standby Patrol',
      phones: ['0722154729'],
      scope: 'Express recovery flatbeds for standard cars, SUVs, and immediate battery boost / flat tire tire swaps.'
    },
    {
      title: 'Thika Highway Regional Terminal',
      address: 'Standby Yard (Near Clay Works Roundabout), Thika Superhighway',
      hours: '24 Hours Standby Patrol',
      phones: ['0735154729'],
      scope: 'Medium wheel-lifts, container forklifts, and heavy bus towing on North-Eastern bypass loops.'
    }
  ];

  return (
    <div id="contact-tab-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 space-y-16 bg-[#1a1a1a]">
      
      {/* Intro Header */}
      <div className="text-left border-b border-white/10 pb-6 max-w-4xl">
        <span className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.25em] block">
          24/7 COMMAND DESK ACTIVE
        </span>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mt-2 leading-none">
          Immediate Towing &amp; <br />
          <span className="text-[#fbbf24]">Recovery Support Services</span>
        </h1>
        <p className="text-[#f4f4f5] text-xs md:text-sm mt-3 max-w-2xl leading-relaxed font-semibold">
          Need a heavy-duty crane quote, commercial machinery forklift contract, or standard highway rescue? Connect instantly to our active command center.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
        
        {/* Contact details & Phones (5 cols) */}
        <div id="contact-details-panel" className="lg:col-span-5 bg-[#151515] p-6 md:p-8 space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="space-y-6">
            <h2 className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              Direct Emergency Hotlines
            </h2>

            {/* Primary Quick Emergency Hotlines Card */}
            <div className="bg-[#fbbf24] p-6 text-black relative overflow-hidden rounded-none border border-black/15">
              <div className="space-y-4 relative z-10 text-left">
                <div className="flex items-center gap-2.5">
                  <span className="bg-black text-[#fbbf24] font-black text-[9px] uppercase px-3 py-1 animate-pulse tracking-widest font-mono">
                    ● 24 HR DISPATCH RADAR
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black leading-snug">
                  Talk directly to active operators for instant driver routing
                </h3>

                <div className="space-y-3 pt-2">
                  <a
                    href="tel:0722154729"
                    className="bg-black text-white hover:bg-neutral-900 font-black text-lg py-4 px-4 flex items-center justify-between transition-colors rounded-none border border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#fbbf24] shrink-0" />
                      <span className="font-mono">0722 154 729</span>
                    </div>
                    <span className="text-[10px] text-[#fbbf24] font-black border border-[#fbbf24]/30 py-0.5 px-2 tracking-wider font-mono">Safaricom</span>
                  </a>

                  <a
                    href="tel:0735154729"
                    className="bg-black text-white hover:bg-neutral-900 font-black text-lg py-4 px-4 flex items-center justify-between transition-colors rounded-none border border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#fbbf24] shrink-0" />
                      <span className="font-mono">0735 154 729</span>
                    </div>
                    <span className="text-[10px] text-[#fbbf24] font-black border border-[#fbbf24]/30 py-0.5 px-2 tracking-wider font-mono">Airtel</span>
                  </a>
                </div>

                <p className="text-[10px] text-black/80 leading-normal font-bold italic pt-1">
                  *Standard call rates apply. Dispatch dispatcher James Koech or controller Sarah will instantly capture your precise highway breakdown coordinates.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats overview cards */}
          <div className="bg-black/30 border border-white/5 p-5 mt-6 space-y-4 text-left">
            <h4 className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Standby Response Metrics</h4>
            
            <div className="space-y-3 text-xs leading-relaxed text-[#e4e4e7] font-semibold">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <p><strong>24/7/365 On Watch</strong>: Shift crew, heavy riggers, and crane planners operate rotating shifts for continuous security.</p>
              </div>

              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <p><strong>Sub-25 Min Response</strong>: Multi-point bypass patrol fleets ensure rapid mobilization in all Greater Nairobi sectors.</p>
              </div>

              <div className="flex items-start gap-2.5">
                <HardHat className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <p><strong>Standard Liability Guarantee</strong>: All recovery lifts, forklift leasing, and cargo movements are fully insured.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Support Form (7 cols) */}
        <div id="contact-messaging-panel" className="lg:col-span-7 bg-[#101010] p-6 md:p-8 space-y-6 text-left">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[9px] text-[#fbbf24] font-black uppercase tracking-widest block">Online Request Service</span>
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white mt-1 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#fbbf24] shrink-0" /> Web Inquiry ticketing
            </h2>
            <p className="text-xs text-[#cbd5e1] font-semibold leading-relaxed">
              Have a future logistics contract, forklift hire inquiry, or general feedback? Send us a message and our corporate operations office will respond within 4 hours.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-none text-xs text-red-350 font-bold flex gap-2.5 items-start">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {submitted && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 text-xs text-emerald-400 font-black text-center uppercase tracking-wider font-mono">
              Inquiry Ticket Logged: #SOLOO-INQ-{Math.floor(1000 + Math.random() * 9000)}. Our representatives will contact you shortly.
            </div>
          )}

          <form id="inquiring-webbox-form" onSubmit={handleMessageSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="inq-name" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Full Name *</label>
                <input
                  id="inq-name"
                  type="text"
                  required
                  placeholder="e.g. Arthur Musieba"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#fbbf24]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="inq-email" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Email Address *</label>
                <input
                  id="inq-email"
                  type="email"
                  required
                  placeholder="e.g. arthur@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#fbbf24]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="inq-phone" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Phone (Optional)</label>
                <input
                  id="inq-phone"
                  type="tel"
                  placeholder="e.g. 0722154729"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#fbbf24]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="inq-category" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Inquiry Category *</label>
                <select
                  id="inq-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#fbbf24] [&>option]:bg-[#1a1a1a]"
                >
                  <option value="Inquiry">General Recovery Inquiry</option>
                  <option value="CraneContract">Heavy Crane Lease Contract</option>
                  <option value="ForkliftHire">Forklift Rental &amp; Operator Team</option>
                  <option value="CorporateLogistics">Corporate Depot Storage Contract</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="inq-message" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Requirement Details *</label>
              <textarea
                id="inq-message"
                required
                rows={4}
                placeholder="Details of vehicle specifications, lift requirements, site coordinates, or lease timing schedule..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#fbbf24]"
              />
            </div>

            <button
              id="btn-inq-submit"
              type="submit"
              className="w-full bg-[#fbbf24] hover:bg-white text-black font-black py-4 text-xs uppercase tracking-widest transition-colors rounded-none flex items-center justify-center gap-2"
            >
              Submit Inquiry Ticket <Send className="w-4 h-4 text-black" />
            </button>
          </form>
        </div>
      </div>

      {/* Office Locations Standby Network segment details */}
      <div id="standby-locations-grid" className="space-y-6 text-left">
        <h3 className="text-xs font-black uppercase text-[#fbbf24] tracking-widest pb-3 border-b border-white/10 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#fbbf24]" /> Active Standby Depots &amp; Coverage Points
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {officesPool.map((office, idx) => (
            <div
              key={idx}
              id={`office-${idx}`}
              className="bg-[#151515] border border-white/10 p-6 rounded-none space-y-4 flex flex-col justify-between hover:border-[#fbbf24]/50 transition-colors"
            >
              <div className="space-y-3">
                <span className="text-[9px] bg-[#fbbf24]/10 border border-[#fbbf24]/20 text-[#fbbf24] font-black uppercase px-2.5 py-1 tracking-wider block w-fit font-mono">
                  {office.hours}
                </span>

                <h4 className="font-black text-white text-base leading-tight uppercase tracking-tight">{office.title}</h4>
                <p className="text-xs text-[#cbd5e1] font-bold">{office.address}</p>
                <p className="text-[11px] text-zinc-350 font-bold leading-relaxed italic border-t border-white/5 pt-3">
                  Scope: {office.scope}
                </p>
              </div>

              {/* Call office link */}
              <div className="border-t border-white/5 pt-4 flex flex-wrap gap-2">
                {office.phones.map((p, pIdx) => (
                  <a
                    key={pIdx}
                    href={`tel:${p}`}
                    className="flex-1 bg-[#1a1a1a] border border-white/10 hover:border-white text-white font-black text-[10px] uppercase tracking-wider py-2 text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#fbbf24]" /> Call {p}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
