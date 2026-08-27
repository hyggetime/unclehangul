import Link from "next/link";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";
import { PRIMARY_NAV_ITEMS } from "@/lib/site-nav";

const DESKTOP_NAV = [
  ...PRIMARY_NAV_ITEMS,
  { href: "/about", title: "About" },
] as const;

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
          <div className="hidden items-center gap-1 md:flex">
            {DESKTOP_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-en touch-target inline-flex items-center justify-center px-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:text-[#FF4B3E]"
              >
                {item.title === "Hangul Play" ? "Play" : item.title}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="font-en touch-target inline-flex items-center justify-center px-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:text-[#FF4B3E]"
          >
            Contact
          </Link>

          <MobileNavDrawer />
        </div>
      </nav>
    </header>
  );
}
