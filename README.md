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

## Next
- Image rotation animation (Daniel)
- Collection pages: load more, large highlight image in grid, second image on hover
- Images in the filter menu (Quince-style)
