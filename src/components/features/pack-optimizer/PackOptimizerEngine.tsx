"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { fetchOptimizeResult } from "@/lib/tools/pack-optimizer/api";
import {
  DESTINATIONS,
  emptyOptimizeResponse,
  formatKrw,
  formatSize,
  formatWeight,
  type BoxDetail,
  type DestinationCode,
  type OptimizeResponse,
} from "@/lib/tools/pack-optimizer/types";

function FieldLabel({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="font-en mb-2 flex items-baseline justify-between gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
        <span>{label}</span>
        {hint ? <span className="normal-case tracking-normal">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "font-en w-full min-h-12 min-w-0 rounded-none border-[0.5px] border-[#D9D9D3] bg-background px-3 text-sm tabular-nums text-foreground outline-none focus:border-[#FF4B3E]";

function WeightRows({ box }: { box: BoxDetail }) {
  const volumetric = box.volumeWeight > box.actualWeight;
  return (
    <div className="space-y-1 text-sm">
      <div className="flex justify-between gap-3">
        <span className="font-ko text-foreground/55">실중량</span>
        <span className="font-en tabular-nums text-foreground">
          {formatWeight(box.actualWeight)}
        </span>
      </div>
      <div className="flex justify-between gap-3">
        <span className="font-ko text-foreground/55">부피무게</span>
        <span
          className={`font-en tabular-nums ${volumetric ? "text-[#FF4B3E]" : "text-foreground"}`}
        >
          {formatWeight(box.volumeWeight)}
        </span>
      </div>
      <div className="flex justify-between gap-3 border-t-[0.5px] border-[#D9D9D3] pt-1">
        <span className="font-ko font-bold text-foreground/70">청구 중량</span>
        <span className="font-en font-bold tabular-nums text-foreground">
          {formatWeight(box.billableWeight)}
          {volumetric ? (
            <span className="ml-1 text-[10px] font-bold text-[#FF4B3E]">
              vol.
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
}

function StrategyCard({
  title,
  subtitle,
  available,
  boxCount,
  totalCost,
  boxes,
  highlighted,
  dimmed,
}: {
  title: string;
  subtitle: string;
  available: boolean;
  boxCount: number;
  totalCost: number;
  boxes: BoxDetail[];
  highlighted: boolean;
  dimmed: boolean;
}) {
  return (
    <section
      className={`flex min-w-0 flex-col border-[0.5px] p-4 md:p-5 ${
        highlighted ? "border-[#111111]" : "border-[#D9D9D3]"
      } bg-background ${dimmed ? "pointer-events-none opacity-50" : ""}`}
    >
      <header className="mb-4 flex items-start justify-between gap-2">
        <div>
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
            {title}
          </p>
          <h3 className="font-ko mt-1 text-base font-bold text-foreground">
            {subtitle}
          </h3>
        </div>
        {highlighted ? (
          <span className="font-en shrink-0 border-[0.5px] border-[#111111] bg-[#111111] px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#F2F2F0]">
            Pick
          </span>
        ) : null}
      </header>
      {available ? (
        <>
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/30 px-3 py-2">
              <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                Boxes
              </p>
              <p className="font-en mt-1 text-xl font-black tabular-nums">
                {boxCount}
              </p>
            </div>
            <div className="border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/30 px-3 py-2">
              <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                Total
              </p>
              <p className="font-en mt-1 text-xl font-black tabular-nums">
                {formatKrw(totalCost)}
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            {boxes.map((box, index) => (
              <li
                key={`${box.itemsPerBox}-${index}`}
                className="border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/20 p-3"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-ko text-xs font-bold text-foreground/70">
                    {boxes.length > 1 ? `박스 ${index + 1}` : "통합 박스"} ·{" "}
                    {box.itemsPerBox}개
                  </span>
                  <span className="font-en text-sm font-black tabular-nums">
                    {formatKrw(box.cost)}
                  </span>
                </div>
                <p className="font-en mb-2 text-xs text-foreground/55">
                  {formatSize(box.estimatedBoxSize)} · 세 변 합{" "}
                  {box.totalThreeSides} cm
                </p>
                <WeightRows box={box} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="font-ko text-sm text-foreground/55">
          이 조건에서는 접수·적재가 불가합니다.
        </p>
      )}
    </section>
  );
}

export function PackOptimizerEngine() {
  const searchParams = useSearchParams();
  const widget = searchParams.get("widget") === "true";

  const [width, setWidth] = useState(15);
  const [length, setLength] = useState(15);
  const [height, setHeight] = useState(5);
  const [weight, setWeight] = useState(180);
  const [quantity, setQuantity] = useState(12);
  const [destination, setDestination] = useState<DestinationCode>("IT");
  const [packingMargin, setPackingMargin] = useState(2);
  const [result, setResult] = useState<OptimizeResponse>(() =>
    emptyOptimizeResponse(),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const payload = useMemo(
    () => ({
      product: { width, length, height, weight },
      quantity,
      destination,
      packingMargin,
    }),
    [width, length, height, weight, quantity, destination, packingMargin],
  );

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setLoading(true);
      setError(null);
      fetchOptimizeResult(payload, controller.signal)
        .then(setResult)
        .catch((err: unknown) => {
          if (err instanceof DOMException && err.name === "AbortError") return;
          setError("서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.");
          setResult(emptyOptimizeResponse("네트워크 오류로 계산에 실패했습니다."));
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, 400);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [payload]);

  useEffect(() => {
    if (!widget) return;
    document.documentElement.classList.add("pack-widget-embed");
    document.body.classList.add("pack-widget-embed");
    return () => {
      document.documentElement.classList.remove("pack-widget-embed");
      document.body.classList.remove("pack-widget-embed");
    };
  }, [widget]);

  const recalculate = useCallback(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchOptimizeResult(payload, controller.signal)
      .then(setResult)
      .catch(() => {
        setError("서버와 통신하지 못했습니다.");
        setResult(emptyOptimizeResponse("네트워크 오류"));
      })
      .finally(() => setLoading(false));
  }, [payload]);

  const recommendation = useMemo(() => {
    const savings = formatKrw(result.potentialSavings);
    if (result.recommendation === "SPLIT_K_PACKET") {
      return {
        title: "K-Packet 쪼개기 추천",
        body:
          result.potentialSavings > 0
            ? `지금 방식을 바꾸면 배송비 ${savings}을 아낄 수 있습니다.`
            : "K-Packet 분할 발송이 현재 조건에서 최적입니다.",
        tone: "kpacket" as const,
      };
    }
    if (result.recommendation === "BUNDLE_EMS") {
      return {
        title: "EMS 통합 배송 추천",
        body:
          result.potentialSavings > 0
            ? `한 박스 EMS로 묶으면 ${savings}을 아낄 수 있습니다.`
            : "EMS 통합 발송이 현재 조건에서 최적입니다.",
        tone: "ems" as const,
      };
    }
    return {
      title: "추천 불가",
      body:
        result.errorMessage ??
        "현재 입력으로는 K-Packet·EMS 모두 접수가 어렵습니다.",
      tone: "none" as const,
    };
  }, [result]);

  const { kPacketSplit, emsBundle } = result.strategies;
  const logisticsBoxes =
    result.recommendation === "SPLIT_K_PACKET"
      ? kPacketSplit.details
      : result.recommendation === "BUNDLE_EMS" && emsBundle.available
        ? [emsBundle.details]
        : kPacketSplit.available
          ? kPacketSplit.details
          : emsBundle.available
            ? [emsBundle.details]
            : [];

  return (
    <div
      className={`packopt-engine w-full ${widget ? "" : "max-w-none"}`}
      data-loading={loading ? "true" : "false"}
    >
      <section className="border-[0.5px] border-[#D9D9D3] bg-background p-4 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-ko text-lg font-black text-foreground">
              발송 조건
            </h2>
            {!widget ? (
              <p className="font-ko mt-1 text-xs text-foreground/55">
                입력 변경 시 자동 재계산됩니다.
              </p>
            ) : null}
          </div>
          {loading ? (
            <span
              aria-live="polite"
              className="font-en inline-flex items-center gap-2 border-[0.5px] border-[#D9D9D3] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground/55"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF4B3E]" />
              Calculating
            </span>
          ) : null}
        </div>

        <fieldset disabled={loading} className="mt-5 min-w-0">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <FieldLabel label="가로" hint="cm">
              <input
                type="number"
                min={0.1}
                step={0.1}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className={inputClass}
              />
            </FieldLabel>
            <FieldLabel label="세로" hint="cm">
              <input
                type="number"
                min={0.1}
                step={0.1}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className={inputClass}
              />
            </FieldLabel>
            <FieldLabel label="높이" hint="cm">
              <input
                type="number"
                min={0.1}
                step={0.1}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className={inputClass}
              />
            </FieldLabel>
            <FieldLabel label="단품 무게" hint="g">
              <input
                type="number"
                min={1}
                step={1}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className={inputClass}
              />
            </FieldLabel>
            <FieldLabel label="수량" hint="개">
              <input
                type="number"
                min={1}
                step={1}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Math.floor(Number(e.target.value) || 1)))
                }
                className={inputClass}
              />
            </FieldLabel>
            <FieldLabel label="배송 목적지">
              <select
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value as DestinationCode)
                }
                className={`${inputClass} cursor-pointer`}
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.labelKo}
                  </option>
                ))}
              </select>
            </FieldLabel>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <FieldLabel label="완충재 두께" hint={`${packingMargin.toFixed(1)} cm`}>
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.1}
                value={packingMargin}
                onChange={(e) => setPackingMargin(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer accent-[#FF4B3E]"
              />
              <div className="font-en mt-1 flex justify-between text-[10px] text-foreground/40">
                <span>0.5 cm</span>
                <span>에어캡·박스 두께</span>
                <span>5.0 cm</span>
              </div>
            </FieldLabel>
            <button
              type="button"
              onClick={recalculate}
              disabled={loading}
              className="font-en touch-target min-h-12 shrink-0 border-[0.5px] border-[#111111] bg-[#111111] px-5 text-xs font-bold uppercase tracking-[0.12em] text-[#F2F2F0] transition-colors hover:border-[#FF4B3E] hover:bg-[#FF4B3E] disabled:opacity-50 lg:min-w-[10rem]"
            >
              {loading ? "계산 중…" : "다시 계산"}
            </button>
          </div>
        </fieldset>
      </section>

      {error ? (
        <p className="mt-4 border-[0.5px] border-[#FF4B3E]/40 bg-[#FF4B3E]/5 px-4 py-3 text-sm text-[#FF4B3E]">
          {error}
        </p>
      ) : null}

      <section
        className={`mt-6 border-[0.5px] border-[#D9D9D3] bg-[#111111] px-5 py-5 text-[#F2F2F0] md:px-6 ${loading ? "opacity-70" : ""}`}
      >
        <p className="font-en text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2F2F0]/60">
          최우선 추천
        </p>
        <h2 className="font-ko mt-1 text-xl font-black md:text-2xl">
          [{recommendation.title}]
        </h2>
        <p className="font-ko mt-2 max-w-3xl text-sm leading-relaxed text-[#F2F2F0]/90">
          {recommendation.body}
        </p>
        {result.status === "success" && result.potentialSavings > 0 ? (
          <p className="font-en mt-3 inline-flex border-[0.5px] border-[#F2F2F0]/30 px-3 py-1 text-xs font-bold">
            Save {formatKrw(result.potentialSavings)}
          </p>
        ) : null}
      </section>

      <section className={`mt-6 ${loading ? "opacity-60" : ""}`}>
        <h2 className="font-ko mb-4 text-lg font-black text-foreground">
          투 트랙 전략 비교
        </h2>
        <div className="grid w-full gap-4 lg:grid-cols-2">
          <StrategyCard
            title="K-Packet"
            subtitle="무게·세변 한도 내 쪼개기"
            available={kPacketSplit.available}
            boxCount={kPacketSplit.boxCount}
            totalCost={kPacketSplit.totalCost}
            boxes={kPacketSplit.details}
            highlighted={result.recommendation === "SPLIT_K_PACKET"}
            dimmed={loading}
          />
          <StrategyCard
            title="EMS"
            subtitle="한 박스 · 부피무게 청구"
            available={emsBundle.available}
            boxCount={emsBundle.boxCount}
            totalCost={emsBundle.totalCost}
            boxes={emsBundle.available ? [emsBundle.details] : []}
            highlighted={result.recommendation === "BUNDLE_EMS"}
            dimmed={loading}
          />
        </div>
      </section>

      <section
        className={`mt-6 border-[0.5px] border-[#D9D9D3] bg-background p-4 md:p-5 ${loading ? "opacity-50" : ""}`}
      >
        <h3 className="font-ko text-sm font-black text-foreground">
          물류 조달 · 박스 추천
        </h3>
        {logisticsBoxes.length === 0 ? (
          <p className="font-ko mt-2 text-sm text-foreground/55">
            유효한 적재 결과가 없습니다.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-4">
            {logisticsBoxes.map((box, index) => (
              <li
                key={`logistics-${index}`}
                className="border-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/20 p-3"
              >
                <p className="font-en mb-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  Box {index + 1}
                </p>
                <p className="font-en text-sm font-bold tabular-nums">
                  Custom {formatSize(box.customBoxSize)}
                </p>
                <p className="font-ko mt-2 text-xs leading-relaxed text-foreground/65">
                  우체국 박스 · {box.recommendedPostBox}
                </p>
                {box.postBoxNotice ? (
                  <p className="font-ko mt-2 text-xs leading-relaxed text-foreground/55">
                    {box.postBoxNotice}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
