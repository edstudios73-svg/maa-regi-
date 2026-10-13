# Details awaiting owner confirmation

Everything below is **unconfirmed** in the concept. Update `src/config/site.ts` / `src/data/*.ts` and set `confirmed: true` as each item is approved.

## Contact & location (`src/config/site.ts`)

| Item | Current value in concept | Source / conflict |
| --- | --- | --- |
| Address | Tse Addo, opposite Goil Filling Station, House B213, Accra | Project brief. Instagram: "Maa Regi Plaza, Azuria Street, B213, Tse Addo-East La". Take App: "24 Azuria Street". **Conflicting — confirm exact wording.** |
| Map link | Google Maps *search* for "Maa Regi Tse Addo Accra" | Replace with the owner's Google Maps place link. |
| Phone | 020 699 1068 | Instagram + brief. Promotional posters also show **053 884 4364**. Take App lists a feedback contact. Confirm which number(s) to publish. |
| WhatsApp (orders) | +233 20 699 1068 | Instagram "Message on WhatsApp". **Must be confirmed before enabling the WhatsApp order handoff.** |
| Email | maaregigroup@gmail.com | Instagram contact info. |
| Opening hours | *Not displayed* | Instagram: 8:30 AM – 9:00 PM. Take App: 9:00 AM – 9:00 PM. **Conflicting.** |
| Social links | Instagram @maaregifoods, Facebook maaregisbakery | From brief. Take App also lists TikTok @Maaregirestaurant — add if wanted. |
| maaregi.com | — | Listed in a directory but did not resolve (DNS failure) when checked. Ask the owner about its status. |

## Brand & copy

- [ ] Tagline "Freshly Made. Made for You." — **proposed** by the studio, not an official slogan.
- [ ] "Tastes like home." (About page) — taken from Maa Regi's Instagram bio / Take App; confirm usage.
- [ ] About page copy — neutral placeholder; replace with the owner's story. No history, founder story, awards, testimonials, ingredient or production claims have been written.
- [ ] Wordmark — text-only placeholder; replace with the official logo files.
- [ ] Catering event types list and "how it works" steps — editable placeholders. No packages, minimum guest counts or prices are stated.

## Menu & prices (`src/data/products.ts`)

- [ ] Menu categories (based on Take App: Breakfast/Sandwiches & Omelettes, Grab n Go, Fingerfoods, Add-ons, Local Combos, Local Supremos, Grilled, Noodles & Pasta, Proteins).
- [ ] **Reference prices** (from Take App, where two prices were shown the lower one is used): Plain Omelette 20, Omelette Paysan 25, Cheese Omelette 45, Club Sandwich 55, Samosa (3) 10, Spring Rolls (3) 10, Beef Skewer 10, Fried / Spicy Chicken Wings 40, Stir-fried Noodles (Large) 55.
- [ ] **Sample prices** — all bakery items and other menu items are invented and must be replaced or removed.
- [ ] Product names and descriptions for items not on Take App are illustrative.
- [ ] Availability flags (one bakery and one menu item are marked "unavailable" to demonstrate the state).
- [ ] Delivery — offered "subject to confirmation"; confirm whether delivery exists, areas and fees. (Posters mention Bolt Food.)

## Photography

- [ ] All images are temporary Pexels stock photos. Some products share images. Replace with approved Maa Regi photography.

## Before going live

- [ ] Owner approval of the concept and content.
- [ ] Set `NEXT_PUBLIC_SITE_MODE=production` and the real `NEXT_PUBLIC_SITE_URL`.
- [ ] Connect catering/contact forms to a real delivery method.
- [ ] Decide how the site relates to the existing Take App ordering page.
- [ ] Domain/DNS changes only with explicit owner approval.
