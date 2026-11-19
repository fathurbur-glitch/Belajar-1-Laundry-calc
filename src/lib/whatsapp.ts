// Validasi formulir pemesan dan generator tautan pesan WhatsApp sesuai template PRD

import { STORE_INFO } from '../config';
import { formatRupiah, formatWeightKg } from './formatters';

export interface OrderFormValues {
  rawWeight: string;
  isWeightValid: boolean;
  isDeliveryActive: boolean;
  customerName: string;
  pickupAddress: string;
  notes: string;
}

export interface OrderValidationErrors {
  weight?: string;
  customerName?: string;
  pickupAddress?: string;
}

export interface WhatsAppMessagePayload {
  customerName: string;
  serviceName: string;
  actualWeightKg: number;
  billedWeightKg: number;
  isDeliveryActive: boolean;
  deliveryCost: number;
  isFragranceActive: boolean;
  fragranceCost: number;
  pickupAddress: string;
  notes: string;
  totalCost: number;
}

/**
 * Memeriksa kelengkapan kolom wajib saat tombol kirim pesanan ditekan (BL-03).
 */
export function validateOrderForm(
  values: OrderFormValues,
): OrderValidationErrors {
  const errors: OrderValidationErrors = {};

  if (!values.isWeightValid) {
    errors.weight = 'Masukkan berat cucian minimal 0,1 kg, contoh: 2,5.';
  }

  if (values.customerName.trim().length === 0) {
    errors.customerName = 'Tulis nama kamu terlebih dulu, contoh: Budi Santoso.';
  }

  if (values.isDeliveryActive && values.pickupAddress.trim().length === 0) {
    errors.pickupAddress =
      'Tulis alamat lengkap untuk penjemputan, contoh: Jl. Melati No. 12.';
  }

  return errors;
}

/**
 * Menyusun pesan WhatsApp sesuai format baku pada PRD Bagian 7.
 */
export function buildWhatsAppMessage(payload: WhatsAppMessagePayload): string {
  const deliveryText = payload.isDeliveryActive
    ? `Ya (+${formatRupiah(payload.deliveryCost)})`
    : 'Tidak';
  const fragranceText = payload.isFragranceActive
    ? `Ya (+${formatRupiah(payload.fragranceCost)})`
    : 'Tidak';
  const addressText = payload.isDeliveryActive
    ? payload.pickupAddress.trim()
    : 'Antar Sendiri ke Toko';
  const notesText = payload.notes.trim() || '-';

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${payload.customerName.trim()}`,
    `*Layanan Utama:* ${payload.serviceName}`,
    `*Estimasi Berat:* ${formatWeightKg(payload.actualWeightKg)} kg (Berat Ditagih: ${formatWeightKg(payload.billedWeightKg)} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${deliveryText}`,
    `- Pewangi Premium: ${fragranceText}`,
    '',
    `*Alamat Penjemputan:* ${addressText}`,
    `*Catatan Khusus:* ${notesText}`,
    '',
    `*Estimasi Total Biaya:* *${formatRupiah(payload.totalCost)}*`,
    '',
    '_(Catatan: Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry)._',
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

/**
 * Mengubah nomor WhatsApp ke format digit 62xxx lalu menghasilkan tautan wa.me yang ter-encode.
 */
export function normalizeIndonesianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return `62${digits.slice(1)}`;
  }
  return digits;
}

export function buildWhatsAppUrl(
  message: string,
  phoneNumber: string = STORE_INFO.whatsapp_number,
): string {
  const normalizedPhone = normalizeIndonesianPhone(phoneNumber);
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
