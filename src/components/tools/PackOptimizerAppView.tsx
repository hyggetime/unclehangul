"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ContentFeedback } from "@/components/feedback/ContentFeedback";
import { UsageHelpDialog } from "@/components/tools/UsageHelpDialog";
import { getEmsAddressUrl, getMainSiteUrl } from "@/lib/domains";
import { PACK_OPTIMIZER_USAGE } from "@/lib/tools/pack-optimizer/usage-guide";

type PackOptimizerAppViewProps = {
  children: ReactNode;
};

export function PackOptimizerAppView({ children }: PackOptimizerAppViewProps) {
  const mainSite = getMainSiteUrl();
  const emsUrl = getEmsAddressUrl();

  return (
    <div className="min-w-0 w-full">
      <header className="sticky top-0 z-40 border-b-[0.5px] border-[#D9D9D3] bg-background">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
          <div className="min-w-0">
            <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
              Uncle Hangul · Pack Optimizer
            </p>
            <h1 className="font-ko mt-1 text-xl font-black leading-snug text-foreground md:text-2xl">
              국제 배송비 최적화 3D 계산기
            </h1>
            <p className="font-en mt-1 text-xs leading-relaxed text-foreground/55">
              K-Packet split vs EMS volumetric weight
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <UsageHelpDialog guide={PACK_OPTIMIZER_USAGE} />
            <Link
              href={emsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
            >
              EMS Address ↗
            </Link>
            <Link
              href={mainSite}
              className="font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
            >
              unclehangul.com ↗
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-5 py-6 md:px-8 md:py-8">
        {children}
        <ContentFeedback
          contentType="tool"
          contentId="pack-optimizer"
          className="mt-10 md:mt-12"
        />
      </main>
    </div>
  );
}
