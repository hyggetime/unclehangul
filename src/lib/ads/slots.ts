/** AdSense ad unit slot ids from env (numeric strings). */
export const AD_SLOTS = {
  sidebar: "NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR",
  toolsGrid: "NEXT_PUBLIC_ADSENSE_SLOT_TOOLS",
  toolAction: "NEXT_PUBLIC_ADSENSE_SLOT_TOOL_ACTION",
  toolResult: "NEXT_PUBLIC_ADSENSE_SLOT_TOOL_RESULT",
  toolSidebar: "NEXT_PUBLIC_ADSENSE_SLOT_TOOL_SIDEBAR",
  anchor: "NEXT_PUBLIC_ADSENSE_SLOT_ANCHOR",
} as const;

export function getAdSlot(
  key: keyof typeof AD_SLOTS,
  fallback: string,
): string {
  const envKey = AD_SLOTS[key];
  return process.env[envKey]?.trim() || fallback;
}

export function hasAdSenseClient(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim());
}
