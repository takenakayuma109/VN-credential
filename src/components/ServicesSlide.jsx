import React from 'react';

const SERVICE_ICONS = {
  entertainment: '🎭',
  disaster: '🛡️',
  industrial: '🏭',
  advertising: '📺',
  education: '🎓',
  techdev: '⚙️',
};

const SERVICE_COLORS = {
  entertainment: '#4a9eff',
  disaster: '#34d399',
  industrial: '#fbbf24',
  advertising: '#f87171',
  education: '#a78bfa',
  techdev: '#fb923c',
};

export default function ServicesSlide({ t, editMode }) {
  const s = t.services;
  const keys = ['entertainment', 'disaster', 'industrial', 'advertising', 'education', 'techdev'];

  return (
    <div id="services" className="slide">
      <div className="slide-inner">
        <span className="section-label">{s.sectionTitle}</span>
        <h2 className="heading-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '2vw' }}>
          {s.title}
        </h2>
        <div className="grid-3" style={{ gap: '1.2vw' }}>
          {keys.map((key) => {
            const svc = s[key];
            return (
              <div key={key} className="card" style={{ padding: '1.5vw' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', marginBottom: '0.8vw' }}>
                  <div style={{
                    width: '2.5vw', height: '2.5vw', minWidth: '30px', minHeight: '30px',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${SERVICE_COLORS[key]}20`, fontSize: 'clamp(0.9rem, 1.2vw, 1.4rem)',
                  }}>
                    {SERVICE_ICONS[key]}
                  </div>
                  <div>
                    <h4 className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(0.8rem, 0.95vw, 1rem)', lineHeight: 1.2 }}>
                      {svc.title}
                    </h4>
                    <span className="body-sm" style={{ color: SERVICE_COLORS[key], fontSize: 'clamp(0.6rem, 0.65vw, 0.7rem)' }}>
                      {svc.subtitle}
                    </span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {svc.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5vw', padding: '0.2vw 0' }}>
                      <span style={{ color: SERVICE_COLORS[key], fontSize: '0.5rem', marginTop: '0.4em', flexShrink: 0 }}>●</span>
                      <span className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
