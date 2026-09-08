import type { BlogPost } from "@/lib/blog/posts";
import { BRAND_NAME } from "@/lib/brand";
import { BRAND_ALTERNATE_NAMES } from "@/lib/seo/keywords";
import { getSiteUrl } from "@/lib/site-url";

type ArticleJsonLdProps = {
  post: BlogPost;
  pageUrl: string;
};

function resolveSiteAssetUrl(path: string, siteUrl: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl.replace(/\/+$/, "")}${normalized}`;
}

function buildAuthorJsonLd(post: BlogPost, siteUrl: string) {
  const publisher = {
    "@type": "Organization" as const,
    name: BRAND_NAME,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    url: siteUrl,
  };

  if (post.author) {
    return {
      author: {
        "@type": "Person" as const,
        name: post.author,
        url: siteUrl,
        worksFor: publisher,
      },
      publisher,
    };
  }

  return {
    author: publisher,
    publisher,
  };
}

export function ArticleJsonLd({ post, pageUrl }: ArticleJsonLdProps) {
  const siteUrl = getSiteUrl();
  const { author, publisher } = buildAuthorJsonLd(post, siteUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    inLanguage: "en",
    author,
    publisher,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    ...(post.ogImage
      ? { image: resolveSiteAssetUrl(post.ogImage, siteUrl) }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
