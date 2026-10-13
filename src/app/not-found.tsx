import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-terracotta">Page not found</p>
        <h1 className="mt-3 font-serif text-5xl text-espresso">This plate is empty.</h1>
        <p className="mt-4 text-espresso-soft">The page you were looking for doesn&rsquo;t exist. Try the menu or head back home.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row">
          <LinkButton href="/" size="lg">Home</LinkButton>
          <LinkButton href="/menu" variant="secondary" size="lg">Restaurant Menu</LinkButton>
        </div>
      </Container>
    </section>
  );
}
