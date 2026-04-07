import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

const RECORDS = [
  { y: '2019', t: '国内最年少優勝記録樹立', s: '上関風雅（当時小学生）', c: '#fbbf24' },
  { y: '2021', t: 'JAPAN DRONE LEAGUE 2021', s: 'シリーズ4冠達成（圧倒的成績）', c: '#f6a13a' },
  { y: '2021', t: 'SUPER DRONE CHAMPIONSHIP', s: '優勝：上関風雅（2代目王者・日本最年少）', c: '#f6a13a' },
  { y: '2022', t: 'ワールドゲームズ2022', s: '日本代表として参戦、世界6位入賞', c: '#ef5350' },
  { y: '2023', t: 'KAIZUKA Glowing DRONECUP', s: '準優勝：山本悠貴', c: '#34d399' },
  { y: '2023', t: '阿蘇ドローンレース2023', s: '優勝：山本悠貴', c: '#34d399' },
];

export default function Page11Japradar({ editMode }) {
  return (
    <Slide id="page-11" pageNumber={11} headerVariant="dark" background="#f4f6fa">
      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <EditableText id="p11-title" editMode={editMode} style={{ fontWeight: 700, fontSize: 21, color: '#1a2332' }}
          html='レースで鍛えたパイロットが、現場を変える <span style="color:#4a9eff;font-size:13px;">— JAPRADAR Origin</span>' />
        <EditableText id="p11-sub" editMode={editMode} style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>
          2017年に発足したドローンレーシングチーム。レースで鍛えた技術を産業・防災へ転用し、社会インフラの現場を変える
        </EditableText>
      </div>

      {/* Left: photo + handover */}
      <div style={{ position: 'absolute', top: 110, left: 40, width: 700 }}>
        <div style={{ height: 320, borderRadius: 8, overflow: 'hidden' }}>
          <EditableImage id="p11-team" src={images.droneFlyer} editMode={editMode} style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{ marginTop: 12, fontSize: 10, color: '#475569', fontWeight: 600 }}>技術・組織の進化</div>
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, padding: 12, background: '#fff', borderTop: '3px solid #f6a13a', borderRadius: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ color: '#1a2332', fontSize: 13 }}>JAPRADAR</strong>
              <span style={{ fontSize: 9, color: '#94a3b8' }}>2017-</span>
            </div>
            <div style={{ fontSize: 9.5, color: '#475569', marginTop: 4 }}>プロドローンレーシングチーム<br/>国内トップクラスの競技実績と若手パイロット育成</div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 9, color: '#4a9eff' }}>技術継承<br/>→</div>
          <div style={{ flex: 1, padding: 12, background: '#fff', borderTop: '3px solid #4a9eff', borderRadius: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ color: '#1a2332', fontSize: 13 }}>VISIONOID 技術チーム</strong>
              <span style={{ fontSize: 9, color: '#94a3b8' }}>2024-</span>
            </div>
            <div style={{ fontSize: 9.5, color: '#475569', marginTop: 4 }}>レースで培った操縦・安全管理技術をエンタメ・産業・防災領域に社会実装</div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { name: '上関 竜矢', tag: 'Leader', sub: 'ドローンレース日本代表監督', link: 'VISIONOID共同創業者・取締役・テクノロジー統括' },
            { name: '上関 風雅', tag: 'Ace Pilot', sub: '日本最年少優勝 / 世界6位', link: 'VISIONOID パイロット' },
          ].map((p, i) => (
            <div key={i} style={{ padding: 8, background: '#fff', borderRadius: 6, borderLeft: '3px solid #4a9eff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <strong style={{ fontSize: 11, color: '#1a2332' }}>{p.name}</strong>
                <span style={{ fontSize: 9, padding: '2px 6px', background: '#fef3c7', color: '#b45309', borderRadius: 3 }}>{p.tag}</span>
              </div>
              <div style={{ fontSize: 9, color: '#475569', marginTop: 2 }}>{p.sub}</div>
              <div style={{ fontSize: 9, color: '#4a9eff', marginTop: 2 }}>›{p.link}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: records */}
      <div style={{ position: 'absolute', top: 110, left: 760, right: 30, padding: 16, background: '#0a1a3a', borderRadius: 8 }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🏆 主なレース実績</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {RECORDS.map((r, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.06)', padding: 8, borderLeft: `3px solid ${r.c}`, borderRadius: 4 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <strong style={{ color: r.c, fontSize: 11, fontFamily: 'Poppins' }}>{r.y}</strong>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>{r.t}</span>
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{r.s}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, padding: 8, background: 'rgba(246,161,58,0.15)', border: '1px solid rgba(246,161,58,0.4)', borderRadius: 4 }}>
          <div style={{ fontSize: 10, color: '#f6a13a', fontWeight: 700 }}>「自動車レースと市販車の比喩」を体現</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', marginTop: 3 }}>
            レースで鍛えた極限の技術を、実用化・社会実装へ転用。「人で証明する存在」として、産業の現場を変えてきた。
          </div>
        </div>
      </div>
    </Slide>
  );
}
