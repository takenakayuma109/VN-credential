import React from 'react';
import img4 from '../../assets/images/image4.jpeg';
import img5 from '../../assets/images/image5.jpeg';
import img20 from '../../assets/images/image20.png';
import img22 from '../../assets/images/image22.png';
import img3 from '../../assets/images/image3.jpeg';
import img25 from '../../assets/images/image25.png';

const IMAGE_MAP = {
  'image4.jpeg': img4,
  'image5.jpeg': img5,
  'image20.png': img20,
  'image22.png': img22,
  'image3.jpeg': img3,
  'image25.png': img25,
};

export default function PortfolioSlide({ t, editMode }) {
  const p = t.portfolio;

  return (
    <div id="portfolio" className="slide">
      <div className="slide-inner">
        <span className="section-label">{p.sectionTitle}</span>
        <h2 className="heading-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '2vw' }}>
          {p.title}
        </h2>
        <div className="grid-3" style={{ gap: '1.2vw', flex: 1 }}>
          {p.items.map((item, i) => (
            <div key={i} className="portfolio-item editable-image">
              <img src={IMAGE_MAP[item.image]} alt={item.title} />
              <div className="portfolio-overlay">
                <span className="body-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.date}</span>
                <h3 className="editable" contentEditable={editMode} suppressContentEditableWarning>{item.title}</h3>
                <p className="editable" contentEditable={editMode} suppressContentEditableWarning>{item.desc}</p>
              </div>
              {editMode && (
                <label className="image-replace-btn" style={{ opacity: 1, position: 'absolute', top: '8px', right: '8px', left: 'auto', transform: 'none' }}>
                  Replace
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        e.target.closest('.portfolio-item').querySelector('img').src = ev.target.result;
                      };
                      reader.readAsDataURL(file);
                    }
                  }} />
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
