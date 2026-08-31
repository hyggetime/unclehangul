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
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

/** Browser TTS via Web Speech API — client-only (no-op on the server). */
export function speakText(text: string, lang: SpeakLang): void {
  if (typeof window === "undefined" || !text.trim()) return;

  const run = () => {
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = lang;
    utterance.rate = 0.9;

    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;

    speakUtterance(utterance);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", run, {
      once: true,
    });
    return;
  }

  run();
}
