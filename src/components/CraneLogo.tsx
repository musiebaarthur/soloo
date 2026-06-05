/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CraneLogoProps {
  className?: string;
  color?: string;
}

export default function CraneLogo({ className = "w-10 h-10", color = "text-[#f97316]" }: CraneLogoProps) {
  return (
    <svg 
      viewBox="0 0 64 64" 
      className={`${className} ${color} shrink-0 fill-none`}
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Base Tracks / Crawler Assembly */}
      <path d="M 8 54 L 38 54" strokeWidth="4" />
      <circle cx="14" cy="54" r="3" fill="currentColor" strokeWidth="1" />
      <circle cx="23" cy="54" r="3" fill="currentColor" strokeWidth="1" />
      <circle cx="32" cy="54" r="3" fill="currentColor" strokeWidth="1" />
      
      {/* Cabin Base Pivot */}
      <path d="M 23 54 L 23 48" strokeWidth="5" />
      <path d="M 17 48 H 29" strokeWidth="4" />
      
      {/* Main Vertical Truss Column (Mast) */}
      <line x1="23" y1="48" x2="23" y2="16" strokeWidth="3" />
      <line x1="17" y1="48" x2="23" y2="38" strokeWidth="1.5" />
      <line x1="23" y1="38" x2="29" y2="28" strokeWidth="1.5" />
      <line x1="17" y1="28" x2="23" y2="18" strokeWidth="1.5" />
      
      {/* Outrigger Bracing Jib Tie */}
      <path d="M 11 32 L 23 16" strokeWidth="2.5" />
      <path d="M 11 32 L 23 48" strokeWidth="2" />
      
      {/* Main Overhead Horizontal Boom / Lifting Jib */}
      <path d="M 11 32 H 52" strokeWidth="3.5" />
      
      {/* Internal Web Truss for Jib */}
      <path d="M 11 32 L 21 24 L 31 32 L 41 24 L 51 32" strokeWidth="1.5" opacity="0.85" />
      
      {/* High-tension hoist wire */}
      <line x1="51" y1="32" x2="51" y2="42" strokeWidth="1.5" strokeDasharray="2,2" />
      
      {/* Heavy Rigging Load Hook */}
      <circle cx="51" cy="42" r="1.5" fill="currentColor" />
      <path d="M 51 43.5 V 48.5 M 51 48.5 Q 51 51 48.5 51 Q 46 51 46 48.5" strokeWidth="2" />
    </svg>
  );
}
