import Link from "next/link";
import { Fragment } from "react";

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

const linkClassName =
  "text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]";

type InlineMarkdownProps = {
  text: string;
};

export function InlineMarkdown({ text }: InlineMarkdownProps) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(MARKDOWN_LINK)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push(
        <Fragment key={key++}>{text.slice(lastIndex, index)}</Fragment>,
      );
    }

    const label = match[1];
    const href = match[2];
    const external = /^https?:\/\//i.test(href);

    if (external) {
      parts.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {label}
        </a>,
      );
    } else if (href.startsWith("mailto:")) {
      parts.push(
        <a key={key++} href={href} className={linkClassName}>
          {label}
        </a>,
      );
    } else {
      parts.push(
        <Link key={key++} href={href} className={linkClassName}>
          {label}
        </Link>,
      );
    }

    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{parts}</>;
}
