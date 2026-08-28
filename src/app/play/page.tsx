import type { Metadata } from "next";
import Link from "next/link";
import { PlayWidgetCard } from "@/components/play/PlayWidgetCard";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getPlayHubWidgets } from "@/lib/play/catalog";

export const metadata: Metadata = buildPageMetadata({
  title: "Hangul Play",
  description:
    "Short interactive Hangul widgets — name converter, city names, jamo builder, and more.",
  path: "/play",
  locale: "en_US",
});

export default function PlayIndexPage() {
  const widgets = getPlayHubWidgets();

  return (
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="flex h-10 items-center justify-between gap-4 border-b-[0.5px] border-[#D9D9D3] px-1">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            Hangul Play
          </p>
          <Link
            href="/"
            className="font-en shrink-0 text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
          >
            Home ↗
          </Link>
        </div>

        <header className="border-b-[0.5px] border-[#D9D9D3] px-5 py-8 md:px-8 md:py-10">
          <h1 className="font-en text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl">
            Hangul Play
          </h1>
          <p className="font-ko mt-3 max-w-xl text-sm leading-relaxed text-foreground/65 md:text-base">
            짧게 만져 보는 한글 위젯 · 이름, 도시, 자모 조합 게임
          </p>
          <p className="font-en mt-2 max-w-xl text-sm leading-relaxed text-foreground/55">
            Tap a widget. Live tools open now; others show what&apos;s coming.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 px-5 py-8 sm:grid-cols-2 md:px-8">
          {widgets.map((widget) => (
            <PlayWidgetCard key={widget.slug} widget={widget} />
          ))}
        </div>
      </div>
    </div>
  );
}
