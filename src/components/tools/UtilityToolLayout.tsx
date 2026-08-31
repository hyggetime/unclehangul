import type { ReactNode } from "react";
import { ToolDesktopSideAd } from "@/components/ads/ToolDesktopSideAd";
import { ToolPageAdSlot } from "@/components/ads/ToolPageAdSlot";
import {
  ContentFeedback,
  type ContentFeedbackType,
} from "@/components/feedback/ContentFeedback";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ToolActionBar, type ToolCrossLink } from "@/components/tools/ToolActionBar";
import { ToolPageChrome } from "@/components/tools/ToolPageChrome";
import { ToolPageHeader } from "@/components/tools/ToolPageHeader";
import type { ToolUsageGuide, UsageGuideLocale } from "@/lib/tools/usage-guide";

type UtilityToolLayoutProps = {
  category: string;
  backHref?: string;
  backLabel?: string;
  title: string;
  subtitleEn: string;
  descriptionKo: ReactNode;
  descriptionEn: string;
  /** English-first seller tools keep EN copy visible on mobile. */
  primaryLang?: "ko" | "en";
  /** Full-width strip above the sticky tool header (cross-nav, alerts). */
  banner?: ReactNode;
  usageDefaultLocale?: UsageGuideLocale;
  /** Core widget UI or launch CTA panel. */
  primary: ReactNode;
  /** Collapsed FAQ, cross-links, JSON-LD block. */
  seo?: ReactNode;
  crossLinks?: ToolCrossLink[];
  showDesktopSidebarAd?: boolean;
  /** When set, shows “Was this helpful?” below the tool UI. */
  feedback?: {
    contentType: ContentFeedbackType;
    contentId: string;
  };
  /** Page share row (Kakao / X / copy). */
  share?: {
    title: string;
    url: string;
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
  primaryLang = "ko",
  banner,
  usageDefaultLocale,
  primary,
  seo,
  crossLinks,
  showDesktopSidebarAd = true,
  feedback,
  share,
  usageGuide,
}: UtilityToolLayoutProps) {
  return (
    <div className="min-w-0 w-full">
      {banner ?? null}
      <div className="sticky top-0 z-40 border-b-[0.5px] border-[#D9D9D3] bg-background">
        <ToolPageChrome
          category={category}
          backHref={backHref}
          backLabel={backLabel}
        />
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 md:flex-row md:items-start md:justify-between md:px-8 md:py-5">
          <ToolPageHeader
            embedded
            primaryLang={primaryLang}
            title={title}
            subtitleEn={subtitleEn}
            descriptionKo={descriptionKo}
            descriptionEn={descriptionEn}
          />
          <ToolActionBar
            usageGuide={usageGuide}
            usageDefaultLocale={usageDefaultLocale}
            crossLinks={crossLinks}
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="grid grid-cols-1 items-start gap-0 md:grid-cols-12 md:gap-6">
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
            {share ? (
              <ShareButtons
                track="tool"
                title={share.title}
                url={share.url}
                contentId={share.contentId}
                className="mt-8 md:mt-10"
              />
            ) : null}
          </div>

          {showDesktopSidebarAd ? <ToolDesktopSideAd /> : null}
        </div>
      </div>

      {seo ?? null}
    </div>
  );
}
