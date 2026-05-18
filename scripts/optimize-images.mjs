// scripts/optimize-images.mjs
// One-off image optimizer for /public/assets/images.
// - Resizes oversized images to a max width
// - Re-encodes PNGs with palette + max compression
// - Re-encodes JPEGs at quality 80
// - Skips files already under the SKIP_BYTES threshold
import sharp from "sharp";
import { readdir, stat, writeFile } from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "..", "public", "assets", "images");

const MAX_WIDTH = 1400;
const SKIP_BYTES = 180_000;

const files = await readdir(DIR);
let savedTotal = 0;

for (const file of files) {
  const fp = path.join(DIR, file);
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const before = (await stat(fp)).size;
  if (before < SKIP_BYTES) {
    console.log(`skip   ${file}  (${(before / 1024).toFixed(0)} KB)`);
    continue;
  }

  let pipeline = sharp(fp).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
  } else {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 80 });
  }

  const buf = await pipeline.toBuffer();
  await writeFile(fp, buf);
  const after = buf.length;
  const saved = before - after;
  savedTotal += saved;
  console.log(
    `optim  ${file}  ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB  (${(
      (saved / before) *
      100
    ).toFixed(0)}% smaller)`
  );
}

console.log(`\nTotal saved: ${(savedTotal / 1024 / 1024).toFixed(2)} MB`);
