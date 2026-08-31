import { EmsAddressConverter } from "@/components/tools/EmsAddressConverter";
import { EmsAddressSeoContent } from "@/components/tools/EmsAddressSeoContent";
import { UtilityToolLayout } from "@/components/tools/UtilityToolLayout";
import {
  getEmsAddressUrl,
  getKrAddressFormatterUrl,
  getPackOptimizerUrl,
} from "@/lib/domains";
import { EMS_ADDRESS_USAGE } from "@/lib/tools/ems-address/usage-guide";

type EmsAddressToolViewProps = {
  backHref?: string;
  backLabel?: string;
};

export function EmsAddressToolView({
  backHref = "/",
  backLabel = "← Tools",
}: EmsAddressToolViewProps) {
  return (
    <UtilityToolLayout
      category="EMS Address"
      backHref={backHref}
      backLabel={backLabel}
      title="해외 주소 EMS 변환기 · 배송 라벨"
      subtitleEn="EMS Address Converter · Shipping Label"
      descriptionKo={
        <>
          해외 영문 주소를 우체국{" "}
          <span className="font-en">Contract EMS</span> 입력 칸에 맞게 나누고,
          박스 부착용 <span className="font-en">Shipping Label</span>을 즉시
          생성합니다.
        </>
      }
      descriptionEn="Split overseas addresses into Korea Post contract-EMS fields and print a box-ready shipping label—GB, FR, NL, BE, SE, DE, US, JP, CA, AU."
      crossLinks={[
        {
          href: getKrAddressFormatterUrl(),
          label: "KR Address ↗",
          external: true,
        },
        {
          href: getPackOptimizerUrl(),
          label: "Pack Optimizer ↗",
          external: true,
        },
      ]}
      primary={<EmsAddressConverter />}
      seo={<EmsAddressSeoContent />}
      feedback={{ contentType: "tool", contentId: "ems-address" }}
      share={{
        title: "우체국 EMS 해외 주소 변환기 및 배송 라벨 생성기 | 한글아저씨",
        url: getEmsAddressUrl(),
        contentId: "ems-address",
      }}
      usageGuide={EMS_ADDRESS_USAGE}
    />
  );
}
