import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { KoreanListenBold } from "@/components/speech/KoreanListenBold";
import { hasHangul } from "@/utils/hangul-speak-text";

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
/** Single-asterisk italic only — must not match the inner `*…*` of `**bold**`. */
const MARKDOWN_ITALIC = /(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g;
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
    if (!inner.length) {
      searchFrom = start + 1;
      continue;
    }

    const span = close + 2 - start;

    if (!best || span < best.span) {
      best = { start, end: close + 2, inner, span };
    }

    searchFrom = start + 2;
  }

  return best;
}

function renderLinkNode(
  label: string,
  href: string,
  key: number,
  listenBoldHangul: boolean,
): ReactNode {
  const external = /^https?:\/\//i.test(href);
  const child = renderRichText(label, listenBoldHangul, key + 1);

  if (external) {
    return (
      <a
        key={key}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {child}
      </a>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a key={key} href={href} className={linkClassName}>
        {child}
      </a>
    );
  }

  return (
    <Link key={key} href={href} className={linkClassName}>
      {child}
    </Link>
  );
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
      {renderLinksAndEmphasis(content, listenBoldHangul, key + 1)}
    </strong>
  );
}

/** Bold before links so **text [link](url)** parses correctly. */
function renderRichText(
  text: string,
  listenBoldHangul: boolean,
  keyStart: number,
): ReactNode[] {
  const pair = findShortestBoldPair(text);
  if (!pair) {
    return renderLinksAndEmphasis(text, listenBoldHangul, keyStart);
  }

  const parts: ReactNode[] = [];
  let key = keyStart;

  if (pair.start > 0) {
    parts.push(
      ...renderRichText(text.slice(0, pair.start), listenBoldHangul, key),
    );
    key += 100;
  }

  parts.push(renderBoldNode(pair.inner, listenBoldHangul, key++));
  parts.push(
    ...renderRichText(text.slice(pair.end), listenBoldHangul, key),
  );

  return parts;
}

function renderLinksAndEmphasis(
  text: string,
  listenBoldHangul: boolean,
  keyStart: number,
): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = keyStart;
  let matched = false;

  for (const match of text.matchAll(MARKDOWN_LINK)) {
    matched = true;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push(
        ...renderRichText(
          text.slice(lastIndex, index),
          listenBoldHangul,
          key,
        ),
      );
      key += 100;
    }

    parts.push(renderLinkNode(match[1], match[2], key++, listenBoldHangul));
    lastIndex = index + match[0].length;
  }

  if (!matched) {
    return renderInlinePatterns(
      text,
      getItalicAndCodePatterns(listenBoldHangul),
      listenBoldHangul,
      keyStart,
    );
  }

  if (lastIndex < text.length) {
    parts.push(
      ...renderRichText(
        text.slice(lastIndex),
        listenBoldHangul,
        key,
      ),
    );
  }

  return parts.length ? parts : [<Fragment key={keyStart}>{text}</Fragment>];
}

function getItalicAndCodePatterns(
  listenBoldHangul: boolean,
): InlinePattern[] {
  return [
    {
      regex: MARKDOWN_ITALIC,
      render: (content, key) => (
        <em key={key} className="italic text-foreground/90">
          {renderRichText(content, listenBoldHangul, key + 1)}
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
        ...renderRichText(
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
      ...renderRichText(text.slice(lastIndex), listenBoldHangul, key),
    );
  }

  return parts.length ? parts : [<Fragment key={keyStart}>{text}</Fragment>];
}

export function InlineMarkdown({
  text,
  listenBoldHangul = false,
}: InlineMarkdownProps) {
  return <>{renderRichText(text, listenBoldHangul, 0)}</>;
}
