import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

export default function Page13Community({ editMode }) {
  return (
    <Slide id="page-13" pageNumber={13} headerVariant="dark" background="#f4f6fa">
      {/* Left full-bleed photo */}
      <div style={{ position: 'absolute', top: 28, left: 0, width: 480, bottom: 0, overflow: 'hidden' }}>
        <EditableImage id="p13-bg" src={images.droneOp} editMode={editMode} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,18,36,0.55), rgba(10,18,36,0.85))' }} />
        <div style={{ position: 'absolute', bottom: 30, left: 30, color: '#fff' }}>
          <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.3 }}>子どもたちの夢が、<br/>夜空に輝く</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>テクノロジー × 創造力 × 地域の絆</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 60, left: 510, right: 30 }}>
        <div style={{ display: 'inline-block', padding: '4px 10px', background: '#4a9eff', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 100 }}>Community Co-Creation</div>
        <EditableText id="p13-title" editMode={editMode} style={{ fontWeight: 700, fontSize: 19, color: '#1a2332', marginTop: 10 }}>
          地域の子どもたちと作り上げる、新しいドローンショーの形
        </EditableText>
        <EditableText id="p13-sub" editMode={editMode} style={{ fontSize: 11, color: '#475569', marginTop: 6, lineHeight: 1.6 }}>
          テクノロジーを通じて子どもたちの創造力を解放し、地域の夢を夜空のキャンバスに描く。ワークショップから本番まで、子どもたちが主役の体験型エンターテインメントを提供します。
        </EditableText>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
          {[
            { id: 'c1', img: images.droneOp, icon: '🎃', title: '桶川ハロウィンドローンショー', size: '200機', date: '2025.10', desc: '子供たちがワークショップで描いたハロウィンストーリーを200機のドローンで夜空に完全再現。地域の夢を形にしました。' },
            { id: 'c2', img: images.droneLights, icon: '✨', title: '桐生JC関東大会', size: '400機', date: '2025.07', desc: 'AI技術を活用した子供たちのワークショップを実施。自ら考えた演出が夜空に輝き、感動の声が上がりました。' },
          ].map((c) => (
            <div key={c.id}>
              <div style={{ height: 110, borderRadius: 6, overflow: 'hidden' }}>
                <EditableImage id={`p13-${c.id}`} src={c.img} editMode={editMode} style={{ width: '100%', height: '100%' }} />
              </div>
              <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: '#1a2332' }}>{c.icon} {c.title}</div>
              <div style={{ fontSize: 9, color: '#4a9eff', marginTop: 2 }}>{c.size} | {c.date}</div>
              <div style={{ fontSize: 9, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#1a2332' }}>料金体系</span>
            <span style={{ padding: '3px 8px', background: '#34d399', color: '#fff', fontSize: 9, borderRadius: 3 }}>市場価格の約60%</span>
          </div>
          <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {[
              { n: '200機', p: '300万円〜', c: '#94a3b8' },
              { n: '300機', p: '500万円〜', c: '#4a9eff' },
              { n: '500機', p: '800万円〜', c: '#f6a13a' },
            ].map((r, i) => (
              <div key={i} style={{ padding: '8px 12px', background: '#fff', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#1a2332' }}>{r.n}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: r.c }}>{r.p}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-around', fontSize: 9, color: '#475569' }}>
          <span>🔧 独自機体リーススキーム</span>
          <span>⚡ 生成AIによる制作革新</span>
          <span>🛡 社内安全運用システム</span>
        </div>
      </div>
    </Slide>
  );
}
