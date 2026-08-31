"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  detectSpeakLang,
  getSelectionRangeRect,
  getTrimmedSelectionText,
  isNodeWithin,
  isSpeakableSelection,
} from "@/utils/selection-speak";
import { speakText } from "@/utils/speak";

type ToolbarState = {
  text: string;
  x: number;
  y: number;
};

type TextSelectionSpeakProps = {
  children: ReactNode;
  /** When true, only selections inside this wrapper trigger the toolbar. */
  scoped?: boolean;
};

export function TextSelectionSpeak({
  children,
  scoped = true,
}: TextSelectionSpeakProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [toolbar, setToolbar] = useState<ToolbarState | null>(null);

  const clearToolbar = useCallback(() => setToolbar(null), []);

  const updateFromSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      clearToolbar();
      return;
    }

    if (scoped) {
      const anchor = selection.anchorNode;
      const focus = selection.focusNode;
      const root = rootRef.current;
      if (!isNodeWithin(root, anchor) || !isNodeWithin(root, focus)) {
        clearToolbar();
        return;
      }
    }

    const text = getTrimmedSelectionText();
    if (!isSpeakableSelection(text)) {
      clearToolbar();
      return;
    }

    const rect = getSelectionRangeRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) {
      clearToolbar();
      return;
    }

    setToolbar({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }, [clearToolbar, scoped]);

  useEffect(() => {
    const onMouseUp = () => {
      window.requestAnimationFrame(updateFromSelection);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (
        event.key === "Shift" ||
        event.key.startsWith("Arrow") ||
        event.key === "a" && (event.ctrlKey || event.metaKey)
      ) {
        window.requestAnimationFrame(updateFromSelection);
      }
    };

    const onScroll = () => clearToolbar();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") clearToolbar();
    };

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [clearToolbar, updateFromSelection]);

  function handleListen() {
    if (!toolbar) return;
    speakText(toolbar.text, detectSpeakLang(toolbar.text));
    clearToolbar();
    window.getSelection()?.removeAllRanges();
  }

  return (
    <div ref={rootRef} className="relative">
      {children}
      {toolbar ? (
        <button
          type="button"
          aria-label={`Listen to selected text: ${toolbar.text}`}
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleListen}
          className="font-en fixed z-50 inline-flex min-h-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#F2F2F0] shadow-sm transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E]"
          style={{ left: toolbar.x, top: toolbar.y }}
        >
          Listen ↗
        </button>
      ) : null}
    </div>
  );
}
