"use client";

import { useEffect, useId, useRef, useState } from "react";
import type {
  ToolUsageGuide,
  UsageGuideLocale,
} from "@/lib/tools/usage-guide";

type UsageHelpDialogProps = {
  guide: ToolUsageGuide;
  defaultLocale?: UsageGuideLocale;
  /** Shown on the trigger button. */
  triggerLabel?: { en: string; ko: string };
};

export function UsageHelpDialog({
  guide,
  defaultLocale = "ko",
  triggerLabel = { en: "How to use", ko: "사용법" },
}: UsageHelpDialogProps) {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<UsageGuideLocale>(defaultLocale);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const content = guide[locale];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-en touch-target inline-flex min-h-12 items-center justify-center gap-2 border-[0.5px] border-[#D9D9D3] bg-background px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
      >
        <span aria-hidden>?</span>
        {defaultLocale === "en" ? triggerLabel.en : triggerLabel.ko}
        <span className="font-en text-[9px] font-bold uppercase tracking-widest text-foreground/35">
          / {defaultLocale === "en" ? triggerLabel.ko : triggerLabel.en}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        className="fixed inset-x-0 bottom-0 z-50 m-0 max-h-[min(90dvh,720px)] w-full max-w-none border-[0.5px] border-[#D9D9D3] bg-[#F2F2F0] p-0 shadow-none backdrop:bg-[#111111]/40 open:flex open:flex-col md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[85vh] md:w-[min(100%,32rem)] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-none"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b-[0.5px] border-[#D9D9D3] px-5 py-4 md:px-6">
          <h2
            id={titleId}
            className="font-en text-sm font-black tracking-tight text-foreground"
          >
            {content.title}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="font-en touch-target inline-flex h-12 w-12 shrink-0 items-center justify-center border-[0.5px] border-[#D9D9D3] text-lg font-bold text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
          >
            ×
          </button>
        </div>

        <div
          className="flex shrink-0 gap-2 border-b-[0.5px] border-[#D9D9D3] px-5 py-3 md:px-6"
          role="group"
          aria-label="Language"
        >
          {(
            [
              { id: "ko" as const, label: "한국어" },
              { id: "en" as const, label: "English" },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={locale === option.id}
              onClick={() => setLocale(option.id)}
              className={`font-en touch-target inline-flex min-h-12 flex-1 items-center justify-center border-[0.5px] text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                locale === option.id
                  ? "border-[#111111] bg-[#111111] text-[#F2F2F0]"
                  : "border-[#D9D9D3] bg-background text-foreground hover:border-[#FF4B3E]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-6 md:py-6">
          <p
            lang={locale === "ko" ? "ko" : "en"}
            className={`text-sm leading-relaxed text-foreground/70 ${locale === "ko" ? "font-ko" : "font-en"}`}
          >
            {content.intro}
          </p>
          <ol className="mt-5 list-none space-y-4">
            {content.steps.map((step) => (
              <li key={step.title}>
                <p
                  lang={locale === "ko" ? "ko" : "en"}
                  className={`text-sm font-bold text-foreground ${locale === "ko" ? "font-ko" : "font-en"}`}
                >
                  {step.title}
                </p>
                <p
                  lang={locale === "ko" ? "ko" : "en"}
                  className={`mt-1 text-sm leading-relaxed text-foreground/65 ${locale === "ko" ? "font-ko" : "font-en"}`}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          {content.tip ? (
            <p
              lang={locale === "ko" ? "ko" : "en"}
              className={`mt-6 border-t-[0.5px] border-[#D9D9D3] pt-4 text-xs leading-relaxed text-foreground/50 ${locale === "ko" ? "font-ko" : "font-en"}`}
            >
              {content.tip}
            </p>
          ) : null}
        </div>

        <div className="shrink-0 border-t-[0.5px] border-[#D9D9D3] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-en touch-target flex min-h-12 w-full items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] text-[11px] font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E]"
          >
            OK
          </button>
        </div>
      </dialog>
    </>
  );
}
