import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/brand";
import { getSiteUrl } from "@/lib/site-url";

export { SITE_NAME } from "@/lib/brand";

type PageMetadataOptions = {
  /** Short page title (layout template adds “ · Uncle Hangul”). */
  title: string;
  description: string;
  /** Path starting with `/`. */
  path: string;
  /** Override canonical/OG origin (default: main site from getSiteUrl()). */
  siteOrigin?: string;
  /** Full canonical URL override (takes precedence over siteOrigin + path). */
  canonicalUrl?: string;
  openGraphType?: "website" | "article" | "profile";
  /** Open Graph locale — Learn/Play default en_US; seller tools ko_KR. */
  locale?: "en_US" | "ko_KR";
  publishedTime?: string;
  noIndex?: boolean;
  /** When true, document title is exactly `title` (no layout suffix). */
  absoluteTitle?: boolean;
  /** Optional SEO/AEO keywords (comma-joined in metadata). */
  keywords?: string[];
  /** Absolute or site-relative OG/Twitter image path (starts with `/`). */
  image?: string;
  imageAlt?: string;
};

function absoluteUrl(path: string, siteOrigin?: string): string {
  const base = (siteOrigin ?? getSiteUrl()).replace(/\/+$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

function openGraphTitle(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
}

/** Shared metadata for public marketing, legal, and tool pages. */
export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const url =
    options.canonicalUrl ?? absoluteUrl(options.path, options.siteOrigin);
  const ogTitle = options.absoluteTitle
    ? options.title
    : openGraphTitle(options.title);

  const imageUrl = options.image
    ? absoluteUrl(options.image, options.siteOrigin)
    : undefined;

  return {
    title: options.absoluteTitle
      ? { absolute: options.title }
      : options.title,
    description: options.description,
    ...(options.keywords?.length ? { keywords: options.keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: options.openGraphType ?? "website",
      title: ogTitle,
      description: options.description,
      url,
      siteName: SITE_NAME,
      locale: options.locale ?? "en_US",
      ...(options.publishedTime
        ? { publishedTime: options.publishedTime }
        : {}),
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: options.imageAlt ?? options.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: options.description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    ...(options.noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}

export function getRootMetadataBase(): URL {
  return new URL(getSiteUrl());
}
