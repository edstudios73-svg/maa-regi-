/**
 * Central business configuration.
 *
 * Every piece of business information lives here so it can be confirmed with
 * the owner and edited in one place. Each detail carries a `confirmed` flag:
 *
 * - In demo mode, unconfirmed details may be shown, but always with a
 *   "to be confirmed" label.
 * - In production mode, unconfirmed details are hidden and any feature that
 *   depends on them (e.g. the WhatsApp order handoff) stays disabled.
 *
 * See OWNER-CONFIRMATION.md for the full list of items awaiting approval.
 */

export type SiteMode = "demo" | "production";

export const SITE_MODE: SiteMode =
  process.env.NEXT_PUBLIC_SITE_MODE === "production" ? "production" : "demo";

export const IS_DEMO = SITE_MODE === "demo";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export type Detail<T> = {
  value: T;
  /** True only once the owner has approved this exact value. */
  confirmed: boolean;
  /** Where the value came from, for the confirmation checklist. */
  source: string;
};

export const business = {
  name: "Maa Regi",
  /** Proposed concept tagline — not an existing official slogan. */
  tagline: "Freshly Made. Made for You.",
  shortDescription:
    "Bakery favourites, satisfying meals and catering enquiries in Tse Addo, Accra.",
  currency: "GH₵",

  address: {
    value: {
      line: "Tse Addo, opposite Goil Filling Station",
      house: "House B213",
      city: "Accra",
      country: "Ghana",
    },
    confirmed: false,
    source:
      "Project brief. Instagram lists 'Maa Regi Plaza, Azuria Street, B213, Tse Addo-East La'; Take App lists '24 Azuria Street'.",
  } satisfies Detail<{ line: string; house: string; city: string; country: string }>,

  mapUrl: {
    value: "https://www.google.com/maps/search/?api=1&query=Maa+Regi+Tse+Addo+Accra",
    confirmed: false,
    source: "Generated search link — replace with the owner's Google Maps place link.",
  } satisfies Detail<string>,

  phone: {
    value: { display: "020 699 1068", tel: "+233206991068" },
    confirmed: false,
    source: "Publicly listed (Instagram contact, project brief). Verify before live orders.",
  } satisfies Detail<{ display: string; tel: string }>,

  whatsapp: {
    /** International format, digits only, as used by wa.me links. */
    value: "233206991068",
    confirmed: false,
    source: "Instagram 'Message on WhatsApp' button. Must be confirmed before enabling order handoff.",
  } satisfies Detail<string>,

  email: {
    value: "maaregigroup@gmail.com",
    confirmed: false,
    source: "Instagram contact info.",
  } satisfies Detail<string>,

  openingHours: {
    value: null as string | null,
    confirmed: false,
    source:
      "Conflicting public listings (Instagram: 8:30 AM – 9:00 PM; Take App: 9:00 AM – 9:00 PM). Not displayed until confirmed.",
  } satisfies Detail<string | null>,

  social: [
    { label: "Instagram", href: "https://www.instagram.com/maaregifoods/", handle: "@maaregifoods" },
    { label: "Facebook", href: "https://www.facebook.com/maaregisbakery/", handle: "maaregisbakery" },
  ],

  /** Existing ordering channel. The concept links to it rather than replacing it. */
  existingOrdering: {
    label: "Take App",
    href: "https://take.app/maaregirestaurant",
  },
} as const;

export const studio = {
  name: "Baidenz Studioz",
  note: "Website concept prepared by Baidenz Studioz for presentation to Maa Regi.",
};

/** Whether an unconfirmed detail may be shown in the current mode. */
export function canShow(detail: { confirmed: boolean }): boolean {
  return detail.confirmed || IS_DEMO;
}

/** True when real orders can be handed off to the business on WhatsApp. */
export const WHATSAPP_ORDERING_ENABLED = !IS_DEMO && business.whatsapp.confirmed;

export const fullAddress = `${business.address.value.line}, ${business.address.value.city}`;
