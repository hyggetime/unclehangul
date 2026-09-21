export type SeriesEntry = {
  slug: string;
  volume: number;
  /** Short label used in the series navigation strip. */
  shortTitle: string;
  /** One line on what this volume covers. */
  blurbKo: string;
};

export type Series = {
  id: string;
  name: string;
  nameKo: string;
  taglineEn: string;
  taglineKo: string;
  entries: readonly SeriesEntry[];
};

export const K_DICTIONARY: Series = {
  id: "k-dictionary",
  name: "K-Dictionary",
  nameKo: "케이 사전",
  taglineEn:
    "A four-part series on Korean words that resist translation — what they mean, where the English equivalent breaks, and how they are actually used.",
  taglineKo:
    "번역되지 않는 한국어 단어를 다루는 4부작입니다. 무슨 뜻인지, 영어 대응어가 어디서 깨지는지, 실제로 어떻게 쓰이는지를 봅니다.",
  entries: [
    {
      slug: "uncle-hangul-k-dictionary-vol-1-5-untranslatable-korean-words",
      volume: 1,
      shortTitle: "Words English gets wrong",
      blurbKo: "눈치, 정, 꼰대, 대박, TMI — 번역이 깨지는 지점",
    },
    {
      slug: "uncle-hangul-k-dictionary-vol-2-5-words-korean-social-dynamics",
      volume: 2,
      shortTitle: "From the table to the group chat",
      blurbKo: "식구, 회식, 갑질, 애교, 썸 — 관계가 움직이는 순서",
    },
    {
      slug: "uncle-hangul-k-dictionary-vol-3-5-words-deep-korean-emotions",
      volume: 3,
      shortTitle: "한, 흥, and the three complaints",
      blurbKo: "한, 흥, 답답해, 억울해, 서운해 — 감정의 양극과 일상",
    },
    {
      slug: "uncle-hangul-k-dictionary-vol-4-5-modern-slang-korean-young-people",
      volume: 4,
      shortTitle: "Slang is built, not borrowed",
      blurbKo: "갓생, 치맥, 불금, 내돈내산, 내로남불 — 조어 규칙 4가지",
    },
  ],
} as const;

const ALL_SERIES: readonly Series[] = [K_DICTIONARY];

export type SeriesContext = {
  series: Series;
  entry: SeriesEntry;
  total: number;
};

export function getSeriesContext(slug: string): SeriesContext | undefined {
  for (const series of ALL_SERIES) {
    const entry = series.entries.find((item) => item.slug === slug);
    if (entry) {
      return { series, entry, total: series.entries.length };
    }
  }
  return undefined;
}
