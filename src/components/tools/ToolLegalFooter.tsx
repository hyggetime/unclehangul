import Link from "next/link";
import { getMainSiteUrl } from "@/lib/domains";

type ToolLegalFooterProps = {
  className?: string;
};

/** Compact legal + brand links for utility subdomains and tool footers. */
export function ToolLegalFooter({ className = "" }: ToolLegalFooterProps) {
  const main = getMainSiteUrl();

  return (
    <footer
      className={`site-bottom-offset border-t-[0.5px] border-[#D9D9D3] bg-background px-5 py-8 md:px-8 md:py-10 ${className}`.trim()}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 text-[11px] text-foreground/50 md:flex-row md:items-center md:justify-between">
        <p className="font-en">
          Part of{" "}
          <Link href={main} className="font-bold text-foreground hover:text-[#FF4B3E]">
            unclehangul.com
          </Link>
        </p>
        <nav
          aria-label="Legal"
          className="font-en flex flex-wrap gap-x-4 gap-y-1 uppercase tracking-[0.12em]"
        >
          <Link href={`${main}/privacy`} className="hover:text-[#FF4B3E]">
            Privacy
          </Link>
          <Link href={`${main}/terms`} className="hover:text-[#FF4B3E]">
            Terms
          </Link>
          <Link href={`${main}/contact`} className="hover:text-[#FF4B3E]">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
