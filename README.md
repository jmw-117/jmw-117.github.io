# John Wilson — executive résumé

A static résumé at https://jmw-117.github.io/, rendered from React at build time and hosted on GitHub Pages. The published page ships no browser JavaScript, remote fonts, analytics or contact-form service.

## Local work

Use Node 22.13 or newer. Install with `npm ci`. If a Windows npm shim fails, invoke the installed npm CLI with Node.

- `npm run dev` runs the existing framework development server with native hot reload on port 5173.
- `npm run build` renders the production HTML and copies approved assets to `dist/`.
- `npm run preview` serves that build at http://127.0.0.1:4180. Rebuild after source edits.
- Check the changed React files with `node node_modules/typescript/bin/tsc --noEmit --jsx react-jsx --moduleResolution bundler --module esnext --target es2018 --esModuleInterop --resolveJsonModule --skipLibCheck --strict app/page.tsx app/layout.tsx`.

The optional `JW_BUILD_MODULES` environment variable points to an alternative node_modules directory containing React, React DOM and TypeScript. No runtime secrets or environment variables are required by the public page.

## Source and design

- `lib/site-content.json`: CV-derived career facts, qualifications, contact destinations and public URL.
- `app/page.tsx`: semantic sections, reusable links and decorative line icons.
- `app/globals.css`: shared colour, typography, spacing and layout tokens; responsive, focus, reduced-motion and print styles.
- `app/layout.tsx` and `scripts/export-static.cjs`: metadata for framework development and static production.
- `public/`: original portrait, original company/university logos, latest supplied CV and compressed architectural illustration.
- `public/_headers`: response-header configuration retained for the previous Sites host. GitHub Pages does not apply this file; same-origin CV links use the native HTML download attribute.

Navy is #0e1828. Sans and monospace stacks follow the owner's exact supplied tokens and load system fonts only. Stronger heading weights and darker supporting text improve visual definition without text shadows or rasterised lettering. The page and social title is John Wilson | CTO; capability headings use AI Platforms, Cloud Architecture and Engineering Leadership.

The original circular photograph has a crisp SVG frame inspired by the supplied Open to Work reference, with a white edge, green lower ring and curved #OPENTOWORK label. The whole portrait is 25% larger to accommodate the frame: 262.5px desktop, 232.5px tablet and 187.5px mobile. Its accessible name includes open-to-work status. No experience-duration, team-size or speed statistics are displayed.

ImBalance and IRIS logos remain the original files. The CV and portrait are byte-identical to the supplied originals. Contact opens the visitor's mail application; certifications use native disclosure.

## Validation — 23 October 2026

PASS: production build and strict type checking of page/layout.
PASS: Microsoft Edge rendering at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px; no horizontal overflow or broken images. Desktop, tablet and mobile screenshots were visually reviewed for hierarchy, alignment, image scale and cropping, exact logos, typography and responsive content order.
PASS: keyboard skip link, section navigation, native certification disclosure, reduced motion, back-to-top, contact destinations and both CV downloads, with downloaded bytes compared against the supplied PDF.
PASS: axe scans for WCAG 2.2 AA-related rules at 320, 390, 768 and 1440px returned zero violations. The curved SVG label required manual contrast review: all character bounds fall within the solid green band, with white-on-green contrast of 6.01:1. This is automated and targeted manual testing, not accessibility certification.
BASELINE: before the later title, typography and portrait-frame refinements, one local Lighthouse mobile run scored 100 in performance, accessibility, best practices and SEO; simulated LCP 1.7s, total blocking time 0ms and CLS 0. The small refinements retain static rendering with zero client JavaScript; Lighthouse was not rerun for them.
NOT VERIFIED: field Core Web Vitals, real-user INP, Safari/Firefox rendering, assistive-technology testing, email delivery and production enforcement of requested response headers. Local Lighthouse results do not establish real-user performance.

Evidence is retained in the chat's local visualization folder, including responsive screenshots, `qa-result.json`, `axe-results.json` and `lighthouse-mobile.json`.

## Branches, publishing and rollback

The repository is https://github.com/jmw-117/jmw-117.github.io. Its default and production branch is `main`. Agent work stays on `codex`; the owner's development branch is `develop`. `maintenance` and `upgrade` are reserved branches; no maintenance page has been implemented.

GitHub Pages uses GitHub Actions rather than publishing the repository root. `.github/workflows/pages.yml` installs locked dependencies, checks the page/layout types, builds `dist/` and publishes that directory. Action versions are pinned to verified commits. Pull requests into `main` run build checks; only `main` can deploy to the `github-pages` environment. Manual runs on other branches cannot publish.

Make changes on `codex` or `develop`, run the local checks, rebuild the tracked `dist/` output and open a pull request into `main`. Merging into `main` automatically publishes the site. Confirm that the Actions deployment succeeds, then check the live page, images and CV download. For rollback, revert the relevant release changes through a pull request into `main`; the resulting commit publishes automatically. Do not force-push shared branches.

The production origin in `lib/site-content.json` supplies canonical, social, robots and sitemap URLs. No custom domain, runtime credentials or paid hosting is required. Preserve the previous Sites identity in `.openai/hosting.json` as historical configuration; it is not used by the GitHub Pages workflow. Never include credentials or checkout-local runtime directories in source or archives.

## Architectural image

The built-in image generation tool refined the owner's reference into a metallic portal-and-block composition. The selected production asset is `public/architecture.webp` (960 × 640, 12,824 bytes), used below the fold with explicit dimensions and lazy loading. The original generated master is retained in the chat's generated-images folder.

Final prompt:

Use case: style-transfer.
Asset type: architectural illustration for the About section of an executive résumé website.
Input image 1 is the user's approved visual reference: a tall rectangular portal, two ascending solid blocks and a continuous angular dark navy path on a clean white floor. Retain this visual idea and sparse three-object composition. Refine it into a bold, premium architectural still life, not a line diagram.
Materials: precisely machined brushed stainless steel and satin aluminium, subtle fine grain, convincing clean specular highlights and restrained dark reflections. Solid confident forms with tiny bevels on the edges. The portal and both blocks should unmistakably look metallic, not concrete, plastic or clay.
Colour: silver metal, charcoal reflections, crisp white seamless background and floor, and a flat deep navy #0e1828 path. No additional colours.
Composition: refined three-quarter view, tall open portal on the left; one low block in the middle distance and one taller block to the right connected by the angular navy path. Maintain elegant negative space and generous white margins. Landscape 3:2, objects large enough to remain legible at a rendered width of 400px. Floor and outer margins pure white so the image integrates into a white page.
Lighting: premium studio product photography, large softbox highlights that reveal the metal, soft controlled contact shadows, extremely subtle floor reflection. Bright overall image, crisp edges.
Constraints: exactly one portal and two blocks. No extra objects, no text, no logos, no people, no decorative marks, no gradients in background, no glow, no cinematic dark background, no busy environment. Preserve the reference's understated executive character while improving material realism, finish, lighting and composition.
