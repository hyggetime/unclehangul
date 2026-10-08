import fs from "fs";
import path from "path";
import matter from "gray-matter";

function findNonNestedBoldPairs(text) {
  const pairs = [];
  for (let start = 0; start < text.length - 1; start += 1) {
    if (text[start] !== "*" || text[start + 1] !== "*") continue;
    const close = text.indexOf("**", start + 2);
    if (close === -1) continue;
    const inner = text.slice(start + 2, close);
    if (!inner.includes("**")) {
      pairs.push({ start, end: close + 2, inner });
    }
  }
  return pairs;
}

function findNextBoldPairLeftmost(text) {
  const pairs = findNonNestedBoldPairs(text).filter((pair) => pair.inner.length > 0);
  if (!pairs.length) return null;
  return pairs.reduce((best, pair) => (pair.start < best.start ? pair : best));
}

function simulateRender(text, pickPair) {
  let remaining = text;
  const steps = [];
  for (let i = 0; i < 20 && remaining.includes("**"); i += 1) {
    const pair = pickPair(remaining);
    if (!pair) break;
    steps.push(pair.inner.slice(0, 40));
    remaining =
      remaining.slice(0, pair.start) +
      `\0BOLD${steps.length - 1}\0` +
      remaining.slice(pair.end);
  }
  return { remaining, steps };
}

function auditLine(text, pickPair) {
  const { remaining } = simulateRender(text, pickPair);
  return remaining.includes("**");
}

const dir = "src/content/blog";
const issues = [];

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { content } = matter(raw);
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.includes("**")) continue;

    if (/^#{2,3}\s/.test(line.trim())) {
      issues.push({
        file,
        line: i + 1,
        kind: "heading-raw",
        hangulBug: true,
        leftmostBug: true,
        text: line.trim().slice(0, 120),
      });
      continue;
    }

    const leftmostBug = auditLine(line, findNextBoldPairLeftmost);
    if (leftmostBug) {
      issues.push({
        file,
        line: i + 1,
        kind: "parser-leftmost",
        text: line.trim().slice(0, 140),
      });
    }
  }
}

console.log(`Issues: ${issues.length}`);
for (const issue of issues) {
  console.log(`${issue.kind}\t${issue.file}:${issue.line}\t${issue.text}`);
}

