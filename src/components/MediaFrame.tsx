type MediaFrameProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Mutes strong media colors by default; restores on hover / touch (group-active).
 */
export function MediaFrame({ children, className = "" }: MediaFrameProps) {
  return (
    <div
      className={`group/media relative overflow-hidden border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/30 ${className}`}
    >
      <div className="media-muted transition-all duration-300 group-hover/media:grayscale-0 group-hover/media:opacity-100 group-active/media:grayscale-0 group-active/media:opacity-100">
        {children}
      </div>
    </div>
  );
}
