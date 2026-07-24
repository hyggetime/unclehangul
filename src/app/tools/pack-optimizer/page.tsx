import type { Metadata } from "next";
import Link from "next/link";

const PACK_OPTIMIZER_WIDGET_SRC =
  "https://pack.unclehangul.com/pack-optimizer?widget=true";

export const metadata: Metadata = {
  title: "Pack Optimizer",
  description:
    "Logistics pack optimization—plan cartons and loads with the Uncle Hangul pack engine.",
  alternates: { canonical: "https://unclehangul.com/tools/pack-optimizer" },
  openGraph: {
    title: "Pack Optimizer · Uncle Hangul",
    description:
      "Embedded pack optimization calculator from pack.unclehangul.com.",
    url: "https://unclehangul.com/tools/pack-optimizer",
  },
};

export default function PackOptimizerPage() {
  return (
    <div className="md:col-span-12 min-w-0">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden">
        <div className="flex h-10 shrink-0 items-center justify-between gap-4 border-b-[0.5px] border-[#D9D9D3] px-4 md:px-8">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            Tools / Pack Optimizer
          </p>
          <Link
            href="/tools"
            className="font-en shrink-0 text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
          >
            ← Tools
          </Link>
        </div>
        <iframe
          src={PACK_OPTIMIZER_WIDGET_SRC}
          title="Pack Optimizer"
          className="block min-h-[85vh] w-full border-0 bg-background"
          allow="clipboard-write"
        />
      </div>
    </div>
  );
}
