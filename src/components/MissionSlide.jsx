import React from 'react';

export default function MissionSlide({ t, editMode }) {
  const m = t.mission;
  const values = [
    { title: m.value1, desc: m.value1Desc },
    { title: m.value2, desc: m.value2Desc },
    { title: m.value3, desc: m.value3Desc },
    { title: m.value4, desc: m.value4Desc },
    { title: m.value5, desc: m.value5Desc },
  ];

  return (
    <div id="mission" className="slide">
      <div className="slide-inner">
        <span className="section-label">{m.sectionTitle}</span>
        <div className="flex-row" style={{ height: '85%', alignItems: 'stretch', marginTop: '1vw' }}>
          {/* Mission & Vision */}
          <div style={{ width: '55%', display: 'flex', flexDirection: 'column', gap: '2vw' }}>
            <div>
              <div className="badge" style={{ marginBottom: '0.8vw' }}>{m.missionLabel}</div>
              <h2 className="heading-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '0.8vw' }}>
                {m.missionText}
              </h2>
              <p className="body-md editable" contentEditable={editMode} suppressContentEditableWarning>
                {m.missionDesc}
              </p>
            </div>
            <div>
              <div className="badge" style={{ marginBottom: '0.8vw' }}>{m.visionLabel}</div>
              <h3 className="heading-md editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '0.8vw' }}>
                {m.visionText}
              </h3>
              <p className="body-sm" style={{ marginBottom: '0.5vw', color: 'var(--accent)' }}>{m.vision2030}</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[m.visionItem1, m.visionItem2, m.visionItem3].map((item, i) => (
                  <li key={i} className="opportunity-item">
                    <span className="opportunity-bullet" />
                    <span className="body-md editable" contentEditable={editMode} suppressContentEditableWarning>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Values */}
          <div style={{ width: '45%' }}>
            <div className="badge" style={{ marginBottom: '1vw' }}>{m.valuesLabel}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {values.map((v, i) => (
                <div key={i} className="value-item">
                  <span className="value-number">0{i + 1}</span>
                  <div>
                    <h4 className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(0.85rem, 1vw, 1.1rem)' }}>
                      {v.title}
                    </h4>
                    <p className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning>{v.desc}</p>
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
