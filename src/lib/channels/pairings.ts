import { UNCLE_HANGUL_INSTAGRAM_URL } from "@/lib/channels";
import { UNCLE_HANGUL_VIDEOS } from "@/lib/youtube";

export type ContentPairing = {
  learnSlug: string;
  title: string;
  youtube?: { videoId: string; label: string; href: string };
  instagram?: { label: string; href: string };
  playHref?: string;
};

/** Curated cross-links: Learn ↔ YouTube ↔ Instagram ↔ Play. */
export const CONTENT_PAIRINGS: readonly ContentPairing[] = [
  {
    learnSlug: "korean-numbers-910-million",
    title: "Reading big numbers in Korean",
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
    instagram: {
      label: "Visual Vocabulary reels",
      href: UNCLE_HANGUL_INSTAGRAM_URL,
    },
    playHref: "/play/city-names",
  },
  {
    learnSlug: "why-typing-korean-feels-like-tetris-hangul-keyboards",
    title: "Hangul keyboard UX",
    instagram: {
      label: "Keyboard & jamo clips",
      href: UNCLE_HANGUL_INSTAGRAM_URL,
    },
    playHref: "/play/jamo-builder",
  },
  {
    learnSlug: "tongue-twister-girin",
    title: "Tongue twister drill",
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
