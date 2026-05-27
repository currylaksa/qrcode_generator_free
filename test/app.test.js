import { describe, it, expect, beforeEach } from "vitest";
import qrcode from "qrcode-generator";
import { initApp } from "../src/app.js";

function setupDom() {
  document.body.innerHTML = `
    <input id="url" type="text" />
    <button id="generate">Generate</button>
    <p id="error"></p>
    <div id="preview"></div>
  `;
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
});
