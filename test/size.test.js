import { describe, it, expect } from "vitest";
import qrcode from "qrcode-generator";
import { generateQrSvg } from "../src/qr.js";
import { sizedSvg } from "../src/size.js";

describe("sizedSvg", () => {
  it("sets the root width/height to the chosen size, preserving viewBox", async () => {
    const svg = await generateQrSvg(qrcode, "https://example.com");
    const sized = sizedSvg(svg, 512);

    const openTag = sized.slice(0, sized.indexOf(">") + 1);
    expect(openTag).toContain('width="512px"');
    expect(openTag).toContain('height="512px"');
    // viewBox is untouched so the QR scales without distortion
    expect(sized).toMatch(/viewBox="0 0 \d+ \d+"/);
  });

  it("does not corrupt the inner module rectangles", async () => {
    const svg = await generateQrSvg(qrcode, "https://example.com");
    const rectCountBefore = (svg.match(/<rect/g) || []).length;
    const rectCountAfter = (sizedSvg(svg, 1024).match(/<rect/g) || []).length;
    expect(rectCountAfter).toBe(rectCountBefore);
  });
});
