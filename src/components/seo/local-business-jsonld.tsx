import { business, IS_DEMO, SITE_URL } from "@/config/site";

/**
 * LocalBusiness structured data, built only from details marked as confirmed.
 * Nothing is emitted in demo mode, and no ratings or reviews are ever included.
 */
export function LocalBusinessJsonLd() {
  if (IS_DEMO) return null;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Bakery", "Restaurant"],
    name: business.name,
    url: SITE_URL,
    sameAs: business.social.map((s) => s.href),
  };
  if (business.address.confirmed) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: `${business.address.value.house}, ${business.address.value.line}`,
      addressLocality: business.address.value.city,
      addressCountry: "GH",
    };
  }
  if (business.phone.confirmed) data.telephone = business.phone.value.tel;
  if (business.email.confirmed) data.email = business.email.value;
  if (business.mapUrl.confirmed) data.hasMap = business.mapUrl.value;
  if (business.openingHours.confirmed && business.openingHours.value) data.openingHours = business.openingHours.value;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
