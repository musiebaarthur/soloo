/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabType = 'home' | 'gallery' | 'blog' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  basePrice: number;
  perKmPrice: number;
  iconName: string; // Lucide icon identifier
  suitableFor: string[];
  equipmentUsed: string[];
}

export type PaymentMethod = 'MPESA' | 'CARD' | 'CASH';

export interface BookingRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  serviceId: string;
  vehicleModel: string;
  paymentMethod: PaymentMethod;
  estimatedCost: number;
  timestamp: string;
}

export type TrackingStatus = 'RECEIVED' | 'DISPATCHED' | 'EN_ROUTE' | 'ARRIVED' | 'SECURED' | 'COMPLETED';

export interface TrackingState {
  bookingId: string;
  status: TrackingStatus;
  statusText: string;
  driverName: string;
  driverPhone: string;
  driverVehicle: string;
  driverPlate: string;
  driverRating: number;
  etaMinutes: number;
  routeProgress: number; // 0 to 100 representing percentage along path
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number; // 1 to 5
  message: string;
  date: string;
  serviceType: string;
  isVerified: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'dispatcher';
  text: string;
  timestamp: string;
}
