// Resize an SVG QR Code to a target pixel size by overriding the root
// width/height attributes only. The viewBox and preserveAspectRatio are left
// intact, so the QR scales crisply without distortion. Inner <rect> modules
// (which have their own width/height) are untouched — we edit only the opening
// <svg ...> tag.
export function sizedSvg(svg, px) {
  const end = svg.indexOf(">") + 1;
  const open = svg
    .slice(0, end)
    .replace(/width="[^"]*"/, `width="${px}px"`)
    .replace(/height="[^"]*"/, `height="${px}px"`);
  return open + svg.slice(end);
}
