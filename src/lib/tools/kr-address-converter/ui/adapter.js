import { parseKrAddress } from "../core/parser.js";
import {
  bindInboundLabelActions,
  renderInboundLabelMarkup,
  updateInboundLabel,
} from "./InboundLabelPrinter.js";

const FIELD_KEYS = [
  { key: "province", label: "Province / Metro", hint: "시·도" },
  { key: "district", label: "District", hint: "구" },
  { key: "locality", label: "Town / Village / Dong", hint: "읍·면·동" },
  { key: "detail", label: "Detail address", hint: "세부주소" },
  { key: "zip", label: "ZIP / Postal", hint: "우편번호" },
  { key: "koreanAddress", label: "Korean address", hint: "한글 주소" },
];

const SAMPLE_ADDRESS = `8F Room 801, 19-4 Seogang-ro, Mapo-gu, Seoul, 04058`;

const inputClass =
  "font-en w-full min-w-0 rounded-none border-[0.5px] border-[#D9D9D3] bg-background px-3 py-3 text-sm text-foreground shadow-none outline-none ring-0 placeholder:text-foreground/35 focus:border-[#FF4B3E] focus:outline-none focus:ring-0";

const copyClass =
  "font-en touch-target shrink-0 border-[0.5px] border-[#D9D9D3] bg-transparent px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:border-[#FF4B3E] hover:bg-[#FF4B3E] hover:text-[#F2F2F0] active:border-[#FF4B3E] active:bg-[#FF4B3E] active:text-[#F2F2F0] disabled:pointer-events-none disabled:opacity-35";

function renderMarkup() {
  const fields = FIELD_KEYS.map(
    (field) => `
      <label class="block border-b-[0.5px] border-[#D9D9D3] p-4 md:p-5">
        <span class="mb-2 flex items-baseline justify-between gap-2">
          <span class="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/35">${field.label}</span>
          <span class="font-ko text-[10px] text-foreground/40">${field.hint}</span>
        </span>
        <div class="flex items-stretch gap-2">
          <input data-kr-field="${field.key}" type="text" readonly class="${inputClass}${field.key === "koreanAddress" ? " font-ko" : ""}" />
          <button type="button" data-kr-copy="${field.key}" class="${copyClass}" disabled>Copy</button>
        </div>
      </label>`,
  ).join("");

  return `
    <div class="grid grid-cols-1 border-[0.5px] border-[#D9D9D3] md:grid-cols-2">
      <section class="border-b-[0.5px] border-[#D9D9D3] md:border-b-0 md:border-r-[0.5px]">
        <div class="border-b-[0.5px] border-[#D9D9D3] px-4 py-4 md:px-5">
          <p class="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">Input</p>
          <p class="font-en mt-1 text-xs text-foreground/50">Paste a Korean address written in English (or Korean).</p>
        </div>
        <label class="block p-4 md:p-5">
          <span class="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">Raw address</span>
          <textarea data-kr-raw rows="6" spellcheck="false" placeholder="8F Room 801, 19-4 Seogang-ro&#10;Mapo-gu, Seoul, 04058" class="${inputClass} min-h-[160px] resize-y leading-relaxed md:min-h-[280px]"></textarea>
        </label>
        <div class="border-t-[0.5px] border-[#D9D9D3] px-4 py-3 md:px-5">
          <button type="button" data-kr-sample class="font-en touch-target border-[0.5px] border-[#D9D9D3] bg-transparent px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E]">
            Load sample
          </button>
        </div>
        <button type="button" data-kr-show-fields class="font-en touch-target flex min-h-12 w-full items-center justify-between border-t-[0.5px] border-[#D9D9D3] bg-[#EBEBE5]/40 px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#FF4B3E] hover:text-[#FF4B3E] md:hidden">
          <span data-kr-show-fields-label>View parsed fields</span>
          <span aria-hidden>↓</span>
        </button>
      </section>
      <section data-kr-output class="max-md:hidden">
        <div class="border-b-[0.5px] border-[#D9D9D3] px-4 py-4 md:px-5">
          <p class="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">Korean address fields</p>
          <p class="font-en mt-1 text-xs text-foreground/50">Split into Province → District → Locality → Detail, plus Hangul.</p>
        </div>
        ${fields}
        ${renderInboundLabelMarkup()}
      </section>
    </div>
  `;
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
 * @param {ParentNode} root
 * @returns {() => void}
 */
export function mountKrAddressConverter(root) {
  const host = root;
  host.innerHTML = renderMarkup();

  const rawInput = host.querySelector("[data-kr-raw]");
  const sampleBtn = host.querySelector("[data-kr-sample]");
  const outputSection = host.querySelector("[data-kr-output]");
  const showFieldsBtn = host.querySelector("[data-kr-show-fields]");
  const showFieldsLabel = host.querySelector("[data-kr-show-fields-label]");
  const fieldInputs = FIELD_KEYS.map((field) => ({
    key: field.key,
    input: host.querySelector(`[data-kr-field="${field.key}"]`),
    button: host.querySelector(`[data-kr-copy="${field.key}"]`),
  }));

  const timers = new Map();
  let mobileOutputOpen = false;
  const mobileMq = window.matchMedia("(max-width: 767px)");

  function syncMobileOutput() {
    if (!outputSection) return;

    if (!mobileMq.matches) {
      outputSection.classList.remove("max-md:hidden");
      showFieldsBtn?.classList.add("hidden");
      return;
    }

    showFieldsBtn?.classList.remove("hidden");
    if (mobileOutputOpen) {
      outputSection.classList.remove("max-md:hidden");
      if (showFieldsLabel) showFieldsLabel.textContent = "Hide parsed fields";
    } else {
      outputSection.classList.add("max-md:hidden");
      if (showFieldsLabel) showFieldsLabel.textContent = "View parsed fields";
    }
  }

  function fill(parsed) {
    for (const { key, input, button } of fieldInputs) {
      const value = parsed[key] ?? "";
      input.value = value;
      button.disabled = !value;
      if (button.dataset.copied !== "1") button.textContent = "Copy";
    }
    updateInboundLabel(host, parsed);
  }

  function run() {
    fill(parseKrAddress(rawInput.value));
  }

  async function onCopy(event) {
    const button = event.currentTarget;
    const key = button.getAttribute("data-kr-copy");
    const row = fieldInputs.find((field) => field.key === key);
    const value = row?.input.value ?? "";
    if (!value) return;
    try {
      await copyText(value);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("uh:tool-action", {
            detail: { tool: "kr-address-formatter", action: "copy_field", field: key },
          }),
        );
      }
      button.dataset.copied = "1";
      button.textContent = "Copied";
      const prev = timers.get(key);
      if (prev) window.clearTimeout(prev);
      timers.set(
        key,
        window.setTimeout(() => {
          button.dataset.copied = "0";
          button.textContent = "Copy";
        }, 1400),
      );
    } catch {
      button.textContent = "Copy";
    }
  }

  rawInput.addEventListener("input", run);
  sampleBtn?.addEventListener("click", () => {
    rawInput.value = SAMPLE_ADDRESS;
    run();
  });

  for (const { button } of fieldInputs) {
    button.addEventListener("click", onCopy);
  }

  showFieldsBtn?.addEventListener("click", () => {
    mobileOutputOpen = !mobileOutputOpen;
    syncMobileOutput();
    if (mobileOutputOpen) {
      outputSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  mobileMq.addEventListener("change", syncMobileOutput);
  syncMobileOutput();

  bindInboundLabelActions(host, {
    getView: () => parseKrAddress(rawInput.value),
  });

  run();

  return () => {
    for (const timeout of timers.values()) window.clearTimeout(timeout);
    mobileMq.removeEventListener("change", syncMobileOutput);
    host.innerHTML = "";
  };
}
