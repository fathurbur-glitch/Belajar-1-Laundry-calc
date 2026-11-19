// Halaman utama aplikasi LaundryCalc yang menggabungkan fitur FT-01 sampai FT-06

import { useMemo, useRef, useState } from 'react';
import { AddOnOptions } from './components/AddOnOptions';
import { OrderCustomerForm } from './components/OrderCustomerForm';
import { PriceSummaryPanel } from './components/PriceSummaryPanel';
import { ServiceCatalog } from './components/ServiceCatalog';
import { WeightInputSection } from './components/WeightInputSection';
import { APP_DEFAULTS, type MainService } from './config';
import { calculateOrderSummary } from './lib/calculator';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  validateOrderForm,
  type OrderValidationErrors,
} from './lib/whatsapp';

export default function App() {
  const [selectedServiceCode, setSelectedServiceCode] = useState<
    MainService['code']
  >(APP_DEFAULTS.defaultServiceCode);
  const [rawWeight, setRawWeight] = useState<string>(
    APP_DEFAULTS.defaultWeightInput,
  );
  const [isDeliveryActive, setIsDeliveryActive] = useState<boolean>(false);
  const [isFragranceActive, setIsFragranceActive] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<OrderValidationErrors>({});
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null);

  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null);

  const calculation = useMemo(
    () =>
      calculateOrderSummary({
        serviceCode: selectedServiceCode,
        rawWeight,
        isDeliveryActive,
        isFragranceActive,
      }),
    [selectedServiceCode, rawWeight, isDeliveryActive, isFragranceActive],
  );

  const handleChangeWeight = (nextValue: string) => {
    setRawWeight(nextValue);
    setLastWhatsAppUrl(null);
    if (errors.weight) {
      setErrors((prev) => ({ ...prev, weight: undefined }));
    }
  };

  const handleToggleDelivery = (checked: boolean) => {
    setIsDeliveryActive(checked);
    setLastWhatsAppUrl(null);
    if (!checked && errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleToggleFragrance = (checked: boolean) => {
    setIsFragranceActive(checked);
    setLastWhatsAppUrl(null);
  };

  const handleChangeName = (value: string) => {
    setCustomerName(value);
    setLastWhatsAppUrl(null);
    if (errors.customerName) {
      setErrors((prev) => ({ ...prev, customerName: undefined }));
    }
  };

  const handleChangeAddress = (value: string) => {
    setPickupAddress(value);
    setLastWhatsAppUrl(null);
    if (errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleChangeNotes = (value: string) => {
    setNotes(value);
    setLastWhatsAppUrl(null);
  };

  const focusFirstError = (nextErrors: OrderValidationErrors) => {
    if (nextErrors.weight) {
      weightInputRef.current?.focus();
      weightInputRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    if (nextErrors.customerName) {
      nameInputRef.current?.focus();
      nameInputRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    if (nextErrors.pickupAddress) {
      addressInputRef.current?.focus();
      addressInputRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const handleSubmitOrder = () => {
    const nextErrors = validateOrderForm({
      rawWeight,
      isWeightValid: calculation.isWeightValid,
      isDeliveryActive,
      customerName,
      pickupAddress,
      notes,
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setLastWhatsAppUrl(null);
      focusFirstError(nextErrors);
      return;
    }

    setErrors({});

    const message = buildWhatsAppMessage({
      customerName,
      serviceName: calculation.service.name,
      actualWeightKg: calculation.actualWeightKg ?? 0,
      billedWeightKg: calculation.billedWeightKg,
      isDeliveryActive,
      deliveryCost: calculation.deliveryCost,
      isFragranceActive,
      fragranceCost: calculation.fragranceCost,
      pickupAddress,
      notes,
      totalCost: calculation.totalCost,
    });

    const whatsappUrl = buildWhatsAppUrl(message);
    setLastWhatsAppUrl(whatsappUrl);

    const anchor = document.createElement('a');
    anchor.href = whatsappUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-neutral-900">
            LaundryCalc
          </h1>
          <p className="text-sm text-neutral-600">
            Hitung estimasi biaya cucian dan kirim pesanan ke WhatsApp.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-32 lg:pb-12">
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmitOrder();
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
        >
          <div className="lg:col-span-7 space-y-6">
            <ServiceCatalog
              selectedCode={selectedServiceCode}
              onSelectService={(code) => {
                setSelectedServiceCode(code);
                setLastWhatsAppUrl(null);
              }}
            />

            <WeightInputSection
              rawWeight={rawWeight}
              billedWeightKg={calculation.billedWeightKg}
              isWeightValid={calculation.isWeightValid}
              isMinChargeApplied={calculation.isMinChargeApplied}
              errorMessage={errors.weight}
              inputRef={weightInputRef}
              onChangeWeight={handleChangeWeight}
            />

            <AddOnOptions
              isDeliveryActive={isDeliveryActive}
              isFragranceActive={isFragranceActive}
              onToggleDelivery={handleToggleDelivery}
              onToggleFragrance={handleToggleFragrance}
            />

            <OrderCustomerForm
              customerName={customerName}
              pickupAddress={pickupAddress}
              notes={notes}
              isDeliveryActive={isDeliveryActive}
              errors={errors}
              nameInputRef={nameInputRef}
              addressInputRef={addressInputRef}
              onChangeName={handleChangeName}
              onChangeAddress={handleChangeAddress}
              onChangeNotes={handleChangeNotes}
            />
          </div>

          <div className="lg:col-span-5">
            <PriceSummaryPanel
              calculation={calculation}
              isDeliveryActive={isDeliveryActive}
              isFragranceActive={isFragranceActive}
              lastWhatsAppUrl={lastWhatsAppUrl}
              onSubmitOrder={handleSubmitOrder}
            />
          </div>
        </form>
      </main>
    </div>
  );
}
