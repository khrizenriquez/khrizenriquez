# AI Update Workflow

Use this workflow for future AI-assisted portfolio updates.

1. Create a short branch from `main`.
2. Describe the update in terms of outcome, not implementation details.
3. Ask the agent to inspect the current content and components before editing.
4. Update Markdown first when changing projects or text.
5. Add or replace project assets under `public/projects/<slug>/`.
6. Run the build and visual checks.
7. Open a small PR to `main`.
8. Merge after review; GitHub Actions handles deploy.

Prefer content edits over component changes unless the requested update changes the portfolio's behavior or visual system.

