import { buildPageMetadata } from "@/lib/site-metadata";

export function getPackOptimizerMetadata() {
  return buildPageMetadata({
    title:
      "국제 배송비 최적화 3D 계산기 (K-Packet 쪼개기 & EMS) | 한글아저씨",
    description:
      "글로벌 셀러를 위한 배송비 절감 솔루션. 우체국 K-Packet 분할 배송 및 EMS 부피무게 청구 리스크를 3D 알고리즘으로 계산하여 최적의 물류 전략을 제안합니다.",
    path: "/tools/pack-optimizer",
    absoluteTitle: true,
  });
}
