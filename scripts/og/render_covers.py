#!/usr/bin/env python3
"""Render link-preview cover images for every version x lang in og.config.json.

Output: assets/genspark_images/og/og_v{ver}_{lang}.jpg  (1200x630 JPEG)
The 1280x720 cover render is scaled to 1120x630 and centred on a #0B0B0C
canvas (no cropping).  Requires python3 + Pillow and Google Chrome (macOS).
"""
import json, os, re, subprocess, sys, tempfile
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT = ROOT / "assets" / "genspark_images" / "og"
BG = (0x0B, 0x0B, 0x0C)

cfg = json.loads((ROOT / "og.config.json").read_text(encoding="utf-8"))
head = (ROOT / "src/v2/head.txt").read_text(encoding="utf-8")
css = (ROOT / "src/v2/v2css.txt").read_text(encoding="utf-8")
base = f'<base href="file://{ROOT}/assets/">'

OUT.mkdir(parents=True, exist_ok=True)
tmpdir = Path(tempfile.mkdtemp(prefix="og_"))

for ver, v in cfg["versions"].items():
    for lang, rel in v["cover"].items():
        html = (ROOT / rel).read_text(encoding="utf-8")
        if v.get("v2head"):
            html = html.replace("<!--V2HEAD-->", f"{base}{head}<style>{css}</style>")
            html = re.sub(r"\{\{ref:p\d+\}\}", "P.00", html)
        elif "<head>" in html:
            html = html.replace("<head>", f"<head>{base}", 1)
        else:
            html = base + html
        src = tmpdir / f"v{ver}_{lang}.html"
        png = tmpdir / f"v{ver}_{lang}.png"
        src.write_text(html, encoding="utf-8")
        subprocess.run(
            [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
             "--allow-file-access-from-files", "--window-size=1280,720",
             "--virtual-time-budget=6000", f"--screenshot={png}", f"file://{src}"],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=90)
        im = Image.open(png).convert("RGB")
        im = im.crop((0, 0, 1280, 720)) if im.size != (1280, 720) else im
        im = im.resize((1120, 630), Image.LANCZOS)
        canvas = Image.new("RGB", (1200, 630), BG)
        canvas.paste(im, (40, 0))
        dest = OUT / f"og_v{ver}_{lang}.jpg"
        canvas.save(dest, "JPEG", quality=88, optimize=True)
        print(f"ok  {dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB")
