import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { KoreanListenBold } from "@/components/speech/KoreanListenBold";
import { hasHangul } from "@/utils/hangul-speak-text";

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
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

type BoldPair = {
  start: number;
  end: number;
  inner: string;
};

/** Innermost **…** span first — fixes nested bold like **Years (**년**)**. */
function findShortestBoldPair(text: string): BoldPair | null {
  let best: (BoldPair & { span: number }) | null = null;

  for (let searchFrom = 0; searchFrom < text.length; ) {
    const start = text.indexOf("**", searchFrom);
    if (start === -1) break;

    const close = text.indexOf("**", start + 2);
    if (close === -1) break;

    const inner = text.slice(start + 2, close);
    const span = close + 2 - start;

    if (!best || span < best.span) {
      best = { start, end: close + 2, inner, span };
    }

    searchFrom = start + 2;
  }

  return best;
}

function renderBoldNode(
  content: string,
  listenBoldHangul: boolean,
  key: number,
): ReactNode {
  if (listenBoldHangul && hasHangul(content)) {
    return <KoreanListenBold key={key} label={content} />;
  }

  return (
    <strong key={key} className="font-semibold text-foreground">
      {renderItalicAndCode(content, listenBoldHangul, key + 1)}
    </strong>
  );
}

function renderBoldSegments(
  text: string,
  listenBoldHangul: boolean,
  keyStart: number,
): ReactNode[] {
  const pair = findShortestBoldPair(text);
  if (!pair) {
    return renderItalicAndCode(text, listenBoldHangul, keyStart);
  }

  const parts: ReactNode[] = [];
  let key = keyStart;

  if (pair.start > 0) {
    parts.push(
      ...renderItalicAndCode(
        text.slice(0, pair.start),
        listenBoldHangul,
        key,
      ),
    );
    key += 100;
  }

  parts.push(renderBoldNode(pair.inner, listenBoldHangul, key++));
  parts.push(
    ...renderBoldSegments(text.slice(pair.end), listenBoldHangul, key),
  );

  return parts;
}

function getItalicAndCodePatterns(
  listenBoldHangul: boolean,
): InlinePattern[] {
  return [
    {
      regex: MARKDOWN_ITALIC,
      render: (content, key) => (
        <em key={key} className="italic text-foreground/90">
          {renderBoldSegments(content, listenBoldHangul, key + 1)}
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
  listenBoldHangul: boolean,
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
        ...renderBoldSegments(
          text.slice(lastIndex, index),
          listenBoldHangul,
          key,
        ),
      );
      key += 100;
    }

    parts.push(current.render(match[1], key++));
    lastIndex = index + match[0].length;
  }

  if (!matched) {
    return rest.length
      ? renderInlinePatterns(text, rest, listenBoldHangul, keyStart)
      : [<Fragment key={keyStart}>{text}</Fragment>];
  }

  if (lastIndex < text.length) {
    parts.push(
      ...renderBoldSegments(
        text.slice(lastIndex),
        listenBoldHangul,
        key,
      ),
    );
  }

  return parts.length ? parts : [<Fragment key={keyStart}>{text}</Fragment>];
}

function renderItalicAndCode(
  text: string,
  listenBoldHangul: boolean,
  keyStart: number,
): ReactNode[] {
  return renderInlinePatterns(
    text,
    getItalicAndCodePatterns(listenBoldHangul),
    listenBoldHangul,
    keyStart,
  );
}

export function InlineMarkdown({
  text,
  listenBoldHangul = false,
}: InlineMarkdownProps) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(MARKDOWN_LINK)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push(
        <Fragment key={key++}>
          {renderBoldSegments(
            text.slice(lastIndex, index),
            listenBoldHangul,
            key,
          )}
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
        {renderBoldSegments(
          text.slice(lastIndex),
          listenBoldHangul,
          key,
        )}
      </Fragment>,
    );
  }

  if (!parts.length) {
    return <>{renderBoldSegments(text, listenBoldHangul, 0)}</>;
  }

  return <>{parts}</>;
}
