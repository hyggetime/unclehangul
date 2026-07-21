import Image from "next/image";
import { MediaFrame } from "@/components/MediaFrame";
import { YoutubeEmbed } from "@/components/media/YoutubeEmbed";
import type { BlogBlock } from "@/lib/blog/posts";

type BlogBodyProps = {
  blocks: BlogBlock[];
  constrainWidth?: boolean;
};

export function BlogBody({ blocks, constrainWidth = false }: BlogBodyProps) {
  return (
    <div
      className={`blog-prose px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-10 ${constrainWidth ? "max-w-3xl" : ""}`}
    >
      {blocks.map((block, index) => (
        <BlogBlockRenderer key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function BlogBlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-ko mb-6 text-base leading-relaxed text-foreground/80">
          {block.content}
        </p>
      );

    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="font-en blog-heading-2 mb-4 mt-10 border-t-[0.5px] border-[#D9D9D3] pt-8 text-xl font-bold leading-tight tracking-[-0.02em] text-foreground first:mt-0 first:border-t-0 first:pt-0 md:text-2xl md:tracking-tight">
            {block.content}
          </h2>
        );
      }
      return (
        <h3 className="font-en blog-heading-3 mb-3 mt-8 border-t-[0.5px] border-[#D9D9D3] pt-6 text-base font-bold leading-snug tracking-[-0.01em] text-foreground md:text-lg md:leading-tight">
          {block.content}
        </h3>
      );

    case "divider":
      return (
        <hr className="my-10 border-0 border-t-[0.5px] border-[#D9D9D3]" />
      );

    case "youtube":
      return (
        <figure className="my-8 min-w-0">
          <YoutubeEmbed
            videoId={block.videoId}
            title={block.title}
            layout={block.layout}
          />
          <figcaption className="font-en mt-3 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
            Video · Uncle Hangul
          </figcaption>
        </figure>
      );

    case "image":
      return (
        <figure className="my-8">
          <MediaFrame>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                className="h-full w-full rounded-none object-cover"
                sizes="(max-width: 448px) 100vw, 448px"
              />
            </div>
          </MediaFrame>
          {block.alt ? (
            <figcaption className="font-ko mt-3 text-xs leading-relaxed text-foreground/50">
              {block.alt}
            </figcaption>
          ) : null}
        </figure>
      );

    default:
      return null;
  }
}
