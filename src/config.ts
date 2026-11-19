// Pusat konfigurasi bisnis dan aturan desain LaundryCalc sesuai PRD dan DESIGN.md

export interface StoreInfo {
  name: string;
  whatsapp_number: string;
  opening_hours: string;
  pickup_hours: string;
  pickup_radius_max_km: number;
  minimum_charge_kg: number;
}

export interface MainService {
  code: 'L01' | 'L02' | 'L03';
  name: string;
  price_per_kg: number;
  duration_days: number;
  description: string;
}

export interface AddOnService {
  code: 'T01' | 'T02';
  name: string;
  price: number;
  calculation_type: 'flat' | 'per_billed_kg';
  notes: string;
}

export const STORE_INFO: StoreInfo = {
  name: 'Laundry UMKM',
  whatsapp_number: '6281234567890',
  opening_hours: '08:00 - 20:00 WIB',
  pickup_hours: '09:00 - 17:00 WIB',
  pickup_radius_max_km: 5,
  minimum_charge_kg: 3.0,
};

export const MAIN_SERVICES: readonly MainService[] = [
  {
    code: 'L01',
    name: 'Cuci Lipat',
    price_per_kg: 6000,
    duration_days: 3,
    description: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
  },
  {
    code: 'L02',
    name: 'Cuci Setrika',
    price_per_kg: 8000,
    duration_days: 3,
    description: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
  },
  {
    code: 'L03',
    name: 'Cuci Setrika Ekspres',
    price_per_kg: 15000,
    duration_days: 1,
    description: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
  },
] as const;

export const ADD_ONS: readonly AddOnService[] = [
  {
    code: 'T01',
    name: 'Antar-Jemput',
    price: 10000,
    calculation_type: 'flat',
    notes: 'Area penjemputan radius max 5 km',
  },
  {
    code: 'T02',
    name: 'Pewangi Premium',
    price: 2000,
    calculation_type: 'per_billed_kg',
    notes: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
  },
] as const;

export const APP_DEFAULTS = {
  defaultServiceCode: 'L01' as MainService['code'],
  defaultWeightInput: '3',
  weightStep: 0.1,
  storageKey: 'laundrycalc_order_draft_v1',
} as const;
