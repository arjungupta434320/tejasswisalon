import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  Calendar,
  CheckCircle,
  MessageSquare,
  Briefcase,
  Phone,
} from 'lucide-react';
import { ACADEMY_COURSES, SALON_DATA } from '../data/salonData';
import type { AcademyCourse } from '../data/salonData';

export const AcademySection: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse>(ACADEMY_COURSES[0]);

  const handleInquireCourse = (course: AcademyCourse) => {
    const text = `*TEJASSWI SALON & ACADEMY MASTERCLASS INQUIRY*%0A%0A` +
      `Hello Pankaj Sir, I want to apply for the *${encodeURIComponent(course.title)}*.%0A` +
      `*Duration:* ${encodeURIComponent(course.duration)}%0A` +
      `*Batch:* ${encodeURIComponent(course.batchStarts)}%0A%0A` +
      `Please share the upcoming batch schedule, fee structure, and seat availability at Trill Plaza. Thank you!`;

    const url = `https://wa.me/${SALON_DATA.whatsappNumber}?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <section id="academy" className="py-16 sm:py-24 bg-[#11100F] text-[#FAF7F2] relative overflow-hidden">
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#C59B6D]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-[#1C1A17] border border-[#C59B6D]/30 text-[10px] sm:text-xs font-mono tracking-widest text-[#C59B6D] uppercase">
            <GraduationCap className="w-3.5 h-3.5 text-[#C59B6D]" />
            <span>Pankaj Thakur Hair & Beauty Masterclasses</span>
          </div>

          <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
            Launch Your Professional Styling Career
          </h2>

          <p className="text-xs sm:text-base text-[#A39B90] max-w-2xl mx-auto font-light leading-relaxed">
            Train inside Saharanpur’s top-rated unisex studio under direct mentorship from proprietor Pankaj Thakur. 100% hands-on live model experience, government-recognized diplomas, and practical salon floor training.
          </p>

          {/* Academy Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-4 sm:pt-6 max-w-4xl mx-auto">
            <div className="p-3 sm:p-4 rounded-xl bg-[#1C1A17] border border-[#C59B6D]/20 text-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#C59B6D] block">100%</span>
              <span className="text-[10px] sm:text-[11px] text-[#A39B90] uppercase font-mono">Live Model Practice</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-[#1C1A17] border border-[#C59B6D]/20 text-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#C59B6D] block">1-on-1</span>
              <span className="text-[10px] sm:text-[11px] text-[#A39B90] uppercase font-mono">Pankaj Thakur Guidance</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-[#1C1A17] border border-[#C59B6D]/20 text-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#C59B6D] block">Certified</span>
              <span className="text-[10px] sm:text-[11px] text-[#A39B90] uppercase font-mono">Industry Diploma</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-[#1C1A17] border border-[#C59B6D]/20 text-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#C59B6D] block">Max 6</span>
              <span className="text-[10px] sm:text-[11px] text-[#A39B90] uppercase font-mono">Students/Batch</span>
            </div>
          </div>
        </motion.div>

        {/* 3 Course Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {ACADEMY_COURSES.map((course, idx) => {
            const isSelected = selectedCourse.id === course.id;
            return (
              <motion.div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
                whileHover={{ y: -4 }}
                className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1A17] border-2 border-[#C59B6D] shadow-2xl shadow-[#C59B6D]/15'
                    : 'bg-[#1C1A17]/80 hover:bg-[#1C1A17] border-white/10 hover:border-[#C59B6D]/50'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#C59B6D] px-2.5 py-0.5 rounded-full bg-[#C59B6D]/15 border border-[#C59B6D]/30">
                      {course.duration}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-[#A39B90]">
                      {course.level}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#FAF7F2] mb-2 sm:mb-3 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#A39B90] leading-relaxed mb-4 sm:mb-6 font-light">
                    {course.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 mb-6 sm:mb-8">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#C59B6D] font-semibold">
                      Curriculum Highlights:
                    </p>
                    {course.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#FAF7F2]/90">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C59B6D] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 sm:pt-6 border-t border-white/10 space-y-3 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-[#A39B90]">
                    <Award className="w-4 h-4 text-[#C59B6D] shrink-0" />
                    <span className="truncate">{course.credential}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                    <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400">
                      {course.batchStarts}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInquireCourse(course);
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#B08455] text-[#11100F] font-bold text-xs tracking-wider uppercase hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enquire via WhatsApp</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Academy In-Studio Experience Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1C1A17] via-[#2A2622] to-[#1C1A17] p-5 sm:p-8 md:p-12 border border-[#C59B6D]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8"
        >
          <div className="space-y-2 sm:space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C59B6D] uppercase">
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Free Consultation & Course Walkthrough</span>
            </div>
            <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#FAF7F2]">
              Visit Our Studio at Trill Plaza, Court Road
            </h3>
            <p className="text-xs sm:text-sm text-[#A39B90] leading-relaxed font-light">
              Book a personal visit with Pankaj Thakur. Inspect our professional styling stations, product formulations, and course roadmaps tailored for ambitious stylists in Saharanpur.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`https://wa.me/${SALON_DATA.whatsappNumber}?text=${encodeURIComponent(
                'Hello Pankaj Sir, I would like to book a free masterclass counseling session at Tejasswi Unisex Salon, Trill Plaza, Court Road.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#C59B6D] text-[#11100F] font-bold text-xs tracking-wider uppercase hover:bg-[#B08455] transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Masterclass Visit</span>
            </a>

            <a
              href={SALON_DATA.phoneTel}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 text-[#FAF7F2] hover:text-[#C59B6D] font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Phone className="w-4 h-4 text-[#C59B6D]" />
              <span>Call: {SALON_DATA.phone}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
