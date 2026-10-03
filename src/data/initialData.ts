import { Shipment, QuoteRequest, PickupRequest, ServiceItem, SystemSettings } from '../types';

export const INITIAL_SETTINGS: SystemSettings = {
  companyName: "DANGO CARGO AIR SERVICES",
  tagline: "SAFE. FAST. RELIABLE. Cargo & Freight Solutions.",
  directorDrcPhones: ["+243812396407", "+243994446797"],
  nigeriaOfficePhone: "09038009570",
  ossyPhone: "+234 8035507501",
  emekaPhone: "+234 9016795209",
  whatsappPhone: "+243812396407",
  supportEmail: "info@dangocargo.com",
  lagosAddress: "God's favour plaza shop 5 opposite zone C block 8 shop 21, Lagos, Nigeria",
  congoAddress: "Av Dodoma 54 C/ Barumbu, Kinshasa, DRC",
  standardRatePerKgUSD: 6.5,
  expressRatePerKgUSD: 9.8,
  minimumChargeUSD: 35.0,
  pickupFeeUSD: 20.0,
  deliveryFeeUSD: 25.0,
  volumetricDivisor: 5000,
  exchangeRates: {
    USD_TO_NGN: 1550,
    USD_TO_CDF: 2850
  },
  supportedPaymentMethods: {
    card: true,
    bankTransfer: true,
    mobileMoney: true,
    cashAtOffice: true
  }
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "air-cargo",
    title: "Air Cargo Services",
    frenchTitle: "Services de Fret Aérien",
    tagline: "High-priority direct scheduled flights connecting Lagos & Kinshasa",
    description: "Scheduled and chartered air cargo space for swift, secure transport across Central and West Africa, guaranteeing rapid turnaround and careful handling.",
    frenchDescription: "Espace de fret aérien régulier et affrété pour un transport rapide et sécurisé entre l'Afrique centrale et l'Afrique de l'Ouest.",
    iconName: "Plane",
    benefits: ["Transit in 24–48 hours", "Direct cargo flights", "Temperature & fragile controls", "Real-time milestone updates"],
    process: ["Cargo intake at terminal", "Security screening & weighing", "Flight manifesting", "Express arrival & customs"],
    recommendedFor: "Time-sensitive commercial inventory, urgent documents, electronics, and valuable freight.",
    available: true
  },
  {
    id: "cargo-freight",
    title: "Cargo & Freight Solutions",
    frenchTitle: "Solutions de Fret & Marchandises",
    tagline: "Comprehensive end-to-end multi-modal freight transport",
    description: "Full supply chain management handling pallets, bulk consignments, and multi-piece commercial cargo between Nigerian trade centers and DRC markets.",
    frenchDescription: "Gestion complète de la chaîne d'approvisionnement pour palettes et expéditions commerciales entre le Nigeria et la RDC.",
    iconName: "Boxes",
    benefits: ["Palletized container capacity", "Discounted volume tariffs", "Export documentation support", "Dedicated freight specialist"],
    process: ["Booking consultation", "Pallet wrapping & strapping", "Airwaybill generation", "Destination delivery"],
    recommendedFor: "Manufacturers, FMCG distributors, industrial equipment, and large trading groups.",
    available: true
  },
  {
    id: "international-shipping",
    title: "International Shipping",
    frenchTitle: "Expédition Internationale",
    tagline: "Cross-border compliance, transit clearance, and global airlinks",
    description: "Seamless international cross-border cargo transportation navigating customs regulations, border clearance, and regulatory compliance effortlessly.",
    frenchDescription: "Transport transfrontalier transparent avec conformité douanière et réglementaire complète.",
    iconName: "Globe",
    benefits: ["Full customs brokerage", "Clearance assistance in Lagos & Kinshasa", "Duty estimation clarity", "Bonded terminal transfer"],
    process: ["Commercial invoice audit", "Export filing", "Border clearance", "Terminal handover"],
    recommendedFor: "Importers and exporters operating cross-border commercial transactions.",
    available: true
  },
  {
    id: "door-to-door",
    title: "Door-to-Door Delivery",
    frenchTitle: "Livraison Porte-à-Porte",
    tagline: "Collected right from your doorstep, delivered directly to the recipient",
    description: "Hassle-free collection from your warehouse, shop, or residence in Lagos or Kinshasa, with secure direct delivery to the recipient's exact address.",
    frenchDescription: "Enlèvement directement à votre adresse et livraison sécurisée au destinataire à Lagos et Kinshasa.",
    iconName: "Truck",
    benefits: ["Zero terminal visits required", "Signature upon delivery confirmation", "GPS route dispatch", "Secure parcel vans"],
    process: ["Courier dispatch for pickup", "Air transport corridor", "Local delivery van dispatch", "Recipient signature"],
    recommendedFor: "Retailers, e-commerce vendors, busy executives, and residential senders.",
    available: true
  },
  {
    id: "airport-to-airport",
    title: "Airport-to-Airport Cargo",
    frenchTitle: "Fret Aéroport-à-Aéroport",
    tagline: "Cost-effective terminal drop-off and collection service",
    description: "Ideal for commercial forwarders, corporate logistics teams, and brokers who manage their own local pickup and final-mile distribution.",
    frenchDescription: "Idéal pour les transitaires et entreprises gérant leurs propres démarches de dédouanement local.",
    iconName: "Building2",
    benefits: ["Lowest per-kilogram tariff", "Instant air waybill issuance", "Immediate tarmac release", "Flexible collection hours"],
    process: ["Drop-off at Lagos or Kinshasa cargo shed", "Weighing & tagging", "Direct flight transit", "Notify consignee for pickup"],
    recommendedFor: "Freight forwarders, logistics brokers, and bulk cargo consolidators.",
    available: true
  },
  {
    id: "import-export",
    title: "Import & Export Logistics",
    frenchTitle: "Logistique d'Import-Export",
    tagline: "Expert customs handling for bilateral West & Central Africa commerce",
    description: "Specialized trade corridor support facilitating bilateral exchange between the Federal Republic of Nigeria and the Democratic Republic of Congo.",
    frenchDescription: "Assistance spécialisée pour le corridor commercial entre le Nigeria et la République Démocratique du Congo.",
    iconName: "ArrowLeftRight",
    benefits: ["Regulatory alignment", "Tariff classification assistance", "Fast-track customs release", "Commercial invoice advisory"],
    process: ["Pre-shipment inspection check", "Duty assessment", "Terminal clearance", "Final handover"],
    recommendedFor: "Trading houses, industrial suppliers, agricultural equipment dealers, and textile merchants.",
    available: true
  },
  {
    id: "commercial-cargo",
    title: "Commercial Cargo",
    frenchTitle: "Fret Commercial",
    tagline: "Heavyweight retail inventory, machinery, and wholesale consignments",
    description: "Engineered for wholesale merchants and enterprises requiring reliable, high-volume cargo allocations with guaranteed flight space.",
    frenchDescription: "Conçu pour les commerçants et grossistes nécessitant des capacités fiables à grand volume.",
    iconName: "Warehouse",
    benefits: ["Volume pricing tiers", "Priority loading status", "Reserved freight space", "Dedicated account representative"],
    process: ["Inventory staging", "Secure strapping & weighing", "Manifest validation", "Destination discharge"],
    recommendedFor: "Wholesalers, supermarket chains, automotive parts suppliers, and pharmaceutical distributors.",
    available: true
  },
  {
    id: "personal-cargo",
    title: "Personal Cargo",
    frenchTitle: "Effets Personnels & Bagages",
    tagline: "Safe transportation for family shipments, gifts, and personal goods",
    description: "Caring, protective handling for personal belongings, family remittances, home goods, and luggage sent between family members and loved ones.",
    frenchDescription: "Traitement soigneux pour colis familiaux, bagages et effets personnels entre proches.",
    iconName: "ShieldCheck",
    benefits: ["Accessible rates", "Friendly counter service in Lagos & Kinshasa", "Transparent tracking updates", "Careful carton packing"],
    process: ["Package check", "Labeling with sender & recipient contact", "Air transit", "Collection at destination"],
    recommendedFor: "Individuals, expatriates, families, students, and personal travelers.",
    available: true
  },
  {
    id: "business-cargo",
    title: "Business Cargo Solutions",
    frenchTitle: "Solutions de Fret pour Entreprises",
    tagline: "Contractual logistics with credit terms, invoicing, and corporate SLAs",
    description: "B2B shipping agreements with structured service levels, consolidated monthly billing, customized reporting, and priority flight bookings.",
    frenchDescription: "Contrats d'expédition interentreprises avec facturation mensuelle et engagement de niveau de service.",
    iconName: "Briefcase",
    benefits: ["Monthly invoice terms", "Dedicated operations hotline", "Custom SLA reporting", "Preferential seasonal rates"],
    process: ["Corporate account setup", "Scheduled weekly cargo intake", "Priority air dispatch", "Consolidated monthly billing"],
    recommendedFor: "Corporations, manufacturing plants, financial institutions, and multinational firms.",
    available: true
  },
  {
    id: "freight-consolidation",
    title: "Freight Consolidation",
    frenchTitle: "Groupage de Fret",
    tagline: "Combine smaller packages into single pallets to maximize cost savings",
    description: "Save substantially by pooling your smaller shipments into our regular consolidated cargo runs between Lagos and Kinshasa.",
    frenchDescription: "Réduisez vos coûts en regroupant vos petits colis dans nos vols réguliers de groupage.",
    iconName: "Layers",
    benefits: ["Significant cost reduction", "No package is too small", "Scheduled weekly consolidations", "Itemized barcoding"],
    process: ["Receipt of packages", "Bin consolidation & manifesting", "Bulk flight handling", "Individual de-consolidation"],
    recommendedFor: "Small business merchants, boutique importers, and cost-conscious shippers.",
    available: true
  },
  {
    id: "cargo-pickup-delivery",
    title: "Cargo Pickup & Delivery",
    frenchTitle: "Collecte & Livraison de Colis",
    tagline: "Rapid localized collection by Dango Cargo dispatch fleet",
    description: "Equipped with dedicated box vans and dispatch riders, our team collects your cargo directly from your premises across major commercial districts.",
    frenchDescription: "Flotte de camionnettes dédiée pour récupérer vos marchandises directement à votre adresse.",
    iconName: "Compass",
    benefits: ["Scheduled pickup windows", "Immediate scale weigh-in at pickup", "Receipt issuance on the spot", "Heavy lift assistance"],
    process: ["Schedule online or via WhatsApp", "Driver arrival & inspection", "Transport to Dango terminal", "Air flight dispatch"],
    recommendedFor: "Businesses and individuals who cannot travel to the airport cargo shed.",
    available: true
  },
  {
    id: "special-fragile",
    title: "Special & Fragile Cargo Handling",
    frenchTitle: "Fret Spécial & Objets Fragiles",
    tagline: "Custom wooden crating, shock dampening, and white-glove supervision",
    description: "Specialized protocols for fragile electronics, precision testing instruments, medical supplies, and delicate goods requiring utmost care.",
    frenchDescription: "Protocoles spécialisés pour l'électronique fragile, instruments de précision et matériels délicats.",
    iconName: "ShieldAlert",
    benefits: ["Custom crating & foam wrapping", "Fragile labels & top-load strictly", "Hand-carried security checks", "Special handling insurance option"],
    process: ["Vulnerability inspection", "Protective cushioning & crating", "Monitored manual loading", "Supervised destination handover"],
    recommendedFor: "Medical devices, telecommunication equipment, precision glassware, and high-value optics.",
    available: true
  },
  {
    id: "express-cargo",
    title: "Express Cargo",
    frenchTitle: "Fret Express Prioritaire",
    tagline: "Next-available flight departure with top-deck priority clearance",
    description: "When hours count: fast-tracked boarding on the very next scheduled flight, with immediate destination clearance and rapid delivery notification.",
    frenchDescription: "Embarquement prioritaire sur le tout premier vol disponible avec dédouanement accéléré.",
    iconName: "Zap",
    benefits: ["Fastest transit time", "Priority aircraft stowage", "Express counter processing", "Dedicated courier accompaniment"],
    process: ["Immediate dispatch boarding", "Tarmac priority release", "Fast-track customs clearance", "Direct handoff to consignee"],
    recommendedFor: "Critical spare parts, urgent contractual documents, emergency pharmaceuticals, and time-critical samples.",
    available: true
  },
  {
    id: "logistics-distribution",
    title: "Logistics & Distribution",
    frenchTitle: "Logistique & Distribution",
    tagline: "Short-term bonded warehousing, inventory sorting, and hub dispatch",
    description: "Full distribution support with secure staging facilities in both Lagos and Kinshasa, enabling regional distribution across adjoining commercial hubs.",
    frenchDescription: "Entreposage sous douane sécurisé et distribution régionale depuis Lagos et Kinshasa.",
    iconName: "TrendingUp",
    benefits: ["Secure covered warehouse space", "Pick and pack capabilities", "Inventory counting and verification", "Secondary distribution routes"],
    process: ["Cargo intake & warehouse barcode", "Secure staging", "Order breakout", "Final dispatch"],
    recommendedFor: "Regional traders, consumer goods brands, and cross-border commercial distributors.",
    available: true
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: "shp-001",
    trackingNumber: "DCA-2026-001089",
    origin: "Lagos (LOS), Nigeria",
    destination: "Kinshasa (FIH), DRC",
    sender: {
      name: "Chukwudi Okafor",
      company: "AfriTech Supplies Ltd",
      phone: "+234 803 550 7501",
      email: "c.okafor@afritech.ng",
      address: "Zone C Block 8 Shop 21, Trade Fair Complex",
      city: "Lagos",
      country: "Nigeria"
    },
    receiver: {
      name: "Jean-Pierre Kabangu",
      company: "Congo Telek Sarl",
      phone: "+243 812 396 407",
      email: "jp.kabangu@congotelek.cd",
      address: "Av Dodoma 54 C/ Barumbu",
      city: "Kinshasa",
      country: "DRC"
    },
    serviceType: "Air Cargo Services",
    cargoType: "Commercial Electronics & Accessories",
    items: [
      { description: "Telecommunication modem units", category: "Electronics", pieces: 8, weightKg: 45.0, lengthCm: 60, widthCm: 40, heightCm: 35 },
      { description: "Display modules & cables", category: "Commercial Goods", pieces: 4, weightKg: 28.5, lengthCm: 50, widthCm: 40, heightCm: 30 }
    ],
    totalPieces: 12,
    actualWeightKg: 73.5,
    volumetricWeightKg: 52.8,
    chargeableWeightKg: 73.5,
    status: "IN_TRANSIT",
    currentLocation: "En route to N'Djili International Airport (FIH), Kinshasa",
    flightOrTripNumber: "DC-742",
    bookingDate: "2026-09-29T09:30:00Z",
    estimatedDeliveryDate: "2026-10-03T16:00:00Z",
    paymentStatus: "PAID",
    totalAmountUSD: 477.75,
    currencyPaid: "USD",
    timeline: [
      {
        id: "evt-1",
        status: "BOOKED",
        title: "Airwaybill Issued",
        location: "Lagos Cargo Terminal, Nigeria",
        timestamp: "2026-09-29 09:30",
        description: "Shipment registered into Dango Cargo Air Services system. Waybill DCA-2026-001089 generated.",
        updatedBy: "Operations Desk Lagos"
      },
      {
        id: "evt-2",
        status: "RECEIVED",
        title: "Cargo Received at Lagos Terminal",
        location: "God's Favour Plaza Shop 5, Lagos",
        timestamp: "2026-09-29 14:15",
        description: "12 cartons received, inspected, verified weight 73.5 kg. Export tags applied.",
        updatedBy: "Lead Inspector Emeka"
      },
      {
        id: "evt-3",
        status: "PROCESSING",
        title: "Export Customs Documentation Completed",
        location: "Murtala Muhammed Cargo Wing (LOS)",
        timestamp: "2026-09-30 11:00",
        description: "Customs declaration reviewed and accepted. Security scan cleared with zero discrepancies.",
        updatedBy: "Customs Broker Team"
      },
      {
        id: "evt-4",
        status: "PACKED",
        title: "Consolidated on Aircraft Pallet #DC-44",
        location: "LOS Air Freight Shed",
        timestamp: "2026-09-30 18:45",
        description: "Shipment wrapped, strapped onto aviation pallet DC-44, and transferred to ramp staging.",
        updatedBy: "Ramp Handler OSSY"
      },
      {
        id: "evt-5",
        status: "IN_TRANSIT",
        title: "Departed on Direct Cargo Flight DC-742",
        location: "Lagos (LOS) Airspace",
        timestamp: "2026-10-01 04:20",
        description: "Aircraft airborne en route to Kinshasa N'Djili International Airport (FIH).",
        updatedBy: "Flight Operations Control"
      }
    ],
    specialInstructions: "Handle with care. Temperature sensitive electronic modules.",
    isDemo: true
  },
  {
    id: "shp-002",
    trackingNumber: "DCA-2026-001092",
    origin: "Kinshasa (FIH), DRC",
    destination: "Lagos (LOS), Nigeria",
    sender: {
      name: "Gisele Mwamba",
      company: "Kivu Crafts Cooperative",
      phone: "+243 994 446 797",
      email: "gisele@kivucrafts.cd",
      address: "Commune de Barumbu, Av Dodoma",
      city: "Kinshasa",
      country: "DRC"
    },
    receiver: {
      name: "Folake Adebayo",
      company: "Lagos Heritage Boutique",
      phone: "+234 901 679 5209",
      email: "folake@heritage.ng",
      address: "Victoria Island, Lagos",
      city: "Lagos",
      country: "Nigeria"
    },
    serviceType: "Door-to-Door Delivery",
    cargoType: "Artisanal Textiles & Handicrafts",
    items: [
      { description: "Handwoven fabrics and carvings", category: "Clothing", pieces: 6, weightKg: 34.0, lengthCm: 45, widthCm: 45, heightCm: 40 }
    ],
    totalPieces: 6,
    actualWeightKg: 34.0,
    volumetricWeightKg: 16.2,
    chargeableWeightKg: 35.0,
    status: "ARRIVED_DESTINATION",
    currentLocation: "Lagos Murtala Muhammed International Airport (LOS) Cargo Clearing Shed",
    flightOrTripNumber: "DC-740",
    bookingDate: "2026-09-27T10:00:00Z",
    estimatedDeliveryDate: "2026-10-02T18:00:00Z",
    paymentStatus: "PAID",
    totalAmountUSD: 247.50,
    currencyPaid: "USD",
    timeline: [
      {
        id: "evt-201",
        status: "BOOKED",
        title: "Booking Confirmed",
        location: "Kinshasa Office (Barumbu)",
        timestamp: "2026-09-27 10:00",
        description: "Booking registered via Dango Cargo Kinshasa reception.",
        updatedBy: "Kinshasa Operations"
      },
      {
        id: "evt-202",
        status: "RECEIVED",
        title: "Intake at Av Dodoma 54",
        location: "Kinshasa, DRC",
        timestamp: "2026-09-27 14:00",
        description: "Cargo inspected and sealed with security tape.",
        updatedBy: "Director DRC Desk"
      },
      {
        id: "evt-203",
        status: "IN_TRANSIT",
        title: "Departed Kinshasa N'Djili (FIH)",
        location: "Kinshasa Airport",
        timestamp: "2026-09-29 08:15",
        description: "Cargo boarded flight DC-740.",
        updatedBy: "Ramp Supervisor"
      },
      {
        id: "evt-204",
        status: "ARRIVED_DESTINATION",
        title: "Touchdown at Lagos MMA Cargo Shed",
        location: "Lagos, Nigeria",
        timestamp: "2026-10-01 19:30",
        description: "Aircraft arrived. Consignment offloaded and staging in clearing area.",
        updatedBy: "Lagos Duty Manager"
      }
    ],
    specialInstructions: "Call Folake on arrival. Confirm door delivery gate code.",
    isDemo: true
  },
  {
    id: "shp-003",
    trackingNumber: "DCA-2026-001095",
    origin: "Lagos (LOS), Nigeria",
    destination: "Kinshasa (FIH), DRC",
    sender: {
      name: "Alhaji Bello Garba",
      company: "Northern Agro Machineries",
      phone: "+234 803 550 7501",
      email: "bello@northerngarba.ng",
      address: "Ikeja Industrial Estate",
      city: "Lagos",
      country: "Nigeria"
    },
    receiver: {
      name: "Dr. Patrick Mukendi",
      company: "Agri-Congo Enterprises",
      phone: "+243 812 396 407",
      email: "mukendi@agricongo.cd",
      address: "Boulevard du 30 Juin, Gombe",
      city: "Kinshasa",
      country: "DRC"
    },
    serviceType: "Express Cargo",
    cargoType: "Urgent Agricultural Water Pump Spare Parts",
    items: [
      { description: "Hydraulic pump valves & seals", category: "Machinery", pieces: 3, weightKg: 18.0, lengthCm: 35, widthCm: 35, heightCm: 30 }
    ],
    totalPieces: 3,
    actualWeightKg: 18.0,
    volumetricWeightKg: 7.35,
    chargeableWeightKg: 18.0,
    status: "DELIVERED",
    currentLocation: "Delivered to Agri-Congo HQ, Kinshasa",
    flightOrTripNumber: "DC-738",
    bookingDate: "2026-09-25T08:00:00Z",
    estimatedDeliveryDate: "2026-09-28T14:00:00Z",
    actualDeliveryDate: "2026-09-28T11:45:00Z",
    paymentStatus: "PAID",
    totalAmountUSD: 196.40,
    currencyPaid: "USD",
    timeline: [
      {
        id: "evt-301",
        status: "BOOKED",
        title: "Express Air Waybill Created",
        location: "Lagos Office",
        timestamp: "2026-09-25 08:00",
        description: "Priority processing activated.",
        updatedBy: "Express Desk"
      },
      {
        id: "evt-302",
        status: "IN_TRANSIT",
        title: "Flown to Kinshasa FIH",
        location: "Flight DC-738",
        timestamp: "2026-09-26 06:00",
        description: "Direct flight to N'Djili Airport.",
        updatedBy: "Flight Dispatch"
      },
      {
        id: "evt-303",
        status: "OUT_FOR_DELIVERY",
        title: "Out for Final Door Delivery",
        location: "Kinshasa, Gombe",
        timestamp: "2026-09-28 09:30",
        description: "Dispatched with Courier Van #03.",
        updatedBy: "Kinshasa Driver"
      },
      {
        id: "evt-304",
        status: "DELIVERED",
        title: "Successfully Handed Over & Signed",
        location: "Agri-Congo HQ, Boulevard du 30 Juin",
        timestamp: "2026-09-28 11:45",
        description: "Received in pristine condition by Dr. Patrick Mukendi. Signature logged.",
        updatedBy: "Delivery Agent"
      }
    ],
    specialInstructions: "Priority delivery - critical equipment for planting season.",
    isDemo: true
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: "quot-101",
    requestDate: "2026-10-01 14:20",
    customerName: "Chief Samuel Obi",
    email: "samuel.obi@obigroup.com",
    phone: "+234 802 334 1199",
    origin: "Lagos (LOS), Nigeria",
    destination: "Kinshasa (FIH), DRC",
    cargoType: "Commercial Goods",
    weightKg: 120,
    lengthCm: 80,
    widthCm: 60,
    heightCm: 50,
    pieces: 5,
    serviceLevel: "STANDARD_AIR",
    pickupRequired: true,
    deliveryRequired: true,
    estimatedAmountUSD: 825.00,
    status: "PENDING_REVIEW"
  },
  {
    id: "quot-102",
    requestDate: "2026-10-01 16:45",
    customerName: "Madame Mireille Kasongo",
    email: "mireille.kasongo@gmail.com",
    phone: "+243 898 776 543",
    origin: "Kinshasa (FIH), DRC",
    destination: "Lagos (LOS), Nigeria",
    cargoType: "Clothing",
    weightKg: 45,
    lengthCm: 50,
    widthCm: 40,
    heightCm: 40,
    pieces: 2,
    serviceLevel: "CARGO_CONSOLIDATION",
    pickupRequired: false,
    deliveryRequired: false,
    estimatedAmountUSD: 292.50,
    status: "APPROVED"
  }
];

export const INITIAL_PICKUPS: PickupRequest[] = [
  {
    id: "pck-501",
    requestDate: "2026-10-02 08:30",
    customerName: "Ibrahim Danjuma",
    phone: "+234 814 555 9812",
    email: "ibrahim@danjuma-imports.com",
    pickupAddress: "Shop 14, Alaba International Market",
    city: "Lagos",
    country: "Nigeria",
    cargoType: "Electronics",
    estimatedWeightKg: 85,
    packageCount: 4,
    preferredDate: "2026-10-03",
    preferredTimeWindow: "10:00 AM - 1:00 PM",
    status: "SCHEDULED",
    notes: "Call driver 30 minutes before arrival at main gate."
  },
  {
    id: "pck-502",
    requestDate: "2026-10-01 15:10",
    customerName: "Dieudonné Bakole",
    phone: "+243 811 234 567",
    email: "bakole@kin-logistics.cd",
    pickupAddress: "Avenue Kasa-Vubu No 120",
    city: "Kinshasa",
    country: "DRC",
    cargoType: "Household Items",
    estimatedWeightKg: 50,
    packageCount: 2,
    preferredDate: "2026-10-02",
    preferredTimeWindow: "02:00 PM - 05:00 PM",
    status: "DISPATCHED",
    notes: "Fragile dishware in heavy double boxes."
  }
];

export const FAQS = [
  {
    q: "How do I ship cargo with Dango Cargo Air Services?",
    frenchQ: "Comment expédier du fret avec Dango Cargo Air Services ?",
    a: "Shipping is simple and streamlined: 1) Get a quote or book online via our portal, 2) Drop your goods off at our Lagos (God's Favour Plaza Shop 5) or Kinshasa (Av Dodoma 54) office, or request a doorstep pickup, 3) Receive your official Air Waybill tracking code (e.g., DCA-2026-001089), and 4) Track your cargo until final delivery or collection.",
    frenchA: "L'expédition est très simple : 1) Obtenez un devis ou réservez en ligne, 2) Déposez votre marchandise à notre agence de Lagos (God's Favour Plaza) ou Kinshasa (Av Dodoma 54) ou demandez un enlèvement à domicile, 3) Recevez votre numéro de lettre de transport aérien, et 4) Suivez votre colis jusqu'à la livraison finale.",
    category: "Shipping"
  },
  {
    q: "How does live shipment tracking work?",
    frenchQ: "Comment fonctionne le suivi de cargaison en direct ?",
    a: "Every consignment is assigned a unique Air Waybill tracking number (e.g. DCA-2026-001089). Enter this number on our Track Shipment page to see the verified 8-stage progress: Booked, Received, Processing, Packed, In Transit, Arrived at Destination, Out for Delivery, and Delivered, including timestamps, terminal locations, and handler updates.",
    frenchA: "Chaque envoi reçoit un numéro de suivi unique (ex. DCA-2026-001089). Saisissez ce code dans la page Suivi pour visualiser l'historique complet en 8 étapes avec horodatage et localisation.",
    category: "Tracking"
  },
  {
    q: "How is cargo pricing calculated (Actual vs Volumetric Weight)?",
    frenchQ: "Comment le tarif de fret est-il calculé (Poids réel vs volumétrique) ?",
    a: "Under international air freight standards (IATA), air cargo is billed on Chargeable Weight — which is the greater of actual scale weight (kg) or volumetric weight (Length × Width × Height in cm ÷ 5,000). Our online calculator automatically calculates both figures so you have absolute transparency before shipping.",
    frenchA: "Selon les normes IATA, le fret aérien est facturé sur le poids le plus élevé entre le poids réel (balance) et le poids volumétrique (L x l x H en cm ÷ 5 000). Notre calculateur en ligne détermine instantanément ces données en toute transparence.",
    category: "Pricing"
  },
  {
    q: "What items are prohibited or restricted from air cargo?",
    frenchQ: "Quels articles sont interdits ou soumis à restriction ?",
    a: "In compliance with aviation safety regulations, hazardous materials (flammable liquids, explosives, pressurized gas cylinders, corrosives, radioactive items) and illegal contraband cannot be transported. Lithium batteries, perfumes, and certain chemical products require prior clearance and declaration.",
    frenchA: "Conformément aux normes aéronautiques, les matières dangereuses (explosifs, liquides inflammables, gaz sous pression) et produits illégaux sont formellement interdits. Les batteries au lithium nécessitent une déclaration préalable.",
    category: "Compliance"
  },
  {
    q: "Can Dango Cargo collect items from my home or market warehouse?",
    frenchQ: "Dango Cargo peut-il collecter des colis à mon domicile ou magasin ?",
    a: "Yes! We operate dedicated pickup and delivery fleets in both Lagos and Kinshasa. You can submit a 'Request a Pickup' online with your address and preferred collection time window, and our team will weigh, label, and safely transport your goods to the airport terminal.",
    frenchA: "Oui ! Nous disposons d'une flotte dédiée de collecte à Lagos et Kinshasa. Remplissez le formulaire de demande d'enlèvement et nos équipes viendront récupérer vos colis.",
    category: "Services"
  },
  {
    q: "How can I contact the Dango Cargo leadership and dispatch teams?",
    frenchQ: "Comment contacter la direction et les équipes de Dango Cargo ?",
    a: "You can reach our Director's DRC desks directly at +243812396407 and +243994446797; our Nigeria operations line at 09038009570; and our dispatch leads OSSY (+234 8035507501) and EMEKA (+234 9016795209). You can also chat directly with us on WhatsApp.",
    frenchA: "Vous pouvez joindre directement la Direction RDC au +243812396407 et +243994446797, le bureau du Nigeria au 09038009570, ainsi que nos responsables OSSY (+234 8035507501) et EMEKA (+234 9016795209). Nous sommes également disponibles sur WhatsApp.",
    category: "Support"
  }
];
