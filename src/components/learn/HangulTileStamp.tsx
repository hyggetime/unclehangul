import type { HangulTileSpec } from "@/lib/blog/post-visuals";

type HangulTileStampProps = {
  tile: HangulTileSpec;
  /** `sm` = home rail; `md` = learn index */
  size?: "sm" | "md";
  className?: string;
};

const SIZE_CLASS = {
  sm: "h-12 w-12 md:h-14 md:w-14",
  md: "h-14 w-14 md:h-16 md:w-16",
} as const;

const STAMP_GRID_CLASS = {
  /** Outer frame padding stays full; center cross gap is half for a roomier ㅁ edge. */
  sm: "[--stamp-pad:2px] box-border p-[var(--stamp-pad)] gap-[calc(var(--stamp-pad)*0.5)] text-[18px] md:[--stamp-pad:2.5px] md:text-[20px]",
  md: "[--stamp-pad:2.5px] box-border p-[var(--stamp-pad)] gap-[calc(var(--stamp-pad)*0.5)] text-[20px] md:[--stamp-pad:3px] md:text-[24px]",
} as const;

const TRIPLE_CHAR_CLASS = {
  sm: "text-xs md:text-sm",
  md: "text-sm md:text-base",
} as const;

/** Tighter horizontal inset (60%) with larger type to fill recovered width. */
const TRIPLE_CHAR_COMPACT_X_CLASS = {
  sm: "px-[3.6px] text-[13.5px] md:px-[4.2px] md:text-[16px]",
  md: "px-[4.2px] text-[16px] md:px-[4.8px] md:text-[18px]",
} as const;

function gridCells(text: string): [string, string, string, string] | null {
  const chars = [...text];
  if (chars.length !== 4) return null;
  return [chars[0], chars[1], chars[2], chars[3]];
}

export function HangulTileStamp({
  tile,
  size = "sm",
  className = "",
}: HangulTileStampProps) {
  const base = `font-ko shrink-0 border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40 font-black leading-none text-foreground ${SIZE_CLASS[size]} ${className}`.trim();

  if (tile.layout === "grid2x2") {
    const cells = gridCells(tile.text);
    if (cells) {
      return (
        <div
          aria-hidden
          className={`grid grid-cols-2 grid-rows-2 overflow-hidden ${STAMP_GRID_CLASS[size]} ${base}`}
        >
          {cells.map((cell, index) => (
            <span
              key={`${cell}-${index}`}
              className="flex h-full w-full min-h-0 min-w-0 items-center justify-center leading-none"
            >
              {cell}
            </span>
          ))}
        </div>
      );
    }
  }

  const length = [...tile.text].length;
  const singleText =
    length >= 3
      ? tile.insetXScale !== undefined && tile.insetXScale < 1
        ? TRIPLE_CHAR_COMPACT_X_CLASS[size]
        : TRIPLE_CHAR_CLASS[size]
      : size === "md"
        ? "text-xl md:text-2xl"
        : "text-lg md:text-xl";

  return (
    <div
      aria-hidden
      className={`flex items-center justify-center ${base} ${singleText}`}
    >
      {tile.text}
    </div>
  );
}
