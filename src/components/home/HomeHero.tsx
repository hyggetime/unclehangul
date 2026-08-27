import Link from "next/link";
import { UNCLE_HANGUL_CHANNEL_URL } from "@/lib/youtube";

export function HomeHero() {
  return (
    <section className="relative px-5 pb-10 pt-14 md:p-8 md:pb-12 md:pt-12">
      <span
        aria-hidden
        className="font-ko pointer-events-none absolute -left-6 top-24 -z-10 select-none text-[7rem] font-black leading-none text-[#E5E5DE] md:-left-8 md:text-[10rem]"
      >
        ㅎ
      </span>

      <p className="font-en text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/45">
        Uncle Hangul · 한글아저씨
      </p>
      <h1 className="font-en mt-3 max-w-lg text-4xl font-black leading-[0.95] tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl">
        Learn Korean through Hangul design
      </h1>
      <p className="font-ko mt-4 max-w-prose text-base font-bold leading-snug text-foreground/75 md:text-lg">
        타이포그래피로 읽는 한국어 — 글, 짧은 놀이, 채널로 이어집니다.
      </p>
      <p className="font-en mt-4 max-w-prose text-sm leading-relaxed text-foreground/60">
        Read structured lessons, try Hangul widgets on the home page, and follow{" "}
        <a
          href={UNCLE_HANGUL_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
        >
          @unclehangul
        </a>{" "}
        for video.
      </p>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Link
          href="/learn"
          className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E]"
        >
          Start reading
        </Link>
        <Link
          href="/#hangul-play"
          className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] bg-background px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
        >
          Try Hangul Play
        </Link>
      </div>
    </section>
  );
}
