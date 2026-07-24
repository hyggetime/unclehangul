import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const SITE_NAME = "Uncle Hangul";

type PageMetadataOptions = {
  /** Short page title (layout template adds “ · Uncle Hangul”). */
  title: string;
  description: string;
  /** Path starting with `/`. */
  path: string;
  openGraphType?: "website" | "article" | "profile";
  publishedTime?: string;
  noIndex?: boolean;
};

function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

function openGraphTitle(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
}

/** Shared metadata for public marketing, legal, and tool pages. */
export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const url = absoluteUrl(options.path);
  const ogTitle = openGraphTitle(options.title);

  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: url },
    openGraph: {
      type: options.openGraphType ?? "website",
      title: ogTitle,
      description: options.description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      ...(options.publishedTime
        ? { publishedTime: options.publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: options.description,
    },
    ...(options.noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}

export function getRootMetadataBase(): URL {
  return new URL(getSiteUrl());
}
