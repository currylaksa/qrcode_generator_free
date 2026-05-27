# Lenient input: normalization + validation

Status: done

## What to build

Make the input forgiving but safe. Bare domains the user types (e.g. `example.com`) are normalized to a full `https://example.com` address before encoding. Clearly-invalid input (e.g. random text that is not a URL) is rejected with a helpful, human-readable message instead of producing a meaningless QR Code.

Normalization (fixing salvageable input) and validation (the accept/reject decision) are distinct steps — see CONTEXT.md.

## Acceptance criteria

- [x] Entering a bare domain (`example.com`) produces a QR Code encoding `https://example.com`
- [x] An input that already has a scheme is left unchanged
- [x] Clearly-invalid input is rejected with a clear inline message, and no QR Code is generated
- [x] The QR Code is only generated from the normalized URL, never the raw input
- [x] Rejection messaging tells the user what to fix

Verified in-browser: `example.com` → decoded `https://example.com`; `http://foo.com` unchanged; `hello`/empty/whitespace rejected with messages and no QR; error clears on the next valid input.

## Blocked by

- #1 Walking skeleton: URL → QR Code on screen
