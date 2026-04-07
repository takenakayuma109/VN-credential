import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

export default function Page26Company({ editMode }) {
  return (
    <Slide id="page-26" pageNumber={26} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      {/* Basic info */}
      <div style={{ position: 'absolute', top: 60, left: 30, width: 580, padding: 16, background: 'rgba(255,255,255,0.04)', borderTop: '3px solid #4a9eff', borderRadius: 8 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🏢 基本情報</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
          {[
            { l: '会社名', v: 'VISIONOID株式会社' },
            { l: '設立', v: '2024年7月5日' },
            { l: '資本金', v: '1億5000万円' },
            { l: '従業員', v: '20名（業務委託含む）' },
          ].map((r, i) => (
            <div key={i}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{r.l}</div>
              <div style={{ fontSize: 12, color: '#fff', fontWeight: 600, marginTop: 2 }}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Officers */}
      <div style={{ position: 'absolute', top: 220, left: 30, width: 580, padding: 16, background: 'rgba(255,255,255,0.04)', borderTop: '3px solid #4a9eff', borderRadius: 8 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>👥 役員構成</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { i: '竹', n: '竹中 悠満', r: '代表取締役 CEO', c: '#4a9eff' },
            { i: '上', n: '上関 竜矢', r: '取締役・テクノロジー統括', c: '#9b6dff' },
            { i: '安', n: '安達 的海', r: '取締役・PM', c: '#2dd4bf' },
            { i: '門', n: '門前 龍汰', r: '取締役・機体開発', c: '#f6a13a' },
          ].map((p, i) => (
            <div key={i} style={{ padding: 8, background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${p.c}`, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{p.i}</div>
              <div>
                <div style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>{p.n}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9 }}>{p.r}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div style={{ position: 'absolute', top: 380, left: 30, width: 580, padding: 16, background: 'rgba(255,255,255,0.04)', borderTop: '3px solid #4a9eff', borderRadius: 8 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>📍 所在地</div>
        {[
          { i: '🏢', l: '本社', v: '東京都港区芝2-28-11' },
          { i: '🎬', l: 'スタジオ', v: '埼玉県所沢市林2-477-1' },
          { i: '💼', l: '営業所', v: '東京都江戸川区東葛西9-3-14' },
        ].map((r, i) => (
          <div key={i} style={{ padding: 6, background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid #4a9eff', borderRadius: 3, marginBottom: 6, fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>
            {r.i} <strong>{r.l}：</strong>{r.v}
          </div>
        ))}
      </div>

      {/* Partners */}
      <div style={{ position: 'absolute', top: 60, left: 640, right: 30, padding: 16, background: 'rgba(255,255,255,0.04)', borderTop: '3px solid #f6a13a', borderRadius: 8 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🤝 パートナー企業</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          {['JPアセット証券', '博報堂DYグループ', 'THE CHOSEN ONE', 'MRC TOKYO', 'AERIAL DESIGN', 'JAPRADAR'].map((p) => (
            <div key={p} style={{ padding: '8px 6px', background: 'rgba(255,255,255,0.06)', borderRadius: 4, textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontSize: 10 }}>{p}</div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={{ position: 'absolute', top: 220, left: 640, right: 30, padding: 16, background: 'rgba(255,255,255,0.04)', borderTop: '3px solid #f6a13a', borderRadius: 8 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>✉ 連絡先</div>
        <div style={{ padding: 8, background: 'rgba(74,158,255,0.1)', borderLeft: '3px solid #4a9eff', borderRadius: 3, color: '#4a9eff', fontSize: 12, marginBottom: 6 }}>📧 info@visionoid.co.jp</div>
        <div style={{ padding: 8, background: 'rgba(74,158,255,0.1)', borderLeft: '3px solid #4a9eff', borderRadius: 3, color: '#4a9eff', fontSize: 12 }}>🌐 www.visionoid.co.jp</div>
      </div>

      {/* Facility */}
      <div style={{ position: 'absolute', top: 360, left: 640, right: 30, padding: 16, background: 'rgba(255,255,255,0.04)', borderTop: '3px solid #f6a13a', borderRadius: 8 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🏛 施設紹介</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <div style={{ height: 80, borderRadius: 4, overflow: 'hidden' }}>
              <EditableImage id="p26-fac1" src={images.tabletPlan} editMode={editMode} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>本社オフィス（港区芝）</div>
          </div>
          <div>
            <div style={{ height: 80, borderRadius: 4, overflow: 'hidden' }}>
              <EditableImage id="p26-fac2" src={images.warehouse} editMode={editMode} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>スタジオ（所沢）</div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center', fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>
        © 2024 VISIONOID株式会社 All Rights Reserved
      </div>
    </Slide>
  );
}
