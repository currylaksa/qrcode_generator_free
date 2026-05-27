import { describe, it, expect, beforeEach } from "vitest";
import qrcode from "qrcode-generator";
import { initApp } from "../src/app.js";

// Minimal DOM that includes the generator elements initApp expects plus the
// support modal markup.
function setupDom() {
  document.body.innerHTML = `
    <input id="url" /><button id="generate"></button>
    <select id="size"><option value="512" selected>512</option></select>
    <p id="error"></p><div id="preview"></div>
    <button id="download-png" disabled></button>
    <button id="download-svg" disabled></button>
    <button id="support-open">Support</button>
    <dialog id="support-dialog">
      <button id="support-close">x</button>
      <img id="support-qr" data-src="./bankQR.JPG" alt="" />
    </dialog>
  `;
}

describe("support modal", () => {
  beforeEach(setupDom);

  it("is closed until the support trigger is clicked", () => {
    initApp(document, qrcode);
    const dialog = document.querySelector("#support-dialog");
    expect(dialog.open).toBe(false);

    document.querySelector("#support-open").click();
    expect(dialog.open).toBe(true);
  });

  it("does not load the QR image until the dialog is opened", () => {
    initApp(document, qrcode);
    const img = document.querySelector("#support-qr");
    // No src on load → the browser never fetches bankQR.JPG up front.
    expect(img.getAttribute("src")).toBeNull();

    document.querySelector("#support-open").click();
    expect(img.getAttribute("src")).toBe("./bankQR.JPG");
  });

  it("closes when the close button is clicked", () => {
    initApp(document, qrcode);
    const dialog = document.querySelector("#support-dialog");

    document.querySelector("#support-open").click();
    expect(dialog.open).toBe(true);

    document.querySelector("#support-close").click();
    expect(dialog.open).toBe(false);
  });
});
