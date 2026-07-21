import type { BlogPost } from "@/lib/blog/posts";

export function LearnIndexJsonLd({ posts }: { posts: BlogPost[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Learn Korean · Uncle Hangul",
    description:
      "Hangul lessons, pronunciation drills, and reading guides.",
    url: "https://unclehangul.com/learn",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://unclehangul.com/learn/${post.slug}`,
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
