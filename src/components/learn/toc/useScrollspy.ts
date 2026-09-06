"use client";

import { useEffect, useState } from "react";

/** Highlight the h2 section closest to the upper viewport band while scrolling. */
export function useScrollspy(sectionIds: readonly string[]): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(sectionIds[0]);

  useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element != null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextId = visible[0]?.target.id;
        if (nextId) setActiveId(nextId);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.65, 1],
      },
    );

    for (const element of elements) observer.observe(element);

    return () => observer.disconnect();
  }, [sectionIds.join("|")]);

  return activeId;
}
