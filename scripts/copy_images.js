#!/usr/bin/env node
// Copy assets/genspark_images/ → dist/genspark_images/
// (and also into Parcel's served path during dev)

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'assets', 'genspark_images');
const DESTS = [
  path.join(__dirname, '..', 'dist', 'genspark_images'),
];

if (!fs.existsSync(SRC)) {
  console.warn('source missing:', SRC);
  process.exit(0);
}

for (const dest of DESTS) {
  fs.mkdirSync(dest, { recursive: true });
  let n = 0;
  for (const f of fs.readdirSync(SRC)) {
    fs.copyFileSync(path.join(SRC, f), path.join(dest, f));
    n++;
  }
  console.log(`✓ copied ${n} files → ${path.relative(process.cwd(), dest)}`);
}
