import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import RawSlide from './components/RawSlide';
import { useEditStore, exportEdits, importEdits } from './utils/editStore';

// Parcel bundles each HTML file as a string at build time.
import p01 from 'bundle-text:./genspark_pages/page01.txt';
import p02 from 'bundle-text:./genspark_pages/page02.txt';
import p03 from 'bundle-text:./genspark_pages/page03.txt';
import p04 from 'bundle-text:./genspark_pages/page04.txt';
import p05 from 'bundle-text:./genspark_pages/page05.txt';
import p06 from 'bundle-text:./genspark_pages/page06.txt';
import p07 from 'bundle-text:./genspark_pages/page07.txt';
import p08 from 'bundle-text:./genspark_pages/page08.txt';
import p09 from 'bundle-text:./genspark_pages/page09.txt';
import p10 from 'bundle-text:./genspark_pages/page10.txt';
import p11 from 'bundle-text:./genspark_pages/page11.txt';
import p12 from 'bundle-text:./genspark_pages/page12.txt';
import p13 from 'bundle-text:./genspark_pages/page13.txt';
import p14 from 'bundle-text:./genspark_pages/page14.txt';
import p15 from 'bundle-text:./genspark_pages/page15.txt';
import p16 from 'bundle-text:./genspark_pages/page16.txt';
import p17 from 'bundle-text:./genspark_pages/page17.txt';
import p18 from 'bundle-text:./genspark_pages/page18.txt';
import p19 from 'bundle-text:./genspark_pages/page19.txt';
import p20 from 'bundle-text:./genspark_pages/page20.txt';
import p21 from 'bundle-text:./genspark_pages/page21.txt';
import p22 from 'bundle-text:./genspark_pages/page22.txt';
import p23 from 'bundle-text:./genspark_pages/page23.txt';
import p24 from 'bundle-text:./genspark_pages/page24.txt';
import p25 from 'bundle-text:./genspark_pages/page25.txt';
import p26 from 'bundle-text:./genspark_pages/page26.txt';
import p27 from 'bundle-text:./genspark_pages/page27.txt';

import p01en from 'bundle-text:./genspark_pages/page01_en.txt';
import p02en from 'bundle-text:./genspark_pages/page02_en.txt';
import p03en from 'bundle-text:./genspark_pages/page03_en.txt';
import p04en from 'bundle-text:./genspark_pages/page04_en.txt';
import p05en from 'bundle-text:./genspark_pages/page05_en.txt';
import p06en from 'bundle-text:./genspark_pages/page06_en.txt';
import p07en from 'bundle-text:./genspark_pages/page07_en.txt';
import p08en from 'bundle-text:./genspark_pages/page08_en.txt';
import p09en from 'bundle-text:./genspark_pages/page09_en.txt';
import p10en from 'bundle-text:./genspark_pages/page10_en.txt';
import p11en from 'bundle-text:./genspark_pages/page11_en.txt';
import p12en from 'bundle-text:./genspark_pages/page12_en.txt';
import p13en from 'bundle-text:./genspark_pages/page13_en.txt';
import p14en from 'bundle-text:./genspark_pages/page14_en.txt';
import p15en from 'bundle-text:./genspark_pages/page15_en.txt';
import p16en from 'bundle-text:./genspark_pages/page16_en.txt';
import p17en from 'bundle-text:./genspark_pages/page17_en.txt';
import p18en from 'bundle-text:./genspark_pages/page18_en.txt';
import p19en from 'bundle-text:./genspark_pages/page19_en.txt';
import p20en from 'bundle-text:./genspark_pages/page20_en.txt';
import p21en from 'bundle-text:./genspark_pages/page21_en.txt';
import p22en from 'bundle-text:./genspark_pages/page22_en.txt';
import p23en from 'bundle-text:./genspark_pages/page23_en.txt';
import p24en from 'bundle-text:./genspark_pages/page24_en.txt';
import p25en from 'bundle-text:./genspark_pages/page25_en.txt';
import p26en from 'bundle-text:./genspark_pages/page26_en.txt';
import p27en from 'bundle-text:./genspark_pages/page27_en.txt';

// ---- Ver.2 deck (JA only for now). Placeholder <!--V2HEAD--> in each page's <head> is
// replaced with the shared head + css below.
import V2HEAD from 'bundle-text:./v2/head.txt';
import V2CSS from 'bundle-text:./v2/v2css.txt';
import v2p01 from 'bundle-text:./v2/pages/p01.txt';
import v2p02 from 'bundle-text:./v2/pages/p02.txt';
import v2p03 from 'bundle-text:./v2/pages/p03.txt';
import v2p04 from 'bundle-text:./v2/pages/p04.txt';
import v2p05 from 'bundle-text:./v2/pages/p05.txt';
import v2p06 from 'bundle-text:./v2/pages/p06.txt';
import v2p07 from 'bundle-text:./v2/pages/p07.txt';
import v2p08 from 'bundle-text:./v2/pages/p08.txt';
import v2p09 from 'bundle-text:./v2/pages/p09.txt';
import v2p10 from 'bundle-text:./v2/pages/p10.txt';
import v2p11 from 'bundle-text:./v2/pages/p11.txt';
import v2p12 from 'bundle-text:./v2/pages/p12.txt';
import v2p13 from 'bundle-text:./v2/pages/p13.txt';
import v2p14 from 'bundle-text:./v2/pages/p14.txt';
import v2p15 from 'bundle-text:./v2/pages/p15.txt';
import v2p16 from 'bundle-text:./v2/pages/p16.txt';
import v2p17 from 'bundle-text:./v2/pages/p17.txt';
import v2p18 from 'bundle-text:./v2/pages/p18.txt';
import v2p19 from 'bundle-text:./v2/pages/p19.txt';
import v2p20 from 'bundle-text:./v2/pages/p20.txt';
import v2p21 from 'bundle-text:./v2/pages/p21.txt';
import v2p22 from 'bundle-text:./v2/pages/p22.txt';
import v2p23 from 'bundle-text:./v2/pages/p23.txt';
import v2p24 from 'bundle-text:./v2/pages/p24.txt';
import v2p25 from 'bundle-text:./v2/pages/p25.txt';
import v2p26 from 'bundle-text:./v2/pages/p26.txt';
import v2p27 from 'bundle-text:./v2/pages/p27.txt';
import v2p28 from 'bundle-text:./v2/pages/p28.txt';
import v2p29 from 'bundle-text:./v2/pages/p29.txt';
import v2p30 from 'bundle-text:./v2/pages/p30.txt';
import v2p31 from 'bundle-text:./v2/pages/p31.txt';
import v2p32 from 'bundle-text:./v2/pages/p32.txt';
import v2p33 from 'bundle-text:./v2/pages/p33.txt';
import v2p34 from 'bundle-text:./v2/pages/p34.txt';
import v2p01en from 'bundle-text:./v2/pages_en/p01.txt';
import v2p02en from 'bundle-text:./v2/pages_en/p02.txt';
import v2p03en from 'bundle-text:./v2/pages_en/p03.txt';
import v2p04en from 'bundle-text:./v2/pages_en/p04.txt';
import v2p05en from 'bundle-text:./v2/pages_en/p05.txt';
import v2p06en from 'bundle-text:./v2/pages_en/p06.txt';
import v2p07en from 'bundle-text:./v2/pages_en/p07.txt';
import v2p08en from 'bundle-text:./v2/pages_en/p08.txt';
import v2p09en from 'bundle-text:./v2/pages_en/p09.txt';
import v2p10en from 'bundle-text:./v2/pages_en/p10.txt';
import v2p11en from 'bundle-text:./v2/pages_en/p11.txt';
import v2p12en from 'bundle-text:./v2/pages_en/p12.txt';
import v2p13en from 'bundle-text:./v2/pages_en/p13.txt';
import v2p14en from 'bundle-text:./v2/pages_en/p14.txt';
import v2p15en from 'bundle-text:./v2/pages_en/p15.txt';
import v2p16en from 'bundle-text:./v2/pages_en/p16.txt';
import v2p17en from 'bundle-text:./v2/pages_en/p17.txt';
import v2p18en from 'bundle-text:./v2/pages_en/p18.txt';
import v2p19en from 'bundle-text:./v2/pages_en/p19.txt';
import v2p20en from 'bundle-text:./v2/pages_en/p20.txt';
import v2p21en from 'bundle-text:./v2/pages_en/p21.txt';
import v2p22en from 'bundle-text:./v2/pages_en/p22.txt';
import v2p23en from 'bundle-text:./v2/pages_en/p23.txt';
import v2p24en from 'bundle-text:./v2/pages_en/p24.txt';
import v2p25en from 'bundle-text:./v2/pages_en/p25.txt';
import v2p26en from 'bundle-text:./v2/pages_en/p26.txt';
import v2p27en from 'bundle-text:./v2/pages_en/p27.txt';
import v2p28en from 'bundle-text:./v2/pages_en/p28.txt';
import v2p29en from 'bundle-text:./v2/pages_en/p29.txt';
import v2p30en from 'bundle-text:./v2/pages_en/p30.txt';
import v2p31en from 'bundle-text:./v2/pages_en/p31.txt';
import v2p32en from 'bundle-text:./v2/pages_en/p32.txt';
import v2p33en from 'bundle-text:./v2/pages_en/p33.txt';
import v2p34en from 'bundle-text:./v2/pages_en/p34.txt';

// Indexed by pageId - 1. A page's id is permanent: edits live in the store
// under `p<id>:...`, so ids must never shift when the deck is reordered.
const PAGES_JA = [p01,p02,p03,p04,p05,p06,p07,p08,p09,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22,p23,p24,p25,p26,p27];
const PAGES_EN = [p01en,p02en,p03en,p04en,p05en,p06en,p07en,p08en,p09en,p10en,p11en,p12en,p13en,p14en,p15en,p16en,p17en,p18en,p19en,p20en,p21en,p22en,p23en,p24en,p25en,p26en,p27en];

// Deck order, by pageId. P27 (機体開発プロジェクト / 小橋賢児 クリエイティブ監修)
// was added after the deck was numbered, so it carries id 27 but sits at
// display position 10, right after P09. Appending it to the id list instead
// of renumbering P10–P26 keeps every existing edit pointing at its own page.
const PAGE_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 27, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

// pageIds of the Finance section that exists
// only in the Board variant. Member variant skips these entirely. All other
// pages are byte-identical between variants because they share the same
// source HTML and the same edit store, so any edit (terminal OR web edit
// mode) reflects in both views automatically.
const FINANCE_IDS = new Set([23, 24, 25]);

// Ver.2 pages. pageId = 100 + n (101..130) so ids never collide with Ver.1 edit-store
// keys (`p<id>:...`). Display order = file order.
const V2_HEAD_INJECT = V2HEAD + '<style>' + V2CSS + '</style>';
const injectV2 = (html) => html.replace('<!--V2HEAD-->', () => V2_HEAD_INJECT);
const V2_PAGES_JA = [v2p01,v2p02,v2p03,v2p04,v2p05,v2p06,v2p07,v2p08,v2p09,v2p10,v2p11,v2p12,v2p13,v2p14,v2p15,v2p16,v2p17,v2p18,v2p19,v2p20,v2p21,v2p22,v2p23,v2p24,v2p25,v2p26,v2p27,v2p28,v2p29,v2p30,v2p31,v2p32,v2p33,v2p34].map(injectV2);
// English Ver.2 pages, same order as V2_PAGES_JA.
const V2_PAGES_EN = [v2p01en,v2p02en,v2p03en,v2p04en,v2p05en,v2p06en,v2p07en,v2p08en,v2p09en,v2p10en,v2p11en,v2p12en,v2p13en,v2p14en,v2p15en,v2p16en,v2p17en,v2p18en,v2p19en,v2p20en,v2p21en,v2p22en,v2p23en,v2p24en,v2p25en,v2p26en,v2p27en,v2p28en,v2p29en,v2p30en,v2p31en,v2p32en,v2p33en,v2p34en].map(injectV2);
const V2_ID_BASE = 100;
// Ver.2 display order by file number n (page id = 100 + n). Finance = files 25-27 (ids 125-127).
const V2_PAGE_ORDER = [1,2,3,4,28,33,5,6,7,8,31,9,32,10,34,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,29,30];
// Finance pages of Ver.2 (hidden in Member variant).
const V2_FINANCE_IDS = new Set([125, 126, 127]);

// ---------------------------------------------------------------------------
// Presentation ("発表") mode: fixed black full-viewport overlay that shows one
// slide at a time, 16:9 contain. Renders the current slide plus a window of
// neighbours (kept mounted via stable keys) so navigation never flashes white.
// ---------------------------------------------------------------------------
const PRESENT_PRELOAD = 2;

function PresentMode({ pages, startIndex, lang, onClose }) {
  const total = pages.length;
  const [idx, setIdx] = useState(() => Math.max(0, Math.min(total - 1, startIndex)));
  const [hud, setHud] = useState(true);
  const [fit, setFit] = useState(() => {
    if (typeof window === 'undefined') return 1;
    return Math.min(window.innerWidth / 1280, window.innerHeight / 720);
  });
  const overlayRef = useRef(null);
  const idxRef = useRef(idx);
  idxRef.current = idx;
  const closedRef = useRef(false);
  const enteredFsRef = useRef(false);
  const hudTimer = useRef(null);
  const touchRef = useRef(null);
  const swipedAt = useRef(0);

  const go = useCallback((n) => {
    setIdx((cur) => Math.max(0, Math.min(total - 1, typeof n === 'function' ? n(cur) : n)));
  }, [total]);

  const close = useCallback(() => {
    if (closedRef.current) return;
    closedRef.current = true;
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) {
      try {
        const p = (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        if (p && p.catch) p.catch(() => {});
      } catch (e) {}
    }
    onClose(pages[idxRef.current]?.pageId);
  }, [onClose, pages]);

  // Mount: enter fullscreen (best effort), lock body scroll, grab focus so
  // Space/Enter don't re-activate the toolbar button that opened us.
  useEffect(() => {
    const el = overlayRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    if (el) el.focus({ preventScroll: true });
    try {
      const req = el && (el.requestFullscreen || el.webkitRequestFullscreen);
      if (req) {
        const p = req.call(el);
        if (p && p.catch) p.catch(() => {});
      }
    } catch (e) {}
    return () => {
      document.body.style.overflow = prevOverflow;
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (fsEl) {
        try {
          const p = (document.exitFullscreen || document.webkitExitFullscreen).call(document);
          if (p && p.catch) p.catch(() => {});
        } catch (e) {}
      }
    };
  }, []);

  // Fullscreen exit (e.g. user pressed Esc, which the browser consumes) closes the overlay.
  useEffect(() => {
    const onFs = () => {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (fsEl === overlayRef.current) enteredFsRef.current = true;
      else if (!fsEl && enteredFsRef.current) close();
      setFit(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
    };
    document.addEventListener('fullscreenchange', onFs);
    document.addEventListener('webkitfullscreenchange', onFs);
    return () => {
      document.removeEventListener('fullscreenchange', onFs);
      document.removeEventListener('webkitfullscreenchange', onFs);
    };
  }, [close]);

  useEffect(() => {
    const onResize = () => setFit(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Keyboard.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      let handled = true;
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case ' ': case 'Spacebar':
        case 'PageDown': case 'Enter':
          go((c) => c + 1); break;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
          go((c) => c - 1); break;
        case 'Home': go(0); break;
        case 'End': go(total - 1); break;
        case 'Escape': close(); break;
        default: handled = false;
      }
      if (handled) { e.preventDefault(); e.stopPropagation(); }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [go, close, total]);

  // HUD + cursor auto-hide after 1.5s without mouse movement.
  const poke = useCallback(() => {
    setHud(true);
    clearTimeout(hudTimer.current);
    hudTimer.current = setTimeout(() => setHud(false), 1500);
  }, []);
  useEffect(() => {
    poke();
    return () => clearTimeout(hudTimer.current);
  }, [poke]);

  const onClick = (e) => {
    if (Date.now() - swipedAt.current < 400) return; // click synthesized after a swipe
    const r = e.currentTarget.getBoundingClientRect();
    if (e.clientX - r.left < r.width / 3) go((c) => c - 1);
    else go((c) => c + 1);
  };
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = t ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (e) => {
    const s = touchRef.current;
    touchRef.current = null;
    const t = e.changedTouches[0];
    if (!s || !t) return;
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      swipedAt.current = Date.now();
      go((c) => c + (dx < 0 ? 1 : -1));
    }
  };

  const lo = Math.max(0, idx - PRESENT_PRELOAD);
  const hi = Math.min(total - 1, idx + PRESENT_PRELOAD);
  const visible = pages.slice(lo, hi + 1);
  const cur = pages[idx];
  const pct = total > 1 ? ((idx + 1) / total) * 100 : 100;

  return (
    <div
      ref={overlayRef}
      className={`present-overlay${hud ? '' : ' idle'}`}
      tabIndex={-1}
      role="dialog"
      aria-label={lang === 'ja' ? '発表モード' : 'Presentation mode'}
      onMouseMove={poke}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="present-stage" style={{ transform: `translate(-50%, -50%) scale(${fit})` }}>
        {visible.map((p) => (
          <div
            key={`${p.pageId}-${lang}`}
            className={`present-slot${p.pageId === cur.pageId ? ' current' : ''}`}
            aria-hidden={p.pageId === cur.pageId ? undefined : true}
          >
            <RawSlide
              id={p.pageId}
              html={p.html}
              lang={lang}
              editMode={false}
              pageNumber={p.pageId}
              displayNumber={p.displayNumber}
              totalPages={total}
              presenting
            />
          </div>
        ))}
      </div>
      <div className="present-hud">
        <span className="present-hint">Esc</span>
        <span className="present-counter">{String(cur.displayNumber).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <div className="present-progress"><div style={{ width: `${pct}%` }} /></div>
      </div>
    </div>
  );
}

function readQuery() {
  if (typeof window === 'undefined') return { variant: 'board', share: false, lang: 'ja', ver: '1' };
  const p = new URLSearchParams(window.location.search);
  return {
    variant: p.get('v') === 'member' ? 'member' : 'board',
    share: p.get('share') === '1',
    lang: p.get('lang') === 'en' ? 'en' : 'ja',
    ver: p.get('ver') === '2' ? '2' : '1',
  };
}

export default function App() {
  const [editMode, setEditMode] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [active, setActive] = useState(1);
  const [variant, setVariant] = useState(() => readQuery().variant);
  const [lang, setLang] = useState(() => readQuery().lang);
  const [ver, setVer] = useState(() => readQuery().ver);
  // Share view = read-only mode for recipients of a shared link. Hides the
  // edit / import / reset / variant-toggle controls so they only see the
  // deck and the PDF download.
  const isShareView = useMemo(() => readQuery().share, []);
  const store = useEditStore();
  const [presentStart, setPresentStart] = useState(null); // index into filteredPages while presenting
  const [navVisible, setNavVisible] = useState(false);

  // Build the page list for the current variant + language. Each entry keeps
  // its original 1-based pageId so edits stored under `p<id>:...` continue
  // to resolve correctly regardless of variant or language. Image edits are
  // shared between languages (one image, two captions); text edits are
  // language-scoped (handled in RawSlide).
  const filteredPages = useMemo(() => {
    let all;
    let financeIds;
    if (ver === '2') {
      const SOURCE = (lang === 'en' && V2_PAGES_EN) ? V2_PAGES_EN : V2_PAGES_JA;
      all = V2_PAGE_ORDER.map((n) => ({ html: SOURCE[n - 1], pageId: V2_ID_BASE + n }));
      financeIds = V2_FINANCE_IDS;
    } else {
      const SOURCE = lang === 'en' ? PAGES_EN : PAGES_JA;
      all = PAGE_ORDER.map((pageId) => ({ html: SOURCE[pageId - 1], pageId }));
      financeIds = FINANCE_IDS;
    }
    const base = variant === 'board'
      ? all
      : all.filter((p) => !financeIds.has(p.pageId));
    // displayNumber = sequential 1..N for the current variant (so Member
    // view doesn't expose the Finance-page gap in page numbering).
    // Resolve {{ref:pNN}} tokens (Ver.2 only) to "P.07"-style display numbers
    // of the current list; pages not in this list resolve to ''.
    const refMap = {};
    if (ver === '2') base.forEach((p, i) => { refMap[p.pageId - V2_ID_BASE] = String(i + 1).padStart(2, '0'); });
    const resolveRefs = (html) => (ver === '2' && html && html.indexOf('{{ref:') >= 0)
      ? html.replace(/\{\{ref:p0*(\d+)\}\}/g, (m, n) => (refMap[Number(n)] ? 'P.' + refMap[Number(n)] : ''))
      : html;
    return base.map((p, i) => ({ ...p, html: resolveRefs(p.html), displayNumber: i + 1 }));
  }, [variant, lang, ver]);
  const financeRange = useMemo(() => {
    const ids = ver === '2' ? V2_FINANCE_IDS : FINANCE_IDS;
    const order = ver === '2' ? V2_PAGE_ORDER.map((n) => V2_ID_BASE + n) : PAGE_ORDER;
    const pos = order.map((id, i) => (ids.has(id) ? i + 1 : 0)).filter(Boolean);
    return pos.length ? { a: pos[0], b: pos[pos.length - 1] } : null;
  }, [ver]);
  const totalDisplayPages = filteredPages.length;

  // Update URL when variant changes so reload + share both preserve choice.
  const switchVariant = useCallback((v) => {
    setVariant(v);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('v', v);
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // Same persistence pattern for language toggle.
  const switchLang = useCallback((l) => {
    setLang(l);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', l);
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // Same persistence pattern for deck version (Ver.1 / Ver.2).
  const switchVer = useCallback((v) => {
    setVer(v);
    setActive(v === '2' ? 101 : 1);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('ver', v);
      window.history.replaceState({}, '', url.toString());
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const n = parseInt(e.target.id.replace('page-', ''), 10);
            if (n) setActive(n);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.slide-frame').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [variant, ver, lang]);

  // Page-number sidebar auto-hide: shown while scrolling, hidden 1s after the
  // last scroll event; stays up while the pointer is over it.
  const navRef = useRef(null);
  useEffect(() => {
    let timer = null;
    let hovered = false;
    const arm = () => {
      clearTimeout(timer);
      timer = setTimeout(() => { if (!hovered) setNavVisible(false); }, 1000);
    };
    const onScroll = () => { setNavVisible(true); arm(); };
    const el = navRef.current;
    const onEnter = () => { hovered = true; clearTimeout(timer); setNavVisible(true); };
    const onLeave = () => { hovered = false; arm(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    if (el) { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); }
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      if (el) { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); }
    };
  }, []);

  const startPresent = useCallback(() => {
    const i = filteredPages.findIndex((p) => p.pageId === active);
    setPresentStart(i >= 0 ? i : 0);
  }, [filteredPages, active]);

  const endPresent = useCallback((lastPageId) => {
    setPresentStart(null);
    if (lastPageId == null) return;
    // Wait for the overlay to unmount / fullscreen layout to settle, then jump
    // (instantly) to the last slide that was shown.
    const jump = () => {
      const el = document.getElementById(`page-${String(lastPageId).padStart(2, '0')}`);
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    };
    setTimeout(jump, 60);
    setTimeout(jump, 350);
  }, []);

  const scrollTo = useCallback((n) => {
    const el = document.getElementById(`page-${String(n).padStart(2, '0')}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleExportPdf = async () => {
    setExporting(true);
    setExportProgress(lang === 'ja' ? '画像とフォントの読込待ち…' : 'Loading images and fonts…');
    try {
      const frames = Array.from(document.querySelectorAll('iframe.slide-canvas'));
      if (frames.length === 0) {
        alert(lang === 'ja' ? 'スライドが見つかりません。ページを再読込してください。' : 'No slides found. Please reload the page.');
        return;
      }

      // Pre-warm: scroll every slide into view so iframes that haven't been
      // visited yet start fetching their fonts/images. Without this, pages
      // skipped during scrolling would print blank.
      const originalScrollY = window.scrollY;
      for (const f of frames) {
        const wrap = f.closest('.slide-frame');
        if (wrap) wrap.scrollIntoView({ block: 'start', behavior: 'auto' });
      }
      window.scrollTo(0, originalScrollY);

      // Wait for every iframe's document + images + fonts to be ready, so
      // print captures fully-rendered content (not half-loaded fonts).
      const waitForFrame = (iframe) => new Promise((resolve) => {
        const finish = () => {
          const doc = iframe.contentDocument;
          if (!doc) return resolve();
          const imgs = Array.from(doc.images || []);
          const pending = imgs.filter((im) => !im.complete || im.naturalWidth === 0);
          const fontsReady = doc.fonts && doc.fonts.ready
            ? doc.fonts.ready.catch(() => null)
            : Promise.resolve();
          if (pending.length === 0) {
            fontsReady.then(() => resolve());
            return;
          }
          let left = pending.length;
          const done = () => { if (--left <= 0) fontsReady.then(() => resolve()); };
          pending.forEach((im) => {
            im.addEventListener('load', done, { once: true });
            im.addEventListener('error', done, { once: true });
          });
          setTimeout(resolve, 4000); // hard cap per frame
        };
        const doc = iframe.contentDocument;
        if (doc && doc.readyState === 'complete') finish();
        else iframe.addEventListener('load', finish, { once: true });
      });
      await Promise.all(frames.map(waitForFrame));

      // Hide the progress overlay before opening the print dialog so it
      // doesn't bleed into the printed output. afterprint cleans up and
      // restores scroll position. Native print uses the browser's own
      // renderer → 100% identical to the on-screen view (CDN-loaded
      // Google Fonts and FontAwesome render correctly, unlike SVG-snapshot
      // libraries which silently drop external @font-face rules).
      setExporting(false);
      setExportProgress('');

      // Yield two frames so the overlay actually unmounts and print CSS
      // can take effect before the dialog opens.
      await new Promise((r) => requestAnimationFrame(() => r()));
      await new Promise((r) => requestAnimationFrame(() => r()));

      const onAfter = () => {
        window.removeEventListener('afterprint', onAfter);
        window.scrollTo(0, originalScrollY);
      };
      window.addEventListener('afterprint', onAfter);

      window.print();
    } catch (err) {
      console.error('PDF export failed:', err);
      alert((lang === 'ja' ? 'PDF出力に失敗しました: ' : 'PDF export failed: ') + (err?.message || err));
      setExporting(false);
      setExportProgress('');
    }
  };

  const handleResetEdits = () => {
    if (confirm(lang === 'ja' ? 'すべての編集をリセットしますか？' : 'Reset all edits?')) {
      store.reset();
      window.location.reload();
    }
  };

  const handleExportEdits = async () => {
    try {
      const json = await exportEdits();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const stamp = new Date().toISOString().slice(0, 10);
      a.download = `visionoid_edits_${stamp}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert((lang === 'ja' ? 'エクスポート失敗: ' : 'Export failed: ') + (err?.message || err));
    }
  };

  const handleImportEdits = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'application/json';
    input.onchange = (e) => {
      const f = e.target.files?.[0]; if (!f) return;
      const r = new FileReader();
      r.onload = async () => {
        const ok = await importEdits(r.result);
        if (ok) window.location.reload();
        else alert(lang === 'ja' ? 'インポートに失敗しました' : 'Import failed');
      };
      r.readAsText(f);
    };
    input.click();
  };

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('v', variant);
    url.searchParams.set('lang', lang);
    url.searchParams.set('ver', ver);
    url.searchParams.set('share', '1');
    const shareUrl = url.toString();
    const variantLabel = lang === 'ja'
      ? (variant === 'board' ? 'Board（Finance有り）' : 'Member（Finance無し）')
      : (variant === 'board' ? 'Board (with Finance)' : 'Member (no Finance)');
    const langLabel = lang === 'ja' ? '日本語' : 'English';
    const verLabel = ver === '2' ? 'Ver.2' : 'Ver.1';
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(
        lang === 'ja'
          ? `共有リンクをクリップボードにコピーしました\n\nデッキ版: ${verLabel}\nバージョン: ${variantLabel}\n言語: ${langLabel}\n\n${shareUrl}\n\n受け取った相手はブラウザで閲覧でき、PDFもダウンロードできます。`
          : `Share link copied to clipboard\n\nDeck: ${verLabel}\nVersion: ${variantLabel}\nLanguage: ${langLabel}\n\n${shareUrl}\n\nThe recipient can view in any browser and download the PDF.`
      );
    } catch {
      window.prompt(lang === 'ja' ? '共有リンクをコピーしてください:' : 'Copy the share link:', shareUrl);
    }
  };

  return (
    <div className={`${editMode ? 'edit-mode' : ''}${isShareView ? ' share-view' : ''}`}>
      {exporting && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(10,22,40,0.78)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 16, color: '#fff',
          fontFamily: "'Inter','Noto Sans JP',sans-serif",
        }}>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{lang === 'ja' ? 'PDF生成中' : 'Generating PDF'}</div>
          <div style={{ fontSize: 18, color: '#4a9eff', fontWeight: 700 }}>
            {exportProgress || (lang === 'ja' ? '準備中…' : 'Preparing…')}
          </div>
          <div style={{ fontSize: 13, color: '#cbd5e1', maxWidth: 460, textAlign: 'center', lineHeight: 1.6 }}>
            {lang === 'ja' ? (
              <>全{filteredPages.length}ページを画像化しています。<br/>途中で操作したり閉じたりしないでください（最大 1 分程度）。</>
            ) : (
              <>Rendering all {filteredPages.length} pages to images.<br/>Please don't interact or close this tab (≤ ~1 minute).</>
            )}
          </div>
        </div>
      )}
      <div className="top-toolbar">
        <div className="brand">
          <svg className="brand-mark" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-label="VN">
            <rect width="40" height="40" rx="6" fill="#0a1628" />
            <text x="20" y="30" textAnchor="middle" fontFamily="-apple-system,'Helvetica Neue',Arial,sans-serif" fontWeight="900" fontSize="26" fill="#ffffff" letterSpacing="-1.5">VN</text>
          </svg>
          <span className="brand-text-full">VISIONOID — Credential Deck 2026</span>
          <span className="brand-text-short">VN Credential</span>
          <span className={`variant-badge ${variant}`}>
            {variant === 'board' ? 'BOARD' : 'MEMBER'}
          </span>
          {ver === '2' && <span className="variant-badge ver2">VER.2</span>}
          <span style={{ fontSize: 10, color: '#64748b', marginLeft: 8, fontFamily: 'monospace' }}>
            v2026.05.01-idbfix
          </span>
        </div>
        <div className="controls">
          {!isShareView && (
            <div className="ver-switch" data-ver={ver} role="radiogroup" aria-label={lang === 'ja' ? 'デッキ版切替' : 'Deck version'}>
              <span className="ver-thumb" aria-hidden="true" />
              <button
                type="button"
                role="radio"
                aria-checked={ver === '1'}
                onClick={() => switchVer('1')}
                title={lang === 'ja' ? 'Ver.1: 現行デッキ' : 'Ver.1: current deck'}
              >
                <span className="full">VER.1</span><span className="short">V1</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={ver === '2'}
                onClick={() => switchVer('2')}
                title={lang === 'ja' ? 'Ver.2: 新デッキ' : 'Ver.2: new deck'}
              >
                <span className="full">VER.2</span><span className="short">V2</span>
                {ver === '1' && <span className="ver-new" title="NEW" aria-hidden="true" />}
              </button>
            </div>
          )}
          <div className="variant-toggle lang-toggle" role="group" aria-label={lang === 'ja' ? '言語切替' : 'Language'}>
            <button
              className={lang === 'ja' ? 'active' : ''}
              onClick={() => switchLang('ja')}
              title="日本語"
            >
              日本語
            </button>
            <button
              className={lang === 'en' ? 'active' : ''}
              onClick={() => switchLang('en')}
              title="English"
            >
              English
            </button>
          </div>
          {!isShareView && (
            <div className="variant-toggle" role="group" aria-label={lang === 'ja' ? 'バージョン切替' : 'Version'}>
              <button
                className={variant === 'board' ? 'active' : ''}
                onClick={() => switchVariant('board')}
                title={lang === 'ja' ? `Board: Financeページ有り (${financeRange ? `P.${financeRange.a}-${financeRange.b}` : ''})` : `Board: includes Finance pages (${financeRange ? `P.${financeRange.a}–${financeRange.b}` : ''})`}
              >
                Board
              </button>
              <button
                className={variant === 'member' ? 'active' : ''}
                onClick={() => switchVariant('member')}
                title={lang === 'ja' ? 'Member: Financeページ無し' : 'Member: no Finance pages'}
              >
                Member
              </button>
            </div>
          )}
          {!isShareView && (
            <>
              <button onClick={handleImportEdits} title={lang === 'ja' ? '編集データをインポート' : 'Import edits'}>
                <span className="btn-icon">⬆</span><span className="btn-label">Import</span>
              </button>
              <button onClick={handleExportEdits} title={lang === 'ja' ? '編集データをエクスポート' : 'Export edits'}>
                <span className="btn-icon">⬇</span><span className="btn-label">Export</span>
              </button>
              <button onClick={handleResetEdits} title={lang === 'ja' ? '編集をリセット' : 'Reset edits'}>
                <span className="btn-icon">↺</span><span className="btn-label">Reset</span>
              </button>
              <button className={editMode ? 'active' : ''} onClick={() => setEditMode((v) => !v)} title={lang === 'ja' ? '編集モード切替' : 'Toggle edit mode'}>
                <span className="btn-icon">{editMode ? '✓' : '✎'}</span>
                <span className="btn-label">{editMode ? (lang === 'ja' ? '編集中' : 'Editing') : (lang === 'ja' ? '編集' : 'Edit')}</span>
              </button>
            </>
          )}
          <button onClick={handleShare} title={lang === 'ja' ? 'この版の共有リンクをコピー' : 'Copy share link for this version'}>
            <span className="btn-icon">🔗</span><span className="btn-label">Share</span>
          </button>
          <button className="present-btn" onClick={startPresent} disabled={exporting || presentStart !== null} title={lang === 'ja' ? '発表モード（全画面スライドショー）' : 'Present (fullscreen slideshow)'}>
            <span className="btn-icon">▶</span>
            <span className="btn-label">{lang === 'ja' ? '発表' : 'Present'}</span>
          </button>
          <button onClick={handleExportPdf} disabled={exporting} title={lang === 'ja' ? 'PDF出力' : 'Export PDF'}>
            <span className="btn-icon">📄</span>
            <span className="btn-label">{exporting ? (exportProgress || (lang === 'ja' ? '準備中…' : 'Preparing…')) : 'PDF'}</span>
          </button>
        </div>
      </div>

      <div ref={navRef} className={`nav-sidebar${navVisible ? ' visible' : ''}`}>
        {filteredPages.map((p) => (
          <button
            key={p.pageId}
            className={active === p.pageId ? 'active' : ''}
            onClick={() => scrollTo(p.pageId)}
          >
            {String(p.displayNumber).padStart(2, '0')}
          </button>
        ))}
      </div>

      <div className="app-pages">
        {filteredPages.map((p) => (
          <RawSlide
            key={`${ver}-${variant}-${lang}-${p.pageId}`}
            id={p.pageId}
            html={p.html}
            lang={lang}
            editMode={editMode && !isShareView}
            pageNumber={p.pageId}
            displayNumber={p.displayNumber}
            totalPages={totalDisplayPages}
          />
        ))}
      </div>

      {presentStart !== null && (
        <PresentMode pages={filteredPages} startIndex={presentStart} lang={lang} onClose={endPresent} />
      )}
    </div>
  );
}
