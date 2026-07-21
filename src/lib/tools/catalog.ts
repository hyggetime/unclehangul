export type ToolCategory =
  | "LANG"
  | "DESIGN"
  | "UTIL"
  | "AUTO"
  | "MEDIA";

export type ToolEntry = {
  number: string;
  category: ToolCategory;
  title: string;
  descriptionEn: string;
  descriptionKo: string;
  href: string;
};

/** Extensible catalog — append entries; categories stay typography-only. */
export const TOOLS_CATALOG: ToolEntry[] = [
  {
    number: "01",
    category: "LANG",
    title: "Name Converter",
    descriptionEn:
      "Real-time English-to-Hangul transliteration. Type a name and read the phonetic match instantly.",
    descriptionKo:
      "영문 이름을 입력하면 한글 음차 결과를 실시간으로 확인합니다.",
    href: "/#name-converter",
  },
  {
    number: "02",
    category: "DESIGN",
    title: "Type & Grid Tester",
    descriptionEn:
      "A minimal typography and layout lab for 0.5px grids, scale, and hairline rhythm.",
    descriptionKo:
      "미니멀 타이포그래피와 격자 레이아웃을 실험하는 디자인 샌드박스입니다.",
    href: "/tools/type-grid-tester",
  },
  {
    number: "03",
    category: "UTIL",
    title: "Workflow Automator",
    descriptionEn:
      "n8n-powered routines for repetitive publishing, file, and notification tasks.",
    descriptionKo:
      "n8n 기반으로 반복 작업을 묶어 실행하는 자동화 유틸리티입니다.",
    href: "/tools/workflow-automator",
  },
];

export function formatCategoryTag(category: ToolCategory): string {
  return `[${category}]`;
}
