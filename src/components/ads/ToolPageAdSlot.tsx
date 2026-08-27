"use client";

import { AdSenseUnit, type AdSenseFormat } from "@/components/AdSenseUnit";
import { getAdSlot } from "@/lib/ads/slots";

type ToolPageAdVariant = "action" | "result";

const VARIANT_CONFIG: Record<
  ToolPageAdVariant,
  { slotKey: "toolAction" | "toolResult"; format: AdSenseFormat; minHeight: number; label: string }
> = {
  action: {
    slotKey: "toolAction",
    format: "horizontal",
    minHeight: 100,
    label: "AdSense · Tool action",
  },
  result: {
    slotKey: "toolResult",
    format: "rectangle",
    minHeight: 280,
    label: "AdSense · Tool result",
  },
};

type ToolPageAdSlotProps = {
  variant: ToolPageAdVariant;
  className?: string;
};

/**
 * High-intent ad placement for utility tool pages — action (pre-tool) or result (post-output).
 */
export function ToolPageAdSlot({ variant, className = "" }: ToolPageAdSlotProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <div
      className={`mx-auto w-full max-w-[1440px] border-[#D9D9D3] px-4 md:px-8 ${className}`.trim()}
    >
      <AdSenseUnit
        slot={getAdSlot(config.slotKey, `tool-${variant}`)}
        format={config.format}
        minHeight={config.minHeight}
        placeholderLabel={config.label}
        className="border-x-[0.5px] border-t-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/25"
      />
    </div>
  );
}
