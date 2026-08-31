import { KrAddressFormatter } from "@/components/tools/KrAddressFormatter";
import { KrAddressSeoContent } from "@/components/tools/KrAddressSeoContent";
import { UtilityToolLayout } from "@/components/tools/UtilityToolLayout";
import { getEmsAddressUrl, getKrAddressFormatterUrl } from "@/lib/domains";
import { KR_ADDRESS_USAGE } from "@/lib/tools/kr-address/usage-guide";

type KrAddressFormatterToolViewProps = {
  backHref?: string;
  backLabel?: string;
};

export function KrAddressFormatterToolView({
  backHref = "/",
  backLabel = "← All tools",
}: KrAddressFormatterToolViewProps) {
  return (
    <UtilityToolLayout
      category="KR Address"
      primaryLang="en"
      usageDefaultLocale="en"
      backHref={backHref}
      backLabel={backLabel}
      title="Korean Address in English"
      subtitleEn="Converter · Form splitter · Inbound label"
      descriptionEn="Search a Korean street address, split it into Line 1, Line 2, City, State, and ZIP, then print a bilingual label for deliveries into Korea."
      descriptionKo="한글 도로명 주소를 검색하면 해외 쇼핑몰 입력칸에 맞게 나눕니다. 박스에는 국내 택배기사님용 한글 줄을 함께 인쇄하세요."
      banner={
        <a
          href={getEmsAddressUrl()}
          className="flex items-center justify-between gap-3 border-b-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/50 px-5 py-3 text-sm transition-colors hover:bg-[#EBEBE5] md:px-8"
        >
          <span className="font-en min-w-0 text-foreground/75">
            Sending shipping FROM Korea to abroad? Use our{" "}
            <span className="font-bold text-foreground underline decoration-[#D9D9D3] underline-offset-4">
              EMS Overseas Address Parser
            </span>
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
          href: getEmsAddressUrl(),
          label: "EMS Parser ↗",
          external: true,
        },
      ]}
      primary={<KrAddressFormatter />}
      seo={<KrAddressSeoContent />}
      feedback={{ contentType: "tool", contentId: "kr-address-formatter" }}
      share={{
        title: "Korean Address in English Converter & Form Splitter | UncleHangul",
        url: getKrAddressFormatterUrl(),
        contentId: "kr-address-formatter",
      }}
      usageGuide={KR_ADDRESS_USAGE}
    />
  );
}
