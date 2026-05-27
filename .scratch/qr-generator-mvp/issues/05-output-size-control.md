# Output size control

Status: done

## What to build

Let the user choose the output size of the QR Code. A size control (selector or slider) drives the dimensions of the generated QR Code and the downloaded files, with a sensible default selected on load. All other QR parameters (error-correction level, margin, colors) stay at fixed defaults for the MVP.

## Acceptance criteria

- [x] A size control is visible with a sensible default selected
- [x] Changing the size re-renders the on-screen QR Code at the chosen size
- [x] The chosen size is reflected in the downloaded PNG/SVG
- [x] All offered sizes still produce a QR Code that scans correctly

Sizes: 256 / 512 (default) / 1024. Verified in-browser: preview re-renders live on change; PNG and SVG decode back to the URL at every size. Note: PNG pixels are the nearest crisp integer-module multiple at or below the chosen size (e.g. 1024 -> 999) to keep module edges sharp — proportional, not exact pixels.

## Blocked by

- #1 Walking skeleton: URL → QR Code on screen
