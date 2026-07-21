import { AdPlaceholder } from "@/components/AdPlaceholder";
import { SiteHeader } from "@/components/SiteHeader";

type SiteShellProps = {
  children: React.ReactNode;
};

/**
 * Mobile: single column. Desktop: 12-column grid inside max-w-[1440px].
 */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto w-full max-w-[1440px] border-x-[0.5px] border-[#D9D9D3]">
        <SiteHeader />

        <main className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start pb-16 md:grid-cols-12">
          {children}
        </main>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
        <div className="mx-auto w-full max-w-[1440px]">
          <AdPlaceholder
            slot="bottom"
            className="pointer-events-auto border-x-0 border-b-0 border-t-[0.5px] border-[#D9D9D3]"
            label="Anchor Ad"
          />
        </div>
      </div>
    </div>
  );
}
