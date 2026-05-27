// Turn raw user input into a normalized URL, or reject it.
// Returns { ok: true, url } when the input is a usable web address,
// or { ok: false, message } with a human-readable fix-it message.
// Normalization (prepending https://) and validation (accept/reject) are
// distinct steps — see CONTEXT.md.
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;

export function normalizeUrl(raw) {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return { ok: false, message: "Enter a URL." };
  }

  const candidate = HAS_SCHEME.test(trimmed) ? trimmed : "https://" + trimmed;

  let parsed;
  try {
    parsed = new URL(candidate);
  } catch {
    return { ok: false, message: "That doesn't look like a valid URL." };
  }

  // A real domain has a dot (e.g. example.com), so reject dot-less hosts
  // like "hello" that the URL parser would otherwise accept.
  if (!parsed.hostname.includes(".")) {
    return {
      ok: false,
      message: "Enter a full web address, like example.com",
    };
  }

  return { ok: true, url: candidate };
}
