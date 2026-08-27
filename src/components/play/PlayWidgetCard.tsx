import Link from "next/link";
import type { PlayWidget } from "@/lib/play/catalog";

type PlayWidgetCardProps = {
  widget: PlayWidget;
};

export function PlayWidgetCard({ widget }: PlayWidgetCardProps) {
  const href =
    widget.status === "live" && widget.href
      ? widget.href
      : `/play/${widget.slug}`;

  return (
    <Link
      href={href}
      className="group touch-target flex min-h-[88px] flex-col justify-between border-[0.5px] border-[#D9D9D3] bg-background p-4 transition-colors hover:border-[#FF4B3E] active:border-[#FF4B3E]"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-en text-sm font-black tracking-tight text-foreground transition-colors group-hover:text-[#FF4B3E]">
          {widget.title}
        </span>
        {widget.status === "coming-soon" ? (
          <span className="font-en shrink-0 text-[9px] font-bold uppercase tracking-widest text-[#FF4B3E]">
            Soon
          </span>
        ) : (
          <span
            aria-hidden
            className="font-en shrink-0 text-foreground/35 transition-colors group-hover:text-[#FF4B3E]"
          >
            ↗
          </span>
        )}
      </div>
      <span className="font-ko mt-2 text-xs leading-relaxed text-foreground/55">
        {widget.titleKo}
      </span>
    </Link>
  );
}
