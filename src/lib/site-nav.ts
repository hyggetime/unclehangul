export type SiteNavItem = {
  href: string;
  title: string;
  descriptionKo: string;
};

/** Primary sections — main site only (no seller tools). */
export const PRIMARY_NAV_ITEMS: readonly SiteNavItem[] = [
  {
    href: "/learn",
    title: "Learn",
    descriptionKo: "글로 익히는 한글·어휘.",
  },
  {
    href: "/play",
    title: "Hangul Play",
    descriptionKo: "이름·도시·자모 — 짧은 위젯.",
  },
  {
    href: "/watch",
    title: "Watch",
    descriptionKo: "인스타·유튜브 채널.",
  },
] as const;
