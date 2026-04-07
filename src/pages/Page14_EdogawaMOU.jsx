import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

export default function Page14EdogawaMOU({ editMode }) {
  return (
    <Slide id="page-14" pageNumber={14} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      {/* Top: VN x Edogawa */}
      <div style={{ position: 'absolute', top: 50, left: 40, right: 40, display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 80, padding: 8, background: '#0a1a3a', border: '1px solid #4a9eff', borderRadius: 4, textAlign: 'center', color: '#fff', fontFamily: 'Poppins', fontSize: 12, fontWeight: 700 }}>VISIONOID</div>
        <span style={{ color: '#fff', fontSize: 24 }}>×</span>
        <EditableText id="p14-edo" editMode={editMode} style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>東京都江戸川区</EditableText>
      </div>

      <div style={{ position: 'absolute', top: 110, left: 40, right: 480, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ padding: '4px 10px', background: '#4a9eff', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 4 }}>PRESS RELEASE</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>2026.3.8</span>
        </div>
        <EditableText id="p14-title" editMode={editMode} style={{ color: '#fff', fontSize: 18, fontWeight: 700, lineHeight: 1.5 }}
          html='VISIONOID、東京都江戸川区と<br/>『<u>無人航空機による情報収集等に関する協定</u>』締結' />
        <EditableText id="p14-body" editMode={editMode} style={{ marginTop: 12, color: 'rgba(255,255,255,0.75)', fontSize: 11, lineHeight: 1.7 }}>
          本協定は、地震・風水害等の災害発生時において、ドローンを活用した迅速な情報収集を行い、被害状況の把握および初動対応の高度化を目的とするものです。
        </EditableText>
      </div>

      {/* Right: photo */}
      <div style={{ position: 'absolute', top: 110, right: 30, width: 420, height: 240, borderRadius: 6, overflow: 'hidden' }}>
        <EditableImage id="p14-photo" src={images.happyWoman} editMode={editMode} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', bottom: 4, right: 8, fontSize: 9, color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: 3 }}>
          右：江戸川区長 斉藤猛 ／ 左：VISIONOID代表 竹中悠満
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 40 }}>
        <div style={{ display: 'inline-block', padding: '4px 10px', background: '#f6a13a', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 3, marginBottom: 8 }}>
          MAIN INITIATIVES / 主な取り組み
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 30, left: 40, right: 40, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[
          { icon: '⚡', t: '迅速な情報収集体制', d: '団体でライセンスを取得し、災害時の即応体制を整備。外部事業者に依存せず、発災直後から自律的にドローンを展開し、被害状況を即座に把握します。', c: '#4a9eff' },
          { icon: '🛰', t: '統合PF「SENRIGAN」', d: '複数ドローンの映像・位置情報を一元管理する次世代防災プラットフォーム。対策本部と現場をリアルタイムで繋ぎ、意思決定のスピードを劇的に向上させます。', c: '#9b6dff' },
          { icon: '🔄', t: '継続的シミュレーション＆訓練', d: '機体を導入するだけでなく、平時から地域特性を熟知するための実践訓練を実施。いざという時に確実に「動ける」組織体制と運用フローを構築します。', c: '#f6a13a' },
        ].map((it, i) => (
          <div key={i} style={{ padding: 14, background: 'rgba(255,255,255,0.05)', borderTop: `3px solid ${it.c}`, borderRadius: 6 }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}><span style={{ marginRight: 6 }}>{it.icon}</span>{it.t}</div>
            <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.75)', marginTop: 6, lineHeight: 1.6 }}>{it.d}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}
