# Personal Portfolio Design

Date: 2026-05-14
Status: Approved for implementation planning
Owner: Christofer Enriquez
Repository: https://github.com/khrizenriquez/khrizenriquez

## Purpose

Build a personal portfolio for Christofer Enriquez that works as a polished, static GitHub Pages site. The portfolio should first build trust with potential clients and consulting opportunities, then demonstrate technical depth to engineering peers, and finally support recruiters with quick access to professional profiles.

The site should feel modern, visual, easy to maintain, and suitable for about six content updates per year. The visual direction is strongly inspired by Asuka Eo's portfolio: a curated gallery with minimal navigation, strong project imagery, and restrained text.

## Audience Priority

1. Potential clients and consulting leads.
2. Technical teams and engineering peers.
3. Recruiters or hiring managers.

## V1 Scope

The first release is a single static home page published to GitHub Pages at `khrizenriquez.github.io/khrizenriquez`.

Included in V1:

- Hero/header with `Christofer Enriquez` and `Senior Web Developer`.
- Short professional, approachable positioning copy in Spanish.
- External links to LinkedIn, GitHub, and email.
- Visible light/dark theme toggle.
- Visual gallery of all Spanish project entries available in Markdown.
- Simple client-side project search by title, summary, type, stack tags, repository URL, and demo URL.
- Each project card links directly to the best external destination: demo first when available, otherwise GitHub.
- Project content sourced from Markdown.
- Spanish content for launch.
- Internal structure prepared for English, without showing an incomplete language selector.
- Google Analytics 4 integration prepared but disabled unless a measurement ID is configured.
- GitHub Actions build and deploy to GitHub Pages.
- Project documentation for PRD/spec, ADR, release checklist, AI update workflow, and trunk-based workflow.

Out of V1:

- Project detail pages.
- Visible language selector.
- Custom domain and `CNAME`.
- PDF CV.
- Contact form.
- Preserving old Ghost routes from `old_version`.
- Blog or notes section.

## Recommended Approach

Use Astro with TypeScript and Bulma.

Astro is the best fit because the site is content-led, static, Markdown-friendly, SEO-friendly, and simple to deploy to GitHub Pages. TypeScript gives safer content modeling and future-proofing without adding much maintenance cost. Bulma should be used visibly for layout and components, with custom CSS layered on top to avoid a generic template look.

React/Vite is not recommended for V1 because the portfolio is not primarily an interactive application. It would add extra work for Markdown, routing, metadata, and static publishing without enough benefit. shadcn/ui is also not recommended for V1 because it is tied to React and Tailwind conventions, which would fight the decision to use Bulma.

## Visual Experience

The home page should behave like an editorial project gallery.

The first viewport should communicate:

- Name: Christofer Enriquez.
- Role: Senior Web Developer.
- A concise Spanish value statement focused on web solutions, automation, and technical judgment.
- Primary links: LinkedIn, GitHub, email.
- Theme toggle.

The project area should use large visual cards with screenshots or representative images. Text on each project should be brief: title, short context line, stack tags, and CTA. The gallery should prioritize visual scanning over long descriptions.

The gallery should include a small search control before the cards. Search runs entirely in the browser and filters the single-page gallery by project title, summary, type, stack tags, repository URL, and demo URL. It should show a result count, provide a clear action, and display a simple empty state when nothing matches.

Motion should be expressive on desktop:

- Animated entrance for hero and gallery.
- Strong project hover states.
- Smooth theme transitions.
- Visual emphasis on cards when focused or hovered.

Mobile should use reduced animation and a simpler layout for performance and readability.

## Content Model

Use a hybrid Markdown-centered content model.

Project files live in:

```text
src/content/projects/*.md
```

Each project file should include frontmatter similar to:

```yaml
title: "Image Optimizer"
slug: "image-optimizer"
featured: true
order: 1
language: "es"
type: "Tooling"
stack:
  - TypeScript
  - Images
  - CLI
cover: "/projects/image-optimizer/cover.webp"
repo: "https://github.com/khrizenriquez/image-optimizer"
demo: ""
cta: "Ver repositorio"
```

The body can hold future case-study content, even though V1 only uses frontmatter and a short excerpt.

The home page should query Spanish projects, sort by `order`, and render all available entries on the same page. The chosen projects are editorial, not automatically selected by GitHub activity.

Initial seed projects:

1. `image-optimizer`
2. `textual-guardian`
3. `mgen`, combining `mgen-frontend` and `mgen-backend`
4. `grupobasilea`
5. `rolling-spider`, sourced from `old_version`

These are starter choices and must be easy to replace by editing Markdown and project assets.

Global Spanish interface copy should live in a small i18n module, for example:

```text
src/i18n/es.ts
```

The structure should allow adding English later without redesigning routes or components, but no language selector is shown until English content exists.

## Assets

Project images should live under:

```text
public/projects/<project-slug>/
```

Preferred format is optimized `.webp` when practical. The old site under `old_version` is a source for historical project text and images, but old routes are not preserved in V1.

LinkedIn acts as the live CV. No PDF CV is included in V1.

## Analytics

Prepare GA4 but keep it disabled unless a measurement ID exists.

Implementation expectation:

- Do not load analytics in local development.
- Do not load analytics when the ID is missing.
- Keep the measurement ID in configuration or environment variables.
- Confirm during verification that no analytics script is emitted when disabled.

## Deployment

Use GitHub Actions to build and deploy Astro to GitHub Pages on merges to `main`.

Initial deployment target:

```text
https://khrizenriquez.github.io/khrizenriquez/
```

Do not add `CNAME` in V1. The custom domain `khrizenriquez.com` should be documented as a later release task.

## Repository Workflow

Use Trunk-Based Development:

- `main` is the trunk.
- Changes happen in short-lived branches.
- Each change opens a small PR to `main`.
- Merge frequently.
- GitHub Actions deploys after merge.

This local folder should become the repository workspace. Keep `old_version` available as historical source material during migration.

## Documentation Set

The project should include the following documentation:

- PRD/spec for the portfolio.
- ADR for the stack decision: Astro + TypeScript + Bulma.
- Release checklist.
- AI update workflow for future content updates.
- Trunk-based development workflow notes.

The documentation should be practical and short. The goal is repeatable AI-assisted maintenance, not heavy process for its own sake.

## Quality Checks

Before release:

- Astro build passes.
- Desktop and mobile layouts render cleanly.
- External links work.
- Project cards have valid destinations.
- Light/dark theme toggle defaults to the system preference and persists explicit user choice in local storage.
- Keyboard focus is visible and usable.
- Mobile animation is reduced compared with desktop.
- Text contrast is acceptable in both themes.
- GA4 does not load when no measurement ID is configured.
- GitHub Pages deploy succeeds.

## Open Implementation Notes

- The exact visual system, palette, and animation details will be decided during implementation, while preserving the approved direction.
- The five seed projects are initial editorial candidates chosen to start the site and may be replaced later without changing the architecture.
- Project detail pages are a likely next iteration after V1, using the existing Markdown bodies.
