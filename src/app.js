import { generateQrSvg } from "./qr.js";
import { normalizeUrl } from "./normalize.js";
import { qrFilename, qrMatrix } from "./download.js";

const PNG_TARGET_PX = 1024; // crisp output, larger than the on-screen preview
const QUIET_ZONE = 4; // modules of white border, per the QR spec

// Thin DOM glue: wire Generate + the download buttons.
// doc and qrLib are injected so this runs in the browser (document, window.qrcode)
// and in tests (happy-dom document, the `qrcode-generator` npm module).
export function initApp(doc, qrLib) {
  const input = doc.querySelector("#url");
  const button = doc.querySelector("#generate");
  const error = doc.querySelector("#error");
  const preview = doc.querySelector("#preview");
  const downloadPng = doc.querySelector("#download-png");
  const downloadSvg = doc.querySelector("#download-svg");

  // The URL currently shown as a QR, or null when there's nothing to download.
  let current = null;

  function setDownloadsEnabled(enabled) {
    downloadPng.disabled = !enabled;
    downloadSvg.disabled = !enabled;
  }

  button.addEventListener("click", async () => {
    const result = normalizeUrl(input.value);
    if (!result.ok) {
      error.textContent = result.message;
      preview.innerHTML = "";
      current = null;
      setDownloadsEnabled(false);
      return;
    }
    error.textContent = "";
    current = result.url;
    preview.innerHTML = await generateQrSvg(qrLib, current);
    setDownloadsEnabled(true);
  });

  downloadSvg.addEventListener("click", async () => {
    if (!current) return;
    const svg = await generateQrSvg(qrLib, current);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    triggerDownload(doc, URL.createObjectURL(blob), qrFilename(current, "svg"), true);
  });

  downloadPng.addEventListener("click", () => {
    if (!current) return;
    const dataUrl = matrixToPngDataUrl(doc, qrMatrix(qrLib, current), PNG_TARGET_PX);
    triggerDownload(doc, dataUrl, qrFilename(current, "png"), false);
  });
}

// Browser-only: paint the QR module grid onto a canvas and export a PNG.
function matrixToPngDataUrl(doc, { count, dark }, targetPx) {
  const total = count + QUIET_ZONE * 2;
  const scale = Math.max(1, Math.floor(targetPx / total));
  const size = total * scale;

  const canvas = doc.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#000000";
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (dark[row][col]) {
        ctx.fillRect(
          (col + QUIET_ZONE) * scale,
          (row + QUIET_ZONE) * scale,
          scale,
          scale,
        );
      }
    }
  }
  return canvas.toDataURL("image/png");
}

// Browser-only: click a temporary <a download> to save the file.
function triggerDownload(doc, href, filename, revoke) {
  const a = doc.createElement("a");
  a.href = href;
  a.download = filename;
  doc.body.appendChild(a);
  a.click();
  a.remove();
  if (revoke) URL.revokeObjectURL(href);
}
