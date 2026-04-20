import React, { useState, useEffect, useCallback, useMemo } from 'react';
import html2canvas from 'html2canvas';
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

const PAGES = [p01,p02,p03,p04,p05,p06,p07,p08,p09,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22,p23,p24,p25,p26];

// 0-indexed positions of pages 23, 24, 25 — the Finance section that exists
// only in the Board variant. Member variant skips these entirely. All other
// pages are byte-identical between variants because they share the same
// source HTML and the same edit store, so any edit (terminal OR web edit
// mode) reflects in both views automatically.
const FINANCE_INDICES = new Set([22, 23, 24]);

function readQuery() {
  if (typeof window === 'undefined') return { variant: 'board', share: false };
  const p = new URLSearchParams(window.location.search);
  return {
    variant: p.get('v') === 'member' ? 'member' : 'board',
    share: p.get('share') === '1',
  };
}

export default function App() {
  const [editMode, setEditMode] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [active, setActive] = useState(1);
  const [variant, setVariant] = useState(() => readQuery().variant);
  // Share view = read-only mode for recipients of a shared link. Hides the
  // edit / import / reset / variant-toggle controls so they only see the
  // deck and the PDF download.
  const isShareView = useMemo(() => readQuery().share, []);
  const store = useEditStore();

  // Build the page list for the current variant. Each entry keeps its
  // original 1-based pageId so edits stored under `p<id>:...` continue to
  // resolve correctly regardless of variant.
  const filteredPages = useMemo(() => {
    const all = PAGES.map((html, i) => ({ html, pageId: i + 1, idx: i }));
    const base = variant === 'board'
      ? all
      : all.filter((p) => !FINANCE_INDICES.has(p.idx));
    // displayNumber = sequential 1..N for the current variant (so Member
    // view doesn't expose the Finance-page gap in page numbering).
    return base.map((p, i) => ({ ...p, displayNumber: i + 1 }));
  }, [variant]);
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
    setExportProgress('準備中…');
    try {
      const frames = Array.from(document.querySelectorAll('iframe.slide-canvas'));
      if (frames.length === 0) {
        alert('スライドが見つかりません。ページを再読込してください。');
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
      setExportProgress('画像ロード待ち…');
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
        setExportProgress(`描画中 ${i + 1}/${frames.length}`);
        const iframe = frames[i];
        const doc = iframe.contentDocument;
        if (!doc) continue;
        const target = doc.querySelector('.slide-container') || doc.body;

        // Yield to the browser so the progress overlay actually repaints.
        await new Promise((r) => requestAnimationFrame(() => r()));

        const canvas = await html2canvas(target, {
          width: SLIDE_W,
          height: SLIDE_H,
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: SLIDE_W,
          windowHeight: SLIDE_H,
          imageTimeout: 8000,
          removeContainer: true,
        });

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        // Free the canvas backing store immediately — 26 × 2560×1440 RGBA
        // buffers blow past 400 MB otherwise.
        canvas.width = 0;
        canvas.height = 0;

        if (i > 0) pdf.addPage([SLIDE_W, SLIDE_H], 'landscape');
        pdf.addImage(dataUrl, 'JPEG', 0, 0, SLIDE_W, SLIDE_H, undefined, 'FAST');
      }

      setExportProgress('保存中…');
      const variantLabel = variant === 'board' ? 'Board' : 'Member';
      pdf.save(`VISIONOID_Credential_2026_${variantLabel}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF出力に失敗しました: ' + (err?.message || err));
    } finally {
      setExporting(false);
      setExportProgress('');
    }
  };

  const handleResetEdits = () => {
    if (confirm('すべての編集をリセットしますか？')) {
      store.reset();
      window.location.reload();
    }
  };

  const handleExportEdits = () => {
    const json = exportEdits();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'visionoid_edits.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportEdits = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'application/json';
    input.onchange = (e) => {
      const f = e.target.files?.[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        if (importEdits(r.result)) window.location.reload();
        else alert('インポートに失敗しました');
      };
      r.readAsText(f);
    };
    input.click();
  };

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('v', variant);
    url.searchParams.set('share', '1');
    const shareUrl = url.toString();
    const variantLabel = variant === 'board' ? 'Board（Finance有り）' : 'Member（Finance無し）';
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(
        `共有リンクをクリップボードにコピーしました\n\n` +
        `バージョン: ${variantLabel}\n\n` +
        `${shareUrl}\n\n` +
        `受け取った相手はブラウザで閲覧でき、PDFもダウンロードできます。`
      );
    } catch {
      window.prompt('共有リンクをコピーしてください:', shareUrl);
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
          <div style={{ fontSize: 24, fontWeight: 800 }}>PDF生成中</div>
          <div style={{ fontSize: 18, color: '#4a9eff', fontWeight: 700 }}>
            {exportProgress || '準備中…'}
          </div>
          <div style={{ fontSize: 13, color: '#cbd5e1', maxWidth: 460, textAlign: 'center', lineHeight: 1.6 }}>
            全{filteredPages.length}ページを画像化しています。<br/>
            途中で操作したり閉じたりしないでください（最大 1 分程度）。
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
        </div>
        <div className="controls">
          {!isShareView && (
            <div className="variant-toggle" role="group" aria-label="バージョン切替">
              <button
                className={variant === 'board' ? 'active' : ''}
                onClick={() => switchVariant('board')}
                title="Board: Financeページ有り (P.23-25)"
              >
                Board
              </button>
              <button
                className={variant === 'member' ? 'active' : ''}
                onClick={() => switchVariant('member')}
                title="Member: Financeページ無し"
              >
                Member
              </button>
            </div>
          )}
          {!isShareView && (
            <>
              <button onClick={handleImportEdits} title="編集データをインポート">
                <span className="btn-icon">⬆</span><span className="btn-label">Import</span>
              </button>
              <button onClick={handleExportEdits} title="編集データをエクスポート">
                <span className="btn-icon">⬇</span><span className="btn-label">Export</span>
              </button>
              <button onClick={handleResetEdits} title="編集をリセット">
                <span className="btn-icon">↺</span><span className="btn-label">Reset</span>
              </button>
              <button className={editMode ? 'active' : ''} onClick={() => setEditMode((v) => !v)} title="編集モード切替">
                <span className="btn-icon">{editMode ? '✓' : '✎'}</span>
                <span className="btn-label">{editMode ? '編集中' : '編集'}</span>
              </button>
            </>
          )}
          <button onClick={handleShare} title="この版の共有リンクをコピー">
            <span className="btn-icon">🔗</span><span className="btn-label">Share</span>
          </button>
          <button onClick={handleExportPdf} disabled={exporting} title="PDF出力">
            <span className="btn-icon">📄</span>
            <span className="btn-label">{exporting ? (exportProgress || '準備中…') : 'PDF'}</span>
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
            key={`${variant}-${p.pageId}`}
            id={p.pageId}
            html={p.html}
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
