/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, PhoneCall, Check, User, ShieldAlert } from 'lucide-react';
import { ChatMessage } from '../types';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'default-1',
      sender: 'dispatcher',
      text: "Hello! Welcome to Soloo Towing & Recovery 24/7 Dispatch. I'm Sarah, your active dispatch manager. Do you need emergency vehicle recovery, a heavy-duty crane, or forklift assistance? Let me know, or select a quick option below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate dispatcher thinking & responding based on keyword matching
    setTimeout(() => {
      const lowerText = textToSend.toLowerCase();
      let responseText = '';

      if (lowerText.someKeywords(['rate', 'cost', 'price', 'charges', 'how much'])) {
        responseText = "Our baseline rate for standard flatbed vehicle towing starts at KES 5,000 for distances up to 10 KMs, with KES 150/KM thereafter. Heavy-duty towing ranges from KES 15,000. Use our interactive quote calculator in the 'Services' section to map exact distances!";
      } else if (lowerText.someKeywords(['forklift', 'fork lift', 'lift machinery', 'forklift cost'])) {
        responseText = "Soloo provides 24/7 forklift hire services (2 Tons up to 10 Tons capacity) for industrial moving. Pricing starts at KES 4,000 per hour with specialized loading crew. Select the 'Services' tab to view specific details, or drop a booking request directly!";
      } else if (lowerText.someKeywords(['crane', 'heavy duty', 'bus', 'trailer', 'overturn', 'recovery'])) {
        responseText = "We operate up to 40-ton cranes and heavy underlift wreckers specifically engineered for trucks, buses, and complex deep-gorge or off-road recovery. Since heavy operations necessitate custom rigging, call direct at 0722154729 for a direct rate within 3 minutes!";
      } else if (lowerText.someKeywords(['location', 'where', 'nairobi', 'mombasa', 'thika', 'nakuru'])) {
        responseText = "Our core operation base is on Mombasa Road, Nairobi, with patrol trucks stationed along Waiyaki Way, Thika Superhighway, Southern Bypass, and Nakuru Highway. Average response time is under 25 minutes inside Nairobi!";
      } else if (lowerText.someKeywords(['mpesa', 'pay', 'payment', 'card', 'cash'])) {
        responseText = "Absolutely! We support Safaricom M-Pesa (via seamless STK Push simulation on our Booking page), Credit/Debit Cards, or cash handovers upon vehicle handover. No advance deposit is needed for standard emergency highway tows.";
      } else if (lowerText.someKeywords(['phone', 'contact', 'call', 'number', 'emergency'])) {
        responseText = "You can talk to a human operator instantly across both Networks! Hotlines: 0722154729 (Safaricom) or 0735154729 (Airtel). Let us rescue you!";
      } else {
        responseText = "Understood. Our active dispatcher Sarah has received this query. For immediate truck routing, we highly recommend calling us at 0722154729 or using the 'Track & Book' engine so we can get your GPS coordinates!";
      }

      const dispatcherMsg: ChatMessage = {
        id: `dispatcher-${Date.now()}`,
        sender: 'dispatcher',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, dispatcherMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handlePresetSelect = (preset: string) => {
    handleSendMessage(preset);
  };

  return (
    <>
      {/* Floating Toggle Button - Sharp styled as per theme */}
      <button
        id="btn-livechat-toggle"
        onClick={handleOpenToggle}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#fbbf24] hover:bg-white text-black font-black shadow-2xl transition-all duration-300 focus:outline-none rounded-none border-2 border-black"
        aria-label="Open 24/7 Live Chat Support"
        title="Open Live Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 stroke-[2.5]" />
            {hasUnread && (
              <span className="absolute -top-3.5 -right-3.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-4 w-4 bg-red-600 border border-black text-[9px] text-white font-black items-center justify-center font-mono">1</span>
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="livechat-window"
          className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[380px] h-[500px] bg-[#151515] border-2 border-[#fbbf24] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 rounded-none text-left"
        >
          {/* Header */}
          <div className="bg-[#101010] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#fbbf24] text-black font-black text-xs flex items-center justify-center">
                  ST
                </div>
                <span className="absolute bottom-0 right-0 block h-3 w-3 bg-emerald-500 ring-2 ring-[#101010]"></span>
              </div>
              <div className="text-left">
                <h3 className="text-xs uppercase font-black text-white tracking-widest">Sarah • Dispatcher</h3>
                <span className="text-[10px] text-[#fbbf24] font-bold uppercase tracking-wider font-mono">20m Response Standby</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <a 
                href="tel:0722154729" 
                className="p-1.5 hover:bg-white/5 text-[#fbbf24] transition-colors"
                aria-label="Call emergency 0722154729"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
              <button 
                onClick={handleOpenToggle}
                className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub Header Information Alert */}
          <div className="bg-[#fbbf24]/5 px-4 py-2 border-b border-white/10 flex items-start gap-2 text-left">
            <ShieldAlert className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#fbbf24]/90 font-bold uppercase tracking-wide leading-tight">
              Direct emergency dispatch calls: <a href="tel:0722154729" className="font-black underline text-white">0722154729</a> or <a href="tel:0735154729" className="font-black underline text-white">0735154729</a>.
            </p>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-black">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    {!isUser && (
                      <div className="w-6 h-6 bg-white/5 border border-white/10 text-[#fbbf24] text-[9px] font-black flex items-center justify-center shrink-0">
                        S
                      </div>
                    )}
                    <div>
                      <div
                        className={`p-3 text-xs leading-relaxed rounded-none border ${
                          isUser
                            ? 'bg-[#fbbf24] text-black border-[#fbbf24] font-extrabold'
                            : 'bg-[#1a1a1a] border-white/10 text-gray-200'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-gray-500 mt-1 block px-1 font-mono uppercase tracking-wider">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%] items-center">
                  <div className="w-6 h-6 bg-white/5 border border-white/10 text-[#fbbf24] text-[9px] font-black flex items-center justify-center shrink-0">
                    S
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/10 p-3 rounded-none text-xs text-gray-400 flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 bg-[#fbbf24] animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#fbbf24] animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-[#fbbf24] animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Panel */}
          {messages.length < 5 && !isTyping && (
            <div className="px-3 py-2 bg-[#101010] border-t border-white/10 flex flex-wrap gap-1">
              <button
                id="preset-rates"
                onClick={() => handlePresetSelect('Emergency Tow Rates')}
                className="text-[9px] bg-[#1a1a1a] hover:bg-[#fbbf24] hover:text-black border border-white/10 px-2.5 py-1 text-gray-300 font-black uppercase tracking-wider rounded-none"
              >
                💵 Towing Rates
              </button>
              <button
                id="preset-forklift"
                onClick={() => handlePresetSelect('Forklift Rental Details')}
                className="text-[9px] bg-[#1a1a1a] hover:bg-[#fbbf24] hover:text-black border border-white/10 px-2.5 py-1 text-gray-300 font-black uppercase tracking-wider rounded-none"
              >
                🏗️ Forklift Hire
              </button>
              <button
                id="preset-heavy"
                onClick={() => handlePresetSelect('Heavy Duty Cranes')}
                className="text-[9px] bg-[#1a1a1a] hover:bg-[#fbbf24] hover:text-black border border-white/10 px-2.5 py-1 text-gray-300 font-black uppercase tracking-wider rounded-none"
              >
                🚒 Heavy Cranes
              </button>
              <button
                id="preset-location"
                onClick={() => handlePresetSelect('Where is your driver based?')}
                className="text-[9px] bg-[#1a1a1a] hover:bg-[#fbbf24] hover:text-black border border-white/10 px-2.5 py-1 text-gray-300 font-black uppercase tracking-wider rounded-none"
              >
                📍 Patrol Map
              </button>
            </div>
          )}

          {/* Message Input */}
          <form
            id="livechat-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-[#101010] border-t border-white/10 flex items-center gap-2"
          >
            <input
              id="livechat-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your emergency query..."
              className="flex-1 bg-[#1a1a1a] text-white rounded-none px-3 py-2.5 text-xs border border-white/10 focus:outline-none focus:border-[#fbbf24] placeholder-gray-600"
            />
            <button
              id="livechat-submit"
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 bg-[#fbbf24] disabled:bg-white/5 disabled:text-gray-600 text-black font-black transition-colors hover:bg-white flex items-center justify-center shrink-0 rounded-none"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

// Simple Helper for matching multiple keywords cleanly
declare global {
  interface String {
    someKeywords(words: string[]): boolean;
  }
}

String.prototype.someKeywords = function (words: string[]): boolean {
  return words.some((word) => this.includes(word));
};
