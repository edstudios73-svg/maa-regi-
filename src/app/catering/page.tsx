import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, MessageCircle, Utensils } from "lucide-react";
import { business, canShow } from "@/config/site";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CateringForm } from "@/components/forms/catering-form";

export const metadata: Metadata = {
  title: "Catering — Food for Gatherings & Events",
  description: "Enquire about catering from Maa Regi in Tse Addo, Accra for birthdays, weddings, office events and other gatherings.",
  alternates: { canonical: "/catering" },
};

/** Editable service overview — confirm with the owner. No packages or prices are implied. */
const steps = [
  { icon: MessageCircle, title: "Tell us about your event", text: "Share the date, location, guest estimate and the food you have in mind." },
  { icon: Utensils, title: "Discuss the menu", text: "Maa Regi gets in touch to talk through options from the kitchen and bakery." },
  { icon: CalendarDays, title: "Confirm the details", text: "Agree the menu, quantities and arrangements directly with Maa Regi." },
];

export default function CateringPage() {
  return (
    <>
      <PageHero
        eyebrow="Catering"
        title="Planning Something Special?"
        description="Get in touch to discuss food for your next gathering or event — from local favourites to bakery treats."
        image="/images/jollof-pot.webp"
        imageAlt="A large pot of jollof rice cooking outdoors for a gathering"
      >
        <LinkButton href="#quote" size="lg">
          Request a Quote
        </LinkButton>
        <LinkButton href="/menu" variant="secondary" size="lg">
          See the menu
        </LinkButton>
      </PageHero>

      <section className="py-16 sm:py-24" aria-labelledby="how-title">
        <Container>
          <SectionHeading id="how-title" eyebrow="How it works" title="Food for your occasion, planned together." />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="rounded-2xl border border-cocoa/10 bg-cream-soft p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-caramel/15 text-caramel-dark">
                    <s.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-serif text-sm text-stone-warm">Step {i + 1}</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl text-espresso">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso-soft">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-label="Catering photographs" className="pb-16 sm:pb-24">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[
              { src: "/images/sandwich-platter.webp", alt: "A tiered serving platter of sandwiches and fries", cls: "col-span-2 row-span-2 aspect-square md:aspect-auto" },
              { src: "/images/jollof-plantain.webp", alt: "Jollof rice with fried plantain", cls: "aspect-square" },
              { src: "/images/pastries.webp", alt: "Assorted pastries and croissants on display", cls: "aspect-square" },
              { src: "/images/chicken-wings.webp", alt: "A platter of chicken wings with dipping sauce", cls: "aspect-square" },
              { src: "/images/juices.webp", alt: "Glasses of fresh fruit juice", cls: "aspect-square" },
            ].map((img) => (
              <div key={img.src} className={`relative overflow-hidden rounded-2xl ${img.cls}`}>
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="quote" className="bg-cream-deep py-16 sm:py-24" aria-labelledby="quote-title">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <SectionHeading
              id="quote-title"
              eyebrow="Enquiry"
              title="Request a Catering Quote"
              description="Share a few details and Maa Regi can follow up to discuss options and pricing for your event."
            />
            {canShow(business.phone) && (
              <p className="mt-6 text-sm text-espresso-soft">
                Prefer to call? <a href={`tel:${business.phone.value.tel}`} className="font-medium text-cocoa underline underline-offset-2">{business.phone.value.display}</a>
                {!business.phone.confirmed && <span className="block text-xs text-stone-warm">Number to be confirmed by Maa Regi.</span>}
              </p>
            )}
          </div>
          <CateringForm />
        </Container>
      </section>
    </>
  );
}
