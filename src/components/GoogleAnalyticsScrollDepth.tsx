"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isGaTrackingEnabled, sendScrollDepthEvent } from "@/lib/analytics/ga4";

const SCROLL_MILESTONES = [50, 90] as const;

export function GoogleAnalyticsScrollDepth() {
  const pathname = usePathname();
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!isGaTrackingEnabled()) return;

    firedRef.current = new Set();
    let ticking = false;

    const trackScrollDepth = () => {
      const gtag = window.gtag;
      if (typeof gtag !== "function") {
        ticking = false;
        return;
      }

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        ticking = false;
        return;
      }

      const percent =
        ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;

      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          sendScrollDepthEvent(gtag, milestone, pathname);
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(trackScrollDepth);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    trackScrollDepth();

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
