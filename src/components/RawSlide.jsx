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
 */
export default function RawSlide({ id, html, editMode, pageNumber }) {
  const wrapRef = useRef(null);
  const iframeRef = useRef(null);
  const [scale, setScale] = useState(1);
  const { get, set } = useEditStore();

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
  };

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

  // Inject <base href> so relative paths resolve against the parent origin.
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

      // 1) restore persisted edits
      const allEdits = JSON.parse(localStorage.getItem('visionoid_credential_edits_v1') || '{}');
      Object.keys(allEdits).forEach((k) => {
        if (k.startsWith(`p${id}:text:`)) {
          const objId = k.replace(`p${id}:text:`, '');
          const el = doc.getElementById(objId);
          if (el) el.innerHTML = allEdits[k];
        } else if (k.startsWith(`p${id}:img:`) && !k.includes('imgxform') && !k.includes('imgfit')) {
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

      // 2) textbox editing
      const textboxes = doc.querySelectorAll('[data-object-type="textbox"]');
      textboxes.forEach((tb) => {
        if (!tb.id) return;
        // Skip textboxes that contain image elements — don't make them
        // contentEditable because that swallows clicks on nested images.
        const hasImages = tb.querySelector('[data-object-type="image"]');
        if (hasImages) {
          tb.contentEditable = 'false';
          tb.style.cursor = '';
          tb.style.outline = '';
          return;
        }
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

      // 3) Image editing
      // Clean up any previous overlays
      doc.querySelectorAll('[data-img-overlay]').forEach((o) => o.remove());

      const images = doc.querySelectorAll('[data-object-type="image"]');
      images.forEach((wrap) => {
        if (!wrap.id) return;

        // Walk up the DOM to find the card container (the flex:1 div with
        // overflow:hidden and border-radius). We need to toggle its
        // overflow in edit mode so the overlay buttons aren't clipped.
        const card = wrap.closest('[style*="overflow"]') || wrap.parentElement;

        if (editMode) {
          wrap.style.outline = '2px dashed rgba(74,158,255,0.6)';
          wrap.style.overflow = 'visible';
          if (card && card !== wrap) card.style.overflow = 'visible';
        } else {
          wrap.style.outline = '';
          wrap.style.overflow = 'hidden';
          if (card && card !== wrap) card.style.overflow = 'hidden';
          return; // No overlay in view mode
        }

        // Ensure the image wrapper is a positioning context
        if (getComputedStyle(wrap).position === 'static') {
          wrap.style.position = 'relative';
        }

        const overlay = doc.createElement('div');
        overlay.setAttribute('data-img-overlay', wrap.id);
        overlay.contentEditable = 'false';
        overlay.style.cssText = [
          'position:absolute',
          'top:6px',
          'left:6px',
          'display:flex',
          'flex-direction:column',
          'align-items:flex-start',
          'gap:4px',
          'z-index:99999',
          'pointer-events:auto',
        ].join(';');

        // Row 1: file + URL buttons
        const row1 = doc.createElement('div');
        row1.contentEditable = 'false';
        row1.style.cssText = 'display:flex;gap:4px;';

        const btn = (label, handler) => {
          const b = doc.createElement('button');
          b.textContent = label;
          b.contentEditable = 'false';
          b.style.cssText = [
            'padding:4px 10px',
            'background:rgba(74,158,255,0.95)',
            'color:#fff',
            'border:0',
            'border-radius:4px',
            'font-size:11px',
            'font-weight:700',
            'cursor:pointer',
            'box-shadow:0 2px 8px rgba(0,0,0,0.5)',
            'font-family:-apple-system,BlinkMacSystemFont,sans-serif',
            'pointer-events:auto',
            'user-select:none',
          ].join(';');
          b.addEventListener('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); });
          b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); handler(); });
          return b;
        };

        // Compress uploaded images
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
          const img = wrap.querySelector('img');
          if (img) {
            img.src = src;
            applyImgFit(img, 'cover');
          }
          set(`p${id}:img:${wrap.id}`, src);
          set(`p${id}:imgfit:${wrap.id}`, 'cover');
        };

        row1.appendChild(btn('📁', () => {
          const input = doc.createElement('input');
          input.type = 'file'; input.accept = 'image/*';
          input.onchange = async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            try {
              const compressed = await compressFileToDataUrl(f);
              await persist(compressed);
            } catch (err) {
              window.alert('画像の読み込みに失敗しました: ' + (err?.message || err));
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
        overlay.appendChild(row1);

        // Pan / zoom controls
        const xfKey = `p${id}:imgxform:${wrap.id}`;
        const fitKey = `p${id}:imgfit:${wrap.id}`;
        const getXf = () => {
          const cur = get(xfKey);
          if (cur && typeof cur === 'object') {
            return { x: Number(cur.x) || 0, y: Number(cur.y) || 0, scale: Number(cur.scale) || 1 };
          }
          return { x: 0, y: 0, scale: 1 };
        };
        const nudge = (dx, dy, ds) => {
          const img = wrap.querySelector('img');
          if (!img) return;
          const cur = getXf();
          if (cur.scale === 1 && ds === 0) cur.scale = 1.2;
          cur.x += dx;
          cur.y += dy;
          cur.scale = Math.max(0.2, Math.min(5, cur.scale + ds));
          applyImgXform(img, cur);
          set(xfKey, cur);
        };

        const FIT_CYCLE = ['cover', 'contain', 'fill'];
        const cycleFit = () => {
          const img = wrap.querySelector('img');
          if (!img) return;
          const cur = get(fitKey) || 'cover';
          const idx = FIT_CYCLE.indexOf(cur);
          const next = FIT_CYCLE[(idx + 1) % FIT_CYCLE.length];
          applyImgFit(img, next);
          set(fitKey, next);
          const label = overlay.querySelector('[data-fit-label]');
          if (label) label.textContent = next;
        };
        const resetXf = () => {
          const img = wrap.querySelector('img');
          if (img) {
            applyImgXform(img, null);
            applyImgFit(img, null);
          }
          set(xfKey, { x: 0, y: 0, scale: 1 });
          set(fitKey, '');
          const label = overlay.querySelector('[data-fit-label]');
          if (label) label.textContent = 'cover';
        };

        // Row 2: zoom, fit, reset, drag hint
        const row2 = doc.createElement('div');
        row2.contentEditable = 'false';
        row2.style.cssText = 'display:flex;gap:4px;align-items:center;flex-wrap:wrap;';

        const smallBtn = (label, title, handler) => {
          const b = doc.createElement('button');
          b.textContent = label;
          b.title = title;
          b.contentEditable = 'false';
          b.style.cssText = [
            'padding:4px 10px',
            'background:rgba(251,146,60,0.95)',
            'color:#0a0a0f',
            'border:0',
            'border-radius:4px',
            'font-size:13px',
            'font-weight:900',
            'cursor:pointer',
            'box-shadow:0 2px 8px rgba(0,0,0,0.6)',
            'font-family:-apple-system,BlinkMacSystemFont,sans-serif',
            'line-height:1',
            'min-width:28px',
            'pointer-events:auto',
            'user-select:none',
          ].join(';');
          b.addEventListener('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); });
          b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); handler(); });
          return b;
        };

        row2.appendChild(smallBtn('＋', 'ズームイン', () => nudge(0, 0, 0.05)));
        row2.appendChild(smallBtn('－', 'ズームアウト', () => nudge(0, 0, -0.05)));
        row2.appendChild(smallBtn('⛶', 'フィット切替', cycleFit));

        const fitLabel = doc.createElement('span');
        fitLabel.setAttribute('data-fit-label', '1');
        fitLabel.textContent = get(fitKey) || 'cover';
        fitLabel.style.cssText = 'font-size:10px;color:rgba(251,146,60,0.9);font-weight:600;font-family:-apple-system,sans-serif;';
        row2.appendChild(fitLabel);

        row2.appendChild(smallBtn('↺', 'リセット', resetXf));

        const dragHint = doc.createElement('span');
        dragHint.textContent = '✋ ドラッグでパン';
        dragHint.style.cssText = 'font-size:10px;color:rgba(251,146,60,0.9);font-weight:600;padding:3px 8px;background:rgba(0,0,0,0.5);border-radius:4px;white-space:nowrap;font-family:-apple-system,sans-serif;pointer-events:none;';
        row2.appendChild(dragHint);

        overlay.appendChild(row2);

        // Append overlay directly inside the image wrapper
        wrap.appendChild(overlay);

        // Drag-to-pan on image
        const imgEl = wrap.querySelector('img');
        if (imgEl) {
          imgEl.style.cursor = 'grab';
          imgEl.draggable = false; // prevent native drag
          let dragging = false;
          let startX = 0, startY = 0;
          let startXf = { x: 0, y: 0, scale: 1 };

          const onMouseDown = (e) => {
            if (e.button !== 0) return;
            // Don't start drag if clicking on overlay buttons
            if (e.target.closest('[data-img-overlay]')) return;
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
            const cur = { x: startXf.x + (e.clientX - startX), y: startXf.y + (e.clientY - startY), scale: startXf.scale };
            applyImgXform(imgEl, cur);
          };
          const onMouseUp = (e) => {
            if (!dragging) return;
            dragging = false;
            imgEl.style.cursor = 'grab';
            const cur = { x: startXf.x + (e.clientX - startX), y: startXf.y + (e.clientY - startY), scale: startXf.scale };
            applyImgXform(imgEl, cur);
            set(xfKey, cur);
            doc.removeEventListener('mousemove', onMouseMove, true);
            doc.removeEventListener('mouseup', onMouseUp, true);
          };
          imgEl.addEventListener('mousedown', onMouseDown, true);
        }
      });
    };

    // Use a small delay to ensure the iframe DOM is fully ready
    const trySetup = () => {
      const doc = iframe.contentDocument;
      if (doc && doc.readyState === 'complete') {
        setup();
      } else {
        iframe.addEventListener('load', setup, { once: true });
      }
    };

    // When editMode changes, the iframe is already loaded but we need to
    // re-run setup. Use rAF to ensure the DOM is settled.
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      requestAnimationFrame(setup);
    } else {
      iframe.addEventListener('load', () => requestAnimationFrame(setup), { once: true });
    }

    return () => {
      // Cleanup: remove overlays if they exist
      try {
        const doc = iframe.contentDocument;
        if (doc) {
          doc.querySelectorAll('[data-img-overlay]').forEach((o) => o.remove());
        }
      } catch {}
    };
  }, [editMode, html, id, set, get]);

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
