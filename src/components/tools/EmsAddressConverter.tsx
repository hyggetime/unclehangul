"use client";

import { useEffect, useRef } from "react";
import { mountEmsConverter } from "@/lib/tools/ems-converter/ui/adapter.js";

export function EmsAddressConverter() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    return mountEmsConverter(root);
  }, []);

  return <div ref={rootRef} className="ems-converter-root" />;
}
