import React from 'react';
import img8 from '../../assets/images/image8.jpeg';
import img11 from '../../assets/images/image11.jpeg';
import img38 from '../../assets/images/image38.png';
import img13 from '../../assets/images/image13.jpeg';
import img15 from '../../assets/images/image15.jpeg';
import img16 from '../../assets/images/image16.jpeg';

const IMAGE_MAP = {
  'image8.jpeg': img8,
  'image11.jpeg': img11,
  'image38.png': img38,
  'image13.jpeg': img13,
  'image15.jpeg': img15,
  'image16.jpeg': img16,
};

export default function IndustrialSlide({ t, editMode }) {
  const ind = t.industrial;

  return (
    <div id="industrial" className="slide">
      <div className="slide-inner">
        <span className="section-label">{ind.sectionTitle}</span>
        <h2 className="heading-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '2vw' }}>
          {ind.title}
        </h2>
        <div className="grid-3" style={{ gap: '1.2vw', flex: 1 }}>
          {ind.items.map((item, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="editable-image" style={{ height: '60%', overflow: 'hidden' }}>
                <img src={IMAGE_MAP[item.image]} alt={item.title} className="img-cover" style={{ borderRadius: '12px 12px 0 0' }} />
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
              <div style={{ padding: '1vw 1.2vw' }}>
                <h4 className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.95rem)' }}>
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
