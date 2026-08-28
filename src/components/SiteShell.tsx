import { headers } from "next/headers";
import { AdSenseAnchor } from "@/components/ads/AdSenseAnchor";
import { PackSiteShell } from "@/components/PackSiteShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ToolsSiteShell } from "@/components/ToolsSiteShell";
import { isPackHost, isToolsHost } from "@/lib/domains";

type SiteShellProps = {
  children: React.ReactNode;
};

/**
 * Mobile: single column. Desktop: 12-column grid inside max-w-[1440px].
 * tools.unclehangul.com requests use ToolsSiteShell (via middleware rewrite).
 */
export async function SiteShell({ children }: SiteShellProps) {
  const headerList = await headers();
  const host = headerList.get("host");

  if (isToolsHost(host)) {
    return <ToolsSiteShell>{children}</ToolsSiteShell>;
  }

  if (isPackHost(host)) {
    return <PackSiteShell>{children}</PackSiteShell>;
  }

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto w-full max-w-[1440px] border-x-[0.5px] border-[#D9D9D3]">
        <SiteHeader />

        <main className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start pb-0 md:grid-cols-12">
          {children}
        </main>

        <SiteFooter />
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 pb-[env(safe-area-inset-bottom,0px)]">
        <div className="mx-auto w-full max-w-[1440px]">
          <AdSenseAnchor className="pointer-events-auto" />
        </div>
      </div>
    </div>
  );
}
