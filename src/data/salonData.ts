export interface ServiceItem {
  id: string;
  name: string;
  category: 'Hair & Chemical' | 'Bridal & Makeup' | 'Skin & Aesthetics' | "Men's Grooming" | 'Beauty & Spa';
  price: number;
  durationMinutes: number;
  genderBadge: 'Unisex' | 'Bridal / Women' | "Men's Exclusive" | 'Women Exclusive';
  description: string;
  popular?: boolean;
}

export interface StylistTier {
  id: string;
  name: string;
  title: string;
  experience: string;
  surcharge: number;
  description: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  duration: string;
  credential: string;
  level: string;
  batchStarts: string;
  highlights: string[];
  description: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  verifiedVisit: string;
  serviceReceived: string;
  content: string;
  date: string;
  screenshotUrl?: string;
  isGoogleVerified?: boolean;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'Bridal' | 'Hair Artistry' | 'Grooming' | 'Skin & Aesthetics' | 'Studio Space';
  imageUrl: string;
  aspect: 'portrait' | 'square' | 'landscape';
}

export const SALON_DATA = {
  businessName: 'Tejasswi Unisex Salon',
  shortName: 'Tejasswi',
  tagline: 'Hair • Beauty • Skin • Makeup — Crafted with Precision by Pankaj Thakur',
  proprietor: 'Pankaj Thakur',
  established: '2019',
  experienceYears: '6+',
  phone: '078955 82173',
  phoneAlt: '096601 00064',
  phoneTel: 'tel:+917895582173',
  phoneAltTel: 'tel:+919660100064',
  whatsappNumber: '917895582173',
  whatsappUrl: 'https://wa.me/917895582173',
  instagramUrl: 'https://www.instagram.com/panka_jthakur8?igsh=MXY3c2s5N2dvYm8wdg%3D%3D',
  instagramHandle: '@panka_jthakur8',
  address: '1st Floor, Trill Plaza, Court Rd, Opp. Site Petrol Pump, Haqikatnagar, Saharanpur, Uttar Pradesh 247001',
  streetAddress: '1st Floor, Trill Plaza, Court Road, Opp. Site Petrol Pump, Haqikatnagar, Saharanpur',
  plusCode: 'XH5V+7M Saharanpur, Uttar Pradesh',
  googleMapsUrl: 'https://maps.google.com/?q=Tejasswi+Unisex+Salon+Trill+plaza+Court+Rd+Saharanpur+Uttar+Pradesh+247001',
  googleMapEmbedUrl: 'https://maps.google.com/maps?q=Tejasswi+Unisex+Salon+Trill+plaza+Court+Rd+opp+Site+Petrol+Pump+Haqikatnagar+Saharanpur+Uttar+Pradesh+247001&t=&z=16&ie=UTF8&iwloc=&output=embed',
  operatingHours: {
    days: 'Monday – Sunday',
    time: '9:30 AM – 9:30 PM',
    openHour: 9.5,
    closeHour: 21.5,
    festiveDisclaimer: 'Hours might differ during festivals (e.g., Diwali, Karva Chauth & peak wedding dates).',
  },
  badges: [
    'Prop. Pankaj Thakur',
    '5.0★ Google Rated (99+ Reviews)',
    '100% Sanitized Tools',
    'Premium L’Oréal & Matrix Studio',
  ],
  metrics: [
    { label: 'Google Rating', value: '5.0★', sub: '99+ Verified 5-Star Reviews' },
    { label: 'Happy Makeovers', value: '1,200+', sub: 'Hair, Skin & Bridal Clients' },
    { label: 'Client Satisfaction', value: '100%', sub: 'Skilled & Soft-Spoken Staff' },
    { label: 'Prime Location', value: 'Court Rd', sub: 'Trill Plaza, Haqikatnagar' },
  ],
  schedule: [
    { day: 'Monday', hours: '9:30 AM – 9:30 PM', note: 'Regular hours' },
    { day: 'Tuesday', hours: '9:30 AM – 9:30 PM', note: 'Hours might differ during festivals' },
    { day: 'Wednesday', hours: '9:30 AM – 9:30 PM', note: 'Hours might differ during festivals' },
    { day: 'Thursday', hours: '9:30 AM – 9:30 PM', note: 'Regular hours' },
    { day: 'Friday', hours: '9:30 AM – 9:30 PM', note: 'Regular hours' },
    { day: 'Saturday', hours: '9:30 AM – 9:30 PM', note: 'Regular hours' },
    { day: 'Sunday', hours: '9:30 AM – 9:30 PM', note: 'Regular hours' },
  ],
};

export const SERVICES: ServiceItem[] = [
  // Hair & Chemical
  {
    id: 'hair-1',
    name: 'French Balayage & Gloss Melt',
    category: 'Hair & Chemical',
    price: 3999,
    durationMinutes: 180,
    genderBadge: 'Unisex',
    description: 'Custom hand-painted French balayage seamlessly blended with an espresso, honey or champagne gloss glaze melt.',
    popular: true,
  },
  {
    id: 'hair-2',
    name: 'Nanoplastia Organic Hair Smoothing',
    category: 'Hair & Chemical',
    price: 3499,
    durationMinutes: 150,
    genderBadge: 'Unisex',
    description: 'Formaldehyde-free bio-active hair restructuring delivering mirror-like glass reflection, zero frizz, and silky softness.',
    popular: true,
  },
  {
    id: 'hair-3',
    name: 'Keratin Protein Infusion Treatment',
    category: 'Hair & Chemical',
    price: 2799,
    durationMinutes: 120,
    genderBadge: 'Unisex',
    description: 'Deep structural keratin repair nourishing heat damage, sealing moisture barriers, and restoring high tensile shine.',
  },
  {
    id: 'hair-4',
    name: 'Precision Signature Haircut & Texture Blowdry',
    category: 'Hair & Chemical',
    price: 499,
    durationMinutes: 45,
    genderBadge: 'Unisex',
    description: 'Bespoke consultation, customized face-framing cut by senior stylists, luxury shampoo cleanse, and silhouette styling.',
    popular: true,
  },
  {
    id: 'hair-5',
    name: 'Global Hair Color & Ammonia-Free Root Touchup',
    category: 'Hair & Chemical',
    price: 1899,
    durationMinutes: 90,
    genderBadge: 'Unisex',
    description: 'Rich multidimensional color application using authentic salon-grade products for 100% grey coverage and radiant gloss.',
  },

  // Bridal & Makeup
  {
    id: 'bridal-1',
    name: 'Royal Heritage HD Bridal Transformation',
    category: 'Bridal & Makeup',
    price: 11999,
    durationMinutes: 240,
    genderBadge: 'Bridal / Women',
    description: 'Luxury high-definition airbrush base, 3D lash contouring, bespoke bridal hair sculpting, dupatta setting, and jewelry placement.',
    popular: true,
  },
  {
    id: 'bridal-2',
    name: 'Cocktail & Sangeet Glam Makeup',
    category: 'Bridal & Makeup',
    price: 4999,
    durationMinutes: 120,
    genderBadge: 'Women Exclusive',
    description: 'Luminous sculpted dewy glass complexion, smokey cut-crease eye couture, and editorial red-carpet wave styling.',
    popular: true,
  },
  {
    id: 'bridal-3',
    name: 'Groom Royal Wedding Day Grooming & Styling',
    category: 'Bridal & Makeup',
    price: 3499,
    durationMinutes: 90,
    genderBadge: "Men's Exclusive",
    description: 'HD skin correction, beard sculpting, precision hairline trim, Safa (turban) draping, and camera-ready groom matte finish.',
  },
  {
    id: 'bridal-4',
    name: 'Pre-Bridal Radiance Glow Package',
    category: 'Bridal & Makeup',
    price: 6499,
    durationMinutes: 180,
    genderBadge: 'Bridal / Women',
    description: 'Full-body luxury de-tan, diamond dermabrasion facial, gold glow body polishing, and customized bridal skin illumination.',
  },

  // Skin & Aesthetics
  {
    id: 'skin-1',
    name: 'Hydra-Infusion 7-Step Glass Facial',
    category: 'Skin & Aesthetics',
    price: 2499,
    durationMinutes: 75,
    genderBadge: 'Unisex',
    description: 'Hydro-dermabrasion deep pore vortex extraction, peptide ultrasound infusion, and cold cryogenic tightening.',
    popular: true,
  },
  {
    id: 'skin-2',
    name: 'O3+ Diamond Luxury Brightening Facial',
    category: 'Skin & Aesthetics',
    price: 1999,
    durationMinutes: 60,
    genderBadge: 'Unisex',
    description: 'Oxygenating peel, cellular regeneration massage, and active diamond powder mask for hyperpigmentation & tan removal.',
    popular: true,
  },
  {
    id: 'skin-3',
    name: 'Korean Glass Skin Botanical Peeling',
    category: 'Skin & Aesthetics',
    price: 2799,
    durationMinutes: 90,
    genderBadge: 'Unisex',
    description: 'Non-invasive botanical bio-resurfacing promoting collagen synthesis and baby-soft luminous glass reflection.',
  },
  {
    id: 'skin-4',
    name: 'Charcoal Laser Detox & Pore Purifying Treatment',
    category: 'Skin & Aesthetics',
    price: 1499,
    durationMinutes: 50,
    genderBadge: 'Unisex',
    description: 'Activated charcoal micro-exfoliation to draw out pollutants, reduce sebum, eliminate blackheads, and refine enlarged pores.',
  },

  // Men's Grooming
  {
    id: 'men-1',
    name: 'Executive Skin-Fade & Beard Architecture',
    category: "Men's Grooming",
    price: 599,
    durationMinutes: 50,
    genderBadge: "Men's Exclusive",
    description: 'Laser-sharp low/mid skin fade by Pankaj Thakur, hot towel steam, straight razor edge lining, and beard conditioning.',
    popular: true,
  },
  {
    id: 'men-2',
    name: 'Charcoal Scalp Steam Detox & Styling',
    category: "Men's Grooming",
    price: 699,
    durationMinutes: 45,
    genderBadge: "Men's Exclusive",
    description: 'Deep exfoliating charcoal scalp scrub, botanical steam bath, anti-dandruff tonic, and matte clay finish.',
  },
  {
    id: 'men-3',
    name: 'Men’s Anti-Pollution Deep Clean Facial',
    category: "Men's Grooming",
    price: 999,
    durationMinutes: 50,
    genderBadge: "Men's Exclusive",
    description: 'Targeted male skin treatment countering sun damage, pollution dullness, and razor burn.',
  },
  {
    id: 'men-4',
    name: 'Signature Royal Shave & Acupressure Head Massage',
    category: "Men's Grooming",
    price: 499,
    durationMinutes: 40,
    genderBadge: "Men's Exclusive",
    description: 'Triple warm towel wrap, badger brush lather, precision cut-throat shave, and 15-minute tension-relief acupressure massage.',
  },

  // Beauty & Spa
  {
    id: 'spa-1',
    name: 'Russian Manicure & Nail Gel Art',
    category: 'Beauty & Spa',
    price: 1599,
    durationMinutes: 80,
    genderBadge: 'Women Exclusive',
    description: 'Dry e-file Russian cuticle manicure, durable gel extension sculpting, and elegant French or chrome nail art.',
    popular: true,
  },
  {
    id: 'spa-2',
    name: 'Rose Petal & Milk Luxury Spa Pedicure',
    category: 'Beauty & Spa',
    price: 999,
    durationMinutes: 60,
    genderBadge: 'Unisex',
    description: 'Organic rose petal milk soak, Himalayan pink salt scrub, calluses smoothing, and relaxing warm stone calf massage.',
  },
  {
    id: 'spa-3',
    name: 'Aroma Tension-Melting Back & Shoulder Spa',
    category: 'Beauty & Spa',
    price: 1299,
    durationMinutes: 50,
    genderBadge: 'Unisex',
    description: 'Warm essential oil massage targeting spine, neck, and shoulder stiffness with lavender and sandalwood aroma.',
  },
  {
    id: 'spa-4',
    name: 'Full Body Waxing & De-Tan Therapy',
    category: 'Beauty & Spa',
    price: 1899,
    durationMinutes: 75,
    genderBadge: 'Women Exclusive',
    description: 'Painless RICA chocolate wax treatment paired with soothing aloe-vera post-care for silky, radiant skin.',
  },
];

export const STYLIST_TIERS: StylistTier[] = [
  {
    id: 'pankaj-thakur',
    name: 'Pankaj Thakur',
    title: 'Proprietor & Master Stylist',
    experience: 'Founder • 6+ Years Artistry',
    surcharge: 300,
    description: 'Celebrated hair architect & styling maestro. Renowned for custom precision fades, French balayage, and personalized bridal transformations.',
  },
  {
    id: 'bridal-master',
    name: 'Master Bridal Specialist',
    title: 'Celebrity Makeup & Draping Lead',
    experience: '5+ Years Experience',
    surcharge: 200,
    description: 'Lead bridal makeup artist creating flawless, long-lasting HD & Airbrush looks for brides across Saharanpur.',
  },
  {
    id: 'top-stylist',
    name: 'Senior Salon Stylist',
    title: 'Certified Salon Specialist',
    experience: '3+ Years Experience',
    surcharge: 0,
    description: 'Skilled, soft-spoken artisan delivering meticulous haircuts, modern texture styling, and signature skin therapies.',
  },
];

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'course-pankaj-hair',
    title: 'Pankaj Thakur Advanced Unisex Hair & Chemical Masterclass',
    duration: '2 Months (Intensive Hands-On)',
    credential: 'Certified Professional Hair Stylist & Colorist',
    level: 'Beginner to Advanced Masterclass',
    batchStarts: 'Next Batch: 1st of Upcoming Month',
    highlights: [
      'Master European Balayage, Ombré & Global Color formulations',
      'Nanoplastia, Keratin, Botox & Cysteine chemical realignment',
      'Geometrical Sectioning, Pivot Point angles & Precision scissor fading',
      'Personal mentorship directly under Pankaj Thakur',
      'Live model practice and salon floor client handling psychology',
    ],
    description: 'Train directly under Pankaj Thakur at Trill Plaza. Transform into a confident, in-demand hair technician with complete mastery of modern chemical treatments and architectural cuts.',
  },
  {
    id: 'course-bridal-makeup',
    title: 'Master Bridal HD Makeup & Hair Sculpting Diploma',
    duration: '3 Months (Full-Time)',
    credential: 'Professional Cosmetology & Bridal Diploma',
    level: 'All Levels (Aspiring Makeup Artists)',
    batchStarts: 'Next Batch: 15th of Upcoming Month',
    highlights: [
      'HD, Airbrush, Dewy & Glass Skin Bridal Makeup techniques',
      'Advanced 3D Bridal Hair Sculpting & International Bun Architecture',
      'Complete Dupatta, Jewelry & Saree Draping masterclasses',
      'Vanity kit curation, product chemistry & social media portfolio generation',
      'Live bride shoot portfolio generation with studio lighting',
    ],
    description: 'The golden standard bridal artistry course in Saharanpur. Learn how to create breathtaking bridal looks that hold up under camera flashes and emotional wedding days.',
  },
  {
    id: 'course-salon-management',
    title: 'Complete Salon Setup, Skin Aesthetics & Nail Artistry',
    duration: '4 Months (Comprehensive)',
    credential: 'Full Cosmetology License & Studio Diploma',
    level: 'Aspiring Salon Entrepreneurs',
    batchStarts: 'Limited Seats (Max 6 Students/Batch)',
    highlights: [
      'Russian dry manicure, nail extensions & 3D nail art masteries',
      'Hydra-facial machine operations, chemical peels & dermaplaning',
      'Salon software operations, staff hiring, and P&L accounting',
      'Instagram growth, reel creation & client acquisition tactics',
      'Vendor procurement discounts for professional salon supplies',
    ],
    description: 'Tailored for entrepreneurs aiming to launch their own successful salon studio. Learn the business, marketing, and technical craft behind running a 5-star rated salon.',
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-dhruv',
    author: 'Dhruv Behal',
    rating: 5,
    verifiedVisit: 'Verified Google Review • 4 reviews',
    serviceReceived: 'Precision Haircut & Styling by Pankaj Thakur',
    content: 'My go-to salon! Excellent haircuts, skilled staff, great service, and a clean, comfortable environment. Pankaj always understand exactly what I want. Highly recommended.',
    date: '9 months ago',
    screenshotUrl: '/salon-images/tejaswi-google-reviews-1.png',
    isGoogleVerified: true,
  },
  {
    id: 'rev-sunny',
    author: 'SUNNY KORI',
    rating: 5,
    verifiedVisit: 'Verified Google Review • 1 review',
    serviceReceived: 'Hair Transformation & Spa',
    content: "Absolutely loved it! The hair looks so beautiful, soft, and gorgeous. The quality is amazing, and I'm totally in love with the look. Highly recommended! ❤️ ✨",
    date: '4 weeks ago',
    screenshotUrl: '/salon-images/tejaswi-google-reviews-1.png',
    isGoogleVerified: true,
  },
  {
    id: 'rev-soumik',
    author: 'Soumik Jana',
    rating: 5,
    verifiedVisit: 'Verified Google Review • 5 reviews',
    serviceReceived: 'Hair Styling & Beard Grooming',
    content: 'Great experience. Whenever i visited i felt like home. I love to visit the place.',
    date: '3 weeks ago',
    screenshotUrl: '/salon-images/tejaswi-google-reviews-1.png',
    isGoogleVerified: true,
  },
  {
    id: 'rev-ayush',
    author: 'Ayush Kapil',
    rating: 5,
    verifiedVisit: 'Local Guide • 21 reviews, 11 photos',
    serviceReceived: 'Men’s Precision Haircut',
    content: 'Had a great experience at this Salon. The hair stylist is skilled and soft spoken.',
    date: '3 weeks ago',
    screenshotUrl: '/salon-images/tejaswi-google-reviews-1.png',
    isGoogleVerified: true,
  },
  {
    id: 'rev-anshika',
    author: 'Anshika Walia',
    rating: 5,
    verifiedVisit: 'Verified Google Review • 9 reviews, 1 photo',
    serviceReceived: 'Hair Makeover & Styling',
    content: 'Highly recommended, his behaviour is so calm and good and his work also appreciated. Thank you to give me such a new look 😊',
    date: '5 months ago',
    screenshotUrl: '/salon-images/tejaswi-google-reviews-1.png',
    isGoogleVerified: true,
  },
  {
    id: 'rev-manali',
    author: 'Manali Raj',
    rating: 5,
    verifiedVisit: 'Verified Google Review • 2 reviews',
    serviceReceived: 'Haircut & Texture Styling',
    content: 'Highly talented staff and great service. Love the haircut,amazing experience...',
    date: '3 months ago',
    screenshotUrl: '/salon-images/tejaswi-google-reviews-1.png',
    isGoogleVerified: true,
  },
  {
    id: 'rev-tushar',
    author: 'Tushar 006',
    rating: 5,
    verifiedVisit: 'Verified Google Review • 2 reviews',
    serviceReceived: 'Hair Styling & Grooming',
    content: 'Best saloon in Saharanpur and very good staff',
    date: '3 weeks ago',
    screenshotUrl: '/salon-images/tejaswi-google-reviews-1.png',
    isGoogleVerified: true,
  },
  {
    id: 'rev-chanchal',
    author: 'Chanchal bharti Bharti',
    rating: 5,
    verifiedVisit: 'Verified Google Review • 3 reviews',
    serviceReceived: 'Hair & Beauty Care',
    content: 'Best experience in the salon hair all work and beauty all work 👍',
    date: '2 months ago',
    screenshotUrl: '/salon-images/tejaswi-google-reviews-1.png',
    isGoogleVerified: true,
  },
  {
    id: 'rev-lakshay',
    author: 'Lakshay Chawla',
    rating: 5,
    verifiedVisit: 'Verified Google Review • 2 reviews',
    serviceReceived: 'Executive Haircut & Wash',
    content: 'Great experience! The staff was professional and the service was excellent. Loved the haircut, Highly recommended!',
    date: '5 months ago',
    screenshotUrl: '/salon-images/tejaswi-google-reviews-1.png',
    isGoogleVerified: true,
  },
  {
    id: 'rev-satya',
    author: 'Satya Sharma',
    rating: 5,
    verifiedVisit: 'Verified Google Review • 1 review',
    serviceReceived: 'Complete Grooming Experience',
    content: 'Best to best working n humbleness',
    date: '4 weeks ago',
    screenshotUrl: '/salon-images/tejaswi-google-reviews-1.png',
    isGoogleVerified: true,
  },
];

export const LOOKBOOK_GALLERY: LookbookItem[] = [
  {
    id: 'look-real-interior',
    title: 'Tejasswi Studio Interior & Styling Chairs',
    category: 'Studio Space',
    imageUrl: '/salon-images/tejaswi-interior.jpg',
    aspect: 'portrait',
  },
  {
    id: 'look-1',
    title: 'Royal Heritage HD Bridal Transformation',
    category: 'Bridal',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    aspect: 'portrait',
  },
  {
    id: 'look-2',
    title: 'Champagne Gloss Balayage on Dark Locks',
    category: 'Hair Artistry',
    imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=80',
    aspect: 'square',
  },
  {
    id: 'look-3',
    title: 'Precision Razor Skin Fade & Beard Sculpt',
    category: 'Grooming',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
    aspect: 'portrait',
  },
  {
    id: 'look-4',
    title: 'Hydra Glass Skin & Botanical Oxygenation',
    category: 'Skin & Aesthetics',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    aspect: 'square',
  },
  {
    id: 'look-5',
    title: 'Editorial Airbrush Dewy Glam',
    category: 'Bridal',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    aspect: 'landscape',
  },
];
