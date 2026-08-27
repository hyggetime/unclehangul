import Link from "next/link";

type ToolCrossLink = {
  href: string;
  title: string;
  descriptionKo: string;
  external?: boolean;
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
        {links.map((link) => {
          const inner = (
            <>
              <span className="font-en text-sm font-bold text-foreground transition-colors group-hover:text-[#FF4B3E]">
                {link.title}
                {link.external ? (
                  <span className="ml-1 text-xs" aria-hidden>
                    ↗
                  </span>
                ) : null}
              </span>
              <span className="font-ko mt-1 block text-sm leading-relaxed text-foreground/60">
                {link.descriptionKo}
              </span>
            </>
          );

          return (
            <li key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block px-4 py-4 transition-colors hover:bg-[#EBEBE5]/50 md:px-6"
                >
                  {inner}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="group block px-4 py-4 transition-colors hover:bg-[#EBEBE5]/50 md:px-6"
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
