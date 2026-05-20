# Release Checklist

Use this checklist before merging a portfolio update to `main`.

## Content

- Featured projects are intentional and ordered.
- Search finds projects by title, summary, stack tags, type, and repository/demo URL.
- Empty search state and clear action work.
- Project links point to the best destination: demo first, GitHub otherwise.
- Screenshots or cover images load and have useful alt text.
- Spanish copy is polished and concise.
- No incomplete English language selector is visible.

## Quality

- `npm run build` passes.
- Desktop layout is visually balanced.
- Mobile layout is readable and restrained.
- Theme toggle works in light and dark modes.
- Keyboard focus is visible.
- External links open correctly.
- Analytics does not load without a GA4 measurement ID.

## Deployment

- Branch is short-lived and up to date with `main`.
- Pull request is small and reviewable.
- GitHub Actions passes after merge.
- GitHub Pages publishes successfully.
- No `CNAME` is added until the custom-domain release.
