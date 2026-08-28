import type { ReactNode } from "react";

type ToolPageHeaderProps = {
  title: string;
  titleLang?: "ko" | "en";
  /** English subtitle — desktop only. */
  subtitleEn?: string;
  descriptionKo?: ReactNode;
  /** English body copy — desktop only. */
  descriptionEn?: ReactNode;
  /** When true, omits bottom border (used inside sticky seller-tool header). */
  embedded?: boolean;
  className?: string;
};

export function ToolPageHeader({
  title,
  titleLang = "ko",
  subtitleEn,
  descriptionKo,
  descriptionEn,
  embedded = false,
  className = "",
}: ToolPageHeaderProps) {
  const titleClass = titleLang === "ko" ? "font-ko" : "font-en";

  return (
    <header
      className={`min-w-0 flex-1 ${embedded ? "" : "border-b-[0.5px] border-[#D9D9D3] pb-6 md:pb-8"} ${className}`.trim()}
    >
      <h1
        className={`${titleClass} text-2xl font-black leading-tight tracking-tight text-foreground md:text-4xl`}
      >
        {title}
      </h1>
      {subtitleEn ? (
        <p className="font-en mt-2 hidden text-sm font-bold tracking-tight text-foreground/45 md:block">
          {subtitleEn}
        </p>
      ) : null}
      {descriptionKo ? (
        <p className="font-ko mt-3 max-w-2xl text-sm leading-relaxed text-foreground/65 md:mt-4 md:text-base">
          {descriptionKo}
        </p>
      ) : null}
      {descriptionEn ? (
        <p className="font-en mt-2 hidden max-w-2xl text-sm leading-relaxed text-foreground/55 md:block">
          {descriptionEn}
        </p>
      ) : null}
    </header>
  );
}
