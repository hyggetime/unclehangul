"use client";

import { usePackWidgetParentHeightSync } from "./usePackWidgetParentHeightSync";

type PackOptimizerCalculatorProps = {
  children: React.ReactNode;
};

/**
 * Wrap the pack engine UI on pack.unclehangul.com. When `?widget=true` and
 * embedded in an iframe, syncs document height to the parent Uncle Hangul page.
 */
export function PackOptimizerCalculator({
  children,
}: PackOptimizerCalculatorProps) {
  usePackWidgetParentHeightSync();

  return <>{children}</>;
}
