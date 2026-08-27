/** Hangul tile shown on Learn cards (visual anchor per article). */
export const POST_HANGUL_TILES: Record<string, string> = {
  "graphic-blueprint-hangul-loanwords": "버스",
  "korean-numbers-910-million": "910",
  "tongue-twister-girin": "기린",
};

export function getPostHangulTile(slug: string, title: string): string {
  if (POST_HANGUL_TILES[slug]) return POST_HANGUL_TILES[slug];
  const hangulInTitle = title.match(/[\uAC00-\uD7A3]+/g);
  if (hangulInTitle?.[0]) return hangulInTitle[0].slice(0, 2);
  return "한";
}
