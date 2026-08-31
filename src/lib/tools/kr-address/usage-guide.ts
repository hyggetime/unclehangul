import type { ToolUsageGuide } from "@/lib/tools/usage-guide";

export const KR_ADDRESS_USAGE: ToolUsageGuide = {
  ko: {
    title: "한국 주소 영문 변환기 사용법",
    intro:
      "한글 도로명 주소를 검색하면 해외 쇼핑몰 폼(Address Line 1·2, City, State, ZIP)에 맞게 나눕니다. 박스에는 한글·영문 이중 라벨을 붙이세요.",
    steps: [
      {
        title: "1. 한글 도로명으로 검색",
        body: "예: 마포구 서강로 19-4. 행정안전부 주소 API 결과에서 정확한 항목을 선택합니다.",
      },
      {
        title: "2. 상세주소 입력",
        body: "동·층·호수를 입력하면 Line 2가 영문으로 정리됩니다. 예: 8층 801호 → 8F, Room 801.",
      },
      {
        title: "3. 필드 복사 · 라벨 출력",
        body: "각 칸 옆 Copy로 Amazon·iHerb 등에 붙여 넣고, 배송 라벨을 복사하거나 인쇄합니다.",
      },
    ],
    tip: "한국에서 해외로 보내는 경우에는 상단 배너의 EMS Overseas Address Parser를 사용하세요.",
  },
  en: {
    title: "How to use the Korean address formatter",
    intro:
      "Search a Korean street address, then copy the five overseas form fields. Print a bilingual label so local couriers can read the Korean line.",
    steps: [
      {
        title: "1. Search in Korean",
        body: "Type a road-name address (e.g. 마포구 서강로 19-4) and pick the official result.",
      },
      {
        title: "2. Add unit / floor / room",
        body: "Line 2 is romanized automatically — 8층 801호 becomes 8F, Room 801.",
      },
      {
        title: "3. Copy fields or print the label",
        body: "Copy each field into Amazon, iHerb, or any checkout form. Attach the dual-language label to the box.",
      },
    ],
    tip: "Shipping FROM Korea to another country? Use the EMS Overseas Address Parser in the banner above.",
  },
};
