export type SiteNavItem = {
  href: string;
  title: string;
  descriptionKo: string;
};

/** Primary sections linked from header drawer and home menu. */
export const PRIMARY_NAV_ITEMS: readonly SiteNavItem[] = [
  {
    href: "/learn",
    title: "Learn",
    descriptionKo: "자모부터 문장까지, 선명하게.",
  },
  {
    href: "/tools",
    title: "Tools",
    descriptionKo: "발음·읽기·쓰기 실전 도구.",
  },
  {
    href: "/#name-converter",
    title: "Name → Hangul",
    descriptionKo: "영문 이름을 한글로 변환.",
  },
] as const;
