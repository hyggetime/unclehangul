# Uncle Hangul

Typography-dominant brutalism for [unclehangul.com](https://unclehangul.com).

## Stack

- Next.js (App Router)
- Tailwind CSS v4
- TypeScript

## Design system

| Token | Value |
| --- | --- |
| Background | `#F2F2F0` |
| Text | `#111111` |
| Border | `#D9D9D3` (`0.5px`) |
| Accent | `#FF4B3E` (single accent only) |
| EN | Inter (`font-en`) |
| KO | Pretendard (`font-ko`) |

No shadows. Layout via plane division and hairline guides only. Mobile-first (390–430px), touch targets ≥ 48×48px. Ad placeholders reserve bottom / sidebar / inline slots to prevent CLS.

## Scripts

```bash
npm run dev
npm run build
npm run start
```
