import React, { useState, useRef } from 'react';
import { useEditStore } from '../utils/editStore';

export default function EditableImage({ id, src, alt, style, className, editMode, imgStyle, fit = 'cover' }) {
  const { get, set } = useEditStore();
  const stored = id ? get(`img:${id}`) : null;
  const [currentSrc, setCurrentSrc] = useState(stored || src);
  const fileRef = useRef(null);

  const persist = (next) => {
    setCurrentSrc(next);
    if (id) set(`img:${id}`, next);
  };

  const handleReplace = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => persist(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleDriveUrl = () => {
    const url = prompt('画像URL（Google Drive 共有リンク or 直URL）:');
    if (!url) return;
    let direct = url;
    const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) direct = `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
    persist(direct);
  };

  return (
    <div className={`editable-image-wrap ${className || ''}`} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <img
        src={currentSrc}
        alt={alt || ''}
        style={{ width: '100%', height: '100%', objectFit: fit, display: 'block', ...imgStyle }}
      />
      {editMode && (
        <div className="img-edit-controls">
          <button onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>📁 File</button>
          <button onClick={(e) => { e.stopPropagation(); handleDriveUrl(); }}>🔗 URL</button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleReplace} />
        </div>
      )}
    </div>
  );
}
