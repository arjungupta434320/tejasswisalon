# Tejasswi Unisex Salon — Standalone Web Application

Welcome to the standalone, production-ready web application for **Tejasswi Unisex Salon** (Prop. Pankaj Thakur), located on 1st Floor, Trill Plaza, Court Road, Saharanpur, UP.

---

## 📁 What is Inside This Folder

- **`src/`** — All React 19 + TypeScript components:
  - `src/components/Navbar.tsx` — Glassmorphic navigation with live IST open/closed indicator (9:30 AM–9:30 PM), mobile drawer & Instagram integration
  - `src/components/Hero.tsx` — Obsidian Noir editorial hero showcasing real studio interior photo, Pankaj Thakur credentials & dual booking CTAs
  - `src/components/ServiceCatalog.tsx` — 5-category searchable service catalog with Indian Rupee pricing (Hair, Bridal, Skin, Men's Grooming, Beauty & Spa)
  - `src/components/BookingStudio.tsx` — 4-step interactive reservation engine with instant VIP WhatsApp concierge confirmation
  - `src/components/AcademySection.tsx` — Masterclasses & professional hairstyling diplomas with direct WhatsApp inquiry
  - `src/components/LookbookAndReviews.tsx` — Filterable lookbook with real studio interior & storefront photos + 10 verified Google 5.0★ reviews & Instagram banner
  - `src/components/LocationFooter.tsx` — Interactive Google Maps embed, weekly operating schedule, phone lines & address
  - `src/components/FloatingCartBar.tsx` — Damped-spring bottom booking tray
  - `src/data/salonData.ts` — Centralized configuration file for business details, prices, contact numbers, and reviews
- **`public/`** — Static assets:
  - `public/salon-images/tejaswi-interior.jpg` — Real studio interior photo with backlit mirrors & styling chairs
  - `public/salon-images/tejaswi-storefront.png` — Real exterior storefront photo at Trill Plaza
  - `public/salon-images/tejaswi-google-reviews-1.png` — Verified Google 5.0★ review screenshot proof
  - `public/salon-images/tejaswi-hours-location.jpg` — Verified Google Maps operating hours & address card
- **`dist/`** — Pre-compiled, production-ready static website (ready to host anywhere)
- **`START_WEBSITE.bat`** — 1-click double-click launcher for Windows
- **`PREVIEW_PRODUCTION_BUILD.bat`** — 1-click production preview launcher
- **`BUILD_PROJECT.bat`** — 1-click build script to update the `dist` folder

---

## 🚀 How to Run on Any Computer

### Option A: On Windows (Easiest - 1 Click)
1. Double-click **`START_WEBSITE.bat`**.
2. It will automatically check dependencies and open the website in your browser at `http://localhost:5173`.

### Option B: Via Terminal / Command Line
1. Open PowerShell / Command Prompt in this folder.
2. If dependencies are not installed yet, run:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---

## 🌐 How to Deploy Anywhere

### 1. Cloudflare Pages (Recommended - 100% Free & Fast)
- **Framework Preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Environment variables:** `NODE_VERSION=20`

### 2. Vercel or Netlify
- Drag and drop the **`dist`** folder directly into the Netlify or Vercel dashboard.

### 3. Traditional Web Hosting (cPanel / Hostinger / Apache / Nginx)
- Simply copy the contents of the **`dist/`** folder directly into your `public_html` directory. No Node.js required on the server!

---

## 📞 Business Details Hardcoded in Code
- **Name:** Tejasswi Unisex Salon
- **Proprietor:** Pankaj Thakur
- **Phone / WhatsApp:** `+91 78955 82173` (`078955 82173`)
- **Alternate Phone:** `096601 00064`
- **Instagram:** `https://www.instagram.com/panka_jthakur8` (`@panka_jthakur8`)
- **Address:** 1st Floor, Trill Plaza, Court Rd, Opp. Site Petrol Pump, Haqikatnagar, Saharanpur, Uttar Pradesh 247001
- **Hours:** Monday – Sunday: 9:30 AM – 9:30 PM (IST)
- **Google Rating:** 5.0★ (99+ Verified Reviews)
