import type { BlogPost } from "@/lib/blog/posts";

type ArticleJsonLdProps = {
  post: BlogPost;
  pageUrl: string;
};

export function ArticleJsonLd({ post, pageUrl }: ArticleJsonLdProps) {
  const siteUrl = pageUrl.replace(/\/learn\/[^/]+$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: "Uncle Hangul",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Uncle Hangul",
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
