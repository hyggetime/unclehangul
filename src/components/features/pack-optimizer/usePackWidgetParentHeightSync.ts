"use client";

import { useEffect } from "react";

type UsePackWidgetParentHeightSyncOptions = {
  /** When false, no postMessage is sent (standalone pack.unclehangul.com). */
  enabled?: boolean;
  /** Extra pixels to avoid sub-pixel clipping inside the iframe. */
  bufferPx?: number;
};

function measureDocumentHeight(): number {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
  );
}

function isWidgetEmbed(): boolean {
  if (typeof window === "undefined") return false;
  if (window.parent === window) return false;
  return new URLSearchParams(window.location.search).get("widget") === "true";
}

/**
 * Embeds on pack.unclehangul.com (widget=true). Notifies parent frames
 * (unclehangul.com /tools/pack-optimizer) via postMessage({ height }).
 */
export function usePackWidgetParentHeightSync(
  options: UsePackWidgetParentHeightSyncOptions = {},
) {
  const { enabled = true, bufferPx = 8 } = options;

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (!isWidgetEmbed()) return;

    const postHeight = () => {
      const height = measureDocumentHeight() + bufferPx;
      window.parent.postMessage({ height }, "*");
    };

    postHeight();

    const observer = new ResizeObserver(() => {
      postHeight();
    });
    observer.observe(document.body);
    observer.observe(document.documentElement);

    window.addEventListener("load", postHeight);
    window.addEventListener("resize", postHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", postHeight);
      window.removeEventListener("resize", postHeight);
    };
  }, [enabled, bufferPx]);
}
