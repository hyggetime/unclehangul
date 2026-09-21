import Link from "next/link";
import type { SeriesContext } from "@/lib/blog/series";

export function SeriesBadge({ series, entry, total }: SeriesContext) {
  return (
    <Link
      href="/learn"
      className="font-en group inline-flex items-center gap-2 border-[0.5px] border-[#D9D9D3] bg-[#F2F2F0] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/55 transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
    >
      <span aria-hidden className="text-[#FF4B3E]">
        ▮
      </span>
      {series.name}
      <span className="text-foreground/35 group-hover:text-[#FF4B3E]">
        Vol. {entry.volume} / {total}
      </span>
    </Link>
  );
}
