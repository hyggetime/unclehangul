"use client";

import { AdSenseUnit } from "@/components/AdSenseUnit";
import { getAdSlot } from "@/lib/ads/slots";

type ToolDesktopSideAdProps = {
  className?: string;
};

/** Desktop-only vertical slot beside utility tool UI (300×600). */
export function ToolDesktopSideAd({ className = "" }: ToolDesktopSideAdProps) {
  return (
    <aside
      aria-label="Advertisement"
      className={`hidden min-w-0 md:col-span-4 md:block ${className}`.trim()}
    >
      <div className="sticky top-20 border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/25">
        <AdSenseUnit
          slot={getAdSlot("toolSidebar", "tool-sidebar")}
          format="vertical"
          minHeight={600}
          className="min-h-[600px] border-0 bg-transparent"
          placeholderLabel="AdSense · Tool sidebar"
        />
      </div>
    </aside>
  );
}
