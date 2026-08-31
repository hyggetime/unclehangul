import { buildPageMetadata } from "@/lib/site-metadata";
import {
  getOverseasAddressConverterUrl,
  getToolsSiteUrl,
} from "@/lib/domains";
import { sellerToolKeywords } from "@/lib/seo/keywords";

export function getOverseasAddressConverterMetadata() {
  const toolsOrigin = getToolsSiteUrl();

  return buildPageMetadata({
    title:
      "Overseas Address Converter — EMS · DHL · FedEx | UncleHangul",
    description:
      "영문 해외 주소를 우체국 EMS, DHL, FedEx 입력 필드(Country, Zipcode, City, State, Line1, Line2)로 자동 분할하고 박스 부착용 배송 라벨을 즉시 출력하세요.",
    path: "/overseas-address-converter",
    siteOrigin: toolsOrigin,
    canonicalUrl: getOverseasAddressConverterUrl(),
    absoluteTitle: true,
    locale: "ko_KR",
    keywords: sellerToolKeywords([
      "해외주소 변환기",
      "우체국 EMS 주소 입력",
      "해외주소 쪼개기",
      "영문주소 Line1 Line2",
      "EMS 배송라벨 출력",
      "EMS 주소 변환",
      "DHL 주소 입력",
      "FedEx 주소 변환",
      "계약EMS",
      "해외배송 주소",
      "Korea Post EMS",
    ]),
  });
}
