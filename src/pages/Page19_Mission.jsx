import React from 'react';
import Slide from '../components/Slide';
import EditableText from '../components/EditableText';

export default function Page19Mission({ editMode }) {
  return (
    <Slide id="page-19" pageNumber={19} headerVariant="dark" background="#0a1224">
      <div className="absfill bg-dark-grid" />
      <EditableText id="p19-tag" editMode={editMode} style={{
        position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center', color: '#4a9eff', fontSize: 13, letterSpacing: '0.3em', fontWeight: 600 }}>
        MISSION
      </EditableText>

      <EditableText id="p19-title" editMode={editMode} style={{
        position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center', color: '#fff', fontSize: 38, fontWeight: 800, lineHeight: 1.4 }}
        html='人の心を動かす「<span style="color:#4a9eff;">技術</span>」で、「<span style="color:#f6a13a;">社会</span>」を前に進める' />

      <EditableText id="p19-en" editMode={editMode} style={{
        position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 14, letterSpacing: '0.05em' }}>
        Move Society with Technology that Moves Hearts
      </EditableText>

      <div style={{ position: 'absolute', top: 245, left: '50%', transform: 'translateX(-50%)', width: 110, height: 3, background: 'linear-gradient(90deg,#4a9eff,#f6a13a)', borderRadius: 2 }} />

      <div style={{ position: 'absolute', top: 290, left: 60, right: 60, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
        <div>
          <EditableText id="p19-h" editMode={editMode} style={{ color: '#fff', fontSize: 18, fontWeight: 700, lineHeight: 1.5 }}>
            楽しさと安全は、<br/>同じ技術から生まれる。
          </EditableText>
          <EditableText id="p19-d" editMode={editMode} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 14, lineHeight: 1.85 }}>
            私たちは人々の心を動かすエンターテインメントと、<br/>社会を守る産業技術を融合させ、<br/>社会が安心して前に進める状態をつくることをミッションとして掲げています。
          </EditableText>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { n: '①', t: '安全・信頼', d: '確かな品質と信頼性を担保する', c: '#4a9eff' },
            { n: '②', t: '実用性・価値', d: '人々の生活や仕事に有用である', c: '#f6a13a' },
            { n: '③', t: '心の受容', d: '受け入れたい・ワクワク・期待', c: '#ef5350' },
          ].map((m, i) => (
            <div key={i} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderLeft: `3px solid ${m.c}`, borderRadius: 4, display: 'flex', gap: 14 }}>
              <strong style={{ color: m.c, fontSize: 14 }}>{m.n} {m.t}</strong>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>{m.d}</span>
            </div>
          ))}
        </div>
      </div>

      <EditableText id="p19-foot" editMode={editMode} style={{
        position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontSize: 14, fontStyle: 'italic' }}>
        技術は、理解され、信頼され、期待されて、社会になる。
      </EditableText>
    </Slide>
  );
}
