import {
  getKoreanAddressConverterUrl,
  getOverseasAddressConverterUrl,
  getPackOptimizerUrl,
} from "@/lib/domains";
import { getPublishedCatalogEntries } from "@/lib/tools/launch-rules";

export type ToolCategory =
  | "LANG"
  | "DESIGN"
  | "UTIL"
  | "AUTO"
  | "MEDIA";

export type ToolCatalogSection = "language" | "seller";

export type ToolEntry = {
  number: string;
  category: ToolCategory;
  section: ToolCatalogSection;
  title: string;
  descriptionEn: string;
  descriptionKo: string;
  href: string;
  /** Opens in new tab; used for pack/tools subdomains. */
  external?: boolean;
  /** When false, hidden from catalog, nav cross-links, and sitemap helpers. */
  published?: boolean;
};

/** Extensible catalog — append entries; categories stay typography-only. */
export const TOOLS_CATALOG: ToolEntry[] = [
  {
    number: "01",
    category: "LANG",
    section: "language",
    title: "Name Converter",
    descriptionEn:
      "Real-time English-to-Hangul transliteration. Type a name and read the phonetic match instantly.",
    descriptionKo:
      "영문 이름을 입력하면 한글 음차 결과를 실시간으로 확인합니다.",
    href: "/#name-converter",
  },
  {
    number: "02",
    category: "UTIL",
    section: "seller",
    title: "Pack Optimizer",
    descriptionEn:
      "3D carton packing on pack.unclehangul.com — K-Packet split vs EMS volumetric weight.",
    descriptionKo:
      "pack.unclehangul.com에서 3D 패킹·K-Packet·EMS 시뮬레이션.",
    href: getPackOptimizerUrl(),
    external: true,
  },
  {
    number: "03",
    category: "UTIL",
    section: "seller",
    title: "Overseas Address Converter",
    descriptionEn:
      "Split overseas English addresses into EMS, DHL, and FedEx form fields in real time.",
    descriptionKo:
      "해외 영문 주소를 EMS·DHL·FedEx 입력 규격(Country, Zipcode, City, State, Line1, Line2)으로 분할합니다.",
    href: getOverseasAddressConverterUrl(),
    external: true,
  },
  {
    number: "04",
    category: "UTIL",
    section: "seller",
    title: "Korean Address Converter",
    descriptionEn:
      "Convert a Korean street address into English Line 1, Line 2, City, State, and ZIP for inbound shipping forms.",
    descriptionKo:
      "영문 한국 주소를 시·도·구·세부주소로 나누고 한글 주소를 함께 표시합니다.",
    href: getKoreanAddressConverterUrl(),
    external: true,
  },
];

/** Unpublished tools — not listed until shipped. */
export const TOOLS_CATALOG_DRAFT: ToolEntry[] = [
  {
    number: "—",
    category: "AUTO",
    section: "seller",
    title: "Workflow Automator",
    descriptionEn:
      "n8n-powered routines for repetitive publishing, file, and notification tasks.",
    descriptionKo:
      "n8n 기반으로 반복 작업을 묶어 실행하는 자동화 유틸리티입니다.",
    href: "/tools/workflow-automator",
    published: false,
  },
];

export function formatCategoryTag(category: ToolCategory): string {
  return `[${category}]`;
}

export function getPublishedTools(): ToolEntry[] {
  return getPublishedCatalogEntries(TOOLS_CATALOG);
}

export function getLanguageTools(): ToolEntry[] {
  return getPublishedTools().filter((tool) => tool.section === "language");
}

export function getSellerTools(): ToolEntry[] {
  return getPublishedTools().filter((tool) => tool.section === "seller");
}
