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
    thumbAlt: 'Construction mobile crane erecting structural steel frames',
    badge: 'Heavy Crane Lift & Rigging',
    title: 'STRUCTURAL STEEL FRAME HOISTING',
    subtext: 'Precision lifting, positioning, and mounting of massive warehouse columns, roof trusses, and metal rafters.',
    spec: 'Conducted under rigorous tag-line control and qualified rigging engineering protocols.'
  },
  {
    id: 'slide-yard-shunter',
    image: yardShunterHeavy,
    thumbAlt: 'Orange heavy yard shunter tow machine handling shipping container',
    badge: 'Port Logistics & Yard Tug',
    title: 'YARD SHUNTING & TERMINAL LOGISTICS',
    subtext: 'Heavy shunting, terminal trailer relocations, and off-dock container logistics with instant driver routing.',
    spec: 'Equipped with heavy pin couplers, high torque transmissions, and full visibility cabs.'
  },
  {
    id: 'slide-refinery-crane',
    image: refineryTankRigging,
    thumbAlt: 'Hydraulic mobile crane rigging near twin vertical storage tanks',
    badge: 'Silo Machinery & Industrial Rigging',
    title: 'PLANT REFINERY STORAGE TANK HOISTING',
    subtext: 'Safe positioning and vertical landing of mammoth food/chemical cylindrical storage silos and refinery hardware.',
    spec: 'Supervised by senior engineers with full ground load checks and heavy counter ballast.'
  },
  {
    id: 'slide-hopper-lift',
    image: industrialHopperLift,
    thumbAlt: 'Orange crane boom lowering industrial funnel hopper unit',
    badge: 'Bulk Material Rigging & Landings',
    title: 'INDUSTRIAL HOPPER FUNNEL INSTALLS',
    subtext: 'High-mast crane lifts to install heavy cylindrical material funnels, gravity hoppers, and factory mixing units.',
    spec: 'Utilizes certified heavy alloy shackle arrays, Grade-100 steel links, and anti-twist ropes.'
  },
  {
    id: 'slide-tractor',
    image: tractorCarrier,
    thumbAlt: 'Oversized machinery and tractors carried on heavy flatbed lowloader',
    badge: 'Multi-Axle Cargo Transport',
    title: 'TOUGH LAND TRANSIT TOWING',
    subtext: 'Interstate haulage of heavy earthmoving machinery, multi-ton diesel generators, and agricultural apparatus.',
    spec: 'Configured with high-strength load tie-down binds and East Africa transit clearances.'
  },
  {
    id: 'slide-forklift',
    image: hysterForklift,
    thumbAlt: 'Industrial forklift organizing factory material loads',
    badge: 'Depot Rigging & Warehouse Handling',
    title: 'COMPACT DETAILED FORKLIFT PLACEMENT',
    subtext: 'High mast yard forklift rentals (2.5 to 10 Tons capacity) for precise pallet racking and machinery shifts.',
    spec: 'Available with certified on-site forklift operators and heavy container offloading jibs.'
  }
];

const initialServices: ServiceDetail[] = [
  {
    id: 'light-tow',
    title: '24/7 Fleet Towing & Flatbeds',
    category: 'Standard Recovery',
    tagline: 'Reliable flatbed tow trucks for standard light and medium cargo.',
    basePrice: 5000,
    perKmPrice: 150,
    specs: [
      { label: 'Max Capacity', value: '4.5 Tons' },
      { label: 'Average Dispatch', value: '15 - 25 Minutes' },
      { label: 'Available Units', value: '14 Active Flatbeds' },
      { label: 'Operating Areas', value: 'Nairobi & Suburbs, Highways' }
    ],
    details: [
      'Hydraulic tilt-tray flatbeds optimized for low-clearance sports cars and luxury models.',
      'Zero-contact wheel lifts ideal for short-distance repossession and urban parking rescue.',
      'Fully chain-strapped tire securement to prevent suspension alignment damage.',
      'Real-time automated status updates with GPS driver tracking systems.'
    ],
    equipment: ['Isuzu FSR Flatbeds', 'Hydraulic Wheel-Lifts', 'Soft Alloy Rim Straps', 'Heavy Recovery Snatch Blocks'],
    bestFor: ['Sedans & Coupes', 'SUVs & Compact Crossovers', 'Electric Vehicles (EVs)', 'Motorcycles & ATVs']
  },
  {
    id: 'heavy-crane',
    title: 'Heavy-Duty Cranes & Rigging',
    category: 'Extreme Recovery',
    tagline: 'Gigantic diesel cranes built to recover heavy trucks, buses, and rigs.',
    basePrice: 15000,
    perKmPrice: 350,
    specs: [
      { label: 'Lifting Force', value: 'Up to 40 Tons' },
      { label: 'Boom Reach', value: '18 Meters Lateral' },
      { label: 'Rigging Standard', value: 'BS EN ISO 9001 Certified' },
      { label: 'Air-Cushion Units', value: '2 High-Pressure Sets' }
    ],
    details: [
      'Rotator cranes capable of 360-degree pivoting for deep ditch recoveries and highway pile-ups.',
      'High-pressure pneumatic air bags to upright loaded trailers without cargo offloading.',
      'Specialist dual-winching lines to hoist heavy buses and prime movers back onto pavement safely.',
      'Overturned multi-axel recovery operations coordinated by senior rigging engineering.'
    ],
    equipment: ['40-Ton Rotator Cranes', 'Heavy Underlift Wreckers', 'Pneumatic Air-Cushion Lifting Jacks', 'Grade-100 Alloy Steel Hooks'],
    bestFor: ['Prime Movers & Semi-Trailers', 'Industrial Cargo Transporters', 'Commercial Buses & Coaches', 'Earthmovers & Construction Machinery']
  },
  {
    id: 'forklift',
    title: 'Industrial Forklift Handling',
    category: 'Specialized Lifters',
    tagline: 'Heavy load container forklifts and warehouse movers available for immediate lease.',
    basePrice: 8000,
    perKmPrice: 200,
    specs: [
      { label: 'Lifting Weight', value: '2.5 Tons - 10 Tons' },
      { label: 'Fuel Drives', value: 'Diesel & Electric Options' },
      { label: 'Power Source', value: 'Heavy Pneumatic Tyres' },
      { label: 'Special Attachments', value: 'Drum Clamps, Extension Jibs' }
    ],
    details: [
      'High mast clearance for warehouse vertical stacking and heavy machinery positioning.',
      'Skilled licensed operators with deep industrial safety rigging certifications.',
      'Robust mud-terrain forklift variants suitable for loose-gravel construction jobs and heavy yards.',
      'Same-day transportation flatbeds to deliver forklifts to your project site on short notice.'
    ],
    equipment: ['Toyota 8-Series Forklifts', 'CAT Heavy Rough-Terrain Forklifts', 'Custom Spreader Bars', 'Padded Drum Grab Clamps'],
    bestFor: ['Palletized Container Cargo', 'Heavy Generator Ingress/Egress', 'Factory Machinery Offloading', 'Steel Beam Rigging & Hoisting']
  },
  {
    id: 'roadside',
    title: 'Specialized Roadside Assist',
    category: 'Rapid Patrol',
    tagline: 'Quick-response mobile units dispatched to patch tires, supply fuel, or jump batteries.',
    basePrice: 3000,
    perKmPrice: 100,
    specs: [
      { label: 'Est. Arrival', value: '10 - 20 Minutes' },
      { label: 'Mobile Fleet', value: '8 Standby Patrol Cars' },
      { label: 'Warranty On Jump', value: '7-Day Battery Assist Peace' },
      { label: 'Tool Outfits', value: '18V Cordless Impact Wrenches' }
    ],
    details: [
      'Professional heavy jumpstarts using smart anti-surge battery boosters to safeguard electric modules.',
      'Rapid roadside spare swapping with heavy-duty pneumatic impact impact jackhammers.',
      'Emergency clean diesel or petrol deliveries (up to 20 Litres) when ran empty on remote freeways.',
      'On-the-spot OBD-II vehicle computerized diagnostics to trace fuel-pump or engine-sensor glitches.'
    ],
    equipment: ['High-Output Anti-Surge Boostpack', '12-Volt Specialized Fuel Pumps', 'Pneumatic Trolley Lift Jacks', 'Diagnostic OBD-II Scanners'],
    bestFor: ['Dead Battery Jumpstart', 'Puncture Repair & Spare Swap', 'Fuel Empty Emergency Tanking', 'Blown Fuses & Small Sensor Tracing']
  }
];

const initialHero: HeroContent = {
  badgeText: 'ACTIVE STANDBY FLEET (24/7)',
  titleMain: 'Heavy Duty',
  titleHighlight: 'Response',
  titleSuffix: 'Unit',
  description: 'Specialized roadside assistance, pivot rotator cranes, and forklift services. Real-time fleet tracking ensures we reach you in minutes, not hours. Operating 24/7 across Kenya, Uganda, and Tanzania.'
};

const initialBlogs: BlogItem[] = [
  {
    id: 'blog-safe-rigging',
    title: 'Safe Rigging Protocols for Ultra-Heavy Industrial Silos',
    excerpt: 'Lifting 50-ton storage vessels requires strict balancing, certified steel rigging wire ropes, and active engineering calculations. Read our step-by-step safety compliance manual.',
    content: `### Industrial Silo Rigging Guidelines

When handling oversized storage structures or vertical industrial mixers, standard hoisting gear will not suffice. At **Soloo Towing & Recovery**, we coordinate lifting actions under stringent engineering supervisors.

#### 1. Pre-Lift Assessment & Stabilizer Placement
Before extending any crane booms near vertical tanks, our team performs precise ground load calculation. 
- Sand and soil must be fortified with structural steel plates.
- Counter ballast ratios must be tested at 1.25x of estimated drag force.
- Tag-lines must be pre-threaded to handle regional wind currents.

#### 2. Chain & Coupling Certification
Only use Grade-100 or higher alloy steel hoist chains. Ensure that all shackle nodes are certified by national standards authorities under EA directives.

#### 3. Real-time Lift Execution
Heavy dual cranes can lift vertical silo units synchronously. Continuous radio communication and digital load sensors keep operations balanced within less than 0.5% drift deviation.`,
    category: 'Industrial Rigging',
    author: 'Eng. Jane Doe',
    image: refineryTankRigging,
    date: 'June 01, 2026'
  },
  {
    id: 'blog-highway-breakdowns',
    title: 'How to Respond to Mid-corridor Semi Breakdown in East Africa',
    excerpt: 'Being stalled on highly busy cargo pathways (like the Eldoret-Nairobi highway) poses immediate physical safety risks. Here is your truck captain roadside survival protocol.',
    content: `### Corridor Roadside Survival Guide

East African transport lanes like the Northern Corridor are saturated with high-tonnage cargo prime movers. An unexpected breakdown can endanger drivers and trigger massive blockages.

#### Step 1: Secure Visibility Instantly
Position structural red reflective warning triangles at least 100 meters behind and 50 meters ahead of your trailer bed. Deploy yellow warning flag markers on active chassis corners.

#### Step 2: Contact Unified HQ Dispatchers
Instead of calling unlicensed local towing operators, engage certified fleets. Call the **Soloo Dispatch Hotline** at **0722154729** to calculate instant distance routing and lowbed flatbed dispatch times.

#### Step 3: Evacuate the Cab Space
Do not sit inside a stalled truck cabin along major freeways. Moving vehicles can crash into stationary structures. Seek refuge behind safety barriers or uphill embankments until heavy recovery wreckage vehicles arrive.`,
    category: 'Highway Safety',
    author: 'Sarah Ochieng',
    image: tractorCarrier,
    date: 'May 28, 2026'
  },
  {
    id: 'blog-port-tug-logistics',
    title: 'Why High-Torque Yard Shunters Enhance Depot Efficiencies',
    excerpt: 'Explore how specialized terminal yard shunters (tugs) speed up high-cadence shipping container maneuvers compared to standard highway prime movers.',
    content: `### Optimizing Yard and Port Efficiencies

In cargo consolidation yards and container freight depots, swift relocations are paramount. Road-legal cargo prime movers are designed for sustained speed, making them inefficient for short-distance docking.

#### High Torque over Speed
Yard shunters (tugs) utilize super high ratio differentials to pull high load weights from a dead stop. This minimizes transmission clutch heat even with continuous start-stop actions.

#### Hydraulic Fifth Wheels
Instead of manually cranking trailer landing legs, yard shunters leverage automated hydraulic lift plates to lift trailer kingpins instantly, reducing decoupling durations by nearly 85%!`,
    category: 'Depot Logistics',
    author: 'Arthur Musieba',
    image: yardShunterHeavy,
    date: 'May 15, 2026'
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
