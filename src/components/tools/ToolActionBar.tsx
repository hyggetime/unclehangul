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
  "font-en block border-b-[0.5px] border-[#D9D9D3] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors last:border-b-0 hover:bg-[#EBEBE5]/60 hover:text-[#FF4B3E]";

const desktopLinkClass =
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
  const menuLinks = [
    ...crossLinks,
    ...(showMainSiteLink
      ? [{ href: mainSite, label: "unclehangul.com ↗", external: false }]
      : []),
  ];

  if (!usageGuide && menuLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex shrink-0 items-center gap-2 ${className}`.trim()}>
      {usageGuide ? (
        <UsageHelpDialog guide={usageGuide} defaultLocale={usageDefaultLocale} />
      ) : null}

      {menuLinks.length > 0 ? (
        <details className="group relative md:hidden">
          <summary className="font-en touch-target inline-flex h-11 w-11 list-none cursor-pointer items-center justify-center border-[0.5px] border-[#D9D9D3] bg-background text-lg font-bold leading-none text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E] [&::-webkit-details-marker]:hidden">
            <span aria-hidden>···</span>
            <span className="sr-only">More links</span>
          </summary>
          <div className="absolute right-0 top-[calc(100%+0.25rem)] z-50 min-w-[12.5rem] border-[0.5px] border-[#D9D9D3] bg-background shadow-none">
            {menuLinks.map((link) => (
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
          </div>
        </details>
      ) : null}

      <div className="hidden flex-wrap items-center justify-end gap-2 md:flex">
        {crossLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={desktopLinkClass}
          >
            {link.label}
          </Link>
        ))}
        {showMainSiteLink ? (
          <Link href={mainSite} className={desktopLinkClass}>
            unclehangul.com ↗
          </Link>
        ) : null}
      </div>
    </div>
  );
}
