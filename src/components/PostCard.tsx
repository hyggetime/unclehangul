import Image from "next/image";
import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import { YoutubeEmbed } from "@/components/media/YoutubeEmbed";
import { MetaStrip } from "@/components/MetaStrip";

type PostCardProps = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  className?: string;
  /** Mobile: link instead of embed to shorten home scroll. */
  deferMediaOnMobile?: boolean;
  mediaLinkHref?: string;
  media:
    | {
        type: "youtube";
        videoId: string;
        title: string;
        layout?: "short" | "long";
      }
    | {
        type: "image";
        src: string;
        alt: string;
        width: number;
        height: number;
      };
};

export function PostCard({
  category,
  date,
  title,
  excerpt,
  className = "",
  deferMediaOnMobile = false,
  mediaLinkHref,
  media,
}: PostCardProps) {
  return (
    <article
      className={`border-t-[0.5px] border-[#D9D9D3] ${className}`.trim()}
    >
      <MetaStrip category={category} date={date} />

      <div className="flex flex-col gap-6 p-5 pt-7 md:p-8 md:pt-8">
        <h2 className="font-en break-words text-2xl font-black leading-tight tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>

        {media.type === "youtube" ? (
          deferMediaOnMobile && mediaLinkHref ? (
            <>
              <div className="md:hidden">
                <Link
                  href={mediaLinkHref}
                  className="font-en flex min-h-12 items-center justify-between border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/50 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]"
                >
                  Watch full lesson
                  <span aria-hidden>↗</span>
                </Link>
              </div>
              <div className="hidden md:block">
                <YoutubeEmbed
                  videoId={media.videoId}
                  title={media.title}
                  layout={media.layout}
                />
              </div>
            </>
          ) : (
            <YoutubeEmbed
              videoId={media.videoId}
              title={media.title}
              layout={media.layout}
            />
          )
        ) : (
          <MediaFrame>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={media.src}
                alt={media.alt}
                width={media.width}
                height={media.height}
                className="h-full w-full rounded-none object-cover"
                sizes="(max-width: 448px) 100vw, 448px"
              />
            </div>
          </MediaFrame>
        )}

        <p className="font-ko text-sm leading-relaxed text-foreground/65">
          {excerpt}
        </p>
      </div>
    </article>
  );
}
