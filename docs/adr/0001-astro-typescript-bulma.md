# ADR 0001: Astro, TypeScript, and Bulma

Date: 2026-05-14
Status: Accepted

## Context

The portfolio is a mostly static, content-led site that will be updated only a few times per year. It needs Markdown-managed project content, strong SEO, GitHub Pages deployment, and a maintainable structure for future Spanish/English content.

The visual direction should be modern and gallery-like, while still using Bulma visibly as requested.

## Decision

Use Astro with TypeScript and Bulma.

- Astro generates fast static HTML and has first-class content collection support.
- TypeScript helps validate project metadata and future-proof content handling.
- Bulma provides visible, maintainable CSS primitives without requiring a JavaScript runtime.
- Custom CSS will layer on top of Bulma to create a distinctive editorial gallery feel.

## Consequences

- The site stays lightweight and easy to host on GitHub Pages.
- Markdown content becomes the primary maintenance path.
- React and shadcn/ui are not included in V1.
- Future interactive components can still be added selectively if needed.

