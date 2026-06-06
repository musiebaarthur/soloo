import React, { createContext, useContext, useState, useEffect } from 'react';

import tractorCarrier from '../assets/images/soloo_tractor_carrier_1780592118988.png';
import hysterForklift from '../assets/images/soloo_hyster_forklift_1780592138839.png';
import steelFrameCrane from '../assets/images/steel_frame_crane_1780604511226.png';
import yardShunterHeavy from '../assets/images/yard_shunter_heavy_1780604526365.png';
import refineryTankRigging from '../assets/images/refinery_tank_rigging_1780604542248.png';
import industrialHopperLift from '../assets/images/industrial_hopper_lift_1780604557089.png';

export interface GalleryItem {
  id: string;
  image: string;
  thumbAlt: string;
  badge: string;
  title: string;
  subtext: string;
  spec: string;
}

export interface ServiceDetailSpec {
  label: string;
  value: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  tagline: string;
  basePrice: number;
  perKmPrice: number;
  specs: ServiceDetailSpec[];
  details: string[];
  equipment: string[];
  bestFor: string[];
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  date: string;
}

export interface HeroContent {
  badgeText: string;
  titleMain: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
}

interface AdminContextProps {
  adminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  galleryItems: GalleryItem[];
  setGalleryItems: (items: GalleryItem[]) => void;
  servicesList: ServiceDetail[];
  setServicesList: (services: ServiceDetail[]) => void;
  blogsList: BlogItem[];
  setBlogsList: (blogs: BlogItem[]) => void;
  heroContent: HeroContent;
  setHeroContent: (content: HeroContent) => void;
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

// Initial Lists to seed empty storage (Preserving original photography of Soloo Trucks Recovery)
const initialGallery: GalleryItem[] = [
  {
    id: 'slide-steel-crane',
    image: steelFrameCrane,
    thumbAlt: 'Steel frame lifting crane',
    badge: 'Crane Lift & Rigging',
    title: 'STEEL FRAME HOISTING',
    subtext: 'High-clarity mobile cranes for structural warehouse column liftings.',
    spec: 'Certified riggers.'
  },
  {
    id: 'slide-yard-shunter',
    image: yardShunterHeavy,
    thumbAlt: 'Heavy container shunter',
    badge: 'Logistics',
    title: 'YARD CONTAINER SHUNTING',
    subtext: 'Relocating shipping containers safely across regional depot yards.',
    spec: 'Heavy pin couplers.'
  },
  {
    id: 'slide-refinery-crane',
    image: refineryTankRigging,
    thumbAlt: 'Hydraulic plant mobile crane',
    badge: 'Industrial Rigging',
    title: 'REFINERY SILO HOISTING',
    subtext: 'Landed vertical food and chemical cylindrical machinery vaults.',
    spec: 'Full load checks.'
  }
];

const initialServices: ServiceDetail[] = [
  {
    id: 'light-tow',
    title: 'Fleet Flatbeds',
    category: 'Towing',
    tagline: 'Flatbed fleet for standard vehicles rescue.',
    basePrice: 5000,
    perKmPrice: 150,
    specs: [
      { label: 'Weight Limit', value: '4.5 Tons' },
      { label: 'Avg Arrival', value: '15 Mins' }
    ],
    details: [
      'Hydraulic slide beds.',
      'Soft wheel ties.'
    ],
    equipment: ['Isuzu Flatbeds', 'Rim Straps'],
    bestFor: ['Sedans', 'SUVs']
  },
  {
    id: 'heavy-crane',
    title: 'Heavy Cranes',
    category: 'Rigging',
    tagline: 'Diesel rigs to recover heavy logistics trucks.',
    basePrice: 15000,
    perKmPrice: 350,
    specs: [
      { label: 'Lift Capacity', value: '40 Tons' },
      { label: 'Certification', value: 'BS EN ISO' }
    ],
    details: [
      '360 Rotator cranes.',
      'Active dual-winches.'
    ],
    equipment: ['Rotators', 'Load Cushions'],
    bestFor: ['Semi Trucks', 'Buses']
  },
  {
    id: 'forklift',
    title: 'Forklift Rentals',
    category: 'Yard Handling',
    tagline: 'Heavy load fuel or electric container lifters.',
    basePrice: 8000,
    perKmPrice: 200,
    specs: [
      { label: 'Load Limit', value: '10 Tons' },
      { label: 'Options', value: 'Diesel/Electric' }
    ],
    details: [
      'High-mast yard lifts.',
      'Licensed staff.'
    ],
    equipment: ['CAT Lift Truck', 'Spreader Bars'],
    bestFor: ['Pallets', 'Machinery']
  }
];

const initialHero: HeroContent = {
  badgeText: 'STANDBY FLEET 24/7',
  titleMain: 'Heavy duty',
  titleHighlight: 'Response',
  titleSuffix: 'Unit',
  description: 'Emergency towing, heavy crane lifts, and forklift operations. Real-time GPS dispatches across Kenya, Uganda, and Tanzania.'
};

const initialBlogs: BlogItem[] = [
  {
    id: 'blog-safe-rigging',
    title: 'Industrial Rigging Protocols',
    excerpt: 'Key safety procedures for weight balancing, chain selection, and outrigger deployment in tight plant environments.',
    content: `Safety metrics require strict Grade-100 chains, secure steel lines, and structural plates.

- Calculate total boom reach capability.
- Double-check counter ballast.
- Confirm ground soil density limits.`,
    category: 'Operations',
    author: 'Eng. Jane Doe',
    image: refineryTankRigging,
    date: 'June 01, 2026'
  },
  {
    id: 'blog-highway-breakdowns',
    title: 'Highway Hazard Management',
    excerpt: 'Quick roadside survival protocol for trailer captains encountering sudden system faults on major highway segments.',
    content: `When stalled, follow these simple steps to ensure safety:

- Place reflective warning triangles at 100 meters.
- Contact our dispatcher instantly for rapid routing.
- Do not sit inside stationary chassis cabins.`,
    category: 'Safety',
    author: 'Sarah Ochieng',
    image: tractorCarrier,
    date: 'May 28, 2026'
  }
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminMode, setAdminMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('soloo_admin_mode');
    return saved === 'true';
  });

  const [galleryItems, setGalleryItemsState] = useState<GalleryItem[]>([]);
  const [servicesList, setServicesListState] = useState<ServiceDetail[]>([]);
  const [blogsList, setBlogsListState] = useState<BlogItem[]>([]);
  const [heroContent, setHeroContentState] = useState<HeroContent>(initialHero);

  // Initialize and load from local storage
  useEffect(() => {
    localStorage.setItem('soloo_admin_mode', String(adminMode));
  }, [adminMode]);

  useEffect(() => {
    const savedGallery = localStorage.getItem('soloo_gallery_items');
    if (savedGallery) {
      try {
        setGalleryItemsState(JSON.parse(savedGallery));
      } catch (e) {
        setGalleryItemsState(initialGallery);
      }
    } else {
      setGalleryItemsState(initialGallery);
    }

    const savedServices = localStorage.getItem('soloo_services_list');
    if (savedServices) {
      try {
        setServicesListState(JSON.parse(savedServices));
      } catch (e) {
        setServicesListState(initialServices);
      }
    } else {
      setServicesListState(initialServices);
    }

    const savedBlogs = localStorage.getItem('soloo_blogs_list');
    if (savedBlogs) {
      try {
        setBlogsListState(JSON.parse(savedBlogs));
      } catch (e) {
        setBlogsListState(initialBlogs);
      }
    } else {
      setBlogsListState(initialBlogs);
    }

    const savedHero = localStorage.getItem('soloo_hero_content');
    if (savedHero) {
      try {
        setHeroContentState(JSON.parse(savedHero));
      } catch (e) {
        setHeroContentState(initialHero);
      }
    } else {
      setHeroContentState(initialHero);
    }
  }, []);

  const setGalleryItems = (items: GalleryItem[]) => {
    setGalleryItemsState(items);
    localStorage.setItem('soloo_gallery_items', JSON.stringify(items));
  };

  const setServicesList = (services: ServiceDetail[]) => {
    setServicesListState(services);
    localStorage.setItem('soloo_services_list', JSON.stringify(services));
  };

  const setBlogsList = (blogs: BlogItem[]) => {
    setBlogsListState(blogs);
    localStorage.setItem('soloo_blogs_list', JSON.stringify(blogs));
  };

  const setHeroContent = (content: HeroContent) => {
    setHeroContentState(content);
    localStorage.setItem('soloo_hero_content', JSON.stringify(content));
  };

  const resetToDefaults = () => {
    setGalleryItems(initialGallery);
    setServicesList(initialServices);
    setBlogsList(initialBlogs);
    setHeroContent(initialHero);
    alert('All content successfully reset to baseline system photography & descriptions!');
  };

  return (
    <AdminContext.Provider
      value={{
        adminMode,
        setAdminMode,
        galleryItems,
        setGalleryItems,
        servicesList,
        setServicesList,
        blogsList,
        setBlogsList,
        heroContent,
        setHeroContent,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
