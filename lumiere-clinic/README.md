# Lumière — Aesthetic Clinic

Frontend prototype for a cosmetic & aesthetic clinic web application.
University Full-Stack course project — **frontend only** (no backend, database or real authentication; all data is realistic mock data).

## How to run

No build tools or installs needed.

- **Simplest:** double-click `index.html` — it opens in any modern browser.
- **Recommended for development:** open the folder in VS Code, install the *Live Server* extension, then click **"Go Live"**. The page auto-reloads on every save.

## Demo walkthrough

1. On the entry page choose **Client** → *Continue*
2. Browse **Treatments**, filter by category, click *Book treatment*
3. Complete the 5-step booking flow (treatment → specialist → date → time → confirm)
4. Open **My Profile** to see the loyalty card, upcoming appointment and history
5. *Sign out*, choose **Admin** → *Continue* to see the clinic dashboard, weekly chart and appointment/client tables

## Project structure

```
lumiere-clinic/
├── index.html            All screens (entry, client interface, admin dashboard)
│
├── css/
│   ├── base.css          Design tokens, reset, typography, shared UI (buttons, chips, cards)
│   ├── entry.css         Login / role-selection screen
│   ├── client.css        Client nav, home page, treatments page, footer, mobile nav
│   ├── booking.css       Booking stepper, calendar, time slots, review & success screens
│   ├── profile.css       Profile page and loyalty card
│   ├── admin.css         Admin sidebar, stat cards, chart, tables, sub-pages
│   └── responsive.css    Tablet & mobile breakpoints
│
└── js/
    ├── data.js           Mock data: treatments, specialists, appointments, clients
    ├── navigation.js     Simulated auth, role selection, screen routing (client + admin)
    ├── treatments.js     Feature 1 — treatment cards & category filtering
    ├── booking.js        Feature 2 — 5-step booking flow, calendar, slots, confirmation
    ├── profile.js        Feature 3 — profile, loyalty & treatment history rendering
    └── admin.js          Feature 4 — dashboard stats, weekly chart, tables
```

Script load order in `index.html` matters: `data.js` first, then feature modules.

## The four main features

| # | Feature | Where |
|---|---------|-------|
| 1 | Treatments & Services | Treatments page — 12 services in 4 categories, filterable cards |
| 2 | Appointment Booking | 5-step flow with progress stepper, calendar and mock availability |
| 3 | Client Profile & Loyalty | Loyalty card (720 / 1000 pts), reward progress, history |
| 4 | Admin Clinic Dashboard | Stats, weekly appointments chart, today's schedule, sub-pages |

The entry page (login / role selection) is the entry point, not a feature.

## Design notes

- **Identity:** premium, calm clinic aesthetic — ivory / warm sand neutrals, deep sage accent, brushed-gold loyalty tones. Deliberately not pink / e-commerce.
- **Typography:** *Fraunces* (display serif) + *Outfit* (body), loaded from Google Fonts with system fallbacks.
- **Signature motif:** arched-window image shapes carried through the hero, treatment cards and login visual.
- **Imagery:** grain-textured gradient art (pure CSS) instead of external photos, so the prototype never shows broken images offline.
- **Responsive:** desktop / tablet / mobile; the client nav becomes a floating bottom bar on phones and the admin sidebar collapses to a top bar.

## Mock-data behaviour worth showing

- Calendar: Saturdays closed, past days disabled, some days deterministically "fully booked", month navigation works.
- Time slots: availability varies by chosen specialist and date; some slots appear as *Booked*.
- Confirmation generates a random booking reference (e.g. `LM-2481`).
