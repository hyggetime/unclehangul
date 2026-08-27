"use client";

import { useEffect, useState } from "react";
import {
  type FeedbackReaction,
  readStoredFeedback,
  storeFeedback,
} from "@/lib/feedback/storage";
import { sendContentFeedbackEvent } from "@/lib/analytics/ga4";

export type ContentFeedbackType = "learn" | "tool" | "play";

type ContentFeedbackProps = {
  contentType: ContentFeedbackType;
  contentId: string;
  className?: string;
};

const THANK_YOU: Record<FeedbackReaction, { en: string; ko: string }> = {
  helpful: {
    en: "Thanks — glad it helped.",
    ko: "도움이 되었다니 기쁩니다.",
  },
  not_helpful: {
    en: "Thanks — we'll keep improving.",
    ko: "피드백 감사합니다. 더 나아지도록 하겠습니다.",
  },
};

export function ContentFeedback({
  contentType,
  contentId,
  className = "",
}: ContentFeedbackProps) {
  const [reaction, setReaction] = useState<FeedbackReaction | null>(null);

  useEffect(() => {
    setReaction(readStoredFeedback(contentType, contentId));
  }, [contentType, contentId]);

  function handleVote(next: FeedbackReaction) {
    if (reaction) return;
    storeFeedback(contentType, contentId, next);
    setReaction(next);
    sendContentFeedbackEvent({
      contentType,
      contentId,
      reaction: next,
    });
  }

  return (
    <section
      aria-labelledby={`feedback-${contentType}-${contentId}`}
      className={`border-t-[0.5px] border-[#D9D9D3] pt-8 ${className}`.trim()}
    >
      {reaction ? (
        <div className="text-center md:text-left">
          <p className="font-en text-sm font-bold text-foreground">
            {THANK_YOU[reaction].en}
          </p>
          <p className="font-ko mt-1 text-sm text-foreground/55">
            {THANK_YOU[reaction].ko}
          </p>
        </div>
      ) : (
        <>
          <h2
            id={`feedback-${contentType}-${contentId}`}
            className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40"
          >
            Was this helpful?
          </h2>
          <p className="font-ko mt-2 text-sm text-foreground/55">
            도움이 되었나요? 한 번만 눌러 주세요.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => handleVote("helpful")}
              className="font-en touch-target inline-flex min-h-12 items-center justify-center gap-2 border-[0.5px] border-[#D9D9D3] bg-background px-5 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
            >
              <span aria-hidden>👍</span>
              Helpful
            </button>
            <button
              type="button"
              onClick={() => handleVote("not_helpful")}
              className="font-en touch-target inline-flex min-h-12 items-center justify-center gap-2 border-[0.5px] border-[#D9D9D3] bg-background px-5 text-xs font-bold uppercase tracking-[0.12em] text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <span aria-hidden>👎</span>
              Not really
            </button>
          </div>
        </>
      )}
    </section>
  );
}
