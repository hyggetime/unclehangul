export type HangulTileLayout = "single" | "grid2x2";

export type HangulTileSpec = {
  text: string;
  layout: HangulTileLayout;
  /**
   * For 3-character single-line tiles only. Set to any value `< 1` (convention: `0.5`)
   * to enable compact horizontal padding + slightly larger type when default 3-char
   * sizing still feels cramped (e.g. 아저씨).
   */
  insetXScale?: number;
};

type TileEntry = string | HangulTileSpec;

/**
 * Learn-card Hangul stamp — slug → display text (and optional layout overrides).
 *
 * ## Hangul tile design rules (LearnArticleCard / HangulTileStamp)
 *
 * All stamps share one square frame:
 * - Border `0.5px #D9D9D3`, fill `#EBEBE5` @ 40%, `font-ko font-black`
 * - Size `sm`: 48×48 → 56×56 (md breakpoint); `md`: 56×56 → 64×64
 *
 * ### 2 characters → `layout: "single"` (default)
 * Largest type; one line, centered.
 * - `sm`: `text-lg` → `md:text-xl`
 * - `md`: `text-xl` → `md:text-2xl`
 * - Examples: `주소`, `이모`, `우리`, `한글`, `버스`, `반말`
 *
 * ### 3 characters → `layout: "single"`
 * Reduced type so glyphs stay inside the square without clipping.
 * - Default (`insetXScale` omitted): `text-xs`→`md:text-sm` (sm) / `text-sm`→`md:text-base` (md)
 * - Compact (`insetXScale: 0.5`): tighter `px` + slightly larger fixed sizes — use when
 *   default 3-char type still feels tight (only case so far: `아저씨`).
 *   - `sm`: `px-[1.8px] text-[14.5px]` → `md:px-[2.1px] md:text-[17.5px]`
 *   - `md`: `px-[2.1px] text-[17.5px]` → `md:px-[2.4px] md:text-[20px]`
 *
 * ### 4 characters → `layout: "grid2x2"`
 * One syllable per cell (2×2 grid). Never single-line — four glyphs overflow the stamp.
 * - Grid pad `sm`: 2px, gap 30% of pad; cell type 18px → 20px at md
 * - Grid pad `md`: 2.5px → 3px at md; cell type 20px → 24px at md
 * - Examples: `숫자읽기`, `소리글자`
 *
 * ### Choosing label text
 * Pick the article's most memorable Korean keyword (2–4 syllables). Avoid title fallback
 * (`getPostHangulTileSpec` slices the first Hangul run in the title to 2 chars) — register
 * explicit entries below instead.
 */
export const POST_HANGUL_TILES: Record<string, TileEntry> = {
  "from-water-is-self-to-aircon-korea-shrinks-english": {
    text: "물은셀프",
    layout: "grid2x2",
  },
  "from-universe-to-doorstep-korea-big-to-small-logic": "주소",
  "how-to-say-uncle-in-korean-oppa-samchon-ahjussi": {
    text: "아저씨",
    layout: "single",
    insetXScale: 0.5,
  },
  "when-do-koreans-switch-jondaetmal-to-banmal": "반말",
  "why-korean-restaurant-workers-called-aunt-eoni-imo-ajumma": "이모",
  "why-solo-dwellers-korea-still-say-our-house": "우리",
  "korean-numbers-910-million": { text: "숫자읽기", layout: "grid2x2" },
  "12-years-grammar-language-lab-manifesto": "습득",
  "why-foreign-linguists-study-ancient-korean-books": {
    text: "소리글자",
    layout: "grid2x2",
  },
  "why-typing-korean-feels-like-tetris-hangul-keyboards": "한글",
  "graphic-blueprint-hangul-loanwords": "버스",
  "tongue-twister-girin": { text: "기린그림", layout: "grid2x2" },
  "why-you-are-reading-korean-clocks-backwards": "시간",
};

function normalizeTileEntry(entry: TileEntry): HangulTileSpec {
  if (typeof entry === "string") {
    return { text: entry, layout: "single" };
  }
  return entry;
}

export function getPostHangulTileSpec(
  slug: string,
  title: string,
): HangulTileSpec {
  const mapped = POST_HANGUL_TILES[slug];
  if (mapped) return normalizeTileEntry(mapped);

  const hangulInTitle = title.match(/[\uAC00-\uD7A3]+/g);
  if (hangulInTitle?.[0]) {
    return { text: hangulInTitle[0].slice(0, 2), layout: "single" };
  }

  return { text: "한", layout: "single" };
}

/** @deprecated Use getPostHangulTileSpec — plain string for callers that need it. */
export function getPostHangulTile(slug: string, title: string): string {
  return getPostHangulTileSpec(slug, title).text;
}
