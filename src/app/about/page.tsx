import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { IS_DEMO, studio } from "@/config/site";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "About Maa Regi — a bakery, restaurant and catering destination in Tse Addo, Accra.",
  alternates: { canonical: "/about" },
};

// PLACEHOLDER COPY — neutral introduction to be replaced with the owner's own brand story.
const offerings = [
  {
    title: "The Bakery",
    text: "Bread, cakes, pastries, meat pies and other baked snacks for everyday moments and celebrations.",
    image: "/images/bread-display.webp",
    alt: "Fresh loaves of bread on a bakery display",
    href: "/bakery",
    cta: "Visit the bakery",
  },
  {
    title: "The Restaurant",
    text: "Local meals and combos, rice dishes, grilled food, soups, noodles, breakfast, snacks and beverages.",
    image: "/images/jollof-plantain.webp",
    alt: "Jollof rice served with fried plantain",
    href: "/menu",
    cta: "See the menu",
  },
  {
    title: "Catering",
    text: "Food for gatherings and events, discussed and planned with you.",
    image: "/images/sandwich-platter.webp",
    alt: "Sandwich platter prepared for an event",
    href: "/catering",
    cta: "Enquire about catering",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Maa Regi"
        title="Bakery, kitchen and catering in Tse Addo."
        description="Maa Regi brings together bakery favourites, satisfying meals and catering for gatherings — all in one place in Tse Addo, Accra."
        image="/images/pastries.webp"
        imageAlt="An assortment of pastries and croissants in a bakery display"
      />

      <section className="py-16 sm:py-24" aria-labelledby="offer-title">
        <Container>
          <SectionHeading id="offer-title" eyebrow="What we offer" title="Something for every part of the day." />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {offerings.map((o) => (
              <li key={o.title} className="flex flex-col overflow-hidden rounded-2xl bg-cream-soft shadow-card ring-1 ring-cocoa/5">
                <div className="relative aspect-[4/3]">
                  <Image src={o.image} alt={o.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-2xl text-espresso">{o.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso-soft">{o.text}</p>
                  <Link href={o.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cocoa hover:underline">
                    {o.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-cream-deep py-16 sm:py-24" aria-labelledby="story-title">
        <Container className="max-w-3xl text-center">
          <SectionHeading
            id="story-title"
            align="center"
            eyebrow="Our story"
            title="Tastes like home."
            description="This space is reserved for Maa Regi's own story — told in the owner's words, with photographs of the team, the kitchen and the bakery."
          />
          <LinkButton href="/contact" variant="secondary" className="mt-8">
            Get in touch
          </LinkButton>
        </Container>
      </section>

      {IS_DEMO && (
        <section id="concept" className="py-16 sm:py-20" aria-labelledby="concept-title">
          <Container>
            <div className="mx-auto max-w-3xl rounded-2xl border border-caramel/30 bg-caramel/10 p-6 sm:p-8">
              <h2 id="concept-title" className="flex items-center gap-2 font-serif text-2xl text-espresso">
                <FlaskConical className="h-5 w-5 text-caramel-dark" aria-hidden /> About this concept
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-espresso-soft">
                <p>
                  {studio.note} It demonstrates how a unified website could help customers discover Maa Regi, browse the bakery and menu,
                  enquire about catering and start an order. It is not Maa Regi&rsquo;s official website and has not been approved by the
                  business.
                </p>
                <p>
                  Photographs are temporary stock images. Products, prices and availability are placeholders: prices marked
                  &ldquo;Sample&rdquo; are invented, and prices marked &ldquo;Listed price · to confirm&rdquo; come from Maa Regi&rsquo;s
                  existing public ordering page. No orders, enquiries or messages are sent, and no payments are processed.
                </p>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
