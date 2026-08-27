import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { PLAY_WIDGETS } from "@/lib/play/catalog";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/play`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/watch`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const posts = getAllPosts();
  const learnPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/learn/${post.slug}`,
    lastModified: post.publishedAt
      ? new Date(post.publishedAt)
      : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const playWidgets: MetadataRoute.Sitemap = PLAY_WIDGETS.filter(
    (widget) => widget.status === "live" && widget.href?.startsWith("/play/"),
  ).map((widget) => ({
    url: `${baseUrl}${widget.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...learnPosts, ...playWidgets];
}
