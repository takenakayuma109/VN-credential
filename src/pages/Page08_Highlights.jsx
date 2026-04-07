import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

const HL = [
  { id: 'h1', img: images.nogizaka, secret: true, date: '2025.09.04-07', title: '乃木坂46 真夏の全国ツアー\nファイナル 神宮球場',
    big: '1,100', small: '機 総数', c: '#4a9eff', desc: '観客のコール&レスポンスとドローン文字が完全シンクロする新時代のライブ演出' },
  { id: 'h2', img: images.enoshima, date: '2025.08.19', title: '江の島マイアミビーチショー\n「天女と龍神」',
    big: '35,000', small: '人 来場', c: '#2dd4bf', desc: '江の島伝説を夜空に再現。地域文化と最新テクノロジーが融合したナイトスペクタクル' },
  { id: 'h3', img: images.sevenSeven, date: '2026.01.01-03', title: 'seven x seven 石垣\nNew Year Drone Show',
    big: '500', small: '機 + 花火', c: '#f6a13a', desc: 'ラグジュアリーリゾートの夜空を彩る、ドローンと花火の共演による祝祭空間' },
];

export default function Page08Highlights({ editMode }) {
  return (
    <Slide id="page-08" pageNumber={8} headerVariant="dark" background="#f4f6fa">
      <div style={{ position: 'absolute', top: 50, left: 40 }}>
        <EditableText id="p8-title" editMode={editMode} style={{ fontWeight: 700, fontSize: 21, color: '#1a2332' }}
          html='エンタメの常識を塗り替える、国内最大級のドローンショー演出 <span style="color:#4a9eff;font-size:13px;">— ENTERTAINMENT HIGHLIGHTS</span>' />
        <EditableText id="p8-sub" editMode={editMode} style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>
          乃木坂46、江の島、石垣など、国内最大級のエンターテインメントイベントでのドローンショー演出実績
        </EditableText>
      </div>

      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {HL.map((h) => (
          <div key={h.id} style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ position: 'relative', height: 240 }}>
              <EditableImage id={`p8-${h.id}`} src={h.img} editMode={editMode} style={{ width: '100%', height: '100%' }} />
              {h.secret && (
                <div style={{ position: 'absolute', top: 8, right: 8, background: '#ef5350', color: '#fff', padding: '3px 8px', borderRadius: 3, fontSize: 10, fontWeight: 700, zIndex: 5 }}>🔒 非公開</div>
              )}
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 10, color: '#64748b', marginBottom: 4 }}>{h.date}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1a2332', whiteSpace: 'pre-line', minHeight: 32 }}>{h.title}</div>
              <div style={{ marginTop: 8, paddingBottom: 6, borderBottom: `2px solid ${h.c}` }}>
                <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 36, color: h.c }}>{h.big}</span>
                <span style={{ fontSize: 12, color: '#475569', marginLeft: 4 }}>{h.small}</span>
              </div>
              <div style={{ fontSize: 10, color: '#475569', lineHeight: 1.5, marginTop: 8 }}>{h.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}
