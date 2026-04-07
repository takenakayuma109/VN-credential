import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

export default function Page25Financial({ editMode }) {
  return (
    <Slide id="page-25" pageNumber={25} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <div style={{ color: '#4a9eff', fontSize: 11, letterSpacing: '0.2em', fontWeight: 600 }}>FINANCE</div>
        <EditableText id="p25-title" editMode={editMode} style={{ color: '#fff', fontWeight: 800, fontSize: 26, marginTop: 4 }}
          html='Financial &amp; Assets <span style="color:rgba(255,255,255,0.6);font-size:13px;">すでに"実体のある会社"である証拠</span>' />
      </div>

      <div style={{ position: 'absolute', top: 140, left: 40, width: 580 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>Financial Summary</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>※ 2025年度決算報告書より</div>
        </div>
        {[
          { l: '現金・預金', sub: '2025年度末', v: '約1.27億円', c: '#4a9eff' },
          { l: '売掛金', sub: '主要取引先含む', v: '約1,070万円', c: '#fbbf24' },
          { l: '固定資産', sub: '機材・ソフト・設備', v: '約8,315万円', c: '#34d399' },
        ].map((r, i) => (
          <div key={i} style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.05)', borderLeft: `3px solid ${r.c}`, borderRadius: 6, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{r.l}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 9 }}>{r.sub}</div>
            </div>
            <div style={{ color: '#fff', fontSize: 26, fontWeight: 800, fontFamily: 'Poppins' }}>{r.v}</div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', top: 140, left: 660, right: 30 }}>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 14 }}>保有資産（抜粋）</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            '🐕 四足歩行ロボット(Unitree)',
            '🛸 ドローン機体(複数)',
            '🛩 VTOL型ドローン',
            '🎥 映像機材',
            '📦 イベント設備',
            '💻 ソフトウェア(運用システム)',
          ].map((t, i) => (
            <span key={i} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, color: 'rgba(255,255,255,0.85)', fontSize: 10 }}>{t}</span>
          ))}
        </div>

        <div style={{ marginTop: 30, padding: 14, background: 'rgba(74,158,255,0.08)', border: '1px solid rgba(74,158,255,0.4)', borderRadius: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, textDecoration: 'line-through' }}>VISIONOIDは企画会社ではない</span>
            <span style={{ color: '#4a9eff' }}>→</span>
            <span style={{ color: '#4a9eff', fontWeight: 800, fontSize: 22 }}>実装会社</span>
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, color: '#fff', fontSize: 11 }}>技術・機材・実績、すべてを既に持っている</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 16, left: 40, right: 40, padding: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>これは単なる資金調達ではありません。</div>
        <div style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginTop: 4 }}>
          社会インフラを作る企業に参加すること <span style={{ color: '#f6a13a' }}>| 2028年、明確なExitを持つ投資</span>
        </div>
      </div>
    </Slide>
  );
}
