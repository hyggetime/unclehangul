import type { ToolUsageGuide } from "@/lib/tools/usage-guide";

export const KR_ADDRESS_USAGE: ToolUsageGuide = {
  ko: {
    title: "Korean Address Converter 사용법",
    intro:
      "외국인 시점의 영문 한국 주소를 붙여 넣으면 시·도 → 구 → 읍·면·동 → 세부주소 순으로 나누고, 한글 주소도 함께 보여줍니다.",
    steps: [
      {
        title: "1. 영문 주소 붙여넣기",
        body: "예: 8F Room 801, 19-4 Seogang-ro, Mapo-gu, Seoul, 04058. 줄바꿈·쉼표가 있어도 됩니다.",
      },
      {
        title: "2. 필드 확인",
        body: "Province(시·도), District(구), Locality(읍·면·동), Detail(세부주소), ZIP, Korean address(한글)가 자동 분할됩니다.",
      },
      {
        title: "3. 복사 · 라벨",
        body: "각 칸 Copy로 해외 쇼핑몰·배송 폼에 붙여 넣거나, 하단 Dual-language label을 인쇄하세요.",
      },
    ],
    tip: "한국에서 해외로 보낼 때는 Overseas Address Converter를 사용하세요.",
  },
  en: {
    title: "How to use Korean Address Converter",
    intro:
      "Paste a Korean address written in English. The tool splits it into Province → District → Locality → Detail and shows the Hangul version beside it.",
    steps: [
      {
        title: "1. Paste the English address",
        body: "Example: 8F Room 801, 19-4 Seogang-ro, Mapo-gu, Seoul, 04058. Line breaks and commas are fine.",
      },
      {
        title: "2. Review the split fields",
        body: "Check Province / Metro, District, Town·Dong, Detail, ZIP, and the combined Korean address line.",
      },
      {
        title: "3. Copy or print",
        body: "Copy each field into your checkout form, or print the dual-language label for the box.",
      },
    ],
    tip: "Shipping FROM Korea to another country? Use the Overseas Address Converter in the banner above.",
  },
};
