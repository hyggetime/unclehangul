import type { SpeakLang } from "@/utils/speak";

const HANGUL_JAMO_RE = /[\u3131-\u318E\uAC00-\uD7A3]/;

/** Pick TTS locale from selected text (Hangul → ko-KR, otherwise en-US). */
export function detectSpeakLang(text: string): SpeakLang {
  return HANGUL_JAMO_RE.test(text) ? "ko-KR" : "en-US";
}

/** True when the string is worth offering “Listen” (letters or Hangul present). */
export function isSpeakableSelection(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length > 120) return false;
  return /[\p{L}\p{N}]/u.test(trimmed);
}

export function getSelectionRangeRect(): DOMRect | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    return null;
  }
  return selection.getRangeAt(0).getBoundingClientRect();
}

export function getTrimmedSelectionText(): string {
  return window.getSelection()?.toString().trim() ?? "";
}

/** Node is contained in `root` (or is root). */
export function isNodeWithin(root: Node | null, node: Node | null): boolean {
  if (!root || !node) return false;
  return root === node || root.contains(node);
}
