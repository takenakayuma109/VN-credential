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

      const images = doc.querySelectorAll('[data-object-type="image"]');
      images.forEach((wrap) => {
        if (!wrap.id) return;
        // Remove any old overlay
        const old = wrap.querySelector('.__edit-overlay');
        if (old) old.remove();
        wrap.style.outline = editMode ? '1px dashed rgba(74,158,255,0.4)' : '';
        if (!editMode) return;

        const overlay = doc.createElement('div');
        overlay.className = '__edit-overlay';
        overlay.style.cssText = 'position:absolute;top:4px;left:4px;display:flex;gap:4px;z-index:9999;';
        const btn = (label, handler) => {
          const b = doc.createElement('button');
          b.textContent = label;
          b.style.cssText = 'padding:3px 8px;background:rgba(74,158,255,0.95);color:#fff;border:0;border-radius:3px;font-size:10px;font-weight:700;cursor:pointer;';
          b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); handler(); };
          return b;
        };
        const persist = (src) => {
          const img = wrap.tagName === 'IMG' ? wrap : wrap.querySelector('img');
          if (img) img.src = src;
          set(`p${id}:img:${wrap.id}`, src);
        };
        overlay.appendChild(btn('📁', () => {
          const input = doc.createElement('input');
          input.type = 'file'; input.accept = 'image/*';
          input.onchange = (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            const r = new FileReader();
            r.onload = (ev) => persist(ev.target.result);
            r.readAsDataURL(f);
          };
          input.click();
        }));
        overlay.appendChild(btn('🔗 URL', () => {
          const url = window.prompt('画像URL（Drive 共有リンクOK）:');
          if (!url) return;
          let direct = url;
          const m = url.match(/\/d\/([\w-]+)/);
          if (m) direct = `https://drive.google.com/uc?export=view&id=${m[1]}`;
          persist(direct);
        }));
        if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
        wrap.appendChild(overlay);
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
