"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice, priceStatusLabel } from "@/lib/format";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { buttonClasses, LinkButton } from "@/components/ui/button";

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, itemCount, setQty, remove, hasUnpricedItems, hasSamplePrices } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => panelRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panelRef.current) return;
      // Keep keyboard focus inside the drawer while it is open.
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="presentation">
          <motion.div
            className="absolute inset-0 bg-espresso/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream-soft shadow-lift focus:outline-none"
          >
            <div className="flex items-center justify-between border-b border-cocoa/10 px-5 py-4">
              <h2 id="cart-title" className="font-serif text-2xl text-espresso">
                Your order{itemCount > 0 && <span className="ml-2 text-base text-stone-warm">({itemCount})</span>}
              </h2>
              <button
                type="button"
                onClick={close}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-cocoa/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-cream-deep">
                  <ShoppingBag className="h-7 w-7 text-cocoa" aria-hidden />
                </div>
                <p className="mt-5 font-serif text-2xl text-espresso">Your cart is empty</p>
                <p className="mt-2 text-sm text-espresso-soft">Browse the bakery or the restaurant menu to add something delicious.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link href="/bakery" onClick={close} className={buttonClasses("secondary", "sm")}>
                    Bakery
                  </Link>
                  <Link href="/menu" onClick={close} className={buttonClasses("primary", "sm")}>
                    Restaurant Menu
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-cocoa/10 overflow-y-auto px-5">
                  {lines.map(({ product, qty, lineTotal }) => (
                    <li key={product.id} className="flex gap-4 py-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-cream-deep">
                        <Image src={product.image} alt="" fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium leading-snug text-espresso">{product.name}</p>
                          <p className="shrink-0 text-sm font-semibold tabular-nums text-espresso">
                            {lineTotal === null ? "TBC" : formatPrice(lineTotal)}
                          </p>
                        </div>
                        <p className="mt-0.5 text-xs text-stone-warm">
                          {product.price === null ? priceStatusLabel.tbc : `${formatPrice(product.price)} each`}
                          {product.priceStatus === "sample" && " · sample"}
                          {product.priceStatus === "reference" && " · to confirm"}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <QuantityStepper size="sm" value={qty} min={1} onChange={(v) => setQty(product.id, v)} label={product.name} />
                          <button
                            type="button"
                            onClick={() => remove(product.id)}
                            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-stone-warm hover:bg-terracotta/10 hover:text-terracotta-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa"
                            aria-label={`Remove ${product.name} from cart`}
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-cocoa/10 bg-cream px-5 pb-5 pt-4">
                  <dl className="flex items-baseline justify-between">
                    <dt className="text-sm text-espresso-soft">Subtotal</dt>
                    <dd className="font-serif text-2xl tabular-nums text-espresso">{formatPrice(subtotal)}</dd>
                  </dl>
                  <ul className="mt-2 space-y-1 text-xs text-stone-warm">
                    {hasUnpricedItems && <li>Some items have no confirmed price and are not included in the subtotal.</li>}
                    {hasSamplePrices && <li>Includes demonstration prices that are not Maa Regi&rsquo;s actual prices.</li>}
                    <li>Delivery, if available, is confirmed separately.</li>
                  </ul>
                  <LinkButton href="/checkout" size="lg" className="mt-4 w-full" onClick={close}>
                    Review order
                  </LinkButton>
                  <button type="button" onClick={close} className={buttonClasses("ghost", "md", "mt-2 w-full")}>
                    Keep browsing
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
