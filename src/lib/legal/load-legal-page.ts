import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogBlock } from "@/lib/blog/posts";
import { markdownToBlocks } from "@/lib/blog/parse-markdown";
import { getSiteUrl } from "@/lib/site-url";

export type LegalDocumentSlug = "privacy" | "terms";

const LEGAL_DIR = path.join(process.cwd(), "src/content/legal");

const CONTACT_EMAIL = "unclehangul@gmail.com";
const GOOGLE_ADS_POLICY = "https://policies.google.com/technologies/ads";

export type LegalDocument = {
  slug: LegalDocumentSlug;
  title: string;
  description: string;
  heading: string;
  lastUpdated: string;
  sectionLabel: string;
  blocks: BlogBlock[];
};

function applyLegalTemplateVars(markdown: string): string {
  const siteUrl = getSiteUrl();
  return markdown
    .replaceAll("{{SITE_URL}}", siteUrl)
    .replaceAll("{{CONTACT_EMAIL}}", CONTACT_EMAIL)
    .replaceAll("{{GOOGLE_ADS_POLICY}}", GOOGLE_ADS_POLICY);
}

export function loadLegalDocument(slug: LegalDocumentSlug): LegalDocument {
  const filePath = path.join(LEGAL_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const body = applyLegalTemplateVars(content.trim());

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    heading: String(data.heading ?? data.title ?? slug),
    lastUpdated: String(data.lastUpdated ?? ""),
    sectionLabel: String(data.sectionLabel ?? "Legal"),
    blocks: markdownToBlocks(body),
  };
}

export function getLegalMetadata(slug: LegalDocumentSlug): Metadata {
  const doc = loadLegalDocument(slug);
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `${getSiteUrl()}/${slug}` },
  };
}
