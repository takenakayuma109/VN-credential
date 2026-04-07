import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

const TOP = [
  { icon: '🎬', t: 'エンターテインメント', items: ['ドローンショー企画制作', 'ドローン空撮', 'イベント総合プロデュース', '映像制作'], c: '#2dd4bf' },
  { icon: '🛡', t: '防災・安全', items: ['防災ドローン導入支援', '災害情報収集体制構築', '次世代防災PF「SENRIGAN」'], c: '#ef5350' },
  { icon: '🏭', t: '産業・ビジネス', items: ['ドローン測量・点検', '外壁調査', '狭隘部点検', 'インフラ点検'], c: '#34d399' },
  { icon: '📣', t: '広告・プロモーション', items: ['ドローンショー型屋外広告運用', 'SNS拡散型プロモーション'], c: '#a78bfa' },
];
const BOTTOM = [
  { icon: '🎓', t: '教育・人材育成', items: ['ドローン国家資格スクール運営', 'STEM教育', '次世代ドローン人材育成'], c: '#f6a13a' },
  { icon: '🔬', t: '技術開発', items: ['ドローン機体開発', 'フィジカルAI開発', 'ロボティクスIP開発・運用'], c: '#4a9eff' },
  { icon: '💼', t: '事業設計・実装支援', items: ['新規事業コンサルティング', 'ドローン事業立ち上げ支援'], c: '#f6a13a' },
];

const Card = ({ d }) => (
  <div style={{ background: '#fff', borderRadius: 8, padding: 12, borderTop: `4px solid ${d.c}`, color: '#1a2332', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <div style={{ width: 24, height: 24, borderRadius: 6, background: d.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{d.icon}</div>
      <div style={{ fontWeight: 700, fontSize: 12 }}>{d.t}</div>
    </div>
    <ul style={{ listStyle: 'none', fontSize: 10, lineHeight: 1.7, color: '#475569' }}>
      {d.items.map((it, i) => <li key={i}>• {it}</li>)}
    </ul>
  </div>
);

export default function Page04Services({ editMode }) {
  return (
    <Slide id="page-04" pageNumber={4} headerVariant="dark" background="#f4f6fa">
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, height: 60, background: '#0a1224',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <EditableText id="p4-title" editMode={editMode} style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>
          7つの事業領域がひとつの思想で繋がる
        </EditableText>
        <EditableText id="p4-en" editMode={editMode} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>
          Service Ecosystem
        </EditableText>
      </div>

      <EditableText id="p4-h2" editMode={editMode} style={{
        position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center', color: '#f6a13a', fontWeight: 800, fontSize: 22 }}>
        技術×創造力の社会実装
      </EditableText>

      <div style={{ position: 'absolute', top: 160, left: 40, right: 40, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {TOP.map((d, i) => <Card key={i} d={d} />)}
      </div>

      <div style={{ position: 'absolute', top: 380, left: 220, right: 220, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {BOTTOM.map((d, i) => <Card key={i} d={d} />)}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px', background: '#f6a13a', color: '#fff', textAlign: 'center', fontWeight: 700, fontSize: 14 }}>
        エンタメで鍛えた技術を、社会に実装する
      </div>
    </Slide>
  );
}
