// scripts/generate-blurs.mjs
// Generates tiny base64 LQIP (low-quality image placeholder) data URIs for
// every project image and the avatar. Prints a JSON map you can paste into
// src/data/projects.ts (blurDataURL field).
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "..", "public", "assets", "images");

const files = (await readdir(DIR))
  .filter((f) => /\.(png|jpe?g)$/i.test(f))
  .sort();

const out = {};
for (const file of files) {
  const fp = path.join(DIR, file);
  const buf = await sharp(fp).resize(16).webp({ quality: 40 }).toBuffer();
  const dataUri = `data:image/webp;base64,${buf.toString("base64")}`;
  out[file] = dataUri;
}

console.log(JSON.stringify(out, null, 2));
