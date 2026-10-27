# Eugenia Grace — Shopify theme (EG Dev)

Working copy of the Eugenia Grace Shopify theme (Dawn-based, customized).
Pulled from the **EG Dev** theme (`#160414171207`) on `eugenia-grace-2.myshopify.com`.
Private reference repo — company code, do not make public.

## Workflow

```bash
# preview local changes (needs the storefront password from Online Store → Preferences)
shopify theme dev --store eugenia-grace-2.myshopify.com

# upload to the EG Dev theme only — never the live theme
shopify theme push --theme 160414171207

# get the latest from Shopify (e.g. after edits in the theme editor)
shopify theme pull --theme 160414171207
```

Rules: work on EG Dev, preview, then ask Rose before anything is published live.
Custom EG sections are prefixed `eg-`.

## Changes log

### 2026-10-18 — Product page gallery + artisan section
- `templates/product.json`: gallery layout `stacked` → `thumbnail_slider` (one image in the frame + thumbnails, no scrolling); image zoom `lightbox` → `none` (replaced by the custom viewer below).
- `assets/eg-product-gallery.css` + `assets/eg-product-gallery.js` (new), loaded in `sections/main-product.liquid`:
  - main image + thumbnails fit on one screen (desktop)
  - ‹ › arrows on the main image
  - click image → full-screen viewer with "← Back" (top left), image counter, arrows, click to zoom 2.2× and pan; Esc / arrow keys
- `sections/egartisanproduct.liquid`: reads the linked **Artisan metaobject** (name, portrait, story, quote) instead of the old empty per-product fields, so the artisan's photo, quote and story now show on product pages.

### 2026-10-18 — Collection grid
- `sections/main-collection-product-grid.liquid`: new settings "EG grid" → **Load more** button (default on) instead of page numbers, with "X of Y pieces"; **large highlight card** every Nth product (default 5, 0 = off).
- `assets/eg-collection-grid.css` + `assets/eg-collection-grid.js` (new): highlight card spans 2 columns × 2 rows (grid uses `dense` so smaller cards fill around it); Load more fetches the next page and appends it in place (falls back to a normal link without JavaScript).
- Second image on hover: Dawn's built-in "show second image on hover" is already on — checked it works.

### 2026-10-18 — Artisan name links to the artisan page
- `sections/egartisanproduct.liquid`: the artisan's name on the product page now links to their artisan page (the product's collection that uses the `artisan` template, e.g. `/collections/julia-pappas`; falls back to the collection whose handle matches the artisan entry). Adds a "Discover Julia's collection →" link under the story when no manual link is set in the section settings.

### 2026-10-19 — Homepage in Simon's order (EG Dev only)
- `templates/index.json`: Brand film → Manifesto → Discover → Editorial Story → The Edit → Inside the Atelier (Julia Pappas) → Luxury of Handmade → full-width video → Quote → Newsletter.
- Used the existing sections (egmanifesto, egdiscover, eg-editorial-story, eginsidetheatlier, egluxury).
- Hidden on EG Dev (not deleted): Icons slider, Media duo, Artisan products. One toggle in Customize brings them back.
- Images still needed from Simon. Live homepage not touched.

## Next
- Image rotation animation (Daniel)
- Images in the filter menu (Quince-style)
