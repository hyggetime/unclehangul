"use client";

import { useId, useState } from "react";

type KoreanTextToggleProps = {
  /** Shown on the toggle control when collapsed. */
  summaryLabel?: string;
  children: React.ReactNode;
};

export function KoreanTextToggle({
  summaryLabel = "한국어로 읽기",
  children,
}: KoreanTextToggleProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-12 border-t-[0.5px] border-[#D9D9D3] pt-8 md:mt-14 md:pt-10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="font-en touch-target inline-flex min-h-12 items-center gap-2 border-[0.5px] border-[#D9D9D3] bg-background px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E] active:border-[#FF4B3E] active:text-[#FF4B3E]"
      >
        <span aria-hidden>{open ? "−" : "+"}</span>
        {open ? "Hide Korean" : summaryLabel}
      </button>

      {open ? (
        <div
          id={panelId}
          lang="ko"
          className="mt-8 min-w-0 border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40 p-5 md:p-8"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
