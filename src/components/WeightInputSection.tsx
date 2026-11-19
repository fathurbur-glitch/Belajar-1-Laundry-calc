// Komponen input estimasi berat cucian dan notifikasi minimum charge 3 kg (FT-02)

import { AlertCircle, Info, Minus, Plus } from 'lucide-react';
import type { RefObject } from 'react';
import { APP_DEFAULTS, STORE_INFO } from '../config';
import { formatWeightKg, parseWeightInput } from '../lib/formatters';

interface WeightInputSectionProps {
  rawWeight: string;
  billedWeightKg: number;
  isWeightValid: boolean;
  isMinChargeApplied: boolean;
  errorMessage?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onChangeWeight: (nextValue: string) => void;
}

export function WeightInputSection({
  rawWeight,
  billedWeightKg,
  isWeightValid,
  isMinChargeApplied,
  errorMessage,
  inputRef,
  onChangeWeight,
}: WeightInputSectionProps) {
  const handleStep = (delta: number) => {
    const parsed = parseWeightInput(rawWeight);
    const current = parsed !== null && parsed > 0 ? parsed : 0;
    const next = Math.max(
      APP_DEFAULTS.weightStep,
      Math.round((current + delta) * 10) / 10,
    );
    onChangeWeight(formatWeightKg(next));
  };

  return (
    <section
      aria-labelledby="heading-weight"
      className="bg-white rounded-2xl p-4 sm:p-6 space-y-4"
    >
      <div className="space-y-1">
        <h2
          id="heading-weight"
          className="text-lg font-semibold text-neutral-900"
        >
          Masukkan berat cucian
        </h2>
        <p className="text-sm text-neutral-600">
          Isi perkiraan berat pakaian kamu dalam satuan kilogram.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="weight-input"
            className="block text-sm font-medium text-neutral-900"
          >
            Estimasi berat (kg)
          </label>
          {isWeightValid && (
            <span className="text-sm font-medium text-neutral-600 tabular-nums">
              Berat ditagih: {formatWeightKg(billedWeightKg)} kg
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Kurangi berat 0,1 kg"
            onClick={() => handleStep(-APP_DEFAULTS.weightStep)}
            className="min-w-[44px] min-h-[44px] rounded-xl border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100 flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            <Minus className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="relative flex-1">
            <input
              ref={inputRef}
              id="weight-input"
              name="weight"
              type="text"
              inputMode="decimal"
              value={rawWeight}
              onChange={(event) => onChangeWeight(event.target.value)}
              placeholder="Contoh: 3"
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={
                errorMessage ? 'weight-error' : 'weight-help'
              }
              className={`w-full min-h-[44px] rounded-xl border px-4 py-2 pr-12 text-base font-medium text-neutral-900 placeholder:text-neutral-500 tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                errorMessage ? 'border-red-700 bg-red-50' : 'border-neutral-200 bg-white'
              }`}
            />
            <span
              aria-hidden="true"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none"
            >
              kg
            </span>
          </div>

          <button
            type="button"
            aria-label="Tambah berat 0,1 kg"
            onClick={() => handleStep(APP_DEFAULTS.weightStep)}
            className="min-w-[44px] min-h-[44px] rounded-xl border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100 flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <p id="weight-help" className="text-sm text-neutral-500">
          Gunakan koma atau titik untuk angka desimal.
        </p>

        {errorMessage && (
          <div
            id="weight-error"
            role="alert"
            className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isMinChargeApplied && !errorMessage && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800"
          >
            <Info className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
            <span>
              Berat di bawah {formatWeightKg(STORE_INFO.minimum_charge_kg)} kg
              dihitung minimal {formatWeightKg(STORE_INFO.minimum_charge_kg)}{' '}
              kg.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
