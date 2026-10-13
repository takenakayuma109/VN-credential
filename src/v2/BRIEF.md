# VISIONOID Credential v2 — Design Brief

## Concept: "SPECTACLE / PRECISION"
New York creative-agency boldness (ref: mischiefusa.com — near-black canvas, giant extended
uppercase type, one hot accent, full-bleed photography) fused with engineering-document rigor
(mono metadata, hairline rules, spec tables, registration marks "+"). VISIONOID is NOT an
entertainment-only company: disaster-prevention for municipalities and zero-error industrial
inspection are delivered at the same level and scale. Public-safety / industrial pages must look
exactly as bold and premium as the entertainment pages — never "smaller" or "plainer".
- Ink pages (`.slide`) = spectacle. Paper pages (`.slide paper`) = precision. Use paper for data-
  heavy / institutional pages (market, finance, company info, values …) to create rhythm.
- One accent only: `--signal` (safety orange #FF4A1C). Use it sparingly: 1–3 touches per page.
- Big numbers are the hero typography (`.fig`). Big photos everywhere (full-bleed or half-bleed).

## Hard rules (QA-checked — a page is not done until `node scripts/v2/qa.js pNN` prints OK)
1. Canvas 1280×720 fixed. Nothing outside it, no clipped text.
2. **Minimum font-size 15px** for every visible character (incl. captions, labels, sources).
   Body text 18–20px. Make text as large as the space allows.
3. **Page title = plain noun naming what the page is** (e.g. 「ドローンショー事業」「基本情報」).
   Never a slogan / intent sentence as the title (NG:「日本のエンタメを次のステージへ導く…」).
   Use the exact title given in the page spec below.
4. **No duplicated expressions**: inside a page, never say the same thing twice (e.g. JP heading +
   EN translation of it + summary repeating it). Across the deck, do not repeat slogans
   (「エンタメで鍛えた技術を社会に実装する」 appears ONLY on the cover). No "— English subtitle"
   restating the JP title. Remove filler/footer slogans.
5. Photos large. Prefer ≥ 40% of the slide area to be photography on case pages. `object-fit:cover`.
6. Content = v1 content (facts, numbers, names must stay accurate). You may cut repetition and
   tighten wording, but do not invent facts.
7. Keep CONFIDENTIAL notes that exist in v1 (e.g. TDS: 社内実績掲載のみ可 / 非公開 marks).

## File format (every page)
```html
<!DOCTYPE html>
<html lang="ja"><head><meta charset="utf-8"><title>…</title><!--V2HEAD-->
<style> /* page-specific CSS only; reuse design-system classes */ </style></head>
<body><div class="slide [paper]">
  <header class="hd [on-photo]"><span class="wm">VISIONOID<i>.</i></span><span>01 / Entertainment</span><span class="pg">07 / 26</span></header>
  … absolutely-positioned layout …
</div></body></html>
```
- `<!--V2HEAD-->` is replaced at runtime with fonts + `src/v2/v2css.txt` (design system). Read
  that CSS file first and use its classes: `.title(.xl/.l/.m/.s) .kicker .xl .fig .lead .body .sm
  .lbl .en .sig .bar .tag(.solid) .chip .rule .row/.n .spec .ph(.cap) .scrim-b/-t/-l .reg .mono-img`.
- Page number MUST be written literally as `NN / 26` inside `.pg` (the app rewrites it).
- Header middle label = section, e.g. `About`, `01 / Entertainment`, `02 / Public Safety`,
  `03 / Industrial`, `04 / Advertising`, `05 / Education`, `06 / IP × R&D`, `Market`,
  `Mission`, `Finance`, `Company`.
- Images: `<img src="genspark_images/FILE">` (local, see contact sheet
  `scripts/v2/contact_sheet.jpg`). Wrap each photo in `<div class="ph" data-object-type="image"
  id="v2pNN-img-x">` so edit mode can swap it.
- Use `.hd.on-photo` + `.scrim-t` when the header sits on a photo.
- Fonts: JP = Zen Kaku Gothic New (400/500/700/900); Latin display = Archivo expanded via `.xl`/
  `.fig`/`.en`; labels = JetBrains Mono via `.lbl`/`.kicker`.
- No Font Awesome, no emoji icons, no rounded "card with shadow" UI, no gradients-as-decoration
  except photo scrims. No pastel colors. Hairlines, grids, big type, big photos.

Reference pages (study them before starting): `src/v2/pages/p01.txt`, `p02.txt` and their
renders in `scripts/v2/out/p01.png`, `p02.png`.

## QA loop
`node scripts/v2/qa.js p07 p08` → writes `scripts/v2/out/pNN.png` and prints issues.
Open the PNG (Read tool) and check visually: alignment, balance, nothing cramped, text legible on
photos. Iterate until OK and it looks like a top creative agency made it.
