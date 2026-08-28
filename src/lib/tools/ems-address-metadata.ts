import { buildPageMetadata } from "@/lib/site-metadata";
import { getEmsAddressUrl, getToolsSiteUrl } from "@/lib/domains";
import { sellerToolKeywords } from "@/lib/seo/keywords";

export function getEmsAddressMetadata() {
  const toolsOrigin = getToolsSiteUrl();

  return buildPageMetadata({
    title:
      "해외 주소 EMS 변환기 (계약EMS Country·Zipcode·City·State·Line1·Line2) | 한글아저씨",
    description:
      "해외 영문 주소를 우체국 계약EMS 입력 폼(Country, Zipcode, City, State, Line1, Line2) 규격으로 실시간 분할·정제. 영국·미국·일본 등 10개국 지원. Uncle Hangul (Unclehangul) 무료 웹 도구.",
    path: "/ems-address",
    siteOrigin: toolsOrigin,
    canonicalUrl: getEmsAddressUrl(),
    absoluteTitle: true,
    locale: "ko_KR",
    keywords: sellerToolKeywords([
      "EMS 주소 변환",
      "계약EMS",
      "우체국 EMS",
      "해외주소 입력",
      "영문주소 분할",
      "Contract EMS",
      "Country Zipcode City State Line1 Line2",
      "해외배송 주소",
      "우편번호 검증",
      "Korea Post EMS",
    ]),
  });
}
