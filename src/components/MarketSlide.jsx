import React from 'react';

export default function MarketSlide({ t, editMode }) {
  const m = t.market;
  const stats = [
    { label: m.stat1Label, value: m.stat1Value, source: m.stat1Source },
    { label: m.stat2Label, value: m.stat2Value, source: m.stat2Source },
    { label: m.stat3Label, value: m.stat3Value, source: m.stat3Source },
    { label: m.stat4Label, value: m.stat4Value, source: m.stat4Source },
  ];

  return (
    <div id="market" className="slide">
      <div className="slide-inner">
        <span className="section-label">{m.sectionTitle}</span>
        <h2 className="heading-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '2vw' }}>
          {m.title}
        </h2>
        <div className="flex-row" style={{ alignItems: 'stretch', flex: 1 }}>
          <div style={{ width: '60%' }}>
            <div className="grid-2" style={{ gap: '1.5vw', height: '100%' }}>
              {stats.map((stat, i) => (
                <div key={i} className="card" style={{ padding: '2vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="stat-value editable" contentEditable={editMode} suppressContentEditableWarning>
                    {stat.value}
                  </div>
                  <div className="stat-label editable" contentEditable={editMode} suppressContentEditableWarning>
                    {stat.label}
                  </div>
                  <div className="stat-source">{stat.source}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ width: '40%' }}>
            <div className="card-glass" style={{ padding: '2vw', height: '100%' }}>
              <h3 className="heading-sm" style={{ marginBottom: '1.5vw', color: 'var(--accent)' }}>
                Key Opportunities
              </h3>
              {m.opportunities.map((opp, i) => (
                <div key={i} className="opportunity-item" style={{ padding: '0.6vw 0' }}>
                  <div className="strength-icon" style={{
                    width: '2vw', height: '2vw', minWidth: '24px', minHeight: '24px',
                    fontSize: '0.6rem', borderRadius: '6px',
                  }}>
                    {i + 1}
                  </div>
                  <span className="body-md editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.9rem)' }}>
                    {opp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
