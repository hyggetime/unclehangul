import Link from "next/link";
import { LEARN_RECOMMENDED_LINKS } from "@/lib/learn/recommended-links";

export function LearnRecommendedToolsChips() {
  return (
    <div className="border-b-[0.5px] border-[#D9D9D3] md:hidden">
      <p
        id="learn-tools-chips-heading"
        className="font-en px-5 pt-4 text-[10px] font-bold uppercase tracking-widest text-foreground/45"
      >
        Explore
      </p>
      <nav
        aria-labelledby="learn-tools-chips-heading"
        className="flex gap-2 overflow-x-auto px-5 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {LEARN_RECOMMENDED_LINKS.map((item) => {
          const className =
            "font-en touch-target inline-flex min-h-14 shrink-0 items-center border-[0.5px] border-[#D9D9D3] bg-background px-4 text-xs font-bold tracking-tight text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E] active:border-[#FF4B3E] active:text-[#FF4B3E]";

          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {item.label}
                <span aria-hidden className="ml-1.5">
                  ↗
                </span>
              </a>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={className}>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
