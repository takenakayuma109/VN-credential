import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

const POINTS = [
  '災害時に必要な情報を一元管理',
  '複数エリアのドローン位置情報をリアルタイム共有',
  '統括者が現地映像を確認しながら音声チャットで指示',
  'マルチデバイス対応（PC / スマホ / タブレット）',
  '航空機飛行追跡・浸水想定区域・DID地区をマップ表示',
  'ドローン、街中の監視カメラ、スマホなど、全てのカメラの位置情報を取得しながら相互映像中継',
  '緊急地震速報やSIP4D（内閣府統合データ基盤）と連携',
];

export default function Page15Senrigan({ editMode }) {
  return (
    <Slide id="page-15" pageNumber={15} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      {/* Top logo */}
      <div style={{ position: 'absolute', top: 50, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(74,158,255,0.15)', border: '1px solid #4a9eff', borderRadius: 4, color: '#4a9eff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>
          ▲ 次世代防災情報統合プラットフォーム ▲<br/>Powered by VISIONOID
        </div>
      </div>

      <EditableText id="p15-title" editMode={editMode} style={{
        position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center', color: '#fff', fontSize: 36, fontWeight: 800, fontFamily: 'Poppins'
      }}>SENRIGAN（千里眼）</EditableText>
      <EditableText id="p15-sub" editMode={editMode} style={{ position: 'absolute', top: 158, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
        次世代防災情報統合プラットフォーム
      </EditableText>

      <EditableText id="p15-q" editMode={editMode} style={{ position: 'absolute', top: 195, left: 0, right: 0, textAlign: 'center', color: '#f6a13a', fontSize: 14, fontStyle: 'italic' }}>
        もし災害時に対策本部にいながら現場の状況を "5分で" 把握できたら ——
      </EditableText>

      {/* Screenshot left */}
      <div style={{ position: 'absolute', top: 230, left: 30, width: 580, height: 380, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
        <EditableImage id="p15-screen" src={images.tabletPlan} editMode={editMode} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Points right */}
      <div style={{ position: 'absolute', top: 240, left: 630, right: 30, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {POINTS.map((p, i) => (
          <div key={i} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: '3px solid #ef5350', borderRadius: 4 }}>
            <span style={{ color: '#ef5350', marginRight: 8 }}>●</span>
            <span style={{ color: '#fff', fontSize: 10.5 }}>{p}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, background: '#f6a13a', textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
        災害時の情報収集は【迅速】と【正確性】が命
      </div>
    </Slide>
  );
}
