import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

const QUADS = [
  { icon: '⭐', s: 'エンタメ×産業の両実績\n× ドローン1兆円市場', t: '両岸で成長を獲れる\n唯一のプレイヤー', c: '#22d3ee' },
  { icon: '⚙', s: 'ワンストップ体制\n× 規制整備の進展', t: '「全部できる」が\n最大の参入障壁', c: '#f6a13a' },
  { icon: '🤖', s: 'フィジカルAI先行開発\n× 2.5兆円市場', t: '先行者優位を確立', c: '#34d399' },
  { icon: '🛡', s: '安全管理ノウハウ\n× 防災需要急増', t: '自治体との\n信頼構築の武器', c: '#f6a13a' },
];

export default function Page18SO({ editMode }) {
  return (
    <Slide id="page-18" pageNumber={18} headerVariant="dark" background="#f4f6fa">
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, height: 60, background: '#0a1a3a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EditableText id="p18-title" editMode={editMode} style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}
          html='強み × 機会 ＝ 唯一無二のポジション <span style="color:#4a9eff;font-size:12px;">— SO Analysis</span>' />
      </div>
      <div style={{ position: 'absolute', top: 50, right: 30, fontSize: 80, fontWeight: 800, color: 'rgba(246,161,58,0.12)', fontFamily: 'Poppins' }}>唯一無二</div>

      <div style={{ position: 'absolute', top: 130, left: 60, right: 60, bottom: 60, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 24 }}>
        {QUADS.map((q, i) => (
          <div key={i} style={{ padding: 24, background: `linear-gradient(135deg, ${q.c}22, ${q.c}10)`, borderTop: `4px solid ${q.c}`, borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: q.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{q.icon}</div>
                <div style={{ fontSize: 12, color: '#1a2332', fontWeight: 600, whiteSpace: 'pre-line' }}>{q.s}</div>
              </div>
            </div>
            <div style={{ marginTop: 18, fontSize: 22, fontWeight: 800, color: '#1a2332', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{q.t}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 360, left: 0, right: 0, textAlign: 'center', color: '#ef5350', fontSize: 28 }}>✕</div>
    </Slide>
  );
}
