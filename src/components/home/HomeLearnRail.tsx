import Link from "next/link";
import type { BlogPost } from "@/lib/blog/posts";
import { LearnArticleCard } from "@/components/learn/LearnArticleCard";

type HomeLearnRailProps = {
  posts: BlogPost[];
};

export function HomeLearnRail({ posts }: HomeLearnRailProps) {
  const latest = posts.slice(0, 4);

  return (
    <section
      aria-labelledby="home-learn-heading"
      className="border-t-[0.5px] border-[#D9D9D3]"
    >
      <div className="flex items-end justify-between gap-4 border-b-[0.5px] border-[#D9D9D3] px-5 py-5 md:px-8 md:py-6">
        <div>
          <h2
            id="home-learn-heading"
            className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45"
          >
            Learn
          </h2>
          <p className="font-ko mt-2 text-sm leading-relaxed text-foreground/60 md:text-base">
            한글 구조와 어휘를 글로 익히기
          </p>
        </div>
        <Link
          href="/learn"
          className="font-en touch-target shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:text-[#FF4B3E]"
        >
          All ↗
        </Link>
      </div>

      <ul className="list-none">
        {latest.map((post) => (
          <li
            key={post.slug}
            className="border-b-[0.5px] border-[#D9D9D3] last:border-b-0"
          >
            <LearnArticleCard post={post} variant="home" />
          </li>
        ))}
      </ul>
    </section>
  );
}
