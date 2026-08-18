import { EmsAddressConverter } from "@/components/tools/EmsAddressConverter";
import { EmsAddressSeoContent } from "@/components/tools/EmsAddressSeoContent";
import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { ToolPageHeader } from "@/components/tools/ToolPageHeader";
import { getEmsAddressMetadata } from "@/lib/tools/ems-address-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = getEmsAddressMetadata();

export default function EmsAddressPage() {
  return (
    <div className="md:col-span-12 min-w-0 w-full">
      <ToolPageChrome category="EMS Address" />

      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <ToolPageHeader
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
        />

        <div className="pt-6 md:pt-8">
          <EmsAddressConverter />
        </div>
      </div>

      <EmsAddressSeoContent />
    </div>
  );
}
