import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Croissant, MapPin, Navigation, PartyPopper, UtensilsCrossed } from "lucide-react";
import { featuredCategories } from "@/data/categories";
import { featuredProducts } from "@/data/products";
import { business, fullAddress, IS_DEMO } from "@/config/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/catalog/product-card";
import { MapEmbed } from "@/components/ui/map-embed";

export default function HomePage() {
  return (
    <>
      {/* A — Hero */}
      <section className="relative isolate flex min-h-[min(88svh,760px)] items-end overflow-hidden bg-espresso">
        <Image
          src="/images/hero-jollof.webp"
          alt="Jollof rice topped with grilled chicken and vegetable skewers, with grilled fish behind"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/10" aria-hidden />
        <Container className="pb-14 pt-32 sm:pb-20 lg:pb-24">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-caramel-light">Tse Addo · Accra</p>
            <h1 className="max-w-3xl font-serif text-[2.6rem] font-medium leading-[1.02] text-cream-soft text-balance sm:text-6xl lg:text-7xl">
              {business.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              From bakery favourites to satisfying meals, discover something delicious at Maa Regi.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <LinkButton href="/menu" variant="light" size="lg">
                Explore Our Menu <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
              <LinkButton href="/menu#catalogue" variant="outline-light" size="lg">
                Order Online
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* B — Brand introduction */}
      <section className="py-20 sm:py-28" aria-labelledby="intro-title">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="intro-title"
              eyebrow="Welcome to Maa Regi"
              title="A bakery and food destination in Tse Addo, Accra."
              description="From bakery treats to satisfying meals, discover a variety of flavours for everyday moments and special occasions."
            />
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 font-medium text-cocoa underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa"
            >
              More about Maa Regi <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <ul className="grid gap-4 self-end">
            {[
              { icon: Croissant, title: "Bakery", text: "Bread, cakes, pastries and meat pies.", href: "/bakery" },
              { icon: UtensilsCrossed, title: "Restaurant", text: "Local meals, rice dishes, grills and snacks.", href: "/menu" },
              { icon: PartyPopper, title: "Catering", text: "Enquire about food for your gathering.", href: "/catering" },
            ].map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.08}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-5 rounded-2xl border border-cocoa/10 bg-cream-soft p-5 transition-colors hover:border-caramel/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-caramel/15 text-caramel-dark">
                      <item.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="block font-serif text-xl text-espresso">{item.title}</span>
                      <span className="block text-sm text-espresso-soft">{item.text}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-stone-warm transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* C — Categories */}
      <section className="bg-cream-deep py-20 sm:py-28" aria-labelledby="categories-title">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading id="categories-title" eyebrow="Explore" title="Explore Our Categories" />
            <LinkButton href="/menu" variant="secondary" className="self-start sm:self-auto">
              Full menu
            </LinkButton>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {featuredCategories.map((c, i) => (
              <Reveal as="li" key={c.title} delay={(i % 4) * 0.06}>
                  <Link
                    href={c.href}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa"
                  >
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/25 to-transparent" aria-hidden />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <h3 className="font-serif text-xl leading-tight text-cream-soft sm:text-2xl">{c.title}</h3>
                      <p className="mt-1 hidden text-sm text-cream/80 sm:block">{c.description}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-caramel-light">
                        View <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </div>
                  </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* D — Featured products */}
      <section className="py-20 sm:py-28" aria-labelledby="featured-title">
        <Container>
          <SectionHeading
            id="featured-title"
            eyebrow="Featured"
            title="Favourites to start with"
            description={
              IS_DEMO
                ? "A selection of items for the demonstration. Prices marked “Sample” are illustrative only; listed prices still need the owner’s confirmation."
                : "A few favourites from the bakery and the kitchen."
            }
          />
          <ul
            aria-label="Featured products"
            className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 min-[520px]:mx-0 min-[520px]:grid min-[520px]:grid-cols-2 min-[520px]:gap-5 min-[520px]:overflow-visible min-[520px]:px-0 lg:grid-cols-4"
          >
            {featuredProducts.slice(0, 8).map((p) => (
              <li key={p.id} className="w-[78%] shrink-0 snap-start min-[520px]:w-auto">
                <ProductCard product={p} compact />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* E — Restaurant menu promotion */}
      <section className="bg-espresso text-cream-soft" aria-labelledby="menu-promo-title">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[560px]">
            <Image
              src="/images/chicken-rice.webp"
              alt="Grilled chicken with rice, fresh tomatoes and salad on a dark plate"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center px-4 py-16 sm:px-10 lg:px-16 lg:py-24">
            <Reveal>
              <SectionHeading
                id="menu-promo-title"
                tone="light"
                eyebrow="Restaurant Menu"
                title="Something Delicious Is Waiting."
                description="Explore the menu and find something to enjoy."
              />
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-cream/75">
                {["Local meals & combos", "Rice dishes", "Grilled food", "Soups & stews", "Noodles & pasta", "Snacks & beverages"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-caramel" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <LinkButton href="/menu" variant="light" size="lg" className="mt-10">
                View Full Menu <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* F — Bakery feature */}
      <section className="py-20 sm:py-28" aria-labelledby="bakery-title">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4 lg:order-1">
            <div className="relative col-span-3 row-span-2 aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src="/images/croissants.webp" alt="Freshly baked croissants with flaky golden layers" fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
            </div>
            <div className="relative col-span-2 overflow-hidden rounded-2xl">
              <Image src="/images/bread-round.webp" alt="A round crusty loaf of bread" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
            </div>
            <div className="relative col-span-2 overflow-hidden rounded-2xl">
              <Image src="/images/cupcakes.webp" alt="Chocolate cupcakes with vanilla frosting" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
            </div>
          </div>
          <Reveal className="order-1 lg:order-2">
            <SectionHeading
              id="bakery-title"
              eyebrow="The Bakery"
              title="Your Bakery Favourites, All in One Place."
              description="Bread for the week, cakes for celebrations, pastries and meat pies for the in-between moments."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/bakery" size="lg">
                Browse the Bakery <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
              <LinkButton href="/bakery?category=cakes" variant="secondary" size="lg">
                Cakes
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* G — Catering */}
      <section className="relative isolate overflow-hidden bg-cocoa-dark py-24 sm:py-32" aria-labelledby="catering-title">
        <Image src="/images/jollof-pot.webp" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cocoa-dark via-cocoa-dark/85 to-cocoa-dark/40" aria-hidden />
        <Container>
          <Reveal className="max-w-xl">
            <SectionHeading
              id="catering-title"
              tone="light"
              eyebrow="Catering"
              title="Planning Something Special?"
              description="Get in touch to discuss food for your next gathering or event."
            />
            <LinkButton href="/catering#quote" variant="light" size="lg" className="mt-10">
              Request a Catering Quote <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
          </Reveal>
        </Container>
      </section>

      {/* H — Location */}
      <section className="py-20 sm:py-28" aria-labelledby="location-title">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading id="location-title" eyebrow="Visit" title="Find us in Tse Addo" />
            <p className="mt-6 flex items-start gap-3 text-lg text-espresso">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-terracotta" aria-hidden />
              <span>
                {fullAddress}.
                {IS_DEMO && <span className="mt-1 block text-sm text-stone-warm">Address to be confirmed by Maa Regi before launch.</span>}
              </span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={business.mapUrl.value} external size="lg">
                <Navigation className="h-4 w-4" aria-hidden /> Get Directions
              </LinkButton>
              <LinkButton href="/contact" variant="secondary" size="lg">
                Contact details
              </LinkButton>
            </div>
          </div>
          <MapEmbed />
        </Container>
      </section>

      {/* I — Final call to action */}
      <section className="pb-20 sm:pb-28" aria-labelledby="final-cta-title">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-cream-deep px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-caramel/15" aria-hidden />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-terracotta/10" aria-hidden />
            <div className="relative">
              <SectionHeading
                id="final-cta-title"
                align="center"
                title="Discover Maa Regi."
                description="Explore the menu, discover bakery favourites and get in touch."
              />
              <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row">
                <LinkButton href="/menu" size="lg">
                  Explore Menu
                </LinkButton>
                <LinkButton href="/contact" variant="secondary" size="lg">
                  Contact Us
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
