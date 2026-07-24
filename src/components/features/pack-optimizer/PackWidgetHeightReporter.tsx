"use client";

import { usePackWidgetParentHeightSync } from "./usePackWidgetParentHeightSync";

type PackWidgetHeightReporterProps = {
  enabled?: boolean;
};

/** Mount once near the root of the pack-optimizer page when `?widget=true`. */
export function PackWidgetHeightReporter({
  enabled = true,
}: PackWidgetHeightReporterProps) {
  usePackWidgetParentHeightSync({ enabled });
  return null;
}
