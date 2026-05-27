import { describe, it, expect } from "vitest";
import { normalizeUrl } from "../src/normalize.js";

describe("normalizeUrl", () => {
  it("prepends https:// to a bare domain", () => {
    expect(normalizeUrl("example.com")).toEqual({
      ok: true,
      url: "https://example.com",
    });
  });

  it("leaves an already-schemed URL unchanged", () => {
    expect(normalizeUrl("https://foo.com/bar")).toEqual({
      ok: true,
      url: "https://foo.com/bar",
    });
    expect(normalizeUrl("http://foo.com")).toEqual({
      ok: true,
      url: "http://foo.com",
    });
  });

  it("rejects empty or whitespace-only input with a message", () => {
    for (const raw of ["", "   "]) {
      const result = normalizeUrl(raw);
      expect(result.ok).toBe(false);
      expect(result.message).toBeTruthy();
      expect(result.url).toBeUndefined();
    }
  });

  it("rejects a dot-less word that is not a domain", () => {
    const result = normalizeUrl("hello");
    expect(result.ok).toBe(false);
    expect(result.message).toBeTruthy();
  });
});
