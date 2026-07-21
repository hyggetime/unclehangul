"use client";

import { AdSenseUnit } from "@/components/AdSenseUnit";

type ToolsAdDrawerProps = {
  className?: string;
};

export function ToolsAdDrawer({ className = "" }: ToolsAdDrawerProps) {
  return (
    <aside
      aria-label="Advertisement"
      className={`flex min-h-[220px] flex-col border-r-[0.5px] border-b-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/30 md:min-h-[260px] ${className}`.trim()}
    >
      <AdSenseUnit
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOLS ?? "tools-grid"}
        format="rectangle"
        minHeight={300}
        className="min-h-[300px] flex-1 border-0 bg-transparent"
        placeholderLabel="AdSense · Tools Grid"
      />
    </aside>
  );
}
