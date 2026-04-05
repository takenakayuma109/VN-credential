import React from 'react';
import logo from '../../assets/images/image1.png';

export default function ContactSlide({ t, editMode }) {
  const c = t.contact;

  return (
    <div id="contact" className="slide" style={{ background: 'var(--bg-secondary)' }}>
      <div className="slide-inner" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <img
          src={logo}
          alt="VISIONOID"
          style={{ height: 'clamp(30px, 3vw, 60px)', marginBottom: '2vw' }}
          className={undefined}
        />
        <span className="section-label">{c.sectionTitle}</span>
        <h2 className="heading-xl editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '1.5vw' }}>
          {c.title}
        </h2>
        <p className="body-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '3vw' }}>
          {c.message}
        </p>
        <div className="flex-row" style={{ gap: '3vw', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div className="card" style={{ padding: '2vw 3vw', textAlign: 'center', minWidth: '200px' }}>
            <span className="body-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.5vw' }}>Company</span>
            <p className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning>{c.company}</p>
          </div>
          <div className="card" style={{ padding: '2vw 3vw', textAlign: 'center', minWidth: '200px' }}>
            <span className="body-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.5vw' }}>Email</span>
            <p className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning>{c.email}</p>
          </div>
          <div className="card" style={{ padding: '2vw 3vw', textAlign: 'center', minWidth: '200px' }}>
            <span className="body-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.5vw' }}>Location</span>
            <p className="heading-sm editable" contentEditable={editMode} suppressContentEditableWarning>{c.address}</p>
          </div>
        </div>
        <p className="body-sm" style={{ marginTop: '3vw', color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} VISIONOID Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
