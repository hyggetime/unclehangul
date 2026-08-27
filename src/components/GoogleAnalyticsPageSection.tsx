"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { sendPageContextEvent } from "@/lib/analytics/ga4";

/**
 * Sends `page_context` with `page_section` on route changes for GA4 segmentation.
 * Register `page_section` as an event-scoped custom dimension in GA4 Admin.
 */
export function GoogleAnalyticsPageSection() {
  const pathname = usePathname();

  useEffect(() => {
    sendPageContextEvent(pathname);
  }, [pathname]);

  return null;
}
