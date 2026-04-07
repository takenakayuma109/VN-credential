import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

const TILES = [
  { icon: '🛸', t: 'ドローン市場', big: '4,371億円', sub: '↑ 15.2% CAGR', desc: '2024年 → 1兆195億円（2030年）', src: '出典: インプレス総合研究所『ドローンビジネス調査報告書2025』', c: '#4a9eff' },
  { icon: '📊', t: 'ドローンショー', big: '前年比2倍', sub: '↑ 急拡大中', desc: 'エンタメ領域での需要急増', src: '出典: インプレス総合研究所『ドローンビジネス調査報告書2025』', c: '#2dd4bf' },
  { icon: '🤖', t: 'フィジカルAI', big: '2.5兆円', sub: '↑ 2030年予測', desc: '日本市場：7,800億円→2.5兆円', src: '出典: 三菱総合研究所『AIロボティクスレポート2025』', c: '#f6a13a' },
  { icon: '🛡', t: '防災DX', big: '2,153億円', sub: '↑ 2025年', desc: '→ 2,459億円（2031年）', src: '出典: シード・プランニング『防災情報システム・サービス市場2025』', c: '#9b6dff' },
];

const TREND = [
  { y: '2024', v: '4,371億円', w: 30 },
  { y: '2026', v: '6,200億円', w: 50 },
  { y: '2028', v: '8,500億円', w: 70 },
  { y: '2030', v: '10,195億円', w: 95 },
];

export default function Page17Market({ editMode }) {
  return (
    <Slide id="page-17" pageNumber={17} headerVariant="dark" background="#f4f6fa">
      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <EditableText id="p17-title" editMode={editMode} style={{ fontWeight: 700, fontSize: 22, color: '#1a2332' }}
          html='1兆円市場の夜明け <span style="color:#4a9eff;">— 3つの波に乗る</span> <span style="color:#475569;font-size:13px;">— Market Opportunity</span>' />
        <EditableText id="p17-sub" editMode={editMode} style={{ fontSize: 11, color: '#475569', marginTop: 6 }}>
          日本ドローン市場は2024年の4,371億円から2030年に1兆195億円へ。<br/>ドローンショー市場は前年比約2倍で急拡大中
        </EditableText>
      </div>

      <div style={{ position: 'absolute', top: 60, right: 40, fontFamily: 'Poppins', fontWeight: 800, color: 'rgba(74,158,255,0.18)', fontSize: 60, lineHeight: 1, textAlign: 'right' }}>
        1兆円<div style={{ fontSize: 11, color: '#475569' }}>2030年市場規模予測</div>
      </div>

      <div style={{ position: 'absolute', top: 160, left: 40, right: 40, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {TILES.map((t, i) => (
          <div key={i} style={{ padding: 12, background: '#fff', borderTop: `3px solid ${t.c}`, borderRadius: 6, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1a2332' }}>{t.icon} {t.t}</div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 22, color: '#1a2332', marginTop: 4 }}>{t.big}</div>
            <div style={{ fontSize: 10, color: t.c, fontWeight: 600 }}>{t.sub}</div>
            <div style={{ fontSize: 9, color: '#475569', marginTop: 4 }}>{t.desc}</div>
            <div style={{ fontSize: 8, color: '#94a3b8', marginTop: 4, fontStyle: 'italic' }}>{t.src}</div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 30, left: 40, width: 580, padding: 16, background: '#fff', borderRadius: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2332' }}>市場成長トレンド</div>
            <div style={{ fontSize: 10, color: '#475569' }}>ドローン市場の拡大予測（2024-2030）</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#34d399', fontWeight: 700 }}>↗ +15.2% YoY</div>
            <div style={{ fontSize: 9, color: '#94a3b8' }}>出典: インプレス総合研究所</div>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          {TREND.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: '#475569', width: 36 }}>{r.y}</span>
              <div style={{ flex: 1, height: 18, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${r.w}%`, height: '100%', background: 'linear-gradient(90deg,#0a1a3a, #4a9eff)' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1a2332', width: 80, textAlign: 'right' }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 30, left: 640, right: 40, padding: 16, background: '#fff', borderRadius: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2332' }}>3つの成長領域</div>
        <div style={{ fontSize: 10, color: '#475569' }}>市場シェアと成長ポテンシャル</div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 140 }}>
          {[
            { v: '60%', t: 'Entertainment', c: '#22d3ee' },
            { v: '75%', t: 'Industrial', c: '#f6a13a' },
            { v: '90%', t: 'Physical AI', c: '#34d399' },
          ].map((b, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: b.c, fontWeight: 700, marginBottom: 4 }}>{b.v}</div>
              <div style={{ width: 50, height: parseInt(b.v) + 20, background: b.c, borderRadius: '4px 4px 0 0' }} />
              <div style={{ fontSize: 10, color: '#475569', marginTop: 6 }}>{b.t}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
