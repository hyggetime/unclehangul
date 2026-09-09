import type { Metadata } from "next";
import {
  getMarkdownSlugs,
  loadMarkdownPost,
} from "@/lib/blog/load-markdown-post";
import { isPostPublic } from "@/lib/blog/publish";
import { buildPageMetadata } from "@/lib/site-metadata";
import { learningPageKeywords, seoBrandPhrase, seoScriptPhrase } from "@/lib/seo/keywords";

export type BlogBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3; content: string; id: string }
  | { type: "list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; content: string }
  | { type: "blockquote"; lines: string[] }
  | { type: "divider" }
  | {
      type: "youtube";
      videoId: string;
      title: string;
      layout?: "short" | "long";
    }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      /** Display width as a fraction of content column (default 1). */
      displayScale?: number;
    };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  publishedLabel: string;
  sectionLabel: string;
  /** `draft` hidden; `scheduled` uses publishAt; default published. */
  status?: "draft" | "scheduled" | "published";
  /** ISO datetime; when set, overrides publishedAt for visibility. */
  publishAt?: string;
  /** Frontmatter tags — merged into page SEO keywords. */
  tags?: string[];
  /** Optional extra SEO keywords from frontmatter. */
  seoKeywords?: string[];
  /** Article byline — used in JSON-LD author when set. */
  author?: string;
  /** Open Graph / Twitter card image path (e.g. /images/og/...). */
  ogImage?: string;
  blocks: BlogBlock[];
};

const POSTS: BlogPost[] = [];

export function getAllPosts(): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();

  for (const slug of getMarkdownSlugs()) {
    const post = loadMarkdownPost(slug);
    if (post) bySlug.set(slug, post);
  }

  for (const post of POSTS) {
    if (!bySlug.has(post.slug)) bySlug.set(post.slug, post);
  }

  return [...bySlug.values()]
    .filter((post) => isPostPublic(post))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const fromMarkdown = loadMarkdownPost(slug);
  const post =
    fromMarkdown ?? POSTS.find((entry) => entry.slug === slug);
  if (!post || !isPostPublic(post)) return undefined;
  return post;
}

/** All slugs on disk (including scheduled/draft) for static path discovery. */
export function getAllPostSlugsIncludingUnpublished(): string[] {
  const slugs = new Set([
    ...POSTS.map((post) => post.slug),
    ...getMarkdownSlugs(),
  ]);
  return [...slugs];
}

export function getLearnIndexMetadata(): Metadata {
  return buildPageMetadata({
    title: "Learn Korean",
    description:
      `${seoScriptPhrase()} lessons, pronunciation drills, and reading guides from ${seoBrandPhrase()} — structured for clear, long-form study.`,
    path: "/learn",
    locale: "en_US",
    keywords: learningPageKeywords(["Learn Korean", "Hangul lessons"]),
  });
}

export function getPostMetadata(post: BlogPost): Metadata {
  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/learn/${post.slug}`,
    openGraphType: "article",
    locale: "en_US",
    publishedTime: post.publishedAt,
    image: post.ogImage,
    imageAlt: post.title,
    keywords: learningPageKeywords([
      post.title,
      ...(post.tags ?? []),
      ...(post.seoKeywords ?? []),
    ]),
  });
}
