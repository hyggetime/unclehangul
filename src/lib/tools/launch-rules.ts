import type { ToolEntry } from "@/lib/tools/catalog";
import { getEmsAddressUrl, getPackSiteUrl, getToolsSiteUrl } from "@/lib/domains";

export type ToolLaunchSurface = "main-catalog" | "tools-subdomain" | "pack-subdomain";

export type ToolLaunchCheck = {
  ok: boolean;
  reason?: string;
};

/** Rules for shipping a new tool without polluting main-site topical authority. */
export function validateToolForCatalog(entry: ToolEntry): ToolLaunchCheck {
  if (entry.published === false) {
    return { ok: false, reason: "Tool is marked unpublished." };
  }

  if (entry.section === "seller" && !entry.external) {
    return {
      ok: false,
      reason: "Seller tools must link to tools.* or pack.* subdomain (external: true).",
    };
  }

  if (entry.external && entry.section === "language" && entry.href.startsWith("http")) {
    return {
      ok: false,
      reason: "Language tools should live on the main site, not external subdomains.",
    };
  }

  return { ok: true };
}

export function resolveToolLaunchSurface(entry: ToolEntry): ToolLaunchSurface {
  if (!entry.external) return "main-catalog";
  if (entry.href.startsWith(getPackSiteUrl())) return "pack-subdomain";
  if (entry.href.startsWith(getToolsSiteUrl())) return "tools-subdomain";
  return "main-catalog";
}

export function getPublishedCatalogEntries(entries: ToolEntry[]): ToolEntry[] {
  return entries.filter((entry) => validateToolForCatalog(entry).ok);
}

/** Canonical URL helpers for sitemap generation. */
export function getSellerToolCanonicalUrl(entry: ToolEntry): string | null {
  if (entry.published === false) return null;
  if (entry.external) return entry.href;
  if (entry.section === "seller") return `${getToolsSiteUrl()}${entry.href}`;
  return null;
}

export function assertEmsCanonical(): string {
  return getEmsAddressUrl();
}
