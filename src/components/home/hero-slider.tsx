"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { business } from "@/config/site";
import { cn } from "@/lib/format";
import { LinkButton } from "@/components/ui/button";

/** Time each slide stays on screen. Keep it brisk. */
const SLIDE_SECONDS = 3.6;

const slides = [
  {
    label: "Jollof & Grill",
    href: "/menu?category=rice",
    image: "/images/hero-jollof.webp",
    alt: "Jollof rice topped with grilled chicken and vegetable skewers, with grilled fish behind",
    position: "center 55%",
  },
  {
    label: "Pies & Pastries",
    href: "/bakery?category=meat-pies",
    image: "/images/savory-pastry.webp",
    alt: "Golden savoury pastries, one cut open to show the filling, on a glossy black surface",
    position: "center",
  },
  {
    label: "From the Grill",
    href: "/menu?category=grilled",
    image: "/images/grilled-chicken.webp",
    alt: "Grilled chicken with roasted vegetables on a black plate",
    position: "center",
  },
  {
    label: "Cakes & Sweet Treats",
    href: "/bakery?category=cakes",
    image: "/images/chocolate-cake.webp",
    alt: "A slice of layered chocolate cake with cream filling on a white plate",
    position: "center 45%",
  },
  {
    label: "Snacks & Finger Foods",
    href: "/menu?category=snacks",
    image: "/images/samosa.webp",
    alt: "Crispy golden samosas on a wooden plate against a black background",
    position: "center",
  },
  {
    label: "Rice Dishes",
    href: "/menu?category=rice",
    image: "/images/chicken-rice.webp",
    alt: "Grilled chicken with white rice, fresh tomatoes and salad on a dark plate",
    position: "center 40%",
  },
  {
    label: "Fresh Juices",
    href: "/menu?category=beverages",
    image: "/images/juices.webp",
    alt: "Glasses of colourful fruit juice beside fresh fruit",
    position: "center 60%",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSlider() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const playing = !reduce && !userPaused && !hoverPaused;
  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), []);
  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Maa Regi highlights"
      className="relative isolate flex h-[calc(100svh-4rem)] min-h-[540px] items-end overflow-hidden bg-espresso lg:h-[calc(100svh-5rem)] lg:min-h-[620px]"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      {/* Slides: stacked cross-fade, with a slow push-in on the active image. */}
      <div className="absolute inset-0 -z-20" aria-live={playing ? "off" : "polite"}>
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.image}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
              aria-hidden={!active}
              className={cn("absolute inset-0 transition-opacity duration-[900ms] ease-out", active ? "opacity-100" : "opacity-0")}
            >
              <div
                className={cn(
                  "absolute inset-0 will-change-transform",
                  active && !reduce
                    ? "scale-[1.12] transition-transform duration-[5200ms] ease-out"
                    : "scale-100 transition-transform duration-0 delay-[900ms]",
                )}
              >
                <Image src={s.image} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover" style={{ objectPosition: s.position }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legibility + mood */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/10" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/70 via-espresso/10 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-4 -z-10 hidden border border-caramel-light/30 lg:block" aria-hidden />

      {/* Story-style progress. Finishing a bar advances the slide, so timing and display never drift apart. */}
      <div className="absolute inset-x-0 top-0 z-10 flex gap-1 px-4 pt-3 sm:px-6 lg:px-12 lg:pt-8">
        {slides.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show slide ${i + 1}: ${s.label}`}
            aria-current={i === index}
            className="group relative h-6 flex-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel-light"
          >
            <span className="absolute inset-x-0 top-1/2 block h-[2px] -translate-y-1/2 overflow-hidden bg-cream/25 transition-all group-hover:h-[3px]">
              <span
                key={`${i}-${i === index ? index : "x"}`}
                className="block h-full origin-left bg-cream-soft"
                style={
                  i < index || (reduce && i === index)
                    ? { transform: "scaleX(1)" }
                    : i === index
                      ? {
                          animation: `slide-progress ${SLIDE_SECONDS}s linear forwards`,
                          animationPlayState: playing ? "running" : "paused",
                        }
                      : { transform: "scaleX(0)" }
                }
                onAnimationEnd={() => i === index && go(index + 1)}
              />
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-site px-4 pb-28 sm:px-6 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="max-w-3xl">
          <div className="mb-5 h-6 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={reduce ? false : { y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduce ? undefined : { y: -24, opacity: 0 }}
                transition={{ duration: 0.38, ease }}
              >
                <Link
                  href={slide.href}
                  className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-eyebrow text-caramel-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel-light"
                >
                  <span className="font-serif text-sm font-normal normal-case italic tracking-normal text-cream-soft">
                    Nº {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-caramel-light/70" aria-hidden />
                  {slide.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <h1 className="font-serif text-[2.9rem] font-medium leading-[0.98] text-cream-soft sm:text-7xl lg:text-[6.5rem]">
            <span className="sr-only">{business.tagline}</span>
            <span aria-hidden className="block">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.1 }}
                >
                  Freshly Made.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.em
                  className="accent-light block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.28 }}
                >
                  Made for You.
                </motion.em>
              </span>
            </span>
          </h1>

          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-cream/85 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
          >
            From bakery favourites to satisfying meals, discover something delicious at Maa Regi.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 min-[420px]:flex-row"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.65 }}
          >
            <LinkButton href="/menu" variant="light" size="lg">
              Explore Our Menu <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
            <LinkButton href="/menu#catalogue" variant="outline-light" size="lg">
              Order Online
            </LinkButton>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute right-4 top-12 z-10 flex items-center gap-1 sm:right-6 lg:bottom-20 lg:right-12 lg:top-auto">
        <span className="mr-2 font-serif text-sm italic tabular-nums text-cream-soft/90">
          {String(index + 1).padStart(2, "0")} <span className="text-cream/50">/ {String(slides.length).padStart(2, "0")}</span>
        </span>
        {[
          { label: "Previous slide", icon: ChevronLeft, onClick: () => go(index - 1) },
          ...(reduce
            ? []
            : [
                {
                  label: userPaused ? "Play slideshow" : "Pause slideshow",
                  icon: userPaused ? Play : Pause,
                  onClick: () => setUserPaused((v) => !v),
                },
              ]),
          { label: "Next slide", icon: ChevronRight, onClick: () => go(index + 1) },
        ].map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            aria-label={label}
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/30 text-cream-soft backdrop-blur-sm transition-colors hover:border-cream hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel-light"
          >
            <Icon className="h-4 w-4" aria-hidden />
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="#intro-title"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-eyebrow text-cream/70 hover:text-cream-soft lg:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-cream/25">
          <span className="animate-scroll-cue absolute inset-0 bg-cream-soft" />
        </span>
      </a>
    </section>
  );
}
