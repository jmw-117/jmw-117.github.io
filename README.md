# John Wilson - personal website

React source in app/page.tsx and app/globals.css, exported as static HTML for Sites. The deployment manifest serves dist. Logos and the original CV are included in public and dist.

Preview the checked-in build with `node scripts/serve-static.cjs`, then open http://127.0.0.1:4180.

To regenerate dist, make react, react-dom and typescript available to Node (or set JW_BUILD_MODULES to a node_modules directory containing them), then run `node scripts/export-static.cjs`. The exporter renders HTML at build time; no React runtime is shipped to visitors.

Verified in Chrome at 1440, 768, 390 and 320 pixels: logo loading, no horizontal overflow, section navigation, back-to-top, keyboard skip link, reduced motion, and both original CV downloads. Email and social link targets match the supplied contact details. No browser console errors. External account availability and email delivery are not tested.

Publishing uses the existing Sites project in .openai/hosting.json. Preserve its audience and use the Sites workflow; do not register another project.

No analytics, contact-form backend or third-party fonts are included.
