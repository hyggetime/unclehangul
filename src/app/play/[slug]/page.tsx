import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CityNamesWidget } from "@/components/play/CityNamesWidget";
import { ComingSoonShell } from "@/components/play/ComingSoonShell";
import { JamoBuilderWidget } from "@/components/play/JamoBuilderWidget";
import { PlayWidgetPageShell } from "@/components/play/PlayWidgetPageShell";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getPlayUsageGuide } from "@/lib/play/usage-guides";
import { PLAY_WIDGETS, getPlayWidget } from "@/lib/play/catalog";

type PlayWidgetPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PLAY_WIDGETS.filter((widget) => widget.slug !== "name-converter").map(
    (widget) => ({ slug: widget.slug }),
  );
}

export async function generateMetadata({
  params,
}: PlayWidgetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const widget = getPlayWidget(slug);
  if (!widget) return { title: "Not found" };

  return buildPageMetadata({
    title: widget.title,
    description: widget.descriptionEn,
    path: `/play/${slug}`,
    noIndex: widget.status === "coming-soon",
  });
}

export default async function PlayWidgetPage({ params }: PlayWidgetPageProps) {
  const { slug } = await params;
  const widget = getPlayWidget(slug);

  if (!widget) {
    notFound();
  }

  const selfPath = `/play/${slug}`;

  if (widget.status === "live" && widget.href && widget.href !== selfPath) {
    redirect(widget.href);
  }

  if (widget.status === "live") {
    if (slug === "city-names") {
      return (
        <PlayWidgetPageShell
          title={widget.title}
          titleKo={widget.titleKo}
          descriptionEn={widget.descriptionEn}
          descriptionKo={widget.descriptionKo}
          feedbackContentId={slug}
          usageGuide={getPlayUsageGuide(slug)}
        >
          <CityNamesWidget />
        </PlayWidgetPageShell>
      );
    }

    if (slug === "jamo-builder") {
      return (
        <PlayWidgetPageShell
          title={widget.title}
          titleKo={widget.titleKo}
          descriptionEn={widget.descriptionEn}
          descriptionKo={widget.descriptionKo}
          feedbackContentId={slug}
          usageGuide={getPlayUsageGuide(slug)}
        >
          <JamoBuilderWidget />
        </PlayWidgetPageShell>
      );
    }
  }

  if (widget.status === "coming-soon") {
    return (
      <ComingSoonShell
        title={widget.title}
        titleKo={widget.titleKo}
        descriptionEn={widget.descriptionEn}
        descriptionKo={widget.descriptionKo}
      />
    );
  }

  notFound();
}
