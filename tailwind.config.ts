import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        cream: { DEFAULT: "#F7F1E8", deep: "#EFE5D6", soft: "#FBF8F3" },
        espresso: { DEFAULT: "#2B1D14", soft: "#4A3628" },
        cocoa: { DEFAULT: "#5A3A28", dark: "#46291B" },
        caramel: { DEFAULT: "#C8893E", light: "#E6B877", dark: "#9C6526" },
        terracotta: { DEFAULT: "#B5573A", dark: "#94432A" },
        sand: "#E4D5C1",
        stone: { warm: "#7A6656" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "80rem" },
      boxShadow: {
        card: "0 1px 2px rgba(43,29,20,0.06), 0 8px 24px -12px rgba(43,29,20,0.18)",
        lift: "0 2px 4px rgba(43,29,20,0.08), 0 18px 40px -18px rgba(43,29,20,0.35)",
      },
      letterSpacing: { eyebrow: "0.18em" },
    },
  },
  plugins: [],
};

export default config;
