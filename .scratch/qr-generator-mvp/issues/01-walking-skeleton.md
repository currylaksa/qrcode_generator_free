# Walking skeleton: URL → QR Code on screen

Status: ready-for-agent

## What to build

The end-to-end backbone of the app as a single static page. A user types a full URL into an input, presses Generate, and sees a scannable QR Code rendered on screen as SVG. Everything runs client-side with no backend (see ADR-0001).

The `qrcode` browser build must be vendored as a local file in the repo — no CDN — so the page is fully self-contained and works offline.

Scope is deliberately minimal: assume a well-formed `https://…` URL (normalization and validation come in a later slice), no download, no size control, no styling beyond what's needed to see it works.

## Acceptance criteria

- [ ] Opening `index.html` in a browser shows a URL input and a Generate button
- [ ] The `qrcode` library is vendored as a local file (not loaded from a CDN)
- [ ] Entering a full URL and pressing Generate renders the QR Code as on-screen SVG
- [ ] The rendered QR Code scans correctly with a phone camera and resolves to the entered URL
- [ ] No network requests are made when generating a QR Code
- [ ] All asset references are relative paths (`./…`), in preparation for subpath hosting

## Blocked by

- None - can start immediately
