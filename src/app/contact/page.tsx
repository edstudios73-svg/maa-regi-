import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { business, canShow, fullAddress, IS_DEMO } from "@/config/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { MapEmbed } from "@/components/ui/map-embed";
import { socialIcon } from "@/components/ui/social-icons";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find Maa Regi in Tse Addo, Accra. Location, contact details, social media and a general enquiries form.",
  alternates: { canonical: "/contact" },
};

function Unconfirmed({ show }: { show: boolean }) {
  if (!show) return null;
  return <span className="mt-0.5 block text-xs text-stone-warm">To be confirmed by Maa Regi</span>;
}

export default function ContactPage() {
  const { phone, email, address, whatsapp, openingHours } = business;
  return (
    <>
      <section className="pb-10 pt-10 sm:pt-16">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Get in touch with Maa Regi."
            description="Questions, orders or feedback — here is how to reach us and where to find us in Tse Addo."
          />
        </Container>
      </section>

      <section className="pb-16 sm:pb-24" aria-label="Contact details">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div className="space-y-6">
            <ul className="divide-y divide-cocoa/10 rounded-2xl bg-cream-soft px-5 shadow-card ring-1 ring-cocoa/5 sm:px-6">
              {canShow(address) && (
                <li className="flex gap-4 py-5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-eyebrow text-stone-warm">Location</p>
                    <p className="mt-1 text-espresso">{fullAddress}</p>
                    <Unconfirmed show={!address.confirmed} />
                    <a href={business.mapUrl.value} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-cocoa hover:underline">
                      <Navigation className="h-4 w-4" aria-hidden /> Open in Google Maps
                    </a>
                  </div>
                </li>
              )}
              {canShow(phone) && (
                <li className="flex gap-4 py-5">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-eyebrow text-stone-warm">Phone</p>
                    <a href={`tel:${phone.value.tel}`} className="mt-1 block text-espresso hover:underline">
                      {phone.value.display}
                    </a>
                    <Unconfirmed show={!phone.confirmed} />
                  </div>
                </li>
              )}
              {canShow(whatsapp) && (
                <li className="flex gap-4 py-5">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-eyebrow text-stone-warm">WhatsApp</p>
                    <a href={`https://wa.me/${whatsapp.value}`} target="_blank" rel="noopener noreferrer" className="mt-1 block text-espresso hover:underline">
                      Message on WhatsApp
                    </a>
                    <Unconfirmed show={!whatsapp.confirmed} />
                  </div>
                </li>
              )}
              {canShow(email) && (
                <li className="flex gap-4 py-5">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-eyebrow text-stone-warm">Email</p>
                    <a href={`mailto:${email.value}`} className="mt-1 block break-all text-espresso hover:underline">
                      {email.value}
                    </a>
                    <Unconfirmed show={!email.confirmed} />
                  </div>
                </li>
              )}
              <li className="flex gap-4 py-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-eyebrow text-stone-warm">Opening hours</p>
                  <p className="mt-1 text-espresso">
                    {openingHours.confirmed && openingHours.value ? openingHours.value : "Opening hours to be confirmed"}
                  </p>
                </div>
              </li>
            </ul>

            <div className="rounded-2xl bg-cream-soft p-5 shadow-card ring-1 ring-cocoa/5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-stone-warm">Follow Maa Regi</p>
              <ul className="mt-3 flex flex-wrap gap-3">
                {business.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-cocoa/20 px-4 py-2 text-sm text-espresso hover:border-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-cocoa"
                    >
                      {socialIcon(s.label, "h-4 w-4")} {s.label}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/menu" className="group flex items-center justify-between rounded-2xl bg-cocoa p-5 text-cream-soft hover:bg-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa">
                <span>
                  <span className="block text-xs uppercase tracking-eyebrow text-caramel-light">Ordering</span>
                  <span className="font-serif text-xl">Start an order</span>
                </span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link href="/catering#quote" className="group flex items-center justify-between rounded-2xl border border-cocoa/20 bg-cream-soft p-5 text-espresso hover:border-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa">
                <span>
                  <span className="block text-xs uppercase tracking-eyebrow text-terracotta">Catering</span>
                  <span className="font-serif text-xl">Request a quote</span>
                </span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
            {IS_DEMO && (
              <p className="text-xs text-stone-warm">
                Existing ordering page:{" "}
                <a href={business.existingOrdering.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  {business.existingOrdering.label}
                </a>
              </p>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="mb-4 font-serif text-3xl text-espresso">General enquiries</h2>
              <ContactForm />
            </div>
            <MapEmbed />
            <LinkButton href={business.mapUrl.value} external variant="secondary" className="w-full sm:w-auto">
              <Navigation className="h-4 w-4" aria-hidden /> Get directions
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
