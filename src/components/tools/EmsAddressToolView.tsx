import { EmsAddressConverter } from "@/components/tools/EmsAddressConverter";
import { EmsAddressSeoContent } from "@/components/tools/EmsAddressSeoContent";
import { UtilityToolLayout } from "@/components/tools/UtilityToolLayout";
import {
  getKoreanAddressConverterUrl,
  getOverseasAddressConverterUrl,
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
      category="Overseas Address"
      backHref={backHref}
      backLabel={backLabel}
      title="해외 주소 변환기 · EMS · DHL · FedEx"
      subtitleEn="Overseas Address Converter · Shipping Label"
      descriptionKo={
        <>
          해외 영문 주소를 우체국{" "}
          <span className="font-en">Contract EMS</span>,{" "}
          <span className="font-en">DHL</span>,{" "}
          <span className="font-en">FedEx</span> 입력 칸에 맞게 나누고, 박스
          부착용 <span className="font-en">Shipping Label</span>을 즉시
          생성합니다.
        </>
      }
      descriptionEn="Split overseas addresses into Korea Post EMS, DHL, and FedEx form fields and print a box-ready shipping label—GB, FR, NL, BE, SE, DE, US, JP, CA, AU."
      banner={
        <a
          href={getKoreanAddressConverterUrl()}
          className="flex items-center justify-between gap-3 border-b-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/50 px-5 py-3 text-sm transition-colors hover:bg-[#EBEBE5] md:px-8"
        >
          <span className="font-ko min-w-0 text-foreground/75">
            해외에서 한국으로 보낼 때는{" "}
            <span className="font-en font-bold text-foreground underline decoration-[#D9D9D3] underline-offset-4">
              Korean Address Converter
            </span>
            {" "}
            (inbound)
          </span>
          <span
            className="font-en shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-[#FF4B3E]"
            aria-hidden
          >
            →
          </span>
        </a>
      }
      crossLinks={[
        {
          href: getKoreanAddressConverterUrl(),
          label: "Korean Address ↗",
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
        title:
          "Overseas Address Converter — EMS · DHL · FedEx | UncleHangul",
        url: getOverseasAddressConverterUrl(),
        contentId: "ems-address",
      }}
      usageGuide={EMS_ADDRESS_USAGE}
    />
  );
}
