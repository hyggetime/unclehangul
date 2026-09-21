import { UNCLE_HANGUL_INSTAGRAM_URL } from "@/lib/channels";
import { UNCLE_HANGUL_VIDEOS } from "@/lib/youtube";

export type ContentPairing = {
  learnSlug: string;
  title: string;
  /** Why the video and the article are worth taking together. */
  noteEn?: string;
  noteKo?: string;
  youtube?: { videoId: string; label: string; href: string };
  instagram?: { label: string; href: string };
  playHref?: string;
};

/** Curated cross-links: Learn ↔ YouTube ↔ Instagram ↔ Play. */
export const CONTENT_PAIRINGS: readonly ContentPairing[] = [
  {
    learnSlug: "korean-numbers-910-million",
    title: "Reading big numbers in Korean",
    noteEn:
      "The video walks through 910,213,090 out loud so you can hear where the pauses land. The article explains why those pauses sit in different places than they would in English — Korean groups digits in fours, not threes.",
    noteKo:
      "영상에서는 910,213,090을 소리 내어 읽으며 끊어지는 지점을 들려줍니다. 글에서는 그 지점이 영어와 다른 이유를 다룹니다. 한국어는 세 자리가 아니라 네 자리로 끊기 때문입니다.",
    youtube: {
      videoId: UNCLE_HANGUL_VIDEOS.numbersLong.id,
      label: "Long-form · 910,213,090",
      href: UNCLE_HANGUL_VIDEOS.numbersLong.href,
    },
    instagram: {
      label: "Clip on @uncle_hangul",
      href: UNCLE_HANGUL_INSTAGRAM_URL,
    },
  },
  {
    learnSlug: "graphic-blueprint-hangul-loanwords",
    title: "Graphic Blueprint of Sound",
    noteEn:
      "The reels show single loanwords resolving into syllable blocks, one frame at a time. Read the article first if you want the reasoning, or watch first and let the article confirm the pattern you already noticed.",
    noteKo:
      "릴스는 외래어 하나가 음절 블록으로 풀리는 과정을 한 프레임씩 보여 줍니다. 원리부터 알고 싶다면 글을 먼저, 감으로 먼저 잡고 싶다면 영상을 먼저 보세요.",
    instagram: {
      label: "Visual Vocabulary reels",
      href: UNCLE_HANGUL_INSTAGRAM_URL,
    },
    playHref: "/play/city-names",
  },
  {
    learnSlug: "why-typing-korean-feels-like-tetris-hangul-keyboards",
    title: "Hangul keyboard UX",
    noteEn:
      "Watching someone type Korean is the fastest way to understand that letters do not sit in a line — they fall into a square and lock. Pair the clips with Jamo Builder and assemble the same blocks yourself.",
    noteKo:
      "한국어 타이핑을 보는 것만으로도 글자가 줄이 아니라 칸에 떨어져 맞물린다는 걸 알게 됩니다. 클립을 본 뒤 Jamo Builder에서 같은 블록을 직접 쌓아 보세요.",
    instagram: {
      label: "Keyboard & jamo clips",
      href: UNCLE_HANGUL_INSTAGRAM_URL,
    },
    playHref: "/play/jamo-builder",
  },
  {
    learnSlug: "tongue-twister-girin",
    title: "Korean Tongue Twisters: Giraffe Pictures",
    noteEn:
      "기린 그림 is short enough to attempt on the first try and awkward enough to expose exactly which consonant your mouth is not ready for. Hear it at speed in the Short, then read the breakdown of why it trips people.",
    noteKo:
      "기린 그림은 한 번에 따라 할 만큼 짧으면서도, 입이 아직 준비되지 않은 자음이 어디인지 정확히 드러냅니다. Shorts로 속도를 듣고, 글에서 왜 걸리는지 분해해 보세요.",
    youtube: {
      videoId: UNCLE_HANGUL_VIDEOS.tongueTwisterShort.id,
      label: "Shorts · 기린 그림",
      href: UNCLE_HANGUL_VIDEOS.tongueTwisterShort.href,
    },
  },
] as const;

export function getPairingForSlug(slug: string): ContentPairing | undefined {
  return CONTENT_PAIRINGS.find((pairing) => pairing.learnSlug === slug);
}
