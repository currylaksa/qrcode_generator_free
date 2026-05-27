// Deep module: turn a URL into an SVG QR Code.
// The QR library is injected (qrLib) so the same code runs in the browser
// (the vendored qrcode-generator script's global `qrcode`) and in tests (the
// `qrcode-generator` npm module). See ADR-0001: everything runs client-side.
//
// MVP defaults (see CONTEXT.md / grill): error-correction level "M", auto type.
export function generateQrSvg(qrLib, url) {
  const qr = qrLib(0, "M"); // type number 0 = auto-size to fit the data
  qr.addData(url);
  qr.make();
  return qr.createSvgTag();
}
