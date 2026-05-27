import { generateQrSvg } from "./qr.js";
import { normalizeUrl } from "./normalize.js";
import { qrFilename, qrMatrix } from "./download.js";
import { sizedSvg } from "./size.js";

const QUIET_ZONE = 4; // modules of white border, per the QR spec

// Thin DOM glue: wire Generate, the size control, and the download buttons.
// doc and qrLib are injected so this runs in the browser (document, window.qrcode)
// and in tests (happy-dom document, the `qrcode-generator` npm module).
export function initApp(doc, qrLib) {
  const input = doc.querySelector("#url");
  const button = doc.querySelector("#generate");
  const size = doc.querySelector("#size");
  const error = doc.querySelector("#error");
  const preview = doc.querySelector("#preview");
  const downloadPng = doc.querySelector("#download-png");
  const downloadSvg = doc.querySelector("#download-svg");

  // The URL currently shown as a QR, or null when there's nothing to download.
  let current = null;

  const currentSize = () => Number(size.value);

  function setDownloadsEnabled(enabled) {
    downloadPng.disabled = !enabled;
    downloadSvg.disabled = !enabled;
  }

  // Render the current URL into the preview at the chosen size.
  async function showQr(url) {
    const svg = await generateQrSvg(qrLib, url);
    preview.innerHTML = sizedSvg(svg, currentSize());
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
    await showQr(current);
    setDownloadsEnabled(true);
  });

  // Changing the size re-renders the QR already on screen.
  size.addEventListener("change", async () => {
    if (current) await showQr(current);
  });

  downloadSvg.addEventListener("click", async () => {
    if (!current) return;
    const svg = sizedSvg(await generateQrSvg(qrLib, current), currentSize());
    const blob = new Blob([svg], { type: "image/svg+xml" });
    triggerDownload(doc, URL.createObjectURL(blob), qrFilename(current, "svg"), true);
  });

  downloadPng.addEventListener("click", () => {
    if (!current) return;
    const dataUrl = matrixToPngDataUrl(doc, qrMatrix(qrLib, current), currentSize());
    triggerDownload(doc, dataUrl, qrFilename(current, "png"), false);
  });

  wireSupportModal(doc);
}

// The Support QR (tip jar) stays hidden until the visitor opens this dialog.
// Guarded so the app still initialises if the markup is absent.
function wireSupportModal(doc) {
  const dialog = doc.querySelector("#support-dialog");
  const open = doc.querySelector("#support-open");
  const close = doc.querySelector("#support-close");
  if (!dialog || !open) return;

  open.addEventListener("click", () => dialog.showModal());
  if (close) close.addEventListener("click", () => dialog.close());
  // Click on the backdrop (outside the modal content) closes it.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
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
