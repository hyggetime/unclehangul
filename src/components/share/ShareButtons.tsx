"use client";

import { useCallback, useState } from "react";
import {
  buildRedditShareUrl,
  buildTwitterShareUrl,
} from "@/lib/share/urls";
import {
  sendContentShareEvent,
  type ShareContentType,
} from "@/lib/analytics/ga4";

export type ShareTrack = ShareContentType;

type ShareButtonsProps = {
  track: ShareTrack;
  title: string;
  url: string;
  contentId: string;
  className?: string;
};

type SharePlatform = "x" | "reddit" | "kakao" | "copy" | "native";

const HEADING: Record<ShareTrack, { en: string; ko: string }> = {
  learn: { en: "Share this article", ko: "글 공유하기" },
  tool: { en: "Share this tool", ko: "도구 공유하기" },
  play: { en: "Share this widget", ko: "위젯 공유하기" },
};

const KAKAO_COPIED = {
  en: "Link copied — paste in KakaoTalk.",
  ko: "링크가 복사되었습니다. 카카오톡에 붙여넣기 하세요.",
};

const COPY_COPIED = {
  en: "Link copied.",
  ko: "링크가 복사되었습니다.",
};

function IconX() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function IconReddit() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

function IconKakao() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.477 2 10.875c0 2.793 1.826 5.245 4.563 6.662-.199-.735-.378-1.868.078-2.668.413-.725 2.686-1.767 2.686-1.767s-.247.495-.445 1.188c-.198.693-.128 1.584-.128 1.584s.99-.198 1.881-.396c.891-.198 1.881-.396 1.881-.396s.693-.396 1.386-.594c.693-.198 1.188-.297 1.188-.297h-.099c-1.683 0-3.069-1.386-3.069-3.069 0-1.683 1.386-3.069 3.069-3.069 1.683 0 3.069 1.386 3.069 3.069 0 1.683-1.386 3.069-3.069 3.069-.396 0-.792-.099-1.188-.198 0 0-.495.099-1.188.297-.693.198-1.386.396-1.386.396s-.99.198-1.881.396c-.891.198-1.881.396-1.881.396s.099-.891.128-1.584c.049-.693-.445-1.188-.445-1.188s2.273 1.042 2.686 1.767c.456.8.277 1.933.078 2.668C20.174 16.12 22 13.668 22 10.875 22 6.477 17.523 3 12 3z" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

const buttonClass =
  "font-en touch-target inline-flex min-h-12 items-center justify-center gap-2 border-[0.5px] border-[#D9D9D3] bg-background px-4 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]";

export function ShareButtons({
  track,
  title,
  url,
  contentId,
  className = "",
}: ShareButtonsProps) {
  const [status, setStatus] = useState<string | null>(null);
  const heading = HEADING[track];
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const trackShare = useCallback(
    (platform: SharePlatform) => {
      sendContentShareEvent({
        contentType: track,
        contentId,
        platform,
      });
    },
    [contentId, track],
  );

  const copyLink = useCallback(
    async (platform: "copy" | "kakao") => {
      try {
        await navigator.clipboard.writeText(url);
        setStatus(platform === "kakao" ? "kakao" : "copy");
        trackShare(platform);
      } catch {
        setStatus("error");
      }
    },
    [trackShare, url],
  );

  async function handleNativeShare() {
    try {
      await navigator.share({ title, url });
      trackShare("native");
    } catch {
      /* user cancelled */
    }
  }

  return (
    <section
      aria-labelledby={`share-${track}-${contentId}`}
      className={`border-t-[0.5px] border-[#D9D9D3] pt-8 ${className}`.trim()}
    >
      <h2
        id={`share-${track}-${contentId}`}
        className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40"
      >
        {heading.en}
      </h2>
      <p className="font-ko mt-2 text-sm text-foreground/55">{heading.ko}</p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {canNativeShare ? (
          <button type="button" onClick={handleNativeShare} className={buttonClass}>
            <IconShare />
            Share
          </button>
        ) : null}

        {track === "tool" ? (
          <button
            type="button"
            onClick={() => copyLink("kakao")}
            className={buttonClass}
          >
            <IconKakao />
            KakaoTalk
          </button>
        ) : null}

        <a
          href={buildTwitterShareUrl(title, url)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShare("x")}
          className={buttonClass}
        >
          <IconX />
          X
        </a>

        {track === "learn" ? (
          <a
            href={buildRedditShareUrl(title, url)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare("reddit")}
            className={buttonClass}
          >
            <IconReddit />
            Reddit
          </a>
        ) : null}

        <button
          type="button"
          onClick={() => copyLink("copy")}
          className={buttonClass}
        >
          <IconLink />
          Copy link
        </button>
      </div>

      {status === "kakao" ? (
        <p className="font-ko mt-3 text-sm text-foreground/60">
          {KAKAO_COPIED.ko}
          <span className="font-en mt-1 block text-xs text-foreground/45">
            {KAKAO_COPIED.en}
          </span>
        </p>
      ) : null}
      {status === "copy" ? (
        <p className="font-ko mt-3 text-sm text-foreground/60">
          {COPY_COPIED.ko}
          <span className="font-en mt-1 block text-xs text-foreground/45">
            {COPY_COPIED.en}
          </span>
        </p>
      ) : null}
      {status === "error" ? (
        <p className="font-en mt-3 text-sm text-foreground/60">
          Could not copy link. Please copy the URL from your browser bar.
        </p>
      ) : null}
    </section>
  );
}
