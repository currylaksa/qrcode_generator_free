# QR Code Generator

A client-side web app that turns a URL into a scannable QR code, entirely in the user's browser. Free, ad-free, and hosted as a static site.

## Language

**QR Code**:
The scannable two-dimensional barcode the app *generates on demand* from a user-supplied URL. Always refers to the generated output, never the Support QR.
_Avoid_: barcode, code image

**Support QR**:
A *fixed, pre-supplied* image of the maintainer's bank/payment QR, committed to the repo as a static asset and merely *displayed* in a quiet "Support this free tool" footer section. The app never generates it. Contrast with **QR Code**, which is generated from input.
_Avoid_: donate code, tip code, bank QR (use "Support QR")

**URL**:
The web address the user enters as input, which gets encoded into a QR Code. The app accepts bare domains (e.g. `example.com`) and normalizes them to a full `https://` address before encoding; clearly invalid input is rejected.
_Avoid_: link, address, web link

**Normalization**:
The lenient cleanup the app applies to user input before encoding — most notably prepending `https://` to a bare domain. Distinct from rejection: normalization fixes salvageable input, rejection refuses unsalvageable input.
_Avoid_: sanitization, validation (validation is the accept/reject decision; normalization is the fix-up)
