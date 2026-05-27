# Client-side only, no backend

QR Codes are generated entirely in the browser from the user's URL; there is no server component. We chose this over a server-side generator because it is what allows the app to be hosted free on GitHub Pages and gives a privacy property for free — the URLs people encode never leave their own device.

## Considered Options

- **Client-side generation (chosen)** — a vendored JS library produces the QR Code in-browser. Static files only.
- **Server-side generation (rejected)** — a backend renders QR images. Rejected because it cannot run on GitHub Pages, requires paid hosting (undercutting the free/no-ads goal), and would route user URLs through a server we'd have to be trusted with.

## Consequences

- Hosting stays free and static (GitHub Pages); no server to operate, secure, or pay for.
- User input never leaves the browser — a deliberate privacy guarantee, not an accident.
- Any future feature that genuinely needs a server (e.g. analytics, link shortening, accounts) breaks all three benefits and must reopen this decision rather than quietly bolting on an endpoint.
