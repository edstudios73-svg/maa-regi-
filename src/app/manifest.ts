import type { MetadataRoute } from "next";
import { business } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${business.name} — Bakery, Kitchen & Catering`,
    short_name: business.name,
    description: business.shortDescription,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F7F1E8",
    theme_color: "#5A3A28",
    lang: "en-GH",
    categories: ["food", "shopping"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Restaurant Menu", url: "/menu" },
      { name: "Bakery", url: "/bakery" },
      { name: "Catering Quote", url: "/catering#quote" },
    ],
  };
}
