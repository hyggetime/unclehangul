/** Normalize AdSense client id from env (accepts ca-pub-… or pub-… from account info). */
export function normalizeAdSenseClientId(raw: string | undefined): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("ca-pub-")) return trimmed;
  if (trimmed.startsWith("pub-")) return `ca-pub-${trimmed.slice(4)}`;
  return null;
}
