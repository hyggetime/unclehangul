import { getEmsAddressUrl } from "@/lib/domains";

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
    href: getEmsAddressUrl(),
    label: "EMS Address",
    description: "Contract EMS fields",
    external: true,
  },
  {
    href: "/tools#seller-tools",
    label: "Seller Tools",
    description: "Shipping & logistics",
  },
  {
    href: "https://www.youtube.com/@unclehangul",
    label: "Uncle Hangul TV",
    description: "Video lessons",
    external: true,
  },
];
