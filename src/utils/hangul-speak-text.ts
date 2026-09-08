const HANGUL_SYLLABLE = /[\uAC00-\uD7A3]/;
const HANGUL_PHRASE =
  /[\uAC00-\uD7A3]+(?:\s+[\uAC00-\uD7A3]+)*/g;

export function hasHangul(text: string): boolean {
  return HANGUL_SYLLABLE.test(text);
}

/** Pull contiguous Hangul phrases from mixed bold labels (e.g. "우리 (Woori)" → "우리"). */
export function extractHangulSpeech(text: string): string {
  const phrases = text.match(HANGUL_PHRASE);
  return phrases?.join(" ").trim() ?? "";
}
