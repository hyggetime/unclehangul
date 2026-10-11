import { CHO, JONG, JUNG, composeHangul } from "@/lib/hangul/syllables";

/** Beginner set — full jamo picker may come in a later “extended” widget. */
export const BASIC_CHO = [
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

export const BASIC_JUNG = [
  "ㅏ",
  "ㅑ",
  "ㅓ",
  "ㅕ",
  "ㅗ",
  "ㅛ",
  "ㅜ",
  "ㅠ",
  "ㅡ",
  "ㅣ",
] as const;

/** Empty first, then single basic consonants only (no compound batchim). */
export const BASIC_JONG = [
  "",
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

function indexIn<T extends readonly string[]>(
  list: T,
  value: string,
): number {
  const i = list.indexOf(value);
  if (i < 0) throw new Error(`Jamo ${value} not in list`);
  return i;
}

export function composeBasicHangul(
  choBasicIndex: number,
  jungBasicIndex: number,
  jongBasicIndex: number,
): string {
  const cho = indexIn(CHO, BASIC_CHO[choBasicIndex] ?? BASIC_CHO[0]);
  const jung = indexIn(JUNG, BASIC_JUNG[jungBasicIndex] ?? BASIC_JUNG[0]);
  const jong = indexIn(JONG, BASIC_JONG[jongBasicIndex] ?? BASIC_JONG[0]);
  return composeHangul(cho, jung, jong);
}
