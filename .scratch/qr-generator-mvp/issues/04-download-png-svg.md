# Download QR Code as PNG and SVG

Status: ready-for-agent

## What to build

Let the user save the currently-displayed QR Code. Provide a "Download PNG" action (universal compatibility) and a "Download SVG" action (vector, scalable for print). Both produce a file of the QR Code currently on screen.

## Acceptance criteria

- [ ] A "Download PNG" control saves a PNG of the current QR Code
- [ ] A "Download SVG" control saves an SVG of the current QR Code
- [ ] The downloaded PNG and SVG both scan correctly and resolve to the encoded URL
- [ ] Downloaded files have sensible filenames
- [ ] Download controls are unavailable/disabled until a QR Code has been generated

## Blocked by

- #1 Walking skeleton: URL → QR Code on screen
