import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

const PILLARS = [
  { c: '#4a9eff', icon: '⚙️', t: '技術力', d: 'ドローン・ドロイド・AI技術の開発・運用。唯一の国産ドローンショー機体「unika」開発者在籍。', tag: '機体開発・ソフト開発' },
  { c: '#a78bfa', icon: '🏗', t: '現場力', d: '1,000人以上のパイロット育成、3,000名超のコミュニティ運営実績者在籍。レース技術を転用。', tag: '安全管理・現場運用' },
  { c: '#9b6dff', icon: '🎨', t: 'クリエイティブ力', d: '累計約100作品以上の大規模案件実績。XR映像・Unreal Engine・デジタルツイン。', tag: '映像演出・デジタルツイン' },
  { c: '#f6a13a', icon: '🎯', t: 'プロデュース力', d: '東京モーターショー2019、東京2020五輪開会式、乃木坂46神宮球場1,100機ショー。', tag: '大規模イベント企画・制作' },
  { c: '#fbbf24', icon: '🏛', t: '戦略力', d: '電通ライブ・電通ビジネスプロデュース局での企業・政府機関の大規模プロジェクト実績。', tag: '戦略企画・マーケティング' },
  { c: '#2dd4bf', icon: '🚀', t: '実装力', d: '構想→設計→実行→運用を一社で完結。産業・防災・教育など社会インフラへ実装。', tag: 'エンドツーエンド実装' },
];

export default function Page03Core({ editMode }) {
  return (
    <Slide id="page-03" pageNumber={3} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      <div style={{ position: 'absolute', top: 50, left: 40, right: 40 }}>
        <EditableText id="p3-title" editMode={editMode} style={{ fontWeight: 700, fontSize: 22, color: '#fff' }}
          html='構想から運用まで、すべてを一社で完結 <span style="color:#4a9eff;font-size:14px;">— Core Competence</span>' />
        <EditableText id="p3-sub" editMode={editMode} style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
          6つの力を組み合わせたワンストップ体制。あらゆるフェーズに対応する総合力。
        </EditableText>
      </div>

      <div style={{ fontFamily: 'Poppins', fontSize: 130, fontWeight: 800, color: 'rgba(74,158,255,0.08)', position: 'absolute', top: 50, right: 50 }}>6</div>

      <div style={{ position: 'absolute', top: 130, left: 40, right: 40, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {PILLARS.map((p, i) => (
          <div key={i} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: `3px solid ${p.c}`, borderRadius: 8, minHeight: 130 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{p.icon}</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{p.t}</div>
            </div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, marginBottom: 8 }}>{p.d}</div>
            <div style={{ display: 'inline-block', padding: '3px 8px', background: `${p.c}33`, color: p.c, fontSize: 9, borderRadius: 100 }}>{p.tag}</div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 40, right: 40, padding: '12px 20px', background: 'rgba(8,14,28,0.85)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: '#fff' }}>
        {['構想 Concept', '設計 Design', '実行 Execute', '運用 Operate'].map((s, i, a) => (
          <React.Fragment key={i}>
            <div style={{ fontSize: 13 }}>{s}</div>
            {i < a.length - 1 && <div style={{ color: '#4a9eff' }}>→</div>}
          </React.Fragment>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 30, left: 40, right: 40, padding: '12px 20px',
        background: 'rgba(246,161,58,0.12)', border: '1px solid rgba(246,161,58,0.4)', borderRadius: 8, textAlign: 'center', color: '#fff', fontSize: 13 }}>
        ⭐ <strong style={{ color: '#f6a13a' }}>国内唯一のポジション：</strong> エンタメ × 産業・防災 の両領域で実績を持ち、直接競合がほぼ存在しない
      </div>
    </Slide>
  );
}
