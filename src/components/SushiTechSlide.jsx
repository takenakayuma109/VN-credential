import React from 'react';
import sushitechImg from '../../assets/images/image37.png';
import foxImg from '../../assets/images/image35.png';
import robotImg from '../../assets/images/image32.png';

export default function SushiTechSlide({ t, editMode }) {
  const s = t.sushitech;

  return (
    <div id="sushitech" className="slide">
      <div className="slide-bg">
        <img src={sushitechImg} alt="" />
        <div className="slide-bg-overlay" style={{ background: 'linear-gradient(135deg, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.7) 50%, rgba(10,10,15,0.92) 100%)' }} />
      </div>
      <div className="slide-inner" style={{ color: '#f0f0f5' }}>
        <span className="section-label">{s.sectionTitle}</span>
        <div className="flex-row" style={{ height: '80%', alignItems: 'center' }}>
          <div style={{ width: '50%' }}>
            <h2 className="heading-xl editable" contentEditable={editMode} suppressContentEditableWarning style={{ color: '#f0f0f5', marginBottom: '1vw' }}>
              {s.title}
            </h2>
            <p className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning style={{ color: 'rgba(240,240,245,0.8)', marginBottom: '1.5vw' }}>
              {s.subtitle}
            </p>
            <div className="divider" />
            <p className="body-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ color: 'rgba(240,240,245,0.7)', marginBottom: '2vw' }}>
              {s.desc}
            </p>
            <div className="flex-row" style={{ gap: '2vw' }}>
              <div>
                <span className="body-sm" style={{ color: 'var(--accent)' }}>Date</span>
                <p className="heading-sm" style={{ color: '#f0f0f5' }}>{s.date}</p>
              </div>
              <div>
                <span className="body-sm" style={{ color: 'var(--accent)' }}>Venue</span>
                <p className="heading-sm" style={{ color: '#f0f0f5' }}>{s.venue}</p>
              </div>
            </div>
          </div>
          <div style={{ width: '50%', display: 'flex', gap: '1vw', alignItems: 'center' }}>
            <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden' }}>
              <img src={foxImg} alt="Robot Performance" className="img-cover" style={{ aspectRatio: '3/4' }} />
            </div>
            <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden' }}>
              <img src={robotImg} alt="Robot Show" className="img-cover" style={{ aspectRatio: '3/4' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
