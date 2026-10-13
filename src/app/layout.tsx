import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { business, IS_DEMO, SITE_URL } from "@/config/site";
import { CartProvider } from "@/context/cart-context";
import { DemoBanner } from "@/components/layout/demo-banner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { CartToast } from "@/components/layout/cart-toast";
import { MobileOrderBar } from "@/components/layout/mobile-order-bar";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", axes: ["opsz"], style: ["normal", "italic"] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} — Bakery, Restaurant & Catering in Tse Addo, Accra`,
    template: `%s | ${business.name}`,
  },
  description:
    "Discover Maa Regi in Tse Addo, Accra: bakery favourites, satisfying local meals, snacks, beverages and catering enquiries.",
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_GH",
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { capable: true, title: business.name, statusBarStyle: "default" },
  applicationName: business.name,
  // The concept must not be indexed or mistaken for Maa Regi's official website.
  robots: IS_DEMO ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#5A3A28",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH" className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col pb-20 sm:pb-0">
        <noscript>
          {/* Without JavaScript, show content that would otherwise fade in on scroll. */}
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-espresso px-4 py-2 text-cream-soft focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <CartProvider>
          <DemoBanner />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <CartToast />
          <MobileOrderBar />
        </CartProvider>
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
