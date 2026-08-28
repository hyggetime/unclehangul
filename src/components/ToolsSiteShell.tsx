import Link from "next/link";
import { AdSenseAnchor } from "@/components/ads/AdSenseAnchor";
import { ToolLegalFooter } from "@/components/tools/ToolLegalFooter";
import { getMainSiteUrl, getToolsSiteUrl } from "@/lib/domains";

type ToolsSiteShellProps = {
  children: React.ReactNode;
};

/**
 * Minimal chrome for tools.unclehangul.com — utility-first, links back to main brand.
 */
export function ToolsSiteShell({ children }: ToolsSiteShellProps) {
  const toolsSite = getToolsSiteUrl();

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto w-full max-w-[1440px] border-x-[0.5px] border-[#D9D9D3]">
        <header className="sticky top-0 z-40 border-b-[0.5px] border-[#D9D9D3] bg-background">
          <nav
            aria-label="Tools site"
            className="flex h-12 items-center justify-between gap-4 px-5 md:h-14 md:px-8"
          >
            <Link
              href={toolsSite}
              className="font-en touch-target inline-flex items-center text-base font-black tracking-tight sm:text-lg"
            >
              tools/
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href={`${getMainSiteUrl()}/learn`}
                className="font-en touch-target inline-flex items-center justify-center px-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:text-[#FF4B3E]"
              >
                Learn
              </Link>
              <Link
                href={getMainSiteUrl()}
                className="font-en touch-target inline-flex items-center justify-center px-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:text-[#FF4B3E]"
              >
                unclehangul/
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-[1440px]">{children}</main>

        <ToolLegalFooter />
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 pb-[env(safe-area-inset-bottom,0px)]">
        <div className="mx-auto w-full max-w-[1440px]">
          <AdSenseAnchor className="pointer-events-auto" />
        </div>
      </div>
    </div>
  );
}
