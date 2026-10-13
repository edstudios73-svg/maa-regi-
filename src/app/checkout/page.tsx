import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CheckoutFlow } from "@/components/forms/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your Maa Regi order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="py-10 sm:py-16">
      <Container>
        <CheckoutFlow />
      </Container>
    </section>
  );
}
