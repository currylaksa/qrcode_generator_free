import { describe, it, expect, beforeEach } from "vitest";
import qrcode from "qrcode-generator";
import { initApp } from "../src/app.js";

function setupDom() {
  document.body.innerHTML = `
    <input id="url" type="text" />
    <button id="generate">Generate</button>
    <div id="preview"></div>
  `;
}

describe("initApp DOM wiring", () => {
  beforeEach(setupDom);

  it("renders an SVG into the preview when Generate is clicked", async () => {
    initApp(document, qrcode);

    document.querySelector("#url").value = "https://example.com";
    document.querySelector("#generate").click();

    // generation is async; wait a tick for the SVG to be injected
    await new Promise((r) => setTimeout(r, 0));

    expect(document.querySelector("#preview svg")).not.toBeNull();
  });
});
