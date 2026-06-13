import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-neutral-200">
      <div className="grid grid-cols-12 gap-8 md:gap-gutter px-5 md:px-margin-desktop py-16 md:py-20 max-w-container-max mx-auto">
        <div className="col-span-12 md:col-span-6">
          <Link
            className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary block mb-6"
            href="/"
            aria-label="LUMINA - Return to homepage"
          >
            LUMINA
          </Link>
          <p className="font-sans text-xs tracking-[0.1em] uppercase text-secondary">
            &copy; {new Date().getFullYear()} LUMINA PHOTOGRAPHY STUDIOS. ALL
            RIGHTS RESERVED.
          </p>
        </div>

        <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
          <span className="font-sans text-xs tracking-[0.12em] uppercase font-bold text-primary mb-2">
            Discover
          </span>
          <Link
            className="font-sans text-xs tracking-[0.1em] uppercase text-secondary hover:text-primary hover:underline transition-colors"
            href="#"
          >
            INSTAGRAM
          </Link>
          <Link
            className="font-sans text-xs tracking-[0.1em] uppercase text-secondary hover:text-primary hover:underline transition-colors"
            href="#"
          >
            VIMEO
          </Link>
        </div>

        <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
          <span className="font-sans text-xs tracking-[0.12em] uppercase font-bold text-primary mb-2">
            Connect
          </span>
          <Link
            className="font-sans text-xs tracking-[0.1em] uppercase text-secondary hover:text-primary hover:underline transition-colors"
            href="/booking"
          >
            BOOK NOW
          </Link>
          <Link
            className="font-sans text-xs tracking-[0.1em] uppercase text-secondary hover:text-primary hover:underline transition-colors"
            href="/pricing"
          >
            PRICING
          </Link>
          <Link
            className="font-sans text-xs tracking-[0.1em] uppercase text-secondary hover:text-primary hover:underline transition-colors"
            href="/#equipment"
          >
            EQUIPMENT
          </Link>
        </div>
      </div>
    </footer>
  );
}
