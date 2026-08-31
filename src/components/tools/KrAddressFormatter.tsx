"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  SAMPLE_MAPO_DETAIL_KO,
  SAMPLE_MAPO_HIT,
  SAMPLE_MAPO_LINE2,
  formatInboundLabelText,
  romanizeDetailAddress,
} from "@/lib/tools/kr-address/format";
import type {
  JusoSearchHit,
  JusoSearchResponse,
  KrAddressFields,
} from "@/lib/tools/kr-address/types";

const EMPTY_FIELDS: KrAddressFields = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  zip: "",
};

const FIELD_ROWS: {
  key: keyof KrAddressFields;
  label: string;
  hint: string;
  placeholder: string;
}[] = [
  {
    key: "line1",
    label: "Address Line 1",
    hint: "Street + building no.",
    placeholder: "19-4 Seogang-ro",
  },
  {
    key: "line2",
    label: "Address Line 2",
    hint: "Unit / floor / room",
    placeholder: "8F, Room 801",
  },
  {
    key: "city",
    label: "City / District",
    hint: "Gu / si / gun",
    placeholder: "Mapo-gu",
  },
  {
    key: "state",
    label: "State / Province / Region",
    hint: "Do / special city",
    placeholder: "Seoul",
  },
  {
    key: "zip",
    label: "ZIP / Postal Code",
    hint: "5-digit",
    placeholder: "04058",
  },
];

const inputClass =
  "font-en w-full min-w-0 rounded-none border-[0.5px] border-[#D9D9D3] bg-background px-3 py-3 text-sm text-foreground shadow-none outline-none ring-0 placeholder:text-foreground/35 focus:border-[#FF4B3E] focus:outline-none focus:ring-0";

const copyClass =
  "font-en touch-target shrink-0 border-[0.5px] border-[#D9D9D3] bg-transparent px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:border-[#FF4B3E] hover:bg-[#FF4B3E] hover:text-[#F2F2F0] active:border-[#FF4B3E] active:bg-[#FF4B3E] active:text-[#F2F2F0] disabled:pointer-events-none disabled:opacity-35";

const btnClass =
  "font-en touch-target border-[0.5px] border-[#D9D9D3] bg-transparent px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:border-[#FF4B3E] hover:bg-[#FF4B3E] hover:text-[#F2F2F0] active:border-[#FF4B3E] active:bg-[#FF4B3E] active:text-[#F2F2F0] disabled:pointer-events-none disabled:opacity-35";

function track(action: string, field?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("uh:tool-action", {
      detail: { tool: "kr-address-formatter", action, field },
    }),
  );
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const probe = document.createElement("textarea");
  probe.value = value;
  probe.setAttribute("readonly", "");
  probe.style.position = "fixed";
  probe.style.left = "-9999px";
  document.body.appendChild(probe);
  probe.select();
  document.execCommand("copy");
  probe.remove();
}

function hasSplitResult(fields: KrAddressFields) {
  return Boolean(fields.line1.trim() || fields.zip.trim());
}

export function KrAddressFormatter() {
  const searchId = useId();
  const detailId = useId();
  const abortRef = useRef<AbortController | null>(null);
  const searchTimer = useRef<number | undefined>(undefined);

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hits, setHits] = useState<JusoSearchHit[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selected, setSelected] = useState<JusoSearchHit | null>(null);
  const [fields, setFields] = useState<KrAddressFields>(EMPTY_FIELDS);
  const [koreanBase, setKoreanBase] = useState("");
  const [detailKo, setDetailKo] = useState("");
  const [line2Dirty, setLine2Dirty] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const copiedTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = "en";
    return () => {
      document.documentElement.lang = previous;
      abortRef.current?.abort();
      if (searchTimer.current) window.clearTimeout(searchTimer.current);
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
    };
  }, []);

  const applyHit = useCallback(
    (hit: JusoSearchHit, nextDetail = detailKo, keepLine2 = line2Dirty) => {
      const romanized = romanizeDetailAddress(nextDetail);
      setSelected(hit);
      setKoreanBase(hit.koreanBase);
      setFields({
        line1: hit.line1,
        line2: keepLine2 ? fields.line2 : romanized,
        city: hit.city,
        state: hit.state,
        zip: hit.zip,
      });
    },
    [detailKo, fields.line2, line2Dirty],
  );

  const runSearch = useCallback(async (keyword: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setSearching(true);
    setSearchError(null);

    try {
      const params = new URLSearchParams({ q: keyword, page: "1" });
      const response = await fetch(`/api/v1/juso/search?${params.toString()}`, {
        signal: controller.signal,
      });
      const data = (await response.json()) as JusoSearchResponse;
      if (!response.ok || !data.ok) {
        if (!data.hits?.length) {
          setHits([]);
          setTotalCount(0);
        }
        setSearchError(data.error ?? "Address search failed.");
        return;
      }
      setHits(data.hits);
      setTotalCount(data.totalCount);
      if (data.hits.length === 0) {
        setSearchError("No official street addresses matched. Try adding a district or building number.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setHits([]);
      setTotalCount(0);
      setSearchError("Address search failed. Check your connection and try again.");
    } finally {
      if (abortRef.current === controller) setSearching(false);
    }
  }, []);

  function onQueryChange(value: string) {
    setQuery(value);
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setHits([]);
      setTotalCount(0);
      setSearchError(null);
      setSearching(false);
      return;
    }
    searchTimer.current = window.setTimeout(() => {
      void runSearch(trimmed);
    }, 400);
  }

  function onSelectHit(hit: JusoSearchHit) {
    applyHit(hit);
    track("select_address");
  }

  function onDetailChange(value: string) {
    setDetailKo(value);
    if (!line2Dirty) {
      setFields((current) => ({
        ...current,
        line2: romanizeDetailAddress(value),
      }));
    }
  }

  function onFieldChange(key: keyof KrAddressFields, value: string) {
    if (key === "line2") setLine2Dirty(true);
    setFields((current) => ({ ...current, [key]: value }));
  }

  function loadSample() {
    setQuery("마포구 서강로 19-4");
    setDetailKo(SAMPLE_MAPO_DETAIL_KO);
    setLine2Dirty(false);
    setSelected(SAMPLE_MAPO_HIT);
    setKoreanBase(SAMPLE_MAPO_HIT.koreanBase);
    setFields({
      line1: SAMPLE_MAPO_HIT.line1,
      line2: SAMPLE_MAPO_LINE2,
      city: SAMPLE_MAPO_HIT.city,
      state: SAMPLE_MAPO_HIT.state,
      zip: SAMPLE_MAPO_HIT.zip,
    });
    setHits([SAMPLE_MAPO_HIT]);
    setTotalCount(1);
    setSearchError(null);
    setName("Jamie Kim");
    setPhone("+82 10-1234-5678");
    track("load_sample");
  }

  async function onCopy(key: string, value: string) {
    if (!value) return;
    try {
      await copyText(value);
      track("copy_field", key);
      setCopied(key);
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }

  const labelReady = hasSplitResult(fields);
  const labelText = formatInboundLabelText({
    name,
    phone,
    fields,
    koreanBase,
    detailKo,
  });

  async function onCopyLabel() {
    if (!labelReady) return;
    try {
      await copyText(labelText);
      track("copy_label");
      setCopied("label");
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }

  function onPrintLabel() {
    if (!labelReady) return;
    track("print_label");
    document.body.classList.add("kr-label-print");
    const cleanup = () => {
      document.body.classList.remove("kr-label-print");
    };
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
  }

  return (
    <div className="grid grid-cols-1 border-[0.5px] border-[#D9D9D3] md:grid-cols-2">
      <section className="border-b-[0.5px] border-[#D9D9D3] md:border-b-0 md:border-r-[0.5px]">
        <div className="border-b-[0.5px] border-[#D9D9D3] px-4 py-4 md:px-5">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
            Search
          </p>
          <p className="font-en mt-1 text-xs text-foreground/50">
            Type a Korean road-name address. Official results come from MOIS
            juso.go.kr.
          </p>
        </div>

        <div className="border-b-[0.5px] border-[#D9D9D3] p-4 md:p-5">
          <label htmlFor={searchId} className="block">
            <span className="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">
              Korean street address
            </span>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="마포구 서강로 19-4"
              autoComplete="off"
              spellCheck={false}
              className={`${inputClass} font-ko`}
            />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={btnClass} onClick={loadSample}>
              Load sample
            </button>
            <button
              type="button"
              className={btnClass}
              disabled={query.trim().length < 2 || searching}
              onClick={() => void runSearch(query.trim())}
            >
              {searching ? "Searching…" : "Search"}
            </button>
          </div>
          {searchError ? (
            <p className="font-en mt-3 text-xs leading-relaxed text-[#FF4B3E]" role="status">
              {searchError}
            </p>
          ) : null}
        </div>

        <div className="border-b-[0.5px] border-[#D9D9D3]">
          <div className="flex items-baseline justify-between gap-3 px-4 pt-4 md:px-5">
            <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/35">
              Results
            </p>
            {totalCount > 0 ? (
              <p className="font-en text-[10px] text-foreground/40">
                {totalCount} found
              </p>
            ) : null}
          </div>
          <ul className="max-h-[280px] overflow-y-auto">
            {hits.length === 0 ? (
              <li className="font-en px-4 py-5 text-sm text-foreground/40 md:px-5">
                Search to list official Korean street addresses.
              </li>
            ) : (
              hits.map((hit) => {
                const active = selected?.id === hit.id;
                return (
                  <li key={hit.id} className="border-t-[0.5px] border-[#D9D9D3]">
                    <button
                      type="button"
                      onClick={() => onSelectHit(hit)}
                      className={`w-full px-4 py-4 text-left transition-colors md:px-5 ${
                        active
                          ? "bg-[#EBEBE5]/70"
                          : "hover:bg-[#EBEBE5]/40"
                      }`}
                    >
                      <span className="font-en text-sm font-bold text-foreground">
                        {[hit.line1, hit.city, hit.state].filter(Boolean).join(", ")}
                      </span>
                      <span className="font-ko mt-1 block text-xs text-foreground/55">
                        {hit.koreanBase}
                      </span>
                      <span className="font-en mt-1 block text-[10px] uppercase tracking-widest text-foreground/40">
                        ZIP {hit.zip || "—"}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        <label className="block border-b-[0.5px] border-[#D9D9D3] p-4 md:p-5" htmlFor={detailId}>
          <span className="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">
            Unit / floor / room
          </span>
          <input
            id={detailId}
            type="text"
            value={detailKo}
            onChange={(event) => onDetailChange(event.target.value)}
            placeholder="8층 801호  or  Apt 101-202"
            className={`${inputClass} font-ko`}
          />
          <span className="font-en mt-2 block text-xs text-foreground/45">
            Korean or English. Line 2 is filled automatically.
          </span>
        </label>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
          <label className="block border-b-[0.5px] border-[#D9D9D3] p-4 sm:border-r-[0.5px] md:p-5">
            <span className="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">
              Recipient
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name on the box"
              autoComplete="name"
              className={inputClass}
            />
          </label>
          <label className="block border-b-[0.5px] border-[#D9D9D3] p-4 md:border-b-0 md:p-5">
            <span className="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">
              Phone
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+82 10-0000-0000"
              autoComplete="tel"
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section>
        <div className="border-b-[0.5px] border-[#D9D9D3] px-4 py-4 md:px-5">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
            Overseas form fields
          </p>
          <p className="font-en mt-1 text-xs text-foreground/50">
            Copy into Amazon, iHerb, or any Address Line 1 / Line 2 checkout.
          </p>
        </div>

        {FIELD_ROWS.map((row) => (
          <label
            key={row.key}
            className="block border-b-[0.5px] border-[#D9D9D3] p-4 md:p-5"
          >
            <span className="mb-2 flex items-baseline justify-between gap-2">
              <span className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/35">
                {row.label}
              </span>
              <span className="font-en text-[10px] text-foreground/40">
                {row.hint}
              </span>
            </span>
            <div className="flex items-stretch gap-2">
              <input
                type="text"
                value={fields[row.key]}
                onChange={(event) => onFieldChange(row.key, event.target.value)}
                placeholder={row.placeholder}
                className={inputClass}
              />
              <button
                type="button"
                className={copyClass}
                disabled={!fields[row.key]}
                onClick={() => void onCopy(row.key, fields[row.key])}
              >
                {copied === row.key ? "Copied" : "Copy"}
              </button>
            </div>
          </label>
        ))}

        <div className="p-4 md:p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                Dual-language shipping label
              </p>
              <p className="font-en mt-1 text-xs text-foreground/50">
                Stick this on the box so Korean couriers can read the address.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={btnClass}
                disabled={!labelReady}
                onClick={() => void onCopyLabel()}
              >
                {copied === "label" ? "Copied" : "Copy Label Text"}
              </button>
              <button
                type="button"
                className={btnClass}
                disabled={!labelReady}
                onClick={onPrintLabel}
              >
                Print Label
              </button>
            </div>
          </div>
          <pre
            id="kr-inbound-label"
            className="whitespace-pre-wrap border-[0.5px] border-[#D9D9D3] bg-white p-4 text-xs leading-relaxed text-foreground md:p-5 md:text-sm"
          >
            {labelText}
          </pre>
        </div>
      </section>
    </div>
  );
}
