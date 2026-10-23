# Résumé project guidance

- Work on `codex`. `main` is the production branch; `develop`, `maintenance` and `upgrade` are the owner's additional branches. Do not implement a maintenance page unless asked.
- Publish this résumé exclusively to GitHub Pages at https://jmw-117.github.io/. Never create, save a version of, or deploy this project through Sites. The owner deleted the previous Sites publication on 24 October 2026; the Sites connector confirmed that the project no longer exists.
- Preserve the approved design, original portrait and company logos, supplied CV, exact career facts, navy #0e1828 and system font stacks.
- Keep README.md public-facing: an executive résumé summary only. Keep build instructions, implementation notes and validation evidence out of it.
- Use `npm run dev` for development with native hot reload. `npm run build` generates the static production output; `npm run preview` serves it on port 4180. The page ships no browser JavaScript.
- Validate the changed page with the production build, strict type checks, responsive browser review, keyboard navigation and reduced-motion checks. Preserve working CV downloads.
- Check page types with `node node_modules/typescript/bin/tsc --noEmit --jsx react-jsx --moduleResolution bundler --module esnext --target es2018 --esModuleInterop --resolveJsonModule --skipLibCheck --strict app/page.tsx app/layout.tsx`.
- Rebuild tracked `dist/` before committing. Release authorised changes through a pull request from `codex` to `main`; `.github/workflows/pages.yml` builds and publishes `dist/` only from `main`.
- Verify the live URL after deployment. Keep the local checkout on `codex`. When branch synchronisation is requested, fast-forward all five branches to the released commit without force-pushing or discarding branch-specific work.
