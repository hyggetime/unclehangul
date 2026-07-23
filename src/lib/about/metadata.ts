import type { Metadata } from "next";
import { loadAboutContent } from "@/lib/about/load-about";
import { getSiteUrl } from "@/lib/site-url";

export function getAboutMetadata(): Metadata {
  const about = loadAboutContent();
  const url = `${getSiteUrl()}/about`;

  return {
    title: about.title,
    description: about.description,
    alternates: { canonical: url },
    openGraph: {
      title: about.title,
      description: about.description,
      url,
      type: "profile",
    },
  };
}
