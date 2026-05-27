# Support QR footer section

Status: ready-for-agent

## What to build

A quiet "Support this free tool" section in the page footer that displays the Support QR — the maintainer's fixed bank/payment QR, served as a static image asset from the repo (see CONTEXT.md). It is displayed only, never generated. Tone and placement should be honest and unobtrusive, not ad-like.

The agent builds the layout against a clearly-named placeholder image; the maintainer swaps in their real bank QR file afterward. Document where to drop the real image.

## Acceptance criteria

- [ ] A footer section labelled to convey optional support for the free tool
- [ ] The Support QR is shown as a static local image (a placeholder until the real one is supplied)
- [ ] The placeholder path / swap-in location is documented (e.g. in README or a comment)
- [ ] The footer is visually quiet and does not interfere with the generator UI
- [ ] No popup, banner, or auto-triggered prompt is used

## Blocked by

- #1 Walking skeleton: URL → QR Code on screen
