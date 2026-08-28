import type { Metadata } from "next";
import {
  getMarkdownSlugs,
  loadMarkdownPost,
} from "@/lib/blog/load-markdown-post";
import { isPostPublic } from "@/lib/blog/publish";
import { buildPageMetadata } from "@/lib/site-metadata";

export type BlogBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3; content: string }
  | { type: "list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; content: string }
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
  blocks: BlogBlock[];
};

const POSTS: BlogPost[] = [
  {
    slug: "tongue-twister-girin",
    title: "Pronunciation drill: 기린 그림 tongue twister",
    description:
      "Train Korean consonant clusters and vowel length with Uncle Hangul’s Shorts tongue twister — a compact warm-up for mobile study sessions.",
    publishedAt: "2022-12-29",
    publishedLabel: "29 DEC 2022",
    sectionLabel: "LEARN / KOREAN",
    blocks: [
      {
        type: "paragraph",
        content:
          "발음 연습은 짧고 자주 하는 것이 효과적입니다. 아래 숏폼을 따라 읽으며 「ㄱ·ㄹ·ㅁ」이 겹치는 구간에 집중해 보세요.",
      },
      {
        type: "heading",
        level: 2,
        content: "Shorts: tongue twister 02",
      },
      {
        type: "youtube",
        videoId: "MEP-rVQm0CA",
        title:
          "[Pronunciation] Korean Tongue twisters02 — 내가 그린 기린 그림",
      },
      {
        type: "heading",
        level: 3,
        content: "What to listen for",
      },
      {
        type: "paragraph",
        content:
          "「목 긴」과 「목 안 긴」의 대비에 귀를 기울이세요. 비슷해 보이는 문장도 모음 길이와 경음 위치가 다릅니다.",
      },
    ],
  },
];

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
      "Hangul lessons, pronunciation drills, and reading guides from Uncle Hangul — structured for clear, long-form study.",
    path: "/learn",
    locale: "en_US",
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
  });
}
