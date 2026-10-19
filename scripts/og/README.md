# Link-preview (OGP) covers

New version -> add an entry to `og.config.json` -> run `python3 scripts/og/render_covers.py` -> commit -> deploy.

- `og.config.json` is the single source of truth (titles, descriptions, cover source per version/lang).
- `middleware.js` (repo root, Vercel Routing Middleware) rewrites the OGP/Twitter meta of `/` per `?ver=&lang=`.
- Images land in `assets/genspark_images/og/og_v{ver}_{lang}.jpg` and are copied to `dist` by `scripts/copy_images.js`.
- Rendering needs python3 + Pillow and Google Chrome.
