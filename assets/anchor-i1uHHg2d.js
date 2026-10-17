import{R as l,r as O,j as e,c as b}from"./index-_8eXcLz2.js";import{a as p,T as s}from"./index-BAwLJX5K.js";const I=(t,i)=>(i instanceof Window?document:i).querySelector(t),N=(t,i)=>{if(!t.startsWith("#"))return null;const o=t.slice(1);return o?i instanceof Window?document.getElementById(o):i.querySelector(`[id="${o.replace(/"/g,'\\"')}"]`):null},V=(t,i)=>typeof t.anchorTarget=="function"?t.anchorTarget():typeof t.anchorTarget=="string"?I(t.anchorTarget,i):t.anchorTarget?t.anchorTarget:N(t.href,i),L=(t,i,o)=>{const f=i.getBoundingClientRect();if(t instanceof Window){t.scrollTo?.({top:f.top+t.scrollY-o,behavior:"smooth"});return}const u=t.getBoundingClientRect();t.scrollTo?.({top:t.scrollTop+f.top-u.top-o,behavior:"smooth"})},a=l.forwardRef(({items:t,offsetTop:i=0,targetOffset:o,direction:f="vertical",affix:u=!1,getContainer:j,defaultActiveHref:w,onItemClick:C,onChange:A,className:S,style:H,...z},D)=>{const[T,E]=O.useState(w??t[0]?.href??""),B=r=>{E(r),A?.(r)};return e.jsx("nav",{ref:D,className:b("cinna-anchor",`cinna-anchor--${f}`,u&&"cinna-anchor--affix",S),style:{top:i,...H},...z,children:t.map(r=>e.jsx("a",{href:r.href,className:b(T===r.href&&"cinna-anchor__item--active"),"aria-current":T===r.href?"true":void 0,onClick:x=>{if(C?.(x,r),x.defaultPrevented)return;const y=j?.()??window,v=y?V(r,y):null;v&&(x.preventDefault(),L(y,v,r.targetOffset??o??i),B(r.href))},children:r.title},r.key))})});a.displayName="Anchor";const k=[{id:"anchor-design",title:"Design",description:"Review spacing and hierarchy."},{id:"anchor-code",title:"Code",description:"Verify props and examples."},{id:"anchor-release",title:"Release",description:"Run build and browser checks."}],R=[{id:"anchor-overview",title:"Overview",description:"Read the summary and scope."},{id:"anchor-details",title:"Details",description:"Check states and interactions."},{id:"anchor-finish",title:"Finish",description:"Confirm output and notes."}],c={display:"grid",gridTemplateColumns:"minmax(138px, 178px) minmax(0, 1fr)",gap:24,alignItems:"stretch",minHeight:390},d={padding:18,border:"1.5px solid rgba(230, 214, 196, .82)",borderRadius:24,background:"rgba(255, 252, 246, .72)"},h={height:390,overflow:"auto",display:"grid",gap:16,paddingRight:4,scrollBehavior:"smooth"},g={minHeight:172,display:"grid",placeItems:"center",padding:18,border:"1.5px solid rgba(230, 214, 196, .54)",borderRadius:22,background:"rgba(255, 255, 255, .42)"},m={width:"min(420px, 86%)",padding:"26px 32px",border:"1.5px solid rgba(230, 214, 196, .95)",borderRadius:32,background:"rgba(255, 252, 246, .88)"},P={display:"grid",gap:18},W={width:"fit-content",maxWidth:"100%",padding:"16px 20px",border:"1.5px solid rgba(168, 223, 241, .82)",borderRadius:28,background:"linear-gradient(135deg, rgba(240, 250, 254, .96), rgba(255, 243, 206, .56))",boxShadow:"0 8px 22px rgba(96, 155, 185, .12)"},M={height:282,overflow:"auto",display:"grid",gap:14,paddingRight:4,scrollBehavior:"smooth"},n=({id:t,title:i,description:o})=>e.jsx("section",{id:t,style:g,children:e.jsxs("div",{style:m,children:[e.jsx(p,{level:5,children:i}),e.jsx(s,{tone:"secondary",children:o})]})}),F=()=>{const t=l.useRef(null);return e.jsxs("div",{style:c,children:[e.jsx("aside",{style:d,children:e.jsx(a,{getContainer:()=>t.current,items:k.map(i=>({key:i.id,href:`#${i.id}`,title:i.title}))})}),e.jsx("div",{ref:t,style:h,children:k.map(i=>e.jsx(n,{...i},i.id))})]})},U=()=>{const t=l.useRef(null);return e.jsxs("div",{style:P,children:[e.jsx("div",{style:W,children:e.jsx(a,{direction:"horizontal",getContainer:()=>t.current,items:R.map(i=>({key:i.id,href:`#${i.id}`,title:i.title}))})}),e.jsx("div",{ref:t,style:M,children:R.map(i=>e.jsx(n,{...i},i.id))})]})},$=()=>{const t=l.useRef(null);return e.jsxs("div",{style:c,children:[e.jsx("aside",{style:d,children:e.jsx(a,{affix:!0,offsetTop:16,getContainer:()=>t.current,items:[{key:"affix-plan",href:"#anchor-affix-plan",title:"Plan"},{key:"affix-build",href:"#anchor-affix-build",title:"Build"},{key:"affix-ship",href:"#anchor-affix-ship",title:"Ship"}]})}),e.jsxs("div",{ref:t,style:h,children:[e.jsx(n,{id:"anchor-affix-plan",title:"Plan",description:"This anchor sticks when the page scrolls."}),e.jsx(n,{id:"anchor-affix-build",title:"Build",description:"offsetTop controls the sticky top distance."}),e.jsx(n,{id:"anchor-affix-ship",title:"Ship",description:"Omit affix to keep it in normal document flow."})]})]})},q=()=>{const t=l.useRef(null);return e.jsxs("div",{style:c,children:[e.jsx("aside",{style:d,children:e.jsx(a,{targetOffset:28,getContainer:()=>t.current,items:[{key:"offset-one",href:"#anchor-offset-one",title:"First block"},{key:"offset-two",href:"#anchor-offset-two",title:"Second block"},{key:"offset-three",href:"#anchor-offset-three",title:"Third block"}]})}),e.jsxs("div",{ref:t,style:h,children:[e.jsx(n,{id:"anchor-offset-one",title:"First block",description:"The target leaves a small offset from the pane top."}),e.jsx(n,{id:"anchor-offset-two",title:"Second block",description:"Use this when the pane has sticky inner controls."}),e.jsx(n,{id:"anchor-offset-three",title:"Third block",description:"The scroll remains inside this example window."})]})]})},_=()=>{const t=l.useRef(null);return e.jsxs("div",{style:c,children:[e.jsx("aside",{style:d,children:e.jsx(a,{getContainer:()=>t.current,items:[{key:"stable",href:"#anchor-rich-stable",title:e.jsx(s,{tone:"success",children:"Stable"})},{key:"draft",href:"#anchor-rich-draft",title:e.jsx(s,{tone:"warning",children:"Draft"})},{key:"risk",href:"#anchor-rich-risk",title:e.jsx(s,{tone:"error",children:"Needs review"})}]})}),e.jsxs("div",{ref:t,style:h,children:[e.jsx(n,{id:"anchor-rich-stable",title:"Stable",description:"Ready for repeated use."}),e.jsx(n,{id:"anchor-rich-draft",title:"Draft",description:"Still being adjusted."}),e.jsx(n,{id:"anchor-rich-risk",title:"Needs review",description:"Check copy and behavior again."})]})]})},Y=()=>{const t=l.useRef(null);return e.jsxs("div",{style:c,children:[e.jsx("aside",{style:d,children:e.jsx(a,{targetOffset:18,getContainer:()=>t.current,items:[{key:"brief",href:"#custom-brief-link",title:"Brief",anchorTarget:'[data-anchor-point="brief"]'},{key:"timeline",href:"#custom-timeline-link",title:"Timeline",anchorTarget:'[data-anchor-point="timeline"]',targetOffset:34},{key:"summary",href:"#custom-summary-link",title:"Summary",anchorTarget:'[data-anchor-point="summary"]'}]})}),e.jsxs("div",{ref:t,style:h,children:[e.jsx("section",{"data-anchor-point":"brief",style:g,children:e.jsxs("div",{style:m,children:[e.jsx(p,{level:5,children:"Brief"}),e.jsx(s,{tone:"secondary",children:"This target is found by a custom selector."})]})}),e.jsx("section",{"data-anchor-point":"timeline",style:g,children:e.jsxs("div",{style:m,children:[e.jsx(p,{level:5,children:"Timeline"}),e.jsx(s,{tone:"secondary",children:"This item uses its own target offset."})]})}),e.jsx("section",{"data-anchor-point":"summary",style:g,children:e.jsxs("div",{style:m,children:[e.jsx(p,{level:5,children:"Summary"}),e.jsx(s,{tone:"secondary",children:"The href remains only the active identity."})]})})]})]})},K={examples:[{id:"anchor-with-content",zh:{title:"与内容区组合",description:"把 Anchor 放在内容旁边，可以为长文档提供快速入口；点击只滚动右侧内容窗口。",codeToggle:"查看内容区组合代码"},en:{title:"With content",description:"Place Anchor beside content; clicking only scrolls the content pane on the right.",codeToggle:"View content composition code"},code:`import { useRef } from 'react';
import { Anchor, Text, Title } from '@cinna-design/react';

const items = [
  { id: 'anchor-design', title: 'Design', description: 'Review spacing and hierarchy.' },
  { id: 'anchor-code', title: 'Code', description: 'Verify props and examples.' },
  { id: 'anchor-release', title: 'Release', description: 'Run build and browser checks.' },
];

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 24 }}>
      <aside style={{ padding: 18, border: '1px solid #ead8c0', borderRadius: 24 }}>
        <Anchor
          getContainer={() => scrollRef.current}
          items={items.map((item) => ({ key: item.id, href: '#' + item.id, title: item.title }))}
        />
      </aside>
      <div ref={scrollRef} style={{ height: 360, overflow: 'auto', display: 'grid', gap: 16 }}>
        {items.map((item) => (
          <section id={item.id} key={item.id} style={{ minHeight: 160, display: 'grid', placeItems: 'center' }}>
            <div style={{ padding: 24, border: '1px solid #ead8c0', borderRadius: 28 }}>
              <Title level={5}>{item.title}</Title>
              <Text tone="secondary">{item.description}</Text>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};`,render:()=>e.jsx(F,{})},{id:"horizontal-anchor",zh:{title:"横向排布",description:'direction="horizontal" 可把锚点横向排列，适合较短的页内目录。',codeToggle:"查看横向排布代码"},en:{title:"Horizontal direction",description:'Use direction="horizontal" for a short in-page index.',codeToggle:"View horizontal direction code"},code:`import { useRef } from 'react';
import { Anchor, Text, Title } from '@cinna-design/react';

const items = [
  { id: 'anchor-overview', title: 'Overview', description: 'Read the summary and scope.' },
  { id: 'anchor-details', title: 'Details', description: 'Check states and interactions.' },
  { id: 'anchor-finish', title: 'Finish', description: 'Confirm output and notes.' },
];

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        style={{
          width: 'fit-content',
          maxWidth: '100%',
          padding: '16px 20px',
          border: '1.5px solid rgba(168, 223, 241, .82)',
          borderRadius: 28,
          background: 'linear-gradient(135deg, rgba(240, 250, 254, .96), rgba(255, 243, 206, .56))',
          boxShadow: '0 8px 22px rgba(96, 155, 185, .12)',
        }}
      >
        <Anchor
          direction="horizontal"
          getContainer={() => scrollRef.current}
          items={items.map((item) => ({ key: item.id, href: '#' + item.id, title: item.title }))}
        />
      </div>
      <div ref={scrollRef} style={{ height: 280, overflow: 'auto', display: 'grid', gap: 14 }}>
        {items.map((item) => (
          <section id={item.id} key={item.id} style={{ minHeight: 150, display: 'grid', placeItems: 'center' }}>
            <div style={{ padding: 24, border: '1px solid #ead8c0', borderRadius: 28 }}>
              <Title level={5}>{item.title}</Title>
              <Text tone="secondary">{item.description}</Text>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};`,render:()=>e.jsx(U,{})},{id:"anchor-with-offset",zh:{title:"目标偏移",description:"targetOffset 用于控制目标滚动后距离容器顶部的留白。",codeToggle:"查看目标偏移代码"},en:{title:"Target offset",description:"Use targetOffset to keep space above the target after scrolling.",codeToggle:"View target offset code"},code:`import { useRef } from 'react';
import { Anchor, Text, Title } from '@cinna-design/react';

const items = [
  { id: 'anchor-offset-one', title: 'First block' },
  { id: 'anchor-offset-two', title: 'Second block' },
  { id: 'anchor-offset-three', title: 'Third block' },
];

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 24 }}>
      <Anchor
        targetOffset={28}
        getContainer={() => scrollRef.current}
        items={items.map((item) => ({ key: item.id, href: '#' + item.id, title: item.title }))}
      />
      <div ref={scrollRef} style={{ height: 360, overflow: 'auto', display: 'grid', gap: 16 }}>
        {items.map((item) => (
          <section id={item.id} key={item.id} style={{ minHeight: 160, display: 'grid', placeItems: 'center' }}>
            <div style={{ padding: 24, border: '1px solid #ead8c0', borderRadius: 28 }}>
              <Title level={5}>{item.title}</Title>
              <Text tone="secondary">The target keeps top spacing after scrolling.</Text>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};`,render:()=>e.jsx(q,{})},{id:"anchor-affix-mode",zh:{title:"固定吸附",description:"默认随页面内容一起滚动；设置 affix 后会固定吸附，offsetTop 控制距离顶部的位置。",codeToggle:"查看固定吸附代码"},en:{title:"Sticky mode",description:"By default Anchor follows page flow. Set affix to make it sticky, with offsetTop controlling the top distance.",codeToggle:"View sticky mode code"},code:`import { useRef } from 'react';
import { Anchor } from '@cinna-design/react';

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Anchor
      affix
      offsetTop={16}
      getContainer={() => scrollRef.current}
      items={[
        { key: 'plan', href: '#anchor-affix-plan', title: 'Plan' },
        { key: 'build', href: '#anchor-affix-build', title: 'Build' },
        { key: 'ship', href: '#anchor-affix-ship', title: 'Ship' },
      ]}
    />
  );
};`,render:()=>e.jsx($,{})},{id:"anchor-custom-target",zh:{title:"自定义锚定点",description:"anchorTarget 可以把锚点链接和真实滚动目标分开，支持选择器、元素或返回元素的函数。",codeToggle:"查看自定义锚定点代码"},en:{title:"Custom anchor target",description:"Use anchorTarget to separate the link identity from the real scroll target.",codeToggle:"View custom anchor target code"},code:`import { useRef } from 'react';
import { Anchor } from '@cinna-design/react';

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 24 }}>
      <Anchor
        targetOffset={18}
        getContainer={() => scrollRef.current}
        items={[
          {
            key: 'brief',
            href: '#custom-brief-link',
            title: 'Brief',
            anchorTarget: '[data-anchor-point="brief"]',
          },
          {
            key: 'timeline',
            href: '#custom-timeline-link',
            title: 'Timeline',
            anchorTarget: '[data-anchor-point="timeline"]',
            targetOffset: 34,
          },
        ]}
      />
      <div ref={scrollRef} style={{ height: 360, overflow: 'auto' }}>
        <section data-anchor-point="brief">Brief content</section>
        <section data-anchor-point="timeline">Timeline content</section>
      </div>
    </div>
  );
};`,render:()=>e.jsx(Y,{})},{id:"anchor-rich-title",zh:{title:"自定义标题内容",description:"title 支持 ReactNode，可以加入文本强调或状态颜色。",codeToggle:"查看自定义标题代码"},en:{title:"Custom title content",description:"title accepts ReactNode, so it can include emphasis or status color.",codeToggle:"View custom title code"},code:`import { useRef } from 'react';
import { Anchor, Text, Title } from '@cinna-design/react';

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 24 }}>
      <Anchor
        getContainer={() => scrollRef.current}
        items={[
          { key: 'stable', href: '#anchor-rich-stable', title: <Text tone="success">Stable</Text> },
          { key: 'draft', href: '#anchor-rich-draft', title: <Text tone="warning">Draft</Text> },
          { key: 'risk', href: '#anchor-rich-risk', title: <Text tone="error">Needs review</Text> },
        ]}
      />
      <div ref={scrollRef} style={{ height: 360, overflow: 'auto', display: 'grid', gap: 16 }}>
        <section id="anchor-rich-stable" style={{ minHeight: 160, display: 'grid', placeItems: 'center' }}><Title level={5}>Stable</Title></section>
        <section id="anchor-rich-draft" style={{ minHeight: 160, display: 'grid', placeItems: 'center' }}><Title level={5}>Draft</Title></section>
        <section id="anchor-rich-risk" style={{ minHeight: 160, display: 'grid', placeItems: 'center' }}><Title level={5}>Needs review</Title></section>
      </div>
    </div>
  );
};`,render:()=>e.jsx(_,{})}]};export{K as anchorDoc};
