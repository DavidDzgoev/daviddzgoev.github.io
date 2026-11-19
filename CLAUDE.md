# daviddzgoev.github.io

Personal CV site of David Dzgoev, served at ddzgoev.me (GitHub Pages). Vite + React + Tailwind; the whole page is `src/pages/Index.tsx`, the data arrays at its top.

- Read `DESIGN.md` before changing anything visual. The look comes from the Figma CV and must stay soft UI.
- Content must match the MBA CV and the work history (paths in `DESIGN.md`, "Content rules"). Unfinished studies are never shown as a degree.
- Pushing to `main` publishes the site (`.github/workflows/deploy.yml`). Do not commit or push unless asked.
- `npm run build` must pass. `tsc` reports errors in `src/components/ui/input-otp.tsx`; they come from the template and do not affect the build.
