import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflow Automator",
  robots: { index: false, follow: false },
};

type ToolPlaceholderProps = {
  title: string;
  category: string;
  descriptionEn: string;
  descriptionKo: string;
};

function ToolPlaceholder({
  title,
  category,
  descriptionEn,
  descriptionKo,
}: ToolPlaceholderProps) {
  return (
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="flex h-10 items-center gap-2 border-b-[0.5px] border-[#D9D9D3] px-1">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            Tools / {category}
          </p>
        </div>
        <div className="border-b-[0.5px] border-[#D9D9D3] px-5 py-12 md:px-8">
          <h1 className="font-en text-2xl font-black md:text-3xl">{title}</h1>
          <p className="font-en mt-4 hidden max-w-xl text-sm leading-relaxed text-foreground/65 md:block">
            {descriptionEn}
          </p>
          <p className="font-ko mt-3 max-w-xl text-sm leading-relaxed text-foreground/55 md:mt-2">
            {descriptionKo}
          </p>
          <Link
            href="/tools"
            className="font-en mt-8 inline-block text-xs font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:text-[#FF4B3E]"
          >
            ← Back to Tools
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function WorkflowAutomatorPage() {
  return (
    <ToolPlaceholder
      title="Workflow Automator"
      category="Util"
      descriptionEn="n8n-based automation workflows—shipping soon."
      descriptionKo="n8n 기반 반복 작업 자동화 유틸리티를 준비 중입니다."
    />
  );
}
