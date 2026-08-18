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
    category: "UTIL",
    title: "Pack Optimizer",
    descriptionEn:
      "Logistics pack optimization—carton and load planning powered by pack.unclehangul.com.",
    descriptionKo:
      "물류 적재·박스 배치를 최적화하는 패킹 엔진 위젯입니다.",
    href: "/tools/pack-optimizer",
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
  {
    number: "04",
    category: "UTIL",
    title: "EMS Address Converter",
    descriptionEn:
      "Split overseas English addresses into Korea Post contract-EMS fields in real time.",
    descriptionKo:
      "해외 영문 주소를 우체국 계약EMS 입력 규격(Country, Zipcode, City, State, Line1, Line2)으로 분할합니다.",
    href: "/tools/ems-address",
  },
];

export function formatCategoryTag(category: ToolCategory): string {
  return `[${category}]`;
}
