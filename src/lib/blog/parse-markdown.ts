import type { BlogBlock } from "@/lib/blog/posts";

const YOUTUBE_LINE =
  /^@youtube\s+(\S+)\s*\|\s*(short|long)\s*\|\s*(.+)\s*$/i;

const TABLE_SEPARATOR =
  /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/;

function parseTableCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.includes("|");
}

export function markdownToBlocks(markdown: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let orderedItems: string[] = [];
  let inCode = false;
  let codeLines: string[] = [];
  let blockquoteLines: string[] = [];

  function flushParagraph() {
    const text = paragraph.join(" ").trim();
    if (text) blocks.push({ type: "paragraph", content: text });
    paragraph = [];
  }

  function flushList(listItemsToFlush: string[], ordered = false) {
    const items = listItemsToFlush.map((item) => item.trim()).filter(Boolean);
    if (!items.length) return;
    blocks.push({
      type: ordered ? "ordered-list" : "list",
      items,
    });
  }

  function flushListBuffer() {
    flushList(listItems, false);
    listItems = [];
    flushList(orderedItems, true);
    orderedItems = [];
  }

  function flushCode() {
    if (!codeLines.length) return;
    blocks.push({ type: "code", content: codeLines.join("\n").trimEnd() });
    codeLines = [];
  }

  function flushBlockquote() {
    const lines = blockquoteLines.map((entry) => entry.trim()).filter(Boolean);
    if (!lines.length) return;
    blocks.push({ type: "blockquote", lines });
    blockquoteLines = [];
  }

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();

    if (line.trim().startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushListBuffer();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    if (isTableRow(line)) {
      const nextLine = lines[index + 1]?.trim() ?? "";
      if (TABLE_SEPARATOR.test(nextLine)) {
        flushParagraph();
        flushListBuffer();

        const headers = parseTableCells(line);
        index += 1;
        const rows: string[][] = [];

        while (index + 1 < lines.length && isTableRow(lines[index + 1])) {
          index += 1;
          rows.push(parseTableCells(lines[index]));
        }

        blocks.push({ type: "table", headers, rows });
        continue;
      }
    }

    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listItems.length) flushList(listItems, false);
      listItems = [];
      orderedItems.push(orderedMatch[1].trim());
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      if (orderedItems.length) flushList(orderedItems, true);
      orderedItems = [];
      listItems.push(listMatch[1].trim());
      continue;
    }

    if (listItems.length > 0 || orderedItems.length > 0) {
      if (line.trim() !== "") flushListBuffer();
    }

    const blockquoteMatch = line.match(/^>\s?(.*)$/);
    if (blockquoteMatch) {
      flushParagraph();
      flushListBuffer();
      blockquoteLines.push(blockquoteMatch[1]);
      continue;
    }

    if (blockquoteLines.length > 0) {
      flushBlockquote();
    }

    if (line.trim() === "---") {
      flushParagraph();
      flushListBuffer();
      blocks.push({ type: "divider" });
      continue;
    }

    const h1 = line.match(/^#\s+(.+)$/);
    if (h1) {
      flushParagraph();
      flushListBuffer();
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
  flushBlockquote();
  if (inCode) flushCode();

  return blocks;
}
