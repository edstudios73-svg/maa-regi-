import { business } from "@/config/site";
import type { CartLine } from "@/context/cart-context";
import { formatPrice } from "./format";

export type Fulfilment = "pickup" | "delivery";

export type OrderDetails = {
  name: string;
  phone: string;
  fulfilment: Fulfilment;
  deliveryLocation: string;
  notes: string;
};

/** Plain-text order summary, as it would be sent to the business on WhatsApp. */
export function buildOrderMessage(details: OrderDetails, lines: CartLine[], subtotal: number, hasUnpriced: boolean): string {
  const items = lines.map(
    ({ product, qty, lineTotal }) => `• ${qty} × ${product.name} — ${lineTotal === null ? "price TBC" : formatPrice(lineTotal)}`,
  );
  const parts = [
    `Hello ${business.name}, I'd like to place an order:`,
    "",
    ...items,
    "",
    `Subtotal: ${formatPrice(subtotal)}${hasUnpriced ? " (+ items priced on confirmation)" : ""}`,
    `Collection: ${details.fulfilment === "pickup" ? "Pickup" : `Delivery to ${details.deliveryLocation.trim()}`}`,
    `Name: ${details.name.trim()}`,
    `Phone: ${details.phone.trim()}`,
  ];
  if (details.notes.trim()) parts.push(`Notes: ${details.notes.trim()}`);
  parts.push("", "Please confirm availability, total and timing. Thank you!");
  return parts.join("\n");
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${business.whatsapp.value}?text=${encodeURIComponent(message)}`;
}
