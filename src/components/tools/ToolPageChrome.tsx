import Link from "next/link";

type ToolPageChromeProps = {
  category: string;
  backHref?: string;
  backLabel?: string;
};

export function ToolPageChrome({
  category,
  backHref = "/tools",
  backLabel = "← Tools",
}: ToolPageChromeProps) {
  return (
    <div className="flex h-10 shrink-0 items-center justify-between gap-4 border-b-[0.5px] border-[#D9D9D3] px-5 md:px-8">
      <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
        Tools / {category}
      </p>
      <Link
        href={backHref}
        className="font-en shrink-0 text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
      >
        {backLabel}
      </Link>
    </div>
  );
}
