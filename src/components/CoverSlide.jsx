import React from 'react';
import coverBg from '../../assets/images/image1.jpeg';
import logo from '../../assets/images/image1.png';

export default function CoverSlide({ t, editMode }) {
  return (
    <div id="cover" className="slide cover-slide">
      <div className="slide-bg">
        <img src={coverBg} alt="" />
        <div className="slide-bg-overlay" style={{ background: 'linear-gradient(135deg, rgba(5,5,16,0.85) 0%, rgba(10,10,30,0.7) 50%, rgba(5,5,16,0.9) 100%)' }} />
      </div>
      <div className="slide-inner" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <img
          src={logo}
          alt="VISIONOID"
          style={{ height: 'clamp(40px, 4vw, 80px)', marginBottom: '2vw', filter: 'invert(1)' }}
        />
        <h1
          className="heading-xl editable"
          contentEditable={editMode}
          suppressContentEditableWarning
          style={{ color: '#f0f0f5', marginBottom: '1vw', maxWidth: '80%' }}
        >
          {t.cover.tagline}
        </h1>
        <p
          className="body-lg editable"
          contentEditable={editMode}
          suppressContentEditableWarning
          style={{ color: 'rgba(240,240,245,0.7)', maxWidth: '60%', marginBottom: '2vw' }}
        >
          {t.cover.subtitle}
        </p>
        <div style={{ display: 'flex', gap: '1vw', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1vw' }}>
          <span className="badge" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>Drone Shows</span>
          <span className="badge" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>Robotics</span>
          <span className="badge" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>AI</span>
          <span className="badge" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>Entertainment</span>
          <span className="badge" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>Disaster Prevention</span>
        </div>
      </div>
    </div>
  );
}
