import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, X } from 'lucide-react';
import type { ServiceItem } from '../data/salonData';

interface FloatingCartBarProps {
  selectedServices: ServiceItem[];
  onOpenBooking: () => void;
  onClearServices: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  selectedServices,
  onOpenBooking,
  onClearServices,
}) => {
  const count = selectedServices.length;
  const totalAmount = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
  const totalDuration = selectedServices.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="floating-cart-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-40"
        >
        <div className="rounded-2xl bg-[#11100F]/95 backdrop-blur-xl border border-[#C59B6D] p-3 sm:p-4 text-[#FAF7F2] shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between gap-3">
            {/* Left Info */}
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C59B6D] text-[#11100F] text-[10px] sm:text-xs font-bold flex items-center justify-center font-mono shrink-0">
                  {count}
                </span>
                <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-[#A39B90] truncate">
                  {count === 1 ? 'Ritual' : 'Rituals'}
                </span>
                <button
                  onClick={onClearServices}
                  className="text-[11px] text-[#A39B90] hover:text-rose-400 p-1 cursor-pointer shrink-0"
                  title="Clear selected services"
                  aria-label="Clear selected services"
                >
                  <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-lg sm:text-2xl font-bold text-[#C59B6D]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-[#A39B90] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C59B6D] shrink-0" />
                  <span>~{totalDuration}m</span>
                </span>
              </div>
            </div>

            {/* Right CTA */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-gradient-to-r from-[#C59B6D] to-[#B08455] text-[#11100F] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(197,155,109,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 min-h-[44px]"
            >
              <span>Reserve</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
