import type { BlogBlock } from "@/lib/blog/posts";

export type FaqEntry = {
  question: string;
  answer: string;
};

const FAQ_SECTION = /faq|frequently asked questions/i;

function stripMarkdownInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .trim();
}

function normalizeQuestion(raw: string): string {
  return stripMarkdownInline(raw.replace(/^Q\d+:\s*/i, "").trim());
}

function normalizeAnswer(raw: string): string {
  return stripMarkdownInline(
    raw.replace(/^\*\*A:\*\*\s*/i, "").replace(/^A:\s*/i, "").trim(),
  );
}

/** Pull FAQ pairs from markdown blocks after a FAQ section heading. */
export function extractFaqFromBlocks(blocks: BlogBlock[]): FaqEntry[] {
  let start = -1;

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (
      block.type === "heading" &&
      block.level === 2 &&
      FAQ_SECTION.test(block.content)
    ) {
      start = index + 1;
      break;
    }
  }

  if (start < 0) return [];

  const items: FaqEntry[] = [];
  let index = start;

  while (index < blocks.length) {
    const block = blocks[index];

    if (block.type === "heading" && block.level === 2) break;

    if (block.type === "heading" && block.level === 3) {
      const question = normalizeQuestion(block.content);
      const answerParts: string[] = [];
      index += 1;

      while (index < blocks.length) {
        const next = blocks[index];
        if (next.type === "heading") break;
        if (next.type === "paragraph") {
          answerParts.push(normalizeAnswer(next.content));
        }
        index += 1;
      }

      const answer = answerParts.join(" ").trim();
      if (question && answer) items.push({ question, answer });
      continue;
    }

    index += 1;
  }

  return items;
}
