import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "@/lib/blog/posts";
import { markdownToBlocks } from "@/lib/blog/parse-markdown";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

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
  const publishedAt = String(data.publishedAt ?? "");
  const publishedLabel = String(data.publishedLabel ?? publishedAt);
  const sectionLabel = String(data.sectionLabel ?? "LEARN / KOREAN");

  return {
    slug,
    title,
    description,
    publishedAt,
    publishedLabel,
    sectionLabel,
    blocks: markdownToBlocks(content.trim()),
  };
}
