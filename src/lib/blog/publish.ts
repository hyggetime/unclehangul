import type { BlogPost } from "@/lib/blog/posts";

export type PostPublishMeta = Pick<
  BlogPost,
  "publishedAt" | "status" | "publishAt"
>;

export function getEffectivePublishDate(post: PostPublishMeta): Date | null {
  const raw = post.publishAt ?? post.publishedAt;
  if (!raw) return null;
  const date = new Date(raw);
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
