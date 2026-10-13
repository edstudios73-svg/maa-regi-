import type { Category } from "./types";

/**
 * Catalogue categories. Menu categories follow the structure of Maa Regi's
 * existing ordering page and must be confirmed with the owner before launch.
 */
export const bakeryCategories: Category[] = [
  { id: "bread", catalog: "bakery", label: "Bread", description: "Loaves for the table and the week." },
  { id: "cakes", catalog: "bakery", label: "Cakes", description: "Slices and whole cakes for any occasion." },
  { id: "pastries", catalog: "bakery", label: "Pastries", description: "Flaky, buttery bakery treats." },
  { id: "meat-pies", catalog: "bakery", label: "Meat Pies", description: "Savoury pies with golden pastry." },
  { id: "baked-snacks", catalog: "bakery", label: "Other Baked Snacks", description: "Small bites from the bakery." },
];

export const menuCategories: Category[] = [
  { id: "local", catalog: "menu", label: "Local Meals & Combos", description: "Familiar local favourites." },
  { id: "rice", catalog: "menu", label: "Rice Dishes", description: "Jollof, fried rice and more." },
  { id: "grilled", catalog: "menu", label: "Grilled Food", description: "Off the grill." },
  { id: "soups", catalog: "menu", label: "Soups & Stews", description: "Warming bowls." },
  { id: "proteins", catalog: "menu", label: "Proteins & Sides", description: "Add-ons and extras." },
  { id: "salads", catalog: "menu", label: "Salads", description: "Fresh and light." },
  { id: "noodles", catalog: "menu", label: "Noodles & Pasta", description: "Stir-fried and saucy." },
  { id: "breakfast", catalog: "menu", label: "Sandwiches & Breakfast", description: "A good start to the day." },
  { id: "snacks", catalog: "menu", label: "Snacks", description: "Finger foods to pick and share." },
  { id: "beverages", catalog: "menu", label: "Beverages", description: "Juices and drinks." },
];

/** Homepage "Explore Our Categories" cards. */
export const featuredCategories = [
  {
    title: "Bread & Bakery",
    description: "Everyday loaves and bakery staples.",
    href: "/bakery?category=bread",
    image: "/images/bread-artisan.webp",
    imageAlt: "Assorted loaves of freshly baked bread on bakery shelves",
  },
  {
    title: "Cakes & Pastries",
    description: "Sweet slices and flaky pastries.",
    href: "/bakery?category=cakes",
    image: "/images/chocolate-cake.webp",
    imageAlt: "A slice of layered chocolate cake on a white plate",
  },
  {
    title: "Snacks",
    description: "Samosas, spring rolls and finger foods.",
    href: "/menu?category=snacks",
    image: "/images/samosa.webp",
    imageAlt: "Crispy golden samosas served on a wooden plate",
  },
  {
    title: "Local Meals",
    description: "Comforting local combos.",
    href: "/menu?category=local",
    image: "/images/jollof-plantain.webp",
    imageAlt: "Jollof rice with fried plantain and meat on a white plate",
  },
  {
    title: "Rice Dishes",
    description: "Jollof, fried rice and more.",
    href: "/menu?category=rice",
    image: "/images/jollof-plate.webp",
    imageAlt: "A plated serving of jollof rice with a fork",
  },
  {
    title: "Grilled Food",
    description: "Chicken and skewers from the grill.",
    href: "/menu?category=grilled",
    image: "/images/grilled-chicken.webp",
    imageAlt: "Grilled chicken with vegetables on a black plate",
  },
  {
    title: "Beverages",
    description: "Juices and cool drinks.",
    href: "/menu?category=beverages",
    image: "/images/juices.webp",
    imageAlt: "Glasses of colourful fruit juice beside fresh fruit",
  },
  {
    title: "Catering",
    description: "Food for gatherings and events.",
    href: "/catering",
    image: "/images/sandwich-platter.webp",
    imageAlt: "A tiered platter of sandwiches and fries set for an event",
  },
];
