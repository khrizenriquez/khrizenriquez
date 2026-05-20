# Christofer Enriquez Portfolio

Personal portfolio for Christofer Enriquez, built as a static single-page site for GitHub Pages.

The site is designed as a visual project gallery inspired by [Asuka EO](https://www.asukaeo.com/), with a wide mosaic grid, a persistent project search, light/dark theme support, and Markdown-managed project content.

## Stack

- Astro 6
- TypeScript
- Bulma CSS
- Markdown content collections
- GitHub Pages
- GitHub Actions

## Requirements

- Node.js `>=22.12.0`
- npm `>=10`

The expected Node version is documented in `.nvmrc`.

```bash
nvm use
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run the production preview locally:

```bash
npm run build
npm run preview
```

Local URL:

```text
http://127.0.0.1:4321/khrizenriquez
```

The `/khrizenriquez` base path is intentional because the first release targets GitHub Pages for the `khrizenriquez/khrizenriquez` repository.

## Scripts

```bash
npm run dev
```

Starts Astro in development mode.

```bash
npm run build
```

Runs `astro check` and builds the static site into `dist/`.

```bash
npm run preview
```

Serves the production build locally.

## Project Structure

```text
src/
  components/          Astro components
  content/projects/    Markdown project entries
  i18n/                Spanish UI copy
  layouts/             Base HTML layout
  pages/               Site routes
  styles/              Global CSS
  utils/               Shared helpers
public/
  projects/            Project cover images
docs/
  adr/                 Architecture decision records
  superpowers/specs/   Product/design spec
```

## Project Content

Projects are managed as Markdown files in:

```text
src/content/projects/
```

Each project has frontmatter similar to:

```yaml
title: "Image Optimizer"
slug: "image-optimizer"
featured: true
order: 1
language: "es"
type: "Dev tooling"
stack:
  - TypeScript
  - Imagenes
cover: "/projects/image-optimizer/cover.svg"
coverAlt: "Project cover description"
repo: "https://github.com/khrizenriquez/image-optimizer"
demo: "https://example.com"
cta: "Ver demo"
summary: "Short project description."
```

The home page renders every Spanish project entry and sorts them by `order`.

## Search

The project search runs entirely in the browser. It filters by:

- project title
- slug
- summary
- project type
- stack tags
- repository URL
- demo URL

Search is intentionally simple so the site remains static and easy to maintain.

## Theme

The site supports light and dark themes.

- It defaults to the user's system preference.
- Explicit user selection is stored in `localStorage`.

## Analytics

GA4 support is prepared but disabled by default.

To enable it, set:

```text
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Analytics only loads in production and only when the measurement ID exists.

## Deployment

Deployment is handled by GitHub Actions:

```text
.github/workflows/deploy.yml
```

The workflow:

1. Installs dependencies with `npm ci`.
2. Builds the Astro site.
3. Uploads `dist/` as the GitHub Pages artifact.
4. Deploys to GitHub Pages.

In GitHub repository settings, Pages should use **GitHub Actions** as the source.

## Branching Workflow

This project follows Trunk-Based Development:

- `main` is the trunk.
- Work happens in short-lived branches.
- Pull requests should stay small and focused.
- GitHub Pages deploys from `main`.

Current feature branch:

```text
feat/portfolio-v1
```

## Security Checks

Production dependency audit:

```bash
npm audit --omit=dev
```

Full dependency audit:

```bash
npm audit
```

The project uses an npm override for `yaml` so transitive development tooling resolves to a patched version.

## Notes

- `old_version/` is intentionally ignored by Git and kept only as local migration source material.
- Custom domain support is not enabled in v1. No `CNAME` file is included yet.
- Project covers can be replaced under `public/projects/<slug>/`.

