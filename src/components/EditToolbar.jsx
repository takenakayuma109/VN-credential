import React, { useState } from 'react';

const FONTS = [
  'Inter',
  'Poppins',
  'Noto Sans JP',
  'Georgia',
  'Courier New',
];

const SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '42px', '48px', '56px', '64px'];

export default function EditToolbar() {
  const [font, setFont] = useState('Inter');
  const [size, setSize] = useState('16px');
  const [color, setColor] = useState('#f0f0f5');

  const applyStyle = (prop, value) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement('span');
    span.style[prop] = value;
    range.surroundContents(span);
  };

  const execCmd = (cmd, value) => {
    document.execCommand(cmd, false, value);
  };

  return (
    <div className="edit-toolbar">
      <select
        value={font}
        onChange={(e) => {
          setFont(e.target.value);
          applyStyle('fontFamily', e.target.value);
        }}
      >
        {FONTS.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>

      <select
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
          applyStyle('fontSize', e.target.value);
        }}
      >
        {SIZES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <input
        type="color"
        className="color-picker"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          applyStyle('color', e.target.value);
        }}
        title="Text Color"
      />

      <button onClick={() => execCmd('bold')} title="Bold"><b>B</b></button>
      <button onClick={() => execCmd('italic')} title="Italic"><i>I</i></button>
      <button onClick={() => execCmd('underline')} title="Underline"><u>U</u></button>

      <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 0.3rem' }} />

      <button onClick={() => execCmd('justifyLeft')} title="Align Left">L</button>
      <button onClick={() => execCmd('justifyCenter')} title="Align Center">C</button>
      <button onClick={() => execCmd('justifyRight')} title="Align Right">R</button>
    </div>
  );
}
