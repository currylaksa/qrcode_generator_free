import { generateQrSvg } from "./qr.js";

// Thin DOM glue: wire the Generate button to render a QR Code into the preview.
// doc and qrLib are injected so this runs in the browser (document, window.QRCode)
// and in tests (happy-dom document, the `qrcode` npm module).
export function initApp(doc, qrLib) {
  const input = doc.querySelector("#url");
  const button = doc.querySelector("#generate");
  const preview = doc.querySelector("#preview");

  button.addEventListener("click", async () => {
    const svg = await generateQrSvg(qrLib, input.value);
    preview.innerHTML = svg;
  });
}
