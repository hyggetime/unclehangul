import type { BlogPost } from "@/lib/blog/posts";

type ArticleJsonLdProps = {
  post: BlogPost;
};

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Uncle Hangul",
      url: "https://unclehangul.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Uncle Hangul",
      url: "https://unclehangul.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://unclehangul.com/learn/${post.slug}`,
    },
    inLanguage: "ko-KR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
