import Slugger from "github-slugger";
import type { BlogBlock } from "@/lib/blog/posts";

/** Heading blocks before slug assignment (parser / hardcoded drafts). */
export type HeadingBlockDraft = {
  type: "heading";
  level: 2 | 3;
  content: string;
};

export type BlogBlockDraft = Exclude<BlogBlock, { type: "heading" }> | HeadingBlockDraft;

/** Strip inline markdown before slugging heading text. */
function headingTextForSlug(raw: string): string {
  return raw
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .trim();
}

/** Assign stable DOM `id` slugs to h2/h3 blocks (deduped per document). */
export function assignHeadingSlugs(blocks: BlogBlockDraft[]): BlogBlock[] {
  const slugger = new Slugger();

  return blocks.map((block) => {
    if (block.type !== "heading") return block;

    const text = headingTextForSlug(block.content);
    const id = slugger.slug(text || "section");

    return { ...block, id };
  });
}
