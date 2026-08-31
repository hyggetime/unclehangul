import { getCountryRule } from "../core/rules.js";

const btnClass =
  "font-en touch-target border-[0.5px] border-[#D9D9D3] bg-transparent px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:border-[#FF4B3E] hover:bg-[#FF4B3E] hover:text-[#F2F2F0] active:border-[#FF4B3E] active:bg-[#FF4B3E] active:text-[#F2F2F0] disabled:pointer-events-none disabled:opacity-35";

/**
 * @param {{ country: string, postalCode: string, city: string, state: string, line1: string, line2: string }} view
 * @param {string} countryCode ISO 3166-1 alpha-2
 */
export function formatOutboundLabelText(view, countryCode) {
  const rule = getCountryRule(countryCode);
  const countryLine = rule ? `${rule.nameKo} (${rule.emsName})` : view.country || "";
  const cityState = [view.city, view.state].filter(Boolean).join(", ");

  return [
    "[SHIP TO]",
    `COUNTRY: ${countryLine}`,
    `ZIP/POSTAL CODE: ${view.postalCode || ""}`,
    `ADDRESS LINE 1: ${view.line1 || ""}`,
    `ADDRESS LINE 2: ${view.line2 || ""}`,
    `CITY/STATE: ${cityState}`,
  ].join("\n");
}

function countryDisplay(view, countryCode) {
  const rule = getCountryRule(countryCode);
  if (rule) return `${rule.nameKo} (${rule.emsName})`;
  return view.country || "—";
}

function cityStateDisplay(view) {
  const parts = [view.city, view.state].filter(Boolean);
  return parts.length ? parts.join(", ") : "—";
}

function hasLabelContent(view) {
  return Boolean(view.line1?.trim() || view.postalCode?.trim());
}

export function renderOutboundLabelMarkup() {
  return `
    <div class="border-t-[0.5px] border-[#D9D9D3] p-4 md:p-5">
      <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">Shipping label</p>
          <p class="font-ko mt-1 text-xs text-foreground/50">실물 박스 부착용 배송 라벨</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" data-ems-label-copy class="${btnClass}" disabled>라벨 텍스트 전체 복사</button>
          <button type="button" data-ems-label-print class="${btnClass}" disabled>라벨 인쇄 / PDF</button>
        </div>
      </div>
      <pre
        id="ems-outbound-label"
        data-ems-label-box
        class="font-en whitespace-pre-wrap border-[0.5px] border-[#D9D9D3] bg-white p-4 text-xs leading-relaxed text-foreground md:p-5 md:text-sm"
      >[SHIP TO]
COUNTRY: —
ZIP/POSTAL CODE: —
ADDRESS LINE 1: —
ADDRESS LINE 2: —
CITY/STATE: —</pre>
    </div>
  `;
}

/**
 * @param {ParentNode} host root containing [data-ems-label-box]
 * @param {{ country: string, postalCode: string, city: string, state: string, line1: string, line2: string }} view
 * @param {string} countryCode
 */
export function updateOutboundLabel(host, view, countryCode) {
  const box = host.querySelector("[data-ems-label-box]");
  const copyBtn = host.querySelector("[data-ems-label-copy]");
  const printBtn = host.querySelector("[data-ems-label-print]");
  if (!box) return;

  const ready = hasLabelContent(view);
  if (copyBtn) copyBtn.disabled = !ready;
  if (printBtn) printBtn.disabled = !ready;

  if (!ready) {
    box.textContent = `[SHIP TO]
COUNTRY: —
ZIP/POSTAL CODE: —
ADDRESS LINE 1: —
ADDRESS LINE 2: —
CITY/STATE: —`;
    return;
  }

  const line2 = view.line2?.trim() || "";
  box.textContent = [
    "[SHIP TO]",
    `COUNTRY: ${countryDisplay(view, countryCode)}`,
    `ZIP/POSTAL CODE: ${view.postalCode || "—"}`,
    `ADDRESS LINE 1: ${view.line1 || "—"}`,
    `ADDRESS LINE 2: ${line2 || ""}`,
    `CITY/STATE: ${cityStateDisplay(view)}`,
  ].join("\n");
}

async function copyText(value) {
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

/**
 * @param {ParentNode} host
 * @param {{ getView: () => { view: object, countryCode: string } }} options
 */
export function bindOutboundLabelActions(host, { getView }) {
  const copyBtn = host.querySelector("[data-ems-label-copy]");
  const printBtn = host.querySelector("[data-ems-label-print]");

  copyBtn?.addEventListener("click", async () => {
    const { view, countryCode } = getView();
    if (!hasLabelContent(view)) return;
    try {
      await copyText(formatOutboundLabelText(view, countryCode));
      copyBtn.textContent = "Copied";
      window.setTimeout(() => {
        copyBtn.textContent = "라벨 텍스트 전체 복사";
      }, 1400);
    } catch {
      copyBtn.textContent = "라벨 텍스트 전체 복사";
    }
  });

  printBtn?.addEventListener("click", () => {
    const { view } = getView();
    if (!hasLabelContent(view)) return;
    document.body.classList.add("ems-label-print");
    const cleanup = () => {
      document.body.classList.remove("ems-label-print");
    };
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
  });
}
