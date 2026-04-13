#!/usr/bin/env node
// Replace remote Genspark image URLs in src/genspark_pages/*.html
// with relative paths under genspark_images/.
// Also copies the asset folder to src/genspark_pages/genspark_images for build.

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'src', 'genspark_pages');
const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'genspark_images');

// Build inventory of available local files (basename → relative path)
const have = new Set(fs.readdirSync(ASSETS_DIR));

// Map a remote URL to its expected local filename
function localName(url) {
  // genspark.ai/api/files/s/XXX → XXX.png (matches what was downloaded)
  let m = url.match(/genspark\.ai\/api\/files\/s\/([\w-]+)/);
  if (m) {
    const id = m[1];
    if (have.has(id + '.png')) return id + '.png';
    if (have.has(id + '.jpg')) return id + '.jpg';
    if (have.has(id + '.jpeg')) return id + '.jpeg';
    if (have.has(id + '.webp')) return id + '.webp';
    return null;
  }
  // page.gensparksite.com/slides_images/HASH.webp → HASH.webp
  m = url.match(/gensparksite\.com\/slides_images\/([\w-]+\.\w+)/);
  if (m && have.has(m[1])) return m[1];
  return null;
}

const files = fs.readdirSync(PAGES_DIR).filter((f) => /^page\d+\.html$/.test(f));
let totalReplaced = 0;
let totalMissing = 0;
const missing = new Set();

files.forEach((file) => {
  const p = path.join(PAGES_DIR, file);
  let html = fs.readFileSync(p, 'utf8');

  // Find all genspark URLs
  const urlRe = /https?:\/\/(?:www\.genspark\.ai\/api\/files\/s\/[\w-]+|page\.gensparksite\.com\/slides_images\/[\w-]+\.\w+)/g;
  const urls = html.match(urlRe) || [];
  let pageReplaced = 0;
  for (const url of urls) {
    const name = localName(url);
    if (!name) {
      missing.add(url);
      totalMissing++;
      continue;
    }
    // Replace ALL occurrences of this exact URL with the local path
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(escaped, 'g'), `genspark_images/${name}`);
    pageReplaced++;
  }
  fs.writeFileSync(p, html, 'utf8');
  console.log(`✓ ${file}: replaced ${pageReplaced} URLs`);
  totalReplaced += pageReplaced;
});

console.log(`\nReplaced ${totalReplaced} URLs across ${files.length} pages.`);
if (totalMissing) {
  console.log(`\n⚠ ${totalMissing} URLs without local file:`);
  [...missing].slice(0, 20).forEach((u) => console.log('  ' + u));
}
