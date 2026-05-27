# Deploy skeleton to GitHub Pages

Status: ready-for-agent

## What to build

Get the walking skeleton live on GitHub Pages as a project page, served from the `main` branch root, at `https://<username>.github.io/qrcode_generator_free/`. This is intentionally done early to flush out the relative-asset-path gotcha that only appears when the site is served from a subpath rather than the root.

HITL: requires the maintainer in the GitHub UI to create the repo, push, and enable Pages.

## Acceptance criteria

- [ ] The repo exists on GitHub and the skeleton is pushed to `main`
- [ ] GitHub Pages is enabled, source = `main` branch, root (not `/docs`, which holds project docs)
- [ ] The live site loads at the project-page subpath URL
- [ ] The vendored QR library and all assets load correctly from the subpath (no 404s — confirms relative paths)
- [ ] Generating a QR Code works on the live site exactly as it does locally

## Blocked by

- #1 Walking skeleton: URL → QR Code on screen
