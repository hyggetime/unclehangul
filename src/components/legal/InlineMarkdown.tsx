import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { KoreanListenBold } from "@/components/speech/KoreanListenBold";
import { hasHangul } from "@/utils/hangul-speak-text";

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const MARKDOWN_BOLD = /\*\*([^*]+)\*\*/g;
const MARKDOWN_ITALIC = /\*([^*]+)\*/g;
const MARKDOWN_CODE = /`([^`]+)`/g;

const linkClassName =
  "text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]";

const codeClassName =
  "font-mono text-[0.92em] rounded-sm bg-[#EBEBE5]/60 px-1 py-0.5 text-foreground/90";

type InlineMarkdownProps = {
  text: string;
  /** Bold segments that contain Hangul become tap-to-listen controls. */
  listenBoldHangul?: boolean;
};

type InlinePattern = {
  regex: RegExp;
  render: (content: string, key: number) => ReactNode;
};

function getInlinePatterns(listenBoldHangul: boolean): InlinePattern[] {
  return [
    {
      regex: MARKDOWN_BOLD,
      render: (content, key) =>
        listenBoldHangul && hasHangul(content) ? (
          <KoreanListenBold key={key} label={content} />
        ) : (
          <strong key={key} className="font-semibold text-foreground">
            {content}
          </strong>
        ),
    },
    {
      regex: MARKDOWN_ITALIC,
      render: (content, key) => (
        <em key={key} className="italic text-foreground/90">
          {content}
        </em>
      ),
    },
    {
      regex: MARKDOWN_CODE,
      render: (content, key) => (
        <code key={key} className={codeClassName}>
          {content}
        </code>
      ),
    },
  ];
}

function renderInlinePatterns(
  text: string,
  patterns: InlinePattern[],
  keyStart: number,
): ReactNode[] {
  if (!text) return [];

  if (!patterns.length) {
    return [<Fragment key={keyStart}>{text}</Fragment>];
  }

  const [current, ...rest] = patterns;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = keyStart;
  let matched = false;

  for (const match of text.matchAll(current.regex)) {
    matched = true;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push(
        ...renderInlinePatterns(text.slice(lastIndex, index), rest, key),
      );
      key += 100;
    }

    parts.push(current.render(match[1], key++));
    lastIndex = index + match[0].length;
  }

  if (!matched) {
    return renderInlinePatterns(text, rest, keyStart);
  }

  if (lastIndex < text.length) {
    parts.push(...renderInlinePatterns(text.slice(lastIndex), rest, key));
  }

  return parts.length ? parts : [<Fragment key={keyStart}>{text}</Fragment>];
}

export function InlineMarkdown({
  text,
  listenBoldHangul = false,
}: InlineMarkdownProps) {
  const patterns = getInlinePatterns(listenBoldHangul);
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(MARKDOWN_LINK)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push(
        <Fragment key={key++}>
          {renderInlinePatterns(text.slice(lastIndex, index), patterns, key)}
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
        {renderInlinePatterns(text.slice(lastIndex), patterns, key)}
      </Fragment>,
    );
  }

  if (!parts.length) {
    return <>{renderInlinePatterns(text, patterns, 0)}</>;
  }

  return <>{parts}</>;
}
