// Komponen pilihan layanan tambahan antar-jemput dan pewangi premium (FT-03)

import { Check } from 'lucide-react';
import { ADD_ONS } from '../config';
import { formatRupiah } from '../lib/formatters';

interface AddOnOptionsProps {
  isDeliveryActive: boolean;
  isFragranceActive: boolean;
  onToggleDelivery: (checked: boolean) => void;
  onToggleFragrance: (checked: boolean) => void;
}

export function AddOnOptions({
  isDeliveryActive,
  isFragranceActive,
  onToggleDelivery,
  onToggleFragrance,
}: AddOnOptionsProps) {
  const deliveryAddOn = ADD_ONS.find((item) => item.code === 'T01')!;
  const fragranceAddOn = ADD_ONS.find((item) => item.code === 'T02')!;

  const items = [
    {
      id: 'addon-delivery',
      code: deliveryAddOn.code,
      label: `Antar-Jemput (+${formatRupiah(deliveryAddOn.price)})`,
      notes: deliveryAddOn.notes,
      checked: isDeliveryActive,
      onChange: onToggleDelivery,
    },
    {
      id: 'addon-fragrance',
      code: fragranceAddOn.code,
      label: `Pewangi Premium Downy (+${formatRupiah(fragranceAddOn.price)}/kg ditagih)`,
      notes: fragranceAddOn.notes,
      checked: isFragranceActive,
      onChange: onToggleFragrance,
    },
  ];

  return (
    <section aria-labelledby="heading-addons" className="space-y-3">
      <div className="space-y-1">
        <h2
          id="heading-addons"
          className="text-lg font-semibold text-neutral-900"
        >
          Layanan tambahan
        </h2>
        <p className="text-sm text-neutral-600">
          Tambahkan layanan ekstra jika kamu membutuhkannya.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <label
            key={item.code}
            htmlFor={item.id}
            className={`min-h-[44px] flex items-start justify-between gap-3 rounded-2xl p-4 border cursor-pointer focus-within:ring-2 focus-within:ring-blue-700 focus-within:ring-offset-2 ${
              item.checked
                ? 'border-blue-700 bg-blue-50'
                : 'border-transparent bg-white hover:bg-neutral-100'
            }`}
          >
            <input
              id={item.id}
              name={item.id}
              type="checkbox"
              checked={item.checked}
              onChange={(event) => item.onChange(event.target.checked)}
              className="sr-only"
            />
            <div className="space-y-1">
              <span className="block text-base font-medium text-neutral-900">
                {item.label}
              </span>
              <span className="block text-sm text-neutral-600">
                {item.notes}
              </span>
            </div>

            <span
              aria-hidden="true"
              className={`w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 mt-1 ${
                item.checked
                  ? 'bg-blue-700 border-blue-700 text-white'
                  : 'bg-white border-neutral-300 text-transparent'
              }`}
            >
              <Check className="w-4 h-4" />
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
