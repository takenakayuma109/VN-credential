import React, { useEffect, useRef, useState } from 'react';
import { useEditStore } from '../utils/editStore';

export const SLIDE_W = 1280;
export const SLIDE_H = 720;

/**
 * Renders one Genspark page (full HTML doc) inside an iframe so its
 * styles / fonts / Font Awesome stay 100% isolated and pixel-faithful.
 *
 * After the iframe loads, in edit mode we attach contentEditable handlers
 * to every <p> inside `[data-object-type="textbox"]` and replace handlers
 * to every <img> inside `[data-object-type="image"]`. Edits are persisted
 * to localStorage via the shared editStore, keyed by `pageId + element id`.
 *
 * For PDF export, the parent component sets `data-export="1"` on the wrap
 * which removes the scale transform so html2canvas captures at native res.
 */
export default function RawSlide({ id, html, editMode, pageNumber }) {
  const wrapRef = useRef(null);
  const iframeRef = useRef(null);
  const [scale, setScale] = useState(1);
  const { get, set } = useEditStore();

  // Helper: apply a transform descriptor {x,y,scale} to an <img> so the
  // user can pan / zoom a replaced photo within its frame after swapping.
  const applyImgXform = (img, xf) => {
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
    img.style.willChange = 'transform';
  };

  // Helper: override the <img> object-fit so the user can flip a swapped
  // photo between cover / contain / fill. Caches the original inline
  // object-fit on first call so resetting back restores author's intent.
  const applyImgFit = (img, fit) => {
    if (!img) return;
    if (img.dataset.origObjectFit === undefined) {
      img.dataset.origObjectFit = img.style.objectFit || '';
    }
    if (fit === 'cover' || fit === 'contain' || fit === 'fill') {
      img.style.objectFit = fit;
    } else {
      img.style.objectFit = img.dataset.origObjectFit;
    }
  };

  // Inject <base href> so relative paths (e.g. genspark_images/foo.png)
  // resolve against the parent document's origin instead of about:srcdoc.
  const baseHref = typeof window !== 'undefined'
    ? window.location.href.replace(/[^/]*$/, '')
    : '/';
  const baseTag = `<base href="${baseHref}">`;
  const patchedHtml = html.includes('<head')
    ? html.replace(/<head([^>]*)>/i, `<head$1>${baseTag}`)
    : `<!DOCTYPE html><html><head>${baseTag}</head><body>${html}</body></html>`;

  // Compute scale to fit width
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

  // Apply edits + attach handlers when iframe loads or editMode toggles
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const setup = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      // 1) restore persisted text/image edits
      const allEdits = JSON.parse(localStorage.getItem('visionoid_credential_edits_v1') || '{}');
      Object.keys(allEdits).forEach((k) => {
        if (k.startsWith(`p${id}:text:`)) {
          const objId = k.replace(`p${id}:text:`, '');
          const el = doc.getElementById(objId);
          if (el) el.innerHTML = allEdits[k];
        } else if (k.startsWith(`p${id}:img:`)) {
          const objId = k.replace(`p${id}:img:`, '');
          const el = doc.getElementById(objId);
          if (el) {
            const img = el.tagName === 'IMG' ? el : el.querySelector('img');
            if (img) img.src = allEdits[k];
          }
        } else if (k.startsWith(`p${id}:imgxform:`)) {
          const objId = k.replace(`p${id}:imgxform:`, '');
          const el = doc.getElementById(objId);
          if (el) {
            const img = el.tagName === 'IMG' ? el : el.querySelector('img');
            applyImgXform(img, allEdits[k]);
          }
        } else if (k.startsWith(`p${id}:imgfit:`)) {
          const objId = k.replace(`p${id}:imgfit:`, '');
          const el = doc.getElementById(objId);
          if (el) {
            const img = el.tagName === 'IMG' ? el : el.querySelector('img');
            applyImgFit(img, allEdits[k]);
          }
        }
      });

      // 2) attach edit handlers if in edit mode
      const textboxes = doc.querySelectorAll('[data-object-type="textbox"]');
      textboxes.forEach((tb) => {
        if (!tb.id) return;
        tb.contentEditable = editMode ? 'true' : 'false';
        tb.style.cursor = editMode ? 'text' : '';
        if (editMode) {
          tb.style.outline = '1px dashed rgba(74,158,255,0.4)';
          tb.onblur = () => {
            set(`p${id}:text:${tb.id}`, tb.innerHTML);
          };
        } else {
          tb.style.outline = '';
          tb.onblur = null;
        }
      });

      // 3) Image editing — file replace, fit toggle, pan/zoom
      // Remove any previous overlays from body
      const oldOverlays = doc.querySelectorAll('[data-img-overlay]');
      oldOverlays.forEach((o) => o.remove());

      const images = doc.querySelectorAll('[data-object-type="image"]');
      images.forEach((wrap) => {
        if (!wrap.id) return;
        wrap.style.outline = editMode ? '1px dashed rgba(74,158,255,0.4)' : '';
        if (!editMode) return;

        // Mount overlay on <body> with position:fixed to escape z-index stacking
        const overlay = doc.createElement('div');
        overlay.setAttribute('data-img-overlay', wrap.id);
        overlay.contentEditable = 'false';
        const rect = wrap.getBoundingClientRect();
        const top = Math.max(rect.top + 6, 34);
        const left = rect.left + 6;
        overlay.style.cssText = [
          'position:fixed',
          `top:${top}px`,
          `left:${left}px`,
          'display:flex',
          'flex-direction:column',
          'align-items:flex-start',
          'gap:4px',
          'z-index:2147483647',
          'pointer-events:auto',
        ].join(';');

        // Row 1: primary buttons (📁 / 🔗 URL)
        const row1 = doc.createElement('div');
        row1.contentEditable = 'false';
        row1.style.cssText = 'display:flex;gap:4px;';

        const btn = (label, handler) => {
          const b = doc.createElement('button');
          b.textContent = label;
          b.contentEditable = 'false';
          b.style.cssText = 'padding:4px 10px;background:rgba(74,158,255,0.98);color:#fff;border:0;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.5);font-family:-apple-system,BlinkMacSystemFont,sans-serif;';
          b.addEventListener('mousedown', (e) => e.preventDefault());
          b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); handler(); };
          return b;
        };

        // Compress uploaded images to fit slide canvas at 2x density
        const compressFileToDataUrl = (file) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = () => reject(reader.error || new Error('FileReader failed'));
          reader.onload = (ev) => {
            const raw = ev.target.result;
            const img2 = new Image();
            img2.onload = () => {
              try {
                const MAX_W = 1600;
                const MAX_H = 900;
                let w = img2.naturalWidth || img2.width;
                let h = img2.naturalHeight || img2.height;
                const ratio = Math.min(MAX_W / w, MAX_H / h, 1);
                w = Math.round(w * ratio);
                h = Math.round(h * ratio);
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img2, 0, 0, w, h);
                resolve(canvas.toDataURL('image/jpeg', 0.82));
              } catch (e) {
                resolve(raw);
              }
            };
            img2.onerror = () => resolve(raw);
            img2.src = raw;
          };
          reader.readAsDataURL(file);
        });

        // Persist image replacement
        const persist = async (src) => {
          const img = wrap.tagName === 'IMG' ? wrap : wrap.querySelector('img');
          if (img) img.src = src;
          const key = `p${id}:img:${wrap.id}`;
          const fitK = `p${id}:imgfit:${wrap.id}`;
          if (img) applyImgFit(img, 'cover');
          set(fitK, 'cover');
          set(key, src);
        };

        overlay.appendChild(row1);
        row1.appendChild(btn('📁', () => {
          const input = doc.createElement('input');
          input.type = 'file'; input.accept = 'image/*';
          input.onchange = async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            try {
              const compressed = await compressFileToDataUrl(f);
              await persist(compressed);
            } catch (err) {
              window.alert('画像の読み込みに失敗しました: ' + (err && err.message ? err.message : err));
            }
          };
          input.click();
        }));
        row1.appendChild(btn('🔗 URL', async () => {
          const url = window.prompt('画像URL（Drive 共有リンクOK）:');
          if (!url) return;
          let direct = url;
          const m = url.match(/\/d\/([\w-]+)/);
          if (m) direct = `https://drive.google.com/uc?export=view&id=${m[1]}`;
          await persist(direct);
        }));

        // ---- Pan / zoom controls ------------------------------------------
        const xfKey = `p${id}:imgxform:${wrap.id}`;
        const getXf = () => {
          const cur = get(xfKey);
          if (cur && typeof cur === 'object') {
            return { x: Number(cur.x) || 0, y: Number(cur.y) || 0, scale: Number(cur.scale) || 1 };
          }
          return { x: 0, y: 0, scale: 1 };
        };
        const nudge = (dx, dy, ds) => {
          const img = wrap.tagName === 'IMG' ? wrap : wrap.querySelector('img');
          if (!img) return;
          const cur = getXf();
          if (cur.scale === 1 && ds === 0) cur.scale = 1.2;
          cur.x += dx;
          cur.y += dy;
          cur.scale = Math.max(0.2, Math.min(5, cur.scale + ds));
          applyImgXform(img, cur);
          set(xfKey, cur);
        };

        // Fit-mode toggle: cycles cover → contain → fill
        const fitKey = `p${id}:imgfit:${wrap.id}`;
        const FIT_CYCLE = ['cover', 'contain', 'fill'];
        const FIT_LABELS = { cover: 'cover', contain: 'contain', fill: 'fill' };
        const cycleFit = () => {
          const img = wrap.tagName === 'IMG' ? wrap : wrap.querySelector('img');
          if (!img) return;
          const cur = get(fitKey) || 'cover';
          const idx = FIT_CYCLE.indexOf(cur);
          const next = FIT_CYCLE[(idx + 1) % FIT_CYCLE.length];
          applyImgFit(img, next);
          set(fitKey, next);
          const label = overlay.querySelector('[data-fit-label]');
          if (label) label.textContent = FIT_LABELS[next] || next;
        };
        const resetXf = () => {
          const img = wrap.tagName === 'IMG' ? wrap : wrap.querySelector('img');
          if (img) {
            applyImgXform(img, null);
            applyImgFit(img, null);
          }
          set(xfKey, { x: 0, y: 0, scale: 1 });
          set(fitKey, '');
        };

        // Row 2: zoom +/-, fit toggle, reset, drag hint
        const row2 = doc.createElement('div');
        row2.contentEditable = 'false';
        row2.style.cssText = 'display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;align-items:center;';
        const smallBtn = (label, title, handler) => {
          const b = doc.createElement('button');
          b.textContent = label;
          b.title = title;
          b.contentEditable = 'false';
          b.style.cssText = 'padding:5px 11px;background:rgba(251,146,60,0.98);color:#0a0a0f;border:0;border-radius:4px;font-size:13px;font-weight:900;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.6);font-family:-apple-system,BlinkMacSystemFont,sans-serif;line-height:1;min-width:28px;';
          b.addEventListener('mousedown', (e) => e.preventDefault());
          b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); handler(); };
          return b;
        };
        const SCALE_STEP = 0.05;
        row2.appendChild(smallBtn('＋', 'ズームイン', () => nudge(0, 0, SCALE_STEP)));
        row2.appendChild(smallBtn('－', 'ズームアウト', () => nudge(0, 0, -SCALE_STEP)));

        const fitBtn = smallBtn('⛶', 'フィット切替（cover / contain / fill）', cycleFit);
        row2.appendChild(fitBtn);
        const fitLabel = doc.createElement('span');
        fitLabel.setAttribute('data-fit-label', '1');
        fitLabel.textContent = FIT_LABELS[get(fitKey) || 'cover'] || 'cover';
        fitLabel.style.cssText = 'font-size:10px;color:rgba(251,146,60,0.85);font-weight:600;margin-right:2px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;';
        row2.appendChild(fitLabel);

        row2.appendChild(smallBtn('↺', 'リセット', resetXf));

        const dragHint = doc.createElement('span');
        dragHint.textContent = '✋ ドラッグでパン';
        dragHint.style.cssText = 'font-size:10px;color:rgba(251,146,60,0.85);font-weight:600;padding:3px 8px;background:rgba(0,0,0,0.5);border-radius:4px;pointer-events:none;white-space:nowrap;font-family:-apple-system,BlinkMacSystemFont,sans-serif;';
        row2.appendChild(dragHint);

        overlay.appendChild(row2);

        // ---- Drag-to-pan on the image ---
        const imgEl = wrap.tagName === 'IMG' ? wrap : wrap.querySelector('img');
        if (imgEl) {
          imgEl.style.cursor = 'grab';
          let dragging = false;
          let startX = 0, startY = 0;
          let startXf = { x: 0, y: 0, scale: 1 };

          const onMouseDown = (e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            e.stopPropagation();
            dragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startXf = { ...getXf() };
            if (startXf.scale === 1) startXf.scale = 1.2;
            imgEl.style.cursor = 'grabbing';
            doc.addEventListener('mousemove', onMouseMove, true);
            doc.addEventListener('mouseup', onMouseUp, true);
          };
          const onMouseMove = (e) => {
            if (!dragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const cur = { x: startXf.x + dx, y: startXf.y + dy, scale: startXf.scale };
            applyImgXform(imgEl, cur);
          };
          const onMouseUp = (e) => {
            if (!dragging) return;
            dragging = false;
            imgEl.style.cursor = 'grab';
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const cur = { x: startXf.x + dx, y: startXf.y + dy, scale: startXf.scale };
            applyImgXform(imgEl, cur);
            set(xfKey, cur);
            doc.removeEventListener('mousemove', onMouseMove, true);
            doc.removeEventListener('mouseup', onMouseUp, true);
          };
          imgEl.addEventListener('mousedown', onMouseDown, true);
        }

        doc.body.appendChild(overlay);
      });
    };

    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      setup();
    } else {
      iframe.addEventListener('load', setup);
      return () => iframe.removeEventListener('load', setup);
    }
  }, [editMode, html, id, set]);

  return (
    <div ref={wrapRef} className="slide-frame" id={`page-${String(id).padStart(2, '0')}`}>
      <div className="slide-frame-inner" style={{ height: SLIDE_H * scale }}>
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
      </div>
    </div>
  );
}
