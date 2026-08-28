export function buildTwitterShareUrl(title: string, url: string): string {
  const params = new URLSearchParams({
    text: title,
    url,
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function buildRedditShareUrl(title: string, url: string): string {
  const params = new URLSearchParams({
    url,
    title,
  });
  return `https://www.reddit.com/submit?${params.toString()}`;
}
