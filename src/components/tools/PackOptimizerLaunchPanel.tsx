import Link from "next/link";
import { UsageHelpDialog } from "@/components/tools/UsageHelpDialog";
import { getPackOptimizerUrl } from "@/lib/domains";
import { PACK_OPTIMIZER_USAGE } from "@/lib/tools/pack-optimizer/usage-guide";

type PackOptimizerLaunchPanelProps = {
  /** When true, fits inside UtilityToolLayout primary column (no outer page padding). */
  compact?: boolean;
};

export function PackOptimizerLaunchPanel({
  compact = false,
}: PackOptimizerLaunchPanelProps) {
  const packUrl = getPackOptimizerUrl();

  return (
    <section
      aria-labelledby="pack-launch-heading"
      className={
        compact
          ? "w-full"
          : "mx-auto w-full max-w-[1440px] border-b-[0.5px] border-[#D9D9D3] px-4 py-10 md:px-8 md:py-14"
      }
    >
      <div className="border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/25 p-6 md:p-10">
        <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
          Hosted on pack.unclehangul.com
        </p>
        <h2
          id="pack-launch-heading"
          className="font-ko mt-3 text-xl font-bold leading-snug text-foreground md:text-2xl"
        >
          3D 패킹 엔진에서 K-Packet · EMS 시나리오를 실행하세요
        </h2>
        <p className="font-ko mt-3 max-w-2xl text-sm leading-relaxed text-foreground/60">
          계산기 UI는{" "}
          <span className="font-en">pack.unclehangul.com</span>에서 단일
          배포본으로 운영됩니다. 크롬 확장·앱과 동일 엔진을 공유하며, 이
          페이지는 소개·FAQ·검색용 랜딩입니다.
        </p>
        <p className="font-en mt-2 hidden max-w-2xl text-sm leading-relaxed text-foreground/55 md:block">
          Open the live 3D calculator on our dedicated pack subdomain—same
          engine used for embeds, extensions, and future apps.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={packUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] px-8 text-sm font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E]"
          >
            Open 3D Calculator ↗
          </Link>
          <UsageHelpDialog guide={PACK_OPTIMIZER_USAGE} />
          <Link
            href="/tools#seller-tools"
            className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-6 text-sm font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
          >
            More seller tools
          </Link>
        </div>
      </div>
    </section>
  );
}
