import type { Metadata } from "next";
import Link from "next/link";
import { LearnIndexJsonLd } from "@/components/learn/LearnIndexJsonLd";
import { LearnRecommendedToolsChips } from "@/components/learn/LearnRecommendedToolsChips";
import { LearnSidebar } from "@/components/learn/LearnSidebar";
import { getAllPosts, getLearnIndexMetadata } from "@/lib/blog/posts";

export const metadata: Metadata = getLearnIndexMetadata();

export default function LearnIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <LearnIndexJsonLd posts={posts} />

      <div className="md:col-span-12">
        <div className="mx-auto w-full max-w-[1440px] gap-0 p-4 md:grid md:grid-cols-12 md:p-8">
          <section
            aria-labelledby="learn-index-heading"
            className="min-w-0 md:col-span-9 md:border-r-[0.5px] md:border-[#D9D9D3]"
          >
            <header className="border-b-[0.5px] border-[#D9D9D3] pb-6 md:pb-8">
              <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
                LEARN / KOREAN
              </p>
              <h1
                id="learn-index-heading"
                className="font-en mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl"
              >
                Lessons &amp; articles
              </h1>
              <p className="font-ko mt-4 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
                마크다운 파이프라인에서 연결될 포스트 목록입니다. 제목과
                발행일만으로도 검색 로봇이 구조를 읽을 수 있게 짰습니다.
              </p>
            </header>

            <LearnRecommendedToolsChips />

            <ul className="list-none">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="border-b-[0.5px] border-[#D9D9D3] last:border-b-0"
                >
                  <article className="py-6 md:py-8">
                    <p className="font-en mb-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                      <time dateTime={post.publishedAt}>
                        {post.publishedLabel}
                      </time>
                    </p>
                    <h2 className="font-en text-xl font-bold leading-tight tracking-tight md:text-2xl">
                      <Link
                        href={`/learn/${post.slug}`}
                        className="text-foreground transition-colors hover:text-[#FF4B3E] active:text-[#FF4B3E]"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="font-ko mt-3 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
                      {post.description}
                    </p>
                    <Link
                      href={`/learn/${post.slug}`}
                      className="font-en mt-4 inline-flex text-xs font-bold uppercase tracking-[0.14em] text-foreground/55 transition-colors hover:text-[#FF4B3E]"
                    >
                      Read article ↗
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <LearnSidebar />
        </div>
      </div>
    </>
  );
}
