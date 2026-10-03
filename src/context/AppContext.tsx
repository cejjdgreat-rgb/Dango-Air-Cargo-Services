import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Shipment, 
  QuoteRequest, 
  PickupRequest, 
  ServiceItem, 
  SystemSettings, 
  SupportedLanguage, 
  SupportedCurrency,
  UserAccount,
  ShipmentStatus,
  TimelineEvent
} from '../types';
import { 
  INITIAL_SETTINGS, 
  INITIAL_SERVICES, 
  INITIAL_SHIPMENTS, 
  INITIAL_QUOTES, 
  INITIAL_PICKUPS 
} from '../data/initialData';

interface NotificationToast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currency: SupportedCurrency;
  setCurrency: (cur: SupportedCurrency) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  shipments: Shipment[];
  quotes: QuoteRequest[];
  pickups: PickupRequest[];
  services: ServiceItem[];
  settings: SystemSettings;
  currentUser: UserAccount | null;
  setCurrentUser: (user: UserAccount | null) => void;
  selectedTrackingNumber: string;
  setSelectedTrackingNumber: (num: string) => void;
  
  // Actions
  createShipment: (shipment: Omit<Shipment, 'id' | 'trackingNumber' | 'bookingDate' | 'timeline'>) => Shipment;
  updateShipmentStatus: (trackingNumber: string, status: ShipmentStatus, location: string, note?: string) => void;
  addTimelineEvent: (trackingNumber: string, event: Omit<TimelineEvent, 'id'>) => void;
  requestQuote: (quote: Omit<QuoteRequest, 'id' | 'requestDate' | 'status'>) => QuoteRequest;
  updateQuoteStatus: (id: string, status: QuoteRequest['status'], adminNotes?: string) => void;
  requestPickup: (pickup: Omit<PickupRequest, 'id' | 'requestDate' | 'status'>) => PickupRequest;
  updatePickupStatus: (id: string, status: PickupRequest['status']) => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  convertQuoteToShipment: (quoteId: string) => Shipment | null;
  
  // Helpers
  formatPrice: (amountUSD: number) => string;
  calculateShippingEstimate: (
    actualWeightKg: number, 
    lengthCm: number, 
    widthCm: number, 
    heightCm: number, 
    serviceType: string, 
    pickup: boolean, 
    delivery: boolean
  ) => {
    actualWeight: number;
    volumetricWeight: number;
    chargeableWeight: number;
    baseRate: number;
    pickupCost: number;
    deliveryCost: number;
    totalUSD: number;
  };
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  toasts: NotificationToast[];
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [currency, setCurrency] = useState<SupportedCurrency>('USD');
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState<string>('DCA-2026-001089');
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  // Local storage state with initial fallbacks
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const saved = localStorage.getItem('dango_shipments');
    return saved ? JSON.parse(saved) : INITIAL_SHIPMENTS;
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('dango_quotes');
    return saved ? JSON.parse(saved) : INITIAL_QUOTES;
  });

  const [pickups, setPickups] = useState<PickupRequest[]>(() => {
    const saved = localStorage.getItem('dango_pickups');
    return saved ? JSON.parse(saved) : INITIAL_PICKUPS;
  });

  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('dango_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('dango_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('dango_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('dango_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('dango_pickups', JSON.stringify(pickups));
  }, [pickups]);

  useEffect(() => {
    localStorage.setItem('dango_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('dango_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('dango_user');
    }
  }, [currentUser]);

  // Toast notifications
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Price formatting
  const formatPrice = (amountUSD: number): string => {
    if (currency === 'NGN') {
      const ngnAmount = amountUSD * settings.exchangeRates.USD_TO_NGN;
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(ngnAmount);
    }
    if (currency === 'CDF') {
      const cdfAmount = amountUSD * settings.exchangeRates.USD_TO_CDF;
      return `${new Intl.NumberFormat('fr-CD', { maximumFractionDigits: 0 }).format(cdfAmount)} FC`;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amountUSD);
  };

  // Dimensional Weight Calculation
  const calculateShippingEstimate = (
    actualWeightKg: number, 
    lengthCm: number, 
    widthCm: number, 
    heightCm: number, 
    serviceType: string, 
    pickup: boolean, 
    delivery: boolean
  ) => {
    const divisor = settings.volumetricDivisor || 5000;
    const volumetricWeight = lengthCm > 0 && widthCm > 0 && heightCm > 0 
      ? Number(((lengthCm * widthCm * heightCm) / divisor).toFixed(2))
      : 0;

    const chargeableWeight = Math.max(actualWeightKg, volumetricWeight, 1);
    const ratePerKg = serviceType.toLowerCase().includes('express') 
      ? settings.expressRatePerKgUSD 
      : settings.standardRatePerKgUSD;

    let baseRate = chargeableWeight * ratePerKg;
    if (baseRate < settings.minimumChargeUSD) {
      baseRate = settings.minimumChargeUSD;
    }

    const pickupCost = pickup ? settings.pickupFeeUSD : 0;
    const deliveryCost = delivery ? settings.deliveryFeeUSD : 0;
    const totalUSD = Number((baseRate + pickupCost + deliveryCost).toFixed(2));

    return {
      actualWeight: actualWeightKg,
      volumetricWeight,
      chargeableWeight,
      baseRate: Number(baseRate.toFixed(2)),
      pickupCost,
      deliveryCost,
      totalUSD
    };
  };

  // Create Shipment
  const createShipment = (data: Omit<Shipment, 'id' | 'trackingNumber' | 'bookingDate' | 'timeline'>): Shipment => {
    const id = `shp-${Date.now()}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `DCA-2026-${randomSuffix}`;
    const nowIso = new Date().toISOString();

    const initialEvent: TimelineEvent = {
      id: `evt-${Date.now()}`,
      status: 'BOOKED',
      title: 'Booking Confirmed & Airwaybill Created',
      location: data.origin,
      timestamp: new Date().toLocaleString(),
      description: `Shipment booked under tracking reference ${trackingNumber}. Awaiting terminal handover.`,
      updatedBy: 'Dango Central Logistics'
    };

    const newShipment: Shipment = {
      ...data,
      id,
      trackingNumber,
      bookingDate: nowIso,
      timeline: [initialEvent]
    };

    setShipments(prev => [newShipment, ...prev]);
    showToast(`Shipment ${trackingNumber} created successfully!`, 'success');
    return newShipment;
  };

  // Update Status
  const updateShipmentStatus = (trackingNumber: string, status: ShipmentStatus, location: string, note?: string) => {
    setShipments(prev => prev.map(s => {
      if (s.trackingNumber === trackingNumber) {
        const newEvent: TimelineEvent = {
          id: `evt-${Date.now()}`,
          status,
          title: `Status: ${status.replace(/_/g, ' ')}`,
          location: location || s.currentLocation,
          timestamp: new Date().toLocaleString(),
          description: note || `Shipment status updated to ${status.replace(/_/g, ' ')}.`,
          updatedBy: currentUser?.name || 'Authorized Operations Desk'
        };

        return {
          ...s,
          status,
          currentLocation: location || s.currentLocation,
          actualDeliveryDate: status === 'DELIVERED' ? new Date().toISOString() : s.actualDeliveryDate,
          timeline: [newEvent, ...s.timeline]
        };
      }
      return s;
    }));

    showToast(`Shipment ${trackingNumber} status updated to ${status.replace(/_/g, ' ')}`, 'info');
  };

  // Add timeline event
  const addTimelineEvent = (trackingNumber: string, event: Omit<TimelineEvent, 'id'>) => {
    setShipments(prev => prev.map(s => {
      if (s.trackingNumber === trackingNumber) {
        const fullEvent: TimelineEvent = {
          ...event,
          id: `evt-${Date.now()}`
        };
        return {
          ...s,
          status: event.status,
          currentLocation: event.location,
          timeline: [fullEvent, ...s.timeline]
        };
      }
      return s;
    }));
    showToast(`Milestone update added to ${trackingNumber}`, 'success');
  };

  // Request Quote
  const requestQuote = (quote: Omit<QuoteRequest, 'id' | 'requestDate' | 'status'>): QuoteRequest => {
    const id = `quot-${Date.now().toString().slice(-4)}`;
    const newQuote: QuoteRequest = {
      ...quote,
      id,
      requestDate: new Date().toLocaleString(),
      status: 'PENDING_REVIEW'
    };
    setQuotes(prev => [newQuote, ...prev]);
    showToast('Quote request submitted! Our cargo desk is reviewing your rates.', 'success');
    return newQuote;
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest['status'], adminNotes?: string) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status, adminNotes: adminNotes || q.adminNotes } : q));
    showToast(`Quote #${id} marked as ${status.replace(/_/g, ' ')}`, 'info');
  };

  // Convert Quote to Shipment
  const convertQuoteToShipment = (quoteId: string): Shipment | null => {
    const q = quotes.find(item => item.id === quoteId);
    if (!q) return null;

    const newShipment = createShipment({
      origin: q.origin,
      destination: q.destination,
      sender: {
        name: q.customerName,
        phone: q.phone,
        email: q.email,
        address: 'To be confirmed upon terminal arrival',
        city: q.origin.split(',')[0].trim(),
        country: q.origin.includes('Nigeria') ? 'Nigeria' : 'DRC'
      },
      receiver: {
        name: 'Consignee (Pending)',
        phone: q.phone,
        address: 'Destination terminal collection',
        city: q.destination.split(',')[0].trim(),
        country: q.destination.includes('Nigeria') ? 'Nigeria' : 'DRC'
      },
      serviceType: q.serviceLevel === 'EXPRESS_AIR' ? 'Express Cargo' : 'Air Cargo Services',
      cargoType: q.cargoType,
      items: [
        {
          description: `${q.cargoType} consignment`,
          category: q.cargoType,
          pieces: q.pieces,
          weightKg: q.weightKg,
          lengthCm: q.lengthCm,
          widthCm: q.widthCm,
          heightCm: q.heightCm
        }
      ],
      totalPieces: q.pieces,
      actualWeightKg: q.weightKg,
      volumetricWeightKg: Number(((q.lengthCm * q.widthCm * q.heightCm) / 5000).toFixed(2)),
      chargeableWeightKg: Math.max(q.weightKg, Number(((q.lengthCm * q.widthCm * q.heightCm) / 5000).toFixed(2))),
      status: 'BOOKED',
      currentLocation: q.origin,
      estimatedDeliveryDate: new Date(Date.now() + 4 * 86400000).toISOString(),
      paymentStatus: 'PENDING',
      totalAmountUSD: q.estimatedAmountUSD
    });

    updateQuoteStatus(quoteId, 'CONVERTED', `Converted to Waybill ${newShipment.trackingNumber}`);
    return newShipment;
  };

  // Pickup Requests
  const requestPickup = (pickup: Omit<PickupRequest, 'id' | 'requestDate' | 'status'>): PickupRequest => {
    const id = `pck-${Date.now().toString().slice(-4)}`;
    const newPickup: PickupRequest = {
      ...pickup,
      id,
      requestDate: new Date().toLocaleString(),
      status: 'SCHEDULED'
    };
    setPickups(prev => [newPickup, ...prev]);
    showToast('Pickup request booked! Our local dispatch will call you shortly.', 'success');
    return newPickup;
  };

  const updatePickupStatus = (id: string, status: PickupRequest['status']) => {
    setPickups(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    showToast(`Pickup request #${id} marked as ${status}`, 'info');
  };

  // Update Settings
  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('System and pricing configurations updated successfully.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        activeView,
        setActiveView,
        shipments,
        quotes,
        pickups,
        services,
        settings,
        currentUser,
        setCurrentUser,
        selectedTrackingNumber,
        setSelectedTrackingNumber,
        createShipment,
        updateShipmentStatus,
        addTimelineEvent,
        requestQuote,
        updateQuoteStatus,
        requestPickup,
        updatePickupStatus,
        updateSettings,
        convertQuoteToShipment,
        formatPrice,
        calculateShippingEstimate,
        showToast,
        toasts,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
