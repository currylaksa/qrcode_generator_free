# Support QR footer section

Status: done

## What to build

A quiet "Support this free tool" section in the page footer that displays the Support QR — the maintainer's fixed bank/payment QR, served as a static image asset from the repo (see CONTEXT.md). It is displayed only, never generated. Tone and placement should be honest and unobtrusive, not ad-like.

The agent builds the layout against a clearly-named placeholder image; the maintainer swaps in their real bank QR file afterward. Document where to drop the real image.

## Acceptance criteria

- [x] A footer section labelled to convey optional support for the free tool
- [x] The Support QR is shown as a static local image (the maintainer's real bankQR.JPG)
- [x] The placeholder path / swap-in location is documented (comment in index.html)
- [x] The footer is visually quiet and does not interfere with the generator UI
- [x] No popup, banner, or auto-triggered prompt is used

Uses the real supplied image `./bankQR.JPG` (Touch 'n Go eWallet QR), not a placeholder. Verified in-browser: image loads (1179×1668, shown at 220px), footer sits below the generator with a quiet hairline separator, no dialogs/popups, no failed requests. Note: the image is public (repo + site), exposing the account name — intended for a tip jar.

## Blocked by

- #1 Walking skeleton: URL → QR Code on screen
