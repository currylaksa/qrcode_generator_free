# PNG export is rendered from the QR module grid onto a canvas

The `qrcode-generator` library's `createDataURL()` produces a **GIF**, not a PNG, so we don't use it for the "Download PNG" feature. Instead we read the QR module grid (`getModuleCount()` / `isDark()`) and paint it onto a `<canvas>`, then call `canvas.toDataURL("image/png")`.

## Considered Options

- **Canvas from the module grid (chosen)** — full control over a true PNG: integer-module scaling for crisp edges, a 4-module quiet zone, and a chosen output size.
- **`library.createDataURL()` (rejected)** — one call, but the output is `image/gif`, which doesn't meet the PNG requirement (slice #4 / the grill chose PNG specifically for universal compatibility).
- **Rasterising the on-screen SVG to canvas (rejected)** — works, but is async (`Image.onload`) and depends on SVG render fidelity; the module grid is synchronous and deterministic.

## Consequences

- The QR module grid (`qrMatrix`) is the single source of truth both the SVG and the PNG render from, so they provably encode the same data.
- PNG dimensions snap to the nearest integer-module multiple at or below the chosen size (e.g. 1024 → ~999px) to keep edges sharp — proportional, not exact pixels.
- Do not "simplify" the PNG path back to `createDataURL()`: it silently changes the format to GIF and breaks the requirement.
