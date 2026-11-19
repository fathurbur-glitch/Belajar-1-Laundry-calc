// Komponen formulir data pemesan termasuk alamat kondisional antar-jemput (FT-05)

import { AlertCircle } from 'lucide-react';
import type { RefObject } from 'react';
import type { OrderValidationErrors } from '../lib/whatsapp';

interface OrderCustomerFormProps {
  customerName: string;
  pickupAddress: string;
  notes: string;
  isDeliveryActive: boolean;
  errors: OrderValidationErrors;
  nameInputRef: RefObject<HTMLInputElement | null>;
  addressInputRef: RefObject<HTMLTextAreaElement | null>;
  onChangeName: (value: string) => void;
  onChangeAddress: (value: string) => void;
  onChangeNotes: (value: string) => void;
}

export function OrderCustomerForm({
  customerName,
  pickupAddress,
  notes,
  isDeliveryActive,
  errors,
  nameInputRef,
  addressInputRef,
  onChangeName,
  onChangeAddress,
  onChangeNotes,
}: OrderCustomerFormProps) {
  return (
    <section
      aria-labelledby="heading-customer-form"
      className="bg-white rounded-2xl p-4 sm:p-6 space-y-4"
    >
      <div className="space-y-1">
        <h2
          id="heading-customer-form"
          className="text-lg font-semibold text-neutral-900"
        >
          Data pemesan
        </h2>
        <p className="text-sm text-neutral-600">
          Lengkapi data kamu untuk format pesan WhatsApp.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="customer-name"
            className="block text-sm font-medium text-neutral-900"
          >
            Nama kamu
          </label>
          <input
            ref={nameInputRef}
            id="customer-name"
            name="customerName"
            type="text"
            autoComplete="name"
            value={customerName}
            onChange={(event) => onChangeName(event.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-invalid={Boolean(errors.customerName)}
            aria-describedby={
              errors.customerName ? 'customer-name-error' : undefined
            }
            className={`w-full min-h-[44px] rounded-xl border px-4 py-2 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
              errors.customerName
                ? 'border-red-700 bg-red-50'
                : 'border-neutral-200 bg-white'
            }`}
          />
          {errors.customerName && (
            <div
              id="customer-name-error"
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              <AlertCircle
                className="w-4 h-4 shrink-0 mt-1"
                aria-hidden="true"
              />
              <span>{errors.customerName}</span>
            </div>
          )}
        </div>

        {isDeliveryActive && (
          <div className="space-y-2">
            <label
              htmlFor="pickup-address"
              className="block text-sm font-medium text-neutral-900"
            >
              Alamat penjemputan
            </label>
            <textarea
              ref={addressInputRef}
              id="pickup-address"
              name="pickupAddress"
              autoComplete="street-address"
              rows={3}
              value={pickupAddress}
              onChange={(event) => onChangeAddress(event.target.value)}
              placeholder="Contoh: Jl. Melati No. 12, Kost Putri Melati"
              aria-invalid={Boolean(errors.pickupAddress)}
              aria-describedby={
                errors.pickupAddress
                  ? 'pickup-address-error'
                  : 'pickup-address-help'
              }
              className={`w-full min-h-[44px] rounded-xl border px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                errors.pickupAddress
                  ? 'border-red-700 bg-red-50'
                  : 'border-neutral-200 bg-white'
              }`}
            />
            <p id="pickup-address-help" className="text-sm text-neutral-500">
              Area penjemputan maksimal radius 5 km.
            </p>
            {errors.pickupAddress && (
              <div
                id="pickup-address-error"
                role="alert"
                className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
              >
                <AlertCircle
                  className="w-4 h-4 shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span>{errors.pickupAddress}</span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="order-notes"
            className="block text-sm font-medium text-neutral-900"
          >
            Catatan khusus (opsional)
          </label>
          <textarea
            id="order-notes"
            name="notes"
            rows={2}
            value={notes}
            onChange={(event) => onChangeNotes(event.target.value)}
            placeholder="Contoh: Pisahkan baju putih dan berwarna"
            aria-describedby="order-notes-help"
            className="w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          />
          <p id="order-notes-help" className="text-sm text-neutral-500">
            Tulis permintaan khusus jika ada.
          </p>
        </div>
      </div>
    </section>
  );
}
