import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Phone,
  Clock,
  Menu,
  X,
  ChevronRight,
  Award,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Scissors,
  MapPin,
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { SALON_DATA } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: () => void;
  selectedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, selectedCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Live IST calculation for 9:30 AM to 9:30 PM (9.5 to 21.5)
  useEffect(() => {
    const checkSalonStatus = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat([], options);
        const parts = formatter.formatToParts(now);
        const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '12', 10);
        const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
        const decimalHour = hour + minute / 60;

        // Salon open: 9:30 (9.5) to 21:30 (21.5)
        const open = decimalHour >= 9.5 && decimalHour < 21.5;
        setIsOpenNow(open);

        const timeString = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setCurrentTimeStr(timeString);
      } catch {
        const hr = new Date().getHours();
        setIsOpenNow(hr >= 9 && hr < 21);
      }
    };

    checkSalonStatus();
    const interval = setInterval(checkSalonStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services', icon: Scissors },
    { name: 'Reservation', href: '#booking', icon: Calendar },
    { name: 'Masterclasses', href: '#academy', icon: Award },
    { name: 'Reviews & Proof', href: '#reviews', icon: ShieldCheck },
    { name: 'Location & Hours', href: '#location', icon: Clock },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md bg-[#11100F]/95 border-b border-[#C59B6D]/20 py-2.5 sm:py-3 shadow-xl'
            : 'bg-gradient-to-b from-[#11100F]/95 via-[#11100F]/70 to-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Brand Logo & Title */}
            <a
              href="#"
              className="group flex items-center gap-2 sm:gap-3 shrink-0 select-none min-w-0"
              aria-label="Tejasswi Unisex Salon Home"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#C59B6D]/40 bg-[#1C1A17] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#C59B6D]">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#C59B6D]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-sm sm:text-lg xl:text-xl font-bold tracking-wider text-[#FAF7F2] uppercase whitespace-nowrap">
                    Tejasswi
                  </span>
                  {/* Subtle live indicator dot on mobile */}
                  <span
                    className={`inline-block w-2 h-2 rounded-full md:hidden ${
                      isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                    title={isOpenNow ? 'Open Now (9:30 AM – 9:30 PM)' : 'Closed (Opens 9:30 AM)'}
                  />
                  <span className="text-[9px] font-mono tracking-widest px-1.5 py-0.2 rounded bg-[#C59B6D]/15 text-[#C59B6D] border border-[#C59B6D]/30 uppercase hidden md:inline-block shrink-0">
                    Court Road
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] tracking-widest text-[#A39B90] uppercase font-sans truncate hidden xs:block">
                  Unisex Salon • Prop. Pankaj Thakur
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 shrink-0">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-widest text-[#A39B90] hover:text-[#C59B6D] transition-colors duration-200 font-medium relative group py-1 whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C59B6D] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Live IST Status indicator pill */}
              <div
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono backdrop-blur-md whitespace-nowrap shrink-0"
                style={{
                  borderColor: isOpenNow ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                  backgroundColor: isOpenNow ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                }}
                title={`Saharanpur IST: ${currentTimeStr} • Schedule: 9:30 AM – 9:30 PM`}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isOpenNow ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                </span>
                <span className={isOpenNow ? 'text-emerald-300' : 'text-amber-300'}>
                  {isOpenNow ? 'Open Now • 9:30 AM–9:30 PM' : 'Closed • Opens 9:30 AM'}
                </span>
              </div>

              {/* Instagram Profile Quick Link */}
              <a
                href={SALON_DATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#FAF7F2] hover:text-pink-400 border border-white/10 hover:border-pink-500/40 transition-all shrink-0 whitespace-nowrap group"
                title="Pankaj Thakur Instagram (@panka_jthakur8)"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[11px]">@panka_jthakur8</span>
              </a>

              {/* Direct Phone Dial (Desktop 2xl) */}
              <a
                href={SALON_DATA.phoneTel}
                className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#FAF7F2] hover:text-[#C59B6D] border border-white/10 hover:border-[#C59B6D]/40 transition-all shrink-0 whitespace-nowrap"
                title="Direct Concierge Line"
              >
                <Phone className="w-3.5 h-3.5 text-[#C59B6D]" />
                <span>{SALON_DATA.phone}</span>
              </a>

              {/* Quick-Book CTA */}
              <button
                onClick={onOpenBooking}
                className="relative group px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#C59B6D]/50 hover:border-[#C59B6D] bg-[#1C1A17] text-[#FAF7F2] hover:text-[#C59B6D] font-bold text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0 min-h-[38px] sm:min-h-[40px]"
                aria-label="Book appointment slot"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C59B6D]" />
                <span className="hidden xs:inline">Book</span>
                {selectedCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#C59B6D] text-[#11100F] text-[9px] font-bold flex items-center justify-center">
                    {selectedCount}
                  </span>
                )}
              </button>

              {/* Mobile & Tablet Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#B08455] text-[#11100F] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-[0_0_20px_rgba(197,155,109,0.5)] active:scale-95 transition-all cursor-pointer min-h-[38px] sm:min-h-[40px] shrink-0"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-4 h-4 text-[#11100F]" />
                <span className="text-[11px] sm:text-xs font-bold">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] xl:hidden flex justify-end">
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Slide-in Sheet from Right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-sm sm:max-w-md bg-[#11100F] border-l border-[#C59B6D]/30 flex flex-col justify-between shadow-2xl h-[100svh] overflow-hidden z-10"
            >
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#1C1A17]/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full border border-[#C59B6D]/40 bg-[#11100F] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#C59B6D]" />
                  </div>
                  <div>
                    <span className="font-serif text-base font-bold text-[#FAF7F2] uppercase block leading-tight">
                      Tejasswi Unisex Salon
                    </span>
                    <span className="text-[10px] text-[#C59B6D] uppercase font-mono tracking-wider block">
                      Prop. Pankaj Thakur • Court Road
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-full text-[#FAF7F2] hover:text-[#C59B6D] bg-[#11100F] border border-white/15 hover:border-[#C59B6D]/50 transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Body */}
              <div className="p-4 sm:p-5 space-y-4 flex-1 overflow-y-auto">
                {/* Live Status Card */}
                <div
                  className="p-3.5 rounded-2xl border text-xs font-mono space-y-1.5"
                  style={{
                    borderColor: isOpenNow ? 'rgba(16, 185, 129, 0.35)' : 'rgba(245, 158, 11, 0.35)',
                    backgroundColor: isOpenNow ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${
                          isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                        }`}
                      />
                      <span className={`font-bold ${isOpenNow ? 'text-emerald-300' : 'text-amber-300'}`}>
                        {isOpenNow ? 'Open Now in Saharanpur' : 'Closed • Opens 9:30 AM'}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#A39B90]">{currentTimeStr} IST</span>
                  </div>
                  <p className="text-[11px] text-[#FAF7F2]/80 font-sans flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C59B6D] shrink-0" />
                    <span>Mon – Sun: 9:30 AM – 9:30 PM</span>
                  </p>
                  <p className="text-[10px] text-[#A39B90] font-sans flex items-center gap-1 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C59B6D] shrink-0" />
                    <span>1st Floor, Trill Plaza, Court Rd (Opp. Site Petrol Pump)</span>
                  </p>
                </div>

                {/* Instagram Quick Follow Banner in Menu */}
                <a
                  href={SALON_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-black/50 border border-pink-500/30 text-xs text-[#FAF7F2] hover:border-pink-500/60 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-pink-200">Follow on Instagram</p>
                      <p className="text-[10px] text-pink-300/70 font-mono">@panka_jthakur8</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-pink-400 transition-transform group-hover:translate-x-1" />
                </a>

                {/* Navigation Links List */}
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-[#A39B90] px-2 mb-1">
                    Explore Sections:
                  </p>
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3.5 rounded-xl text-sm font-medium text-[#FAF7F2] hover:text-[#C59B6D] hover:bg-[#1C1A17] transition-all group min-h-[48px] border border-transparent hover:border-[#C59B6D]/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#1C1A17] border border-white/5 flex items-center justify-center group-hover:border-[#C59B6D]/40">
                            <IconComponent className="w-4 h-4 text-[#C59B6D]" />
                          </div>
                          <span className="tracking-wide font-medium">{link.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#A39B90] transition-transform group-hover:translate-x-1" />
                      </a>
                    );
                  })}
                </div>

                {/* Primary Action Button inside Menu */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#B08455] text-[#11100F] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve Studio Appointment</span>
                  </button>
                </div>

                {/* Fast Contact Actions */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#C59B6D]">
                    Direct Salon Concierge:
                  </p>
                  <a
                    href={SALON_DATA.phoneTel}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#1C1A17] text-xs font-mono text-[#FAF7F2] hover:text-[#C59B6D] border border-white/5 transition-colors min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 text-[#C59B6D] shrink-0" />
                    <span>{SALON_DATA.phone} (Pankaj Thakur)</span>
                  </a>
                  <a
                    href={SALON_DATA.phoneAltTel}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#1C1A17] text-xs font-mono text-[#FAF7F2] hover:text-[#C59B6D] border border-white/5 transition-colors min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 text-[#C59B6D] shrink-0" />
                    <span>{SALON_DATA.phoneAlt} (Alternate Line)</span>
                  </a>
                  <a
                    href={SALON_DATA.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#1C1A17] text-xs font-mono text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 transition-colors min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span>WhatsApp Concierge Chat</span>
                  </a>
                </div>
              </div>

              {/* Drawer Footer Credentials */}
              <div className="p-4 border-t border-white/10 bg-[#1C1A17]/80 text-[10px] text-[#A39B90] space-y-1">
                <div className="flex items-center gap-2 text-[#C59B6D]">
                  <Award className="w-3.5 h-3.5 shrink-0" />
                  <span>5.0★ Google Rated (99+ Verified Reviews)</span>
                </div>
                <p>Prop. Pankaj Thakur • 1st Floor, Trill Plaza, Court Rd, Saharanpur</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
