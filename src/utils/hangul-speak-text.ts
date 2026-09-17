const HANGUL_SYLLABLE = /[\uAC00-\uD7A3]/;
const HANGUL_RUN = /[\uAC00-\uD7A3]+(?:\s+[\uAC00-\uD7A3]+)*/g;

export type SpeechSegment =
  | { kind: "text"; value: string }
  | { kind: "speak"; value: string };

export function hasHangul(text: string): boolean {
  return HANGUL_SYLLABLE.test(text);
}

/** Pull contiguous Hangul phrases from mixed labels (e.g. "Tiger (호랑이)" → "호랑이"). */
export function extractHangulSpeech(text: string): string {
  const phrases = text.match(HANGUL_RUN);
  return phrases?.join(" ").trim() ?? "";
}

/**
 * Split mixed bold labels into plain text and tap-to-listen Hangul runs.
 * English emphasis stays text; only Hangul syllable runs become speak segments.
 */
export function segmentForSpeech(text: string): SpeechSegment[] {
  if (!text) return [];

  const segments: SpeechSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(HANGUL_RUN)) {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      segments.push({ kind: "text", value: text.slice(lastIndex, index) });
    }

    segments.push({ kind: "speak", value: match[0] });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ kind: "text", value: text.slice(lastIndex) });
  }

  return segments.length ? segments : [{ kind: "text", value: text }];
}
