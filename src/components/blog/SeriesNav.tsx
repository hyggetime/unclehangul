import Link from "next/link";
import type { SeriesContext } from "@/lib/blog/series";

type SeriesNavProps = SeriesContext & {
  /** Slugs that are actually live; scheduled volumes render as upcoming. */
  availableSlugs: ReadonlySet<string>;
};

export function SeriesNav({
  series,
  entry,
  total,
  availableSlugs,
}: SeriesNavProps) {
  return (
    <section
      aria-labelledby="series-nav-heading"
      className="mx-5 mb-10 max-w-3xl border-t-[0.5px] border-[#D9D9D3] pt-8 md:mx-8 md:mb-12"
    >
      <p className="font-en text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/40">
        Part of a series
      </p>
      <h2
        id="series-nav-heading"
        className="font-en mt-3 text-lg font-black tracking-tight text-foreground"
      >
        {series.name}
        <span className="font-ko ml-2 text-sm font-bold text-foreground/45">
          {series.nameKo}
        </span>
      </h2>
      <p className="font-en mt-3 text-sm leading-relaxed text-foreground/65">
        {series.taglineEn}
      </p>
      <p className="font-ko mt-2 text-sm leading-relaxed text-foreground/55">
        {series.taglineKo}
      </p>

      <ol className="mt-6 list-none divide-y-[0.5px] divide-[#D9D9D3] border-[0.5px] border-[#D9D9D3]">
        {series.entries.map((item) => {
          const isCurrent = item.slug === entry.slug;
          const isLive = availableSlugs.has(item.slug);

          const inner = (
            <>
              <span
                className={`font-en shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] ${
                  isCurrent ? "text-[#FF4B3E]" : "text-foreground/35"
                }`}
              >
                Vol. {item.volume}
              </span>
              <span className="min-w-0">
                <span
                  className={`font-en block text-sm font-black leading-snug tracking-tight ${
                    isCurrent ? "text-foreground" : "text-foreground/80"
                  }`}
                >
                  {item.shortTitle}
                </span>
                <span className="font-ko mt-1 block text-xs leading-relaxed text-foreground/50">
                  {item.blurbKo}
                </span>
              </span>
            </>
          );

          if (isCurrent) {
            return (
              <li
                key={item.slug}
                aria-current="true"
                className="flex items-start gap-4 bg-[#F2F2F0] px-4 py-4"
              >
                {inner}
                <span className="font-en ml-auto shrink-0 self-center text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35">
                  Reading
                </span>
              </li>
            );
          }

          if (!isLive) {
            return (
              <li
                key={item.slug}
                className="flex items-start gap-4 px-4 py-4 opacity-55"
              >
                {inner}
                <span className="font-en ml-auto shrink-0 self-center text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35">
                  Soon
                </span>
              </li>
            );
          }

          return (
            <li key={item.slug}>
              <Link
                href={`/learn/${item.slug}`}
                className="group flex items-start gap-4 px-4 py-4 transition-colors hover:bg-[#F2F2F0]"
              >
                {inner}
                <span
                  aria-hidden
                  className="font-en ml-auto shrink-0 self-center text-xs text-foreground/30 transition-colors group-hover:text-[#FF4B3E]"
                >
                  ↗
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <p className="font-ko mt-4 text-xs leading-relaxed text-foreground/45">
        각 편은 독립적으로 읽을 수 있습니다. 순서대로 읽으면 번역 → 관계 → 감정 →
        조어로 이어집니다. (총 {total}편)
      </p>
    </section>
  );
}
