import Link from "next/link";
import { UsageHelpDialog } from "@/components/tools/UsageHelpDialog";
import { getMainSiteUrl } from "@/lib/domains";
import type { ToolUsageGuide, UsageGuideLocale } from "@/lib/tools/usage-guide";

export type ToolCrossLink = {
  href: string;
  label: string;
  external?: boolean;
};

type ToolActionBarProps = {
  usageGuide?: ToolUsageGuide;
  usageDefaultLocale?: UsageGuideLocale;
  crossLinks?: ToolCrossLink[];
  showMainSiteLink?: boolean;
  className?: string;
};

const actionLinkClass =
  "font-en touch-target inline-flex min-h-12 items-center justify-center border-[0.5px] border-[#D9D9D3] px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]";

/** Usage help + sibling tool links + main site — shared across seller tool apps. */
export function ToolActionBar({
  usageGuide,
  usageDefaultLocale,
  crossLinks = [],
  showMainSiteLink = true,
  className = "",
}: ToolActionBarProps) {
  const mainSite = getMainSiteUrl();

  if (!usageGuide && crossLinks.length === 0 && !showMainSiteLink) {
    return null;
  }

  return (
    <div
      className={`flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap md:justify-end ${className}`.trim()}
    >
      {usageGuide ? (
        <UsageHelpDialog
          guide={usageGuide}
          defaultLocale={usageDefaultLocale}
        />
      ) : null}
      {crossLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          {...(link.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={actionLinkClass}
        >
          {link.label}
        </Link>
      ))}
      {showMainSiteLink ? (
        <Link href={mainSite} className={actionLinkClass}>
          unclehangul.com ↗
        </Link>
      ) : null}
    </div>
  );
}
