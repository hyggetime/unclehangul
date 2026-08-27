import Link from "next/link";
import { HomeChannelsBand } from "@/components/home/HomeChannelsBand";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeLearnRail } from "@/components/home/HomeLearnRail";
import { PlayWidgetStrip } from "@/components/home/PlayWidgetStrip";
import { NameConverter } from "@/components/NameConverter";
import { getHomeMetadata } from "@/lib/home/metadata";
import { getAllPosts } from "@/lib/blog/posts";
import { UNCLE_HANGUL_CHANNEL_URL } from "@/lib/youtube";

export const metadata = getHomeMetadata();

const MAIN_COLUMN =
  "relative z-10 w-full min-w-0 md:col-span-12";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className={MAIN_COLUMN}>
      <HomeHero />
      <HomeLearnRail posts={posts} />

      <div id="hangul-play">
        <NameConverter />
        <PlayWidgetStrip />
      </div>

      <HomeChannelsBand />

      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-16 border-t-[0.5px] border-[#D9D9D3] px-5 section-y md:px-8"
      >
        <div className="mx-auto w-full min-w-0 max-w-xl md:max-w-2xl">
          <p
            id="about-heading"
            className="font-en mb-4 text-xs font-bold uppercase tracking-[0.14em] text-foreground/45"
          >
            Meet the Creator
          </p>

          <p className="font-en text-lg font-black leading-snug tracking-tight text-foreground md:text-xl">
            Certified Korean Language Teacher &amp; Media Director
          </p>

          <p className="font-ko mt-4 text-sm leading-relaxed text-foreground/65">
            타이포그래피로 한글을 가르치는{" "}
            <a
              href={UNCLE_HANGUL_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer author"
              className="font-en text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
            >
              @unclehangul
            </a>
            . 글·위젯·영상이 같은 브랜드로 이어집니다.
          </p>

          <Link
            href="/about"
            className="font-en touch-target mt-6 inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] bg-background px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
          >
            Read full story ➔
          </Link>
        </div>
      </section>
    </div>
  );
}
