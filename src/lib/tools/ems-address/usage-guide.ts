import type { ToolUsageGuide } from "@/lib/tools/usage-guide";

export const EMS_ADDRESS_USAGE: ToolUsageGuide = {
  ko: {
    title: "EMS Address Converter 사용법",
    intro:
      "해외 영문 주소를 붙여 넣으면 우체국 계약 EMS 여섯 칸으로 나눕니다. 필드별 복사로 발송 화면에 바로 붙여 넣으세요.",
    steps: [
      {
        title: "1. 주소 붙여넣기",
        body: "수취인 영문 주소 전체를 입력란에 붙여 넣습니다. 줄바꿈·쉼표가 있어도 됩니다.",
      },
      {
        title: "2. 필드 확인",
        body: "Country, Zipcode, City, State, Line1, Line2가 자동 분할됩니다. 각 칸 옆 Copy로 복사합니다.",
      },
      {
        title: "3. 특수문자·악센트",
        body: "EMS 입력에 맞게 악센트 등이 정리됩니다. 우체국 화면과 다르면 Line1/2만 수동 조정하세요.",
      },
    ],
    tip: "GB·FR·DE·US·JP 등 주요국 규칙을 반영하지만, 최종 접수는 우체국 시스템 기준입니다.",
  },
  en: {
    title: "How to use EMS Address Converter",
    intro:
      "Paste an overseas address in English. The tool splits it into Korea Post Contract EMS fields—copy each one into your shipping form.",
    steps: [
      {
        title: "1. Paste the address",
        body: "Paste the full recipient address. Line breaks and commas are fine.",
      },
      {
        title: "2. Review fields",
        body: "Check Country, Zipcode, City, State, Line1, Line2. Use Copy on each field you need.",
      },
      {
        title: "3. Accents & cleanup",
        body: "Accents are normalized for EMS entry. If the post office UI differs, tweak Line1/Line2 only.",
      },
    ],
    tip: "Rules cover GB, FR, DE, US, JP, and more—but always confirm in the official post system.",
  },
};
