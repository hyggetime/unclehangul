"use client";

import { useEffect, useRef } from "react";
import { mountKrAddressConverter } from "@/lib/tools/kr-address-converter/ui/adapter.js";

export function KrAddressFormatter() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    return mountKrAddressConverter(root);
  }, []);

  return <div ref={rootRef} className="kr-address-converter-root" />;
}
