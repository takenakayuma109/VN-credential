// Vercel Routing Middleware (framework-agnostic, Edge runtime).
// Rewrites the OGP / Twitter-card meta of the static index.html per ?ver= & ?lang=
// so link previews show the cover + title of the shared deck version.
// Config: og.config.json (single source of truth). Docs: scripts/og/README.md.
import cfg from './og.config.json';

// Only the HTML document route. "/index.html" and every asset path are NOT matched,
// which also avoids recursion when we fetch /index.html below.
export const config = { matcher: ['/'] };

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fill = (tpl, label) => tpl.replace(/\{label\}/g, label);

// Replace the content="" value of a <meta> identified by attr=key. Tolerates quoted
// (" or ') and unquoted attributes (Parcel's minifier may drop quotes) in any order.
function setMeta(html, attr, key, value) {
  const tag = /<meta\b[^>]*>/gi;
  const keyRe = new RegExp(`\\b${attr}\\s*=\\s*(?:"${key}"|'${key}'|${key}(?=[\\s/>]))`, 'i');
  return html.replace(tag, (m) => {
    if (!keyRe.test(m)) return m;
    return m.replace(/\bcontent\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i, `content="${esc(value)}"`);
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const q = url.searchParams;
  const ver = cfg.versions[q.get('ver')] ? q.get('ver') : cfg.default;
  const lang = q.get('lang') === 'en' ? 'en' : 'ja';
  const label = cfg.versions[ver].label;

  const res = await fetch(new URL('/index.html', url.origin), { headers: { accept: 'text/html' } });
  if (!res.ok) return res;
  let html = await res.text();

  const title = fill(cfg.title[lang], label);
  const desc = cfg.description[lang];
  const alt = fill(cfg.imageAlt[lang], label);
  const image = `${url.origin}/genspark_images/og/og_v${ver}_${lang}.jpg`;

  html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = setMeta(html, 'name', 'description', desc);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', desc);
  html = setMeta(html, 'property', 'og:url', request.url);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'property', 'og:image:secure_url', image);
  html = setMeta(html, 'property', 'og:image:alt', alt);
  html = setMeta(html, 'property', 'og:locale', lang === 'en' ? 'en_US' : 'ja_JP');
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', desc);
  html = setMeta(html, 'name', 'twitter:image', image);

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
