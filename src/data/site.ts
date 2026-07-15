import { Car, BadgePercent, Handshake, ShieldCheck, Headset } from 'lucide-react';
import cityImg from '../assets/city.webp';
import familyImg from '../assets/family.webp';
import adventureImg from '../assets/adventure.webp';
import luxuryImg from '../assets/luxury.webp';
import commercialImg from '../assets/commercial.webp';
import carAqua from '../assets/car-aqua.webp';
import carPrado from '../assets/car-prado.webp';
import carNv350 from '../assets/car-nv350.webp';
import carVezel from '../assets/car-vezel.webp';

export const heroBadges = [
  { title: '200+ Vehicles', sub: 'Wide Selection', icon: Car },
  { title: 'Best Prices', sub: 'Guaranteed', icon: BadgePercent },
  { title: 'Easy Financing', sub: 'Flexible Options', icon: Handshake },
  { title: 'Trusted Since 2005', sub: '20+ Years', icon: ShieldCheck },
  { title: 'After Sales Support', sub: "We're with you", icon: Headset },
];

export const inventoryHeroBadges = [
  { title: '200+', sub: 'Quality Vehicles', icon: Car },
  { title: 'Best Prices', sub: 'Guaranteed', icon: BadgePercent },
  { title: 'Trusted Since 2005', sub: '20+ Years of Excellence', icon: ShieldCheck },
];

export const lifestyles = [
  { slot: 'ls-city', src: cityImg, icon: '🚗', title: 'City Drive', sub: 'Compact & Efficient' },
  { slot: 'ls-family', src: familyImg, icon: '👨‍👩‍👧', title: 'Family', sub: 'Safe & Spacious' },
  { slot: 'ls-adventure', src: adventureImg, icon: '⛰', title: 'Adventure', sub: 'Rugged & Reliable' },
  { slot: 'ls-luxury', src: luxuryImg, icon: '◆', title: 'Luxury', sub: 'Premium & Elegant' },
  { slot: 'ls-commercial', src: commercialImg, icon: '🚚', title: 'Commercial', sub: 'Built for Business' },
];

export const featuredVehicles = [
  { slot: 'v-aqua', img: carAqua, badge: 'FEATURED', name: 'Toyota Aqua', specs: '2018 | Hybrid | Automatic', price: '5,950,000' },
  { slot: 'v-prado', img: carPrado, badge: 'LOW MILEAGE', name: 'Toyota Prado', specs: '2020 | Diesel | Automatic', price: '18,950,000' },
  { slot: 'v-nv350', img: carNv350, badge: 'NEW ARRIVAL', name: 'Nissan NV350', specs: '2019 | Diesel | Manual', price: '6,450,000' },
  { slot: 'v-vezel', img: carVezel, badge: 'PREMIUM', name: 'Honda Vezel', specs: '2021 | Petrol | Automatic', price: '7,850,000' },
];

export const sudaSuggestions = [
  'I need an SUV under 7 million',
  'Looking for a fuel efficient car',
  'Best family car with 7 seats',
];

export const inventorySudaSuggestions = [
  'I need an SUV under 7M',
  'Looking for a fuel efficient car',
  'Best family car with 7 seats',
];

export const tradeChecks = ['Free valuation', 'Best market price', 'Instant evaluation', 'Hassle free process'];

export const whyUs = [
  { icon: '🛡', title: 'Quality Assured', sub: 'Every vehicle is fully inspected' },
  { icon: '📋', title: 'Transparent Deals', sub: 'No hidden costs, complete transparency' },
  { icon: '💳', title: 'Easy Financing', sub: 'Flexible plans to fit your budget' },
  { icon: '🤝', title: 'Trusted Support', sub: 'Dedicated support before & after sale' },
  { icon: '⚙', title: 'Wide Selection', sub: '200+ vehicles across all categories' },
];

export const testimonials = [
  { slot: 't-1', quote: 'Excellent service and trustworthy staff.', name: 'Nuwan Perera', loc: 'Colombo' },
  { slot: 't-2', quote: 'Got my dream car at the best price. Highly recommend!', name: 'Tharushi Silva', loc: 'Gampaha' },
  { slot: 't-3', quote: 'Financing process was quick and easy.', name: 'Kasun Fernando', loc: 'Kurunegala' },
  { slot: 't-4', quote: 'After sales support is really great!', name: 'Dilshan Jayasekara', loc: 'Nittambuwa' },
];

export const socialIcons = ['f', '◎', '▶', '✆'];

export type Vehicle = {
  slot: string;
  name: string;
  brand: string;
  year: number;
  fuel: string;
  trans: string;
  km: number;
  price: number;
  body: string;
  cond: 'New' | 'Used' | 'Certified';
  badge: string;
  img?: string;
};

const vehicleImages: Record<string, string> = {
  'iv-prado': carPrado,
  'iv-aqua': carAqua,
  'iv-vezel': carVezel,
  'iv-nv350': carNv350,
};

export const inventoryVehicles: Vehicle[] = [
  { slot: 'iv-prado', name: 'Toyota Prado TX', brand: 'Toyota', year: 2020, fuel: 'Diesel', trans: 'Automatic', km: 59000, price: 18950000, body: 'SUV', cond: 'Used', badge: 'FEATURED' },
  { slot: 'iv-aqua', name: 'Toyota Aqua', brand: 'Toyota', year: 2018, fuel: 'Hybrid', trans: 'Automatic', km: 85000, price: 5950000, body: 'Car', cond: 'Used', badge: 'NEW ARRIVAL' },
  { slot: 'iv-vezel', name: 'Honda Vezel', brand: 'Honda', year: 2021, fuel: 'Petrol', trans: 'Automatic', km: 32000, price: 7850000, body: 'SUV', cond: 'Used', badge: 'LOW MILEAGE' },
  { slot: 'iv-nv350', name: 'Nissan NV350', brand: 'Nissan', year: 2019, fuel: 'Diesel', trans: 'Manual', km: 120000, price: 6450000, body: 'Van', cond: 'Used', badge: 'PREMIUM' },
  { slot: 'iv-harrier', name: 'Toyota Harrier', brand: 'Toyota', year: 2020, fuel: 'Petrol', trans: 'Automatic', km: 45000, price: 11950000, body: 'SUV', cond: 'Certified', badge: 'FEATURED' },
  { slot: 'iv-swift', name: 'Suzuki Swift', brand: 'Suzuki', year: 2019, fuel: 'Petrol', trans: 'Manual', km: 66000, price: 4350000, body: 'Hatchback', cond: 'Used', badge: 'NEW ARRIVAL' },
  { slot: 'iv-allion', name: 'Toyota Allion', brand: 'Toyota', year: 2020, fuel: 'Petrol', trans: 'Automatic', km: 28000, price: 5250000, body: 'Car', cond: 'Used', badge: 'LOW MILEAGE' },
  { slot: 'iv-outlander', name: 'Mitsubishi Outlander', brand: 'Mitsubishi', year: 2019, fuel: 'Diesel', trans: 'Automatic', km: 75000, price: 9850000, body: 'SUV', cond: 'Used', badge: 'PREMIUM' },
  { slot: 'iv-axio', name: 'Toyota Axio', brand: 'Toyota', year: 2018, fuel: 'Petrol', trans: 'Automatic', km: 58000, price: 3750000, body: 'Car', cond: 'Used', badge: 'FEATURED' },
  { slot: 'iv-hilux', name: 'Toyota Hilux', brand: 'Toyota', year: 2021, fuel: 'Diesel', trans: 'Automatic', km: 41000, price: 16500000, body: 'Truck', cond: 'Certified', badge: 'PREMIUM' },
  { slot: 'iv-fit', name: 'Honda Fit', brand: 'Honda', year: 2019, fuel: 'Hybrid', trans: 'Automatic', km: 72000, price: 6250000, body: 'Hatchback', cond: 'Used', badge: 'NEW ARRIVAL' },
  { slot: 'iv-caravan', name: 'Nissan Caravan', brand: 'Nissan', year: 2018, fuel: 'Diesel', trans: 'Manual', km: 98000, price: 7150000, body: 'Van', cond: 'Used', badge: 'LOW MILEAGE' },
].map((v) => ({ ...v, img: vehicleImages[v.slot] })) as Vehicle[];
