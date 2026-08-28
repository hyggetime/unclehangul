import type { BlogPost } from "@/lib/blog/posts";
import { extractFaqFromBlocks } from "@/lib/blog/extract-faq";
import { JsonLd, buildFaqPageJsonLd } from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { ArticleJsonLd } from "@/components/blog/ArticleJsonLd";

type LearnPostJsonLdProps = {
  post: BlogPost;
};

export function LearnPostJsonLd({ post }: LearnPostJsonLdProps) {
  const pageUrl = `${getSiteUrl()}/learn/${post.slug}`;
  const faqItems = extractFaqFromBlocks(post.blocks);

  return (
    <>
      <ArticleJsonLd post={post} pageUrl={pageUrl} />
      {faqItems.length > 0 ? (
        <JsonLd data={buildFaqPageJsonLd(pageUrl, faqItems)} />
      ) : null}
    </>
  );
}
