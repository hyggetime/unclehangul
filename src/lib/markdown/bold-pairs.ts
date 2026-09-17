import { hasHangul } from "@/utils/hangul-speak-text";

export type BoldPair = {
  start: number;
  end: number;
  inner: string;
};

/**
 * Bold spans whose inner text does not contain another `**` marker.
 * Avoids fragmenting labels like `**Years (**년**)**` into `Years (` + `)`.
 */
export function findNonNestedBoldPairs(text: string): BoldPair[] {
  const pairs: BoldPair[] = [];

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

/**
 * Leftmost non-nested bold span. When several spans contain Hangul (nested markers),
 * prefer Hangul-bearing spans so `**Years (**년**)**` resolves to `년` first.
 */
export function findNextBoldPair(text: string): BoldPair | null {
  const pairs = findNonNestedBoldPairs(text).filter((pair) => pair.inner.length > 0);
  if (!pairs.length) return null;

  const hangulPairs = pairs.filter((pair) => hasHangul(pair.inner));
  const candidates = hangulPairs.length > 0 ? hangulPairs : pairs;

  return candidates.reduce((best, pair) =>
    pair.start < best.start ? pair : best,
  );
}
