import type { BlogPost } from "@/lib/blog/posts";
import { BRAND_NAME } from "@/lib/brand";
import { BRAND_ALTERNATE_NAMES } from "@/lib/seo/keywords";
import { getSiteUrl } from "@/lib/site-url";

type ArticleJsonLdProps = {
  post: BlogPost;
  pageUrl: string;
};

export function ArticleJsonLd({ post, pageUrl }: ArticleJsonLdProps) {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
      alternateName: [...BRAND_ALTERNATE_NAMES],
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      alternateName: [...BRAND_ALTERNATE_NAMES],
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
