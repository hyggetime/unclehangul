import type { Metadata } from "next";
import Link from "next/link";
import { PackOptimizerFrame } from "@/components/tools/PackOptimizerFrame";

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
    <div className="md:col-span-12 min-w-0 w-full">
      <div className="flex h-10 shrink-0 items-center justify-between gap-4 border-b-[0.5px] border-[#D9D9D3] px-5 md:px-8">
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

      <div className="w-full bg-background">
        <PackOptimizerFrame />
      </div>
    </div>
  );
}
