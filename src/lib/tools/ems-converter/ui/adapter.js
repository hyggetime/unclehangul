import { parseAddress } from "../core/parser.js";
import { COUNTRY_LIST, getCountryRule } from "../core/rules.js";

const FIELD_KEYS = [
  { key: "country", label: "Country", hint: "국가" },
  { key: "postalCode", label: "Zipcode", hint: "우편번호" },
  { key: "city", label: "City", hint: "도시" },
  { key: "state", label: "State", hint: "주 / 도" },
  { key: "line1", label: "Line1", hint: "주소 1" },
  { key: "line2", label: "Line2", hint: "주소 2" },
];

const inputClass =
  "font-en w-full min-w-0 rounded-none border-[0.5px] border-[#D9D9D3] bg-background px-3 py-3 text-sm text-foreground shadow-none outline-none ring-0 placeholder:text-foreground/35 focus:border-[#FF4B3E] focus:outline-none focus:ring-0";

const copyClass =
  "font-en touch-target shrink-0 border-[0.5px] border-[#D9D9D3] bg-transparent px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:border-[#FF4B3E] hover:bg-[#FF4B3E] hover:text-[#F2F2F0] active:border-[#FF4B3E] active:bg-[#FF4B3E] active:text-[#F2F2F0] disabled:pointer-events-none disabled:opacity-35";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderMarkup() {
  const options = COUNTRY_LIST.map(
    (country) =>
      `<option value="${country.code}">${escapeHtml(country.nameKo)} · ${escapeHtml(country.nameEn)}</option>`,
  ).join("");

  const fields = FIELD_KEYS.map(
    (field) => `
      <label class="block border-b-[0.5px] border-[#D9D9D3] p-4 md:p-5">
        <span class="mb-2 flex items-baseline justify-between gap-2">
          <span class="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/35">${field.label}</span>
          <span class="font-ko text-[10px] text-foreground/40">${field.hint}</span>
        </span>
        <div class="flex items-stretch gap-2">
          <input data-ems-field="${field.key}" type="text" readonly class="${inputClass}" />
          <button type="button" data-ems-copy="${field.key}" class="${copyClass}" disabled>복사</button>
        </div>
      </label>`,
  ).join("");

  return `
    <div class="grid grid-cols-1 border-[0.5px] border-[#D9D9D3] md:grid-cols-2">
      <section class="border-b-[0.5px] border-[#D9D9D3] md:border-b-0 md:border-r-[0.5px]">
        <div class="border-b-[0.5px] border-[#D9D9D3] px-4 py-4 md:px-5">
          <p class="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">Input</p>
          <p class="font-ko mt-1 text-xs text-foreground/50">영문 주소를 붙여 넣고 국가를 선택하세요.</p>
        </div>
        <label class="block border-b-[0.5px] border-[#D9D9D3] p-4 md:p-5">
          <span class="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">Country</span>
          <select data-ems-country class="${inputClass}">
            ${options}
          </select>
        </label>
        <label class="block p-4 md:p-5">
          <span class="font-en mb-2 block text-[10px] font-bold uppercase tracking-widest text-foreground/35">Raw address</span>
          <textarea data-ems-raw rows="12" spellcheck="false" placeholder="123 Main Street&#10;Apt 4B&#10;New York, NY 10001&#10;USA" class="${inputClass} min-h-[280px] resize-y leading-relaxed"></textarea>
        </label>
      </section>
      <section>
        <div class="border-b-[0.5px] border-[#D9D9D3] px-4 py-4 md:px-5">
          <p class="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/40">EMS fields</p>
          <p class="font-ko mt-1 text-xs text-foreground/50">우체국 계약EMS 입력 규격으로 분할됩니다.</p>
        </div>
        ${fields}
      </section>
    </div>
  `;
}

function toEmsView(parsed) {
  const rule = getCountryRule(parsed.country);
  return {
    country: rule?.emsName ?? parsed.country,
    postalCode: parsed.postalCode,
    city: parsed.city,
    state: parsed.state,
    line1: parsed.line1,
    line2: parsed.line2,
  };
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
 * Bind textarea/dropdown → live parse → EMS fields + Clipboard copy.
 * DOM-only: safe to reuse in a Manifest V3 extension.
 * @param {ParentNode} root
 * @returns {() => void} unmount
 */
export function mountEmsConverter(root) {
  const host = root;
  host.innerHTML = renderMarkup();

  const rawInput = host.querySelector("[data-ems-raw]");
  const countryInput = host.querySelector("[data-ems-country]");
  const fieldInputs = FIELD_KEYS.map((field) => ({
    key: field.key,
    input: host.querySelector(`[data-ems-field="${field.key}"]`),
    button: host.querySelector(`[data-ems-copy="${field.key}"]`),
  }));

  const timers = new Map();

  function fill(parsed) {
    const view = toEmsView(parsed);
    for (const { key, input, button } of fieldInputs) {
      const value = view[key] ?? "";
      input.value = value;
      button.disabled = !value;
      if (button.dataset.copied !== "1") button.textContent = "복사";
    }
  }

  function run() {
    fill(parseAddress(rawInput.value, countryInput.value));
  }

  async function onCopy(event) {
    const button = event.currentTarget;
    const key = button.getAttribute("data-ems-copy");
    const row = fieldInputs.find((field) => field.key === key);
    const value = row?.input.value ?? "";
    if (!value) return;
    try {
      await copyText(value);
      button.dataset.copied = "1";
      button.textContent = "Copied";
      const prev = timers.get(key);
      if (prev) window.clearTimeout(prev);
      timers.set(
        key,
        window.setTimeout(() => {
          button.dataset.copied = "0";
          button.textContent = "복사";
        }, 1400),
      );
    } catch {
      button.textContent = "복사";
    }
  }

  rawInput.addEventListener("input", run);
  countryInput.addEventListener("change", run);
  for (const { button } of fieldInputs) {
    button.addEventListener("click", onCopy);
  }

  run();

  return () => {
    for (const timeout of timers.values()) window.clearTimeout(timeout);
    host.innerHTML = "";
  };
}
