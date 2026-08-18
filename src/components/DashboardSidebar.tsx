import { YoutubeEmbed } from "@/components/media/YoutubeEmbed";
import { UNCLE_HANGUL_VIDEOS } from "@/lib/youtube";

export function DashboardSidebar() {
  const short = UNCLE_HANGUL_VIDEOS.tongueTwisterShort;

  return (
    <aside
      aria-label="Sidebar"
      className="hidden min-w-0 border-t-[0.5px] border-[#D9D9D3] md:block md:col-span-4 md:col-start-9 md:row-start-1 md:self-start md:border-l-[0.5px] md:border-t-0"
    >
      <div className="md:sticky md:top-14">
        <div className="p-5 md:p-8">
          <p className="font-en mb-5 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
            Shorts
          </p>

          <YoutubeEmbed
            videoId={short.id}
            title={short.title}
            layout="short"
          />

          <p className="font-ko mt-5 text-sm leading-relaxed text-foreground/60">
            발음·속어 숏폼. 이동 중에도 짧게 따라 읽어 봅니다.
          </p>
        </div>

        <div className="border-t-[0.5px] border-[#D9D9D3] p-5 md:p-8">
          <div
            aria-label="Tool or app promotion placeholder"
            className="flex min-h-[180px] flex-col items-center justify-center border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40 p-5 text-center md:min-h-[200px]"
          >
            <span className="font-en text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/35">
              Tool · App Promo
            </span>
            <span className="font-ko mt-2 text-xs leading-relaxed text-foreground/45">
              트래픽 유도 배너 영역
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
