import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

export default function Page09PhysicalAI({ editMode }) {
  return (
    <Slide id="page-09" pageNumber={9} headerVariant="dark" background="#f4f6fa">
      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <EditableText id="p9-title" editMode={editMode} style={{ fontWeight: 700, fontSize: 21, color: '#1a2332' }}
          html='ロボットが話し、歌い、踊る時代が始まった <span style="color:#4a9eff;font-size:13px;">— Physical AI &amp; Robotics</span>' />
      </div>

      <div style={{ position: 'absolute', top: 100, left: 40, width: 580, background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <div style={{ position: 'relative', height: 280 }}>
          <EditableImage id="p9-fox" src={images.foxPlush} editMode={editMode} style={{ width: '100%', height: '100%' }} />
          <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '3px 8px', fontSize: 10, borderRadius: 3 }}>Animanoid FOX Live Performance</div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>🦊</span>
            <EditableText id="p9-foxt" editMode={editMode} style={{ fontWeight: 700, fontSize: 16, color: '#1a2332' }}>フィジカルAI『アニマノイドFOX』</EditableText>
          </div>
          <div style={{ fontSize: 11, color: '#9b6dff', fontWeight: 600, marginTop: 2 }}>トーク＆ミュージカルショー演出</div>
          <EditableText id="p9-foxd" editMode={editMode} style={{ fontSize: 11, color: '#475569', lineHeight: 1.6, marginTop: 8 }}>
            エンターテインメント領域で独自開発されたパフォーマンスロボット。高度なトーク機能とミュージカルショー演出を実装し、観客との双方向インタラクションを実現するフィジカルAI×IPのエンタメロボット。
          </EditableText>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {['💬 自然なトーク', '🎵 ミュージカル演出', '👥 観客参加型', '🤖 AI搭載'].map((t, i) => (
              <span key={i} style={{ fontSize: 10, color: '#9b6dff', padding: '3px 8px', background: 'rgba(155,109,255,0.1)', borderRadius: 4 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 100, left: 660, right: 40, background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <div style={{ position: 'relative', height: 280 }}>
          <EditableImage id="p9-sushi" src={images.sushitech} editMode={editMode} style={{ width: '100%', height: '100%' }} />
          <div style={{ position: 'absolute', top: 8, left: 8, background: '#34d399', color: '#fff', padding: '3px 8px', borderRadius: 3, fontSize: 10, fontWeight: 700 }}>✓ 出演確定 2026年4月27日〜29日 @東京ビッグサイト</div>
          <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '3px 8px', fontSize: 10, borderRadius: 3 }}>Industry Insights</div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>🍣</span>
            <EditableText id="p9-st" editMode={editMode} style={{ fontWeight: 700, fontSize: 16, color: '#1a2332' }}>SusHi Tech TOKYO 2026</EditableText>
          </div>
          <div style={{ fontSize: 11, color: '#f6a13a', fontWeight: 600, marginTop: 2 }}>アジア最大級のイノベーションカンファレンス</div>
          <EditableText id="p9-sd" editMode={editMode} style={{ fontSize: 11, color: '#475569', lineHeight: 1.6, marginTop: 8 }}>
            東京都が主催する国際的なテクノロジーイベントに、VISIONOIDのフィジカルAI技術が選出。「フィジカルAI×IP」枠として、ロボットFOXによる次世代のエンターテインメント体験を世界に発信します。
          </EditableText>
          <div style={{ marginTop: 10, padding: 10, background: '#f8fafc', borderRadius: 6, fontSize: 10, color: '#475569' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', rowGap: 4 }}>
              <div>開催日程</div><div style={{ color: '#1a2332', fontWeight: 600 }}>2026年4月27日(月) 〜 29日(水)</div>
              <div>会場</div><div style={{ color: '#1a2332', fontWeight: 600 }}>東京ビッグサイト</div>
              <div>出演枠</div><div style={{ color: '#f6a13a', fontWeight: 600 }}>フィジカルAI × IPショーケース</div>
              <div>規模</div><div style={{ color: '#1a2332', fontWeight: 600 }}>来場者数 50,000人規模（想定）</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 40, right: 40, padding: '12px 20px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 12, color: '#1a2332', fontWeight: 600 }}>
        ➡ エンタメ起点のロボティクス開発 ➡ 社会実装 <span style={{ fontSize: 10, color: '#475569', fontWeight: 400 }}>From Stage to Field</span>
      </div>
    </Slide>
  );
}
