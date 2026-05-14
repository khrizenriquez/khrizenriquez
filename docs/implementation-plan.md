# Portfolio V1 Implementation Plan

Date: 2026-05-14
Branch: `feat/portfolio-v1`
Spec: `docs/superpowers/specs/2026-05-14-personal-portfolio-design.md`

## Goal

Ship the first static portfolio release for GitHub Pages: a single visual home page with five curated projects, Markdown-managed content, Bulma styling, a light/dark toggle, prepared analytics, and GitHub Actions deployment.

## Phases

1. Scaffold the site
   - Create Astro + TypeScript project files.
   - Add Bulma and baseline tooling.
   - Configure Astro for repository-based GitHub Pages at `/khrizenriquez/`.

2. Model content
   - Add Astro content collection schema for projects.
   - Create five seed Markdown project entries.
   - Add Spanish UI copy module.
   - Store project assets under `public/projects/<slug>/`.

3. Build the interface
   - Create the home page.
   - Build project gallery components.
   - Add visible light/dark toggle.
   - Add desktop-first animation with reduced mobile motion.
   - Keep i18n structure internal; do not show language selector.

4. Add operational pieces
   - Add GA4 component/config that only loads when an ID exists.
   - Add GitHub Pages workflow.
   - Add release checklist, ADR, trunk-based notes, and AI update workflow.

5. Verify
   - Run install, build, and static checks.
   - Start local dev server.
   - Inspect desktop and mobile layout.
   - Confirm external links and disabled analytics behavior.

## Acceptance Criteria

- `npm run build` succeeds.
- Home page renders at the configured base path.
- Five featured projects render from Markdown.
- Project cards link to demo or GitHub.
- Theme toggle works and stores explicit choice in local storage.
- Mobile layout is clean and less animated than desktop.
- GA4 script is absent when no measurement ID is configured.
- GitHub Pages workflow exists for merges to `main`.
- No custom domain or `CNAME` is added in V1.
- `old_version/` remains available locally as migration source material and is ignored by Git.
