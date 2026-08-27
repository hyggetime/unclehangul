import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "@/lib/blog/posts";
import { markdownToBlocks } from "@/lib/blog/parse-markdown";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

function formatPublishedLabel(publishedAt: string): string {
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return publishedAt;
  return date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

function resolveSectionLabel(data: Record<string, unknown>): string {
  if (data.sectionLabel) return String(data.sectionLabel);
  if (data.category) {
    return `LEARN / ${String(data.category).toUpperCase()}`;
  }
  return "LEARN / KOREAN";
}

export function getMarkdownSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function loadMarkdownPost(slug: string): BlogPost | undefined {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const title = String(data.title ?? slug);
  const description = String(data.description ?? "");
  const publishedAt = String(data.publishedAt ?? data.date ?? "");
  const publishedLabel = String(
    data.publishedLabel ?? formatPublishedLabel(publishedAt),
  );
  const sectionLabel = resolveSectionLabel(data);
  const status = parseStatus(data.status);
  const publishAt = data.publishAt ? String(data.publishAt) : undefined;

  return {
    slug,
    title,
    description,
    publishedAt,
    publishedLabel,
    sectionLabel,
    status,
    publishAt,
    blocks: markdownToBlocks(content.trim()),
  };
}

function parseStatus(
  value: unknown,
): BlogPost["status"] | undefined {
  if (value === "draft" || value === "scheduled" || value === "published") {
    return value;
  }
  return undefined;
}
