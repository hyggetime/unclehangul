import type { BlogBlock } from "@/lib/blog/posts";

const YOUTUBE_LINE =
  /^@youtube\s+(\S+)\s*\|\s*(short|long)\s*\|\s*(.+)\s*$/i;

export function markdownToBlocks(markdown: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];

  function flushParagraph() {
    const text = paragraph.join(" ").trim();
    if (text) blocks.push({ type: "paragraph", content: text });
    paragraph = [];
  }

  function flushList(listItems: string[]) {
    const items = listItems.map((item) => item.trim()).filter(Boolean);
    if (items.length) blocks.push({ type: "list", items });
  }

  let listItems: string[] = [];

  function flushListBuffer() {
    flushList(listItems);
    listItems = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    const listMatch = line.match(/^-\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1].trim());
      continue;
    }

    if (listItems.length > 0 && line.trim() !== "") {
      flushListBuffer();
    }

    if (line.trim() === "---") {
      flushParagraph();
      flushListBuffer();
      blocks.push({ type: "divider" });
      continue;
    }

    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      flushParagraph();
      flushListBuffer();
      blocks.push({ type: "heading", level: 2, content: h2[1].trim() });
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flushParagraph();
      flushListBuffer();
      blocks.push({ type: "heading", level: 3, content: h3[1].trim() });
      continue;
    }

    const yt = line.trim().match(YOUTUBE_LINE);
    if (yt) {
      flushParagraph();
      flushListBuffer();
      blocks.push({
        type: "youtube",
        videoId: yt[1],
        layout: yt[2].toLowerCase() as "short" | "long",
        title: yt[3].trim(),
      });
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushListBuffer();
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushListBuffer();
  return blocks;
}
