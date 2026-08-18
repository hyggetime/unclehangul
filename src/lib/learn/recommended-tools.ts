export type RecommendedTool = {
  href: string;
  label: string;
  description: string;
  external?: boolean;
};

export const RECOMMENDED_TOOLS: readonly RecommendedTool[] = [
  {
    href: "/#name-converter",
    label: "Name → Hangul",
    description: "English name converter",
  },
  {
    href: "/tools",
    label: "Hangul Tools",
    description: "Practice utilities",
  },
  {
    href: "https://www.youtube.com/@unclehangul",
    label: "Uncle Hangul TV",
    description: "Video lessons",
    external: true,
  },
];
