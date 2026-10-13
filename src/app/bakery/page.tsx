import type { Metadata } from "next";
import { Suspense } from "react";
import { bakeryCategories } from "@/data/categories";
import { bakeryProducts } from "@/data/products";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { LinkButton } from "@/components/ui/button";
import { CatalogView } from "@/components/catalog/catalog";
import { CatalogNotice } from "@/components/catalog/catalog-notice";

export const metadata: Metadata = {
  title: "Bakery — Bread, Cakes, Pastries & Meat Pies",
  description: "Browse Maa Regi's bakery in Tse Addo, Accra: bread, cakes, pastries, meat pies and other baked snacks.",
  alternates: { canonical: "/bakery" },
};

export default function BakeryPage() {
  return (
    <>
      <PageHero
        eyebrow="The Bakery"
        title={<>Your Bakery Favourites, <em className="accent">All in One Place.</em></>}
        description="Bread, cakes, pastries, meat pies and other baked snacks. Search, filter and build your order."
        image="/images/bread-artisan.webp"
        imageAlt="Rows of freshly baked artisan loaves on bakery shelves"
      >
        <LinkButton href="#catalogue" size="lg">
          Browse the catalogue
        </LinkButton>
        <LinkButton href="/catering#quote" variant="secondary" size="lg">
          Bulk & event orders
        </LinkButton>
      </PageHero>

      <section id="catalogue" aria-label="Bakery catalogue" className="pb-24">
        <Container>
          <CatalogNotice />
          <Suspense fallback={<p className="py-10 text-stone-warm">Loading the catalogue…</p>}>
            <CatalogView products={bakeryProducts} categories={bakeryCategories} searchLabel="Search the bakery" />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
