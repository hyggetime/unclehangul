import Link from "next/link";

type ToolCrossLink = {
  href: string;
  title: string;
  descriptionKo: string;
};

type ToolCrossLinksProps = {
  heading?: string;
  links: ToolCrossLink[];
};

export function ToolCrossLinks({
  heading = "Related tools",
  links,
}: ToolCrossLinksProps) {
  return (
    <aside className="mt-10 border-t-[0.5px] border-[#D9D9D3] pt-8">
      <h3 className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
        {heading}
      </h3>
      <ul className="mt-4 divide-y-[0.5px] divide-[#D9D9D3] border-[0.5px] border-[#D9D9D3]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group block px-4 py-4 transition-colors hover:bg-[#EBEBE5]/50 md:px-6"
            >
              <span className="font-en text-sm font-bold text-foreground transition-colors group-hover:text-[#FF4B3E]">
                {link.title}
              </span>
              <span className="font-ko mt-1 block text-sm leading-relaxed text-foreground/60">
                {link.descriptionKo}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
