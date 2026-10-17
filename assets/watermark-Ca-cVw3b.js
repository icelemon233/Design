import{R as f,j as e,c as y}from"./index-_8eXcLz2.js";import{C as r}from"./index-B77ohxiv.js";import{P as u}from"./index-BAwLJX5K.js";const t=f.forwardRef(({content:i="Cinna Design",rotate:n=-18,gap:o=120,opacity:d=.08,fontSize:c=16,className:s,style:l,children:m,...p},g)=>{const h=w=>w.replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"})[x]),a=Math.max(80,o),k='<svg xmlns="http://www.w3.org/2000/svg" width="'+a+'" height="'+a+'"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="'+Math.max(8,c)+'" fill="#46332a" transform="rotate('+n+" "+a/2+" "+a/2+')">'+h(i)+"</text></svg>";return e.jsxs("div",{...p,ref:g,className:y("cinna-watermark",s),style:l,children:[m,e.jsx("span",{className:"cinna-watermark__tile","aria-hidden":"true",style:{backgroundImage:'url("data:image/svg+xml,'+encodeURIComponent(k)+'")',opacity:Math.max(0,Math.min(1,d))}})]})});t.displayName="Watermark";const j={examples:[{id:"basic-watermark",zh:{title:"基础水印",description:"content 设置文字水印，children 是需要被覆盖的内容区域。",codeToggle:"查看基础水印代码"},en:{title:"Basic watermark",description:"Use content for the watermark text and children for the covered area.",codeToggle:"View basic watermark code"},code:`import { Card, Paragraph, Watermark } from '@cinna-design/react';

export default () => (
  <Watermark content="Cinna Design">
    <Card title="Private recipe">
      <Paragraph>Only visible inside the selected workspace.</Paragraph>
    </Card>
  </Watermark>
);`,render:()=>e.jsx(t,{content:"Cinna Design",children:e.jsx(r,{title:"Private recipe",children:e.jsx(u,{children:"Only visible inside the selected workspace."})})})},{id:"watermark-rotate",zh:{title:"旋转角度",description:"rotate 控制水印文本的倾斜角度。",codeToggle:"查看旋转角度代码"},en:{title:"Rotation",description:"Use rotate to control the watermark text angle.",codeToggle:"View watermark rotation code"},code:`import { Card, Watermark } from '@cinna-design/react';

export default () => (
  <Watermark content="Draft" rotate={-28}>
    <Card title="Launch checklist">Packaging, QA, and release notes.</Card>
  </Watermark>
);`,render:()=>e.jsx(t,{content:"Draft",rotate:-28,children:e.jsx(r,{title:"Launch checklist",children:"Packaging, QA, and release notes."})})},{id:"watermark-gap",zh:{title:"水印间距",description:"gap 调整水印文本之间的重复间隔。",codeToggle:"查看水印间距代码"},en:{title:"Gap",description:"Use gap to adjust the repeated spacing between watermark text.",codeToggle:"View watermark gap code"},code:`import { Card, Watermark } from '@cinna-design/react';

export default () => (
  <Watermark content="Internal" gap={84}>
    <Card title="Ops note">Batch 42 is ready for inspection.</Card>
  </Watermark>
);`,render:()=>e.jsx(t,{content:"Internal",gap:84,children:e.jsx(r,{title:"Ops note",children:"Batch 42 is ready for inspection."})})},{id:"watermark-opacity",zh:{title:"透明度",description:"opacity 控制水印可见强度，适合在内容密集区域降低干扰。",codeToggle:"查看透明度代码"},en:{title:"Opacity",description:"Use opacity to control visibility and reduce noise in dense content areas.",codeToggle:"View watermark opacity code"},code:`import { Card, Watermark } from '@cinna-design/react';

export default () => (
  <Watermark content="Quiet mark" opacity={0.14}>
    <Card title="Review panel">A softer watermark for dense reading.</Card>
  </Watermark>
);`,render:()=>e.jsx(t,{content:"Quiet mark",opacity:.14,children:e.jsx(r,{title:"Review panel",children:"A softer watermark for dense reading."})})},{id:"watermark-container",zh:{title:"限定区域",description:"通过 style 设置容器尺寸，水印只覆盖当前 Watermark 区域。",codeToggle:"查看限定区域代码"},en:{title:"Bounded area",description:"Set the container size through style so the watermark covers only this area.",codeToggle:"View bounded watermark code"},code:`import { Watermark } from '@cinna-design/react';

export default () => (
  <Watermark content="Bounded" style={{ minHeight: 150, padding: 18 }}>
    <div className="demo-watermark-panel">
      Watermark stays inside this panel.
    </div>
  </Watermark>
);`,render:()=>e.jsx(t,{content:"Bounded",style:{minHeight:150,padding:18},children:e.jsx("div",{className:"demo-watermark-panel",children:"Watermark stays inside this panel."})})}]};export{j as watermarkDoc};
