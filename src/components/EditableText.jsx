import React, { useEffect, useRef } from 'react';
import { useEditStore } from '../utils/editStore';

/**
 * Editable text block. In edit mode it's contentEditable.
 * Persists user edits to localStorage keyed by `id`.
 *
 * Pass children as the *default* content (string or JSX with markup).
 * Pass `as` to render a different tag (default: div).
 */
export default function EditableText({ id, as = 'div', editMode, style, className, children, html: defaultHtml }) {
  const ref = useRef(null);
  const Tag = as;
  const { get, set } = useEditStore();
  const stored = get(`text:${id}`);

  // Build initial HTML from either explicit `html` or stringified children
  const baseHtml = defaultHtml ?? (typeof children === 'string' ? children : null);
  const initialHtml = stored ?? baseHtml;

  useEffect(() => {
    if (initialHtml != null && ref.current && ref.current.innerHTML !== initialHtml) {
      ref.current.innerHTML = initialHtml;
    }
  }, [initialHtml]);

  const onBlur = () => {
    if (!ref.current) return;
    set(`text:${id}`, ref.current.innerHTML);
  };

  // If we have HTML content, use innerHTML; otherwise render children
  if (initialHtml != null) {
    return (
      <Tag
        ref={ref}
        className={`editable ${className || ''}`}
        contentEditable={editMode}
        suppressContentEditableWarning
        onBlur={onBlur}
        style={style}
      />
    );
  }

  return (
    <Tag
      ref={ref}
      className={`editable ${className || ''}`}
      contentEditable={editMode}
      suppressContentEditableWarning
      onBlur={onBlur}
      style={style}
    >
      {children}
    </Tag>
  );
}
