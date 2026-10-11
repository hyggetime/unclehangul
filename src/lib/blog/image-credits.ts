/**
 * Single source of truth for Learn article image rights lines.
 * @see docs/MEDIA-CREDITS.md
 */

export type ImageCredit =
  | {
      kind: "original";
      /** e.g. "Uncle Hangul", "Sofie Fribo (Uncle Hangul)" */
      by?: string;
    }
  | {
      kind: "gongu";
      workTitle: string;
      author: string;
      licenseLabel: string;
      licenseUrl?: string;
      sourceUrl: string;
    }
  | {
      kind: "kogl";
      workTitle: string;
      author: string;
      koglType: 1 | 2 | 3 | 4;
      sourceUrl?: string;
    };

/** Relative paths under `public/` (same as markdown `src`). */
export const IMAGE_CREDITS: Record<string, ImageCredit> = {
  "/images/posts/square-blocks-linear-vs-moa.svg": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/square-blocks-em-box-hanja.svg": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/square-blocks-syllable-slots.svg": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/square-blocks-narrow-column-wrap.svg": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/hangul_toys.jpg": {
    kind: "gongu",
    workTitle: "교육_사진_0107",
    author: "한국저작권위원회",
    licenseLabel: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.ko",
    sourceUrl:
      "https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn=13296456&menuNo=200018",
  },
  "/images/posts/hangulnal_text.jpg": {
    kind: "gongu",
    workTitle: "한글날",
    author: "한국저작권위원회",
    licenseLabel: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.ko",
    sourceUrl:
      "https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn=13213550&menuNo=200018",
  },
  "/images/posts/water-is-self-sign.jpg": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/konglish-syllable-compression.svg": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/korean-numbers-dual-system-comma-vs-man.png": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/korean-numbers-4-digit-slash-53451.png": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/korean-time-macro-to-micro-pyramid.png": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/korean-clock-native-sino-hours-minutes.png": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/tongue-twister-giraffe-long-neck.png": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/tae-mong-elephants.jpg": {
    kind: "original",
    by: "Sofie Fribo (Uncle Hangul)",
  },
  "/images/posts/zodiac-joseon-12-zodiac-screen.jpg": {
    kind: "kogl",
    workTitle: "Joseon Dynasty 12 Zodiac Animals Folding Screen (십이지신도)",
    author: "National Museum of Korea",
    koglType: 1,
  },
  "/images/posts/korean-days-4-3-rhythm-chunking.png": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/posts/korean-days-yoil-suffix-formula.png": {
    kind: "original",
    by: "Uncle Hangul",
  },
  "/images/og/learn/korean-numbers-chunking.svg": {
    kind: "original",
    by: "Uncle Hangul",
  },
};

export function getImageCredit(src: string): ImageCredit | undefined {
  const normalized = src.startsWith("/") ? src : `/${src}`;
  return IMAGE_CREDITS[normalized];
}

export type ImageCreditSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

/** Plain “Credit · …” segments for figcaption (English labels on Learn). */
export function buildImageCreditSegments(
  credit: ImageCredit,
): ImageCreditSegment[] {
  const lead: ImageCreditSegment[] = [{ type: "text", value: "Credit · " }];

  switch (credit.kind) {
    case "original": {
      const by = credit.by ?? "Uncle Hangul";
      return [
        ...lead,
        { type: "text", value: `Original · ${by}.` },
      ];
    }
    case "gongu": {
      return [
        ...lead,
        { type: "text", value: `「${credit.workTitle}」 · ${credit.author} · ` },
        {
          type: "link",
          label: credit.licenseLabel,
          href: credit.licenseUrl ?? credit.sourceUrl,
        },
        { type: "text", value: " · " },
        {
          type: "link",
          label: "Gongu (공유마당)",
          href: credit.sourceUrl,
        },
        { type: "text", value: "." },
      ];
    }
    case "kogl": {
      const tail: ImageCreditSegment[] = [
        ...lead,
        {
          type: "text",
          value: `${credit.workTitle} · ${credit.author} · KOGL Type ${credit.koglType}`,
        },
      ];
      if (credit.sourceUrl) {
        tail.push(
          { type: "text", value: " · " },
          { type: "link", label: "Source", href: credit.sourceUrl },
        );
      }
      tail.push({ type: "text", value: "." });
      return tail;
    }
    default:
      return lead;
  }
}
