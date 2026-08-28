import { EmsAddressConverter } from "@/components/tools/EmsAddressConverter";
import { EmsAddressSeoContent } from "@/components/tools/EmsAddressSeoContent";
import { UtilityToolLayout } from "@/components/tools/UtilityToolLayout";
import { getEmsAddressUrl } from "@/lib/domains";
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
      title="해외 주소 EMS 변환기"
      subtitleEn="EMS Address Converter · Contract EMS fields"
      descriptionKo={
        <>
          해외 영문 주소를 우체국{" "}
          <span className="font-en">Contract EMS</span> 입력 칸{" "}
          <span className="font-en">
            Country, Zipcode, City, State, Line1, Line2
          </span>
          에 맞게 실시간으로 나누고 특수문자·악센트를 정리합니다.
        </>
      }
      descriptionEn="Paste an overseas English address. Split into Korea Post contract-EMS fields with per-field copy—GB, FR, NL, BE, SE, DE, US, JP, CA, AU."
      primary={<EmsAddressConverter />}
      seo={<EmsAddressSeoContent />}
      feedback={{ contentType: "tool", contentId: "ems-address" }}
      share={{
        title: "해외 주소 EMS 변환기 | 한글아저씨",
        url: getEmsAddressUrl(),
        contentId: "ems-address",
      }}
      usageGuide={EMS_ADDRESS_USAGE}
    />
  );
}
