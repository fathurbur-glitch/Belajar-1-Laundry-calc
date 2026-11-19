// Komponen ringkasan biaya live dan tombol kirim pesanan ke WhatsApp (FT-04 & FT-06)

import { CheckCircle2, ChevronDown, ChevronUp, ExternalLink, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import type { OrderCalculationResult } from '../lib/calculator';
import { formatRupiah, formatWeightKg } from '../lib/formatters';

interface PriceSummaryPanelProps {
  calculation: OrderCalculationResult;
  isDeliveryActive: boolean;
  isFragranceActive: boolean;
  lastWhatsAppUrl: string | null;
  onSubmitOrder: () => void;
}

export function PriceSummaryPanel({
  calculation,
  isDeliveryActive,
  isFragranceActive,
  lastWhatsAppUrl,
  onSubmitOrder,
}: PriceSummaryPanelProps) {
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  const renderBreakdownRows = () => (
    <div className="space-y-3 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="text-neutral-600">
          <span className="block font-medium text-neutral-900">
            {calculation.service.name}
          </span>
          <span className="tabular-nums">
            {calculation.isWeightValid
              ? `${formatWeightKg(calculation.billedWeightKg)} kg x ${formatRupiah(calculation.service.price_per_kg)}`
              : 'Berat belum diisi'}
          </span>
        </div>
        <span className="font-semibold text-neutral-900 tabular-nums shrink-0">
          {formatRupiah(calculation.mainCost)}
        </span>
      </div>

      {(isDeliveryActive || isFragranceActive) && (
        <div className="pt-2 border-t border-neutral-200 space-y-2">
          {isDeliveryActive && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-neutral-600">Antar-Jemput</span>
              <span className="font-medium text-neutral-900 tabular-nums">
                {formatRupiah(calculation.deliveryCost)}
              </span>
            </div>
          )}
          {isFragranceActive && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-neutral-600">Pewangi Premium</span>
              <span className="font-medium text-neutral-900 tabular-nums">
                {formatRupiah(calculation.fragranceCost)}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="pt-2 border-t border-neutral-200 flex items-center justify-between gap-3">
        <span className="text-neutral-600">Biaya tambahan</span>
        <span className="font-semibold text-neutral-900 tabular-nums">
          {formatRupiah(calculation.addOnTotal)}
        </span>
      </div>
    </div>
  );

  const renderSentNotice = () =>
    lastWhatsAppUrl ? (
      <div
        role="status"
        className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800 space-y-1"
      >
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
          <span>Pesan pesanan kamu sudah siap di WhatsApp.</span>
        </div>
        <a
          href={lastWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-emerald-800 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 rounded"
        >
          <span>Buka WhatsApp lagi</span>
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    ) : null;

  return (
    <>
      {/* Panel ringkasan menempel di kolom kanan untuk layar desktop */}
      <aside
        aria-labelledby="heading-summary-desktop"
        className="hidden lg:block sticky top-6 bg-white rounded-2xl p-6 space-y-4"
      >
        <h2
          id="heading-summary-desktop"
          className="text-lg font-semibold text-neutral-900"
        >
          Ringkasan biaya
        </h2>

        {renderBreakdownRows()}

        <div className="pt-4 border-t border-neutral-200 flex items-baseline justify-between gap-3">
          <span className="text-base font-medium text-neutral-900">
            Estimasi total
          </span>
          <span className="text-3xl font-semibold text-neutral-900 tabular-nums">
            {formatRupiah(calculation.totalCost)}
          </span>
        </div>

        <p className="text-sm text-neutral-600">
          Nominal ini adalah estimasi awal sebelum pakaian ditimbang ulang oleh
          kasir atau kurir.
        </p>

        <button
          type="button"
          onClick={onSubmitOrder}
          className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-base font-medium inline-flex items-center justify-center gap-2 transition-[transform,opacity] duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          <span>Kirim ke WhatsApp</span>
        </button>

        {renderSentNotice()}
      </aside>

      {/* Bilah ringkasan menempel di bawah layar untuk ponsel dan tablet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]">
        {lastWhatsAppUrl && !isMobileDetailOpen && (
          <div className="max-w-2xl mx-auto px-4 pt-3">
            {renderSentNotice()}
          </div>
        )}

        {isMobileDetailOpen && (
          <div className="max-w-2xl mx-auto px-4 pt-4 pb-3 border-b border-neutral-200 space-y-3">
            {renderBreakdownRows()}
            <p className="text-sm text-neutral-600">
              Nominal ini adalah estimasi awal sebelum pakaian ditimbang ulang
              oleh kasir atau kurir.
            </p>
            {renderSentNotice()}
          </div>
        )}

        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <button
              type="button"
              aria-expanded={isMobileDetailOpen}
              onClick={() => setIsMobileDetailOpen((prev) => !prev)}
              className="min-h-[44px] flex flex-col items-start justify-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 rounded-lg"
            >
              <span className="inline-flex items-center gap-1 text-sm text-neutral-600">
                <span>Estimasi total</span>
                {isMobileDetailOpen ? (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                )}
              </span>
              <span className="text-xl font-semibold text-neutral-900 tabular-nums">
                {formatRupiah(calculation.totalCost)}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={onSubmitOrder}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-[transform,opacity] duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Kirim ke WhatsApp</span>
          </button>
        </div>
      </div>
    </>
  );
}
