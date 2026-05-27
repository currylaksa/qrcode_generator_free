import { describe, it, expect } from "vitest";
import qrcode from "qrcode-generator";
import { qrFilename, qrMatrix } from "../src/download.js";

describe("qrFilename", () => {
  it("slugs the hostname into a filename", () => {
    expect(qrFilename("https://example.com", "png")).toBe("qr-example-com.png");
  });

  it("ignores path/query and supports any extension", () => {
    expect(qrFilename("https://sub.site.io/path?q=1", "svg")).toBe(
      "qr-sub-site-io.svg",
    );
  });
});

describe("qrMatrix", () => {
  it("returns a square grid of dark modules", () => {
    const { count, dark } = qrMatrix(qrcode, "https://example.com");
    expect(count).toBeGreaterThan(0);
    expect(dark).toHaveLength(count);
    expect(dark.every((row) => row.length === count)).toBe(true);
    expect(dark.flat().some((d) => d === true)).toBe(true);
  });

  it("encodes the input: different URLs produce different grids", () => {
    const a = qrMatrix(qrcode, "https://example.com");
    const b = qrMatrix(qrcode, "https://different.example/page");
    expect(a.dark).not.toEqual(b.dark);
  });
});
