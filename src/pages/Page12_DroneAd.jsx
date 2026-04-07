import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

export default function Page12DroneAd({ editMode }) {
  return (
    <Slide id="page-12" pageNumber={12} headerVariant="dark" background="#f4f6fa">
      <div style={{ position: 'absolute', top: 60, left: 40, right: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, height: 250 }}>
        <div style={{ borderRadius: 8, overflow: 'hidden' }}>
          <EditableImage id="p12-img1" src={images.droneLights} editMode={editMode} style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{ borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
          <EditableImage id="p12-img2" src={images.tabletPlan} editMode={editMode} style={{ width: '100%', height: '100%' }} />
          <div style={{ position: 'absolute', bottom: 6, right: 8, background: 'rgba(255,255,255,0.9)', padding: '2px 6px', fontSize: 9, borderRadius: 3 }}>場所：キラナガーデン豊洲</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 320, left: 40, right: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ padding: '4px 10px', background: '#fbbf24', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 4 }}>👑 日本初</span>
        <EditableText id="p12-h1" editMode={editMode} style={{ fontWeight: 700, fontSize: 18, color: '#1a2332' }}>
          「ドローンショー×広告」という新しい夜空のメディア開発事業
        </EditableText>
      </div>

      <div style={{ position: 'absolute', top: 365, left: 40, right: 40, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { icon: '👁', t: '到達率', big: '360°視認', desc: '夜空全体がスクリーンとなり、エリア一帯からの圧倒的な視認性を確保', c: '#4a9eff' },
          { icon: '🔗', t: 'SNS波及', big: 'Earned Media', desc: '「撮りたくなる」体験がSNSでの自然拡散と高エンゲージメントを生む', c: '#f6a13a' },
          { icon: '📈', t: 'ブランドリフト', big: '体験型広告', desc: '一方的な視認ではなく「体験」として記憶されるため、従来OOH比で高い効果', c: '#9b6dff' },
        ].map((it, i) => (
          <div key={i} style={{ padding: 14, background: '#fff', borderTop: `3px solid ${it.c}`, borderRadius: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#1a2332', fontWeight: 700 }}>
              <span>{it.icon}</span>{it.t}
            </div>
            <div style={{ color: it.c, fontWeight: 700, fontSize: 18, marginTop: 6 }}>{it.big}</div>
            <div style={{ fontSize: 10, color: '#475569', marginTop: 6, lineHeight: 1.5 }}>{it.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 70, left: 40, right: 40, padding: '10px 14px', background: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#1a2332' }}>活用シーン</span>
        {[
          { i: '🏢', t: '企業ブランディング' },
          { i: '🎉', t: '周年施策' },
          { i: '✨', t: '新商品発表' },
          { i: '🎯', t: 'キャンペーン' },
          { i: '👥', t: '採用広報' },
        ].map((s, i) => (
          <span key={i} style={{ padding: '4px 10px', background: '#f1f5f9', borderRadius: 4, fontSize: 10, color: '#1a2332' }}>{s.i} {s.t}</span>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 16, left: 40, right: 40, padding: '12px 18px', background: '#fef3c7', borderLeft: '4px solid #f6a13a', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ padding: '4px 10px', background: '#f6a13a', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 3 }}>参考｜広告効果</span>
        <span style={{ fontSize: 11, color: '#1a2332' }}>2026年3月 RIP SLYME再解散メッセージドローンショー</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#1a2332' }}>広告価値換算：</span>
        <strong style={{ fontSize: 18, color: '#f6a13a' }}>1.5億〜3億円</strong>
      </div>
    </Slide>
  );
}
