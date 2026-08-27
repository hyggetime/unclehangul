import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const MARKDOWN_BOLD = /\*\*([^*]+)\*\*/g;

const linkClassName =
  "text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]";

type InlineMarkdownProps = {
  text: string;
};

function renderBoldSegments(text: string, keyStart: number): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = keyStart;

  for (const match of text.matchAll(MARKDOWN_BOLD)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push(
        <Fragment key={key++}>{text.slice(lastIndex, index)}</Fragment>,
      );
    }
    parts.push(
      <strong key={key++} className="font-semibold text-foreground">
        {match[1]}
      </strong>,
    );
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return parts.length ? parts : [text];
}

export function InlineMarkdown({ text }: InlineMarkdownProps) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(MARKDOWN_LINK)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push(
        <Fragment key={key++}>
          {renderBoldSegments(text.slice(lastIndex, index), key)}
        </Fragment>,
      );
      key += 10;
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
    parts.push(
      <Fragment key={key++}>
        {renderBoldSegments(text.slice(lastIndex), key)}
      </Fragment>,
    );
  }

  if (!parts.length) {
    return <>{renderBoldSegments(text, 0)}</>;
  }

  return <>{parts}</>;
}
