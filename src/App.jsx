import React, { useState, useEffect, useCallback } from 'react';
import { SLIDE_W, SLIDE_H } from './components/Slide';
import { useEditStore, exportEdits, importEdits } from './utils/editStore';

import Page01 from './pages/Page01_Cover';
import Page02 from './pages/Page02_Origin';
import Page03 from './pages/Page03_Core';
import Page04 from './pages/Page04_Services';
import Page05 from './pages/Page05_Team';
import Page06 from './pages/Page06_EntOverview';
import Page07 from './pages/Page07_Disney';
import Page08 from './pages/Page08_Highlights';
import Page09 from './pages/Page09_PhysicalAI';
import Page10 from './pages/Page10_Industrial';
import Page11 from './pages/Page11_Japradar';
import Page12 from './pages/Page12_DroneAd';
import Page13 from './pages/Page13_Community';
import Page14 from './pages/Page14_EdogawaMOU';
import Page15 from './pages/Page15_Senrigan';
import Page16 from './pages/Page16_Education';
import Page17 from './pages/Page17_Market';
import Page18 from './pages/Page18_SOAnalysis';
import Page19 from './pages/Page19_Mission';
import Page20 from './pages/Page20_MVV';
import Page21 from './pages/Page21_Vision2030';
import Page22 from './pages/Page22_Values';
import Page23 from './pages/Page23_GrowthPlan';
import Page24 from './pages/Page24_Pipeline';
import Page25 from './pages/Page25_Financial';
import Page26 from './pages/Page26_Company';

const PAGES = [
  Page01, Page02, Page03, Page04, Page05, Page06, Page07, Page08, Page09, Page10,
  Page11, Page12, Page13, Page14, Page15, Page16, Page17, Page18, Page19, Page20,
  Page21, Page22, Page23, Page24, Page25, Page26,
];

export default function App() {
  const [editMode, setEditMode] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [active, setActive] = useState(1);
  const store = useEditStore();

  // Track active page in viewport
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
  }, []);

  const scrollTo = useCallback((n) => {
    const el = document.getElementById(`page-${String(n).padStart(2, '0')}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleExportPdf = async () => {
    setExporting(true);
    document.body.classList.add('exporting');

    // Force every canvas to its native logical size for capture
    const canvases = Array.from(document.querySelectorAll('.slide-canvas'));
    const inners = Array.from(document.querySelectorAll('.slide-frame-inner'));
    const oldTransforms = canvases.map((c) => c.style.transform);
    const oldHeights = inners.map((i) => i.style.height);
    canvases.forEach((c) => { c.style.transform = 'scale(1)'; });
    inners.forEach((i) => { i.style.height = SLIDE_H + 'px'; });

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      // 16:9 landscape; one page per slide
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [SLIDE_W, SLIDE_H], hotfixes: ['px_scaling'] });

      for (let i = 0; i < canvases.length; i++) {
        const canvas = await html2canvas(canvases[i], {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
          width: SLIDE_W,
          height: SLIDE_H,
          windowWidth: SLIDE_W,
          windowHeight: SLIDE_H,
        });
        const img = canvas.toDataURL('image/jpeg', 0.92);
        if (i > 0) pdf.addPage([SLIDE_W, SLIDE_H], 'landscape');
        pdf.addImage(img, 'JPEG', 0, 0, SLIDE_W, SLIDE_H);
      }
      pdf.save('VISIONOID_Credential_2026.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed: ' + err.message);
    } finally {
      canvases.forEach((c, i) => { c.style.transform = oldTransforms[i]; });
      inners.forEach((el, i) => { el.style.height = oldHeights[i]; });
      document.body.classList.remove('exporting');
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

  return (
    <div className={editMode ? 'edit-mode' : ''}>
      <div className="top-toolbar">
        <div className="brand">VISIONOID — Credential Deck 2026</div>
        <div className="controls">
          <button onClick={handleImportEdits} title="編集データをインポート">⬆ Import</button>
          <button onClick={handleExportEdits} title="編集データをエクスポート">⬇ Export Edits</button>
          <button onClick={handleResetEdits}>↺ Reset</button>
          <button className={editMode ? 'active' : ''} onClick={() => setEditMode((v) => !v)}>
            {editMode ? '✓ 編集中' : '✎ 編集モード'}
          </button>
          <button onClick={handleExportPdf} disabled={exporting}>
            {exporting ? '出力中…' : '📄 PDF出力'}
          </button>
        </div>
      </div>

      <div className="nav-sidebar">
        {PAGES.map((_, i) => (
          <button
            key={i}
            className={active === i + 1 ? 'active' : ''}
            onClick={() => scrollTo(i + 1)}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </div>

      <div className="app-pages">
        {PAGES.map((Page, i) => <Page key={i} editMode={editMode} />)}
      </div>
    </div>
  );
}
