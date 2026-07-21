type BlogPostHeaderProps = {
  sectionLabel?: string;
  publishedLabel: string;
  publishedAt: string;
};

export function BlogPostHeader({
  sectionLabel = "LEARN / KOREAN",
  publishedLabel,
  publishedAt,
}: BlogPostHeaderProps) {
  return (
    <div className="grid h-12 grid-cols-[1fr_auto] border-b-[0.5px] border-[#D9D9D3]">
      <div className="flex items-center border-r-[0.5px] border-[#D9D9D3] px-5 md:px-8">
        <span className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
          {sectionLabel}
        </span>
      </div>
      <div className="flex items-center px-5 md:px-8">
        <time
          dateTime={publishedAt}
          className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45"
        >
          {publishedLabel}
        </time>
      </div>
    </div>
  );
}
