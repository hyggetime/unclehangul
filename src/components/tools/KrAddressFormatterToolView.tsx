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
      subtitleEn="Paste parser · Admin split · Hangul line"
      descriptionEn="Paste a Korean address written in English—like 8F Room 801, 19-4 Seogang-ro, Mapo-gu, Seoul. Split it into Province, District, Locality, and Detail, with the Hangul address beside it."
      descriptionKo="외국인 시점의 영문 한국 주소를 붙여 넣으면 시·도 → 구 → 읍·면·동 → 세부주소 순으로 나누고 한글 주소를 함께 보여줍니다. EMS 변환기의 inbound 버전입니다."
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
