import { buildPageMetadata } from "@/lib/site-metadata";

export function getEmsAddressMetadata() {
  return buildPageMetadata({
    title: "해외 주소 EMS 변환기 | 한글아저씨",
    description:
      "해외 영문 주소를 우체국 계약EMS 입력 폼(Country, Zipcode, City, State, Line1, Line2) 규격으로 실시간 분할합니다.",
    path: "/tools/ems-address",
    absoluteTitle: true,
  });
}
