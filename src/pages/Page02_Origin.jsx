import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

export default function Page02Origin({ editMode }) {
  return (
    <Slide id="page-02" pageNumber={2} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      {/* Title */}
      <EditableText id="p2-title" editMode={editMode} style={{
        position: 'absolute', top: 50, left: 40, fontWeight: 700, fontSize: 22, color: '#fff',
      }}>エンタメで鍛えた技術を、社会に実装する</EditableText>
      <EditableText id="p2-en" editMode={editMode} style={{
        position: 'absolute', top: 56, right: 40, color: '#4a9eff', fontSize: 13, letterSpacing: '0.05em',
      }}>— Our Origin</EditableText>
      <EditableText id="p2-sub" editMode={editMode} style={{
        position: 'absolute', top: 78, left: 40, color: 'rgba(255,255,255,0.6)', fontSize: 12,
      }}>ドローン・ロボティクス・AIを武器に、エンターテインメントから社会インフラまで。</EditableText>

      {/* Headline banner */}
      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, padding: '24px 30px',
        background: 'linear-gradient(135deg, rgba(74,158,255,0.25), rgba(124,92,252,0.18))',
        border: '1px solid rgba(74,158,255,0.4)', borderLeft: '4px solid #f6a13a', borderRadius: 8,
        textAlign: 'center' }}>
        <EditableText id="p2-banner-title" editMode={editMode} style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 6 }}
          html='エンタメと産業は<span style="color:#f6a13a">表裏一体</span>である' />
        <EditableText id="p2-banner-en" editMode={editMode} style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
          Entertainment and Industry are two sides of the same coin
        </EditableText>
      </div>

      {/* Mid row */}
      <div style={{ position: 'absolute', top: 240, left: 40, right: 40, padding: '14px 24px',
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, textAlign: 'center' }}>
        <EditableText id="p2-mid" editMode={editMode} style={{ color: '#fff', fontSize: 16 }}
          html='構想から運用まで一社で完結する、<span style="color:#f6a13a">国内唯一</span>の Visionary Technology Company' />
      </div>

      {/* Three pillars */}
      <div style={{ position: 'absolute', top: 300, left: 40, right: 40, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { icon: '🛸', t: 'Drone Technology', s: '国産機体開発から大規模運用まで', c: '#4a9eff' },
          { icon: '🤖', t: 'Robotics & Physical AI', s: 'ロボットが歌い踊るエンタメ体験', c: '#9b6dff' },
          { icon: '🌐', t: 'AI & Digital Twin', s: 'XR映像・防災・シミュレーション', c: '#2dd4bf' },
        ].map((p, i) => (
          <div key={i} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.05)', borderLeft: `3px solid ${p.c}`, borderRadius: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}><span style={{ marginRight: 6 }}>{p.icon}</span>{p.t}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{p.s}</div>
          </div>
        ))}
      </div>

      {/* Analogy + steps */}
      <div style={{ position: 'absolute', top: 380, left: 40, right: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: 16, borderLeft: '3px solid #f6a13a' }}>
          <div style={{ color: '#f6a13a', fontWeight: 700, fontSize: 14, textAlign: 'center', marginBottom: 14 }}>自動車レースと市販車の比喩</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
            <span style={{ color: '#f6a13a', fontWeight: 700 }}>エンタメ ＝ レース</span>
            <span>極限の現場で技術を鍛え上げる</span>
            <span style={{ color: '#f6a13a', fontWeight: 700 }}>産業 ＝ 市販車</span>
            <span>磨かれた技術を社会インフラに実装</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: 16 }}>
          {[
            { icon: '💡', t: '構想', en: 'Concept' },
            { icon: '🎨', t: '設計', en: 'Design' },
            { icon: '▶', t: '実行', en: 'Execute' },
            { icon: '🔄', t: '運用', en: 'Operate' },
          ].map((s, i, a) => (
            <React.Fragment key={i}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(74,158,255,0.18)', border: '1px solid rgba(74,158,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#4a9eff', marginBottom: 4 }}>{s.icon}</div>
                <div style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{s.t}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9 }}>{s.en}</div>
              </div>
              {i < a.length - 1 && <div style={{ color: 'rgba(255,255,255,0.4)' }}>›</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom highlight */}
      <div style={{ position: 'absolute', bottom: 30, left: 40, right: 40, padding: '14px 24px',
        background: 'linear-gradient(90deg, rgba(246,161,58,0.2), rgba(246,161,58,0.05))',
        borderLeft: '4px solid #f6a13a', borderRadius: 6,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <EditableText id="p2-bottom" editMode={editMode} style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}
          html='⭐ エンタメ × 産業・防災・教育' />
        <EditableText id="p2-bottom2" editMode={editMode} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
          直接競合がほぼ存在しない、唯一のポジション
        </EditableText>
      </div>
    </Slide>
  );
}
