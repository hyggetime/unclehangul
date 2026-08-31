"use client";

import type { ReactNode } from "react";
import { UtilityToolLayout } from "@/components/tools/UtilityToolLayout";
import {
  getOverseasAddressConverterUrl,
  getPackOptimizerUrl,
  getToolsSiteUrl,
} from "@/lib/domains";
import { PACK_OPTIMIZER_USAGE } from "@/lib/tools/pack-optimizer/usage-guide";

type PackOptimizerAppViewProps = {
  children: ReactNode;
};

export function PackOptimizerAppView({ children }: PackOptimizerAppViewProps) {
  return (
    <UtilityToolLayout
      category="Pack Optimizer"
      backHref={getToolsSiteUrl()}
      backLabel="← All tools"
      title="국제 배송비 최적화 3D 계산기"
      subtitleEn="Pack Optimizer · K-Packet split vs EMS volumetric weight"
      descriptionKo={
        <>
          단일 SKU의 가로·세로·높이·무게와 수량만 입력하면{" "}
          <span className="font-en">K-Packet</span> 분할 발송과{" "}
          <span className="font-en">EMS</span> 통합 배송 비용을 실시간으로
          비교합니다.
        </>
      }
      descriptionEn="Enter product dimensions, weight, and quantity to compare K-Packet split vs EMS bundle shipping—volumetric weight included."
      crossLinks={[
        {
          href: getOverseasAddressConverterUrl(),
          label: "Overseas Address ↗",
          external: true,
        },
      ]}
      primary={children}
      showDesktopSidebarAd={false}
      feedback={{ contentType: "tool", contentId: "pack-optimizer" }}
      share={{
        title: "국제 배송비 최적화 3D 계산기 | 한글아저씨",
        url: getPackOptimizerUrl(),
        contentId: "pack-optimizer",
      }}
      usageGuide={PACK_OPTIMIZER_USAGE}
    />
  );
}
