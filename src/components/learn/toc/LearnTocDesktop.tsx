"use client";

import type { TocItem } from "@/lib/blog/extract-toc";
import { useScrollspy } from "@/components/learn/toc/useScrollspy";

type LearnTocDesktopProps = {
  items: readonly TocItem[];
};

export function LearnTocDesktop({ items }: LearnTocDesktopProps) {
  const activeId = useScrollspy(items.map((item) => item.id));

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-2"
    >
      <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
        In this guide
      </p>
      <ol className="font-en mt-3 list-none space-y-2 border-l-[0.5px] border-[#D9D9D3] pl-4">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm leading-snug transition-colors ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-foreground/50 hover:text-foreground/80"
                }`}
                aria-current={isActive ? "location" : undefined}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
