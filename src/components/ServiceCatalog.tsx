import React, { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Search, Clock, Plus, Check, Sparkles, Filter, X } from 'lucide-react';
import { SERVICES } from '../data/salonData';
import type { ServiceItem } from '../data/salonData';

interface ServiceCatalogProps {
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
}

const CATEGORIES = [
  'All',
  'Hair & Chemical',
  'Bridal & Makeup',
  'Skin & Aesthetics',
  "Men's Grooming",
  'Beauty & Spa',
] as const;

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  selectedServices,
  onToggleService,
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        activeCategory === 'All' || service.category === activeCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.genderBadge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const isSelected = (id: string) => selectedServices.some((s) => s.id === id);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#FAF7F2] text-[#181615] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C59B6D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-[#F2ECE1] border border-[#C59B6D]/30 text-[10px] sm:text-xs font-mono tracking-widest text-[#B08455] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
            <span>Hair • Beauty • Skin • Makeup Menu</span>
          </div>

          <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-[#181615]">
            Service Rituals & Artistry
          </h2>

          <p className="text-xs sm:text-base text-[#6E675F] max-w-xl mx-auto font-light leading-relaxed">
            Every session begins with an individualized diagnostic consultation under Pankaj Thakur and our certified artisans. Transparent Indian Rupee pricing with authentic salon-grade products.
          </p>
        </motion.div>

        {/* Filter Bar & Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 sm:space-y-6 mb-8 sm:mb-12"
        >
          {/* Search Box */}
          <div className="max-w-md mx-auto relative px-1">
            <label htmlFor="service-search" className="sr-only">
              Search services
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#6E675F] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="service-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search balayage, facial, groom shave..."
                className="w-full pl-11 pr-10 py-3 rounded-full bg-[#F2ECE1] border border-[#C59B6D]/30 text-base sm:text-sm text-[#181615] placeholder:text-[#6E675F]/70 focus:outline-none focus:ring-2 focus:ring-[#C59B6D]/50 focus:border-[#C59B6D] transition-all min-h-[48px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 text-[#6E675F] hover:text-[#181615] cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 5-Category Tabs with horizontal scroll on mobile */}
          <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 min-w-max pb-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200 z-10 cursor-pointer min-h-[40px] flex items-center ${
                      isActive ? 'text-[#FAF7F2]' : 'text-[#6E675F] hover:text-[#181615] bg-[#F2ECE1]/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#B08455] shadow-md -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Results Counter & Selected info */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 text-xs text-[#6E675F] mb-6 px-1">
          <span>Showing {filteredServices.length} bespoke services</span>
          {selectedServices.length > 0 && (
            <button
              onClick={onOpenBooking}
              className="text-[#B08455] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{selectedServices.length} selected for booking</span>
              <span>→</span>
            </button>
          )}
        </div>

        {/* Services Grid */}
        <motion.div
          key={activeCategory + searchQuery}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredServices.map((service) => {
            const selected = isSelected(service.id);
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -3 }}
                className={`group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col justify-between ${
                  selected
                    ? 'bg-[#F2ECE1] border-2 border-[#C59B6D] shadow-xl'
                    : 'bg-[#F2ECE1]/80 hover:bg-[#F2ECE1] border border-[#C59B6D]/20 hover:border-[#C59B6D]/60 hover:shadow-md'
                }`}
              >
                {/* Card Top: Badges & Price */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#181615]/5 text-[#6E675F] border border-[#181615]/10">
                        {service.genderBadge}
                      </span>
                      {service.popular && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C59B6D]/20 text-[#B08455] border border-[#C59B6D]/40 font-semibold">
                          Signature
                        </span>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-serif text-lg sm:text-2xl font-bold text-[#181615]">
                        ₹{service.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-base sm:text-xl font-bold text-[#181615] group-hover:text-[#B08455] transition-colors leading-snug mb-1.5">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E675F] leading-relaxed font-light line-clamp-3 mb-4 sm:mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Card Bottom: Duration & Add Action */}
                <div className="pt-3.5 border-t border-[#C59B6D]/15 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 text-xs text-[#6E675F] font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#C59B6D] shrink-0" />
                    <span>~{service.durationMinutes}m</span>
                  </div>

                  <button
                    onClick={() => onToggleService(service)}
                    className={`px-3.5 py-2 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer min-h-[44px] ${
                      selected
                        ? 'bg-[#181615] text-[#FAF7F2] shadow-sm'
                        : 'bg-white text-[#181615] border border-[#C59B6D]/50 hover:bg-[#C59B6D] hover:text-white hover:border-[#C59B6D]'
                    }`}
                  >
                    {selected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C59B6D]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Booking</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 sm:py-16 bg-[#F2ECE1] rounded-2xl border border-dashed border-[#C59B6D]/40 p-4">
            <Filter className="w-8 h-8 text-[#C59B6D] mx-auto mb-3 opacity-60" />
            <p className="font-serif text-base sm:text-lg font-bold text-[#181615]">No services match your query</p>
            <p className="text-xs text-[#6E675F] mt-1">Try clearing your search or switching categories.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#C59B6D] text-white text-xs font-semibold cursor-pointer min-h-[40px]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
