import {
  BRAND_NAME,
  BRAND_NAME_COMPACT,
  BRAND_NAME_KO,
  BRAND_DOMAIN,
  BRAND_SOCIAL_HANDLE,
  SCRIPT_NAME,
} from "@/lib/brand";

/**
 * Brand spellings for metadata, JSON-LD alternateName, llms.txt, and AEO.
 * Includes common typos and legacy forms — not shown in user-facing prose.
 */
export const BRAND_ALTERNATE_NAMES = [
  BRAND_NAME,
  BRAND_NAME_COMPACT,
  "uncle hangul",
  "unclehangul",
  BRAND_NAME_KO,
  BRAND_SOCIAL_HANDLE,
  BRAND_DOMAIN,
  "Uncle Hangual",
  "Uncle Hanguel",
  "Uncle Han-guel",
  "UncleHangul",
  "Uncle Hangul Korean",
  "Unclehangul Korean",
] as const;

/**
 * Hangul script spellings for SEO/AEO (Revised Romanization + common variants).
 * User-facing pages use {@link SCRIPT_NAME} only.
 */
export const SCRIPT_SPELLINGS = [
  SCRIPT_NAME,
  "Hangeul",
  "hangul",
  "hangeul",
  "Han-guel",
  "Hanguel",
  "Korean alphabet",
  "Korean script",
] as const;

/** Organization schema `knowsAbout` — topics for search and answer engines. */
export const ORGANIZATION_KNOWS_ABOUT = [
  ...SCRIPT_SPELLINGS,
  "Korean language",
  "Korean language teaching",
  "Korean pronunciation",
  "Korean reading",
  "language acquisition",
  "Korean typography",
  "English to Hangul transliteration",
  "Korea Post EMS",
  "international shipping from Korea",
  BRAND_NAME,
  BRAND_NAME_COMPACT,
  BRAND_NAME_KO,
] as const;

export const LEARNING_TOPIC_KEYWORDS = [
  "learn Korean",
  "Korean lessons",
  "Korean pronunciation",
  "Korean reading",
  "language acquisition",
  "한국어 배우기",
  "한글 배우기",
  "한글 공부",
] as const;

export const SELLER_TOOL_KEYWORDS = [
  "Korea Post EMS",
  "Contract EMS",
  "해외배송",
  "글로벌 셀러",
  "K-Packet",
  "EMS volumetric weight",
] as const;

export function mergeSeoKeywords(...groups: string[][]): string[] {
  return [...new Set(groups.flat().map((k) => k.trim()).filter(Boolean))];
}

export function learningPageKeywords(extra: string[] = []): string[] {
  return mergeSeoKeywords(
    [...BRAND_ALTERNATE_NAMES],
    [...SCRIPT_SPELLINGS],
    [...LEARNING_TOPIC_KEYWORDS],
    extra,
  );
}

export function sellerToolKeywords(extra: string[] = []): string[] {
  return mergeSeoKeywords(
    [...BRAND_ALTERNATE_NAMES],
    [...SELLER_TOOL_KEYWORDS],
    extra,
  );
}

/** Meta description helper — natural sentence with both script spellings. */
export function seoScriptPhrase(): string {
  return `${SCRIPT_NAME} (Hangeul)`;
}

/** Meta description helper — brand with compact alias for crawlers. */
export function seoBrandPhrase(): string {
  return `${BRAND_NAME} (${BRAND_NAME_COMPACT})`;
}
