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
  prefersTouchSelectionUi,
} from "@/utils/selection-speak";
import { speakText } from "@/utils/speak";

type ToolbarPlacement = "above" | "bottom-bar";

type ToolbarState = {
  text: string;
  x: number;
  y: number;
  placement: ToolbarPlacement;
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
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

    const useBottomBar = prefersTouchSelectionUi();

    if (useBottomBar) {
      setToolbar({
        text,
        x: 0,
        y: 0,
        placement: "bottom-bar",
      });
      return;
    }

    const rect = getSelectionRangeRect();
    if (!rect) {
      clearToolbar();
      return;
    }

    setToolbar({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top,
      placement: "above",
    });
  }, [clearToolbar, scoped]);

  const scheduleUpdate = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
      updateFromSelection();
    }, 80);
  }, [updateFromSelection]);

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (
        event.key === "Shift" ||
        event.key.startsWith("Arrow") ||
        (event.key === "a" && (event.ctrlKey || event.metaKey))
      ) {
        scheduleUpdate();
      }
    };

    const onScroll = () => clearToolbar();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") clearToolbar();
    };

    document.addEventListener("selectionchange", scheduleUpdate);
    document.addEventListener("touchend", scheduleUpdate, { passive: true });
    document.addEventListener("mouseup", scheduleUpdate);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      document.removeEventListener("selectionchange", scheduleUpdate);
      document.removeEventListener("touchend", scheduleUpdate);
      document.removeEventListener("mouseup", scheduleUpdate);
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [clearToolbar, scheduleUpdate]);

  function handleListen() {
    if (!toolbar) return;
    speakText(toolbar.text, detectSpeakLang(toolbar.text));
    clearToolbar();
    window.getSelection()?.removeAllRanges();
  }

  return (
    <div ref={rootRef} className="relative">
      {children}
      {toolbar?.placement === "bottom-bar" ? (
        <div
          role="toolbar"
          aria-label="Selection actions"
          className="fixed inset-x-0 bottom-0 z-[100] border-t-[0.5px] border-[#D9D9D3] bg-background/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <p className="font-ko min-w-0 flex-1 truncate text-sm text-foreground/70">
              {toolbar.text}
            </p>
            <button
              type="button"
              aria-label={`Listen to selected text: ${toolbar.text}`}
              onClick={handleListen}
              className="font-en touch-target inline-flex shrink-0 min-h-11 items-center justify-center border-[0.5px] border-[#111111] bg-[#111111] px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E]"
            >
              Listen ↗
            </button>
          </div>
        </div>
      ) : null}
      {toolbar?.placement === "above" ? (
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
