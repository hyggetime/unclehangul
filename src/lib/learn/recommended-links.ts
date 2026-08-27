import { CHANNEL_LINKS } from "@/lib/channels";

export type RecommendedLink = {
  href: string;
  label: string;
  description: string;
  external?: boolean;
};

/** Learn sidebar & mobile chips — learning + channels only. */
export const LEARN_RECOMMENDED_LINKS: readonly RecommendedLink[] = [
  {
    href: "/#name-converter",
    label: "Name → Hangul",
    description: "Try on the home page",
  },
  {
    href: "/play",
    label: "Hangul Play",
    description: "Widgets & mini games",
  },
  {
    href: "/watch",
    label: "Watch",
    description: "Instagram & YouTube",
  },
  {
    href: CHANNEL_LINKS[1].href,
    label: "Uncle Hangul TV",
    description: "YouTube channel",
    external: true,
  },
];
