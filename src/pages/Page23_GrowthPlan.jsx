import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

export default function Page23GrowthPlan({ editMode }) {
  return (
    <Slide id="page-23" pageNumber={23} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <div style={{ color: '#4a9eff', fontSize: 11, letterSpacing: '0.2em', fontWeight: 600 }}>FINANCE</div>
        <EditableText id="p23-title" editMode={editMode} style={{ color: '#fff', fontWeight: 800, fontSize: 26, marginTop: 4 }}>
          Growth Plan / Exit Strategy
        </EditableText>
        <EditableText id="p23-sub" editMode={editMode} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 4 }}>
          2028年バイアウトを見据えた投資ストーリー
        </EditableText>
      </div>

      {/* Why Now */}
      <div style={{ position: 'absolute', top: 140, left: 40, width: 600 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>なぜ今、VISIONOIDなのか</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { icon: '🎬', t: 'エンタメ', d: '収益性が高く拡張性がある', c: '#4a9eff' },
            { icon: '🛡', t: '防災', d: '公共性が高く単価が大きい', c: '#f6a13a' },
            { icon: '🔬', t: '技術', d: '再現性がありスケールできる', c: '#2dd4bf' },
          ].map((p, i) => (
            <div key={i} style={{ padding: 10, background: 'rgba(255,255,255,0.05)', borderTop: `2px solid ${p.c}`, borderRadius: 4 }}>
              <div style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{p.icon} {p.t}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, marginTop: 4 }}>{p.d}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>成長ドライバー</div>
          <div style={{ padding: 10, background: 'rgba(255,255,255,0.04)', borderLeft: '3px solid #4a9eff', borderRadius: 4, marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: '#4a9eff', fontWeight: 700 }}>① 常設型ドローンショー事業 <span style={{ color: 'rgba(255,255,255,0.6)' }}>(キラナガーデン豊洲)</span></div>
            <div style={{ marginTop: 6, display: 'flex', gap: 24 }}>
              <div><div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>年間売上想定</div><div style={{ fontSize: 16, color: '#4a9eff', fontWeight: 800 }}>約2.5億円</div></div>
              <div><div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>年間粗利想定</div><div style={{ fontSize: 16, color: '#4a9eff', fontWeight: 800 }}>約1.25億円</div></div>
            </div>
          </div>
          <div style={{ padding: 10, background: 'rgba(255,255,255,0.04)', borderLeft: '3px solid #f6a13a', borderRadius: 4 }}>
            <div style={{ fontSize: 11, color: '#f6a13a', fontWeight: 700 }}>② SENRIGAN <span style={{ color: 'rgba(255,255,255,0.6)' }}>(自治体導入モデル)</span></div>
            <div style={{ marginTop: 6, display: 'flex', gap: 24 }}>
              <div><div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>1自治体あたり売上</div><div style={{ fontSize: 16, color: '#f6a13a', fontWeight: 800 }}>5億〜10億円</div></div>
              <div><div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>導入計画(2026)</div><div style={{ fontSize: 16, color: '#f6a13a', fontWeight: 800 }}>3〜5自治体</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast right */}
      <div style={{ position: 'absolute', top: 140, left: 670, right: 30 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>売上・利益イメージ</div>
        {[
          { y: '2026 (Forecast)', s: '20億〜35億円', g: '10億〜18億円', n: '5億〜12億円', c: '#4a9eff' },
          { y: '2027 (Forecast)', s: '35億〜55億円', g: '18億〜28億円', n: '10億〜20億円', c: '#f6a13a' },
        ].map((f, i) => (
          <div key={i} style={{ padding: 12, background: 'rgba(255,255,255,0.05)', borderLeft: `3px solid ${f.c}`, borderRadius: 6, marginBottom: 10 }}>
            <div style={{ display: 'inline-block', padding: '3px 10px', background: f.c, color: '#fff', borderRadius: 100, fontSize: 10, fontWeight: 700, marginBottom: 8 }}>{f.y}</div>
            {[
              { l: '売上高', v: f.s, big: true },
              { l: '粗利益', v: f.g },
              { l: '純利益', v: f.n, em: true },
            ].map((r, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ color: r.em ? f.c : 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: r.em ? 700 : 400 }}>{r.l}</span>
                <span style={{ color: '#fff', fontSize: r.big ? 18 : 14, fontWeight: r.big || r.em ? 700 : 500 }}>{r.v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 10, left: 40, right: 40, padding: 14, background: 'linear-gradient(90deg,#f6a13a,#fbbf24)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 24 }}>🚀</span>
          <div>
            <div style={{ color: '#fff', fontSize: 11, letterSpacing: '0.1em' }}>TARGET EXIT 2028</div>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>想定企業価値 80億〜160億円</div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10 }}>純利益 10億〜20億円 × マルチプル 8倍</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#fff', fontSize: 10, letterSpacing: '0.1em', marginBottom: 4 }}>EXIT CANDIDATES</div>
          <div style={{ color: '#fff', fontSize: 9, lineHeight: 1.5 }}>
            大手通信会社 / インフラ関連企業<br/>メディア・エンタメ企業<br/>防災・安全関連企業 / 大手SIer
          </div>
        </div>
      </div>
    </Slide>
  );
}
