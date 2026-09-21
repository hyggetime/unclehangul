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
    descriptionEn:
      "Short visual clips built around one word or one shape at a time. Typography experiments, loanword breakdowns, and the small cultural details that never fit into a full article.",
    descriptionKo:
      "단어 하나, 형태 하나를 중심으로 만든 짧은 영상입니다. 타이포그래피 실험, 외래어 분해, 그리고 긴 글에는 담기 어려운 작은 문화적 디테일을 올립니다.",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@unclehangul",
    href: UNCLE_HANGUL_YOUTUBE_CHANNEL_URL,
    descriptionEn:
      "Long-form lessons where a single idea gets the full walkthrough, plus Shorts for pronunciation you need to hear rather than read. This is where the audio side of the articles lives.",
    descriptionKo:
      "하나의 개념을 처음부터 끝까지 풀어 가는 롱폼 강의와, 읽기보다 들어야 하는 발음을 다루는 Shorts를 올립니다. 글의 소리 쪽 절반이 여기 있습니다.",
  },
] as const;
