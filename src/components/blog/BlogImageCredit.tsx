import {
  buildImageCreditSegments,
  type ImageCredit,
} from "@/lib/blog/image-credits";

type BlogImageCreditProps = {
  credit: ImageCredit;
};

export function BlogImageCredit({ credit }: BlogImageCreditProps) {
  const segments = buildImageCreditSegments(credit);

  return (
    <p className="font-en mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/45 not-italic">
      {segments.map((segment, index) =>
        segment.type === "link" ? (
          <a
            key={`${segment.href}-${index}`}
            href={segment.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-foreground/25 underline-offset-2 transition-colors hover:text-[#FF4B3E] hover:decoration-[#FF4B3E]"
          >
            {segment.label}
          </a>
        ) : (
          <span key={`${segment.value}-${index}`}>{segment.value}</span>
        ),
      )}
    </p>
  );
}
