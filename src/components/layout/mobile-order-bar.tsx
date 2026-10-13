"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

/** Thumb-friendly ordering action fixed to the bottom of small screens. */
export function MobileOrderBar() {
  const { itemCount, subtotal, open } = useCart();
  const pathname = usePathname();
  if (pathname.startsWith("/checkout")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-cocoa/10 bg-cream/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:hidden">
      {itemCount > 0 ? (
        <button
          type="button"
          onClick={open}
          className="flex h-12 w-full items-center justify-between rounded-full bg-cocoa px-5 text-cream-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa"
        >
          <span className="flex items-center gap-2 font-medium">
            <ShoppingBag className="h-4 w-4" aria-hidden /> View order ({itemCount})
          </span>
          <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
        </button>
      ) : (
        <Link
          href="/menu"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cocoa font-medium text-cream-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa"
        >
          <UtensilsCrossed className="h-4 w-4" aria-hidden /> Order Now
        </Link>
      )}
    </div>
  );
}
