import React from 'react';
import teamImg from '../../assets/images/image2.png';

export default function TeamSlide({ t, editMode }) {
  const tm = t.team;

  return (
    <div id="team" className="slide">
      <div className="slide-inner">
        <span className="section-label">{tm.sectionTitle}</span>
        <div className="flex-row" style={{ height: '85%', alignItems: 'center' }}>
          <div style={{ width: '50%' }}>
            <h2 className="heading-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '1vw' }}>
              {tm.title}
            </h2>
            <div className="divider" />
            <p className="body-lg editable" contentEditable={editMode} suppressContentEditableWarning style={{ marginBottom: '2vw', maxWidth: '90%' }}>
              {tm.desc}
            </p>
            <div className="grid-2" style={{ gap: '0.8vw' }}>
              {tm.roles.map((role, i) => (
                <div key={i} className="team-role">
                  <span className="team-role-dot" />
                  <span className="editable" contentEditable={editMode} suppressContentEditableWarning>{role}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="editable-image" style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
              <img src={teamImg} alt="Team" style={{ width: '100%', borderRadius: '12px' }} />
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
          </div>
        </div>
      </div>
    </div>
  );
}
