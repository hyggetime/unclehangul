import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-[0.5px] border-[#D9D9D3] bg-background">
      <nav
        aria-label="Primary"
        className="flex h-12 items-center justify-between gap-4 px-5 md:h-14 md:px-8"
      >
        <Link
          href="/"
          className="font-en touch-target inline-flex items-center text-base font-black tracking-tight sm:text-lg"
        >
          unclehangul/
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/contact"
            className="font-en touch-target inline-flex items-center justify-center px-2 text-[11px] font-bold uppercase tracking-[0.14em]"
          >
            CONTACT
          </Link>
          <Link
            href="#menu"
            className="font-en touch-target inline-flex items-center justify-center px-2 text-[11px] font-bold uppercase tracking-[0.14em]"
          >
            MENU
          </Link>
        </div>
      </nav>
    </header>
  );
}
