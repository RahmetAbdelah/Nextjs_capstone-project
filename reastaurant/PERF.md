# Performance measurement

## Scope and method

The production build was served with `next start`. Before and after readings below came from the same shared Chrome page, reloaded with browser CDP throttling set to 150 ms RTT, 200,000 bytes/s download, 93,750 bytes/s upload, and 4× CPU slowdown. The available browser viewport was 617 × 259 CSS pixels. LCP and CLS were read from the browser's buffered `PerformanceObserver` entries after reload; INP is the duration of one Add to cart interaction, not a field-data percentile. These are **single local lab observations**, not CrUX data or a Lighthouse report.

| Browser observation | Before | After | Change |
|---|---:|---:|---:|
| LCP, `/menu` | 288 ms | 364 ms | +76 ms |
| CLS, `/menu` | 0.000 | 0.000 | no observed change |
| One Add to cart interaction duration | 24 ms | 40 ms | +16 ms; both below 200 ms |

The before reading was taken from a production build of the pre-optimization commit. Because the offline build could not download Google Fonts, only its font loader was temporarily pointed at the same Geist file as the after version; the original baseline CSS still rendered Arial. The after reading was taken from the final production build after adding local menu artwork and self-hosted Geist. These are not repeated samples; small browser-run variability should be expected. The menu changed materially because artwork was added where no dish images existed, which adds above-the-fold content and explains the observed LCP increase. Intrinsic 800 × 600 dimensions kept that content from causing a measured layout shift. CLS was already zero before the change, so this sample does **not** establish a numerical CLS improvement.

## Lighthouse status

Lighthouse was run against the production menu after optimization and attempted against the production homepage before optimization with simulated mobile throttling (150 ms RTT, 1.6 Mbps download, 4× CPU). The only locally available runner was the cached Lighthouse bundle inside `chrome-devtools-mcp` because the Lighthouse CLI could not be downloaded (npm returned `ECONNRESET`). The initial run failed trace recording with `NO_NAVSTART`; a subsequent attempt returned these audit states:

| Lighthouse audit (mobile simulated throttling) | Before | After |
|---|---|---|
| LCP | Not applicable (no numeric result) | Not applicable (no numeric result) |
| CLS | Audit error (`NO_NAVSTART`) | 0.000 (numeric audit) |
| INP | Not applicable (no numeric result) | Not applicable (no numeric result) |

The after run had no runner-level runtime error and a performance category score of 1.0, but LCP and INP were still not applicable. The before run is not comparable: trace startup failed. Therefore these results **do not demonstrate a valid Lighthouse improvement**. Do not interpret the browser observations above as Lighthouse audit results or compare the category score as an improvement.

Re-run Lighthouse when its CLI and browser pairing are available, against fresh production servers on both revisions, with the same mobile preset and throttling. Save the JSON reports and replace this section with comparable audited LCP, CLS, and INP values. Lighthouse does not always produce an INP lab value for a navigation with no interactions; use a scripted interaction/Timespan or field data as appropriate.

## Changes and verified effects

- The menu/detail dish art is local 800 × 600 WebP served through `next/image`; generated markup includes responsive `srcset`, `sizes`, intrinsic dimensions, and descriptive alt text. The first menu card alone is preloaded; other images retain lazy loading. Source WebP files total about 34 KB before Next.js responsive optimization.
- Geist is loaded with `next/font/local` from `public/fonts/geist-latin.woff2`, and the global body font now uses the generated Geist CSS variable. The production page requested one same-origin WOFF2 and no Google Fonts hosts. Its fallback stack reserves layout through Next's generated font fallback metrics.
- A source scan found no third-party script tags or embeds. No script was added; `next/script` and a lazy strategy are unnecessary until the app actually integrates a third-party script.
- `.env.example` lists every environment variable used by the app. `.env.local` and other `.env*` files remain ignored; `.env.example` is the explicit exception.