"use client";

import { useCallback, useEffect, useState } from "react";

const WIDGET_ORIGIN = "https://pack.unclehangul.com";
const WIDGET_SRC = `${WIDGET_ORIGIN}/pack-optimizer?widget=true`;
/** Before the iframe posts height; keeps layout stable on first paint. */
const INITIAL_HEIGHT_DESKTOP_PX = 1200;
const INITIAL_HEIGHT_MOBILE_PX = 720;
/** Floor after resize messages (short empty states). */
const MIN_HEIGHT_PX = 400;
const HEIGHT_BUFFER_PX = 16;

function parseHeightFromMessage(data: unknown): number | null {
  if (typeof data !== "object" || data === null) {
    if (typeof data === "number" && Number.isFinite(data) && data > 0) {
      return data;
    }
    return null;
  }

  const record = data as Record<string, unknown>;
  if (typeof record.height === "number" && record.height > 0) {
    return record.height;
  }

  const candidates = [record.frameHeight, record.scrollHeight];
  for (const value of candidates) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      return value;
    }
  }
  if (
    record.type === "resize" &&
    typeof record.height === "number" &&
    record.height > 0
  ) {
    return record.height;
  }
  return null;
}

function getInitialHeightPx(): number {
  if (typeof window === "undefined") {
    return INITIAL_HEIGHT_DESKTOP_PX;
  }
  return window.matchMedia("(max-width: 767px)").matches
    ? INITIAL_HEIGHT_MOBILE_PX
    : INITIAL_HEIGHT_DESKTOP_PX;
}

export function PackOptimizerFrame() {
  const [heightPx, setHeightPx] = useState(INITIAL_HEIGHT_DESKTOP_PX);

  useEffect(() => {
    setHeightPx(getInitialHeightPx());
  }, []);

  const applyHeight = useCallback((next: number) => {
    setHeightPx(
      Math.max(MIN_HEIGHT_PX, Math.ceil(next + HEIGHT_BUFFER_PX)),
    );
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== WIDGET_ORIGIN) return;
      const parsed = parseHeightFromMessage(event.data);
      if (parsed) applyHeight(parsed);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [applyHeight]);

  return (
    <iframe
      src={WIDGET_SRC}
      title="Pack Optimizer"
      className="block w-full max-w-none border-0 bg-transparent"
      style={{
        height: `${heightPx}px`,
        minHeight: `${MIN_HEIGHT_PX}px`,
        colorScheme: "light",
      }}
      allow="clipboard-write"
    />
  );
}
