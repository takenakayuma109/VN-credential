import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useEditStore } from '../utils/editStore';

export const SLIDE_W = 1280;
export const SLIDE_H = 720;

const MIN_EDIT_IMG = 60; // Only show edit overlay on images ≥60×60 (skip tiny icons)

function applyImgXform(img, xf) {
  if (!img) return;
  if (!xf) {
    img.style.transform = '';
    img.style.transformOrigin = '';
    return;
  }
  const x = Number(xf.x) || 0;
  const y = Number(xf.y) || 0;
  const s = Number(xf.scale) || 1;
  img.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
  img.style.transformOrigin = 'center center';
}

function applyImgFit(img, fit) {
  if (!img) return;
  if (img.dataset.origObjectFit === undefined) {
    img.dataset.origObjectFit = img.style.objectFit || '';
  }
  if (fit === 'cover' || fit === 'contain' || fit === 'fill') {
    img.style.objectFit = fit;
  } else {
    img.style.objectFit = img.dataset.origObjectFit;
  }
}

function compressFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error || new Error('FileReader failed'));
    reader.onload = (ev) => {
      const raw = ev.target.result;
      const im = new Image();
      im.onload = () => {
        try {
          const MAX_W = 1600, MAX_H = 900;
          let w = im.naturalWidth || im.width;
          let h = im.naturalHeight || im.height;
          const r = Math.min(MAX_W / w, MAX_H / h, 1);
          w = Math.round(w * r); h = Math.round(h * r);
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          c.getContext('2d').drawImage(im, 0, 0, w, h);
          resolve(c.toDataURL('image/jpeg', 0.82));
        } catch (e) { resolve(raw); }
      };
      im.onerror = () => resolve(raw);
      im.src = raw;
    };
    reader.readAsDataURL(file);
  });
}

// Pick a stable identifier for an image so edits persist across reloads.
// The key MUST be stable even after the src is replaced — otherwise swapping
// an image would orphan its edits on the next scan. Priority:
//   (1) wrap id on data-object-type="image" parent
//   (2) img id
//   (3) position index in document (stable across reloads of same HTML)
function getImageKey(img, positionIdx) {
  const wrap = img.closest('[data-object-type="image"]');
  if (wrap && wrap.id) return wrap.id;
  if (img.id) return img.id;
  return `img-${positionIdx}`;
}

export default function RawSlide({ id, html, editMode, pageNumber, displayNumber, totalPages }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const iframeRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [imageTargets, setImageTargets] = useState([]); // [{key, rect, img}]
  const store = useEditStore();
  const storeRef = useRef(store);
  storeRef.current = store;

  const baseHref = typeof window !== 'undefined'
    ? window.location.href.replace(/[^/]*$/, '')
    : '/';
  const baseTag = `<base href="${baseHref}">`;
  let patchedHtml = html.includes('<head')
    ? html.replace(/<head([^>]*)>/i, `<head$1>${baseTag}`)
    : `<!DOCTYPE html><html><head>${baseTag}</head><body>${html}</body></html>`;
  // Rewrite the baked-in "XX / 26" page counter so Member variant shows
  // its own sequential numbering (e.g., "02 / 23" instead of "02 / 26").
  // Match only "/ 26" (source total) to avoid clobbering other ratio text.
  if (displayNumber && totalPages) {
    const newNum = String(displayNumber).padStart(2, '0');
    const newTot = String(totalPages).padStart(2, '0');
    patchedHtml = patchedHtml.replace(/>(\s*)(\d{1,2})(\s*\/\s*)26(\s*)</g, `>$1${newNum}$3${newTot}$4<`);
  }

  // Fit to width
  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.clientWidth;
      setScale(w / SLIDE_W);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Scan iframe for editable images and compute their rects (in iframe coords).
  const rescanImages = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;

    const targets = [];
    const seen = new Set();

    // Priority 1: explicit data-object-type="image" wrappers
    doc.querySelectorAll('[data-object-type="image"]').forEach((wrap, idx) => {
      const img = wrap.tagName === 'IMG' ? wrap : wrap.querySelector('img');
      if (!img) return;
      const r = wrap.getBoundingClientRect();
      if (r.width < 20 || r.height < 20) return;
      const key = wrap.id || `wrap-${idx}`;
      seen.add(img);
      targets.push({ key, rect: { left: r.left, top: r.top, width: r.width, height: r.height }, img, wrap });
    });

    // Priority 2: all other content-sized <img> tags
    doc.querySelectorAll('img').forEach((img, idx) => {
      if (seen.has(img)) return;
      const r = img.getBoundingClientRect();
      if (r.width < MIN_EDIT_IMG || r.height < MIN_EDIT_IMG) return;
      const key = getImageKey(img, idx);
      targets.push({ key, rect: { left: r.left, top: r.top, width: r.width, height: r.height }, img, wrap: null });
    });

    setImageTargets(targets);
  }, []);

  // Main setup: restore edits, attach textbox handlers, scan images
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const setup = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      const { get, set } = storeRef.current;

      // Restore persisted edits
      const allEdits = JSON.parse(localStorage.getItem('visionoid_credential_edits_v1') || '{}');
      Object.keys(allEdits).forEach((k) => {
        if (k.startsWith(`p${id}:text:`)) {
          const objId = k.replace(`p${id}:text:`, '');
          const el = doc.getElementById(objId);
          if (el) el.innerHTML = allEdits[k];
        }
      });

      // Restore image src / xform / fit by scanning ALL images (auto-keyed
      // too). Build a key→img lookup first.
      const imgByKey = new Map();
      doc.querySelectorAll('[data-object-type="image"]').forEach((wrap, idx) => {
        const img = wrap.tagName === 'IMG' ? wrap : wrap.querySelector('img');
        if (img) imgByKey.set(wrap.id || `wrap-${idx}`, img);
      });
      doc.querySelectorAll('img').forEach((img, idx) => {
        if (img.closest('[data-object-type="image"]')) return;
        imgByKey.set(getImageKey(img, idx), img);
      });

      Object.keys(allEdits).forEach((k) => {
        const mSrc = k.match(new RegExp(`^p${id}:img:(.+)$`));
        const mXf = k.match(new RegExp(`^p${id}:imgxform:(.+)$`));
        const mFit = k.match(new RegExp(`^p${id}:imgfit:(.+)$`));
        if (mSrc) {
          const img = imgByKey.get(mSrc[1]);
          if (img) img.src = allEdits[k];
        } else if (mXf) {
          const img = imgByKey.get(mXf[1]);
          if (img) applyImgXform(img, allEdits[k]);
        } else if (mFit) {
          const img = imgByKey.get(mFit[1]);
          if (img) applyImgFit(img, allEdits[k]);
        }
      });

      // Textbox contentEditable handlers (skip ones containing images)
      doc.querySelectorAll('[data-object-type="textbox"]').forEach((tb) => {
        if (!tb.id) return;
        if (tb.querySelector('[data-object-type="image"]')) {
          tb.contentEditable = 'false';
          tb.style.cursor = '';
          tb.style.outline = '';
          return;
        }
        tb.contentEditable = editMode ? 'true' : 'false';
        tb.style.cursor = editMode ? 'text' : '';
        if (editMode) {
          tb.style.outline = '1px dashed rgba(74,158,255,0.4)';
          tb.onblur = () => set(`p${id}:text:${tb.id}`, tb.innerHTML);
        } else {
          tb.style.outline = '';
          tb.onblur = null;
        }
      });

      // Scan images for overlays (only when in edit mode — otherwise clear)
      if (editMode) {
        rescanImages();
      } else {
        setImageTargets([]);
      }
    };

    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      setup();
    } else {
      const onLoad = () => setup();
      iframe.addEventListener('load', onLoad);
      return () => iframe.removeEventListener('load', onLoad);
    }
  }, [editMode, html, id, rescanImages]);

  // Re-scan on scroll/resize (image rects could change), but only in edit mode
  useEffect(() => {
    if (!editMode) return;
    const onChange = () => rescanImages();
    window.addEventListener('resize', onChange);
    return () => window.removeEventListener('resize', onChange);
  }, [editMode, rescanImages]);

  // Per-image overlay actions
  const handleFileReplace = useCallback(async (target) => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.onchange = async (e) => {
      const f = e.target.files?.[0]; if (!f) return;
      try {
        const compressed = await compressFileToDataUrl(f);
        if (target.img) {
          target.img.src = compressed;
          applyImgFit(target.img, 'cover');
        }
        storeRef.current.set(`p${id}:img:${target.key}`, compressed);
        storeRef.current.set(`p${id}:imgfit:${target.key}`, 'cover');
      } catch (err) {
        window.alert('画像の読み込みに失敗: ' + (err?.message || err));
      }
    };
    input.click();
  }, [id]);

  const handleUrlReplace = useCallback(async (target) => {
    const url = window.prompt('画像URL（Drive 共有リンクOK）:');
    if (!url) return;
    let direct = url;
    const m = url.match(/\/d\/([\w-]+)/);
    if (m) direct = `https://drive.google.com/uc?export=view&id=${m[1]}`;
    if (target.img) {
      target.img.src = direct;
      applyImgFit(target.img, 'cover');
    }
    storeRef.current.set(`p${id}:img:${target.key}`, direct);
    storeRef.current.set(`p${id}:imgfit:${target.key}`, 'cover');
  }, [id]);

  const handleZoom = useCallback((target, ds) => {
    if (!target.img) return;
    const xfKey = `p${id}:imgxform:${target.key}`;
    const cur = storeRef.current.get(xfKey) || { x: 0, y: 0, scale: 1 };
    cur.scale = Math.max(0.2, Math.min(5, (Number(cur.scale) || 1) + ds));
    applyImgXform(target.img, cur);
    storeRef.current.set(xfKey, cur);
  }, [id]);

  const handleFitCycle = useCallback((target) => {
    if (!target.img) return;
    const fitKey = `p${id}:imgfit:${target.key}`;
    const cycle = ['cover', 'contain', 'fill'];
    const cur = storeRef.current.get(fitKey) || 'cover';
    const idx = cycle.indexOf(cur);
    const next = cycle[(idx + 1) % cycle.length];
    applyImgFit(target.img, next);
    storeRef.current.set(fitKey, next);
    // Force re-render to update label
    setImageTargets((prev) => [...prev]);
  }, [id]);

  const handleReset = useCallback((target) => {
    if (!target.img) return;
    applyImgXform(target.img, null);
    applyImgFit(target.img, null);
    storeRef.current.set(`p${id}:imgxform:${target.key}`, { x: 0, y: 0, scale: 1 });
    storeRef.current.set(`p${id}:imgfit:${target.key}`, '');
    setImageTargets((prev) => [...prev]);
  }, [id]);

  // Attach drag-to-pan handlers directly on the <img> elements inside the
  // iframe so text overlays (captions on top of images) still receive their
  // own clicks. Re-attaches whenever imageTargets changes.
  useEffect(() => {
    if (!editMode) return;
    const cleanups = [];
    imageTargets.forEach((t) => {
      const img = t.img;
      if (!img) return;
      const xfKey = `p${id}:imgxform:${t.key}`;
      img.style.cursor = 'grab';
      img.draggable = false;
      const onDown = (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        const startXf = storeRef.current.get(xfKey) || { x: 0, y: 0, scale: 1 };
        if (startXf.scale === 1) startXf.scale = 1.2;
        const startX = e.clientX; const startY = e.clientY;
        img.style.cursor = 'grabbing';
        const move = (ev) => {
          const cur = { x: (Number(startXf.x) || 0) + (ev.clientX - startX), y: (Number(startXf.y) || 0) + (ev.clientY - startY), scale: Number(startXf.scale) || 1 };
          applyImgXform(img, cur);
        };
        const up = (ev) => {
          img.style.cursor = 'grab';
          const cur = { x: (Number(startXf.x) || 0) + (ev.clientX - startX), y: (Number(startXf.y) || 0) + (ev.clientY - startY), scale: Number(startXf.scale) || 1 };
          applyImgXform(img, cur);
          storeRef.current.set(xfKey, cur);
          const iframeDoc = iframeRef.current?.contentDocument;
          if (iframeDoc) {
            iframeDoc.removeEventListener('mousemove', move, true);
            iframeDoc.removeEventListener('mouseup', up, true);
          }
        };
        const iframeDoc = iframeRef.current?.contentDocument;
        if (iframeDoc) {
          iframeDoc.addEventListener('mousemove', move, true);
          iframeDoc.addEventListener('mouseup', up, true);
        }
      };
      img.addEventListener('mousedown', onDown, true);
      cleanups.push(() => {
        img.removeEventListener('mousedown', onDown, true);
        img.style.cursor = '';
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [editMode, imageTargets, id]);

  // Legacy drag handler (kept as no-op — replaced by iframe-side listener).
  const handleDragStart = useCallback((target, e) => {
    if (e.button !== 0) return;
    if (!target.img) return;
    e.preventDefault();
    e.stopPropagation();
    const xfKey = `p${id}:imgxform:${target.key}`;
    const startXf = storeRef.current.get(xfKey) || { x: 0, y: 0, scale: 1 };
    if (startXf.scale === 1) startXf.scale = 1.2;
    const startX = e.clientX;
    const startY = e.clientY;
    const onMove = (ev) => {
      // Convert screen delta to iframe coords (divide by scale)
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;
      const cur = { x: (Number(startXf.x) || 0) + dx, y: (Number(startXf.y) || 0) + dy, scale: Number(startXf.scale) || 1 };
      applyImgXform(target.img, cur);
    };
    const onUp = (ev) => {
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;
      const cur = { x: (Number(startXf.x) || 0) + dx, y: (Number(startXf.y) || 0) + dy, scale: Number(startXf.scale) || 1 };
      applyImgXform(target.img, cur);
      storeRef.current.set(xfKey, cur);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [id, scale]);

  return (
    <div ref={wrapRef} className="slide-frame" id={`page-${String(id).padStart(2, '0')}`}>
      <div ref={innerRef} className="slide-frame-inner" style={{ height: SLIDE_H * scale, position: 'relative' }}>
        <iframe
          ref={iframeRef}
          className="slide-canvas"
          srcDoc={patchedHtml}
          title={`Page ${id}`}
          style={{
            width: SLIDE_W,
            height: SLIDE_H,
            border: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            background: '#fff',
            display: 'block',
          }}
        />
        {editMode && imageTargets.map((t) => {
          const { key, rect } = t;
          const fit = storeRef.current.get(`p${id}:imgfit:${key}`) || 'cover';
          const left = rect.left * scale;
          const top = rect.top * scale;
          const width = rect.width * scale;
          const height = rect.height * scale;
          return (
            <React.Fragment key={key}>
              {/* Visual outline only — pointer-events:none so text/buttons
                  inside the iframe still receive clicks. Drag-to-pan is
                  attached directly on the <img> inside the iframe. */}
              <div
                style={{
                  position: 'absolute',
                  left, top, width, height,
                  outline: '2px dashed rgba(74,158,255,0.7)',
                  outlineOffset: '-2px',
                  zIndex: 50,
                  pointerEvents: 'none',
                }}
              />
              {/* Toolbar — fixed to top-left of image */}
              <div
                style={{
                  position: 'absolute',
                  left: left + 4,
                  top: top + 4,
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  pointerEvents: 'auto',
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div style={{ display: 'flex', gap: 3 }}>
                  <button style={btnStyle('#4a9eff', '#fff')} onClick={() => handleFileReplace(t)} title="ファイル選択">📁</button>
                  <button style={btnStyle('#4a9eff', '#fff')} onClick={() => handleUrlReplace(t)} title="URL指定">🔗 URL</button>
                </div>
                <div style={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button style={btnStyle('#fb923c', '#0a0a0f')} onClick={() => handleZoom(t, 0.05)} title="ズームイン">＋</button>
                  <button style={btnStyle('#fb923c', '#0a0a0f')} onClick={() => handleZoom(t, -0.05)} title="ズームアウト">－</button>
                  <button style={btnStyle('#fb923c', '#0a0a0f')} onClick={() => handleFitCycle(t)} title="フィット切替">⛶</button>
                  <span style={{ fontSize: 9, color: '#fb923c', fontWeight: 700 }}>{fit}</span>
                  <button style={btnStyle('#fb923c', '#0a0a0f')} onClick={() => handleReset(t)} title="リセット">↺</button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function btnStyle(bg, fg) {
  return {
    padding: '3px 8px',
    background: bg,
    color: fg,
    border: 0,
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
    lineHeight: 1,
    minWidth: 26,
    userSelect: 'none',
  };
}
