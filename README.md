# Facima Motors — React car marketplace (PWA)

Kenya-style used-car site inspired by [CarDuka](https://www.carduka.com/): inventory browse, vehicle detail pages, sell/trade-in, and a finance calculator. Installable as a phone web app (PWA).

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for hosting / install

```bash
npm run build
npm run preview
```

Serve the `dist/` folder over **HTTPS** (required for “Add to Home Screen” on phones). Use Netlify, Vercel, GitHub Pages, or any static host.

### Install on your phone

1. Deploy or open the built site in Chrome (Android) or Safari (iOS).
2. **Android:** Menu → *Install app* / *Add to Home screen* (or use the in-site banner when offered).
3. **iOS:** Share → *Add to Home Screen*.

## Admin dashboard (hidden)

- **Access:** Small padlock icon in the footer (not in the main menu).
- **URL:** `/gate` → after login, `/gate/inventory`
- **Default credentials** (change in `src/config/admin.ts` before production):
  - Username: `admin`
  - Password: `Facima@Admin2025`

From the dashboard you can upload photos from your device, publish listings, delete stock, or restore demo seed data. Listings are stored in the browser `localStorage` (suitable for demo; use a backend API for production).

## Finance calculator

Available on the home page (compact), full `/finance` page, and each vehicle detail page with that car’s price pre-filled.

## Project stack

- React 19 + TypeScript + Vite
- React Router
- `vite-plugin-pwa` (offline shell + install manifest)

## Security note

Front-end admin login is for convenience only. For a real dealership site, protect uploads and inventory with a server-side API and proper authentication.