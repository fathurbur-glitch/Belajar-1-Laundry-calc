// Logika murni perhitungan berat ditagih dan rincian biaya pesanan laundry

import {
  ADD_ONS,
  MAIN_SERVICES,
  STORE_INFO,
  type MainService,
} from '../config';
import { parseWeightInput } from './formatters';

export interface OrderCalculationInput {
  serviceCode: MainService['code'];
  rawWeight: string;
  isDeliveryActive: boolean;
  isFragranceActive: boolean;
}

export interface OrderCalculationResult {
  service: MainService;
  actualWeightKg: number | null;
  isWeightValid: boolean;
  billedWeightKg: number;
  isMinChargeApplied: boolean;
  mainCost: number;
  deliveryCost: number;
  fragranceCost: number;
  addOnTotal: number;
  totalCost: number;
}

const MINIMUM_VALID_WEIGHT_KG = 0.1;

/**
 * Menghitung berat ditagih berdasarkan aturan minimum charge 3 kg (BL-01).
 */
export function calculateBilledWeight(actualWeightKg: number): number {
  return Math.max(STORE_INFO.minimum_charge_kg, actualWeightKg);
}

/**
 * Menghitung seluruh komponen biaya layanan utama, add-on, dan total estimasi (BL-01 & BL-02).
 */
export function calculateOrderSummary(
  input: OrderCalculationInput,
): OrderCalculationResult {
  const service =
    MAIN_SERVICES.find((item) => item.code === input.serviceCode) ??
    MAIN_SERVICES[0];
  const deliveryAddOn = ADD_ONS.find((item) => item.code === 'T01')!;
  const fragranceAddOn = ADD_ONS.find((item) => item.code === 'T02')!;

  const parsedWeight = parseWeightInput(input.rawWeight);
  const isWeightValid =
    parsedWeight !== null && parsedWeight >= MINIMUM_VALID_WEIGHT_KG;

  const billedWeightKg = isWeightValid
    ? calculateBilledWeight(parsedWeight)
    : 0;
  const isMinChargeApplied =
    isWeightValid && parsedWeight < STORE_INFO.minimum_charge_kg;

  const mainCost = isWeightValid
    ? Math.round(billedWeightKg * service.price_per_kg)
    : 0;
  const deliveryCost = input.isDeliveryActive ? deliveryAddOn.price : 0;
  const fragranceCost =
    isWeightValid && input.isFragranceActive
      ? Math.round(billedWeightKg * fragranceAddOn.price)
      : 0;
  const addOnTotal = deliveryCost + fragranceCost;
  const totalCost = mainCost + addOnTotal;

  return {
    service,
    actualWeightKg: parsedWeight,
    isWeightValid,
    billedWeightKg,
    isMinChargeApplied,
    mainCost,
    deliveryCost,
    fragranceCost,
    addOnTotal,
    totalCost,
  };
}
