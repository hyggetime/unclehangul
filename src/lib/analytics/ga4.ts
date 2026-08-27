/**
 * GA4 analytics helpers.
 * Admin setup (custom dimensions, Explore reports): docs/GA4-SETUP.md
 */
import { TOOLS_SITE_PATH_PREFIX } from "@/lib/domains";

export const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

/** GA4 custom event for scroll milestones (distinct from enhanced-measurement `scroll`). */
export const GA4_SCROLL_DEPTH_EVENT = "scroll_depth";

/**
 * Register event-scoped custom dimensions — full list in docs/GA4-SETUP.md
 * - content_type, content_id, reaction (content_feedback)
 * - percent_scrolled, scroll_depth_bucket, page_path, page_title
 */
export const GA4_SCROLL_PARAMS = {
  PERCENT_SCROLLED: "percent_scrolled",
  SCROLL_DEPTH_BUCKET: "scroll_depth_bucket",
  PAGE_PATH: "page_path",
  PAGE_TITLE: "page_title",
  PAGE_LOCATION: "page_location",
  PAGE_REFERRER: "page_referrer",
} as const;

export function getGaMeasurementId(): string | undefined {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId || !GA_MEASUREMENT_ID_PATTERN.test(measurementId)) {
    return undefined;
  }
  return measurementId;
}

export function isGaTrackingEnabled(): boolean {
  return process.env.NODE_ENV !== "development" && Boolean(getGaMeasurementId());
}

export type PageSection =
  | "home"
  | "learn"
  | "tools-index"
  | "tool-seller"
  | "tool-lang"
  | "tools-subdomain"
  | "about"
  | "legal"
  | "other";

/** GA4 custom event for section-level reporting. Register `page_section` — docs/GA4-SETUP.md */
export const GA4_PAGE_CONTEXT_EVENT = "page_context";

export const GA4_PAGE_SECTION_PARAM = "page_section";

export const GA4_TOOL_ACTION_EVENT = "tool_action";

export const GA4_CONTENT_FEEDBACK_EVENT = "content_feedback";

/** Register content_type, content_id, reaction in GA4 Admin — docs/GA4-SETUP.md */
export const GA4_FEEDBACK_PARAMS = {
  CONTENT_TYPE: "content_type",
  CONTENT_ID: "content_id",
  REACTION: "reaction",
} as const;

export const GA4_TOOL_PARAMS = {
  TOOL_NAME: "tool_name",
  ACTION: "action",
  FIELD: "field",
} as const;

export function getPageSection(pathname: string): PageSection {
  if (pathname.startsWith(TOOLS_SITE_PATH_PREFIX)) {
    return "tools-subdomain";
  }
  if (pathname === "/") return "home";
  if (pathname.startsWith("/learn")) return "learn";
  if (pathname === "/tools") return "tools-index";
  if (pathname === "/tools/pack-optimizer") return "tool-seller";
  if (pathname.startsWith("/tools/")) return "tool-seller";
  if (pathname === "/about" || pathname === "/contact") return "about";
  if (pathname === "/privacy" || pathname === "/terms") return "legal";
  return "other";
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function sendToolActionEvent(detail: {
  tool: string;
  action: string;
  field?: string;
}): void {
  if (!isGaTrackingEnabled() || typeof window.gtag !== "function") return;

  window.gtag("event", GA4_TOOL_ACTION_EVENT, {
    [GA4_TOOL_PARAMS.TOOL_NAME]: detail.tool,
    [GA4_TOOL_PARAMS.ACTION]: detail.action,
    ...(detail.field ? { [GA4_TOOL_PARAMS.FIELD]: detail.field } : {}),
    page_path: window.location.pathname,
  });
}

export function sendContentFeedbackEvent(detail: {
  contentType: string;
  contentId: string;
  reaction: "helpful" | "not_helpful";
}): void {
  if (!isGaTrackingEnabled() || typeof window.gtag !== "function") return;

  window.gtag("event", GA4_CONTENT_FEEDBACK_EVENT, {
    [GA4_FEEDBACK_PARAMS.CONTENT_TYPE]: detail.contentType,
    [GA4_FEEDBACK_PARAMS.CONTENT_ID]: detail.contentId,
    [GA4_FEEDBACK_PARAMS.REACTION]: detail.reaction,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

export function sendPageContextEvent(pathname: string): void {
  if (!isGaTrackingEnabled() || typeof window.gtag !== "function") return;

  window.gtag("event", GA4_PAGE_CONTEXT_EVENT, {
    [GA4_PAGE_SECTION_PARAM]: getPageSection(pathname),
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export type ScrollDepthEventParams = {
  percentScrolled: number;
  pagePath: string;
  pageTitle: string;
  pageLocation: string;
  pageReferrer: string;
};

export function buildScrollDepthEventParams(
  percentScrolled: number,
  pagePath: string,
): ScrollDepthEventParams {
  return {
    percentScrolled,
    pagePath,
    pageTitle: document.title,
    pageLocation: window.location.href,
    pageReferrer: document.referrer,
  };
}

export function toScrollDepthGtagPayload(
  params: ScrollDepthEventParams,
): Record<string, string | number> {
  return {
    [GA4_SCROLL_PARAMS.PERCENT_SCROLLED]: params.percentScrolled,
    [GA4_SCROLL_PARAMS.SCROLL_DEPTH_BUCKET]: `${params.percentScrolled}%`,
    [GA4_SCROLL_PARAMS.PAGE_PATH]: params.pagePath,
    [GA4_SCROLL_PARAMS.PAGE_TITLE]: params.pageTitle,
    [GA4_SCROLL_PARAMS.PAGE_LOCATION]: params.pageLocation,
    [GA4_SCROLL_PARAMS.PAGE_REFERRER]: params.pageReferrer,
  };
}

export function sendScrollDepthEvent(
  gtag: (...args: unknown[]) => void,
  percentScrolled: number,
  pagePath: string,
): void {
  const params = buildScrollDepthEventParams(percentScrolled, pagePath);
  gtag("event", GA4_SCROLL_DEPTH_EVENT, toScrollDepthGtagPayload(params));
}
