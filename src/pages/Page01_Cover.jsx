import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

export default function Page01Cover({ editMode }) {
  return (
    <Slide id="page-01" pageNumber={1} headerVariant="dark" background="#0a1224">
      {/* Background grid */}
      <div className="absfill bg-dark-grid" />

      {/* Confidential mark */}
      <div style={{ position: 'absolute', top: 12, right: 20, fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', zIndex: 5 }}>
        🔒 CONFIDENTIAL
      </div>

      {/* Center content */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        <EditableImage
          id="cover-logo"
          src={images.logoDark}
          editMode={editMode}
          fit="contain"
          style={{ width: 240, height: 50, marginBottom: 24 }}
        />
        <EditableText id="cover-title" editMode={editMode} as="h1" style={{
          fontFamily: "'Poppins', 'Noto Sans JP', sans-serif",
          fontWeight: 800, fontSize: 84, letterSpacing: '0.04em', color: '#ffffff', marginBottom: 14,
        }}>VISIONOID</EditableText>

        <EditableText id="cover-sub" editMode={editMode} style={{
          fontSize: 18, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.3em', marginBottom: 22,
        }}>Visionary Technology Company</EditableText>

        <div style={{ width: 110, height: 3, background: 'linear-gradient(90deg, #4a9eff, #f6a13a)', borderRadius: 2, marginBottom: 30 }} />

        <EditableText id="cover-tag" editMode={editMode} style={{
          padding: '10px 28px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 100,
          color: 'rgba(255,255,255,0.85)', fontSize: 14, letterSpacing: '0.1em',
        }}>Credential Deck 2026</EditableText>
      </div>

      {/* Bottom gradient bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #4a9eff, #2dd4bf, #f6a13a)' }} />
    </Slide>
  );
}
