import Link from "next/link";

type ComingSoonShellProps = {
  sectionLabel?: string;
  title: string;
  titleKo: string;
  descriptionEn: string;
  descriptionKo: string;
  backHref?: string;
  backLabel?: string;
};

export function ComingSoonShell({
  sectionLabel = "HANGUL PLAY",
  title,
  titleKo,
  descriptionEn,
  descriptionKo,
  backHref = "/play",
  backLabel = "← Hangul Play",
}: ComingSoonShellProps) {
  return (
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="flex h-10 items-center justify-between gap-4 border-b-[0.5px] border-[#D9D9D3] px-1">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            {sectionLabel}
          </p>
          <Link
            href="/"
            className="font-en shrink-0 text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
          >
            Home ↗
          </Link>
        </div>

        <div className="mx-auto max-w-xl px-1 py-10 md:py-12">
          <p className="font-en text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF4B3E]">
            Coming soon
          </p>
          <h1 className="font-en mt-4 text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl">
            {title}
          </h1>
          <p className="font-ko mt-2 text-sm font-bold text-foreground/55 md:text-base">
            {titleKo}
          </p>
          <p className="font-en mt-6 text-sm leading-relaxed text-foreground/65 md:text-base">
            {descriptionEn}
          </p>
          <p className="font-ko mt-3 text-sm leading-relaxed text-foreground/55">
            {descriptionKo}
          </p>

          <div className="mt-10 flex min-h-[120px] items-center justify-center border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40 p-6 text-center">
            <p className="font-en text-xs font-bold uppercase tracking-[0.14em] text-foreground/40">
              Under construction
            </p>
          </div>

          <Link
            href={backHref}
            className="font-en touch-target mt-8 inline-flex min-h-12 items-center text-xs font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:text-[#FF4B3E]"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
