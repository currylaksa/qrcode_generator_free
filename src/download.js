// Pure helpers for downloading a QR Code as PNG/SVG.
// Canvas rendering and the actual file-save trigger live in app.js (browser
// glue); these functions are the testable core.

// A sensible download filename derived from the encoded URL's hostname,
// e.g. "https://example.com" -> "qr-example-com.png". Falls back to "qr-code".
export function qrFilename(url, ext) {
  let host = "";
  try {
    host = new URL(url).hostname;
  } catch {
    host = "";
  }
  const slug = host.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
  return `qr-${slug || "code"}.${ext}`;
}

// The QR module grid: { count, dark } where dark[row][col] is true for a
// dark module. The single source of truth both the SVG and the PNG canvas
// render from, so they provably encode the same data.
export function qrMatrix(qrLib, url) {
  const qr = qrLib(0, "M");
  qr.addData(url);
  qr.make();
  const count = qr.getModuleCount();
  const dark = [];
  for (let row = 0; row < count; row++) {
    dark.push([]);
    for (let col = 0; col < count; col++) {
      dark[row].push(qr.isDark(row, col));
    }
  }
  return { count, dark };
}
