import React from 'react';

export default function FoundersSlide({ t, editMode }) {
  const f = t.founders;

  return (
    <div id="founders" className="slide">
      <div className="slide-inner">
        <span className="section-label">{f.sectionTitle}</span>
        <div className="flex-row" style={{ height: '90%', alignItems: 'stretch', marginTop: '0.5vw' }}>
          {/* Origin + Tech Conditions */}
          <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: '1.5vw' }}>
            <div className="card-glass" style={{ padding: '1.5vw', flex: 1 }}>
              <div className="badge" style={{ marginBottom: '0.8vw' }}>{f.originTitle}</div>
              <h3 className="heading-md editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '0.8vw', fontSize: 'clamp(1rem, 1.3vw, 1.5rem)' }}>
                {f.originText}
              </h3>
              <p className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning>
                {f.originDesc}
              </p>
            </div>
            <div className="card" style={{ padding: '1.5vw' }}>
              <h4 className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.9rem)', marginBottom: '0.8vw' }}>
                {f.techConditions.title}
              </h4>
              {[f.techConditions.item1, f.techConditions.item2, f.techConditions.item3].map((item, i) => (
                <div key={i} className="opportunity-item" style={{ padding: '0.3vw 0' }}>
                  <div className="strength-icon" style={{ width: '1.8vw', height: '1.8vw', minWidth: '22px', minHeight: '22px', fontSize: '0.6rem', borderRadius: '6px' }}>
                    {i + 1}
                  </div>
                  <span className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning>{item}</span>
                </div>
              ))}
              <p className="body-sm" style={{ marginTop: '0.8vw', fontStyle: 'italic', color: 'var(--accent)' }}>
                {f.techConditions.conclusion}
              </p>
            </div>
          </div>

          {/* Founder Cards */}
          <div style={{ width: '70%', display: 'flex', gap: '1.5vw' }}>
            {[f.takenaka, f.kamizeki].map((person, idx) => (
              <div key={idx} className="card" style={{ flex: 1, padding: '1.5vw', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1vw', marginBottom: '1vw' }}>
                  <div style={{
                    width: '4vw', height: '4vw', minWidth: '50px', minHeight: '50px',
                    borderRadius: '50%', background: 'var(--accent-gradient)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontFamily: 'Poppins', fontWeight: 800,
                    fontSize: 'clamp(1rem, 1.5vw, 1.8rem)',
                  }}>
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning>
                      {person.name}
                    </h3>
                    <span className="body-sm">{person.nameEn}</span>
                    <div className="badge" style={{ marginTop: '0.3vw', display: 'block', width: 'fit-content' }}>{person.role}</div>
                  </div>
                </div>
                <p className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '1vw', flex: 1, fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {person.bio}
                </p>
                <div className="timeline">
                  {person.career.map((c, i) => (
                    <div key={i} className="timeline-item">
                      <span className="timeline-year">{c.year}</span>
                      <p className="timeline-text editable" contentEditable={editMode} suppressContentEditableWarning>{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
