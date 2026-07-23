import Link from "next/link";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { NameConverter } from "@/components/NameConverter";
import { PostCard } from "@/components/PostCard";
import {
  UNCLE_HANGUL_CHANNEL_URL,
  UNCLE_HANGUL_VIDEOS,
} from "@/lib/youtube";

const MENU_ITEMS = [
  {
    href: "/learn",
    title: "Learn",
    description: "자모부터 문장까지, 선명하게.",
  },
  {
    href: "/tools",
    title: "Tools",
    description: "발음·읽기·쓰기 실전 도구.",
  },
  {
    href: "/resources",
    title: "Resources",
    description: "자료와 가이드를 모아두다.",
  },
] as const;

const MAIN_COLUMN =
  "relative z-10 w-full min-w-0 overflow-visible md:col-span-8 md:col-start-1 md:row-start-1 md:border-r-[0.5px] md:border-[#D9D9D3]";

export default function Home() {
  return (
    <>
      <div className={MAIN_COLUMN}>
        <span
          aria-hidden
          className="font-ko pointer-events-none absolute -left-8 top-32 -z-10 select-none text-[10rem] font-black leading-none text-[#E5E5DE] md:text-[12rem]"
        >
          ㅎ
        </span>
        <span
          aria-hidden
          className="font-ko pointer-events-none absolute -right-6 top-[48%] -z-10 select-none text-[10rem] font-black leading-none text-[#E5E5DE] md:text-[12rem]"
        >
          ㄱ
        </span>

        <section className="relative px-5 pb-14 pt-16 md:p-8 md:pb-16 md:pt-12">
          <h1 className="font-en text-5xl font-black lowercase leading-[0.92] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl">
            unlock
          </h1>
          <p className="font-en mt-4 max-w-xl text-xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-2xl md:mt-6 md:text-3xl">
            the Unexpected Language.
          </p>
          <p className="font-ko mt-8 max-w-prose text-sm leading-relaxed text-foreground/65 md:mt-10 md:text-base">
            Uncle Hangul은 군더더기 없는 타이포그래피로 한국어를 익히는
            공간입니다.{" "}
            <a
              href={UNCLE_HANGUL_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-en text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
            >
              @unclehangul
            </a>
            에서 영상으로도 만나보세요.
          </p>
        </section>

        <section
          aria-label="Featured long-form lesson"
          className="relative border-t-[0.5px] border-[#D9D9D3]"
        >
          <PostCard
            category="LEARN"
            date="15 MIN"
            title="Reading big numbers in Korean"
            excerpt="910,213,090처럼 큰 숫자를 한국어로 어떻게 읽는지, 한글아저씨 롱폼 강의로 차근차근 따라갑니다."
            media={{
              type: "youtube",
              videoId: UNCLE_HANGUL_VIDEOS.numbersLong.id,
              title: UNCLE_HANGUL_VIDEOS.numbersLong.title,
              layout: "long",
            }}
          />
          <div className="border-t-[0.5px] border-[#D9D9D3] px-5 py-4 md:px-8 md:py-5">
            <Link
              href="/learn/korean-numbers-910-million"
              className="font-en text-xs font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:text-[#FF4B3E]"
            >
              Read full article ↗
            </Link>
          </div>
        </section>

        <NameConverter />

        <nav
          id="menu"
          aria-label="Primary sections"
          className="relative z-10 w-full bg-background"
        >
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group touch-target flex items-center justify-between gap-5 border-t-[0.5px] border-[#D9D9D3] p-5 py-8 transition-colors md:p-8"
            >
              <div className="min-w-0 flex-1 basis-0 pr-2">
                <span className="font-en block break-words text-2xl font-black leading-tight tracking-tight text-foreground transition-colors group-hover:text-[#FF4B3E] group-active:text-[#FF4B3E] sm:text-3xl">
                  {item.title}
                </span>
                <span className="font-ko mt-2 block text-sm leading-relaxed text-foreground/55">
                  {item.description}
                </span>
              </div>
              <span
                aria-hidden
                className="font-en shrink-0 text-xl leading-none text-foreground transition-colors group-hover:text-[#FF4B3E] group-active:text-[#FF4B3E] sm:text-2xl"
              >
                ↘
              </span>
            </Link>
          ))}
        </nav>

        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative z-10 w-full shrink-0 scroll-mt-16 border-t-[0.5px] border-b-[0.5px] border-[#D9D9D3] bg-background px-5 py-10 md:px-8 md:py-12"
        >
          <div className="mx-auto w-full min-w-0 max-w-xl md:max-w-2xl">
            <p
              id="about-heading"
              className="font-en mb-4 text-xs font-bold uppercase tracking-[0.14em] text-foreground/45"
            >
              Meet the Creator
            </p>

            <p className="font-en text-xl font-black leading-snug tracking-tight text-foreground md:text-2xl">
              Certified Korean Language Teacher &amp; Media Director behind
              Uncle Hangul
            </p>

            <p className="font-en mt-4 text-sm leading-relaxed text-foreground/65">
              On{" "}
              <a
                href={UNCLE_HANGUL_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer author"
                className="text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
              >
                @unclehangul
              </a>
              , we teach Hangul through typography-first, distraction-free
              lessons—so learners read structure, sound, and meaning on one calm
              surface. This site extends that same editorial discipline to
              tools, articles, and video.
            </p>

            <Link
              href="/about"
              className="font-en touch-target mt-6 inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] bg-background px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E] active:border-[#FF4B3E] active:text-[#FF4B3E]"
            >
              Read full story ➔
            </Link>

            <div className="mt-6 border-t-[0.5px] border-[#D9D9D3] pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex min-h-[88px] flex-col justify-between border-[0.5px] border-[#D9D9D3] bg-background p-4">
                  <span className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    Certified
                  </span>
                  <span className="font-en text-xs font-bold leading-snug tracking-tight text-foreground">
                    Korean Language Teacher
                  </span>
                  <span className="font-ko text-[11px] leading-relaxed text-foreground/55">
                    자격 verified · credential mark
                  </span>
                </div>

                <a
                  href={UNCLE_HANGUL_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[88px] flex-col justify-between border-[0.5px] border-[#D9D9D3] bg-background p-4 transition-colors hover:border-[#FF4B3E] active:border-[#FF4B3E]"
                >
                  <span className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    Channels
                  </span>
                  <span className="font-en text-xs font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-[#FF4B3E]">
                    YouTube · @unclehangul
                  </span>
                  <span className="font-en text-[11px] leading-relaxed text-foreground/55">
                    Long-form &amp; Shorts ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <aside
          aria-label="Advertisement"
          className="relative z-10 flex min-h-[250px] w-full shrink-0 items-center justify-center border-t-[0.5px] border-[#D9D9D3] bg-[#EBEBE5] p-5 md:p-8"
        >
          <span className="font-en text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/30">
            Advertisement
          </span>
        </aside>
      </div>

      <DashboardSidebar />
    </>
  );
}
