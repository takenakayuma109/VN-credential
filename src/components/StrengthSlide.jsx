import React from 'react';

const ICONS = ['T', 'F', 'C', 'P', 'S', 'I'];

export default function StrengthSlide({ t, editMode }) {
  const s = t.strength;

  return (
    <div id="strength" className="slide">
      <div className="slide-inner">
        <span className="section-label">{s.sectionTitle}</span>
        <div className="flex-row" style={{ height: '85%', alignItems: 'center' }}>
          <div style={{ width: '45%' }}>
            <h2 className="heading-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '1vw' }}>
              {s.title}
            </h2>
            <div className="divider" />
            <div className="card-glass" style={{ padding: '2vw', marginTop: '1.5vw' }}>
              <h3 className="heading-md gradient-text editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '0.8vw' }}>
                {s.mainStrength}
              </h3>
              <p className="body-md editable" contentEditable={editMode} suppressContentEditableWarning>
                {s.mainDesc}
              </p>
            </div>
            <div className="card" style={{ padding: '1.5vw', marginTop: '1.5vw' }}>
              <h4 className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(0.8rem, 0.9vw, 1rem)', marginBottom: '0.5vw' }}>
                {s.competitiveTitle}
              </h4>
              <p className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning>
                {s.competitiveText}
              </p>
            </div>
          </div>
          <div style={{ width: '55%' }}>
            <div className="grid-2" style={{ gap: '1.2vw' }}>
              {s.items.map((item, i) => (
                <div key={i} className="card" style={{ padding: '1.5vw', display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                  <div className="strength-icon">{ICONS[i]}</div>
                  <div>
                    <h4 className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(0.85rem, 1vw, 1.1rem)', marginBottom: '0.3vw' }}>
                      {item.title}
                    </h4>
                    <p className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
