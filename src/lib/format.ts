import { business } from "@/config/site";
import type { Availability, PriceStatus } from "@/data/types";

export function formatPrice(amount: number): string {
  return `${business.currency}${amount.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export const priceStatusLabel: Record<PriceStatus, string> = {
  confirmed: "",
  reference: "Listed price · to confirm",
  sample: "Sample price",
  tbc: "Price to be confirmed",
};

export const priceStatusHelp: Record<PriceStatus, string> = {
  confirmed: "Price confirmed by Maa Regi.",
  reference: "Taken from Maa Regi's existing public ordering page. To be re-confirmed by the owner.",
  sample: "Demonstration price only — not Maa Regi's actual price.",
  tbc: "This item has no confirmed price yet.",
};

export const availabilityLabel: Record<Availability, string> = {
  "subject-to-availability": "Subject to availability",
  "pre-order": "Pre-order / ask first",
  unavailable: "Currently unavailable",
};

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
