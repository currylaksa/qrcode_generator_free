import { generateQrSvg } from "./qr.js";
import { normalizeUrl } from "./normalize.js";

// Thin DOM glue: wire the Generate button to render a QR Code into the preview.
// doc and qrLib are injected so this runs in the browser (document, window.qrcode)
// and in tests (happy-dom document, the `qrcode-generator` npm module).
export function initApp(doc, qrLib) {
  const input = doc.querySelector("#url");
  const button = doc.querySelector("#generate");
  const error = doc.querySelector("#error");
  const preview = doc.querySelector("#preview");

  button.addEventListener("click", async () => {
    const result = normalizeUrl(input.value);
    if (!result.ok) {
      error.textContent = result.message;
      preview.innerHTML = "";
      return;
    }
    error.textContent = "";
    preview.innerHTML = await generateQrSvg(qrLib, result.url);
  });
}
