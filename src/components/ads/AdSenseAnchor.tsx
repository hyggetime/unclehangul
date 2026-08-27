"use client";

import { AdSenseUnit } from "@/components/AdSenseUnit";
import { getAdSlot } from "@/lib/ads/slots";

type AdSenseAnchorProps = {
  className?: string;
};

/**
 * Fixed bottom anchor slot — replaces static placeholder when AdSense client is configured.
 */
export function AdSenseAnchor({ className = "" }: AdSenseAnchorProps) {
  return (
    <AdSenseUnit
      slot={getAdSlot("anchor", "anchor-bottom")}
      format="horizontal"
      minHeight={64}
      placeholderLabel="Anchor Ad"
      className={`border-x-0 border-b-0 border-t-[0.5px] border-[#D9D9D3] bg-background ${className}`.trim()}
    />
  );
}
