import Link from "next/link";
import type { BlogPost } from "@/lib/blog/posts";
import { getPostHangulTile } from "@/lib/blog/post-visuals";

type LearnArticleCardProps = {
  post: BlogPost;
  /** `home` = compact rail row; `index` = learn listing */
  variant?: "home" | "index";
};

function formatCategory(sectionLabel: string): string {
  const parts = sectionLabel.split("/").map((part) => part.trim());
  return parts[parts.length - 1] ?? sectionLabel;
}

export function LearnArticleCard({
  post,
  variant = "home",
}: LearnArticleCardProps) {
  const tile = getPostHangulTile(post.slug, post.title);
  const category = formatCategory(post.sectionLabel);

  if (variant === "index") {
    return (
      <article className="py-6 md:py-8">
        <div className="flex gap-4 md:gap-6">
          <div
            aria-hidden
            className="font-ko flex h-14 w-14 shrink-0 items-center justify-center border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40 text-xl font-black leading-none text-foreground md:h-16 md:w-16 md:text-2xl"
          >
            {tile}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-en mb-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
              {category} ·{" "}
              <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
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
          </div>
        </div>
      </article>
    );
  }

  return (
    <Link
      href={`/learn/${post.slug}`}
      className="group touch-target flex gap-4 px-5 py-5 transition-colors hover:bg-[#EBEBE5]/30 active:bg-[#EBEBE5]/30 md:gap-5 md:px-8 md:py-6"
    >
      <div
        aria-hidden
        className="font-ko flex h-12 w-12 shrink-0 items-center justify-center border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40 text-lg font-black leading-none text-foreground transition-colors group-hover:border-[#FF4B3E]/40 md:h-14 md:w-14 md:text-xl"
      >
        {tile}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
          {category} · {post.publishedLabel}
        </p>
        <h3 className="font-en mt-2 text-lg font-black leading-snug tracking-tight text-foreground transition-colors group-hover:text-[#FF4B3E] md:text-xl">
          {post.title}
        </h3>
        <p className="font-en mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/60">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
