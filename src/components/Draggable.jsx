import React, { useState, useRef, useEffect } from 'react';
import { useEditStore } from '../utils/editStore';

/**
 * Wraps any block in an absolutely-positioned, draggable container.
 * Default position is given by `x`, `y`. In edit mode the user can drag
 * the block, and the new offset is persisted to localStorage.
 *
 * The drag distance is divided by the parent .slide-canvas scale so that
 * mouse movement maps 1:1 to logical canvas pixels.
 */
export default function Draggable({ id, x = 0, y = 0, w, h, editMode, children, zIndex, style }) {
  const { get, set } = useEditStore();
  const stored = get(`pos:${id}`);
  const [pos, setPos] = useState(stored || { x, y });
  const dragging = useRef(null);

  useEffect(() => {
    if (!stored) setPos({ x, y });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y]);

  const getScale = (el) => {
    const canvas = el.closest('.slide-canvas');
    if (!canvas) return 1;
    const m = canvas.style.transform.match(/scale\(([\d.]+)\)/);
    return m ? parseFloat(m[1]) : 1;
  };

  const onMouseDown = (e) => {
    if (!editMode) return;
    // Don't initiate drag when clicking on editable text / inputs / buttons / images
    const tag = (e.target.tagName || '').toLowerCase();
    if (e.target.isContentEditable || ['input', 'button', 'textarea', 'select'].includes(tag)) return;
    e.preventDefault();
    const scale = getScale(e.currentTarget);
    dragging.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
      scale,
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    const d = dragging.current;
    if (!d) return;
    const dx = (e.clientX - d.startX) / d.scale;
    const dy = (e.clientY - d.startY) / d.scale;
    setPos({ x: Math.round(d.origX + dx), y: Math.round(d.origY + dy) });
  };

  const onMouseUp = () => {
    if (dragging.current) {
      set(`pos:${id}`, pos);
    }
    dragging.current = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className={`draggable ${editMode ? 'is-editable' : ''}`}
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: w,
        height: h,
        zIndex,
        cursor: editMode ? 'move' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
