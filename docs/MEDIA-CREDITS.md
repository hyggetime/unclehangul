# Learn article image credits

All blog images use a **single rights line** under the figure, rendered from `src/lib/blog/image-credits.ts`.

## Add a new image

1. Place the file under `public/images/posts/` (or `public/images/og/learn/` for OG art reused in articles).
2. Register the path in `IMAGE_CREDITS` in `image-credits.ts`.
3. In markdown, use only a descriptive `alt` on the image line (no manual `*출처*` lines).

```markdown
![Descriptive alt for accessibility](/images/posts/example.png){scale=0.6}
*Optional extra caption line — scene description, not copyright.*
```

The optional italic line is for **scene notes** (e.g. tongue-twister contrast). **Copyright always comes from the registry.**

## Credit line format (rendered)

| Kind | Registry `kind` | Rendered pattern |
|------|-----------------|------------------|
| Self-made / no third-party rights | `original` | `Credit · Original · Uncle Hangul.` |
| With contributor | `original` + `by` | `Credit · Original · Sofie Fribo (Uncle Hangul).` |
| 공유마당 (Gongu) | `gongu` | `Credit · 「work」 · author · [license](url) · [Gongu (공유마당)](sourceUrl).` |
| KOGL (non-Gongu page) | `kogl` | `Credit · work · author · KOGL Type N · [Source](url).` |

### Gongu example (한글날)

- **Work:** 한글날  
- **Author:** 한국저작권위원회  
- **License:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.ko)  
- **Source:** [공유마당 detail](https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn=13213550&menuNo=200018)

CC BY allows commercial use with attribution (compatible with AdSense when credited correctly).

## Markdown parser

- `![alt](src)` → `alt` is used for `<img alt>` and, unless a note line follows, as the visible caption.
- Next line `*…*` → **caption note** (description), not copyright.
- Copyright is **always** appended from `IMAGE_CREDITS[src]` when registered.
