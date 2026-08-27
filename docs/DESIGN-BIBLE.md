# Uncle Hangul Design Bible

**Status:** Living document (design & product source of truth)  
**Last updated:** 2026-08-27  
**Scope:** `unclehangul.com` main site — not `tools.unclehangul.com`

This is **not** a work log. It records **why** the product looks and behaves the way it does, and **what** to build next. Implementation notes and commit history live in git; this file is the **IA + brand + phase plan** reference.

---

## 1. Brand in one sentence

**Uncle Hangul (한글아저씨)** teaches Korean through **Hangul as a typography system** — clear blocks, calm surfaces, minimal chrome.

---

## 2. Three pillars (main site)

| Pillar | Role | Primary surfaces |
|--------|------|------------------|
| **Learn** | Long-form reading, SEO, depth | `/learn`, article pages |
| **Hangul Play** | Short interactive widgets, games, “try it” | Home `#name-converter`, `/play` |
| **Watch** | Funnel to **Instagram** & **YouTube** | `/watch`, footer/header links |

**Explicitly not on main home:** Seller / logistics tools (`tools.unclehangul.com`). They stay indexed for search; no main-site navigation.

---

## 3. Channel triangle

```
Instagram  ←→  unclehangul.com  ←→  YouTube
  discovery        hub (Learn + Play)     depth / trust
```

- **Site:** canonical text, widgets, SEO.
- **Instagram:** clips, mood, daily tips → link to one Learn or Play URL.
- **YouTube:** lessons, Shorts → pair with one Learn article where possible.
- Home does **not** embed YouTube feeds (minimize weight & scroll). Text links + `/watch` hub.

---

## 4. Visual system (unchanged)

- Background `#F2F2F0`, text `#111111`, borders `#D9D9D3` (0.5px), accent `#FF4B3E`
- Fonts: Inter (EN), Pretendard (KO)
- Touch minimum: `--touch-min: 48px`
- Section spacing: `--space-section-mobile` / `--space-section-desktop`, `.section-y`
- No drop shadows; hairline grids only

---

## 5. Mobile-first rules (mandatory)

1. **Design 390px wide first**, then `md:` enhancements — never desktop-only flows.
2. **First viewport** must answer: *Korean learning site · Read · Play · Watch*.
3. **One primary action per band**; secondary links as one-line or horizontal chips (~48px tall).
4. No duplicate media (e.g. Shorts sidebar + hero embed).
5. Sticky header + bottom anchor ad: use `safe-area-inset-bottom` and `.site-bottom-offset`.
6. Learn sidebar / tool promos: **hidden on mobile**; use top chips or in-content links instead.
7. Seller tools: **zero** links in main header, home, Learn chips.

---

## 6. Home IA (target)

```
1. Hero          — bilingual value prop + channel text links (no embeds)
2. Learn rail    — latest articles (card list, Hangul-forward)
3. Hangul Play   — Name converter (live)
                 — one-line city-names teaser → /play/city-names
                 — horizontal chip links → other Play widgets + /play
4. Channels band — Instagram · YouTube · /watch
5. About teaser  — short cred + link to /about
```

**Removed from home:** giant `#menu` site map, Dashboard sidebar Shorts, Seller tools, inline YouTube embeds.

---

## 7. Hangul Play catalog

| Slug | Status | URL |
|------|--------|-----|
| `name-converter` | **Live** | `/#name-converter` (home) |
| `city-names` | **Live** | `/play/city-names` |
| `jamo-builder` | **Live** | `/play/jamo-builder` (초·중·종성 조합 + sound) |

Future widgets: same pattern — link everywhere, ship incrementally.

Coming-soon pages: branded shell, `noindex`, back link to `/play` or home.

---

## 8. Navigation (main site)

**Header (desktop):** Learn · Play · Watch · About · Contact  
**Mobile drawer:** same + About block  
**Footer:** Contact, Privacy, Terms (no seller links)

---

## 9. Implementation phases

| Phase | Focus | Status |
|-------|--------|--------|
| **A** | Home IA, remove seller from nav, Play/Watch routes, coming-soon shells | **Done** (2026-08-27) |
| **B** | Learn rail visuals (Hangul tiles), hero copy polish, `/watch` content | **Done** (2026-08-27) |
| **C** | City names + TTS widget | **Done** (2026-08-27) |
| **D** | Jamo builder game MVP | **Done** (2026-08-27) |
| **E** | IG/YT ↔ Learn/Play pairing ops, optional scheduled publish | **Done** (2026-08-27) |

---

## 10. Content voice

- **Learn:** English primary for Visual Vocabulary; Korean supporting lines OK.
- **Play:** playful, short, shareable.
- **Watch:** outbound — respect each platform’s native format.

---

## 11. References in repo

- Play catalog: `src/lib/play/catalog.ts`
- Channels: `src/lib/channels.ts`
- Nav: `src/lib/site-nav.ts`
- Mobile patterns: prior Phase 1–3 (`section-y`, drawer, Learn chips)

When IA changes, **update this file first**, then code.
