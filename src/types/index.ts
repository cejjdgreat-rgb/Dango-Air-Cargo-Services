export type ShipmentStatus = 
  | 'BOOKED'
  | 'RECEIVED'
  | 'PROCESSING'
  | 'PACKED'
  | 'IN_TRANSIT'
  | 'ARRIVED_DESTINATION'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'ON_HOLD'
  | 'CANCELLED';

export interface TimelineEvent {
  id: string;
  status: ShipmentStatus;
  title: string;
  location: string;
  timestamp: string;
  description: string;
  updatedBy: string;
}

export interface CargoItem {
  description: string;
  category: string;
  pieces: number;
  weightKg: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  declaredValue?: number;
}

export interface PartyDetails {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  country: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string; // e.g. DCA-2026-001089
  origin: string; // e.g. Lagos (LOS), Nigeria
  destination: string; // e.g. Kinshasa (FIH), DRC
  sender: PartyDetails;
  receiver: PartyDetails;
  serviceType: string;
  cargoType: string;
  items: CargoItem[];
  totalPieces: number;
  actualWeightKg: number;
  volumetricWeightKg: number;
  chargeableWeightKg: number;
  status: ShipmentStatus;
  currentLocation: string;
  flightOrTripNumber?: string;
  bookingDate: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate?: string;
  paymentStatus: 'PAID' | 'PENDING' | 'PARTIALLY_PAID' | 'FAILED' | 'REFUNDED';
  totalAmountUSD: number;
  currencyPaid?: string;
  timeline: TimelineEvent[];
  specialInstructions?: string;
  documents?: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    fileSize: string;
  }[];
  isDemo?: boolean;
}

export interface QuoteRequest {
  id: string;
  requestDate: string;
  customerName: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  cargoType: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  pieces: number;
  serviceLevel: 'STANDARD_AIR' | 'EXPRESS_AIR' | 'CARGO_CONSOLIDATION';
  pickupRequired: boolean;
  deliveryRequired: boolean;
  estimatedAmountUSD: number;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'CONVERTED' | 'REJECTED';
  adminNotes?: string;
}

export interface PickupRequest {
  id: string;
  requestDate: string;
  customerName: string;
  phone: string;
  email?: string;
  pickupAddress: string;
  city: string;
  country: 'Nigeria' | 'DRC';
  cargoType: string;
  estimatedWeightKg: number;
  packageCount: number;
  preferredDate: string;
  preferredTimeWindow: string;
  status: 'SCHEDULED' | 'DISPATCHED' | 'COLLECTED' | 'CANCELLED';
  notes?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  frenchTitle: string;
  tagline: string;
  description: string;
  frenchDescription: string;
  iconName: string;
  benefits: string[];
  process: string[];
  recommendedFor: string;
  available: boolean;
}

export interface SystemSettings {
  companyName: string;
  tagline: string;
  directorDrcPhones: string[];
  nigeriaOfficePhone: string;
  ossyPhone: string;
  emekaPhone: string;
  whatsappPhone: string;
  supportEmail: string;
  lagosAddress: string;
  congoAddress: string;
  standardRatePerKgUSD: number;
  expressRatePerKgUSD: number;
  minimumChargeUSD: number;
  pickupFeeUSD: number;
  deliveryFeeUSD: number;
  volumetricDivisor: number; // usually 5000 or 6000
  exchangeRates: {
    USD_TO_NGN: number;
    USD_TO_CDF: number;
  };
  supportedPaymentMethods: {
    card: boolean;
    bankTransfer: boolean;
    mobileMoney: boolean;
    cashAtOffice: boolean;
  };
}

export type SupportedLanguage = 'en' | 'fr';
export type SupportedCurrency = 'USD' | 'NGN' | 'CDF';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CUSTOMER' | 'ADMIN' | 'OPERATIONS';
  company?: string;
  city?: string;
  country?: string;
}
