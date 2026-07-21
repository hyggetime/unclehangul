import { MediaFrame } from "@/components/MediaFrame";
import {
  isYoutubeShortLayout,
  youtubeEmbedSrc,
  type YoutubeLayout,
} from "@/lib/youtube";

type YoutubeEmbedProps = {
  videoId: string;
  title: string;
  layout?: YoutubeLayout;
};

export function YoutubeEmbed({ videoId, title, layout }: YoutubeEmbedProps) {
  const isShort = isYoutubeShortLayout(videoId, layout);

  const inner = (
    <div
      className={
        isShort
          ? "relative mx-auto aspect-[9/16] w-full max-w-[280px] bg-[#EBEBE5]"
          : "relative aspect-video w-full bg-[#EBEBE5]"
      }
    >
      <iframe
        className="absolute inset-0 h-full w-full rounded-none"
        src={youtubeEmbedSrc(videoId)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  if (isShort) {
    return (
      <div className="flex w-full justify-center">
        <MediaFrame className="w-full max-w-[280px]">{inner}</MediaFrame>
      </div>
    );
  }

  return <MediaFrame>{inner}</MediaFrame>;
}
