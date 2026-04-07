import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

export default function Page24Pipeline({ editMode }) {
  return (
    <Slide id="page-24" pageNumber={24} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <div style={{ color: '#4a9eff', fontSize: 11, letterSpacing: '0.2em', fontWeight: 600 }}>FINANCE</div>
        <EditableText id="p24-title" editMode={editMode} style={{ color: '#fff', fontWeight: 800, fontSize: 26, marginTop: 4 }}
          html='Current &amp; Pipeline <span style="color:rgba(255,255,255,0.6);font-size:13px;">現在 → 2026 → 2027の成長トラジェクトリー</span>' />
      </div>

      <div style={{ position: 'absolute', top: 130, left: 40, right: 40, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {/* Foundation */}
        <div style={{ padding: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderTop: '3px solid #94a3b8', borderRadius: 8 }}>
          <div style={{ color: '#94a3b8', fontSize: 10, letterSpacing: '0.2em' }}>FOUNDATION</div>
          <div style={{ fontFamily: 'Poppins', fontSize: 26, fontWeight: 800, color: '#fff', marginTop: 4 }}>2024-2025</div>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginTop: 8 }}>基盤創造・実績づくり</div>
          <ul style={{ listStyle: 'none', marginTop: 12, fontSize: 9, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            {[
              'ディズニーシー Fantasy Springs 開業前夜ドローンショー',
              '乃木坂46 真夏の全国ツアーファイナル',
              '江の島マイアミビーチショー「天女と龍神」',
              'サントリーグローバルカンファレンスOP演出',
              'ハウステンボス 常設ドローンショー',
              '産業点検・防災サービス開発に従事',
              '設備投資（ドローン機体・ロボット・イベント設備・ソフトウェア開発等）',
            ].map((t, i) => <li key={i}>● {t}</li>)}
          </ul>
          <div style={{ marginTop: 16, padding: '6px 12px', background: 'rgba(74,158,255,0.15)', color: '#4a9eff', borderRadius: 100, fontSize: 10, fontWeight: 700, textAlign: 'center' }}>大型エンタメ実績＋産業基盤構築</div>
        </div>

        {/* Turning Point */}
        <div style={{ padding: 16, background: 'rgba(74,158,255,0.08)', border: '1px solid #4a9eff', borderTop: '3px solid #4a9eff', borderRadius: 8 }}>
          <div style={{ color: '#4a9eff', fontSize: 10, letterSpacing: '0.2em' }}>TURNING POINT</div>
          <div style={{ fontFamily: 'Poppins', fontSize: 38, fontWeight: 800, color: '#4a9eff', marginTop: 4 }}>2026</div>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginTop: 4 }}>「一気に跳ねる年」</div>
          <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(74,158,255,0.2)', borderRadius: 4, color: '#4a9eff', fontSize: 10, fontWeight: 600 }}>4月時点で売上2億円確定</div>

          <div style={{ marginTop: 12 }}>
            <div style={{ color: '#4a9eff', fontSize: 11, fontWeight: 700 }}>キラナガーデン豊洲 (常設)</div>
            <div style={{ marginTop: 6, padding: 8, background: 'rgba(0,0,0,0.3)', borderRadius: 4, display: 'flex', gap: 14 }}>
              <div><div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>売上</div><div style={{ fontSize: 14, color: '#4a9eff', fontWeight: 800 }}>約2.5億円</div></div>
              <div><div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>粗利</div><div style={{ fontSize: 14, color: '#4a9eff', fontWeight: 800 }}>約1.25億円</div></div>
            </div>

            <div style={{ color: '#f6a13a', fontSize: 11, fontWeight: 700, marginTop: 10 }}>SENRIGAN (自治体)</div>
            <div style={{ marginTop: 6, padding: 8, background: 'rgba(0,0,0,0.3)', borderRadius: 4 }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>導入目標</div>
              <div style={{ fontSize: 14, color: '#f6a13a', fontWeight: 800 }}>3〜5自治体</div>
            </div>

            <div style={{ marginTop: 14, fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>2026年 合計売上イメージ</div>
            <div style={{ fontSize: 22, color: '#fff', fontWeight: 800 }}>20億〜35億円</div>
          </div>
        </div>

        {/* Scale */}
        <div style={{ padding: 16, background: 'rgba(246,161,58,0.08)', border: '1px solid #f6a13a', borderTop: '3px solid #f6a13a', borderRadius: 8 }}>
          <div style={{ color: '#f6a13a', fontSize: 10, letterSpacing: '0.2em' }}>SCALE PHASE</div>
          <div style={{ fontFamily: 'Poppins', fontSize: 38, fontWeight: 800, color: '#f6a13a', marginTop: 4 }}>2027</div>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginTop: 4 }}>「再現性が証明される年」</div>
          <div style={{ marginTop: 12 }}>
            <div style={{ color: '#f6a13a', fontSize: 11, fontWeight: 700 }}>主な展開</div>
            <ul style={{ listStyle: 'none', marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>
              <li>✓ 常設拠点：複数化</li>
              <li>✓ 自治体：追加導入・拡大</li>
              <li>✓ 民間インフラ案件拡大</li>
            </ul>
          </div>
          <div style={{ marginTop: 50, fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>2027年 合計売上イメージ</div>
          <div style={{ fontSize: 22, color: '#fff', fontWeight: 800 }}>35億〜55億円</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 16, left: 40, right: 40, padding: 14, background: 'rgba(74,158,255,0.12)', border: '1px solid #4a9eff', borderRadius: 8, textAlign: 'center', color: '#fff', fontSize: 14, fontWeight: 700 }}>
        VISIONOIDは<span style={{ color: '#4a9eff' }}>既に立ち上がっており</span>、2026年に<span style={{ color: '#f6a13a' }}>一気に拡大フェーズへ入る</span>
      </div>
    </Slide>
  );
}
