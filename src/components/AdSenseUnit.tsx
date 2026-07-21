"use client";

import { useEffect, useRef } from "react";

export type AdSenseFormat =
  | "auto"
  | "rectangle"
  | "vertical"
  | "horizontal"
  | "fluid";

type AdSenseUnitProps = {
  /** AdSense ad unit slot id (numeric string). */
  slot: string;
  /** Ad format — maps to `data-ad-format`. */
  format?: AdSenseFormat;
  className?: string;
  /** Reserved height to prevent CLS while the unit loads. */
  minHeight?: number;
  /** Dev-only label inside the placeholder. */
  placeholderLabel?: string;
};

const DEV_PLACEHOLDER =
  "font-en flex items-center justify-center border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5] text-[10px] tracking-widest text-foreground/30";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdSenseUnit({
  slot,
  format = "auto",
  className = "",
  minHeight = 250,
  placeholderLabel = "AdSense",
}: AdSenseUnitProps) {
  const pushed = useRef(false);
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (isDev || !adClient || pushed.current) return;
    pushed.current = true;
    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      /* ad blockers */
    }
  }, [isDev, adClient, slot]);

  const shellStyle = { minHeight: `${minHeight}px` };

  if (isDev || !adClient) {
    return (
      <aside
        aria-label="Advertisement placeholder"
        data-ad-slot={slot}
        data-ad-format={format}
        style={shellStyle}
        className={`${DEV_PLACEHOLDER} w-full ${className}`.trim()}
      >
        {placeholderLabel}
      </aside>
    );
  }

  return (
    <aside
      aria-label="Advertisement"
      data-ad-slot={slot}
      style={shellStyle}
      className={`w-full overflow-hidden ${className}`.trim()}
    >
      <ins
        className="adsbygoogle block w-full"
        style={{ display: "block", minHeight: `${minHeight}px` }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={format === "auto" ? "true" : undefined}
      />
    </aside>
  );
}
