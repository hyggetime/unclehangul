import Link from "next/link";
import { PLAY_WIDGETS } from "@/lib/play/catalog";

/** One-line city teaser + horizontal Play chips (mobile-first). */
export function PlayWidgetStrip() {
  const extraWidgets = PLAY_WIDGETS.filter(
    (widget) => widget.slug !== "name-converter",
  );

  return (
    <div className="border-t-[0.5px] border-[#D9D9D3] px-5 py-6 md:px-8 md:py-8">
      <div className="mx-auto w-full min-w-0 max-w-xl md:max-w-2xl">
        <p className="font-en mb-4 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
          More Hangul Play
        </p>

        <Link
          href="/play/city-names"
          className="font-en touch-target flex min-h-12 items-center justify-between gap-3 border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/30 px-4 py-3 text-sm font-bold tracking-tight text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
        >
          <span>
            How do you read <span className="font-ko">Seoul</span> in Korean?
          </span>
          <span aria-hidden className="shrink-0 text-xs uppercase tracking-widest">
            ↗
          </span>
        </Link>

        <nav
          aria-label="Hangul Play widgets"
          className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {extraWidgets.map((widget) => {
            const href =
              widget.status === "live" && widget.href
                ? widget.href
                : `/play/${widget.slug}`;

            return (
              <Link
                key={widget.slug}
                href={href}
                className="font-en touch-target inline-flex min-h-12 shrink-0 items-center border-[0.5px] border-[#D9D9D3] bg-background px-4 text-xs font-bold tracking-tight text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
              >
                {widget.chipLabel}
                {widget.status === "coming-soon" ? (
                  <span className="ml-2 text-[9px] font-bold uppercase tracking-widest text-foreground/35">
                    Soon
                  </span>
                ) : null}
              </Link>
            );
          })}
          <Link
            href="/play"
            className="font-en touch-target inline-flex min-h-12 shrink-0 items-center border-[0.5px] border-[#D9D9D3] bg-background px-4 text-xs font-bold tracking-tight text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
          >
            All Play ↗
          </Link>
        </nav>
      </div>
    </div>
  );
}
