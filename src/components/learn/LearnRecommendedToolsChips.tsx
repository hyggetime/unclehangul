import Link from "next/link";
import { RECOMMENDED_TOOLS } from "@/lib/learn/recommended-tools";

export function LearnRecommendedToolsChips() {
  return (
    <div className="border-b-[0.5px] border-[#D9D9D3] md:hidden">
      <p
        id="learn-tools-chips-heading"
        className="font-en px-5 pt-4 text-[10px] font-bold uppercase tracking-widest text-foreground/45"
      >
        Recommended Tools
      </p>
      <nav
        aria-labelledby="learn-tools-chips-heading"
        className="flex gap-2 overflow-x-auto px-5 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {RECOMMENDED_TOOLS.map((tool) => {
          const className =
            "font-en touch-target inline-flex min-h-14 shrink-0 items-center border-[0.5px] border-[#D9D9D3] bg-background px-4 text-xs font-bold tracking-tight text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E] active:border-[#FF4B3E] active:text-[#FF4B3E]";

          if (tool.external) {
            return (
              <a
                key={tool.href}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {tool.label}
                <span aria-hidden className="ml-1.5">
                  ↗
                </span>
              </a>
            );
          }

          return (
            <Link key={tool.href} href={tool.href} className={className}>
              {tool.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
