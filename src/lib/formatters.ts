// Fungsi pemformatan angka rupiah, berat cucian, dan pengurai input desimal

/**
 * Mengubah angka rupiah menjadi format ribuan Indonesia tanpa awalan Rp.
 * Contoh: 18000 -> "18.000"
 */
export function formatRupiahAmount(amount: number): string {
  const safeInteger = Math.round(Number.isFinite(amount) ? amount : 0);
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(safeInteger);
}

/**
 * Mengubah angka menjadi format Rupiah sesuai PRD.
 * Contoh: 18000 -> "Rp 18.000"
 */
export function formatRupiah(amount: number): string {
  return `Rp ${formatRupiahAmount(amount)}`;
}

/**
 * Mengubah angka berat (kg) menjadi teks koma tanpa nol berlebih di belakang.
 * Contoh: 3 -> "3", 4.5 -> "4,5", 1.8 -> "1,8"
 */
export function formatWeightKg(weight: number): string {
  const safeWeight = Number.isFinite(weight) ? weight : 0;
  const rounded = Math.round(safeWeight * 100) / 100;
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(rounded);
}

/**
 * Mengurai teks input berat yang dapat memakai koma atau titik sebagai pemisah desimal.
 * Mengembalikan null jika kosong atau bukan angka valid.
 */
export function parseWeightInput(rawValue: string): number | null {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return null;
  }
  const normalized = trimmed.replace(',', '.');
  if (!/^(\d+(\.\d+)?|\.\d+)$/.test(normalized)) {
    return null;
  }
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return parsed;
}
