/**
 * Future markdown/HTML pipeline: inject rendered HTML into `.blog-prose`.
 * Styles in globals.css target h2, h3, p, img, iframe inside this wrapper.
 */
export function BlogProseHtml({ html }: { html: string }) {
  return (
    <div
      className="blog-prose blog-prose-html px-5 pb-12 pt-8"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
