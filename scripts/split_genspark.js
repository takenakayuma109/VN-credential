#!/usr/bin/env node
// Split genspark_source/all_pages.txt into 26 individual full-HTML files.
// Each output file is a complete <!DOCTYPE html>...</html> document
// (so it can be rendered inside an iframe with full CSS isolation).

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'genspark_source', 'all_pages.txt');
const OUT_DIR = path.join(__dirname, '..', 'src', 'genspark_pages');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const raw = fs.readFileSync(SRC, 'utf8');

// Split by ===== PAGE NN: =====
const parts = raw.split(/^===== PAGE (\d+): =====\s*$/m);
// parts: ['', '01', '<page1 html>', '02', '<page2 html>', ...]

let written = 0;
for (let i = 1; i < parts.length; i += 2) {
  const num = parts[i].padStart(2, '0');
  let html = parts[i + 1];
  if (!html) continue;

  // Strip grammarly extension residue
  html = html.replace(/<grammarly-[^>]*>[\s\S]*?<\/grammarly-[^>]*>/gi, '');
  html = html.replace(/\s*data-new-gr-c-s-(?:check-)?loaded="[^"]*"/g, '');
  html = html.replace(/\s*data-gr-ext-installed=""/g, '');
  // Strip script tags for safety
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Trim leading/trailing whitespace
  html = html.trim();

  const outFile = path.join(OUT_DIR, `page${num}.html`);
  fs.writeFileSync(outFile, html, 'utf8');
  written++;
  console.log(`✓ ${outFile}  (${html.length} bytes)`);
}

console.log(`\nWrote ${written} pages.`);
