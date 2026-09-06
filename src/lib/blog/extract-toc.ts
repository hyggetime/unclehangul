import type { BlogBlock } from "@/lib/blog/posts";

export type TocItem = {
  id: string;
  title: string;
};

/** H2 sections omitted from the article table of contents. */
export const TOC_EXCLUDE_H2 =
  /^(frequently asked questions|faq|reactions?|vocabulary card|quick guide|up next|share|feedback|master it)/i;

function stripHeadingTitle(raw: string): string {
  return raw
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .trim();
}

function isTocHeading(block: BlogBlock): block is Extract<BlogBlock, { type: "heading" }> {
  return block.type === "heading" && block.level === 2;
}

/** Extract level-2 headings for TOC (excludes FAQ / meta sections). */
export function extractTocFromBlocks(blocks: BlogBlock[]): TocItem[] {
  return blocks
    .filter(isTocHeading)
    .filter((block) => !TOC_EXCLUDE_H2.test(stripHeadingTitle(block.content)))
    .map((block) => ({
      id: block.id,
      title: stripHeadingTitle(block.content),
    }));
}

export function shouldShowToc(items: TocItem[]): boolean {
  return items.length >= 3;
}
