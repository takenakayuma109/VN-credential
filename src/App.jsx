import React, { useState, useEffect, useRef, useCallback } from 'react';
import { translations, languages } from './i18n/translations';
import CoverSlide from './components/CoverSlide';
import AboutSlide from './components/AboutSlide';
import MissionSlide from './components/MissionSlide';
import ServicesSlide from './components/ServicesSlide';
import FoundersSlide from './components/FoundersSlide';
import PortfolioSlide from './components/PortfolioSlide';
import IndustrialSlide from './components/IndustrialSlide';
import StrengthSlide from './components/StrengthSlide';
import MarketSlide from './components/MarketSlide';
import TechnologySlide from './components/TechnologySlide';
import TeamSlide from './components/TeamSlide';
import SushiTechSlide from './components/SushiTechSlide';
import ContactSlide from './components/ContactSlide';
import EditToolbar from './components/EditToolbar';

const SLIDES = [
  'cover', 'about', 'mission', 'services', 'founders',
  'portfolio', 'industrial', 'strength', 'market',
  'technology', 'team', 'sushitech', 'contact',
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('ja');
  const [editMode, setEditMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [exporting, setExporting] = useState(false);
  const containerRef = useRef(null);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SLIDES.indexOf(entry.target.id);
            if (idx !== -1) setActiveSlide(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    SLIDES.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSlide = useCallback((idx) => {
    const el = document.getElementById(SLIDES[idx]);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const handleExportPdf = async () => {
    setExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const slides = document.querySelectorAll('.slide');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });

      for (let i = 0; i < slides.length; i++) {
        const canvas = await html2canvas(slides[i], {
          scale: 2,
          useCORS: true,
          backgroundColor: theme === 'dark' ? '#0a0a0f' : '#f8f7f4',
          width: slides[i].scrollWidth,
          height: slides[i].scrollHeight,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) pdf.addPage([1920, 1080], 'landscape');
        pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
      }

      pdf.save('VISIONOID_Credential.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Please try again.');
    }
    setExporting(false);
  };

  const navLabels = t.nav;

  return (
    <div ref={containerRef} className={editMode ? 'edit-mode' : ''}>
      {/* Toolbar */}
      <div className="toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={new URL('../assets/images/image1.png', import.meta.url)}
            alt="VISIONOID"
            className="toolbar-logo"
            style={{ filter: theme === 'dark' ? 'invert(1)' : 'none' }}
          />
        </div>
        <div className="toolbar-controls">
          <select
            className="toolbar-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>

          <button className="toolbar-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀' : '☾'} {theme === 'dark' ? t.ui.lightMode : t.ui.darkMode}
          </button>

          <button
            className={`toolbar-btn ${editMode ? 'active' : ''}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? t.ui.viewMode : t.ui.editMode}
          </button>

          <button
            className="toolbar-btn"
            onClick={handleExportPdf}
            disabled={exporting}
          >
            {exporting ? '...' : t.ui.exportPdf}
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="nav-sidebar">
        {SLIDES.map((id, idx) => (
          <button
            key={id}
            className={`nav-dot ${activeSlide === idx ? 'active' : ''}`}
            onClick={() => scrollToSlide(idx)}
          >
            <span className="nav-dot-label">{navLabels[id] || id}</span>
          </button>
        ))}
      </div>

      {/* Slides */}
      <div style={{ paddingTop: '48px' }}>
        <CoverSlide t={t} editMode={editMode} />
        <AboutSlide t={t} editMode={editMode} />
        <MissionSlide t={t} editMode={editMode} />
        <ServicesSlide t={t} editMode={editMode} />
        <FoundersSlide t={t} editMode={editMode} />
        <PortfolioSlide t={t} editMode={editMode} />
        <IndustrialSlide t={t} editMode={editMode} />
        <StrengthSlide t={t} editMode={editMode} />
        <MarketSlide t={t} editMode={editMode} />
        <TechnologySlide t={t} editMode={editMode} />
        <TeamSlide t={t} editMode={editMode} />
        <SushiTechSlide t={t} editMode={editMode} />
        <ContactSlide t={t} editMode={editMode} />
      </div>

      {/* Edit Mode Toolbar */}
      {editMode && <EditToolbar />}
    </div>
  );
}
