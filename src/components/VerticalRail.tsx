const RAIL_LABELS = ["UNCLEHANGUL", "KOREAN"] as const;

export function VerticalRail() {
  return (
    <aside
      aria-hidden
      className="flex w-8 shrink-0 flex-col items-center justify-between border-l-[0.5px] border-[#D9D9D3] py-10"
    >
      {RAIL_LABELS.map((label) => (
        <span
          key={label}
          className="font-en select-none text-[8px] font-bold uppercase tracking-[0.35em] text-foreground/20 [writing-mode:vertical-rl]"
        >
          {label}
        </span>
      ))}
    </aside>
  );
}
