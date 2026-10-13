import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./container";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  image: string;
  imageAlt: string;
  children?: ReactNode;
};

/** Editorial split hero used on inner pages. */
export function PageHero({ eyebrow, title, description, image, imageAlt, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <Container className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-eyebrow text-terracotta">{eyebrow}</p>
          <h1 className="font-serif text-4xl font-medium leading-[1.05] text-espresso text-balance sm:text-5xl lg:text-6xl">{title}</h1>
          <div className="mt-5 max-w-xl text-base leading-relaxed text-espresso-soft sm:text-lg">{description}</div>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-lift lg:aspect-[5/4]">
          <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
      </Container>
    </section>
  );
}
