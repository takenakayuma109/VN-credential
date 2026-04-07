import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

const ITEMS = [
  { id: 'i1', img: images.monoInspect, icon: '🚝', title: '多摩モノレール 床下狭隘部点検', desc: 'モノレール走行路の床下狭隘部にドローンを投入し、目視困難な箇所の損傷・劣化を調査' },
  { id: 'i2', img: images.bridgeUnder1, icon: '🌉', title: '京急本線 鉄道橋点検', desc: '鉄道橋梁の損傷・クラックを高解像度カメラで撮影し報告書を作成' },
  { id: 'i3', img: images.damInspect, icon: '🏞', title: '三重県内ダム 地下貯水槽点検', desc: '暗闇・GPS不通環境下でドローンを用いた構造物の劣化診断' },
  { id: 'i4', img: images.isetanBldg, icon: '🏬', title: '伊勢丹新宿 外壁調査', desc: '赤外線カメラ搭載ドローンによるタイル剥離・漏水の非破壊検査' },
  { id: 'i5', img: images.hoshino, icon: '🏨', title: '星野リゾート熱海 外壁調査', desc: 'リゾート施設の高所外壁を安全に調査し、修繕計画を策定' },
  { id: 'i6', img: images.warehouse, icon: '🏢', title: '京田辺倉庫 外壁調査', desc: '倉庫施設の外壁劣化を空撮+赤外線で効率的に診断' },
];

export default function Page10Industrial({ editMode }) {
  return (
    <Slide id="page-10" pageNumber={10} headerVariant="dark" background="#f4f6fa">
      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <EditableText id="p10-title" editMode={editMode} style={{ fontWeight: 700, fontSize: 21, color: '#1a2332' }}
          html='エンタメで鍛えた技術が、社会インフラを守る <span style="color:#4a9eff;font-size:13px;">— Industrial Overview</span>' />
        <EditableText id="p10-sub" editMode={editMode} style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>
          高難度演出で磨いた運用・安全・通信・編隊制御技術を、インフラ点検・防災・産業領域に転用
        </EditableText>
      </div>

      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: '1fr 1fr', gap: 12 }}>
        {ITEMS.map((it) => (
          <div key={it.id} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 140 }}>
              <EditableImage id={`p10-${it.id}`} src={it.img} editMode={editMode} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1a2332' }}><span style={{ marginRight: 4 }}>{it.icon}</span>{it.title}</div>
              <div style={{ fontSize: 9.5, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>{it.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 16, left: 40, right: 40, padding: '12px 18px', background: '#0a1a3a', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>✓ One-Stop Operation</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11 }}>
          {['パイロット派遣', '安全管理', 'データ取得', '解析レポート'].map((s, i, a) => (
            <React.Fragment key={i}>
              <span style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4 }}>{s}</span>
              {i < a.length - 1 && <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>}
            </React.Fragment>
          ))}
          <span style={{ padding: '4px 10px', background: '#4a9eff', color: '#fff', borderRadius: 4, fontWeight: 700 }}>一気通貫で完結</span>
        </div>
      </div>
    </Slide>
  );
}
