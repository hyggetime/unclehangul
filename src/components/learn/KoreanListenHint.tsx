export function KoreanListenHint() {
  return (
    <div
      role="note"
      className="font-en mx-5 mb-4 max-w-3xl border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/35 px-4 py-3 text-xs leading-relaxed text-foreground/65 md:mx-8 md:text-sm"
    >
      <span className="font-bold uppercase tracking-[0.12em] text-foreground/45">
        Listen
      </span>
      <span className="mx-2 text-foreground/25">·</span>
      Tap{" "}
      <span className="font-ko font-semibold text-foreground underline decoration-[#FF4B3E]/55 decoration-dotted underline-offset-[3px]">
        bold Korean
      </span>{" "}
      in this article to hear pronunciation.
    </div>
  );
}
