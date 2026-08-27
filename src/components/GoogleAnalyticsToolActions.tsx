"use client";

import { useEffect } from "react";
import { sendToolActionEvent } from "@/lib/analytics/ga4";

type ToolActionDetail = {
  tool: string;
  action: string;
  field?: string;
};

export function GoogleAnalyticsToolActions() {
  useEffect(() => {
    const onToolAction = (event: Event) => {
      const custom = event as CustomEvent<ToolActionDetail>;
      if (!custom.detail?.tool || !custom.detail?.action) return;
      sendToolActionEvent(custom.detail);
    };

    window.addEventListener("uh:tool-action", onToolAction);
    return () => window.removeEventListener("uh:tool-action", onToolAction);
  }, []);

  return null;
}
