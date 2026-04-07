import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

export default function Page21Vision2030({ editMode }) {
  return (
    <Slide id="page-21" pageNumber={21} headerVariant="dark" background="#f4f6fa">
      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <EditableText id="p21-title" editMode={editMode} style={{ fontWeight: 700, fontSize: 22, color: '#1a2332' }}
          html='Vision 2030 <span style="color:#475569;font-size:12px;">技術と創造力で、社会の可能性を拡張する</span>' />
      </div>
      <div style={{ position: 'absolute', top: 30, right: 40, fontFamily: 'Poppins', fontWeight: 800, color: 'rgba(246,161,58,0.1)', fontSize: 130, lineHeight: 1 }}>2030</div>

      <div style={{ position: 'absolute', top: 130, left: 40, right: 40, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {[
          { icon: '🚀', t: 'ドローンショーと\nロボットエンタメが日常に', en: 'Everyday Spectacle', d: 'エンターテインメントが特別なイベントだけでなく、都市の景観や日常の一部に。誰もが最先端技術の感動を身近に感じる社会の実現。', c: '#4a9eff' },
          { icon: '🛡', t: '産業・災害現場に\nドローン・ロボットが先行出動', en: 'First Response', d: '災害発生時や危険な産業現場において、人が立ち入る前にドローンやロボットが先行して情報収集や作業を実施。人命を守り安全を確保。', c: '#f6a13a' },
          { icon: '🌐', t: '先端技術が\n社会と共存', en: 'Coexistence with Society', d: 'テクノロジーが主張しすぎることなく、社会インフラや生活環境に自然に溶け込み、人々の生活を豊かに拡張する「技術と社会の調和」の実現。', c: '#2dd4bf' },
        ].map((c, i) => (
          <div key={i} style={{ padding: 18, background: '#fff', borderLeft: `4px solid ${c.c}`, borderRadius: 8, minHeight: 220 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${c.c}22`, color: c.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{c.icon}</div>
            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 700, color: '#1a2332', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{c.t}</div>
            <div style={{ fontSize: 11, color: c.c, fontWeight: 600, marginTop: 4 }}>{c.en}</div>
            <div style={{ fontSize: 10, color: '#475569', marginTop: 10, lineHeight: 1.6 }}>{c.d}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ position: 'absolute', bottom: 60, left: 100, right: 100, height: 4, background: '#cbd5e1' }} />
      <div style={{ position: 'absolute', bottom: 30, left: 100, right: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {[
          { y: '2026', t: 'SusHi Tech TOKYO 出演', s: 'フィジカルAI×IPの実装開始', c: '#4a9eff', filled: true },
          { y: '2027-2029', t: '社会実装の拡張', s: '産業・防災領域での標準化', c: '#f6a13a', filled: true },
          { y: '2030', t: 'ビジョン到達', s: '技術と創造力で社会を拡張', c: '#2dd4bf', filled: true },
        ].map((m, i) => (
          <div key={i} style={{ textAlign: 'center', position: 'relative', marginTop: -10 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: m.c, border: '3px solid #fff', boxShadow: '0 0 0 3px ' + m.c, margin: '0 auto' }} />
            <div style={{ marginTop: 12, fontSize: 14, fontWeight: 800, color: '#1a2332', fontFamily: 'Poppins' }}>{m.y}</div>
            <div style={{ fontSize: 10, color: m.c, fontWeight: 600 }}>{m.t}</div>
            <div style={{ fontSize: 9, color: '#475569' }}>{m.s}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}
