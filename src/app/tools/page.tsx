import type { Metadata } from "next";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolsAdDrawer } from "@/components/tools/ToolsAdDrawer";
import { TOOLS_CATALOG } from "@/lib/tools/catalog";
import { getToolsIndexMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = getToolsIndexMetadata();

export default function ToolsPage() {
  return (
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="flex h-10 items-center border-b-[0.5px] border-[#D9D9D3] px-1">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            Tools / Real-time Applications
          </p>
        </div>

        <header className="border-b-[0.5px] border-[#D9D9D3] py-8 md:py-10">
          <h1 className="font-en text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            Tools
          </h1>
          <p className="font-en mt-4 hidden max-w-2xl text-sm leading-relaxed text-foreground/65 md:block md:text-base">
            In-house web apps across language, design, and automation—each slot
            on the same 0.5px grid. Add a row to the catalog when a tool ships;
            categories stay text-only.
          </p>
          <p className="font-ko mt-3 max-w-2xl text-sm leading-relaxed text-foreground/55 md:mt-2 md:text-base">
            한글 학습을 넘어 디자인·유틸리티·자동화까지, 확장 가능한 도구
            아카이브입니다.
          </p>
        </header>

        <div className="grid grid-cols-1 border-l-[0.5px] border-t-[0.5px] border-[#D9D9D3] md:grid-cols-3">
          {TOOLS_CATALOG.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}

          <ToolsAdDrawer className="md:col-span-3" />
        </div>
      </div>
    </div>
  );
}
