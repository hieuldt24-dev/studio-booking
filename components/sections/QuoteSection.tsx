interface QuoteSectionProps {
  quote: string;
  author: string;
  tagline?: string;
}

export function QuoteSection({
  quote,
  author,
  tagline = "The Vision",
}: QuoteSectionProps) {
  return (
    <section className="bg-black text-white py-20 md:py-32 overflow-hidden">
      <div className="max-w-container-max mx-auto px-5 md:px-margin-desktop text-center">
        <span className="font-sans text-xs uppercase tracking-[0.35em] block mb-8 opacity-50 font-extrabold">
          {tagline}
        </span>
        <p className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[0.95] italic max-w-5xl mx-auto tracking-[-0.04em]">
          &ldquo;{quote}&rdquo;
        </p>
        <span className="font-sans text-xs tracking-[0.25em] uppercase font-extrabold mt-8 block opacity-75">
          — {author}
        </span>
      </div>
    </section>
  );
}
