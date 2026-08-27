import Link from "next/link";
import type { ReactNode } from "react";
import { ContentFeedback } from "@/components/feedback/ContentFeedback";
import { UsageHelpDialog } from "@/components/tools/UsageHelpDialog";
import type { ToolUsageGuide } from "@/lib/tools/usage-guide";

type PlayWidgetPageShellProps = {
  sectionLabel?: string;
  title: string;
  titleKo: string;
  descriptionEn: string;
  descriptionKo: string;
  children: ReactNode;
  feedbackContentId?: string;
  usageGuide?: ToolUsageGuide;
};

export function PlayWidgetPageShell({
  sectionLabel = "HANGUL PLAY",
  title,
  titleKo,
  descriptionEn,
  descriptionKo,
  children,
  feedbackContentId,
  usageGuide,
}: PlayWidgetPageShellProps) {
  return (
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="flex h-10 items-center justify-between gap-4 border-b-[0.5px] border-[#D9D9D3] px-1">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            {sectionLabel}
          </p>
          <Link
            href="/"
            className="font-en shrink-0 text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
          >
            Home ↗
          </Link>
        </div>

        <header className="border-b-[0.5px] border-[#D9D9D3] px-5 py-8 md:px-8 md:py-10">
          <h1 className="font-en text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl">
            {title}
          </h1>
          <p className="font-ko mt-2 text-sm font-bold text-foreground/55 md:text-base">
            {titleKo}
          </p>
          <p className="font-en mt-4 max-w-xl text-sm leading-relaxed text-foreground/65 md:text-base">
            {descriptionEn}
          </p>
          <p className="font-ko mt-2 max-w-xl text-sm leading-relaxed text-foreground/55">
            {descriptionKo}
          </p>
          {usageGuide ? (
            <div className="mt-5">
              <UsageHelpDialog guide={usageGuide} />
            </div>
          ) : null}
        </header>

        <div className="px-5 py-8 md:px-8 md:py-10">{children}</div>

        {feedbackContentId ? (
          <div className="border-t-[0.5px] border-[#D9D9D3] px-5 md:px-8">
            <ContentFeedback
              contentType="play"
              contentId={feedbackContentId}
              className="pb-8 pt-8 md:pb-10"
            />
          </div>
        ) : null}

        <div className="border-t-[0.5px] border-[#D9D9D3] px-5 py-6 md:px-8">
          <Link
            href="/play"
            className="font-en touch-target inline-flex min-h-12 items-center text-xs font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:text-[#FF4B3E]"
          >
            ← Hangul Play
          </Link>
        </div>
      </div>
    </div>
  );
}
