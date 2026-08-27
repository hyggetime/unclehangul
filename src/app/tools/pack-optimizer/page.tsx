import { ToolPageAdSlot } from "@/components/ads/ToolPageAdSlot";
import { PackOptimizerLaunchPanel } from "@/components/tools/PackOptimizerLaunchPanel";
import { PackOptimizerSeoContent } from "@/components/tools/PackOptimizerSeoContent";
import { UtilityToolLayout } from "@/components/tools/UtilityToolLayout";
import { getPackOptimizerLandingMetadata } from "@/lib/tools/pack-optimizer-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = getPackOptimizerLandingMetadata();

export default function PackOptimizerLandingPage() {
  return (
    <div className="md:col-span-12 min-w-0 w-full">
      <UtilityToolLayout
        category="Pack Optimizer"
        title="국제 배송비 최적화 3D 계산기"
        subtitleEn="Pack Optimizer · K-Packet · EMS · 3D packing"
        descriptionKo={
          <>
            해외 배송비 절감은 “얼마나 무겁게” 보내느냐보다 “어떻게 담아
            보내느냐”에 달려 있습니다.{" "}
            <span className="font-en">K-Packet</span> 분할 배송과{" "}
            <span className="font-en">EMS</span> 부피무게를 3D로
            시뮬레이션합니다.
          </>
        }
        descriptionEn="Simulate 3D carton packing to compare split K-Packet shipments against a single EMS box before you ship."
        primary={<PackOptimizerLaunchPanel compact />}
        seo={<PackOptimizerSeoContent />}
        showDesktopSidebarAd={false}
      />
    </div>
  );
}
