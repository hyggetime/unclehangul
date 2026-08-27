import Link from "next/link";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { LEARN_RECOMMENDED_LINKS } from "@/lib/learn/recommended-links";

type LearnSidebarProps = {
  /** Show the tall desktop AdSense slot (hidden on mobile). */
  showDesktopAd?: boolean;
};

export function LearnSidebar({ showDesktopAd = true }: LearnSidebarProps) {
  return (
    <aside
      aria-label="Recommended links"
      className="hidden min-w-0 border-t-[0.5px] border-[#D9D9D3] p-4 md:block md:col-span-3 md:border-l-[0.5px] md:border-t-0"
    >
      <section aria-labelledby="learn-links-heading">
        <h2
          id="learn-links-heading"
          className="font-en mb-4 text-[10px] font-bold uppercase tracking-widest text-foreground/45"
        >
          Explore
        </h2>

        <nav
          aria-label="Explore Uncle Hangul"
          className="grid grid-cols-1 border-[0.5px] border-[#D9D9D3]"
        >
          {LEARN_RECOMMENDED_LINKS.map((item) => {
            const className =
              "group flex flex-col gap-1 border-t-[0.5px] border-[#D9D9D3] p-4 transition-colors first:border-t-0 hover:bg-[#EBEBE5]/40 active:bg-[#EBEBE5]/40";

            const inner = (
              <>
                <span className="font-en flex items-center justify-between text-sm font-bold tracking-tight text-foreground group-hover:text-[#FF4B3E]">
                  {item.label}
                  <span aria-hidden>{item.external ? "↗" : "↘"}</span>
                </span>
                <span className="font-ko text-xs leading-relaxed text-foreground/55">
                  {item.description}
                </span>
              </>
            );

            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </nav>
      </section>

      {showDesktopAd ? (
        <section
          aria-label="Advertisement"
          className="mt-6 hidden md:block"
        >
          <AdSenseUnit
            slot={
              process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "sidebar-desktop"
            }
            format="vertical"
            minHeight={600}
            className="h-[600px]"
            placeholderLabel="AdSense · 300×600"
          />
        </section>
      ) : null}
    </aside>
  );
}
