import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-bottom-offset border-t-[0.5px] border-[#D9D9D3] bg-background px-5 py-8 md:px-8 md:py-10">
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p className="font-en text-[11px] leading-relaxed text-foreground/45">
          © 2026 Uncle Hangul. All rights reserved.
        </p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-en text-[11px] font-medium text-foreground/55 transition-colors hover:text-[#FF4B3E]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
