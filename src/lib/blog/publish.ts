import type { BlogPost } from "@/lib/blog/posts";

export type PostPublishMeta = Pick<
  BlogPost,
  "publishedAt" | "status" | "publishAt"
>;

/** YYYY-MM-DD frontmatter dates go live at 00:00 KST (site timezone). */
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

export function parsePublishInstant(raw: string): Date {
  if (DATE_ONLY.test(raw)) {
    return new Date(`${raw}T00:00:00+09:00`);
  }
  return new Date(raw);
}

export function getEffectivePublishDate(post: PostPublishMeta): Date | null {
  const raw = post.publishAt ?? post.publishedAt;
  if (!raw) return null;
  const date = parsePublishInstant(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function isPostPublic(
  post: PostPublishMeta,
  now: Date = new Date(),
): boolean {
  if (post.status === "draft") return false;
  const effective = getEffectivePublishDate(post);
  if (!effective) return true;
  return effective.getTime() <= now.getTime();
}
