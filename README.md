# Clean Care

An Astro information site about fragrance exposure and health. The site leads with articles, original sources, and practical ways to reduce exposure. Country-specific product recommendations are a secondary resource. This is not a Clean Care product brand or shop.

## Run locally

Use Node.js 22.12 or newer (Node 24 recommended).

```sh
npm ci
npm run dev
```

`npm test` checks the directory filters, catalogue integrity, article search, and self-check summary logic. `npm run build` creates `dist/`; `npm run preview` serves the production build.

## Editorial structure

- `src/pages/index.astro`: homepage organized around cause, consequences, evidence, and alternatives.
- `src/pages/guides/`: Markdown articles and the article index. The first pieces cover the state of evidence, indoor air chemistry, reducing exposure, and label terminology.
- `src/pages/evidence.astro`: source library with agency publications, a population study, and EPA webinar videos. Each item includes a note on its scope.
- `src/pages/about.astro`: editorial standards, community-topic policy, and individual health context.
- `src/pages/self-check.astro` and `src/lib/self-check.mjs`: seven-question fragrance-sensitivity and product-use reflection. A separate inventory covers candles, incense, perfume, laundry additives, air fresheners, cleaners, personal care, and diffusers even when no symptoms are reported. Results include inventory-specific alternatives, plus reported symptoms, frequency, uncertainty, and impact without a diagnostic or sensitivity score. Symptom topics were suggested by the user's Suntribe article; its broader causal claims are not adopted. The quiz cannot identify synthetic ingredients from scent or diagnose cancer, hormonal conditions, allergy, or asthma. Breathing symptoms show additional care guidance. Answers stay in page memory with no storage, analytics, or submission. Do not add tracking or claim this is a validated screening instrument. FDA, EPA, and NHS sources inform context but do not validate the quiz.
- `src/pages/directory.astro` and `src/data/product-catalog.mjs`: deduplicated brand-source product profiles with intersecting filters for checked US, UK, Singapore, Australian and New Zealand sources. Empty countries are omitted. Official image URLs and non-affiliate product links are recorded alongside caveats and check dates.
- `src/styles/ux-foundations.css`: accessible navigation, contrast and shared hub styles. Google Fonts and some publisher/brand images make external requests; see the privacy page.

Health claims should name the ingredient or exposure, the studied outcome, and the limits of the source. Do not present a social post, a video, or a study on one chemical as proof that every synthetic fragrance is harmful. Facebook group discussions can inspire topics, but posts should not be reproduced without permission or substituted for independent evidence. New source items should identify a review date.

Before adding a real product, verify the exact formulation, manufacturer evidence, country availability, and date checked. Only fragrance-free formulas are eligible: exclude perfume, parfum and scented essential oils, including products advertised as natural or free of synthetic fragrance. Unconfirmed formulas must not be published. Record `fragranceStatus: "fragrance-free"` only after checking the exact formula's official claim or ingredient list. `"not-applicable"` is reserved for optional devices without a fragranced formula. The product policy blocks publication when this review status or source evidence is missing. Fragrance-free is not an independent safety certification. Disclose any paid relationship beside the recommendation. Search, category, and country filters currently work together and update the page URL.

## GitHub Pages

This project is in the repository `cleancare-fragrance-free/cleancare-fragrance-free.github.io`. To publish it, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The included workflow tests, builds, and deploys on pushes to `main`, using the repository's Pages origin and base path. The website address is https://cleancare-fragrance-free.github.io/ and the self-check is at https://cleancare-fragrance-free.github.io/self-check/. Check the latest workflow run for deployment status.

The workflow follows [GitHub's Astro Pages setup](https://github.com/actions/starter-workflows/blob/main/pages/astro.yml). For another static host, upload `dist/` and set `SITE_URL` and `BASE_PATH` at build time so links and canonical URLs match the deployment path.

## Illustrated journal and product profiles

## Reversible UX/SEO upgrade (5 October 2026)

The previous deployed version is saved in the GitHub tag `pre-ux-seo-2026-10-05` (commit `9b4e78b2b57131bf28e02dcffff5d2a5ce41fde2`). Restore it through a new revert commit, preserving history; do not force-push or reset the shared branch. Ask the maintainer to revert the “Improve CleanCare discovery, accessibility and editorial credibility” commit and deploy that revert. The website address stays unchanged.

Country choices and hubs are derived from actual catalog entries in `src/data/directory-markets.mjs`. Empty countries are not offered. The directory deduplicates profiles and progressively reveals results; country/category hubs contain checked fragrance-free formulas. Topic hubs, separate expert profiles, printable checklist, honest editorial disclosures and privacy information are included. The existing essential-oil opt-in distinction and local-only toolkit/quiz behavior are preserved.

Validate with `npm test`, `npm run build`, `node scripts/check-built-links.mjs` and `node scripts/check-built-seo.mjs`. No analytics, email collection, paid endorsements or claimed independent medical review were added.

`src/data/articles.mjs` drives the searchable journal and original SVG artwork. Article writing lives in `src/pages/guides/`. `src/pages/products/[slug].astro` generates individual profiles from product data. Remote images are served by the respective brands; verify image permissions before wider promotional reuse and recheck URLs periodically. No affiliate links are active. The future product-reference queue is kept outside this repository and is not deployed. Fictional filter fixtures exist only under `tests/fixtures/`.
Catalogue expansion (29 September 2026): 14 product profiles. Country placement denotes a manufacturer source, not guaranteed availability. Discovery references are separate from official evidence; repeated catalogue sizes are consolidated, and materially different regional versions are separate profiles. Images remain hosted by brands/their observed CDN; `imageSourceUrl` records provenance. No catalogue review text, ratings, prices or affiliate IDs are copied.
