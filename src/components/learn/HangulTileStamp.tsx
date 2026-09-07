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
      const gridText =
        size === "md"
          ? "text-[17px] md:text-[20px]"
          : "text-[15px] md:text-[17px]";
      return (
        <div
          aria-hidden
          className={`grid grid-cols-2 grid-rows-2 overflow-hidden p-0 ${base}`}
        >
          {cells.map((cell, index) => (
            <span
              key={`${cell}-${index}`}
              className={`flex h-full w-full min-h-0 min-w-0 items-center justify-center leading-none ${gridText}`}
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
      ? size === "md"
        ? "text-sm md:text-base"
        : "text-xs md:text-sm"
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
