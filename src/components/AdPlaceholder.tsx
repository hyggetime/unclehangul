type AdSlot = "bottom" | "sidebar" | "inline";

const SLOT_MIN_HEIGHT: Record<AdSlot, string> = {
  bottom: "min-h-16 pb-[env(safe-area-inset-bottom,0px)]",
  sidebar: "min-h-[250px] lg:min-h-[600px]",
  inline: "min-h-[250px]",
};

type AdPlaceholderProps = {
  slot: AdSlot;
  className?: string;
  label?: string;
};

/**
 * Reserved AdSense frame. Fixed min-height prevents CLS when ads load.
 * Swap children for real ad units later — keep the outer shell dimensions.
 */
export function AdPlaceholder({
  slot,
  className = "",
  label = "Advertisement",
}: AdPlaceholderProps) {
  return (
    <aside
      aria-label={label}
      data-ad-slot={slot}
      className={`hairline flex w-full items-center justify-center bg-background ${SLOT_MIN_HEIGHT[slot]} ${className}`}
    >
      <span className="font-en text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/35">
        {label}
      </span>
    </aside>
  );
}
