import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, MessageSquare, ArrowDown, MapPin, Star, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { SALON_DATA } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const luxuryEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative min-h-[100svh] bg-[#11100F] text-[#FAF7F2] flex flex-col justify-between pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      {/* Editorial Ambient Background Glow & Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-20 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] rounded-full bg-[#C59B6D]/10 blur-[90px] sm:blur-[130px]" />
        <div className="absolute bottom-20 -left-20 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] rounded-full bg-[#D4AF37]/5 blur-[90px] sm:blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,155,109,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C59B6D_1px,transparent_1px)] [background-size:20px_20px] sm:[background-size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-8">
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-[#C59B6D]/30 bg-[#1C1A17]/80 backdrop-blur-md shadow-inner max-w-full"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59B6D] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest text-[#C59B6D] uppercase truncate">
                PROP. PANKAJ THAKUR • COURT ROAD, SAHARANPUR
              </span>
            </motion.div>

            {/* Mask Text Reveal Headline */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, ease: luxuryEase, delay: 0.1 }}
                  className="font-serif text-3xl xs:text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#FAF7F2] leading-[1.1]"
                >
                  The Art of Signature
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, ease: luxuryEase, delay: 0.2 }}
                  className="font-serif text-3xl xs:text-4xl sm:text-6xl xl:text-7xl font-bold italic tracking-tight text-[#C59B6D] leading-[1.1] flex items-center gap-3"
                >
                  <span className="gold-gradient-text">Tejasswi Styling.</span>
                </motion.h1>
              </div>
            </div>

            {/* Subtitle / Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: luxuryEase, delay: 0.35 }}
              className="text-sm sm:text-base lg:text-lg text-[#A39B90] leading-relaxed max-w-2xl font-light"
            >
              Hair • Beauty • Skin • Makeup. Where precision unisex fades and European balayage meet royal HD bridal couture and medical-grade skin therapies. Directed by proprietor Pankaj Thakur on 1st Floor, Trill Plaza, Court Road, Saharanpur.
            </motion.p>

            {/* Badges / Micro proof */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: luxuryEase, delay: 0.45 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-[11px] sm:text-xs text-[#A39B90]"
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C1A17] border border-white/5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B6D] shrink-0" />
                <span>Prop. Pankaj Thakur</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C1A17] border border-white/5">
                <Star className="w-3.5 h-3.5 fill-[#C59B6D] text-[#C59B6D] shrink-0" />
                <span>5.0★ (99+ Verified Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C1A17] border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-[#C59B6D] shrink-0" />
                <span>Trill Plaza, Court Rd</span>
              </div>
            </motion.div>

            {/* Dual CTAs & Concierge Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: luxuryEase, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
            >
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#C59B6D] via-[#D4AF37] to-[#B08455] text-[#11100F] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,155,109,0.45)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <Calendar className="w-4 h-4 text-[#11100F]" />
                <span>Reserve Studio Experience</span>
              </button>

              <a
                href={SALON_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-[#C59B6D]/40 bg-[#1C1A17]/60 text-[#FAF7F2] hover:text-[#C59B6D] hover:border-[#C59B6D] font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 hover:bg-[#1C1A17] flex items-center justify-center gap-2 min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </a>

              <a
                href={SALON_DATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 sm:py-4 rounded-full border border-pink-500/30 bg-[#1C1A17]/40 text-pink-300 hover:text-pink-200 hover:border-pink-500/70 font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                title="View Instagram Portfolio"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Editorial Visual Showcase with Real Studio Photo */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.0, ease: luxuryEase, delay: 0.25 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer decorative frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#C59B6D]/30 p-1.5 sm:p-2 bg-gradient-to-b from-[#1C1A17] to-[#11100F] shadow-2xl">
                <div className="relative h-[290px] xs:h-[350px] sm:h-[470px] w-full rounded-xl overflow-hidden group">
                  <img
                    src="/salon-images/tejaswi-interior.jpg"
                    alt="Tejasswi Unisex Salon Interior Styling Stations"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11100F] via-[#11100F]/30 to-transparent opacity-90" />

                  {/* Floating Editorial Label */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 p-3 sm:p-4 rounded-xl bg-[#11100F]/90 backdrop-blur-md border border-[#C59B6D]/30 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-[#C59B6D]">FLAGSHIP STUDIO</p>
                      <h4 className="font-serif text-sm sm:text-base font-semibold text-[#FAF7F2]">Tejasswi Unisex Salon</h4>
                      <p className="text-[10px] text-[#A39B90] font-mono">Trill Plaza, Court Rd, Saharanpur</p>
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-[#C59B6D] bg-[#C59B6D]/15 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-[#C59B6D]/30 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#C59B6D]" /> 5.0★
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating aesthetic accent tag */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute -top-3 -left-3 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1C1A17]/95 border border-[#C59B6D]/40 backdrop-blur-md shadow-xl"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-[#FAF7F2]">Direct Bookings Live</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Glass Trust Bar (4 Metrics) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 sm:mt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: luxuryEase, delay: 0.5 }}
          className="rounded-2xl p-4 sm:p-6 lg:p-8 bg-[#1C1A17]/85 backdrop-blur-xl border border-[#C59B6D]/25 shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#C59B6D]/15">
            {SALON_DATA.metrics.map((metric, idx) => (
              <div key={metric.label} className={`space-y-0.5 sm:space-y-1 ${idx > 1 ? 'pt-3 sm:pt-0' : ''} ${idx !== 0 ? 'sm:pl-6' : ''}`}>
                <p className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-[#FAF7F2] gold-gradient-text tracking-tight">
                  {metric.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#FAF7F2]">{metric.label}</p>
                <p className="text-[10px] sm:text-[11px] text-[#A39B90] font-mono">{metric.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll down prompt */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <a
            href="#services"
            className="flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-widest text-[#A39B90] hover:text-[#C59B6D] transition-colors uppercase py-2"
          >
            <span>Explore Salon Catalog</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#C59B6D]" />
          </a>
        </div>
      </div>
    </section>
  );
};
