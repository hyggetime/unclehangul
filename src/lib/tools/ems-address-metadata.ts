import { buildPageMetadata } from "@/lib/site-metadata";
import { getEmsAddressUrl, getToolsSiteUrl } from "@/lib/domains";
import { sellerToolKeywords } from "@/lib/seo/keywords";

export function getEmsAddressMetadata() {
  const toolsOrigin = getToolsSiteUrl();

  return buildPageMetadata({
    title: "우체국 EMS 해외 주소 변환기 및 배송 라벨 생성기 | UncleHangul",
    description:
      "영문 주소를 우체국 EMS, DHL, FedEx 전용 입력 필드(Line 1, Line 2, Zip)로 자동 분할하고 박스 부착용 라벨을 즉시 출력하세요.",
    path: "/ems-address",
    siteOrigin: toolsOrigin,
    canonicalUrl: getEmsAddressUrl(),
    absoluteTitle: true,
    locale: "ko_KR",
    keywords: sellerToolKeywords([
      "우체국 EMS 주소 입력",
      "해외주소 쪼개기",
      "영문주소 Line1 Line2",
      "EMS 배송라벨 출력",
      "EMS 주소 변환",
      "계약EMS",
      "해외배송 주소",
      "배송 라벨 생성",
      "Korea Post EMS",
    ]),
  });
}
