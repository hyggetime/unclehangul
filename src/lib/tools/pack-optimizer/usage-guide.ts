import type { ToolUsageGuide } from "@/lib/tools/usage-guide";

export const PACK_OPTIMIZER_USAGE: ToolUsageGuide = {
  ko: {
    title: "Pack Optimizer 사용법",
    intro:
      "단일 SKU·박스 치수만 넣어도 K-Packet 분할 vs EMS 통합을 비교합니다. 값을 바꾸면 자동으로 다시 계산됩니다.",
    steps: [
      {
        title: "1. 상품·수량 입력",
        body: "가로·세로·높이(cm), 단품 무게(g), 수량(개)을 입력합니다. 직육면체 박스에 담긴 동일 SKU를 가정합니다.",
      },
      {
        title: "2. 목적지·완충재",
        body: "배송 국가를 고르고, 완충재·박스 두께 슬라이더(0.5–5 cm)로 실제 외경 여유를 반영합니다.",
      },
      {
        title: "3. 추천·두 트랙 비교",
        body: "상단 [추천] 카드와 K-Packet / EMS 카드를 비교합니다. 박스 개수·청구 중량·예상 비용을 확인하세요.",
      },
      {
        title: "4. 박스 추천·발송 전",
        body: "하단 ‘물류 조달’에서 주문제작 치수·우체국 박스 규격을 봅니다. 출고 전 우체국 견적과 대조하고, 주소는 EMS Address Converter로 나눕니다.",
      },
    ],
    tip: "결과는 참고용입니다. 통관·할증·수령국 규정은 반영되지 않을 수 있습니다.",
  },
  en: {
    title: "How to use Pack Optimizer",
    intro:
      "Enter one SKU and carton size to compare split K-Packet vs a single EMS shipment. Results refresh as you edit.",
    steps: [
      {
        title: "1. Product & quantity",
        body: "Set width, length, height (cm), unit weight (g), and quantity. Assumes identical items in a rectangular carton.",
      },
      {
        title: "2. Destination & padding",
        body: "Pick the destination country. Adjust the padding slider (0.5–5 cm) for bubble wrap and box wall thickness.",
      },
      {
        title: "3. Recommendation & compare",
        body: "Read the top recommendation, then compare K-Packet split vs EMS bundle cards—box count, billable weight, and cost.",
      },
      {
        title: "4. Box sourcing & before ship",
        body: "Check custom vs post-office box sizes at the bottom. Confirm rates with Korea Post before dispatch; split addresses with EMS Address Converter.",
      },
    ],
    tip: "Outputs are planning estimates only—not official quotes. Customs, surcharges, and country rules may differ.",
  },
};
