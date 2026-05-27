# Output size control

Status: ready-for-agent

## What to build

Let the user choose the output size of the QR Code. A size control (selector or slider) drives the dimensions of the generated QR Code and the downloaded files, with a sensible default selected on load. All other QR parameters (error-correction level, margin, colors) stay at fixed defaults for the MVP.

## Acceptance criteria

- [ ] A size control is visible with a sensible default selected
- [ ] Changing the size re-renders the on-screen QR Code at the chosen size
- [ ] The chosen size is reflected in the downloaded PNG/SVG
- [ ] All offered sizes still produce a QR Code that scans correctly

## Blocked by

- #1 Walking skeleton: URL → QR Code on screen
