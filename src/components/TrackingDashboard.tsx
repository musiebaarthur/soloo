/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Truck, ShieldCheck, MapPin, UserCheck, CreditCard, 
  ArrowRight, Landmark, BadgeCheck, Compass, PhoneCall, 
  Star, Timer, RefreshCw, AlertCircle, Sparkles, Navigation,
  Coins
} from 'lucide-react';
import { BookingRequest, TrackingState, TrackingStatus, PaymentMethod } from '../types';

interface TrackingDashboardProps {
  preselectedServiceId: string;
  onBookingCreated?: (booking: BookingRequest) => void;
}

export default function TrackingDashboard({ preselectedServiceId, onBookingCreated }: TrackingDashboardProps) {
  // Booking Form States
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [pickupLoc, setPickupLoc] = useState('Mombasa Road - Syokimau');
  const [customPickup, setCustomPickup] = useState('');
  const [dropoffLoc, setDropoffLoc] = useState('CMC Motors Yard Nairobi');
  const [customDropoff, setCustomDropoff] = useState('');
  const [serviceId, setServiceId] = useState(preselectedServiceId || 'light-tow');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MPESA');
  
  // Card Details States
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Form error message instead of browser alert
  const [bookingError, setBookingError] = useState('');

  // App Sequence States: 'BOOKING' | 'PAYING' | 'TRACKING'
  const [phase, setPhase] = useState<'BOOKING' | 'PAYING' | 'TRACKING'>('BOOKING');
  
  // Payment Simulation States
  const [isProcessingPay, setIsProcessingPay] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [stkPromptSent, setStkPromptSent] = useState(false);

  // Active Booking
  const [activeBooking, setActiveBooking] = useState<BookingRequest | null>(null);

  // Tracking Live State
  const [tracking, setTracking] = useState<TrackingState>({
    bookingId: 'MOCK-DEMO-991',
    status: 'RECEIVED',
    statusText: 'Booking accepted & queued for immediate dispatch.',
    driverName: 'John Doe',
    driverPhone: '0722154729',
    driverVehicle: 'Scania Heavy Underlift 380HP',
    driverPlate: 'KCD 412X',
    driverRating: 4.95,
    etaMinutes: 18,
    routeProgress: 5
  });

  // Keep tracking dropdown service synced with preselectedServiceId
  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  // Pricing Dictionary
  const basePrices: Record<string, number> = {
    'light-tow': 5000,
    'heavy-crane': 15000,
    'forklift': 8000,
    'roadside': 3000
  };

  const perKmPrices: Record<string, number> = {
    'light-tow': 150,
    'heavy-crane': 350,
    'forklift': 200,
    'roadside': 100
  };

  const getEstimatedDistance = () => {
    const str = pickupLoc + dropoffLoc;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs((hash % 35) + 8); // 8 to 43 KMs
  };

  const calculateCost = () => {
    const base = basePrices[serviceId] || 5000;
    const perKm = perKmPrices[serviceId] || 150;
    const distance = getEstimatedDistance();
    return base + (distance * perKm);
  };

  // Tracking Automatic ticks
  useEffect(() => {
    if (phase !== 'TRACKING') return;

    const interval = setInterval(() => {
      setTracking((prev) => {
        let nextProgress = prev.routeProgress + 8;
        if (nextProgress > 100) nextProgress = 100;

        let nextStatus: TrackingStatus = prev.status;
        let text = prev.statusText;
        let nextEta = Math.max(1, Math.round(prev.etaMinutes - (nextProgress / 100) * 4));

        if (nextProgress >= 100) {
          nextStatus = 'COMPLETED';
          text = 'Mission Successful! Stranded vehicle delivered to designated destination.';
          nextEta = 0;
        } else if (nextProgress >= 80) {
          nextStatus = 'SECURED';
          text = 'Breakdown safely mounted. Moving to drop-off point.';
        } else if (nextProgress >= 50) {
          nextStatus = 'ARRIVED';
          text = 'Towing operator James reached your breakdown coordinates. Rigging in process.';
          nextEta = Math.max(2, nextEta);
        } else if (nextProgress >= 25) {
          nextStatus = 'EN_ROUTE';
          text = 'Driver is en-route, fully equipped. Accelerating on main highway corridor.';
        } else if (nextProgress >= 12) {
          nextStatus = 'DISPATCHED';
          text = 'Heavy unit assigned & cleared for departure from Mombasa Road depot.';
        }

        return {
          ...prev,
          routeProgress: nextProgress,
          status: nextStatus,
          statusText: text,
          etaMinutes: nextEta
        };
      });
    }, 12000); // Progress updates every 12 seconds

    return () => clearInterval(interval);
  }, [phase]);

  // Form Booking Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');

    if (!customerName || !customerPhone || !vehicleModel) {
      setBookingError('All fields marked with an asterisk (*) are strictly required prior to emergency dispatch.');
      return;
    }

    const newBooking: BookingRequest = {
      id: `SOLOO-BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      pickupLocation: pickupLoc === 'OTHER' ? customPickup : pickupLoc,
      dropoffLocation: dropoffLoc === 'OTHER' ? customDropoff : dropoffLoc,
      serviceId,
      vehicleModel,
      paymentMethod,
      estimatedCost: calculateCost(),
      timestamp: new Date().toLocaleTimeString()
    };

    setActiveBooking(newBooking);
    
    // Switch to Payment stage
    setPhase('PAYING');
    setPaySuccess(false);
    setStkPromptSent(false);
  };

  // Payment Simulators
  const triggerMpesaSTK = () => {
    setStkPromptSent(true);
    setIsProcessingPay(true);
    // Simulate mobile network delay
    setTimeout(() => {
      setIsProcessingPay(false);
      setPaySuccess(true);
    }, 3000);
  };

  const triggerCardProcessing = () => {
    setIsProcessingPay(true);
    setTimeout(() => {
      setIsProcessingPay(false);
      setPaySuccess(true);
    }, 2800);
  };

  const finalizeBookingAndTrack = () => {
    if (!activeBooking) return;
    
    setTracking({
      bookingId: activeBooking.id,
      status: 'RECEIVED',
      statusText: `Towing request logged. Securing Scania truck dispatch for K-Series ${activeBooking.vehicleModel}.`,
      driverName: 'Robert Ndiwa',
      driverPhone: '0735154729',
      driverVehicle: 'Mercedes-Benz Heavy Wrecker 440HP',
      driverPlate: 'KCF 823L',
      driverRating: 4.98,
      etaMinutes: 24,
      routeProgress: 2
    });

    if (onBookingCreated) {
      onBookingCreated(activeBooking);
    }

    setPhase('TRACKING');
  };

  // Fast-Forward Tracking manually for easy testing
  const handleStepAdvance = () => {
    setTracking((prev) => {
      const statusCycle: TrackingStatus[] = ['RECEIVED', 'DISPATCHED', 'EN_ROUTE', 'ARRIVED', 'SECURED', 'COMPLETED'];
      const currentIdx = statusCycle.indexOf(prev.status);
      const nextIdx = (currentIdx + 1) % statusCycle.length;
      
      const nextProgress = Math.min(100, Math.round(((nextIdx + 1) / statusCycle.length) * 100));
      const nextStatus = statusCycle[nextIdx];
      
      let text = prev.statusText;
      let nextEta = prev.etaMinutes;

      switch (nextStatus) {
        case 'RECEIVED':
          text = 'Towing dispatch coordinates mapped successfully.';
          nextEta = 25;
          break;
        case 'DISPATCHED':
          text = 'Heavy unit assigned & departing depot workspace.';
          nextEta = 20;
          break;
        case 'EN_ROUTE':
          text = 'Towing operator en-route on the arterial mainway.';
          nextEta = 14;
          break;
        case 'ARRIVED':
          text = 'Operator has arrived at breakdown site safely.';
          nextEta = 3;
          break;
        case 'SECURED':
          text = 'Vehicle secured with heavy recovery slings on the active platform.';
          nextEta = 1;
          break;
        case 'COMPLETED':
          text = 'Mission complete. Stranded vehicle towed successfully.';
          nextEta = 0;
          break;
      }

      return {
        ...prev,
        status: nextStatus,
        routeProgress: nextStatus === 'COMPLETED' ? 100 : nextProgress,
        statusText: text,
        etaMinutes: nextEta
      };
    });
  };

  const handleReset = () => {
    setPhase('BOOKING');
    setActiveBooking(null);
  };

  const routeLandmarks = [
    'Mombasa Road - Syokimau',
    'Waiyaki Way - Westlands',
    'Thika Superhighway - Githurai',
    'Jogoo Road - City Stadium',
    'Southern Bypass - Langata Intersection',
    'Mombasa Road - General Motors',
    'Waiyaki Way - Kangemi Flyover',
    'Thika Road - Roysambu Roundabout',
    'OTHER'
  ];

  const destinationYardPool = [
    'Soloo Recovery Central Yard (Mombasa Road)',
    'CMC Motors Repair Facility',
    'Toyota Kenya Dealership Yard',
    'Home / Custom Private Residence',
    'OTHER'
  ];

  return (
    <div id="booking-tracking-container" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 space-y-12 bg-[#1a1a1a] text-white">
      
      {/* PHASE 1: STANDARD ENGINE DISPATCH BOOKING FORM */}
      {phase === 'BOOKING' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
          
          {/* Dispatch Form Inputs (7 cols) */}
          <form id="dispatch-form" onSubmit={handleFormSubmit} className="lg:col-span-7 bg-[#151515] p-6 md:p-8 space-y-6 text-left">
            <div className="pb-4">
              <div className="inline-block bg-[#f97316] text-black px-4 py-3 border-2 border-black max-w-xl select-none mb-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <span className="text-[9px] font-black tracking-widest uppercase block mb-0.5">Step 1 — Mobilize Logistics Crew</span>
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter m-0 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-black shrink-0" /> Live Dispatch Hub
                </h1>
              </div>
              <p className="text-xs text-zinc-300 font-semibold mt-1">
                Lock-in priority 24/7 commercial crew routing across Kenya, Uganda, and Tanzania with secure instant GPS location telemetry.
              </p>
            </div>

            {bookingError && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-none flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{bookingError}</span>
              </div>
            )}

            {/* Quick Helper Emergency Notification */}
            <div className="bg-[#f97316]/5 border-l-4 border-[#f97316] p-4 rounded-none text-xs flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#f97316] shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-[#f97316] uppercase tracking-wider">Trapped in a slope / heavy crash?</p>
                <p className="text-gray-300 mt-1 leading-relaxed">
                  If your commercial vehicle is overturned, trapped in a deep ditch, or requires a heavy crane lift, call <a href="tel:0722154729" className="font-black text-[#f97316] underline">0722154729</a> immediately for specialized rigging configurations instead of web forms.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Name */}
              <div className="space-y-1.5">
                <label htmlFor="customer-name" className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Customer Full Name *</label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#f97316]"
                />
              </div>

              {/* Customer Phone */}
              <div className="space-y-1.5">
                <label htmlFor="customer-phone" className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Active Contact Line (Phone) *</label>
                <input
                  id="customer-phone"
                  type="tel"
                  required
                  placeholder="e.g. 0722 154 729"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#f97316]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vehicle Model */}
              <div className="space-y-1.5">
                <label htmlFor="vehicle-model" className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Vehicle Model &amp; Make *</label>
                <input
                  id="vehicle-model"
                  type="text"
                  required
                  placeholder="e.g. Mercedes Actros Prime Mover"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#f97316]"
                />
              </div>

              {/* Service Requested Option Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="booking-service-select" className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Select Fleet Class *</label>
                <select
                  id="booking-service-select"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#f97316] [&>option]:bg-[#1a1a1a]"
                >
                  <option value="light-tow">24/7 Flatbed &amp; Vehicle Towing</option>
                  <option value="heavy-crane">40-Ton Crane Hook &amp; Heavy Rigging</option>
                  <option value="forklift">Toyota/CAT Forklift Rental Hire</option>
                  <option value="roadside">Roadside Assist (Battery, Puncture, Fuel)</option>
                </select>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="pickup-select" className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Pickup Boundary (Breakdown Site) *</label>
                <select
                  id="pickup-select"
                  value={pickupLoc}
                  onChange={(e) => setPickupLoc(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#f97316] [&>option]:bg-[#1a1a1a]"
                >
                  {routeLandmarks.map((point) => (
                    <option key={point} value={point}>{point}</option>
                  ))}
                </select>
                {pickupLoc === 'OTHER' && (
                  <input
                     id="pickup-custom"
                     type="text"
                     required
                     placeholder="Describe specific highway point or link..."
                     value={customPickup}
                     onChange={(e) => setCustomPickup(e.target.value)}
                     className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2 text-xs border border-white/10 mt-2 focus:outline-none focus:border-[#f97316]"
                  />
                )}
              </div>

              {/* Dropoff Location */}
              <div className="space-y-1.5">
                <label htmlFor="dropoff-select" className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Destination Terminal / Garage *</label>
                <select
                  id="dropoff-select"
                  value={dropoffLoc}
                  onChange={(e) => setDropoffLoc(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#f97316] [&>option]:bg-[#1a1a1a]"
                >
                  {destinationYardPool.map((point) => (
                    <option key={point} value={point}>{point}</option>
                  ))}
                </select>
                {dropoffLoc === 'OTHER' && (
                  <input
                    id="dropoff-custom"
                    type="text"
                    required
                    placeholder="Describe specific garage address..."
                    value={customDropoff}
                    onChange={(e) => setCustomDropoff(e.target.value)}
                    className="w-full bg-[#1a1a1a] text-white rounded-none px-4 py-2 text-xs border border-white/10 mt-2 focus:outline-none focus:border-[#f97316]"
                  />
                )}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Simulated Payment Processing Method</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  id="pay-choice-mpesa"
                  onClick={() => setPaymentMethod('MPESA')}
                  className={`p-3 rounded-none border flex flex-col items-center justify-center gap-1.5 transition-all uppercase tracking-wider text-[11px] font-black ${
                    paymentMethod === 'MPESA'
                      ? 'bg-[#f97316]/10 border-[#f97316] text-[#f97316]'
                      : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Landmark className="w-5 h-5 shrink-0" />
                  <span>M-Pesa STK</span>
                </button>

                <button
                  type="button"
                  id="pay-choice-card"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-none border flex flex-col items-center justify-center gap-1.5 transition-all uppercase tracking-wider text-[11px] font-black ${
                    paymentMethod === 'CARD'
                      ? 'bg-[#f97316]/10 border-[#f97316] text-[#f97316]'
                      : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 shrink-0" />
                  <span>Card Auth</span>
                </button>

                <button
                  type="button"
                  id="pay-choice-cash"
                  onClick={() => setPaymentMethod('CASH')}
                  className={`p-3 rounded-none border flex flex-col items-center justify-center gap-1.5 transition-all uppercase tracking-wider text-[11px] font-black ${
                    paymentMethod === 'CASH'
                      ? 'bg-[#f97316]/10 border-[#f97316] text-[#f97316]'
                      : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Coins className="w-5 h-5 shrink-0" />
                  <span>On Arrival</span>
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button
              id="booking-submit-btn"
              type="submit"
              className="w-full bg-[#f97316] hover:bg-white text-black font-black uppercase py-4 text-xs tracking-widest transition-colors rounded-none flex items-center justify-center gap-2"
            >
              Initialize Booking &amp; Quote Pricing <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </form>

          {/* Map Preview/Estimate Dashboard (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-white/10">
            
            {/* Real-time Pricing Summary Card */}
            <div className="bg-[#101010] p-6 md:p-8 space-y-5 text-left h-full">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">Integrated Tow Ticket</h3>
              
              <div className="space-y-4">
                <div className="space-y-1 text-xs">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-[9px]">Selected Transit Route</span>
                  <div className="flex items-center gap-2 mt-2 bg-white/5 p-3 border border-white/5">
                    <span className="font-black text-white text-xs">{pickupLoc === 'OTHER' ? 'Custom Highway' : pickupLoc.split(' - ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#f97316] shrink-0" />
                    <span className="font-black text-white text-xs line-clamp-1">{dropoffLoc.split(' (')[0].split(' Yard')[0]}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 font-mono text-center">
                  <div className="bg-[#1a1a1a] p-3 border border-white/10">
                    <span className="text-[9px] uppercase text-gray-500 block font-black leading-none mb-1">Telemetry Dist.</span>
                    <span className="text-sm font-black text-[#f97316]">{getEstimatedDistance()} KM</span>
                  </div>

                  <div className="bg-[#1a1a1a] p-3 border border-white/10">
                    <span className="text-[9px] uppercase text-gray-500 block font-black leading-none mb-1">Response Guarantee</span>
                    <span className="text-sm font-black text-emerald-400 font-sans">Active</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs border-t border-white/10 pt-4 uppercase tracking-wider font-mono text-[#f97316]">
                  <div className="flex justify-between text-emerald-400 text-[10px]">
                    <span>Cargo Protection</span>
                    <span>Fully Covered</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-4 text-normal-case text-white leading-none border-t border-white/5">
                    <span className="font-black text-white text-xs uppercase tracking-widest font-sans font-semibold">Booking Status</span>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-400 tracking-tight uppercase">Complimentary Rate Processed</span>
                      <span className="text-[8px] text-zinc-400 block mt-1 uppercase tracking-wider font-sans">No immediate deposit requested</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Live Tracking Preview Banner */}
            <div className="bg-[#151515] p-6 hover:bg-[#f97316]/5 transition-colors text-left flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-4">
                <Compass className="w-10 h-10 text-[#f97316] shrink-0 mt-1 animate-spin duration-10000" />
                <div className="space-y-1.5">
                  <span className="text-[9px] bg-[#f97316]/10 border border-[#f97316]/30 text-[#f97316] px-2.5 py-0.5 font-black uppercase tracking-widest">
                    Demo Mode Included
                  </span>
                  <h3 className="text-xs uppercase font-black text-white tracking-wider">Fast-track Demo Simulator</h3>
                  <p className="text-[11px] text-gray-400 leading-normal">
                    Don't have a stranded vehicle right now? No problem. Skip the payment process and launch our realistic, pre-rendered live tracking demonstration to see the GPS GIS mapping network in real-time.
                  </p>
                </div>
              </div>
              
              <button
                type="button"
                id="btn-trigger-demo-tracking"
                onClick={() => {
                  setPhase('TRACKING');
                }}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-3.5 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-none"
              >
                Launch Tracking Simulator <Navigation className="w-3.5 h-3.5 text-[#f97316]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: PAYMENT PROCESSING SIMULATOR */}
      {phase === 'PAYING' && activeBooking && (
        <div className="max-w-xl mx-auto bg-[#151515] border border-white/10 shadow-2xl text-left">
          {/* Header */}
          <div className="bg-[#101010] p-6 border-b border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[9px] text-[#f97316] font-black uppercase tracking-widest block">Secure Payment Gateway</span>
              <h2 className="text-lg font-black uppercase tracking-tight text-white mt-1">Towing Ticket {activeBooking.id}</h2>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-emerald-400 block font-bold uppercase tracking-wider">Gate Status</span>
              <span className="text-xs font-black text-emerald-400 leading-none">Ready to Route</span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* If M-Pesa is chosen */}
            {paymentMethod === 'MPESA' && (
              <div id="mpesa-simulator-container" className="space-y-5">
                <div className="flex items-center gap-3.5 bg-emerald-500/5 p-4 border border-emerald-500/15">
                  <span className="w-10 h-10 bg-emerald-500 text-black text-xs font-black flex items-center justify-center shrink-0">
                    M
                  </span>
                  <div className="text-xs space-y-0.5">
                    <span className="font-black uppercase tracking-wide text-white block">Safaricom Sim-Toolkit STK Push</span>
                    <span className="text-gray-400 block leading-normal">Our system will trigger an automated simulated payment pop-up prompt to your simulated phone line <strong className="text-emerald-400 font-black">{activeBooking.customerPhone}</strong>.</span>
                  </div>
                </div>

                {!stkPromptSent ? (
                  <button
                    type="button"
                    id="btn-send-mpesa-stk"
                    onClick={triggerMpesaSTK}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-none"
                  >
                    Send STK push simulation prompt <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* Simulated Mobile pop-up modal */}
                    <div className="bg-black border border-emerald-500/50 max-w-sm mx-auto p-5 shadow-inner space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-[9px] text-emerald-400 font-extrabold tracking-widest uppercase font-mono">Simulated Smartphone Screen</span>
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      </div>
                      <p className="text-[11px] text-center text-zinc-200 leading-relaxed font-semibold font-mono">
                        [M-PESA SIMULATOR POPUP] <br />
                        Authorize Soloo Trucks Recovery dispatch request to <strong className="text-white">SOLOO TRUCKS RECOVERY LTD</strong>. <br />
                        Enter private 4-digit M-Pesa PIN:
                      </p>
                      <input
                        id="mpesa-pin-mock"
                        type="password"
                        placeholder="&bull; &bull; &bull; &bull;"
                        maxLength={4}
                        readOnly
                        value="1234"
                        className="w-24 bg-white/5 border border-white/15 p-2 text-center text-white tracking-widest text-lg font-black mx-auto block rounded-none select-none font-mono"
                      />
                      <p className="text-[9px] text-center text-gray-500 uppercase font-black font-mono">PIN locked to master simulation sequence &quot;1234&quot;</p>
                    </div>

                    {isProcessingPay && (
                      <div className="text-center space-y-2 py-4">
                        <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin mx-auto" />
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-mono">Authorizing transactions with Safaricom network API...</p>
                      </div>
                    )}

                    {paySuccess && (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 text-center space-y-3">
                        <BadgeCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                        <div className="space-y-0.5">
                           <p className="font-black uppercase tracking-wider text-white text-xs">Payment Confirmed!</p>
                           <p className="text-xs text-emerald-400 font-mono">MPESA Ref: QK42L8W9S received from {activeBooking.customerPhone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* If Credit Card is chosen */}
            {paymentMethod === 'CARD' && (
              <div id="card-simulator-container" className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label htmlFor="card-input-number" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Card number (16 Digits) *</label>
                    <input
                      id="card-input-number"
                      type="text"
                      required
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                      className="w-full bg-[#1a1a1a] text-white rounded-none px-3.5 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#f97316] font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="card-input-expiry" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expiry Date (MM/YY) *</label>
                      <input
                        id="card-input-expiry"
                        type="text"
                        required
                        placeholder="12/28"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#1a1a1a] text-white rounded-none px-3.5 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#f97316] font-mono text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="card-input-cvv" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CVV Security Code *</label>
                      <input
                        id="card-input-cvv"
                        type="password"
                        required
                        placeholder="***"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-[#1a1a1a] text-white rounded-none px-3.5 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#f97316] font-mono text-center"
                      />
                    </div>
                  </div>
                </div>

                {!paySuccess ? (
                  <button
                    type="button"
                    id="btn-process-card"
                    onClick={triggerCardProcessing}
                    disabled={isProcessingPay}
                    className="w-full bg-[#f97316] hover:bg-white disabled:bg-white/10 disabled:text-gray-500 text-black font-black py-4 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-none"
                  >
                    {isProcessingPay ? 'Processing payment authorization...' : 'Authorize Simulated Card Transaction'}
                  </button>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 text-center space-y-3">
                    <BadgeCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                    <div>
                      <p className="font-extrabold uppercase text-white text-xs">Visa/Mastercard Verified!</p>
                      <p className="text-xs text-emerald-400 mt-0.5 font-mono">Authorization code: #62193 secured. Proceeding to GPS track.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* If Cash was chosen */}
            {paymentMethod === 'CASH' && (
              <div id="cash-notice-container" className="space-y-4">
                <div className="bg-[#f97316]/5 border border-[#f97316]/35 p-4 space-y-2">
                  <p className="text-xs text-[#f97316] font-black uppercase tracking-wider">Cash Payment Option Confirmed</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    No immediate online transaction simulation is required. You will settle payment directly with our active recovery vehicle operator John Doe upon vehicle dropoff verification at the terminal.
                  </p>
                </div>
                
                <button
                  type="button"
                  id="btn-cash-confirm"
                  onClick={() => setPaySuccess(true)}
                  className="w-full bg-[#f97316] hover:bg-white text-black font-black py-4 text-xs uppercase tracking-widest transition-colors rounded-none"
                >
                  Proceed to GPS Truck Mapping
                </button>
              </div>
            )}
          </div>

          {/* Footer controls for tracking transitions */}
          <div className="bg-[#101010] p-5 border-t border-white/10 flex items-center justify-between gap-4">
            <button
              type="button"
              id="btn-modal-cancel"
              onClick={handleReset}
              className="text-xs text-gray-400 hover:text-white font-black uppercase tracking-wider focus:outline-none"
            >
              Cancel booking
            </button>

            <button
              type="button"
              id="btn-modal-go-track"
              disabled={!paySuccess}
              onClick={finalizeBookingAndTrack}
              className="bg-[#f97316] disabled:bg-white/5 disabled:text-gray-500 hover:bg-white text-black font-black text-xs uppercase py-3.5 px-6 tracking-widest transition-colors rounded-none flex items-center gap-1.5"
            >
              Lock-In &amp; Start Live Tracker <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3: IMMERSIVE ACTIVE TRACKER MAP DASHBOARD */}
      {phase === 'TRACKING' && (
        <div className="space-y-6">
          
          {/* Header tracker banner */}
          <div className="bg-[#151515] border border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f97316] animate-ping inline-block" />
                <span className="text-[9px] bg-[#f97316]/10 border border-[#f97316]/35 text-[#f97316] font-black uppercase px-2.5 py-0.5 tracking-widest">
                  GPS Live Dispatch Tracker Active
                </span>
              </div>
              <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white mt-1">Rescue Ticket: {tracking.bookingId}</h1>
              <p className="text-xs text-gray-400">{tracking.statusText}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Manual Incrementor for Demonstration Testing */}
              <button
                id="btn-advance-simulation-step"
                onClick={handleStepAdvance}
                className="bg-black border border-white/10 hover:border-[#f97316]/50 text-gray-300 hover:text-white px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-2 rounded-none"
                title="Advance the tracking step for demonstration purposes"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#f97316]" /> Force Step Advance
              </button>

              <button
                id="btn-reset-dispatch"
                onClick={handleReset}
                className="bg-[#101010] border border-white/10 hover:bg-white hover:text-black hover:border-white px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors rounded-none"
              >
                New Rescue Ticket
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
            
            {/* Status Timeline Left Panel (4 cols) */}
            <div id="tracker-status-timeline" className="lg:col-span-4 bg-[#151515] border-b lg:border-b-0 lg:border-r border-white/10 p-5 md:p-6 space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Dispatch Timeline</h3>
                
                {tracking.status !== 'COMPLETED' ? (
                  <div className="flex items-center gap-1.5 bg-[#f97316]/10 border border-[#f97316]/30 px-3 py-1 font-mono text-[#f97316] font-black">
                    <Timer className="w-3.5 h-3.5 text-[#f97316]" />
                    <span className="text-xs">ETA {tracking.etaMinutes} Min</span>
                  </div>
                ) : (
                  <span className="text-xs bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-extrabold px-2.5 py-0.5 font-mono">
                    SUCCESS
                  </span>
                )}
              </div>

              {/* Timeline list */}
              <div className="space-y-4 relative pl-4 border-l border-white/10 ml-2 py-1">
                {/* Stage 1: Received */}
                <div className="relative space-y-0.5">
                  <span className={`absolute -left-[25px] top-0.5 h-4.5 w-4.5 rounded-none border flex items-center justify-center ${
                    ['RECEIVED', 'DISPATCHED', 'EN_ROUTE', 'ARRIVED', 'SECURED', 'COMPLETED'].includes(tracking.status)
                      ? 'bg-[#f97316] border-[#f97316] text-black font-black'
                      : 'bg-[#1a1a1a] border-white/10'
                  }`}>
                    {['RECEIVED', 'DISPATCHED', 'EN_ROUTE', 'ARRIVED', 'SECURED', 'COMPLETED'].includes(tracking.status) && <span className="text-[9px] font-black font-mono">1</span>}
                  </span>
                  <p className="text-xs font-extrabold uppercase text-white">1. Booking Registered</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">Sourcing high-payload response setup closest to your highway breakdown node.</p>
                </div>

                {/* Stage 2: Dispatched */}
                <div className="relative space-y-0.5">
                  <span className={`absolute -left-[25px] top-0.5 h-4.5 w-4.5 rounded-none border flex items-center justify-center ${
                    ['DISPATCHED', 'EN_ROUTE', 'ARRIVED', 'SECURED', 'COMPLETED'].includes(tracking.status)
                      ? 'bg-[#f97316] border-[#f97316] text-black font-black'
                      : 'bg-[#1a1a1a] border-white/10'
                  }`}>
                    {['DISPATCHED', 'EN_ROUTE', 'ARRIVED', 'SECURED', 'COMPLETED'].includes(tracking.status) && <span className="text-[9px] font-black font-mono">2</span>}
                  </span>
                  <p className="text-xs font-extrabold uppercase text-white">2. Rig Active &amp; Dispatched</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">Rigging authorization complete. Heavy crew clearing standby depot bay.</p>
                </div>

                {/* Stage 3: En route */}
                <div className="relative space-y-0.5">
                  <span className={`absolute -left-[25px] top-0.5 h-4.5 w-4.5 rounded-none border flex items-center justify-center ${
                    ['EN_ROUTE', 'ARRIVED', 'SECURED', 'COMPLETED'].includes(tracking.status)
                      ? 'bg-[#f97316] border-[#f97316] text-black font-black'
                      : 'bg-[#1a1a1a] border-white/10'
                  }`}>
                    {['EN_ROUTE', 'ARRIVED', 'SECURED', 'COMPLETED'].includes(tracking.status) && <span className="text-[9px] font-black font-mono">3</span>}
                  </span>
                  <p className="text-xs font-extrabold uppercase text-white">3. Expressway Transit</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">Live responder accelerating on active regional high-speed bypass routes.</p>
                </div>

                {/* Stage 4: Arrived */}
                <div className="relative space-y-0.5">
                  <span className={`absolute -left-[25px] top-0.5 h-4.5 w-4.5 rounded-none border flex items-center justify-center ${
                    ['ARRIVED', 'SECURED', 'COMPLETED'].includes(tracking.status)
                      ? 'bg-[#f97316] border-[#f97316] text-black font-black'
                      : 'bg-[#1a1a1a] border-white/10'
                  }`}>
                    {['ARRIVED', 'SECURED', 'COMPLETED'].includes(tracking.status) && <span className="text-[9px] font-black font-mono">4</span>}
                  </span>
                  <p className="text-xs font-extrabold uppercase text-white">4. Rig Arrived Site</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">Warning lights active. Rigging specialist has mapped recovery logistics.</p>
                </div>

                {/* Stage 5: Secured */}
                <div className="relative space-y-0.5">
                  <span className={`absolute -left-[25px] top-0.5 h-4.5 w-4.5 rounded-none border flex items-center justify-center ${
                    ['SECURED', 'COMPLETED'].includes(tracking.status)
                      ? 'bg-[#f97316] border-[#f97316] text-black font-black'
                      : 'bg-[#1a1a1a] border-white/10'
                  }`}>
                    {['SECURED', 'COMPLETED'].includes(tracking.status) && <span className="text-[9px] font-black font-mono">5</span>}
                  </span>
                  <p className="text-xs font-extrabold uppercase text-white">5. Cargo Secured</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">Vehicle hoisted and strapped with high-tensile alloy bindings for transit safety.</p>
                </div>

                {/* Stage 6: Completed */}
                <div className="relative space-y-0.5">
                  <span className={`absolute -left-[25px] top-0.5 h-4.5 w-4.5 rounded-none border flex items-center justify-center ${
                    tracking.status === 'COMPLETED'
                      ? 'bg-emerald-500 border-emerald-500 text-black font-black'
                      : 'bg-[#1a1a1a] border-white/10'
                  }`}>
                    {tracking.status === 'COMPLETED' && <span className="text-[9px] font-black font-mono">6</span>}
                  </span>
                  <p className="text-xs font-extrabold uppercase text-white">6. Mission Completed</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">Delivered safely at yard terminal. Release paperwork signed on system.</p>
                </div>
              </div>

              {/* Driver Stats details */}
              <div className="bg-[#101010] p-4 border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 text-[#f97316] text-sm font-black flex items-center justify-center shrink-0">
                    JD
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-white">{tracking.driverName}</h4>
                    <p className="text-[9px] text-[#f97316] font-bold font-mono tracking-wider">{tracking.driverPlate} • {tracking.driverVehicle.split(' ')[0]}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Star className="w-3.5 h-3.5 fill-[#f97316] text-[#f97316]" />
                      <span className="text-[10px] font-bold text-[#f97316]">{tracking.driverRating}</span>
                      <span className="text-[10px] text-gray-500 font-mono">(840 Rescues)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="tel:0722154729"
                    className="bg-[#1a1a1a] border border-white/10 hover:border-[#f97316] text-white font-black text-[11px] uppercase tracking-wider py-2.5 transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#f97316]" /> Call Operator
                  </a>
                  <div className="bg-white/5 text-gray-500 font-black text-[9px] uppercase tracking-widest flex items-center justify-center border border-white/5 select-none font-mono">
                    GPS LOCK
                  </div>
                </div>
              </div>
            </div>

            {/* Vector SVG Route Map Simulation Right Panel (8 cols) */}
            <div id="tracker-svg-map-canvas" className="lg:col-span-8 bg-black overflow-hidden relative">
              <div className="bg-[#101010] p-4 border-b border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#f97316] animate-spin" />
                  <span className="font-extrabold uppercase text-white tracking-widest text-[10px]">VECTOR CORE GEOGRAPHY HUD</span>
                </div>
                
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-gray-400 uppercase font-black text-[9px] tracking-widest">{tracking.routeProgress}% COMPLETE</span>
                  <div className="w-20 bg-white/5 h-1.5 rounded-none overflow-hidden border border-white/10">
                    <div 
                      className="bg-[#f97316] h-full transition-all duration-300"
                      style={{ width: `${tracking.routeProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Map Illustration Grid Canvas via SVG */}
              <div className="relative h-[400px] md:h-[480px] bg-black">
                
                <svg
                  className="w-full h-full"
                  viewBox="0 0 800 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeOpacity="0.02" strokeWidth="1" />
                    </pattern>
                  </defs>
                  
                  {/* Map Grid Pattern background */}
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />

                  {/* Landscape Elements (River & Forest patches) */}
                  <path
                    d="M-20,380 C150,330 300,420 500,280 C650,170 700,210 820,110"
                    stroke="#1e3a8a"
                    strokeWidth="8"
                    strokeOpacity="0.15"
                    fill="none"
                  />
                  
                  {/* Lake / Mountain accents */}
                  <polygon points="120,40 180,140 60,140" fill="#ffffff" fillOpacity="0.015" />
                  <polygon points="180,80 230,160 130,160" fill="#ffffff" fillOpacity="0.015" />

                  {/* Mombasa Road Arterial Highway - Main Tow Route */}
                  <path
                    d="M 100 120 C 180 90 280 260 420 220 C 530 190 600 320 700 290"
                    stroke="#1a1a1a"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M 100 120 C 180 90 280 260 420 220 C 530 190 600 320 700 290"
                    stroke="#2a2a2a"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Yellow highway center line shifted to Orange center line */}
                  <path
                    d="M 100 120 C 180 90 280 260 420 220 C 530 190 600 320 700 290"
                    stroke="#f97316"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    strokeOpacity="0.75"
                  />

                  {/* Secondary crossing roads */}
                  <path
                    d="M 320 50 Q 240 210 380 400"
                    stroke="#151515"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 520 80 Q 580 210 500 420"
                    stroke="#151515"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* MAP PLACES & CALLOUTS */}
                  
                  {/* Depot Marker (Base Point) */}
                  <circle cx="100" cy="120" r="10" fill="#f97316" fillOpacity="0.1" />
                  <rect x="94" y="114" width="12" height="12" fill="#f97316" stroke="black" strokeWidth="1.5" />
                  <text x="75" y="96" fill="#f97316" fontSize="9" fontWeight="black" letterSpacing="1" uppercase="true">DEPOT HQ</text>

                  {/* Breakdown Site Pin (Stranded Vehicle) */}
                  <circle cx="420" cy="220" r="14" fill="#ef4444" fillOpacity="0.15" />
                  <rect x="414" y="214" width="12" height="12" fill="#ef4444" stroke="black" strokeWidth="1.5" />
                  <text x="375" y="196" fill="#fca5a5" fontSize="10" fontWeight="black" letterSpacing="1">BREAKDOWN SITE</text>

                  {/* Destination Yard Landmark */}
                  <circle cx="700" cy="290" r="10" fill="#10b981" fillOpacity="0.1" />
                  <rect x="694" y="284" width="12" height="12" fill="#10b981" stroke="black" strokeWidth="1.5" />
                  <text x="660" y="266" fill="#a7f3d0" fontSize="9" fontWeight="black" letterSpacing="1">CMC TERMINAL YARD</text>

                  {/* Route path tracing calculations */}
                  {(() => {
                    const ratio = tracking.routeProgress / 100;
                    let tx = 0, ty = 0;
                    
                    if (ratio <= 0.5) {
                      const t = ratio * 2;
                      const p0 = { x: 100, y: 120 };
                      const p1 = { x: 180, y: 90 };
                      const p2 = { x: 280, y: 260 };
                      const p3 = { x: 420, y: 220 };
                      
                      const omt = 1 - t;
                      tx = omt*omt*omt*p0.x + 3*omt*omt*t*p1.x + 3*omt*t*t*p2.x + t*t*t*p3.x;
                      ty = omt*omt*omt*p0.y + 3*omt*omt*t*p1.y + 3*omt*t*t*p2.y + t*t*t*p3.y;
                    } else {
                      const t = (ratio - 0.5) * 2;
                      const p0 = { x: 420, y: 220 };
                      const p1 = { x: 530, y: 190 };
                      const p2 = { x: 600, y: 320 };
                      const p3 = { x: 700, y: 290 };
                      
                      const omt = 1 - t;
                      tx = omt*omt*omt*p0.x + 3*omt*omt*t*p1.x + 3*omt*t*t*p2.x + t*t*t*p3.x;
                      ty = omt*omt*omt*p0.y + 3*omt*omt*t*p1.y + 3*omt*t*t*p2.y + t*t*t*p3.y;
                    }

                    return (
                      <g>
                        {/* Moving truck icon base glowing dot */}
                        <circle cx={tx} cy={ty} r="20" fill="#f97316" fillOpacity="0.2" />
                        
                        {/* Directed arrow representing truck */}
                        <g transform={`translate(${tx - 12}, ${ty - 12})`}>
                          <rect width="24" height="24" rx="0" fill="#f97316" stroke="#000" strokeWidth="2" />
                          <path d="M12 5V19M12 5L7 10M12 5L17 10" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(78 12 12)" />
                        </g>

                        {/* Driver flag text */}
                        <g transform={`translate(${tx - 40}, ${ty - 36})`}>
                          <rect width="80" height="18" fill="#151515" stroke="#f97316" strokeWidth="1.5" />
                          <text x="40" y="12" fill="#ffffff" fontSize="8" fontWeight="black" letterSpacing="0.5" textAnchor="middle" className="font-mono">SOLOO REG-1</text>
                        </g>
                      </g>
                    );
                  })()}

                  {/* Secondary bystander truck nodes */}
                  <g transform="translate(240, 290)">
                    <rect width="12" height="12" fill="#2a2a2a" stroke="white" strokeOpacity="0.2" />
                    <text x="-12" y="-6" fill="#666" fontSize="7" fontWeight="bold">STANDBY PATROL 18</text>
                  </g>

                  <g transform="translate(620, 100)">
                    <rect width="12" height="12" fill="#2a2a2a" stroke="white" strokeOpacity="0.2" />
                    <text x="-12" y="-6" fill="#666" fontSize="7" fontWeight="bold">STANDBY PATROL 22</text>
                  </g>
                </svg>

                {/* Map Floating HUD Legend info overlay */}
                <div className="absolute bottom-4 left-4 bg-black/90 border border-white/10 p-3 rounded-none text-[9px] text-gray-400 space-y-1 max-w-[190px] text-left">
                  <p className="font-black text-white uppercase tracking-widest leading-none mb-1.5 border-b border-white/10 pb-1">MAP CHRONICLE</p>
                  <p className="flex items-center gap-1.5"><span className="h-2 w-2 bg-[#f97316] inline-block" /> Soloo Recovery Depot</p>
                  <p className="flex items-center gap-1.5"><span className="h-2 w-2 bg-[#ef4444] inline-block" /> Stranded Breakdown Vehicle</p>
                  <p className="flex items-center gap-1.5"><span className="h-2 w-2 bg-[#10b981] inline-block" /> Destination CMC Yard</p>
                  <p className="flex items-center gap-1.5"><span className="h-2 w-2 bg-[#2a2a2a] inline-block" /> Parol vehicle standby grids</p>
                </div>

                {/* Simulated Notification Toast Pop-ups dynamically */}
                <div className="absolute top-4 right-4 bg-black/95 border border-[#f97316]/30 p-3.5 shadow-2xl max-w-xs space-y-1 text-xs text-left">
                  <div className="flex items-center gap-1.5 text-[#f97316] font-black uppercase tracking-wider text-[10px]">
                    <Sparkles className="w-3.5 h-3.5" /> Simulation Guidance
                  </div>
                  <p className="text-gray-400 leading-relaxed text-[11px]">
                    This simulator operates sequentially. Let it run on standby or click the <strong className="text-white">&quot;Force Step Advance&quot;</strong> button above to immediately fast-forward through key dispatch milestones!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
