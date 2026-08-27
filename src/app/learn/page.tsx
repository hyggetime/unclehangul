import type { Metadata } from "next";
import { LearnArticleCard } from "@/components/learn/LearnArticleCard";
import { LearnIndexJsonLd } from "@/components/learn/LearnIndexJsonLd";
import { LearnRecommendedToolsChips } from "@/components/learn/LearnRecommendedToolsChips";
import { LearnSidebar } from "@/components/learn/LearnSidebar";
import { getAllPosts, getLearnIndexMetadata } from "@/lib/blog/posts";

export const metadata: Metadata = getLearnIndexMetadata();

export const revalidate = 3600;

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
                Visual Vocabulary, 발음, 읽기 — 한글아저씨의 글과 영상을 모아
                두었습니다.
              </p>
            </header>

            <LearnRecommendedToolsChips />

            <ul className="list-none">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="border-b-[0.5px] border-[#D9D9D3] last:border-b-0"
                >
                  <LearnArticleCard post={post} variant="index" />
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
