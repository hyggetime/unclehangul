export type HangulTileLayout = "single" | "grid2x2";

export type HangulTileSpec = {
  text: string;
  layout: HangulTileLayout;
  /** Horizontal inset scale for long single-line labels (default 1). */
  insetXScale?: number;
};

type TileEntry = string | HangulTileSpec;

/** Hangul stamp on Learn cards — slug → display text (and optional 2×2 layout). */
export const POST_HANGUL_TILES: Record<string, TileEntry> = {
  "from-universe-to-doorstep-korea-big-to-small-logic": "주소",
  "how-to-say-uncle-in-korean-oppa-samchon-ahjussi": {
    text: "아저씨",
    layout: "single",
    insetXScale: 0.5,
  },
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
  "tongue-twister-girin": "기린",
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
