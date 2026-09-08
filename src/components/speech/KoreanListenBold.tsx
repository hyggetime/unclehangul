"use client";

import { extractHangulSpeech } from "@/utils/hangul-speak-text";
import { speakText } from "@/utils/speak";

type KoreanListenBoldProps = {
  label: string;
};

export function KoreanListenBold({ label }: KoreanListenBoldProps) {
  const spokenText = extractHangulSpeech(label);

  function handleListen() {
    if (!spokenText) return;
    speakText(spokenText, "ko-KR");
  }

  return (
    <button
      type="button"
      onClick={handleListen}
      aria-label={`Listen to Korean: ${spokenText}`}
      className="font-ko listen-bold-ko group/ko inline cursor-pointer touch-manipulation border-0 bg-transparent p-0 font-semibold text-foreground underline decoration-[#FF4B3E]/55 decoration-dotted underline-offset-[3px] transition-colors hover:text-[#FF4B3E] hover:decoration-[#FF4B3E] active:text-[#FF4B3E] active:decoration-[#FF4B3E]"
    >
      {label}
      <span
        aria-hidden
        className="font-en ml-0.5 inline-block text-[0.62em] font-bold uppercase tracking-[0.08em] text-[#FF4B3E]/75 opacity-70 transition-opacity md:opacity-0 md:group-hover/ko:opacity-100 md:group-active/ko:opacity-100"
      >
        ↗
      </span>
    </button>
  );
}
