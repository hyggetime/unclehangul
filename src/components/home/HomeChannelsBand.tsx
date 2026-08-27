import Link from "next/link";
import { CHANNEL_LINKS } from "@/lib/channels";

export function HomeChannelsBand() {
  return (
    <section
      aria-labelledby="home-channels-heading"
      className="border-t-[0.5px] border-[#D9D9D3] px-5 py-6 md:px-8 md:py-8"
    >
      <div className="mx-auto w-full min-w-0 max-w-xl md:max-w-2xl">
        <h2
          id="home-channels-heading"
          className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40"
        >
          Watch &amp; follow
        </h2>
        <p className="font-ko mt-2 text-sm leading-relaxed text-foreground/55">
          클립은 인스타그램, 강의는 유튜브 — 사이트에서는 글과 위젯으로
          이어집니다.
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {CHANNEL_LINKS.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-en touch-target flex min-h-12 flex-1 items-center justify-between gap-2 border-[0.5px] border-[#D9D9D3] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E] sm:min-w-[140px] sm:flex-none"
            >
              {channel.label}
              <span className="font-normal normal-case tracking-normal text-foreground/45">
                {channel.handle}
              </span>
            </a>
          ))}
          <Link
            href="/watch"
            className="font-en touch-target flex min-h-12 flex-1 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E] sm:min-w-[140px] sm:flex-none"
          >
            All channels ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
