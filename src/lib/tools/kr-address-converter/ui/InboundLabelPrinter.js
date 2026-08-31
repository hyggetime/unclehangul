import { buildKoreanAddress } from "../core/parser.js";

const btnClass =
  "font-en touch-target border-[0.5px] border-[#D9D9D3] bg-transparent px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:border-[#FF4B3E] hover:bg-[#FF4B3E] hover:text-[#F2F2F0] active:border-[#FF4B3E] active:bg-[#FF4B3E] active:text-[#F2F2F0] disabled:pointer-events-none disabled:opacity-35";

/**
 * @param {{ province: string, district: string, locality: string, detail: string, zip: string, koreanAddress: string }} view
 */
export function formatInboundLabelText(view) {
  const englishParts = [
    view.detail,
    view.locality,
    view.district,
    view.province,
    view.zip,
    "Rep. of KOREA",
  ].filter(Boolean);

  const korean =
    view.koreanAddress || buildKoreanAddress(view) || "";

  return [
    "[DELIVERY TO KOREA]",
    `ADDRESS (ENG): ${englishParts.join(", ") || "—"}`,
    "[국내 택배기사님 전용 한글주소]",
    korean || "—",
  ].join("\n");
}

function hasLabelContent(view) {
  return Boolean(
    view.detail?.trim() ||
      view.district?.trim() ||
      view.province?.trim() ||
      view.koreanAddress?.trim(),
  );
}

export function renderInboundLabelMarkup() {
  return `
    <div class="border-t-[0.5px] border-[#D9D9D3] p-4 md:p-5">
      <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">Shipping label</p>
          <p class="font-en mt-1 text-xs text-foreground/50">Dual-language label for inbound delivery</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" data-kr-label-copy class="${btnClass}" disabled>Copy Label Text</button>
          <button type="button" data-kr-label-print class="${btnClass}" disabled>Print Label</button>
        </div>
      </div>
      <pre
        id="kr-inbound-label"
        data-kr-label-box
        class="font-en whitespace-pre-wrap border-[0.5px] border-[#D9D9D3] bg-white p-4 text-xs leading-relaxed text-foreground md:p-5 md:text-sm"
      >[DELIVERY TO KOREA]
ADDRESS (ENG): —
[국내 택배기사님 전용 한글주소]
—</pre>
    </div>
  `;
}

/**
 * @param {ParentNode} host
 * @param {{ province: string, district: string, locality: string, detail: string, zip: string, koreanAddress: string }} view
 */
export function updateInboundLabel(host, view) {
  const box = host.querySelector("[data-kr-label-box]");
  const copyBtn = host.querySelector("[data-kr-label-copy]");
  const printBtn = host.querySelector("[data-kr-label-print]");
  if (!box) return;

  const ready = hasLabelContent(view);
  if (copyBtn) copyBtn.disabled = !ready;
  if (printBtn) printBtn.disabled = !ready;

  box.textContent = ready ? formatInboundLabelText(view) : `[DELIVERY TO KOREA]
ADDRESS (ENG): —
[국내 택배기사님 전용 한글주소]
—`;
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
 * @param {{ getView: () => object }} options
 */
export function bindInboundLabelActions(host, { getView }) {
  const copyBtn = host.querySelector("[data-kr-label-copy]");
  const printBtn = host.querySelector("[data-kr-label-print]");

  copyBtn?.addEventListener("click", async () => {
    const view = getView();
    if (!hasLabelContent(view)) return;
    try {
      await copyText(formatInboundLabelText(view));
      copyBtn.textContent = "Copied";
      window.setTimeout(() => {
        copyBtn.textContent = "Copy Label Text";
      }, 1400);
    } catch {
      copyBtn.textContent = "Copy Label Text";
    }
  });

  printBtn?.addEventListener("click", () => {
    const view = getView();
    if (!hasLabelContent(view)) return;
    document.body.classList.add("kr-label-print");
    const cleanup = () => {
      document.body.classList.remove("kr-label-print");
    };
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
  });
}
