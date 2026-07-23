import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogBlock } from "@/lib/blog/posts";
import { markdownToBlocks } from "@/lib/blog/parse-markdown";

const ABOUT_PATH = path.join(process.cwd(), "src/content/about.md");

export type AboutContent = {
  title: string;
  description: string;
  heading: string;
  taglineEn: string;
  taglineKo: string;
  sectionLabel: string;
  englishBlocks: BlogBlock[];
  koreanBlocks: BlogBlock[];
};

export function loadAboutContent(): AboutContent {
  const raw = fs.readFileSync(ABOUT_PATH, "utf8");
  const { data, content } = matter(raw);

  const koreanBody = String(data.koreanBody ?? "").trim();

  return {
    title: String(data.title ?? "About"),
    description: String(data.description ?? ""),
    heading: String(data.heading ?? "About"),
    taglineEn: String(data.taglineEn ?? ""),
    taglineKo: String(data.taglineKo ?? ""),
    sectionLabel: String(data.sectionLabel ?? "ABOUT"),
    englishBlocks: markdownToBlocks(content.trim()),
    koreanBlocks: koreanBody ? markdownToBlocks(koreanBody) : [],
  };
}
