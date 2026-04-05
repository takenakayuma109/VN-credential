import React from 'react';
import foxImg from '../../assets/images/image7.jpeg';
import droneImg from '../../assets/images/image16.jpeg';
import senriganImg from '../../assets/images/image16.jpeg';

export default function TechnologySlide({ t, editMode }) {
  const tech = t.technology;
  const items = [
    { ...tech.senrigan, image: senriganImg, color: '#34d399' },
    { ...tech.fox, image: foxImg, color: '#f87171' },
    { ...tech.droneShow, image: droneImg, color: '#4a9eff' },
  ];

  return (
    <div id="technology" className="slide">
      <div className="slide-inner">
        <span className="section-label">{tech.sectionTitle}</span>
        <h2 className="heading-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '2vw' }}>
          {tech.title}
        </h2>
        <div className="grid-3" style={{ gap: '1.5vw', flex: 1 }}>
          {items.map((item, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div className="editable-image" style={{ height: '55%', overflow: 'hidden' }}>
                <img src={item.image} alt={item.title} className="img-cover" style={{ borderRadius: '12px 12px 0 0' }} />
                {editMode && (
                  <label className="image-replace-btn" style={{ opacity: 1, position: 'absolute', top: '8px', right: '8px', left: 'auto', transform: 'none' }}>
                    Replace
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          e.target.closest('.editable-image').querySelector('img').src = ev.target.result;
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </label>
                )}
              </div>
              <div style={{ padding: '1.5vw', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginBottom: '0.5vw' }}>
                  <div style={{ width: '4px', height: '1.5em', background: item.color, borderRadius: '2px' }} />
                  <h3 className="heading-md editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(1rem, 1.3vw, 1.5rem)' }}>
                    {item.title}
                  </h3>
                </div>
                <span className="body-sm" style={{ color: item.color, marginBottom: '0.5vw', display: 'block' }}>
                  {item.subtitle}
                </span>
                <p className="body-sm editable" contentEditable={editMode} suppressContentEditableWarning>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
