"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { mainNav, orderCta } from "@/config/navigation";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/format";
import { LinkButton } from "@/components/ui/button";
import { Wordmark } from "./wordmark";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const { itemCount, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled || menuOpen ? "border-cocoa/10 bg-cream/95 backdrop-blur" : "border-transparent bg-cream",
      )}
    >
      <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.92rem] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa",
                      active ? "text-espresso" : "text-espresso-soft hover:text-espresso",
                    )}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-caramel" aria-hidden />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={open}
            className="relative grid h-11 w-11 place-items-center rounded-full text-espresso transition-colors hover:bg-cocoa/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa"
            aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-terracotta px-1 text-[0.65rem] font-bold text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>
          <LinkButton href={orderCta.href} size="sm" className="hidden sm:inline-flex">
            {orderCta.label}
          </LinkButton>
          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-espresso hover:bg-cocoa/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-cocoa/10 bg-cream lg:hidden"
          >
            <ul className="mx-auto max-w-site px-4 py-4 sm:px-6">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between border-b border-cocoa/10 py-3.5 font-serif text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa",
                        active ? "text-terracotta" : "text-espresso",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mx-auto max-w-site px-4 pb-6 sm:px-6">
              <LinkButton href={orderCta.href} size="lg" className="w-full">
                {orderCta.label}
              </LinkButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
