import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

const COLS = [
  {
    bg: '#0a1a3a', tag: 'MISSION', icon: '🎯', c: '#fff',
    title: '人の心を動かす\n「技術」で、「社会」を\n前に進める',
    body: '楽しさと安全は、同じ技術から生まれる。\n\nエンタメと産業技術を融合させ、\n社会が安心して前に進める状態をつくる',
    items: [],
  },
  {
    bg: '#3b82f6', tag: 'VISION', icon: '🔭', c: '#fff',
    title: '技術と創造力で、\n社会の可能性を拡張する',
    body: '',
    items: [
      'ドローンショーやロボットのエンタメが日常に',
      '産業・災害現場にドローン・ロボットが先行出動',
      '先端技術や思想が当たり前に共存する社会',
    ],
  },
  {
    bg: '#f6a13a', tag: 'VALUES', icon: '💎', c: '#fff',
    title: '5つの信念が\n行動を導く',
    body: '',
    items: [
      '① 現場で証明する',
      '② 技術は社会で使われてこそ価値になる',
      '③ エンタメは技術を鍛える最高の現場',
      '④ 安全は最優先',
      '⑤ 最後まで実装する',
    ],
  },
];

export default function Page20MVV({ editMode }) {
  return (
    <Slide id="page-20" pageNumber={20} headerVariant="dark" background="#0a1224">
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, height: 60, background: '#0a1a3a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EditableText id="p20-title" editMode={editMode} style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}
          html='Mission / Vision / Values <span style="color:#f6a13a;font-size:13px;">— 私たちの羅針盤</span>' />
      </div>

      <div style={{ position: 'absolute', top: 88, left: 0, right: 0, bottom: 50, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        {COLS.map((col, i) => (
          <div key={i} style={{ background: col.bg, color: col.c, padding: 28, display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', fontSize: 28 }}>{col.icon}</div>
            <div style={{ textAlign: 'center', fontSize: 14, letterSpacing: '0.2em', marginTop: 6 }}>{col.tag}</div>
            <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 800, marginTop: 12, whiteSpace: 'pre-line', lineHeight: 1.45 }}>{col.title}</div>
            <div style={{ width: 50, height: 2, background: 'rgba(255,255,255,0.4)', margin: '14px auto' }} />
            {col.body && (
              <div style={{ textAlign: 'center', fontSize: 11, opacity: 0.9, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{col.body}</div>
            )}
            {col.items.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                {col.items.map((it, j) => (
                  <div key={j} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.18)', borderRadius: 100, fontSize: 10, textAlign: 'center' }}>{it}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, background: '#0a1a3a', textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>
        <span style={{ color: '#4a9eff' }}>Mission</span>が方向を示し、<span style={{ color: '#4a9eff' }}>Vision</span>が未来を照らし、<span style={{ color: '#f6a13a' }}>Values</span>が日々の行動を導く
      </div>
    </Slide>
  );
}
