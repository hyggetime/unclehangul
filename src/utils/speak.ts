export type SpeakLang = "ko-KR" | "en-US";

function pickVoice(lang: SpeakLang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  if (lang === "ko-KR") {
    return (
      voices.find((v) => v.lang.startsWith("ko")) ??
      voices.find((v) => v.lang.includes("KR"))
    );
  }
  return (
    voices.find((v) => v.lang.startsWith("en-US")) ??
    voices.find((v) => v.lang.startsWith("en"))
  );
}

function speakUtterance(utterance: SpeechSynthesisUtterance): void {
  // Cancel only when a queue is active — iOS Safari breaks on unconditional cancel().
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
  }
  window.speechSynthesis.resume?.();
  window.speechSynthesis.speak(utterance);
}

/** Browser TTS via Web Speech API — client-only (no-op on the server). */
export function speakText(text: string, lang: SpeakLang): void {
  if (typeof window === "undefined" || !text.trim()) return;

  const spokenText = text.trim().replace(/-/g, " ");
  if (!spokenText.trim()) return;

  const utterance = new SpeechSynthesisUtterance(spokenText);
  utterance.lang = lang;
  utterance.rate = 0.9;

  const voice = pickVoice(lang);
  if (voice) utterance.voice = voice;

  // Must call speak() synchronously inside the user gesture (mobile Safari/Android).
  speakUtterance(utterance);
}
