import type { ReactNode } from "react";
import { ToolDesktopSideAd } from "@/components/ads/ToolDesktopSideAd";
import { ToolPageAdSlot } from "@/components/ads/ToolPageAdSlot";
import {
  ContentFeedback,
  type ContentFeedbackType,
} from "@/components/feedback/ContentFeedback";
import { UsageHelpDialog } from "@/components/tools/UsageHelpDialog";
import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { ToolPageHeader } from "@/components/tools/ToolPageHeader";
import type { ToolUsageGuide } from "@/lib/tools/usage-guide";

type UtilityToolLayoutProps = {
  category: string;
  backHref?: string;
  backLabel?: string;
  title: string;
  subtitleEn: string;
  descriptionKo: ReactNode;
  descriptionEn: string;
  /** Core widget UI or launch CTA panel. */
  primary: ReactNode;
  /** Collapsed FAQ, cross-links, JSON-LD block. */
  seo: ReactNode;
  showDesktopSidebarAd?: boolean;
  /** When set, shows “Was this helpful?” below the tool UI. */
  feedback?: {
    contentType: ContentFeedbackType;
    contentId: string;
  };
  usageGuide?: ToolUsageGuide;
};

/**
 * Single-utility page pattern: header → action ad → primary UI → result ad → FAQ.
 * Desktop: 8-col tool + 4-col sticky sidebar ad.
 */
export function UtilityToolLayout({
  category,
  backHref,
  backLabel,
  title,
  subtitleEn,
  descriptionKo,
  descriptionEn,
  primary,
  seo,
  showDesktopSidebarAd = true,
  feedback,
  usageGuide,
}: UtilityToolLayoutProps) {
  return (
    <div className="min-w-0 w-full">
      <ToolPageChrome
        category={category}
        backHref={backHref}
        backLabel={backLabel}
      />

      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <ToolPageHeader
          title={title}
          subtitleEn={subtitleEn}
          descriptionKo={descriptionKo}
          descriptionEn={descriptionEn}
        />

        {usageGuide ? (
          <div className="mt-4 flex justify-start px-0 md:mt-6">
            <UsageHelpDialog guide={usageGuide} />
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-1 items-start gap-0 md:mt-8 md:grid-cols-12 md:gap-6">
          <div className="min-w-0 md:col-span-8">
            <ToolPageAdSlot variant="action" className="px-0" />
            <div className="pt-4 md:pt-6">{primary}</div>
            <ToolPageAdSlot variant="result" className="px-0 pt-6 md:pt-8" />
            {feedback ? (
              <ContentFeedback
                contentType={feedback.contentType}
                contentId={feedback.contentId}
                className="mt-8 md:mt-10"
              />
            ) : null}
          </div>

          {showDesktopSidebarAd ? <ToolDesktopSideAd /> : null}
        </div>
      </div>

      {seo}
    </div>
  );
}
