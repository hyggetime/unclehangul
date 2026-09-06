import type { TocItem } from "@/lib/blog/extract-toc";

type LearnTocMobileProps = {
  items: readonly TocItem[];
};

export function LearnTocMobile({ items }: LearnTocMobileProps) {
  return (
    <details className="group border-b-[0.5px] border-[#D9D9D3] px-5 md:hidden md:px-8">
      <summary className="font-en touch-target flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-sm text-foreground/70 marker:content-none [&::-webkit-details-marker]:hidden">
        <span>
          In this guide ({items.length} topics)
        </span>
        <span
          aria-hidden
          className="shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/40 transition-colors group-open:text-[#FF4B3E]"
        >
          Show +
        </span>
      </summary>
      <nav aria-label="Table of contents" className="pb-5">
        <ol className="font-en list-none space-y-2 border-l-[0.5px] border-[#D9D9D3] pl-4">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block text-sm leading-snug text-foreground/55 transition-colors hover:text-foreground"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
