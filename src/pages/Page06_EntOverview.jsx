import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

const SHOWS = [
  { id: 's1', img: images.droneLights, date: '2024.06', title: '東京ディズニーシー', sub: 'Fantasy Springs 開業前夜ドローンショー', secret: true },
  { id: 's2', img: images.nogizaka, date: '2025.09', title: '乃木坂46 真夏の全国ツアーファイナル', sub: '@明治神宮野球場', secret: true },
  { id: 's3', img: images.enoshima, date: '2025.08', title: '江の島マイアミビーチショー', sub: '「天女と龍神」' },
  { id: 's4', img: images.fireworks, date: '2025.01', title: 'サントリーホールディングス', sub: 'グローバルカンファレンスOP演出' },
  { id: 's5', img: images.droneLights, date: '2025.06', title: '青年会議所関東大会', sub: 'ドローンショー演出' },
  { id: 's6', img: images.sevenSeven, date: '2025.08', title: 'GIRLS GROOVE INNOVATION 沖縄', sub: 'ドローン×音楽フェス' },
];

export default function Page06EntOverview({ editMode }) {
  return (
    <Slide id="page-06" pageNumber={6} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <EditableText id="p6-title" editMode={editMode} style={{ fontWeight: 700, fontSize: 21, color: '#fff', borderBottom: '3px solid #4a9eff', paddingBottom: 4, display: 'inline-block' }}>
          日本のエンターテインメントを、次のステージへ導くドローンショー
        </EditableText>
      </div>
      <EditableText id="p6-en" editMode={editMode} style={{ position: 'absolute', top: 56, right: 40, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
        Entertainment Overview
      </EditableText>

      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: '1fr 1fr', gap: 12 }}>
        {SHOWS.map((s) => (
          <div key={s.id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', height: 230 }}>
            <EditableImage id={`p6-${s.id}`} src={s.img} editMode={editMode} style={{ width: '100%', height: '100%' }} />
            {s.secret && (
              <div style={{ position: 'absolute', top: 8, right: 8, background: '#ef5350', color: '#fff', padding: '3px 8px', borderRadius: 3, fontSize: 10, fontWeight: 700, zIndex: 5 }}>🔒 非公開</div>
            )}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4a9eff', fontSize: 10, marginBottom: 4 }}>● {s.date}</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{s.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 16, left: 40, right: 40, padding: '10px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
        display: 'flex', alignItems: 'center', gap: 14, color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>
        <span style={{ color: '#4a9eff', fontWeight: 700 }}>🕘 Past Portfolio</span>
        {['東京モーターショー2019', '東京2020五輪', 'KAT-TUN', '松任谷由実', 'DREAMS COME TRUE', '日本ハム開幕戦'].map((p) => (
          <span key={p}>● {p}</span>
        ))}
      </div>
    </Slide>
  );
}
