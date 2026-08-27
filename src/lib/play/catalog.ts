export type PlayWidgetStatus = "live" | "coming-soon";

export type PlayWidget = {
  slug: string;
  title: string;
  titleKo: string;
  descriptionEn: string;
  descriptionKo: string;
  status: PlayWidgetStatus;
  /** Live widgets may point off-page (e.g. `/#name-converter`). */
  href?: string;
  /** Short label for home chips. */
  chipLabel: string;
};

export const PLAY_WIDGETS: readonly PlayWidget[] = [
  {
    slug: "name-converter",
    title: "Name → Hangul",
    titleKo: "이름 → 한글",
    descriptionEn: "Type an English name and see it in Hangul blocks.",
    descriptionKo: "영문 이름을 한글 블록으로 변환합니다.",
    status: "live",
    href: "/#name-converter",
    chipLabel: "Name",
  },
  {
    slug: "city-names",
    title: "City Names",
    titleKo: "도시 이름 듣기",
    descriptionEn:
      "How do you read Seoul, Paris, or Tokyo in Korean? Type a place and hear it.",
    descriptionKo: "서울, 파리, 도쿄… 도시 이름을 한글로 표기하고 들어 봅니다.",
    status: "live",
    href: "/play/city-names",
    chipLabel: "Cities",
  },
  {
    slug: "jamo-builder",
    title: "Jamo Builder",
    titleKo: "초·중·종성 조합",
    descriptionEn:
      "Combine initial, medial, and final jamo into syllable tiles — then hear the sound.",
    descriptionKo: "초성·중성·종성을 맞춰 음절 블록을 만들고 소리를 들어 봅니다.",
    status: "live",
    href: "/play/jamo-builder",
    chipLabel: "Jamo",
  },
] as const;

export function getPlayWidget(slug: string): PlayWidget | undefined {
  return PLAY_WIDGETS.find((widget) => widget.slug === slug);
}

export function getComingSoonPlayWidgets(): PlayWidget[] {
  return PLAY_WIDGETS.filter((widget) => widget.status === "coming-soon");
}

export function getPlayHubWidgets(): PlayWidget[] {
  return [...PLAY_WIDGETS];
}
