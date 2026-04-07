import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

const VALUES = [
  { n: '01', icon: '🗺', t: '現場で証明する', en: 'PROVE ON SITE', d: '机上の空論ではなく、実際の現場で技術が機能することを証明することを最優先とします。エンタメや災害現場という過酷な環境での実証こそが、技術への信頼を生み出し、技術が機能することの証明を最優先に。', c: '#22d3ee' },
  { n: '02', icon: '👥', t: '技術は社会実装されてこそ価値になる', en: 'TECH IN USE CREATES VALUE', d: 'どんなに高度な技術も、社会実装されなければ意味がありません。研究室に留めず、人々の生活や産業の現場に「使える形」で届けることへのこだわり。', c: '#f6a13a' },
  { n: '03', icon: '⚡', t: 'エンタメは技術を鍛える最高の現場', en: 'ENTERTAINMENT HARDENS TECH', d: '失敗が許されないライブエンターテインメントの現場は、技術の堅牢性を高める最高の実験場。ここで磨かれた技術が、社会インフラとしての信頼性獲得に大きく貢献できると信じています。', c: '#2dd4bf' },
  { n: '04', icon: '🛡', t: '安全は最優先', en: 'SAFETY FIRST', d: 'ドローンやロボットという物理的な力を伴う技術を扱う以上、安全は何よりも優先されます。法規制の遵守はもちろん、独自の厳格な安全基準を設け、事故ゼロの追求。', c: '#ef5350' },
  { n: '05', icon: '🏁', t: '最後まで実装する', en: 'DELIVER TO THE END', d: '構想や提案だけで終わらせず、設計、開発、現場での運用まで、すべてのプロセスを一社で完結させます。責任を持って最後までやり遂げる「実装力」が私たちの誇り。', c: '#9b6dff' },
];

export default function Page22Values({ editMode }) {
  return (
    <Slide id="page-22" pageNumber={22} headerVariant="dark" background="#f4f6fa">
      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <EditableText id="p22-title" editMode={editMode} style={{ fontWeight: 700, fontSize: 22, color: '#1a2332' }}>
          Values — 5つの信念
        </EditableText>
        <EditableText id="p22-sub" editMode={editMode} style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>
          VISIONOIDの全員が共有する、揺るがない行動原則
        </EditableText>
      </div>

      <div style={{ position: 'absolute', top: 120, left: 30, right: 30, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
        {VALUES.map((v) => (
          <div key={v.n} style={{ padding: 14, background: '#fff', borderTop: `3px solid ${v.c}`, borderRadius: 8, textAlign: 'center', minHeight: 360 }}>
            <div style={{ fontFamily: 'Poppins', fontSize: 36, fontWeight: 800, color: v.c }}>{v.n}</div>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${v.c}22`, color: v.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, margin: '8px auto' }}>{v.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1a2332' }}>{v.t}</div>
            <div style={{ fontSize: 9, color: v.c, fontWeight: 600, letterSpacing: '0.05em', marginTop: 4 }}>{v.en}</div>
            <div style={{ fontSize: 9, color: '#475569', marginTop: 10, lineHeight: 1.55, textAlign: 'left' }}>{v.d}</div>
          </div>
        ))}
      </div>

      <EditableText id="p22-foot" editMode={editMode} style={{
        position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', color: '#1a2332', fontWeight: 700, fontSize: 13 }}>
        エンタメという極限の現場で鍛え上げた技術を、社会インフラに実装する。
      </EditableText>
    </Slide>
  );
}
