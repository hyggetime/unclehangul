import type { Metadata } from "next";
import Link from "next/link";
import { EmsAddressConverter } from "@/components/tools/EmsAddressConverter";
import { EmsAddressSeoContent } from "@/components/tools/EmsAddressSeoContent";
import { getEmsAddressMetadata } from "@/lib/tools/ems-address-metadata";

export const metadata: Metadata = getEmsAddressMetadata();

export default function EmsAddressPage() {
  return (
    <div className="md:col-span-12 min-w-0 w-full">
      <div className="flex h-10 shrink-0 items-center justify-between gap-4 border-b-[0.5px] border-[#D9D9D3] px-5 md:px-8">
        <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
          Tools / EMS Address
        </p>
        <Link
          href="/tools"
          className="font-en shrink-0 text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
        >
          ← Tools
        </Link>
      </div>

      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <header className="border-b-[0.5px] border-[#D9D9D3] pb-8">
          <h1 className="font-ko text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            해외 주소 EMS 변환기
          </h1>
          <p className="font-en mt-2 text-sm font-bold tracking-tight text-foreground/45">
            EMS Address Converter · Contract EMS fields
          </p>
          <p className="font-ko mt-4 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
            해외 영문 주소를 우체국{" "}
            <span className="font-en">Contract EMS</span> 입력 칸{" "}
            <span className="font-en">
              Country, Zipcode, City, State, Line1, Line2
            </span>
            에 맞게 실시간으로 나누고 특수문자·악센트를 정리합니다.
          </p>
          <p className="font-en mt-2 max-w-2xl text-sm leading-relaxed text-foreground/55">
            Paste an overseas English address. Split into Korea Post contract-EMS
            fields with per-field copy—GB, FR, NL, BE, SE, DE, US, JP, CA, AU.
          </p>
        </header>

        <div className="pt-6 md:pt-8">
          <EmsAddressConverter />
        </div>
      </div>

      <EmsAddressSeoContent />
    </div>
  );
}
