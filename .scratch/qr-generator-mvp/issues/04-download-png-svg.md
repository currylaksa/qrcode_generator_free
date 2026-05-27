# Download QR Code as PNG and SVG

Status: done

## What to build

Let the user save the currently-displayed QR Code. Provide a "Download PNG" action (universal compatibility) and a "Download SVG" action (vector, scalable for print). Both produce a file of the QR Code currently on screen.

## Acceptance criteria

- [x] A "Download PNG" control saves a PNG of the current QR Code
- [x] A "Download SVG" control saves an SVG of the current QR Code
- [x] The downloaded PNG and SVG both scan correctly and resolve to the encoded URL
- [x] Downloaded files have sensible filenames
- [x] Download controls are unavailable/disabled until a QR Code has been generated

Verified in-browser: PNG (1023×1023 true PNG) and SVG both decoded back to `https://example.com`; filenames `qr-example-com.png`/`.svg`; buttons disabled on load and re-disabled on invalid input. PNG rendered from the QR module grid on a canvas (qrcode-generator's own data URL is GIF, not PNG).

## Blocked by

- #1 Walking skeleton: URL → QR Code on screen
