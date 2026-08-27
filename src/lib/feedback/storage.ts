const STORAGE_PREFIX = "uh_content_feedback_v1";

export type FeedbackReaction = "helpful" | "not_helpful";

export function feedbackStorageKey(
  contentType: string,
  contentId: string,
): string {
  return `${STORAGE_PREFIX}:${contentType}:${contentId}`;
}

export function readStoredFeedback(
  contentType: string,
  contentId: string,
): FeedbackReaction | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(
      feedbackStorageKey(contentType, contentId),
    );
    if (value === "helpful" || value === "not_helpful") return value;
    return null;
  } catch {
    return null;
  }
}

export function storeFeedback(
  contentType: string,
  contentId: string,
  reaction: FeedbackReaction,
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      feedbackStorageKey(contentType, contentId),
      reaction,
    );
  } catch {
    // Ignore quota / private mode errors.
  }
}
