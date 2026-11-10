import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Phone,
  Home,
  Store,
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle2,
  AlertTriangle,
  Copy,
  ExternalLink,
  Crown,
  Scissors,
} from 'lucide-react';
import {
  SALON_DATA,
  SERVICES,
  STYLIST_TIERS,
} from '../data/salonData';
import type { ServiceItem, StylistTier } from '../data/salonData';

interface BookingStudioProps {
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  onClearServices: () => void;
}

const TIME_SLOTS = {
  Morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
  Afternoon: ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
  Evening: ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'],
};

export const BookingStudio: React.FC<BookingStudioProps> = ({
  selectedServices,
  onToggleService,
  onClearServices,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [bookingMode, setBookingMode] = useState<'salon' | 'home'>('salon');
  const [selectedStylist, setSelectedStylist] = useState<StylistTier>(STYLIST_TIERS[2]);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');

  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestNotes, setGuestNotes] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [ticketReference, setTicketReference] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const nameInputId = useId();
  const phoneInputId = useId();
  const notesInputId = useId();
  const dateInputId = useId();

  const servicesSubtotal = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
  const stylistSurcharge = selectedStylist.surcharge;
  const homeServiceFee = bookingMode === 'home' ? 999 : 0;
  const grandTotal = servicesSubtotal + stylistSurcharge + homeServiceFee;
  const totalDurationMinutes = selectedServices.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const validateStep3 = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!guestName.trim()) {
      errs.name = 'Please provide your full name.';
    }
    const cleanPhone = guestPhone.replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (selectedServices.length === 0) {
        alert('Please select at least one bespoke service to continue.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedTimeSlot) {
        alert('Please choose an appointment time slot.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) {
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
        const code = `#TU-2026-${randomCode}`;
        setTicketReference(code);
        setCurrentStep(4);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateWhatsAppMessage = () => {
    const cleanPhone = guestPhone.replace(/\D/g, '').slice(-10);
    const servicesList = selectedServices.map((s) => `• ${s.name} (₹${s.price})`).join('%0A');
    const modeStr = bookingMode === 'salon' ? 'In-Salon Experience (Trill Plaza, Court Rd, Saharanpur)' : 'Home Bridal/Glam Service';

    const text = `*NEW VIP SALON RESERVATION — TEJASSWI UNISEX SALON*%0A%0A` +
      `*Pass Code:* ${ticketReference}%0A` +
      `*Guest Name:* ${encodeURIComponent(guestName.trim())}%0A` +
      `*Contact:* +91 ${cleanPhone}%0A` +
      `*Location Mode:* ${modeStr}%0A` +
      `*Date:* ${selectedDate}%0A` +
      `*Time Slot:* ${selectedTimeSlot}%0A` +
      `*Specialist Requested:* ${selectedStylist.name} (${selectedStylist.title})%0A%0A` +
      `*Services Requested:*%0A${servicesList}%0A%0A` +
      `*Estimated Duration:* ~${totalDurationMinutes} minutes%0A` +
      `*Estimated Total:* ₹${grandTotal.toLocaleString('en-IN')}%0A` +
      (guestNotes.trim() ? `*Special Request / Address:* ${encodeURIComponent(guestNotes.trim())}%0A%0A` : '%0A') +
      `Please confirm my preferred appointment slot. Thank you!`;

    return `https://wa.me/${SALON_DATA.whatsappNumber}?text=${text}`;
  };

  const handleCopyTicket = () => {
    const textToCopy = `TEJASSWI UNISEX SALON RESERVATION PASS\nPass: ${ticketReference}\nGuest: ${guestName}\nSpecialist: ${selectedStylist.name}\nDate: ${selectedDate} at ${selectedTimeSlot}\nTotal: ₹${grandTotal}\nSalon Address: ${SALON_DATA.address}\nProprietor: Pankaj Thakur\nTel: ${SALON_DATA.phone}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const stepTitles = [
    'Choose Experience & Rituals',
    'Select Date, Slot & Specialist',
    'Guest Details & Coordination',
    'VIP Reservation Pass Ready',
  ];

  return (
    <section id="booking" className="py-16 sm:py-24 bg-[#FAF7F2] text-[#181615] relative overflow-hidden">
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-[#C59B6D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-[#F2ECE1] border border-[#C59B6D]/30 text-[10px] sm:text-xs font-mono tracking-widest text-[#B08455] uppercase">
            <Crown className="w-3.5 h-3.5 text-[#C59B6D]" />
            <span>Interactive 4-Step Reservation Engine</span>
          </div>

          <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-[#181615]">
            Reserve Your Tejasswi Experience
          </h2>

          <p className="text-xs sm:text-base text-[#6E675F] font-light leading-relaxed">
            Select your preferred treatment, specialist tier (including proprietor Pankaj Thakur), and appointment slot. Instant VIP confirmation via WhatsApp Concierge.
          </p>
        </motion.div>

        {/* Step Progress Stepper */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-between max-w-xl mx-auto relative px-2">
            <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-[#F2ECE1] -z-0">
              <div
                className="h-full bg-gradient-to-r from-[#C59B6D] to-[#B08455] transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>

            {[
              { num: 1, label: 'Rituals' },
              { num: 2, label: 'Date & Slot' },
              { num: 3, label: 'Guest Details' },
              { num: 4, label: 'VIP Pass' },
            ].map((step) => {
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                      isDone
                        ? 'bg-[#181615] text-[#FAF7F2] shadow-md'
                        : isCurrent
                        ? 'bg-[#C59B6D] text-white shadow-lg ring-4 ring-[#C59B6D]/20'
                        : 'bg-[#F2ECE1] text-[#6E675F] border border-[#C59B6D]/30'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C59B6D]" /> : step.num}
                  </div>
                  <span
                    className={`mt-1.5 text-[10px] sm:text-[11px] font-medium tracking-wide hidden sm:block ${
                      isCurrent ? 'text-[#181615] font-bold' : 'text-[#6E675F]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile Current Step Sub-Header */}
          <div className="sm:hidden text-center mt-3">
            <span className="text-[11px] font-mono text-[#B08455] font-semibold uppercase tracking-wider">
              Step {currentStep} of 4: {stepTitles[currentStep - 1]}
            </span>
          </div>
        </motion.div>

        {/* Studio Card Container */}
        <div className="bg-[#F2ECE1] rounded-2xl sm:rounded-3xl border border-[#C59B6D]/30 shadow-xl overflow-hidden p-4 sm:p-8 md:p-10">
          <AnimatePresence mode="wait">
            {/* STEP 1: Services & Studio Mode */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6 sm:space-y-8"
              >
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#B08455] font-semibold mb-2.5">
                    Step 1: Choose Experience Location
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setBookingMode('salon')}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-3 sm:gap-4 cursor-pointer min-h-[56px] ${
                        bookingMode === 'salon'
                          ? 'bg-[#FAF7F2] border-2 border-[#C59B6D] shadow-md'
                          : 'bg-[#F2ECE1] border-[#C59B6D]/20 hover:border-[#C59B6D]/50'
                      }`}
                    >
                      <div className="p-2.5 rounded-xl bg-[#C59B6D]/15 text-[#B08455] shrink-0 mt-0.5">
                        <Store className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-serif text-sm sm:text-base font-bold text-[#181615]">
                            In-Salon Studio
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                            Court Road
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#6E675F] mt-1 leading-relaxed">
                          Relax in our 1st Floor Trill Plaza studio opposite Site Petrol Pump with professional lighting & ambient music.
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingMode('home')}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-3 sm:gap-4 cursor-pointer min-h-[56px] ${
                        bookingMode === 'home'
                          ? 'bg-[#FAF7F2] border-2 border-[#C59B6D] shadow-md'
                          : 'bg-[#F2ECE1] border-[#C59B6D]/20 hover:border-[#C59B6D]/50'
                      }`}
                    >
                      <div className="p-2.5 rounded-xl bg-[#C59B6D]/15 text-[#B08455] shrink-0 mt-0.5">
                        <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-serif text-sm sm:text-base font-bold text-[#181615]">
                            Home Bridal / VIP Service
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#C59B6D]/20 text-[#B08455]">
                            +₹999 Concierge
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#6E675F] mt-1 leading-relaxed">
                          Our senior artisans arrive at your residence or wedding venue in Saharanpur with full professional equipment.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Selected Services Summary */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs uppercase font-mono tracking-widest text-[#B08455] font-semibold">
                      Selected Rituals ({selectedServices.length})
                    </h3>
                    {selectedServices.length > 0 && (
                      <button
                        onClick={onClearServices}
                        className="text-xs text-rose-700 hover:underline cursor-pointer p-1"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {selectedServices.length === 0 ? (
                    <div className="p-6 sm:p-8 text-center bg-[#FAF7F2] rounded-2xl border border-dashed border-[#C59B6D]/40 space-y-2.5">
                      <Scissors className="w-7 h-7 sm:w-8 sm:h-8 text-[#C59B6D] mx-auto opacity-70" />
                      <p className="font-serif text-sm sm:text-base font-bold text-[#181615]">
                        No services selected yet
                      </p>
                      <p className="text-xs text-[#6E675F] max-w-sm mx-auto">
                        Pick services from the catalog or quick additions below.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {selectedServices.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#C59B6D]/25 gap-2"
                        >
                          <div className="min-w-0">
                            <span className="font-medium text-xs sm:text-sm text-[#181615] block truncate">
                              {service.name}
                            </span>
                            <span className="text-[11px] text-[#6E675F] font-mono">
                              ~{service.durationMinutes}m • {service.genderBadge}
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 shrink-0">
                            <span className="font-serif font-bold text-xs sm:text-sm text-[#181615]">
                              ₹{service.price.toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => onToggleService(service)}
                              className="text-xs text-rose-600 hover:text-rose-800 p-1.5 cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                              aria-label={`Remove ${service.name}`}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3.5 pt-3.5 border-t border-[#C59B6D]/20">
                    <p className="text-xs font-semibold text-[#6E675F] mb-2">
                      Popular additions:
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {SERVICES.slice(0, 5).map((srv) => {
                        const inList = selectedServices.some((s) => s.id === srv.id);
                        if (inList) return null;
                        return (
                          <button
                            key={srv.id}
                            onClick={() => onToggleService(srv)}
                            className="text-xs px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#C59B6D] hover:text-white border border-[#C59B6D]/30 transition-colors flex items-center gap-1 cursor-pointer min-h-[36px]"
                          >
                            <span>+ {srv.name}</span>
                            <span className="font-mono opacity-80">(₹{srv.price})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C59B6D]/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex items-center justify-between sm:block">
                    <span className="text-xs text-[#6E675F] block font-mono">
                      Subtotal (~{totalDurationMinutes}m):
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#181615]">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={handleNextStep}
                    disabled={selectedServices.length === 0}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#B08455] text-white font-bold text-xs tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                  >
                    <span>Proceed to Slot & Specialist</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Date, Slot & Specialist Tier */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6 sm:space-y-8"
              >
                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-2.5 sm:gap-3">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-semibold text-amber-950">
                      Festive Season Notice
                    </p>
                    <p className="mt-0.5 text-amber-800 text-[11px] sm:text-xs">
                      {SALON_DATA.operatingHours.festiveDisclaimer} Our standard hours are 9:00 AM – 9:00 PM Monday through Sunday.
                    </p>
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label
                    htmlFor={dateInputId}
                    className="block text-xs uppercase font-mono tracking-widest text-[#B08455] font-semibold mb-2"
                  >
                    Select Reservation Date
                  </label>
                  <div className="max-w-xs relative">
                    <input
                      id={dateInputId}
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#C59B6D]/40 text-base sm:text-sm font-medium text-[#181615] focus:outline-none focus:ring-2 focus:ring-[#C59B6D] min-h-[48px]"
                    />
                  </div>
                </div>

                {/* Specialist Tier Picker */}
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#B08455] font-semibold mb-2.5">
                    Choose Specialist Tier
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                    {STYLIST_TIERS.map((tier) => {
                      const isSelected = selectedStylist.id === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setSelectedStylist(tier)}
                          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[56px] ${
                            isSelected
                              ? 'bg-[#FAF7F2] border-2 border-[#C59B6D] shadow-md'
                              : 'bg-[#F2ECE1] border-[#C59B6D]/20 hover:border-[#C59B6D]/50'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-serif text-sm sm:text-base font-bold text-[#181615]">
                                {tier.name}
                              </span>
                              {tier.surcharge > 0 ? (
                                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-[#C59B6D]/20 text-[#B08455] font-bold">
                                  +₹{tier.surcharge}
                                </span>
                              ) : (
                                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                                  Included
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] sm:text-[11px] font-medium text-[#B08455] mb-1.5">
                              {tier.title} • {tier.experience}
                            </p>
                            <p className="text-[11px] sm:text-xs text-[#6E675F] leading-relaxed line-clamp-3">
                              {tier.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#B08455] font-semibold mb-2.5">
                    Select Appointment Time Slot (9:00 AM – 8:00 PM)
                  </h3>
                  <div className="space-y-3.5">
                    {Object.entries(TIME_SLOTS).map(([timePeriod, slots]) => (
                      <div key={timePeriod}>
                        <span className="text-[11px] sm:text-xs font-semibold text-[#6E675F] block mb-1.5 font-mono">
                          {timePeriod}
                        </span>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                          {slots.map((slot) => {
                            const isSlotSelected = selectedTimeSlot === slot;
                            return (
                              <motion.button
                                key={slot}
                                type="button"
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`py-3 px-2 sm:py-2.5 sm:px-3 rounded-xl text-xs font-mono font-medium transition-all duration-150 cursor-pointer min-h-[44px] flex items-center justify-center ${
                                  isSlotSelected
                                    ? 'bg-[#181615] text-[#FAF7F2] font-bold shadow-md'
                                    : 'bg-[#FAF7F2] text-[#181615] border border-[#C59B6D]/30 hover:border-[#C59B6D]'
                                }`}
                              >
                                {slot}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C59B6D]/20 flex items-center justify-between gap-3">
                  <button
                    onClick={handlePrevStep}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[#C59B6D]/40 text-xs font-medium text-[#181615] hover:bg-[#FAF7F2] flex items-center gap-1 cursor-pointer min-h-[44px]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#B08455] text-white font-bold text-xs tracking-wider uppercase hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer min-h-[48px]"
                  >
                    <span>Proceed to Guest Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Guest Details Form */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5 sm:space-y-6"
              >
                <div className="border-b border-[#C59B6D]/20 pb-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#181615]">
                    Client Information
                  </h3>
                  <p className="text-xs text-[#6E675F] mt-0.5">
                    We will send appointment verification and stylist coordination to this number.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNextStep();
                  }}
                  className="space-y-4 sm:space-y-5"
                >
                  <div>
                    <label
                      htmlFor={nameInputId}
                      className="block text-xs font-mono uppercase tracking-wider text-[#181615] font-semibold mb-1.5"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#6E675F] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id={nameInputId}
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={guestName}
                        onChange={(e) => {
                          setGuestName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        onBlur={() => {
                          if (!guestName.trim()) {
                            setErrors((prev) => ({ ...prev, name: 'Full name is required.' }));
                          }
                        }}
                        placeholder="e.g., Ananya Sharma / Rohan Verma"
                        className={`w-full pl-11 pr-4 py-3 rounded-xl bg-[#FAF7F2] border text-base sm:text-sm text-[#181615] focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-colors min-h-[48px] ${
                          errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-[#C59B6D]/40'
                        }`}
                        required
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={phoneInputId}
                      className="block text-xs font-mono uppercase tracking-wider text-[#181615] font-semibold mb-1.5"
                    >
                      10-Digit Mobile / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-mono text-[#6E675F] pointer-events-none">
                        <Phone className="w-3.5 h-3.5 text-[#C59B6D]" />
                        <span>+91</span>
                      </div>
                      <input
                        id={phoneInputId}
                        type="tel"
                        name="tel"
                        autoComplete="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={guestPhone}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '');
                          setGuestPhone(digitsOnly);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        onBlur={() => {
                          if (guestPhone.length !== 10) {
                            setErrors((prev) => ({
                              ...prev,
                              phone: 'Please enter a complete 10-digit mobile number.',
                            }));
                          }
                        }}
                        placeholder="99271 26000"
                        className={`w-full pl-16 pr-4 py-3 rounded-xl bg-[#FAF7F2] border text-base sm:text-sm font-mono text-[#181615] focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-colors min-h-[48px] ${
                          errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-[#C59B6D]/40'
                        }`}
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={notesInputId}
                      className="block text-xs font-mono uppercase tracking-wider text-[#181615] font-semibold mb-1.5"
                    >
                      {bookingMode === 'home'
                        ? 'Full Home / Venue Address in Saharanpur *'
                        : 'Special Requests / Hair Concerns (Optional)'}
                    </label>
                    <textarea
                      id={notesInputId}
                      rows={3}
                      value={guestNotes}
                      onChange={(e) => setGuestNotes(e.target.value)}
                      placeholder={
                        bookingMode === 'home'
                          ? 'House No, Colony/Locality, Landmark near Saharanpur...'
                          : 'Mention hair sensitivity, allergy to specific bleach...'
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#C59B6D]/40 text-base sm:text-sm text-[#181615] focus:outline-none focus:ring-2 focus:ring-[#C59B6D]"
                    />
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF7F2] border border-[#C59B6D]/30 space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#6E675F]">
                      <span>Experience Mode:</span>
                      <span className="font-semibold text-[#181615]">
                        {bookingMode === 'salon' ? 'In-Salon (Court Rd Studio)' : 'Home Service'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#6E675F]">
                      <span>Date & Time:</span>
                      <span className="font-semibold text-[#181615]">
                        {selectedDate} at {selectedTimeSlot}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#6E675F]">
                      <span>Selected Specialist:</span>
                      <span className="font-semibold text-[#181615]">{selectedStylist.name}</span>
                    </div>
                    <div className="flex justify-between text-[#6E675F] pt-2 border-t border-[#C59B6D]/20 font-bold text-sm text-[#181615]">
                      <span>Total Estimated Cost:</span>
                      <span className="text-base text-[#B08455]">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#C59B6D]/20 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[#C59B6D]/40 text-xs font-medium text-[#181615] hover:bg-[#FAF7F2] flex items-center gap-1 cursor-pointer min-h-[44px]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#B08455] text-white font-bold text-xs tracking-wider uppercase hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer min-h-[48px]"
                    >
                      <span>Generate VIP Pass</span>
                      <Crown className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 4: VIP Reservation Pass & WhatsApp Concierge */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6 sm:space-y-8"
              >
                <div className="text-center space-y-1.5 sm:space-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#181615]">
                    VIP Studio Pass Ready
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E675F] max-w-md mx-auto">
                    Your appointment priority has been recorded. Tap the button below to send your slot confirmation directly to our Concierge on WhatsApp.
                  </p>
                </div>

                {/* The Luxury VIP Pass Ticket */}
                <div className="relative rounded-2xl bg-[#11100F] text-[#FAF7F2] p-4 sm:p-8 border-2 border-[#C59B6D] shadow-2xl overflow-hidden">
                  <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
                    <Scissors className="w-48 h-48 sm:w-64 sm:h-64 text-[#C59B6D]" />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-[#C59B6D]/30 pb-3 sm:pb-4 mb-4 sm:mb-6 gap-2">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#C59B6D] uppercase block">
                        Official Booking Pass
                      </span>
                      <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#FAF7F2]">
                        {SALON_DATA.businessName}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#A39B90] font-light">
                        {SALON_DATA.tagline}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#A39B90] block">Pass Reference</span>
                      <span className="font-mono text-sm sm:text-base font-bold text-[#C59B6D]">
                        {ticketReference}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs font-mono mb-4 sm:mb-6">
                    <div>
                      <span className="text-[#A39B90] block text-[9px] sm:text-[10px] uppercase">Guest</span>
                      <span className="text-[#FAF7F2] font-semibold font-sans truncate block">{guestName}</span>
                    </div>
                    <div>
                      <span className="text-[#A39B90] block text-[9px] sm:text-[10px] uppercase">Phone</span>
                      <span className="text-[#FAF7F2]">+91 {guestPhone}</span>
                    </div>
                    <div>
                      <span className="text-[#A39B90] block text-[9px] sm:text-[10px] uppercase">Date</span>
                      <span className="text-[#C59B6D] font-bold">{selectedDate}</span>
                    </div>
                    <div>
                      <span className="text-[#A39B90] block text-[9px] sm:text-[10px] uppercase">Slot</span>
                      <span className="text-[#C59B6D] font-bold">{selectedTimeSlot}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs font-mono mb-4 sm:mb-6 p-2.5 sm:p-3 rounded-xl bg-[#1C1A17] border border-[#C59B6D]/20">
                    <div>
                      <span className="text-[#A39B90] block text-[9px] sm:text-[10px] uppercase">Specialist Lead</span>
                      <span className="text-[#FAF7F2] font-medium">{selectedStylist.name}</span>
                    </div>
                    <div>
                      <span className="text-[#A39B90] block text-[9px] sm:text-[10px] uppercase">Experience Mode</span>
                      <span className="text-[#FAF7F2] font-medium">
                        {bookingMode === 'salon' ? 'In-Salon (Near Pant Vihar Gate)' : 'Home Service'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 border-t border-[#C59B6D]/20 pt-3 sm:pt-4 mb-4 sm:mb-6">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#A39B90] block mb-1.5">
                      Reserved Treatments:
                    </span>
                    {selectedServices.map((srv) => (
                      <div key={srv.id} className="flex justify-between text-xs gap-2">
                        <span className="text-[#FAF7F2] truncate">• {srv.name}</span>
                        <span className="text-[#C59B6D] font-mono shrink-0">₹{srv.price.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                    {selectedStylist.surcharge > 0 && (
                      <div className="flex justify-between text-xs text-[#A39B90]">
                        <span>• Specialist Consultation ({selectedStylist.name})</span>
                        <span className="font-mono">+₹{selectedStylist.surcharge}</span>
                      </div>
                    )}
                    {bookingMode === 'home' && (
                      <div className="flex justify-between text-xs text-[#A39B90]">
                        <span>• Home Concierge Logistics</span>
                        <span className="font-mono">+₹999</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#C59B6D]/30 pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-[#A39B90] font-mono uppercase block">
                        Estimated Grand Total (Pay at Studio)
                      </span>
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C59B6D]">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyTicket}
                      className="px-4 py-2.5 rounded-lg bg-[#1C1A17] hover:bg-[#2A2622] text-xs font-mono text-[#FAF7F2] border border-[#C59B6D]/30 flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[40px]"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#C59B6D]" />
                      <span>{copied ? 'Pass Copied!' : 'Copy Ticket Info'}</span>
                    </button>
                  </div>
                </div>

                {/* Primary WhatsApp Action & Direct Desk Call */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-1">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Confirm Slot via WhatsApp Concierge</span>
                  </a>

                  <a
                    href={SALON_DATA.phoneTel}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-[#181615] text-[#FAF7F2] hover:text-[#C59B6D] font-medium text-xs tracking-wider uppercase border border-[#C59B6D]/30 flex items-center justify-center gap-2 transition-colors min-h-[48px]"
                  >
                    <Phone className="w-4 h-4 text-[#C59B6D]" />
                    <span>Call Studio: 099271 26000</span>
                  </a>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      onClearServices();
                    }}
                    className="text-xs text-[#6E675F] hover:text-[#181615] underline cursor-pointer p-1"
                  >
                    Create another reservation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
