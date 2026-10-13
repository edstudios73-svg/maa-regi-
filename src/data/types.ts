export type Catalog = "bakery" | "menu";

/**
 * - confirmed: approved by the owner.
 * - reference: copied from Maa Regi's existing public ordering page; must be re-confirmed.
 * - sample: invented for the demonstration only.
 * - tbc: no price yet.
 */
export type PriceStatus = "confirmed" | "reference" | "sample" | "tbc";

/** Availability is never assumed — items default to "subject to availability". */
export type Availability = "subject-to-availability" | "pre-order" | "unavailable";

export type Category = {
  id: string;
  catalog: Catalog;
  label: string;
  description: string;
};

export type Product = {
  id: string;
  catalog: Catalog;
  category: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Price in Ghana cedis. `null` when not yet known. */
  price: number | null;
  priceStatus: PriceStatus;
  availability: Availability;
  featured?: boolean;
};
