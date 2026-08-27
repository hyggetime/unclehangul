import Link from "next/link";
import { getPairingForSlug } from "@/lib/channels/pairings";

type ArticleChannelLinksProps = {
  slug: string;
};

export function ArticleChannelLinks({ slug }: ArticleChannelLinksProps) {
  const pairing = getPairingForSlug(slug);
  if (!pairing) return null;

  const links: { href: string; label: string; external?: boolean }[] = [];

  if (pairing.youtube) {
    links.push({
      href: pairing.youtube.href,
      label: pairing.youtube.label,
      external: true,
    });
  }
  if (pairing.instagram) {
    links.push({
      href: pairing.instagram.href,
      label: pairing.instagram.label,
      external: true,
    });
  }
  if (pairing.playHref) {
    links.push({ href: pairing.playHref, label: "Try Hangul Play ↗" });
  }

  if (links.length === 0) return null;

  return (
    <aside
      aria-label="Related channels and play"
      className="mx-5 mb-8 max-w-3xl border-t-[0.5px] border-[#D9D9D3] pt-8 md:mx-8 md:mb-10 md:pt-10"
    >
      <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
        Continue with Uncle Hangul
      </p>
      <ul className="mt-4 flex list-none flex-col gap-2 sm:flex-row sm:flex-wrap">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
              >
                {link.label}
                <span aria-hidden className="ml-1">
                  ↗
                </span>
              </a>
            ) : (
              <Link
                href={link.href}
                className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
