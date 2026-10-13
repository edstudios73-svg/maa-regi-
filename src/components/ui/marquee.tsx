const words = ["Bread", "Cakes", "Pastries", "Meat Pies", "Jollof", "Grilled Chicken", "Snacks", "Fresh Juices", "Catering"];

/** Decorative scrolling band of what Maa Regi offers. Hidden from assistive tech. */
export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-caramel/30 bg-cocoa py-3.5 text-cream-soft" aria-hidden>
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <li key={`${dup}-${i}`} className="flex items-center">
                <span className="px-6 font-serif text-lg italic sm:text-xl">{w}</span>
                <svg viewBox="0 0 12 12" className="h-2 w-2 fill-caramel-light">
                  <path d="M6 0l6 6-6 6-6-6z" />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
