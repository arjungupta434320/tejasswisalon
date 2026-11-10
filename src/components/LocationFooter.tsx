import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Navigation,
  Sparkles,
  AlertTriangle,
  Copy,
  Check,
  Award,
  ExternalLink,
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { SALON_DATA } from '../data/salonData';

export const LocationFooter: React.FC = () => {
  const [currentDayName, setCurrentDayName] = useState<string>('Monday');
  const [copiedPlusCode, setCopiedPlusCode] = useState<boolean>(false);

  useEffect(() => {
    try {
      const day = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        timeZone: 'Asia/Kolkata',
      });
      setCurrentDayName(day);
    } catch {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      setCurrentDayName(days[new Date().getDay()]);
    }
  }, []);

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(SALON_DATA.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2000);
  };

  return (
    <footer id="location" className="bg-[#11100F] text-[#FAF7F2] border-t border-[#C59B6D]/20 pt-16 sm:pt-20 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C59B6D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-[#1C1A17] border border-[#C59B6D]/30 text-[10px] sm:text-xs font-mono tracking-widest text-[#C59B6D] uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#C59B6D]" />
            <span>Studio Flagship & Masterclass Academy</span>
          </div>

          <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
            Visit Our Saharanpur Studio
          </h2>

          <p className="text-xs sm:text-base text-[#A39B90] max-w-xl mx-auto font-light leading-relaxed">
            Conveniently situated on 1st Floor, Trill Plaza, Court Road (Opposite Site Petrol Pump), Haqikatnagar. Welcoming clients across Saharanpur.
          </p>
        </motion.div>

        {/* 2-Column Main Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mb-12 sm:mb-16">
          {/* Column 1: Weekly Hours & Festive Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-5 sm:space-y-6"
          >
            <div className="rounded-2xl sm:rounded-3xl bg-[#1C1A17] p-5 sm:p-8 border border-[#C59B6D]/25 shadow-xl space-y-5 sm:space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#C59B6D]" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FAF7F2]">
                    Operating Schedule
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs font-mono px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Open 7 Days/Week
                </span>
              </div>

              {/* Weekly Schedule Table */}
              <div className="space-y-1.5 sm:space-y-2">
                {SALON_DATA.schedule.map((item) => {
                  const isToday = item.day.toLowerCase() === currentDayName.toLowerCase();
                  return (
                    <div
                      key={item.day}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-colors ${
                        isToday
                          ? 'bg-[#C59B6D]/15 border border-[#C59B6D] font-bold shadow-sm'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs sm:text-sm ${isToday ? 'text-[#C59B6D]' : 'text-[#FAF7F2]'}`}>
                          {item.day}
                        </span>
                        {isToday && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#C59B6D] text-[#11100F] font-bold uppercase">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <span className={`text-xs sm:text-sm font-mono ${isToday ? 'text-[#C59B6D]' : 'text-[#A39B90]'}`}>
                          {item.hours}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Festive / Diwali Hours Disclaimer */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 flex items-start gap-2.5 sm:gap-3 text-xs leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300 block">Festive Hours Notice:</span>
                  <span className="text-[11px] sm:text-xs">{SALON_DATA.operatingHours.festiveDisclaimer} Please contact Pankaj Thakur or our reception in advance for Dhanteras, Diwali, Karva Chauth, or wedding appointments.</span>
                </div>
              </div>
            </div>

            {/* Google Profile Verification Badge Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#1C1A17] border border-[#C59B6D]/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C59B6D]/20 text-[#C59B6D] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#FAF7F2] font-semibold block">
                    Tejasswi Unisex Salon (Google Verified)
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#A39B90]">
                    Prop. Pankaj Thakur • Court Road, Saharanpur
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-white/5 text-[10px] sm:text-[11px] font-mono text-[#C59B6D] border border-white/10">
                  5.0 / 5.0 Rating (99+ Reviews)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Exact Location, Directions, & Interactive Map */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 space-y-5 sm:space-y-6"
          >
            <div className="rounded-2xl sm:rounded-3xl bg-[#1C1A17] p-5 sm:p-8 border border-[#C59B6D]/25 shadow-xl space-y-5 sm:space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-[#C59B6D]" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FAF7F2]">
                    Location & Concierge Desk
                  </h3>
                </div>
              </div>

              {/* Primary Address Info */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#C59B6D] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs sm:text-sm font-semibold text-[#FAF7F2]">
                      {SALON_DATA.address}
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#A39B90]">
                      Landmark: Opposite Site Petrol Pump, Haqikatnagar
                    </p>
                  </div>
                </div>

                {/* Google Plus Code with Copy button */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#11100F] border border-white/10 text-xs font-mono gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[#A39B90] shrink-0">Plus Code:</span>
                    <span className="text-[#C59B6D] font-bold truncate">{SALON_DATA.plusCode}</span>
                  </div>
                  <button
                    onClick={handleCopyPlusCode}
                    className="flex items-center gap-1 text-[#A39B90] hover:text-[#FAF7F2] p-1.5 cursor-pointer shrink-0 min-h-[36px]"
                    title="Copy Plus Code"
                  >
                    {copiedPlusCode ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedPlusCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Direct Phone Lines */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#C59B6D] font-semibold">
                  Direct Concierge Telephones:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={SALON_DATA.phoneTel}
                    className="p-3 rounded-xl bg-[#11100F] border border-[#C59B6D]/30 hover:border-[#C59B6D] transition-colors flex items-center gap-2.5 text-xs font-mono text-[#FAF7F2] min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 text-[#C59B6D] shrink-0" />
                    <span>{SALON_DATA.phone} (Pankaj Thakur)</span>
                  </a>

                  <a
                    href={SALON_DATA.phoneAltTel}
                    className="p-3 rounded-xl bg-[#11100F] border border-[#C59B6D]/30 hover:border-[#C59B6D] transition-colors flex items-center gap-2.5 text-xs font-mono text-[#FAF7F2] min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 text-[#C59B6D] shrink-0" />
                    <span>{SALON_DATA.phoneAlt} (Alternate Line)</span>
                  </a>
                </div>
              </div>

              {/* Interactive Navigation Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={SALON_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 sm:py-3.5 sm:px-6 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#B08455] text-[#11100F] font-bold text-xs tracking-wider uppercase hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                </a>

                <a
                  href={SALON_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 sm:py-3.5 sm:px-6 rounded-full bg-[#11100F] border border-[#C59B6D]/40 text-[#FAF7F2] hover:text-[#C59B6D] font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Map of Tejasswi Unisex Salon */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C59B6D]/30 shadow-2xl bg-[#1C1A17]">
              <div className="p-3 sm:p-3.5 border-b border-white/10 flex items-center justify-between bg-[#11100F]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C59B6D]" />
                  <span className="font-mono text-xs text-[#FAF7F2] font-semibold">
                    Tejasswi Unisex Salon Location
                  </span>
                </div>
                <a
                  href={SALON_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-[#C59B6D] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative h-[250px] sm:h-[300px] w-full">
                <iframe
                  title="Tejasswi Unisex Salon Location Map"
                  src={SALON_DATA.googleMapEmbedUrl}
                  className="w-full h-full border-0 filter contrast-[105%]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Editorial Colophon & Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-[#A39B90] font-mono text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B6D] shrink-0" />
            <span>© {new Date().getFullYear()} {SALON_DATA.businessName}. Prop. {SALON_DATA.proprietor}. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px]">
            <a
              href={SALON_DATA.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 flex items-center gap-1"
            >
              <InstagramIcon className="w-3 h-3" />
              <span>{SALON_DATA.instagramHandle}</span>
            </a>
            <span>•</span>
            <span>Trill Plaza, Court Rd, Saharanpur</span>
            <span>•</span>
            <span className="text-[#C59B6D]">5.0★ Rated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
