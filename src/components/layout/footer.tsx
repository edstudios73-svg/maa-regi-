import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { footerNav } from "@/config/navigation";
import { business, canShow, fullAddress, IS_DEMO, studio } from "@/config/site";
import { socialIcon } from "@/components/ui/social-icons";
import { Wordmark } from "./wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-espresso text-cream/80">
      <div className="mx-auto max-w-site px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Wordmark tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-cream/70">{business.shortDescription}</p>
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {business.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Maa Regi on ${s.label} (opens in a new tab)`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream-soft transition-colors hover:border-caramel hover:text-caramel-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel"
                  >
                    {socialIcon(s.label, "h-4 w-4")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-xs font-semibold uppercase tracking-eyebrow text-caramel-light">{group.title}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-xs font-semibold uppercase tracking-eyebrow text-caramel-light">Visit & Contact</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {canShow(business.address) && (
                  <li className="flex gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel-light" aria-hidden />
                    <a href={business.mapUrl.value} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      {fullAddress}
                    </a>
                  </li>
                )}
                {canShow(business.phone) && (
                  <li className="flex gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-caramel-light" aria-hidden />
                    <a href={`tel:${business.phone.value.tel}`} className="hover:text-white">
                      {business.phone.value.display}
                    </a>
                  </li>
                )}
                {canShow(business.email) && (
                  <li className="flex gap-2">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-caramel-light" aria-hidden />
                    <a href={`mailto:${business.email.value}`} className="break-all hover:text-white">
                      {business.email.value}
                    </a>
                  </li>
                )}
                {IS_DEMO && <li className="text-xs text-cream/50">Contact details to be confirmed by Maa Regi.</li>}
              </ul>
            </div>
          </div>
        </div>

        <p aria-hidden className="pointer-events-none mt-16 select-none text-center font-serif text-[22vw] font-semibold italic leading-[0.8] tracking-tight text-cream/[0.04] lg:text-[17rem]">
          Maa Regi
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Maa Regi. All rights reserved.</p>
          {IS_DEMO && <p>{studio.note}</p>}
        </div>
      </div>
    </footer>
  );
}
