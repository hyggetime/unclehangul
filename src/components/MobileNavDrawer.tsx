"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { PRIMARY_NAV_ITEMS } from "@/lib/site-nav";

export function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="font-en touch-target inline-flex items-center justify-center px-2 text-[11px] font-bold uppercase tracking-[0.14em] md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-40 bg-foreground/15 md:hidden"
            onClick={close}
          />

          <nav
            id={panelId}
            aria-label="Mobile primary"
            className="fixed inset-x-0 top-12 z-50 max-h-[calc(100dvh-3rem)] overflow-y-auto border-b-[0.5px] border-[#D9D9D3] bg-background md:hidden"
          >
            {PRIMARY_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="group touch-target flex items-center justify-between gap-5 border-t-[0.5px] border-[#D9D9D3] p-5 py-5 transition-colors hover:bg-[#EBEBE5]/40 active:bg-[#EBEBE5]/40"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-en block text-xl font-black leading-tight tracking-tight text-foreground transition-colors group-hover:text-[#FF4B3E] group-active:text-[#FF4B3E]">
                    {item.title}
                  </span>
                  <span className="font-ko mt-1 block text-sm leading-relaxed text-foreground/55">
                    {item.descriptionKo}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="font-en shrink-0 text-lg text-foreground transition-colors group-hover:text-[#FF4B3E] group-active:text-[#FF4B3E]"
                >
                  ↘
                </span>
              </Link>
            ))}

            <Link
              href="/about"
              onClick={close}
              className="group touch-target flex items-center justify-between gap-5 border-t-[0.5px] border-[#D9D9D3] p-5 py-5 transition-colors hover:bg-[#EBEBE5]/40 active:bg-[#EBEBE5]/40"
            >
              <div className="min-w-0 flex-1">
                <span className="font-en block text-xl font-black leading-tight tracking-tight text-foreground transition-colors group-hover:text-[#FF4B3E] group-active:text-[#FF4B3E]">
                  About
                </span>
                <span className="font-ko mt-1 block text-sm leading-relaxed text-foreground/55">
                  한글아저씨 이야기.
                </span>
              </div>
              <span
                aria-hidden
                className="font-en shrink-0 text-lg text-foreground transition-colors group-hover:text-[#FF4B3E] group-active:text-[#FF4B3E]"
              >
                ↘
              </span>
            </Link>
          </nav>
        </>
      ) : null}
    </>
  );
}
