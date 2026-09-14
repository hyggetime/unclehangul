/** Korean zodiac (띠) — 12-year cycle aligned with lunar Seollal boundaries. */

export type ZodiacAnimalId =
  | "rat"
  | "ox"
  | "tiger"
  | "rabbit"
  | "dragon"
  | "snake"
  | "horse"
  | "goat"
  | "monkey"
  | "rooster"
  | "dog"
  | "pig";

export type ZodiacAnimal = {
  id: ZodiacAnimalId;
  english: string;
  hangul: string;
  romanization: string;
  emoji: string;
  /** Full polite sentence — 저는 …띠예요 */
  sentence: string;
};

export const ZODIAC_ANIMALS: readonly ZodiacAnimal[] = [
  {
    id: "rat",
    english: "Rat",
    hangul: "쥐",
    romanization: "Jwi",
    emoji: "🐭",
    sentence: "저는 쥐띠예요",
  },
  {
    id: "ox",
    english: "Ox",
    hangul: "소",
    romanization: "So",
    emoji: "🐮",
    sentence: "저는 소띠예요",
  },
  {
    id: "tiger",
    english: "Tiger",
    hangul: "호랑이",
    romanization: "Ho-rang-i",
    emoji: "🐯",
    sentence: "저는 호랑이띠예요",
  },
  {
    id: "rabbit",
    english: "Rabbit",
    hangul: "토끼",
    romanization: "To-kki",
    emoji: "🐰",
    sentence: "저는 토끼띠예요",
  },
  {
    id: "dragon",
    english: "Dragon",
    hangul: "용",
    romanization: "Yong",
    emoji: "🐲",
    sentence: "저는 용띠예요",
  },
  {
    id: "snake",
    english: "Snake",
    hangul: "뱀",
    romanization: "Baem",
    emoji: "🐍",
    sentence: "저는 뱀띠예요",
  },
  {
    id: "horse",
    english: "Horse",
    hangul: "말",
    romanization: "Mal",
    emoji: "🐴",
    sentence: "저는 말띠예요",
  },
  {
    id: "goat",
    english: "Goat",
    hangul: "양",
    romanization: "Yang",
    emoji: "🐑",
    sentence: "저는 양띠예요",
  },
  {
    id: "monkey",
    english: "Monkey",
    hangul: "원숭이",
    romanization: "Won-sung-i",
    emoji: "🐵",
    sentence: "저는 원숭이띠예요",
  },
  {
    id: "rooster",
    english: "Rooster",
    hangul: "닭",
    romanization: "Dak",
    emoji: "🐔",
    sentence: "저는 닭띠예요",
  },
  {
    id: "dog",
    english: "Dog",
    hangul: "개",
    romanization: "Gae",
    emoji: "🐶",
    sentence: "저는 개띠예요",
  },
  {
    id: "pig",
    english: "Pig",
    hangul: "돼지",
    romanization: "Dwae-ji",
    emoji: "🐷",
    sentence: "저는 돼지띠예요",
  },
] as const;

/** Seollal (lunar new year) — zodiac year starts on this date (KST). */
const SEOLLAL: Record<number, [month: number, day: number]> = {
  1970: [2, 6],
  1971: [1, 27],
  1972: [2, 15],
  1973: [2, 3],
  1974: [1, 23],
  1975: [2, 11],
  1976: [1, 31],
  1977: [2, 18],
  1978: [2, 7],
  1979: [1, 28],
  1980: [2, 16],
  1981: [2, 5],
  1982: [1, 25],
  1983: [2, 13],
  1984: [2, 2],
  1985: [2, 20],
  1986: [2, 9],
  1987: [1, 29],
  1988: [2, 17],
  1989: [2, 6],
  1990: [1, 27],
  1991: [2, 15],
  1992: [2, 4],
  1993: [1, 23],
  1994: [2, 10],
  1995: [1, 31],
  1996: [2, 19],
  1997: [2, 7],
  1998: [1, 28],
  1999: [2, 16],
  2000: [2, 5],
  2001: [1, 24],
  2002: [2, 12],
  2003: [2, 1],
  2004: [1, 22],
  2005: [2, 9],
  2006: [1, 29],
  2007: [2, 18],
  2008: [2, 7],
  2009: [1, 26],
  2010: [2, 14],
  2011: [2, 3],
  2012: [1, 23],
  2013: [2, 10],
  2014: [1, 31],
  2015: [2, 19],
  2016: [2, 8],
  2017: [1, 28],
  2018: [2, 16],
  2019: [2, 5],
  2020: [1, 25],
  2021: [2, 12],
  2022: [2, 1],
  2023: [1, 22],
  2024: [2, 10],
  2025: [1, 29],
  2026: [2, 17],
  2027: [2, 6],
  2028: [1, 26],
  2029: [2, 13],
  2030: [2, 3],
};

const DEFAULT_SEOLLAL: [number, number] = [2, 5];

function seollalOf(zodiacYear: number): Date {
  const [month, day] = SEOLLAL[zodiacYear] ?? DEFAULT_SEOLLAL;
  return new Date(`${zodiacYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00+09:00`);
}

/** Zodiac year index: 0 = Rat (e.g. 2020, 2008). */
function zodiacIndexForYear(year: number): number {
  return ((year - 4) % 12 + 12) % 12;
}

export function getZodiacAnimalForBirthDate(input: Date): ZodiacAnimal | null {
  if (Number.isNaN(input.getTime())) return null;

  const y = input.getFullYear();
  const m = input.getMonth() + 1;
  const d = input.getDate();
  const birth = new Date(`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T12:00:00+09:00`);

  let zodiacYear = y;
  if (birth < seollalOf(y)) {
    zodiacYear = y - 1;
  }

  if (zodiacYear < 1900 || zodiacYear > 2100) return null;

  return ZODIAC_ANIMALS[zodiacIndexForYear(zodiacYear)] ?? null;
}
