export type CarCondition = 'Excellent' | 'Good' | 'Fair';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage_km: number;
  condition: CarCondition;
  color: string;
  price: number;
  ai_price: number | null;
  ai_insights: string | null;
  images: string[];
  description: string | null;
  seller_name: string | null;
  seller_phone: string | null;
  seller_telegram: string | null;
  seller_instagram: string | null;
  user_id: string | null;
  created_at: string;
}

export interface CarInput {
  brand: string;
  model: string;
  year: number;
  mileage_km: number;
  condition: CarCondition;
  color: string;
  price: number;
  ai_price?: number | null;
  ai_insights?: string | null;
  images: string[];
  description?: string | null;
  seller_name?: string | null;
  seller_phone?: string | null;
  seller_telegram?: string | null;
  seller_instagram?: string | null;
}

export const CAR_CONDITIONS: CarCondition[] = ['Excellent', 'Good', 'Fair'];

export const CAR_CONDITION_LABELS: Record<CarCondition, string> = {
  Excellent: "A'lo",
  Good: 'Yaxshi',
  Fair: "O'rtacha",
};

export const CAR_COLORS: { name: string; hex: string }[] = [
  { name: 'Oq', hex: '#F0F0F0' },
  { name: 'Marvarad oq', hex: '#F5F5F5' },
  { name: 'Qora', hex: '#0B0F19' },
  { name: "To'q qora", hex: '#1A1A1A' },
  { name: 'Kulrang', hex: '#9A9A9A' },
  { name: 'Qizil', hex: '#B3241B' },
  { name: 'Yashil', hex: '#2E8B57' },
  { name: "Ko'k", hex: '#1E90FF' },
  { name: 'Kumush', hex: '#C0C0C0' },
  { name: 'Shampan', hex: '#E8D5A0' },
];

export const POPULAR_BRANDS = [
  'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Tesla', 'Lamborghini',
  'Ferrari', 'Toyota', 'Hyundai', 'Lexus', 'Honda', 'Volkswagen',
  'Nissan', 'Mazda', 'Subaru', 'Kia', 'Genesis', 'Bentley',
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export const formatMileage = (n: number) =>
  new Intl.NumberFormat('en-US').format(n) + ' km';

export const formatNumber = (n: number) => new Intl.NumberFormat('en-US').format(n);
