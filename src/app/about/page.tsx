import type { Metadata } from "next";
import Link from "next/link";
import { AboutBrandFaq } from "@/components/about/AboutBrandFaq";
import { AboutPageJsonLd } from "@/components/about/AboutPageJsonLd";
import { BlogBody } from "@/components/blog/BlogBody";
import { KoreanTextToggle } from "@/components/about/KoreanTextToggle";
import { LearnSidebar } from "@/components/learn/LearnSidebar";
import { loadAboutContent } from "@/lib/about/load-about";
import { getAboutMetadata } from "@/lib/about/metadata";
import { UNCLE_HANGUL_CHANNEL_URL } from "@/lib/youtube";

export const metadata: Metadata = getAboutMetadata();

export default function AboutPage() {
  const about = loadAboutContent();

  return (
    <>
      <AboutPageJsonLd />
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] gap-0 p-4 md:grid md:grid-cols-12 md:p-8">
        <article
          aria-labelledby="about-page-heading"
          className="min-w-0 md:col-span-9 md:border-r-[0.5px] md:border-[#D9D9D3]"
        >
          <div className="grid h-12 grid-cols-[1fr_auto] border-b-[0.5px] border-[#D9D9D3]">
            <div className="flex items-center border-r-[0.5px] border-[#D9D9D3] px-5 md:px-8">
              <span className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
                {about.sectionLabel}
              </span>
            </div>
            <div className="flex items-center px-5 md:px-8">
              <Link
                href="/"
                className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
              >
                Home ↗
              </Link>
            </div>
          </div>

          <header className="border-b-[0.5px] border-[#D9D9D3] px-5 py-8 md:px-8 md:py-10">
            <h1
              id="about-page-heading"
              className="font-en text-2xl font-black leading-tight tracking-tight text-foreground md:text-4xl md:tracking-tight"
            >
              {about.heading}
            </h1>
            <p className="font-en mt-4 text-sm font-bold uppercase tracking-[0.12em] text-foreground/55 md:text-base">
              {about.taglineEn}
            </p>
            <p className="font-ko mt-2 text-xs leading-relaxed text-foreground/45 md:text-sm">
              {about.taglineKo}
            </p>
          </header>

          <BlogBody blocks={about.englishBlocks} constrainWidth />

          <div className="px-5 pb-8 md:px-8 md:pb-12">
            <KoreanTextToggle summaryLabel="한국어로 읽기 (Read in Korean)">
              <BlogBody blocks={about.koreanBlocks} constrainWidth embedded />
            </KoreanTextToggle>

            <div className="mt-12 grid grid-cols-2 gap-4 border-t-[0.5px] border-[#D9D9D3] pt-8 md:mt-14">
              <div className="flex min-h-[88px] flex-col justify-between border-[0.5px] border-[#D9D9D3] bg-background p-4">
                <span className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  Certified
                </span>
                <span className="font-en text-xs font-bold leading-snug tracking-tight text-foreground">
                  Korean Language Teacher
                </span>
              </div>
              <a
                href={UNCLE_HANGUL_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer author"
                className="group flex min-h-[88px] flex-col justify-between border-[0.5px] border-[#D9D9D3] bg-background p-4 transition-colors hover:border-[#FF4B3E]"
              >
                <span className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  YouTube
                </span>
                <span className="font-en text-xs font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-[#FF4B3E]">
                  @unclehangul ↗
                </span>
              </a>
            </div>
          </div>

          <AboutBrandFaq />
        </article>

        <LearnSidebar />
      </div>
    </div>
    </>
  );
}
