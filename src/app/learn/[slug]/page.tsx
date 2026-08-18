import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/blog/ArticleJsonLd";
import { AuthorTeaser } from "@/components/blog/AuthorTeaser";
import { BlogBody } from "@/components/blog/BlogBody";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { LearnRecommendedToolsChips } from "@/components/learn/LearnRecommendedToolsChips";
import { LearnSidebar } from "@/components/learn/LearnSidebar";
import {
  getAllPostSlugs,
  getPostBySlug,
  getPostMetadata,
} from "@/lib/blog/posts";

type LearnPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LearnPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return getPostMetadata(post);
}

export default async function LearnPostPage({ params }: LearnPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleJsonLd post={post} />

      <div className="md:col-span-12">
        <div className="mx-auto w-full max-w-[1440px] gap-0 p-4 md:grid md:grid-cols-12 md:p-8">
          <article
            itemScope
            itemType="https://schema.org/BlogPosting"
            className="min-w-0 md:col-span-9 md:border-r-[0.5px] md:border-[#D9D9D3]"
          >
            <BlogPostHeader
              sectionLabel={post.sectionLabel}
              publishedLabel={post.publishedLabel}
              publishedAt={post.publishedAt}
            />

            <header className="border-b-[0.5px] border-[#D9D9D3] px-5 py-8 md:px-8 md:py-10">
              <h1
                itemProp="headline"
                className="font-en max-w-3xl break-words text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl"
              >
                {post.title}
              </h1>
              <p
                itemProp="description"
                className="font-ko mt-5 max-w-3xl text-base leading-relaxed text-foreground/70 md:mt-6 md:text-lg"
              >
                {post.description}
              </p>
              <meta itemProp="datePublished" content={post.publishedAt} />
            </header>

            <LearnRecommendedToolsChips />

            <div itemProp="articleBody" className="min-w-0 overflow-x-clip">
              <BlogBody blocks={post.blocks} constrainWidth />
            </div>

            <AuthorTeaser />
          </article>

          <LearnSidebar />
        </div>
      </div>
    </>
  );
}
