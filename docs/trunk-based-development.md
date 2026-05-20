# Trunk-Based Development

This project uses `main` as the trunk.

## Rules

- Keep branches short-lived.
- Make one coherent change per branch.
- Prefer small pull requests.
- Merge frequently once checks pass.
- Avoid long-lived release or feature branches.

## Suggested Branch Names

- `feat/project-detail-pages`
- `content/update-featured-projects`
- `docs/custom-domain-runbook`
- `fix/mobile-gallery-layout`

## Release Flow

1. Branch from `main`.
2. Commit focused changes.
3. Open a PR to `main`.
4. Verify GitHub Actions.
5. Merge.
6. Let GitHub Pages deploy automatically.

