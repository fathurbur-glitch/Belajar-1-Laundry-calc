// Komponen katalog dan pilihan paket layanan utama laundry (FT-01)

import { Check, Clock } from 'lucide-react';
import { MAIN_SERVICES, type MainService } from '../config';
import { formatRupiah } from '../lib/formatters';

interface ServiceCatalogProps {
  selectedCode: MainService['code'];
  onSelectService: (code: MainService['code']) => void;
}

export function ServiceCatalog({
  selectedCode,
  onSelectService,
}: ServiceCatalogProps) {
  return (
    <section aria-labelledby="heading-services" className="space-y-3">
      <div className="space-y-1">
        <h2
          id="heading-services"
          className="text-lg font-semibold text-neutral-900"
        >
          Pilih layanan utama
        </h2>
        <p className="text-sm text-neutral-600">
          Pilih satu paket cucian yang sesuai kebutuhan kamu.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-labelledby="heading-services"
        className="grid grid-cols-1 gap-3"
      >
        {MAIN_SERVICES.map((service) => {
          const isSelected = service.code === selectedCode;
          return (
            <button
              key={service.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectService(service.code)}
              className={`w-full min-h-[44px] text-left rounded-2xl p-4 border transition-[transform,opacity] duration-150 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-transparent bg-white hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold text-neutral-900">
                      {service.name}
                    </span>
                    <span className="text-neutral-400" aria-hidden="true">
                      ·
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-neutral-600">
                      <Clock className="w-4 h-4 text-neutral-500" aria-hidden="true" />
                      <span>Selesai {service.duration_days} hari</span>
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span
                      className={`text-base font-semibold tabular-nums whitespace-nowrap ${
                        isSelected ? 'text-blue-700' : 'text-neutral-900'
                      }`}
                    >
                      {formatRupiah(service.price_per_kg)}
                    </span>
                    <span className="block text-sm text-neutral-500">/kg</span>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      isSelected
                        ? 'bg-blue-700 border-blue-700 text-white'
                        : 'bg-white border-neutral-300 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
