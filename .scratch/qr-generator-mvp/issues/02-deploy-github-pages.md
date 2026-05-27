# Deploy skeleton to GitHub Pages

Status: done

## What to build

Get the walking skeleton live on GitHub Pages as a project page, served from the `main` branch root, at `https://<username>.github.io/qrcode_generator_free/`. This is intentionally done early to flush out the relative-asset-path gotcha that only appears when the site is served from a subpath rather than the root.

HITL: requires the maintainer in the GitHub UI to create the repo, push, and enable Pages.

## Acceptance criteria

- [x] The repo exists on GitHub and the skeleton is pushed to `main`
- [x] GitHub Pages is enabled, source = `main` branch, root (not `/docs`, which holds project docs)
- [x] The live site loads at the project-page subpath URL
- [x] The vendored QR library and all assets load correctly from the subpath (no 404s — confirms relative paths)
- [x] Generating a QR Code works on the live site exactly as it does locally

Verified live at https://currylaksa.github.io/qrcode_generator_free/ — generated QR decoded back to the exact input URL; zero network requests during generation; no console/page errors.

## Blocked by

- #1 Walking skeleton: URL → QR Code on screen
