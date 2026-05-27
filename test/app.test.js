import { describe, it, expect, beforeEach } from "vitest";
import qrcode from "qrcode-generator";
import { initApp } from "../src/app.js";

function setupDom() {
  document.body.innerHTML = `
    <input id="url" type="text" />
    <button id="generate">Generate</button>
    <select id="size">
      <option value="256">Small</option>
      <option value="512" selected>Medium</option>
      <option value="1024">Large</option>
    </select>
    <p id="error"></p>
    <div id="preview"></div>
    <button id="download-png" disabled>Download PNG</button>
    <button id="download-svg" disabled>Download SVG</button>
  `;
}

function previewWidth() {
  const svg = document.querySelector("#preview svg");
  return svg && svg.getAttribute("width");
}

function changeSize(value) {
  const select = document.querySelector("#size");
  select.value = value;
  select.dispatchEvent(new Event("change"));
  return new Promise((r) => setTimeout(r, 0));
}

function downloadsDisabled() {
  return (
    document.querySelector("#download-png").disabled &&
    document.querySelector("#download-svg").disabled
  );
}

function clickGenerate(value) {
  document.querySelector("#url").value = value;
  document.querySelector("#generate").click();
  // generation is async; wait a tick for the DOM to update
  return new Promise((r) => setTimeout(r, 0));
}

describe("initApp DOM wiring", () => {
  beforeEach(setupDom);

  it("renders an SVG into the preview when Generate is clicked", async () => {
    initApp(document, qrcode);
    await clickGenerate("https://example.com");
    expect(document.querySelector("#preview svg")).not.toBeNull();
  });

  it("shows a message and renders no QR for invalid input", async () => {
    initApp(document, qrcode);
    await clickGenerate("hello");

    expect(document.querySelector("#preview svg")).toBeNull();
    expect(document.querySelector("#error").textContent).toBeTruthy();
  });

  it("renders a QR for a bare domain and clears any prior error", async () => {
    initApp(document, qrcode);

    await clickGenerate("hello"); // sets an error first
    await clickGenerate("example.com");

    expect(document.querySelector("#preview svg")).not.toBeNull();
    expect(document.querySelector("#error").textContent).toBe("");
  });

  it("keeps downloads disabled until a QR is generated", async () => {
    initApp(document, qrcode);
    expect(downloadsDisabled()).toBe(true);

    await clickGenerate("example.com");
    expect(downloadsDisabled()).toBe(false);
  });

  it("re-disables downloads when input becomes invalid", async () => {
    initApp(document, qrcode);

    await clickGenerate("example.com");
    expect(downloadsDisabled()).toBe(false);

    await clickGenerate("hello");
    expect(downloadsDisabled()).toBe(true);
  });

  it("renders the preview at the default selected size", async () => {
    initApp(document, qrcode);
    await clickGenerate("example.com");
    expect(previewWidth()).toBe("512px");
  });

  it("re-renders at the new size when the size control changes", async () => {
    initApp(document, qrcode);
    await clickGenerate("example.com");
    expect(previewWidth()).toBe("512px");

    await changeSize("1024");
    expect(previewWidth()).toBe("1024px");
  });

  it("ignores a size change when there is no QR yet", async () => {
    initApp(document, qrcode);
    await changeSize("1024");
    expect(document.querySelector("#preview svg")).toBeNull();
  });
});
