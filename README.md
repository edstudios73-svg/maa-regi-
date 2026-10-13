# Maa Regi — Website Concept

A responsive website prototype for **Maa Regi** (bakery, restaurant and catering, Tse Addo, Accra), prepared by **Baidenz Studioz** as a sales demonstration for the business owner.

> **This is a concept, not Maa Regi's official website.** It has not been approved by the business. In demo mode no orders, enquiries or messages are sent, no payments are processed, and the site asks search engines not to index it.

## What's included

| Page | Path | Highlights |
| --- | --- | --- |
| Home | `/` | Hero, brand intro, 8 category cards, featured products, menu promo, bakery feature, catering, location + map, final CTA |
| Bakery | `/bakery` | Catalogue with search, category filters, availability, quantity + add to cart |
| Restaurant Menu | `/menu` | Same catalogue features over 10 menu categories (based on the existing Take App structure) |
| Catering | `/catering` | Hero, how-it-works, gallery, validated quote enquiry form (demo confirmation only) |
| About | `/about` | Neutral, replaceable copy + "About this concept" notice |
| Contact | `/contact` | Details from central config (with "to be confirmed" labels), map, socials, enquiry form |
| Checkout | `/checkout` | Details → review → demo completion with the WhatsApp message preview |

Plus: cart drawer (add/remove/quantities/subtotal, saved in the browser), mobile menu, mobile "Order Now / View order" bar, 404 page, sitemap, robots, Open Graph metadata.

Category links deep-link into filters, e.g. `/menu?category=grilled`, `/bakery?category=cakes`.

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide icons.

```
src/
  app/                 # pages, layout, sitemap, robots
  components/
    layout/            # header, footer, cart drawer, demo banner, mobile order bar
    catalog/           # product card, searchable/filterable catalogue
    forms/             # checkout flow, catering + contact forms, field components
    ui/                # buttons, headings, badges, stepper, map, reveal animation
    seo/               # LocalBusiness JSON-LD (confirmed details only)
  config/
    site.ts            # ALL business details + demo/production switch
    navigation.ts      # nav + footer links
  context/cart-context.tsx  # cart state (useReducer + localStorage)
  data/
    products.ts        # every product — add / edit / remove here
    categories.ts      # bakery + menu categories, homepage category cards
  lib/                 # formatting, validation, order message builder
public/images/         # temporary stock photography (Pexels)
```

## Running locally

Requires Node.js 18.18+ (tested on Node 22).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Checks: `npm run lint` and `npm run typecheck`.

## Demo vs production mode

Set in `.env.local` (see `.env.example`):

```
NEXT_PUBLIC_SITE_MODE=demo          # default
NEXT_PUBLIC_SITE_URL=https://example.com
```

| | Demo (default) | Production |
| --- | --- | --- |
| Concept banner & notices | Shown | Hidden |
| Unconfirmed contact details | Shown with "to be confirmed" | Hidden |
| Checkout | Simulated; shows message preview | Opens WhatsApp **only if** `business.whatsapp.confirmed` is `true` |
| Search indexing | `noindex`, robots disallow all | Indexable |
| LocalBusiness structured data | None | Confirmed fields only |

Production mode does **not** add a backend: the catering and contact forms still need a form service (e.g. email/Formspree/API route) before launch, and sample prices must be replaced.

## Editing content

- **Business details** — `src/config/site.ts`. Each detail has `value`, `confirmed` and `source`. Flip `confirmed: true` only after the owner approves.
- **Products** — `src/data/products.ts`. Each product has a `priceStatus`:
  - `confirmed` — approved by the owner
  - `reference` — taken from the existing public Take App page; needs re-confirmation
  - `sample` — invented for the demo (shown with a "Sample" badge)
  - `tbc` — no price; excluded from the subtotal
- **Availability** — `subject-to-availability`, `pre-order`, or `unavailable` (cannot be added to cart).
- **Images** — replace files in `public/images/` (same names) or update paths in the data files.

## Deploying the prototype

Any Next.js host works (e.g. Vercel: import the repo, no extra settings; or `npm run build && npm start` on a Node server). Deploy to a **studio-controlled preview URL** only.

**Do not** point Maa Regi's domain or DNS at this concept, or publish it as their official site, without the owner's explicit approval.

## Before launch

See [`OWNER-CONFIRMATION.md`](./OWNER-CONFIRMATION.md) for every detail that still needs the owner's approval.

## Image credits

Temporary photography from [Pexels](https://www.pexels.com) (free licence). To be replaced with approved Maa Regi photographs before launch.
