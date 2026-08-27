"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PackOptimizerEngine } from "@/components/features/pack-optimizer/PackOptimizerEngine";
import { PackWidgetHeightReporter } from "@/components/features/pack-optimizer/PackWidgetHeightReporter";
import { PackOptimizerAppView } from "@/components/tools/PackOptimizerAppView";

function PackOptimizerPageInner() {
  const searchParams = useSearchParams();
  const widget = searchParams.get("widget") === "true";

  if (widget) {
    return (
      <>
        <PackWidgetHeightReporter />
        <PackOptimizerEngine />
      </>
    );
  }

  return (
    <PackOptimizerAppView>
      <PackOptimizerEngine />
    </PackOptimizerAppView>
  );
}

export function PackOptimizerPageClient() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center px-5">
          <p className="font-ko text-sm text-foreground/55">불러오는 중…</p>
        </div>
      }
    >
      <PackOptimizerPageInner />
    </Suspense>
  );
}
