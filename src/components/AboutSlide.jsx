import React from 'react';

export default function AboutSlide({ t, editMode }) {
  const a = t.about;
  return (
    <div id="about" className="slide">
      <div className="slide-inner">
        <div className="flex-row" style={{ height: '100%', alignItems: 'center' }}>
          <div className="flex-1">
            <span className="section-label">{a.sectionTitle}</span>
            <h2 className="heading-lg editable" contentEditable={editMode} suppressContentEditableWarning>
              {a.title}
            </h2>
            <div className="divider" />
            <p className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '1.5vw', fontStyle: 'italic' }}>
              {a.oneLiner}
            </p>
            <p className="body-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '2vw', maxWidth: '90%' }}>
              {a.description}
            </p>
            <div className="grid-3" style={{ gap: '1.5vw' }}>
              {[
                { title: a.highlight1Title, desc: a.highlight1Desc, icon: '01' },
                { title: a.highlight2Title, desc: a.highlight2Desc, icon: '02' },
                { title: a.highlight3Title, desc: a.highlight3Desc, icon: '03' },
              ].map((item, i) => (
                <div key={i} className="card" style={{ padding: '1.5vw' }}>
                  <div className="strength-icon" style={{ marginBottom: '0.8vw', width: '2.5vw', height: '2.5vw', minWidth: '32px', minHeight: '32px', fontSize: 'clamp(0.6rem, 0.8vw, 0.9rem)' }}>{item.icon}</div>
                  <h4 className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '0.4vw', fontSize: 'clamp(0.85rem, 1vw, 1.1rem)' }}>
                    {item.title}
                  </h4>
                  <p className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: '1.5vw' }}>
            <div className="card" style={{ padding: '1.5vw' }}>
              <span className="badge-accent badge" style={{ marginBottom: '0.8vw', display: 'inline-block' }}>Entertainment</span>
              <h4 className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(0.8rem, 0.9vw, 1rem)', marginBottom: '0.5vw' }}>
                {a.entertainmentLabel}
              </h4>
              <p className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning>
                {a.entertainmentItems}
              </p>
            </div>
            <div className="card" style={{ padding: '1.5vw' }}>
              <span className="badge-accent badge" style={{ marginBottom: '0.8vw', display: 'inline-block', background: 'linear-gradient(135deg, #34d399, #059669)' }}>Industrial</span>
              <h4 className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(0.8rem, 0.9vw, 1rem)', marginBottom: '0.5vw' }}>
                {a.industrialLabel}
              </h4>
              <p className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning>
                {a.industrialItems}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
