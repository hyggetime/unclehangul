import type { Metadata } from "next";
import Link from "next/link";
import { CHANNEL_LINKS } from "@/lib/channels";
import { CONTENT_PAIRINGS } from "@/lib/channels/pairings";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Watch & Follow",
  description:
    "Follow Uncle Hangul on Instagram and YouTube — clips, lessons, and links back to Learn and Hangul Play.",
  path: "/watch",
});

export default function WatchPage() {
  return (
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="flex h-10 items-center justify-between gap-4 border-b-[0.5px] border-[#D9D9D3] px-1">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            Watch
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
            Watch &amp; follow
          </h1>
          <p className="font-ko mt-3 max-w-xl text-sm leading-relaxed text-foreground/65 md:text-base">
            인스타그램과 유튜브에서 한글아저씨를 만나고, 사이트에서 글과
            위젯으로 이어가세요.
          </p>
          <p className="font-en mt-2 max-w-xl text-sm leading-relaxed text-foreground/55">
            Clips and daily tips on Instagram; long-form lessons and Shorts on
            YouTube. This site holds the articles and Hangul Play widgets.
          </p>
        </header>

        <ul className="list-none divide-y-[0.5px] divide-[#D9D9D3] border-b-[0.5px] border-[#D9D9D3]">
          {CHANNEL_LINKS.map((channel) => (
            <li key={channel.id}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group touch-target flex flex-col gap-2 px-5 py-6 transition-colors hover:bg-[#EBEBE5]/30 md:px-8 md:py-8"
              >
                <span className="font-en flex items-center justify-between text-lg font-black tracking-tight text-foreground transition-colors group-hover:text-[#FF4B3E]">
                  {channel.label}
                  <span aria-hidden>↗</span>
                </span>
                <span className="font-en text-xs font-bold text-foreground/45">
                  {channel.handle}
                </span>
                <span className="font-en text-sm leading-relaxed text-foreground/60">
                  {channel.descriptionEn}
                </span>
                <span className="font-ko text-sm leading-relaxed text-foreground/50">
                  {channel.descriptionKo}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <section
          aria-labelledby="watch-pairings-heading"
          className="border-b-[0.5px] border-[#D9D9D3]"
        >
          <div className="px-5 py-8 md:px-8">
            <h2
              id="watch-pairings-heading"
              className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40"
            >
              Paired with Learn &amp; Play
            </h2>
            <p className="font-en mt-2 max-w-xl text-sm leading-relaxed text-foreground/55">
              Start on video or social, then continue on the site with the
              matching article or widget.
            </p>
          </div>

          <ul className="list-none divide-y-[0.5px] divide-[#D9D9D3]">
            {CONTENT_PAIRINGS.map((pairing) => (
              <li key={pairing.learnSlug}>
                <div className="px-5 py-6 md:px-8 md:py-8">
                  <p className="font-en text-sm font-black tracking-tight text-foreground">
                    {pairing.title}
                  </p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <Link
                      href={`/learn/${pairing.learnSlug}`}
                      className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
                    >
                      Read article ↗
                    </Link>
                    {pairing.youtube ? (
                      <a
                        href={pairing.youtube.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
                      >
                        {pairing.youtube.label} ↗
                      </a>
                    ) : null}
                    {pairing.instagram ? (
                      <a
                        href={pairing.instagram.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
                      >
                        {pairing.instagram.label} ↗
                      </a>
                    ) : null}
                    {pairing.playHref ? (
                      <Link
                        href={pairing.playHref}
                        className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
                      >
                        Hangul Play ↗
                      </Link>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="px-5 py-8 md:px-8">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
            On this site
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href="/learn"
              className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
            >
              Learn ↗
            </Link>
            <Link
              href="/play"
              className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
            >
              Hangul Play ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
