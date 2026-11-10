import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCatalog } from './components/ServiceCatalog';
import { BookingStudio } from './components/BookingStudio';
import { AcademySection } from './components/AcademySection';
import { LookbookAndReviews } from './components/LookbookAndReviews';
import { LocationFooter } from './components/LocationFooter';
import { FloatingCartBar } from './components/FloatingCartBar';
import type { ServiceItem } from './data/salonData';

export function App() {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);

  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const handleClearServices = () => {
    setSelectedServices([]);
  };

  const handleOpenBooking = () => {
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#11100F] text-[#FAF7F2] font-sans selection:bg-[#C59B6D]/30 selection:text-[#FAF7F2]">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        selectedCount={selectedServices.length}
      />

      {/* Main Content Sections */}
      <main>
        {/* Editorial Obsidian Noir Hero */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 5-Category Searchable Service Catalog (Warm Alabaster) */}
        <ServiceCatalog
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onOpenBooking={handleOpenBooking}
        />

        {/* 4-Step Animated Reservation Studio (Warm Alabaster) */}
        <BookingStudio
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onClearServices={handleClearServices}
        />

        {/* Tejasswi Salon & Masterclass Academy Showcase (Obsidian Noir) */}
        <AcademySection />

        {/* High-Fashion Lookbook & Verified Client Reviews (Warm Alabaster) */}
        <LookbookAndReviews />

        {/* Schedule Table, Google Maps Directions & Location Hub (Obsidian Noir) */}
        <LocationFooter />
      </main>

      {/* Floating Bottom Booking Tray */}
      <FloatingCartBar
        selectedServices={selectedServices}
        onOpenBooking={handleOpenBooking}
        onClearServices={handleClearServices}
      />
    </div>
  );
}

export default App;
