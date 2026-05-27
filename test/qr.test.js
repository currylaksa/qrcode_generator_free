import { describe, it, expect } from "vitest";
import qrcode from "qrcode-generator";
import { generateQrSvg } from "../src/qr.js";

describe("generateQrSvg", () => {
  it("returns an SVG string for a valid URL", async () => {
    const svg = await generateQrSvg(qrcode, "https://example.com");
    expect(svg).toContain("<svg");
  });

  it("encodes the input: different URLs produce different SVGs", async () => {
    const a = await generateQrSvg(qrcode, "https://example.com");
    const b = await generateQrSvg(qrcode, "https://different.example/page");
    expect(a).not.toEqual(b);
  });
});
