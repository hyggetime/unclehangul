import { config, fields, collection } from "@keystatic/core";

/**
 * Storage: local by default. For GitHub mode on Vercel, set:
 * KEYSTATIC_STORAGE=github
 * KEYSTATIC_GITHUB_REPO=owner/repo
 * KEYSTATIC_GITHUB_CLIENT_ID / KEYSTATIC_GITHUB_CLIENT_SECRET / KEYSTATIC_SECRET (see Keystatic docs)
 */
function getStorage():
  | { kind: "local" }
  | { kind: "github"; repo: `${string}/${string}` } {
  if (
    process.env.KEYSTATIC_STORAGE === "github" &&
    process.env.KEYSTATIC_GITHUB_REPO
  ) {
    return {
      kind: "github",
      repo: process.env.KEYSTATIC_GITHUB_REPO as `${string}/${string}`,
    };
  }
  return { kind: "local" };
}

export default config({
  storage: getStorage(),
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "slug",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.text({
          label: "Title",
          validation: { isRequired: true },
        }),
        slug: fields.slug({
          name: {
            label: "Slug",
            description: "URL segment: /learn/{slug}",
          },
        }),
        publishedDate: fields.date({
          label: "Published date",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Description (SEO)",
          multiline: true,
          validation: { isRequired: true },
        }),
        sectionLabel: fields.text({
          label: "Section label",
          defaultValue: "LEARN / KOREAN",
        }),
        content: fields.markdoc({
          label: "Content (English)",
          description:
            "Main article body. Use headings, lists, and links as in Markdoc.",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts",
            },
          },
        }),
        contentKo: fields.markdoc({
          label: "Content (Korean, optional)",
          description:
            "Korean translation for the site toggle. Leave empty if English-only.",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts",
            },
          },
        }),
      },
    }),
  },
});
