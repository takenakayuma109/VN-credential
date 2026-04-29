import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import RawSlide, { SLIDE_W, SLIDE_H } from './components/RawSlide';
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

const PAGES_JA = [p01,p02,p03,p04,p05,p06,p07,p08,p09,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22,p23,p24,p25,p26];
const PAGES_EN = [p01en,p02en,p03en,p04en,p05en,p06en,p07en,p08en,p09en,p10en,p11en,p12en,p13en,p14en,p15en,p16en,p17en,p18en,p19en,p20en,p21en,p22en,p23en,p24en,p25en,p26en];

// 0-indexed positions of pages 23, 24, 25 — the Finance section that exists
// only in the Board variant. Member variant skips these entirely. All other
// pages are byte-identical between variants because they share the same
// source HTML and the same edit store, so any edit (terminal OR web edit
// mode) reflects in both views automatically.
const FINANCE_INDICES = new Set([22, 23, 24]);

// Walk the iframe document and replace every <img> that uses object-fit
// (cover/contain) with a same-size <div> that paints the picture via
// `background-image` + `background-size`. html2canvas can render this
// correctly, while it stretches `<img object-fit:cover>` to fill the box.
// Returns a function that undoes every replacement so the live UI is restored.
function imgsToBackgroundDivs(doc) {
  const restorations = [];
  const win = doc.defaultView || window;
  const imgs = Array.from(doc.querySelectorAll('img'));
  imgs.forEach((img) => {
    if (!img.parentNode || !img.src) return;
    if (!img.complete || !img.naturalWidth) return;
    const cs = win.getComputedStyle(img);
    const fit = cs.objectFit;
    if (fit !== 'cover' && fit !== 'contain' && fit !== 'fill' && fit !== 'scale-down') return;
    const div = doc.createElement('div');
    // Carry over inline styles so width/height/transform/etc. are preserved.
    const inline = img.getAttribute('style') || '';
    div.setAttribute('style', inline);
    div.style.backgroundImage = `url("${img.src}")`;
    div.style.backgroundSize = (fit === 'fill' || fit === 'scale-down') ? '100% 100%' : fit;
    div.style.backgroundPosition = cs.objectPosition || 'center center';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.objectFit = '';
    // Carry size/box if no explicit inline values (so a flex child still fills).
    if (!inline.includes('width')) div.style.width = cs.width;
    if (!inline.includes('height')) div.style.height = cs.height;
    img.parentNode.insertBefore(div, img);
    img.style.display = 'none';
    restorations.push({ img, div, prevDisplay: img.style.display });
  });
  return () => {
    restorations.forEach(({ img, div }) => {
      try { img.style.display = ''; } catch {}
      try { div.parentNode && div.parentNode.removeChild(div); } catch {}
    });
  };
}

function readQuery() {
  if (typeof window === 'undefined') return { variant: 'board', share: false, lang: 'ja' };
  const p = new URLSearchParams(window.location.search);
  return {
    variant: p.get('v') === 'member' ? 'member' : 'board',
    share: p.get('share') === '1',
    lang: p.get('lang') === 'en' ? 'en' : 'ja',
  };
}

export default function App() {
  const [editMode, setEditMode] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [active, setActive] = useState(1);
  const [variant, setVariant] = useState(() => readQuery().variant);
  const [lang, setLang] = useState(() => readQuery().lang);
  // Share view = read-only mode for recipients of a shared link. Hides the
  // edit / import / reset / variant-toggle controls so they only see the
  // deck and the PDF download.
  const isShareView = useMemo(() => readQuery().share, []);
  const store = useEditStore();

  // Build the page list for the current variant + language. Each entry keeps
  // its original 1-based pageId so edits stored under `p<id>:...` continue
  // to resolve correctly regardless of variant or language. Image edits are
  // shared between languages (one image, two captions); text edits are
  // language-scoped (handled in RawSlide).
  const filteredPages = useMemo(() => {
    const SOURCE = lang === 'en' ? PAGES_EN : PAGES_JA;
    const all = SOURCE.map((html, i) => ({ html, pageId: i + 1, idx: i }));
    const base = variant === 'board'
      ? all
      : all.filter((p) => !FINANCE_INDICES.has(p.idx));
    // displayNumber = sequential 1..N for the current variant (so Member
    // view doesn't expose the Finance-page gap in page numbering).
    return base.map((p, i) => ({ ...p, displayNumber: i + 1 }));
  }, [variant, lang]);
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
  }, [variant]);

  const scrollTo = useCallback((n) => {
    const el = document.getElementById(`page-${String(n).padStart(2, '0')}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleExportPdf = async () => {
    setExporting(true);
    setExportProgress(lang === 'ja' ? '準備中…' : 'Preparing…');
    try {
      const frames = Array.from(document.querySelectorAll('iframe.slide-canvas'));
      if (frames.length === 0) {
        alert(lang === 'ja' ? 'スライドが見つかりません。ページを再読込してください。' : 'No slides found. Please reload the page.');
        return;
      }

      // Scroll all slides into view briefly so lazy-loaded images start fetching.
      // Skipped pages stay empty in the iframe otherwise (observed: pages that
      // were never scrolled to rendered blank in the PDF).
      const originalScrollY = window.scrollY;
      for (const f of frames) {
        const wrap = f.closest('.slide-frame');
        if (wrap) wrap.scrollIntoView({ block: 'start', behavior: 'auto' });
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, originalScrollY);

      // Wait for every iframe's document + images + fonts to be ready.
      setExportProgress(lang === 'ja' ? '画像ロード待ち…' : 'Loading images…');
      const waitForFrame = (iframe) => new Promise((resolve) => {
        const finish = () => {
          const doc = iframe.contentDocument;
          if (!doc) return resolve();
          const imgs = Array.from(doc.images || []);
          const pending = imgs.filter((im) => !im.complete || im.naturalWidth === 0);
          if (pending.length === 0) {
            // Also wait for fonts to be ready inside the iframe if supported.
            const fontsReady = doc.fonts && doc.fonts.ready
              ? doc.fonts.ready.catch(() => null)
              : Promise.resolve();
            fontsReady.then(() => resolve());
            return;
          }
          let left = pending.length;
          const done = () => { if (--left <= 0) resolve(); };
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

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [SLIDE_W, SLIDE_H],
        hotfixes: ['px_scaling'],
        compress: true,
      });

      for (let i = 0; i < frames.length; i++) {
        setExportProgress(lang === 'ja' ? `描画中 ${i + 1}/${frames.length}` : `Rendering ${i + 1}/${frames.length}`);
        const iframe = frames[i];
        const doc = iframe.contentDocument;
        if (!doc) continue;
        const target = doc.querySelector('.slide-container') || doc.body;

        // Yield to the browser so the progress overlay actually repaints.
        await new Promise((r) => requestAnimationFrame(() => r()));

        // html-to-image renders via SVG <foreignObject>, which uses the
        // browser's real layout/render path. That means flex-wrap, gradients,
        // background-clip:text, and object-fit all match the on-screen
        // rendering — far more faithful than html2canvas's reimplementation
        // of CSS, which we previously hit with stretched images, missing
        // title suffixes, and broken gradient KPIs.
        const dataUrl = await toJpeg(target, {
          width: SLIDE_W,
          height: SLIDE_H,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          quality: 0.92,
          cacheBust: false,
          // Skip elements that aren't part of the slide (e.g., dynamic
          // overlays we add for edit mode would already have been hidden,
          // but this is a safety net).
          filter: (node) => {
            if (!node || !node.classList) return true;
            return !node.classList.contains('vn-edit-overlay');
          },
        });

        if (i > 0) pdf.addPage([SLIDE_W, SLIDE_H], 'landscape');
        pdf.addImage(dataUrl, 'JPEG', 0, 0, SLIDE_W, SLIDE_H, undefined, 'FAST');
      }

      setExportProgress(lang === 'ja' ? '保存中…' : 'Saving…');
      const variantLabel = variant === 'board' ? 'Board' : 'Member';
      const langLabel = lang === 'en' ? '_EN' : '';
      pdf.save(`VISIONOID_Credential_2026_${variantLabel}${langLabel}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert((lang === 'ja' ? 'PDF出力に失敗しました: ' : 'PDF export failed: ') + (err?.message || err));
    } finally {
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
    url.searchParams.set('share', '1');
    const shareUrl = url.toString();
    const variantLabel = lang === 'ja'
      ? (variant === 'board' ? 'Board（Finance有り）' : 'Member（Finance無し）')
      : (variant === 'board' ? 'Board (with Finance)' : 'Member (no Finance)');
    const langLabel = lang === 'ja' ? '日本語' : 'English';
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(
        lang === 'ja'
          ? `共有リンクをクリップボードにコピーしました\n\nバージョン: ${variantLabel}\n言語: ${langLabel}\n\n${shareUrl}\n\n受け取った相手はブラウザで閲覧でき、PDFもダウンロードできます。`
          : `Share link copied to clipboard\n\nVersion: ${variantLabel}\nLanguage: ${langLabel}\n\n${shareUrl}\n\nThe recipient can view in any browser and download the PDF.`
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
          <span style={{ fontSize: 10, color: '#64748b', marginLeft: 8, fontFamily: 'monospace' }}>
            v2026.04.29-click2
          </span>
        </div>
        <div className="controls">
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
                title={lang === 'ja' ? 'Board: Financeページ有り (P.23-25)' : 'Board: includes Finance pages (P.23–25)'}
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
          <button onClick={handleExportPdf} disabled={exporting} title={lang === 'ja' ? 'PDF出力' : 'Export PDF'}>
            <span className="btn-icon">📄</span>
            <span className="btn-label">{exporting ? (exportProgress || (lang === 'ja' ? '準備中…' : 'Preparing…')) : 'PDF'}</span>
          </button>
        </div>
      </div>

      <div className="nav-sidebar">
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
            key={`${variant}-${lang}-${p.pageId}`}
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
    </div>
  );
}
