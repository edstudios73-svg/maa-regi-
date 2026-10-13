import type { Metadata } from "next";
import { Suspense } from "react";
import { menuCategories } from "@/data/categories";
import { menuProducts } from "@/data/products";
import { business } from "@/config/site";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { LinkButton } from "@/components/ui/button";
import { CatalogView } from "@/components/catalog/catalog";
import { CatalogNotice } from "@/components/catalog/catalog-notice";

export const metadata: Metadata = {
  title: "Restaurant Menu — Local Meals, Rice, Grills & More",
  description:
    "Explore Maa Regi's restaurant menu in Tse Addo, Accra: local meals and combos, rice dishes, grilled food, soups, noodles, breakfast, snacks and beverages.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Restaurant Menu"
        title={<>Something Delicious <em className="accent">Is Waiting.</em></>}
        description={
          <>
            Explore the menu and find something to enjoy. Availability changes through the day, so items are always confirmed
            when you order.
          </>
        }
        image="/images/jollof-chicken.webp"
        imageAlt="Jollof rice and chicken served on a café table with drinks"
      >
        <LinkButton href="#catalogue" size="lg">
          Browse the menu
        </LinkButton>
        <LinkButton href={business.existingOrdering.href} external variant="secondary" size="lg">
          Current ordering page
        </LinkButton>
      </PageHero>

      <section id="catalogue" aria-label="Restaurant menu" className="pb-24">
        <Container>
          <CatalogNotice />
          <Suspense fallback={<p className="py-10 text-stone-warm">Loading the menu…</p>}>
            <CatalogView products={menuProducts} categories={menuCategories} searchLabel="Search the menu" />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
