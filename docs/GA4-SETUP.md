# GA4 setup — Uncle Hangul

**Property:** unclehangul.com (Measurement ID in `NEXT_PUBLIC_GA_MEASUREMENT_ID`)  
**Code reference:** `src/lib/analytics/ga4.ts`

Custom events only appear in Explore **after** you register matching **event-scoped custom dimensions** in GA4 Admin. Do this once per property.

---

## 1. Custom definitions (Admin)

**Path:** GA4 → **Admin** (gear) → **Data display** → **Custom definitions** → **Create custom dimensions**

For each row: **Dimension name** = display label (any), **Scope** = **Event**, **Event parameter** = exact string below.

### Required for content feedback (👍/👎)

| Event parameter | Suggested dimension name | Scope | Used by event |
|-----------------|--------------------------|-------|---------------|
| `content_type` | Content type | Event | `content_feedback` |
| `content_id` | Content ID | Event | `content_feedback` |
| `reaction` | Feedback reaction | Event | `content_feedback` |

**`content_type` values:** `learn` · `tool` · `play`  
**`content_id` examples:** `graphic-blueprint-hangul-loanwords`, `ems-address`, `name-converter`  
**`reaction` values:** `helpful` · `not_helpful`

### Recommended (already sent by the site)

| Event parameter | Suggested dimension name | Scope | Used by event |
|-----------------|--------------------------|-------|---------------|
| `page_section` | Page section | Event | `page_context` |
| `tool_name` | Tool name | Event | `tool_action` |
| `action` | Tool action | Event | `tool_action` |
| `field` | Tool field | Event | `tool_action` (optional) |
| `percent_scrolled` | Percent scrolled | Event | `scroll_depth` |
| `scroll_depth_bucket` | Scroll depth bucket | Event | `scroll_depth` |

> `page_path`, `page_title`, and `page_location` are often available without custom registration; register only if they do not appear in Explore.

**Note:** New dimensions apply to data collected **after** creation (not retroactive). Allow 24–48 h before reports stabilize.

---

## 2. Mark helpful votes (optional)

**Path:** Admin → **Data display** → **Events** → find `content_feedback` → toggle **Mark as conversion** (optional: create a separate key event only for `reaction = helpful` using Explorations or GA4 audiences later).

---

## 3. Explore — helpful feedback by article/tool

1. **Explore** → **Free form**
2. **Variables** → Import or add dimensions: **Content ID**, **Content type**, **Feedback reaction**
3. **Technique:** add filter **Event name** exactly matches `content_feedback`
4. **Rows:** Content ID  
5. **Columns:** Feedback reaction  
6. **Values:** Event count  
7. Sort by helpful count or add calculated helpful rate in a spreadsheet export

### Quick check (Realtime)

1. Open a Learn article on production  
2. Click **Helpful**  
3. **Reports** → **Realtime** → **Event count by Event name** → confirm `content_feedback`

---

## 4. Custom events reference

| Event | When fired |
|-------|------------|
| `page_context` | Every client route change |
| `scroll_depth` | 25 / 50 / 75 / 90 / 100 % scroll milestones |
| `tool_action` | Tool UI interactions (copy, convert, etc.) |
| `content_feedback` | User taps Helpful or Not really (once per browser per page) |

---

## 5. Environment

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Tracking is **disabled in `development`** (`NODE_ENV=development`). Test on staging/production or temporarily adjust `isGaTrackingEnabled()` only for local debugging.

---

## 6. Checklist

- [ ] Measurement ID in production env (Vercel/hosting)
- [ ] Custom dimensions: `content_type`, `content_id`, `reaction`
- [ ] Custom dimensions: `page_section` (and tool/scroll if reporting on those)
- [ ] Realtime test: `content_feedback` after clicking Helpful
- [ ] Explore report saved: “Content feedback by ID”
