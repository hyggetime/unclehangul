import type { BlogPost } from "@/lib/blog/posts";
import { BRAND_NAME } from "@/lib/brand";
import { BRAND_ALTERNATE_NAMES, seoScriptPhrase } from "@/lib/seo/keywords";
import { getSiteUrl } from "@/lib/site-url";

export function LearnIndexJsonLd({ posts }: { posts: BlogPost[] }) {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Learn Korean · ${BRAND_NAME}`,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    description: `${seoScriptPhrase()} lessons, pronunciation drills, and reading guides.`,
    url: `${siteUrl}/learn`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/learn/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
