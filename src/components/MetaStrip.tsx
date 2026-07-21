type MetaStripProps = {
  category: string;
  date: string;
};

export function MetaStrip({ category, date }: MetaStripProps) {
  return (
    <div className="grid h-10 grid-cols-[1fr_auto] border-b-[0.5px] border-[#D9D9D3]">
      <div className="flex items-center border-r-[0.5px] border-[#D9D9D3] px-5">
        <span className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
          {category}
        </span>
      </div>
      <div className="flex items-center px-5">
        <span className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
          {date}
        </span>
      </div>
    </div>
  );
}
