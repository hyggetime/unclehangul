import { PackOptimizerFrame } from "@/components/tools/PackOptimizerFrame";
import { PackOptimizerSeoContent } from "@/components/tools/PackOptimizerSeoContent";
import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { ToolPageHeader } from "@/components/tools/ToolPageHeader";
import { getPackOptimizerMetadata } from "@/lib/tools/pack-optimizer-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = getPackOptimizerMetadata();

export default function PackOptimizerPage() {
  return (
    <div className="md:col-span-12 min-w-0 w-full">
      <ToolPageChrome category="Pack Optimizer" />

      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <ToolPageHeader
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
        />
      </div>

      <div className="w-full bg-background">
        <PackOptimizerFrame />
        <PackOptimizerSeoContent />
      </div>
    </div>
  );
}
