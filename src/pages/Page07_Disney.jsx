import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

export default function Page07Disney({ editMode }) {
  return (
    <Slide id="page-07" pageNumber={7} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      {/* Big image left */}
      <div style={{ position: 'absolute', top: 50, left: 30, width: 580, height: 600, borderRadius: 8, overflow: 'hidden' }}>
        <EditableImage id="p7-img" src={images.droneLights} editMode={editMode} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}>
          <div style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(255,255,255,0.15)', borderRadius: 4, color: '#fff', fontSize: 10, marginBottom: 6 }}>株式会社オリエンタルランド</div>
          <EditableText id="p7-cap" editMode={editMode} style={{ color: '#fff', fontWeight: 700, fontSize: 18, lineHeight: 1.4 }}>
            東京ディズニーシー<br/>Fantasy Springs 開業前夜イベント
          </EditableText>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 6 }}>📅 2024.06.05 | 📍 Tokyo DisneySea</div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ position: 'absolute', top: 70, left: 640, right: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ padding: '8px 12px', border: '1px solid #ef5350', background: 'rgba(239,83,80,0.12)', borderRadius: 6, color: '#ef5350', fontSize: 10, fontWeight: 600 }}>
          🔒 CONFIDENTIAL — 社内実績掲載のみ可 / SNS・Web公開不可
        </div>

        <div style={{ borderLeft: '4px solid #f6a13a', paddingLeft: 14 }}>
          <div style={{ fontFamily: 'Poppins', fontSize: 64, fontWeight: 800, color: '#f6a13a', lineHeight: 1 }}>No.1</div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginTop: 4 }}>SNSトレンド・YouTube急上昇</div>
          <div style={{ color: '#f6a13a', fontSize: 11 }}>同時1位獲得の歴史的一夜</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: '🐦', t: 'X (Twitter) トレンド', v: '1', u: '位', c: '#4a9eff' },
            { icon: '▶', t: 'YouTube 急上昇', v: '1', u: '位', c: '#ef5350' },
            { icon: '❤', t: 'エンゲージメント (いいね)', v: '10', u: '万+', c: '#f6a13a', sub: '🔥 RT 3.5万件超' },
            { icon: '📡', t: '生配信 同時接続', v: '40', u: '万人', c: '#2dd4bf', sub: '2日で120万回再生' },
          ].map((s, i) => (
            <div key={i} style={{ padding: 10, background: 'rgba(255,255,255,0.05)', borderLeft: `3px solid ${s.c}`, borderRadius: 6 }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}><span style={{ marginRight: 4 }}>{s.icon}</span>{s.t}</div>
              <div style={{ color: '#fff' }}><span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 22 }}>{s.v}</span><span style={{ fontSize: 11, marginLeft: 2 }}>{s.u}</span></div>
              {s.sub && <div style={{ fontSize: 9, color: s.c }}>{s.sub}</div>}
            </div>
          ))}
        </div>

        <div style={{ padding: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6 }}>
          <div style={{ color: '#fff', fontSize: 11, fontWeight: 600, marginBottom: 6 }}>📺 全キー局 ニュース報道</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {[1,2,3].map((i) => (
              <div key={i} style={{ height: 60, background: '#1a2332', borderRadius: 4, overflow: 'hidden' }}>
                <EditableImage id={`p7-news-${i}`} src={images.droneLights} editMode={editMode} style={{ width: '100%', height: '100%' }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '10px 14px', background: 'linear-gradient(90deg, #4a9eff, #2dd4bf)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)' }}>RESPONSIBLE SCOPE</div>
            <div style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>ドローンショー企画 / 制作 / 実行 + 空撮 + 安全管理</div>
          </div>
          <div style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.25)', borderRadius: 100, color: '#fff', fontSize: 10, fontWeight: 700 }}>End-to-End</div>
        </div>
      </div>
    </Slide>
  );
}
