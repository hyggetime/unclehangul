/** Uncle Hangul / 한글아저씨 — https://www.youtube.com/@unclehangul */
export const UNCLE_HANGUL_CHANNEL_URL =
  "https://www.youtube.com/@unclehangul";

export const UNCLE_HANGUL_VIDEOS = {
  /** Shorts — pronunciation / tongue twister */
  tongueTwisterShort: {
    id: "MEP-rVQm0CA",
    layout: "short" as const,
    title:
      "[Pronunciation] Korean Tongue twisters02 — 내가 그린 기린 그림",
    href: "https://www.youtube.com/shorts/MEP-rVQm0CA",
  },
  /** Long-form — numbers in Korean */
  numbersLong: {
    id: "crpmZ-bjcsU",
    layout: "long" as const,
    title:
      "Do you know how to say 910,213,090 in Korean? | Uncle Hangul",
    href: "https://www.youtube.com/watch?v=crpmZ-bjcsU",
  },
} as const;

/** Known Uncle Hangul Shorts — auto `layout="short"` when ID matches. */
export const YOUTUBE_SHORT_VIDEO_IDS: ReadonlySet<string> = new Set([
  UNCLE_HANGUL_VIDEOS.tongueTwisterShort.id,
]);

export type YoutubeLayout = "short" | "long";

export function isYoutubeShortLayout(
  videoId: string,
  layout?: YoutubeLayout,
): boolean {
  if (layout === "short") return true;
  if (layout === "long") return false;
  return YOUTUBE_SHORT_VIDEO_IDS.has(videoId);
}

/** YouTube video IDs: 11 chars from [A-Za-z0-9_-]. */
const YOUTUBE_VIDEO_ID = /^[\w-]{11}$/;

export function sanitizeYoutubeVideoId(videoId: string): string | null {
  const id = videoId.trim();
  return YOUTUBE_VIDEO_ID.test(id) ? id : null;
}

export function youtubeEmbedSrc(videoId: string): string {
  const id = sanitizeYoutubeVideoId(videoId);
  if (!id) {
    return "about:blank";
  }
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
}

export function youtubeThumbnailSrc(
  videoId: string,
  quality: "hq" | "max" = "max",
): string {
  const id = sanitizeYoutubeVideoId(videoId);
  if (!id) {
    return "";
  }
  const path =
    quality === "max"
      ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
      : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return path;
}
