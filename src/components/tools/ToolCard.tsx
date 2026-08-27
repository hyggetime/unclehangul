import Link from "next/link";
import type { ToolCategory } from "@/lib/tools/catalog";
import { formatCategoryTag } from "@/lib/tools/catalog";

export type ToolCardProps = {
  number: string;
  category: ToolCategory;
  title: string;
  descriptionEn: string;
  descriptionKo: string;
  href: string;
  external?: boolean;
  className?: string;
};

export function ToolCard({
  number,
  category,
  title,
  descriptionEn,
  descriptionKo,
  href,
  external = false,
  className = "",
}: ToolCardProps) {
  const cardClassName =
    `group flex min-h-[220px] flex-col justify-between border-r-[0.5px] border-b-[0.5px] border-[#D9D9D3] bg-background p-5 transition-colors md:min-h-[260px] md:p-6 ${className}`.trim();

  const content = (
    <>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-en text-xs font-bold tracking-widest text-foreground/40">
          {number}
        </span>
        <span className="font-en text-[10px] font-bold tracking-wider text-foreground/45">
          {formatCategoryTag(category)}
        </span>
        {external ? (
          <span className="font-en text-[10px] font-bold tracking-wider text-foreground/35">
            ↗
          </span>
        ) : null}
      </div>

      <div className="my-6 min-w-0 flex-1">
        <h2 className="font-en text-2xl font-black leading-tight tracking-tight text-foreground transition-colors duration-200 group-hover:text-[#FF4B3E] group-active:text-[#FF4B3E]">
          {title}
        </h2>
        <p className="font-en mt-3 text-sm leading-relaxed text-foreground/65">
          {descriptionEn}
        </p>
        <p className="font-ko mt-2 text-sm leading-relaxed text-foreground/55">
          {descriptionKo}
        </p>
      </div>

      <span
        aria-hidden
        className="font-en self-end text-2xl leading-none text-foreground transition-colors duration-200 group-hover:text-[#FF4B3E] group-active:text-[#FF4B3E]"
      >
        ↘
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cardClassName}>
      {content}
    </Link>
  );
}
