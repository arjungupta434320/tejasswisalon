import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Camera,
  Image as ImageIcon,
  Quote,
  X,
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import {
  REVIEWS,
  LOOKBOOK_GALLERY,
  SALON_DATA,
} from '../data/salonData';

const LOOKBOOK_CATEGORIES = [
  'All',
  'Studio Space',
  'Hair Artistry',
  'Bridal',
  'Grooming',
  'Skin & Aesthetics',
] as const;

export const LookbookAndReviews: React.FC = () => {
  const [activeLookbookCategory, setActiveLookbookCategory] = useState<string>('All');
  const [activeReviewIdx, setActiveReviewIdx] = useState<number>(0);
  const [showScreenshotModal, setShowScreenshotModal] = useState<string | null>(null);

  const filteredLookbook = LOOKBOOK_GALLERY.filter((item) =>
    activeLookbookCategory === 'All' ? true : item.category === activeLookbookCategory
  );

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF7F2] text-[#181615] relative overflow-hidden">
      <div className="absolute top-10 left-10 w-80 h-80 bg-[#C59B6D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ================= SECTION PART 1: EDITORIAL LOOKBOOK ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-[#F2ECE1] border border-[#C59B6D]/30 text-[10px] sm:text-xs font-mono tracking-widest text-[#B08455] uppercase">
            <Camera className="w-3.5 h-3.5 text-[#C59B6D]" />
            <span>High-Fashion Lookbook & Studio Portfolio</span>
          </div>

          <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-[#181615]">
            Artistry in the Spotlight
          </h2>

          <p className="text-xs sm:text-base text-[#6E675F] max-w-xl mx-auto font-light leading-relaxed">
            A visual curation of our real studio interior at Trill Plaza, signature balayage reflections, bridal couture, and precision fades crafted by Pankaj Thakur.
          </p>

          {/* Lookbook Category Filter Pills */}
          <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pt-2">
            <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 min-w-max pb-1">
              {LOOKBOOK_CATEGORIES.map((cat) => {
                const isActive = activeLookbookCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveLookbookCategory(cat)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer min-h-[38px] flex items-center ${
                      isActive
                        ? 'bg-[#181615] text-[#FAF7F2] shadow-sm'
                        : 'bg-[#F2ECE1] text-[#6E675F] hover:text-[#181615] border border-[#C59B6D]/20'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Masonry / Grid Lookbook */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {filteredLookbook.map((look) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden bg-[#181615] border border-[#C59B6D]/30 shadow-lg aspect-[4/5]"
            >
              <img
                src={look.imageUrl}
                alt={look.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100F] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 space-y-1 transform transition-transform duration-300">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#C59B6D] px-2 py-0.5 rounded bg-[#11100F]/80 backdrop-blur-md inline-block">
                  {look.category}
                </span>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#FAF7F2] leading-snug">
                  {look.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= INSTAGRAM PORTFOLIO BANNER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-24 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#181615] via-[#241F1C] to-[#181615] p-5 sm:p-8 text-[#FAF7F2] border border-[#C59B6D]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg">
              <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-[#FAF7F2]">
                  Pankaj Thakur on Instagram
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  @panka_jthakur8
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A39B90] font-light">
                Explore real client haircuts, balayage transformations & behind-the-scenes salon reels.
              </p>
            </div>
          </div>

          <a
            href={SALON_DATA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs tracking-wider uppercase hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0 shadow-md min-h-[48px]"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @panka_jthakur8</span>
          </a>
        </motion.div>

        {/* ================= SECTION PART 2: VERIFIED CLIENT REVIEWS ================= */}
        <div className="pt-8 sm:pt-12 border-t border-[#C59B6D]/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-[#F2ECE1] border border-[#C59B6D]/30 text-[10px] sm:text-xs font-mono tracking-widest text-[#B08455] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59B6D]" />
              <span>5.0★ Google Verified Testimonials</span>
            </div>

            <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-[#181615]">
              Praised by Saharanpur
            </h2>

            <p className="text-xs sm:text-base text-[#6E675F] max-w-xl mx-auto font-light leading-relaxed">
              With a perfect 5.0★ rating across 99+ verified Google reviews, Tejasswi Unisex Salon is celebrated for skilled styling, humble demeanor, and comfortable studio ambiance.
            </p>
          </motion.div>

          {/* Featured Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-10 sm:mb-16"
          >
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#F2ECE1] p-5 sm:p-8 md:p-12 border-2 border-[#C59B6D]/40 shadow-xl overflow-hidden">
              <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-[#C59B6D]/15 absolute -top-1 -left-1 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4 sm:space-y-6 relative z-10"
                >
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          i < Math.floor(REVIEWS[activeReviewIdx].rating)
                            ? 'text-[#C59B6D] fill-[#C59B6D]'
                            : 'text-[#C59B6D]/40'
                        }`}
                      />
                    ))}
                    <span className="ml-1.5 font-mono text-xs font-bold text-[#181615]">
                      {REVIEWS[activeReviewIdx].rating}.0
                    </span>
                  </div>

                  {/* Review Text */}
                  <blockquote className="font-serif text-base sm:text-xl md:text-2xl text-[#181615] leading-relaxed italic">
                    "{REVIEWS[activeReviewIdx].content}"
                  </blockquote>

                  {/* Reviewer Details */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-[#C59B6D]/20">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm sm:text-base text-[#181615]">
                          {REVIEWS[activeReviewIdx].author}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                      <p className="text-[11px] text-[#6E675F] font-mono mt-0.5">
                        {REVIEWS[activeReviewIdx].verifiedVisit} • {REVIEWS[activeReviewIdx].date}
                      </p>
                      <p className="text-xs text-[#B08455] font-medium mt-0.5">
                        Experience: {REVIEWS[activeReviewIdx].serviceReceived}
                      </p>
                    </div>

                    {REVIEWS[activeReviewIdx].screenshotUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setShowScreenshotModal(REVIEWS[activeReviewIdx].screenshotUrl || null)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#C59B6D]/40 text-xs font-mono text-[#181615] hover:bg-[#C59B6D] hover:text-white transition-all shadow-sm cursor-pointer self-start sm:self-auto min-h-[38px]"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>View Google Review Proof</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-end gap-2 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#C59B6D]/15">
                <button
                  onClick={prevReview}
                  aria-label="Previous review"
                  className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-[#C59B6D] hover:text-white text-[#181615] border border-[#C59B6D]/30 transition-all shadow-sm cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[#6E675F] px-1 sm:px-2">
                  {activeReviewIdx + 1} / {REVIEWS.length}
                </span>
                <button
                  onClick={nextReview}
                  aria-label="Next review"
                  className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-[#C59B6D] hover:text-white text-[#181615] border border-[#C59B6D]/30 transition-all shadow-sm cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Verified Google Review Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {REVIEWS.slice(0, 6).map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="p-4 sm:p-6 rounded-2xl bg-[#F2ECE1]/80 hover:bg-[#F2ECE1] border border-[#C59B6D]/20 hover:border-[#C59B6D]/50 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#C59B6D] fill-[#C59B6D]" />
                      ))}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      5.0★ Google Verified
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#181615] font-serif italic mb-3 leading-relaxed">
                    "{rev.content}"
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#C59B6D]/15 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#181615] block">{rev.author}</span>
                    <span className="text-[10px] text-[#6E675F] font-mono">{rev.date}</span>
                  </div>

                  {rev.screenshotUrl && (
                    <button
                      onClick={() => setShowScreenshotModal(rev.screenshotUrl || null)}
                      className="text-[11px] text-[#B08455] hover:underline font-mono cursor-pointer p-1"
                    >
                      Inspect Proof
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Google Review Badge Banner */}
          <div className="mt-8 sm:mt-12 text-center">
            <a
              href={SALON_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#181615] text-[#FAF7F2] hover:text-[#C59B6D] text-xs font-mono uppercase tracking-wider transition-all shadow-md min-h-[48px]"
            >
              <span>Read All 99+ Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C59B6D]" />
            </a>
          </div>
        </div>
      </div>

      {/* Screenshot Proof Modal */}
      <AnimatePresence>
        {showScreenshotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm sm:max-w-lg bg-[#1C1A17] rounded-2xl p-4 sm:p-6 border border-[#C59B6D]/40 text-[#FAF7F2] space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C59B6D]" />
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#FAF7F2]">
                    Verified Google Review Snapshot
                  </span>
                </div>
                <button
                  onClick={() => setShowScreenshotModal(null)}
                  className="p-1.5 rounded-lg text-[#A39B90] hover:text-[#FAF7F2] cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label="Close proof preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden bg-white p-2">
                <img
                  src={showScreenshotModal}
                  alt="Verified Google Review Proof"
                  className="w-full h-auto object-contain max-h-[50vh] mx-auto"
                />
              </div>

              <p className="text-[11px] text-[#A39B90] text-center font-mono">
                Direct snapshot from Google Maps verified profile for Tejasswi Unisex Salon (Prop. Pankaj Thakur), Saharanpur.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
