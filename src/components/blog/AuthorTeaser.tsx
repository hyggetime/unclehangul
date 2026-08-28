import Link from "next/link";

const TEASER =
  "Hey, I'm Uncle Hangul — a 3D/Product designer turned certified Korean language teacher. I don't teach grammar; I show you visual contexts.";

export function AuthorTeaser() {
  return (
    <aside
      aria-label="About the author"
      className="mx-5 mb-8 max-w-3xl border-t-[0.5px] border-[#D9D9D3] pt-8 md:mx-8 md:mb-10 md:flex md:items-end md:justify-between md:gap-8 md:pt-10"
    >
      <p className="font-en text-sm leading-relaxed text-foreground/75 md:max-w-xl md:text-[15px]">
        {TEASER}
      </p>
      <Link
        href="/about"
        className="font-en touch-target mt-5 inline-flex min-h-12 shrink-0 items-center justify-center border-[0.5px] border-[#D9D9D3] bg-background px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E] active:border-[#FF4B3E] active:text-[#FF4B3E] md:mt-0"
      >
        Read full story ➔
      </Link>
    </aside>
  );
}
