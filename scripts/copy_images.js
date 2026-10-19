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
  const copyDir = (from, to) => {
    fs.mkdirSync(to, { recursive: true });
    for (const e of fs.readdirSync(from, { withFileTypes: true })) {
      if (e.isDirectory()) copyDir(path.join(from, e.name), path.join(to, e.name));
      else { fs.copyFileSync(path.join(from, e.name), path.join(to, e.name)); n++; }
    }
  };
  copyDir(SRC, dest);
  console.log(`✓ copied ${n} files → ${path.relative(process.cwd(), dest)}`);
}
