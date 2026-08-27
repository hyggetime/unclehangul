/** Browser TTS for Hangul demo widgets (no server audio). */
export function speakKorean(text: string): void {
  if (typeof window === "undefined" || !text.trim()) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.92;

  const voices = window.speechSynthesis.getVoices();
  const koVoice =
    voices.find((v) => v.lang.startsWith("ko")) ??
    voices.find((v) => v.lang.includes("KR"));
  if (koVoice) utterance.voice = koVoice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
