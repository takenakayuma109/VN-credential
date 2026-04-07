import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

export default function Page16Education({ editMode }) {
  return (
    <Slide id="page-16" pageNumber={16} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      <div style={{ position: 'absolute', top: 50, left: 40, right: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <EditableText id="p16-title" editMode={editMode} style={{ color: '#fff', fontWeight: 700, fontSize: 21 }}
          html='人材を育て、技術を社会に届ける <span style="color:#4a9eff;font-size:13px;">— Education &amp; Human Development</span>' />
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ padding: '4px 10px', background: 'rgba(74,158,255,0.15)', color: '#4a9eff', fontSize: 10, fontWeight: 600, borderRadius: 100, border: '1px solid rgba(74,158,255,0.4)' }}>✓ 人材育成</span>
          <span style={{ padding: '4px 10px', background: 'rgba(74,158,255,0.15)', color: '#4a9eff', fontSize: 10, fontWeight: 600, borderRadius: 100, border: '1px solid rgba(74,158,255,0.4)' }}>✓ 国家資格</span>
        </div>
      </div>

      {/* Left photo */}
      <div style={{ position: 'absolute', top: 110, left: 30, width: 540, height: 470, borderRadius: 8, overflow: 'hidden' }}>
        <EditableImage id="p16-bg" src={images.droneOp} editMode={editMode} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
          <div style={{ fontFamily: 'Poppins', fontSize: 60, fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>1,000+</div>
          <div style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>人以上を育成</div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, marginTop: 4 }}>👥 3,000名超のコミュニティ運営</div>
        </div>
      </div>

      {/* Right cards */}
      <div style={{ position: 'absolute', top: 110, left: 600, right: 30, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { icon: '🏫', t: '国家資格スクール運営', d: '一等無人航空機操縦士（国家資格）取得を支援。実践的なカリキュラムで即戦力を育成。', c: '#4a9eff' },
          { icon: '🏆', t: '圧倒的な育成実績', d: '中川智博による1,000人以上のパイロット育成実績と、3,000名超のコミュニティ運営。', c: '#fbbf24' },
          { icon: '👶', t: 'JAPRADAR青少年育成', d: '2017年から続くドローンレーシングチームでの育成活動。レース技術を産業へ転用。', c: '#2dd4bf' },
          { icon: '🧪', t: 'STEM/STEAM教育', d: 'ドローンを活用した科学・技術・工学・数学の融合教育プログラムを提供。', c: '#9b6dff' },
        ].map((c, i) => (
          <div key={i} style={{ padding: 12, background: '#fff', borderTop: `3px solid ${c.c}`, borderRadius: 6, color: '#1a2332' }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}><span style={{ marginRight: 4 }}>{c.icon}</span>{c.t}</div>
            <div style={{ fontSize: 10, color: '#475569', marginTop: 6, lineHeight: 1.55 }}>{c.d}</div>
          </div>
        ))}

        <div style={{ gridColumn: '1 / -1', marginTop: 8, padding: 14, background: '#0a1a3a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, display: 'flex', gap: 12 }}>
          <EditableImage id="p16-nk" src={images.droneOp} editMode={editMode} style={{ width: 50, height: 50, borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <strong style={{ color: '#fff', fontSize: 13 }}>中川 智博</strong>
              <span style={{ padding: '2px 6px', background: '#fbbf24', color: '#1a2332', fontSize: 9, fontWeight: 700, borderRadius: 3 }}>EXPERT</span>
            </div>
            <div style={{ color: '#fbbf24', fontSize: 10, fontWeight: 600, marginTop: 2 }}>ドローン事業開発・マスターインストラクター</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9, marginTop: 4, lineHeight: 1.5 }}>
              楽天ドローン前身のスカイエステート立ち上げメンバー。DPAマスターインストラクターとしてスクール受講生を日本一に成長させ、1,000人以上を育成。一等無人航空機操縦士。
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
