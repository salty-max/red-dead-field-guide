// Regenerates the PWA icons in public/icons from the compass motif. Run: pnpm icons
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const BG = "#231812";
const FG = "#d7ad72";
const compass = '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>';

/** @param glyph fraction of the canvas the 24-unit compass fills; @param radius corner radius as a fraction */
const svg = (glyph, radius) => {
  const size = 512;
  const scale = (size * glyph) / 24;
  const offset = (size - size * glyph) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<rect width="${size}" height="${size}" rx="${size * radius}" fill="${BG}"/>
<g transform="translate(${offset} ${offset}) scale(${scale})" fill="none" stroke="${FG}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${compass}</g>
</svg>`;
};

const out = "public/icons";
await mkdir(out, { recursive: true });
const png = (name, markup, px) => sharp(Buffer.from(markup)).resize(px, px).png().toFile(`${out}/${name}`);

await Promise.all([
  png("icon-192.png", svg(0.62, 0.22), 192),
  png("icon-512.png", svg(0.62, 0.22), 512),
  // Maskable: full-bleed background, glyph inside the 80% safe zone.
  png("maskable-512.png", svg(0.5, 0), 512),
  // iOS rounds the corners itself, so the background must be opaque and square.
  png("apple-touch-icon.png", svg(0.6, 0), 180),
  writeFile(`${out}/favicon.svg`, svg(0.62, 0.22)),
]);
console.log("icons written to", out);
