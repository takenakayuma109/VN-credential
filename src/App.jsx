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
    return variant === 'board'
      ? all
      : all.filter((p) => !FINANCE_INDICES.has(p.idx));
  }, [variant]);

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
    try {
      // Inject print-color-adjust into each slide's HTML so backgrounds
      // survive the browser print dialog. Also grab the latest edited DOM.
      const printFix = '<style media="all">html,body,div,span,p,img,table,td,th,section,header,footer,nav,main,article,aside,figure,figcaption,*,*::before,*::after{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important}@media print{html,body{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}}</style>';

      const onScreen = Array.from(document.querySelectorAll('iframe.slide-canvas'));
      const editedHtmls = onScreen.map((iframe, i) => {
        let html;
        try {
          const doc = iframe.contentDocument;
          if (doc && doc.documentElement) {
            html = '<!DOCTYPE html>' + doc.documentElement.outerHTML;
          }
        } catch {}
        if (!html) html = filteredPages[i]?.html || '';
        // Inject print-color-adjust fix
        if (html.includes('</head>')) {
          html = html.replace('</head>', printFix + '</head>');
        } else {
          html = printFix + html;
        }
        return html;
      });

      const w = window.open('', '_blank', 'width=1380,height=820');
      if (!w) {
        alert('ポップアップがブロックされました。ポップアップを許可してから再度お試しください。');
        setExporting(false);
        return;
      }

      const variantLabel = variant === 'board' ? 'Board' : 'Member';
      const totalPages = editedHtmls.length;

      w.document.open();
      w.document.write(`<!DOCTYPE html>
<html lang="ja"><head>
<meta charset="utf-8">
<title>VISIONOID Credential 2026 (${variantLabel})</title>
<style>
  @page { size: ${SLIDE_W}px ${SLIDE_H}px; margin: 0; }
  *, *::before, *::after {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  html, body { margin: 0; padding: 0; background: #0f1520; }
  .slide-print {
    width: ${SLIDE_W}px;
    height: ${SLIDE_H}px;
    page-break-after: always;
    break-after: page;
    overflow: hidden;
    position: relative;
  }
  .slide-print:last-child { page-break-after: auto; break-after: auto; }
  .slide-print iframe {
    width: ${SLIDE_W}px;
    height: ${SLIDE_H}px;
    border: 0;
    display: block;
  }
  .toolbar-print {
    position: fixed; top: 0; left: 0; right: 0;
    background: #1a2744; color: #fff; padding: 14px 20px;
    font-family: -apple-system, 'Noto Sans JP', sans-serif;
    font-size: 13px; z-index: 10000;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    display: flex; align-items: center; gap: 14px;
    flex-wrap: wrap;
  }
  .toolbar-print .info { flex: 1; }
  .toolbar-print .warn {
    display: block; margin-top: 4px;
    color: #fbbf24; font-weight: 700; font-size: 12px;
  }
  .toolbar-print button {
    padding: 10px 20px; color: #fff;
    border: 0; border-radius: 6px; font-size: 13px;
    font-weight: 700; cursor: pointer; font-family: inherit;
    white-space: nowrap;
  }
  .btn-print { background: #4a9eff; }
  .btn-print:hover { background: #3a8eef; }
  .btn-download { background: #10b981; }
  .btn-download:hover { background: #059669; }
  .btn-download:disabled { background: #555; cursor: wait; }
  .progress { color: #4a9eff; font-weight: 600; display: none; }
  @media print {
    .toolbar-print { display: none !important; }
  }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>
</head><body>
<div class="toolbar-print">
  <div class="info">
    📄 ${totalPages}ページ [${variantLabel}版]
    <span class="warn">⚠️ 印刷する場合は「背景のグラフィック」に必ずチェックを入れてください。確実に背景を保持したい場合は「📥 PDFダウンロード」をお使いください。</span>
  </div>
  <span class="progress" id="dl-progress"></span>
  <button class="btn-print" onclick="window.print()">🖨 印刷 / PDF保存</button>
  <button class="btn-download" id="btn-dl" onclick="directDownload()">📥 PDFダウンロード</button>
</div>
${editedHtmls.map((_, i) => `<div class="slide-print"><iframe id="pf-${i}"></iframe></div>`).join('\n')}
<script>
async function directDownload() {
  var btn = document.getElementById('btn-dl');
  var prog = document.getElementById('dl-progress');
  btn.disabled = true;
  btn.textContent = '生成中…';
  prog.style.display = 'inline';
  try {
    var iframes = document.querySelectorAll('.slide-print iframe');
    var pdf = new jspdf.jsPDF({
      orientation: 'landscape', unit: 'px',
      format: [${SLIDE_W}, ${SLIDE_H}],
      hotfixes: ['px_scaling']
    });
    for (var i = 0; i < iframes.length; i++) {
      prog.textContent = (i+1) + '/' + iframes.length;
      var idoc = iframes[i].contentDocument;
      if (!idoc) continue;
      var target = idoc.querySelector('.slide-container') || idoc.body;
      var canvas = await html2canvas(target, {
        width: ${SLIDE_W}, height: ${SLIDE_H},
        scale: 2, useCORS: true, allowTaint: true,
        backgroundColor: null, logging: false,
        windowWidth: ${SLIDE_W}, windowHeight: ${SLIDE_H}
      });
      var img = canvas.toDataURL('image/jpeg', 0.95);
      if (i > 0) pdf.addPage();
      pdf.addImage(img, 'JPEG', 0, 0, ${SLIDE_W}, ${SLIDE_H});
    }
    pdf.save('VISIONOID_Credential_2026_${variantLabel}.pdf');
  } catch(e) {
    alert('PDF生成失敗: ' + e.message);
    console.error(e);
  } finally {
    btn.disabled = false;
    btn.textContent = '📥 PDFダウンロード';
    prog.style.display = 'none';
  }
}
<\/script>
</body></html>`);
      w.document.close();

      // Inject srcdoc into each iframe
      const setupPrint = () => {
        editedHtmls.forEach((html, i) => {
          const f = w.document.getElementById('pf-' + i);
          if (f) f.srcdoc = html;
        });
      };
      if (w.document.readyState === 'complete') setupPrint();
      else w.addEventListener('load', setupPrint);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF出力に失敗しました: ' + err.message);
    } finally {
      setExporting(false);
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
            <span className="btn-label">{exporting ? '準備中…' : 'PDF'}</span>
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
            {String(p.pageId).padStart(2, '0')}
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
          />
        ))}
      </div>
    </div>
  );
}
