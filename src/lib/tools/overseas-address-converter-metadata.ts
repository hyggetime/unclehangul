import { buildPageMetadata } from "@/lib/site-metadata";
import {
  getOverseasAddressConverterUrl,
  getToolsSiteUrl,
} from "@/lib/domains";

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
  });
}
