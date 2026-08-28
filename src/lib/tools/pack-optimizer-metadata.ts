import { buildPageMetadata } from "@/lib/site-metadata";
import { getPackOptimizerUrl, getPackSiteUrl } from "@/lib/domains";
import { sellerToolKeywords } from "@/lib/seo/keywords";

/** SEO landing on unclehangul.com — canonical points to pack.unclehangul.com. */
export function getPackOptimizerLandingMetadata() {
  return buildPageMetadata({
    title:
      "국제 배송비 최적화 3D 계산기 (K-Packet 쪼개기 & EMS 부피무게) | 한글아저씨",
    description:
      "글로벌 셀러를 위한 배송비 절감 솔루션. Uncle Hangul (Unclehangul) Pack Optimizer — 우체국 K-Packet 분할 배송 및 EMS 부피무게(체적중량) 청구 리스크를 3D 알고리즘으로 계산합니다.",
    path: "/tools/pack-optimizer",
    canonicalUrl: getPackOptimizerUrl(),
    absoluteTitle: true,
    locale: "ko_KR",
    keywords: sellerToolKeywords([
      "K-Packet 쪼개기",
      "K-Packet 분할 배송",
      "EMS 부피무게",
      "체적중량",
      "3D packing",
      "해외 배송비 절감",
      "국제 배송비 계산기",
      "우체국 EMS",
      "박스 적재 최적화",
      "volumetric weight",
    ]),
  });
}

/** Canonical metadata for the live app on pack.unclehangul.com (reference). */
export function getPackOptimizerAppMetadata() {
  return buildPageMetadata({
    title:
      "국제 배송비 최적화 3D 계산기 (K-Packet 쪼개기 & EMS 부피무게) | 한글아저씨",
    description:
      "글로벌 셀러를 위한 배송비 절감 솔루션. Uncle Hangul (Unclehangul) Pack Optimizer — 우체국 K-Packet 분할 배송 및 EMS 부피무게(체적중량) 청구 리스크를 3D 알고리즘으로 계산합니다.",
    path: "/pack-optimizer",
    siteOrigin: getPackSiteUrl(),
    canonicalUrl: getPackOptimizerUrl(),
    absoluteTitle: true,
    locale: "ko_KR",
    keywords: sellerToolKeywords([
      "K-Packet 쪼개기",
      "K-Packet 분할 배송",
      "EMS 부피무게",
      "체적중량",
      "3D packing",
      "해외 배송비 절감",
      "국제 배송비 계산기",
      "우체국 EMS",
      "박스 적재 최적화",
      "volumetric weight",
    ]),
  });
}
