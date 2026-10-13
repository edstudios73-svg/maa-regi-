export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Bakery", href: "/bakery" },
  { label: "Restaurant Menu", href: "/menu" },
  { label: "Catering", href: "/catering" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const orderCta: NavItem = { label: "Order Now", href: "/menu" };

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
  {
    title: "Food",
    items: [
      { label: "Bakery", href: "/bakery" },
      { label: "Cakes & Pastries", href: "/bakery?category=cakes" },
      { label: "Restaurant Menu", href: "/menu" },
      { label: "Beverages", href: "/menu?category=beverages" },
    ],
  },
  {
    title: "Catering",
    items: [
      { label: "Catering Overview", href: "/catering" },
      { label: "Request a Quote", href: "/catering#quote" },
    ],
  },
];
