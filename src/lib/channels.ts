/** Official Uncle Hangul social channels — single source for /watch and footer. */
export const UNCLE_HANGUL_INSTAGRAM_URL =
  "https://www.instagram.com/uncle_hangul/";

export const UNCLE_HANGUL_YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@unclehangul";

export const CHANNEL_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@uncle_hangul",
    href: UNCLE_HANGUL_INSTAGRAM_URL,
    descriptionEn: "Short clips, tips, and daily Hangul moments.",
    descriptionKo: "짧은 클립과 한글 팁.",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@unclehangul",
    href: UNCLE_HANGUL_YOUTUBE_CHANNEL_URL,
    descriptionEn: "Long-form lessons and Shorts from Uncle Hangul.",
    descriptionKo: "롱폼 강의와 Shorts.",
  },
] as const;
