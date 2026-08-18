import Link from "next/link";
import { BlogBody } from "@/components/blog/BlogBody";
import type { LegalDocument } from "@/lib/legal/load-legal-page";

type LegalDocumentShellProps = {
  document: LegalDocument;
};

export function LegalDocumentShell({ document }: LegalDocumentShellProps) {
  return (
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="flex h-10 items-center justify-between border-b-[0.5px] border-[#D9D9D3] px-1">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            {document.sectionLabel}
          </p>
          <Link
            href="/"
            className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
          >
            Home ↗
          </Link>
        </div>

        <article className="mx-auto max-w-2xl px-1 section-y">
          <header className="border-b-[0.5px] border-[#D9D9D3] pb-8">
            <h1 className="font-en text-2xl font-black tracking-tight text-foreground md:text-3xl">
              {document.heading}
            </h1>
            {document.lastUpdated ? (
              <p className="font-en mt-2 text-[11px] uppercase tracking-widest text-foreground/40">
                {document.lastUpdated}
              </p>
            ) : null}
          </header>

          <BlogBody
            blocks={document.blocks}
            constrainWidth
            richText
            legalProse
          />
        </article>
      </div>
    </div>
  );
}
