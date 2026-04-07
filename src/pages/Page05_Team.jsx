import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import images from '../utils/images';

const TEAM = [
  { id: 'tk', name: '竹中 悠満', en: 'Yuma Takenaka', role: '創業者・代表取締役',
    bio: '2012年電通ライブ入社。トヨタ自動車工業会等を担当。東京モーターショー2019で国内最多機体のドローンショーをプロデュースし攻略本131万人達成。東京2020五輪演出制作チーム。米国NASDAQ上場経験後、2024年独立しVISIONOIDを設立。',
    tags: ['事業プロデュース', 'イベントマーケティング'], img: images.foxRobot, color: '#4a9eff' },
  { id: 'kz', name: '上関 竜矢', en: 'Ryuya Kamizeki', role: '共同創業者・取締役・テクノロジー統括',
    bio: '元ドローンレース日本代表選手。ドローン・ドロイド・映像・音響・ネットワーク・ソフトウェア開発を横断する幅広い技術力を持つ。鉄腕DASH他、TV番組にも多数出演。DREAMS COME TRUE WONDERLAND 2023、NISSAN SKYLINE NISMO、日本ハム開幕戦2024等のドローン演出を担当。',
    tags: ['ドローン', 'テック統括'], img: images.droneFlyer, color: '#9b6dff' },
  { id: 'ad', name: '安達 的海', en: 'Matomi Adachi', role: '取締役・PM',
    bio: '東京2020五輪閉会式、YouTube Brandcast Japan、Hermès「彼女と...」展、Cygames展等、国内屈指の大規模イベントを手がけてきたプロジェクトマネジメントのスペシャリスト。卓越した統率力と緻密な現場設計力で数多くのプロジェクトを成功に導く。',
    tags: ['イベントPM', '大規模イベント'], img: images.teamPhoto, color: '#2dd4bf' },
  { id: 'mz', name: '門前 龍汰', en: 'Ryota Monzen', role: '取締役・機体開発エンジニア',
    bio: '27歳にして国産唯一のドローンショー専用機体「unika」を開発・設計・開発。2017年にJAPRADARにパイロット兼開発者として参画。ドローンショー・ジャパンを経て、2024年VISIONOIDに参画。世界に誇る日本のドローンを生み出すことを目指す。',
    tags: ['ハードウェア機体開発', 'エンジニア'], img: images.robotStage, color: '#f6a13a' },
  { id: 'nk', name: '中川 智博', en: 'Tomohiro Nakagawa', role: 'ドローン事業開発・マスターインストラクター',
    bio: '楽天ドローン社の前身のあるスカイエステート社の共同ファウンダー。DPAマスターインストラクターとしてスクール受講生を日本一に成長させ、教えた人数は1,000人以上。3,000名超のドローンコミュニティ「ドローンジョブズ」を運営。一等無人航空機操縦士。',
    tags: ['人材育成', 'ドローン事業コンサルティング'], img: images.droneOp, color: '#fbbf24' },
  { id: 'mr', name: '村田 勇人', en: 'Hayato Murata', role: 'クリエイティブディレクター',
    bio: '映像制作会社REBORNを設立し、MV・CM・企業VPなど累計約100作品以上のディレクションを担当。SoftBank CM等の広告代理店関係にも進出。ライブ映像でも、空撮、車載等の実装でも積極に取り組む。VISIONOIDではイベントクリエイティブおよびドローン演出等も手掛ける。',
    tags: ['映像制作', 'クリエイティブディレクション'], img: images.tabletPlan, color: '#ef5350' },
  { id: 'ts', name: '鶴岡 悠生', en: 'Yuki Tsuruoka', role: 'Creative Visualization Engineer',
    bio: '最先端の映像ソフトやAI、3Dソフトを駆使し、イベント空間のデジタルツイン構築や映像演出を手がけるクリエイター。XR映像・Unreal Engineの活用を2020年に展開し、JACEイベントアワード'+"'"+'にてイベントプロフェッショナル賞・優秀賞を受賞。',
    tags: ['XR映像', 'デジタルツイン'], img: images.sevenSeven, color: '#4a9eff' },
  { id: 'fk', name: '上関 風雅', en: 'Fuga Kamizeki', role: 'パイロット',
    bio: '小学3年からドローンレースに参加。元日本最年少チャンピオン。2019年に日本人初の小学生での日本代表入りを果たした。ワールドゲームズ2022で世界6位を記録。レース戦で培ったテクニックをドローン空撮や映像制作、演出ドローン操作に転用。',
    tags: ['ドローンレース', 'パイロット'], img: images.droneFlyer, color: '#34d399' },
];

export default function Page05Team({ editMode }) {
  return (
    <Slide id="page-05" pageNumber={5} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />

      <div style={{ position: 'absolute', top: 32, left: 0, right: 0, textAlign: 'center' }}>
        <EditableText id="p5-title" editMode={editMode} style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}
          html='各領域のスペシャリストが集結 <span style="color:#4a9eff">— The Team</span>' />
        <EditableText id="p5-sub" editMode={editMode} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 4 }}>
          エンタメ・産業・防災の各領域で実績を持つ異能の精鋭チーム
        </EditableText>
      </div>

      <div style={{ position: 'absolute', top: 100, left: 30, right: 30, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
        {TEAM.map((m) => (
          <div key={m.id} style={{ background: '#fff', borderRadius: 8, padding: 10, color: '#1a2332', minHeight: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <EditableImage id={`team-${m.id}`} src={m.img} editMode={editMode}
              style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 8, border: `3px solid ${m.color}` }} />
            <div style={{ fontSize: 12, fontWeight: 700 }}>{m.name} <span style={{ color: '#475569', fontWeight: 400 }}>| {m.en}</span></div>
            <div style={{ fontSize: 9, color: m.color, fontWeight: 600, marginTop: 2, marginBottom: 6 }}>{m.role}</div>
            <div style={{ fontSize: 8, color: '#475569', lineHeight: 1.4, flex: 1 }}>{m.bio}</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6, justifyContent: 'center' }}>
              {m.tags.map((t, i) => (
                <span key={i} style={{ fontSize: 8, padding: '2px 6px', background: '#e5e7eb', borderRadius: 3, color: '#1a2332' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}
