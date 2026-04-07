import React, { useEffect, useRef, useState } from 'react';

// Logical canvas size — every page is laid out at 1280×720 (16:9).
// At export time, the canvas is captured at this exact resolution
// so the resulting PDF page is a perfect 16:9 landscape sheet.
export const SLIDE_W = 1280;
export const SLIDE_H = 720;

export default function Slide({ id, pageNumber, totalPages, headerVariant = 'dark', background, children, style }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.clientWidth;
      // fit by width; height follows 16:9
      setScale(w / SLIDE_W);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isDark = headerVariant === 'dark';

  return (
    <div ref={wrapRef} className="slide-frame" id={id}>
      <div
        className="slide-frame-inner"
        style={{ height: SLIDE_H * scale }}
      >
        <div
          className="slide-canvas slide"
          style={{
            transform: `scale(${scale})`,
            width: SLIDE_W,
            height: SLIDE_H,
            background: background || (isDark ? '#0a1224' : '#f4f6fa'),
            ...style,
          }}
        >
          {/* Header bar */}
          <div className={`slide-header ${isDark ? 'dark' : 'light'}`}>
            <div className="slide-header-left">
              <span className="slide-header-logo">VISIONOID</span>
              <span className="slide-header-divider">|</span>
              <span className="slide-header-tagline">Visionary Technology Company</span>
            </div>
            {pageNumber && (
              <div className="slide-header-right">{String(pageNumber).padStart(2, '0')} / {String(totalPages || 26).padStart(2, '0')}</div>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
