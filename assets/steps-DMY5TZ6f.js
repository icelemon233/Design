import{R as _,r as a,j as t,c as g,I as ue}from"./index-Ce0SFtqJ.js";import{n as S,c as W}from"./ComponentPage-BW_SxuBs.js";import{S as X}from"./index-CJ3PbIrN.js";const me=n=>n==="vertical"?"bottom":n==="horizontal"?"right":n,fe=(n,d,m)=>n.logo!==void 0?n.logo:n.icon!==void 0?n.icon:m==="finish"?"✓":m==="error"?"!":m==="loading"?t.jsx("span",{className:"cinna-step__spinner","aria-hidden":"true"}):d+1,Y=n=>n.description??n.content,c=_.forwardRef(({items:n,current:d,defaultCurrent:m=0,direction:j="horizontal",size:y="medium",status:Z="process",labelPlacement:F="right",type:ee="default",clickable:h=!1,underline:te=!1,markerShape:T="circle",connector:w,connectorCount:ie=1,connectorColor:R,markerFontSize:x,markerFontWeight:z,markerColor:D,markerBackgroundColor:N,markerBorderColor:B,titleFontSize:P,titleFontWeight:V,titleColor:I,subTitleFontSize:$,subTitleColor:A,descriptionFontSize:Q,descriptionColor:M,onChange:b,className:U,style:ne,...E},L)=>{const[se,re]=a.useState(m),[l,q]=a.useState(null),v=a.useRef(null),G=a.useRef(0),f=a.useRef(void 0),k=Math.max(0,n.length-1),r=W(d??se,0,k),oe=d!==void 0,ce=me(F),le=Math.max(1,Math.round(ie)),H=w!==void 0,J={...R?{"--cinna-steps-connector-color":R}:null,...x!==void 0?{"--cinna-steps-marker-font-size":S(x)}:null,...z!==void 0?{"--cinna-steps-marker-font-weight":z}:null,...D?{"--cinna-steps-marker-color":D}:null,...N?{"--cinna-steps-marker-bg":N}:null,...B?{"--cinna-steps-marker-border":B}:null,...P!==void 0?{"--cinna-steps-title-font-size":S(P)}:null,...V!==void 0?{"--cinna-steps-title-font-weight":V}:null,...I?{"--cinna-steps-title-color":I}:null,...$!==void 0?{"--cinna-steps-subtitle-font-size":S($)}:null,...A?{"--cinna-steps-subtitle-color":A}:null,...Q!==void 0?{"--cinna-steps-description-font-size":S(Q)}:null,...M?{"--cinna-steps-description-color":M}:null,...ne};a.useEffect(()=>{if(v.current===null){v.current=r;return}const e=W(v.current,0,k);e!==r&&(G.current+=1,f.current!==void 0&&window.clearTimeout(f.current),q({from:e,to:r,id:G.current}),v.current=r,f.current=window.setTimeout(()=>q(null),560))},[r,k]),a.useEffect(()=>()=>{f.current!==void 0&&window.clearTimeout(f.current)},[]);const K=(e,i)=>e.status?e.status:i<r?"finish":i===r?Z:"wait",O=(e,i,s)=>{e.disabled||!(h||b||e.onClick)||(oe||re(i),e.onClick?.(i,s),b?.(i,e,s))},ae=e=>{if(e>=n.length-1)return null;const i=l&&(l.to>l.from?e>=l.from&&e<l.to:e>=l.to&&e<l.from);return t.jsx("span",{className:g("cinna-step__connector",e<r&&"cinna-step__connector--finish",i&&"cinna-step__connector--motion",i&&l.to<l.from&&"cinna-step__connector--motion-reverse",H&&"cinna-step__connector--custom"),"aria-hidden":"true",children:H?Array.from({length:le},(s,o)=>t.jsx("span",{className:"cinna-step__connector-token",children:w},o)):t.jsx("span",{className:"cinna-step__connector-line"})})},de=(e,i)=>{const s=K(e,i),o=Y(e),p=!e.disabled&&(h||!!b||!!e.onClick),u=p?"button":"div";return t.jsxs(u,{type:p?"button":void 0,className:g("cinna-step",`cinna-step--${s}`,i===r&&"cinna-step--current",i<r&&"cinna-step--done",l?.to===i&&"cinna-step--motion-current",l?.from===i&&"cinna-step--motion-previous",p&&"cinna-step--clickable",e.disabled&&"cinna-step--disabled",e.className),style:e.style,"aria-current":i===r?"step":void 0,disabled:p?e.disabled:void 0,onClick:C=>O(e,i,C),children:[t.jsx("span",{className:"cinna-step__marker","aria-hidden":"true",children:fe(e,i,s)}),t.jsxs("span",{className:"cinna-step__body",children:[t.jsxs("span",{className:"cinna-step__header",children:[t.jsx("strong",{className:"cinna-step__title",children:e.title}),e.subTitle&&t.jsx("small",{className:"cinna-step__subtitle",children:e.subTitle})]}),o&&t.jsx("small",{className:"cinna-step__description",children:o})]})]},e.key??i)};if(ee==="minimal"){const e=n[r],i=e?Y(e):null;return t.jsxs("div",{ref:L,className:g("cinna-steps","cinna-steps--minimal",`cinna-steps--${j}`,`cinna-steps--${y}`,`cinna-steps--marker-${T}`,U),style:J,...E,children:[t.jsx("div",{className:"cinna-steps__minimal-dots",role:"list",children:n.map((s,o)=>{const p=K(s,o),u=!s.disabled&&(h||!!b||!!s.onClick),C=u?"button":"span";return t.jsx(C,{type:u?"button":void 0,className:g("cinna-step__minimal-dot",`cinna-step__minimal-dot--${p}`,o===r&&"cinna-step__minimal-dot--current",l?.to===o&&"cinna-step__minimal-dot--motion-current",u&&"cinna-step__minimal-dot--clickable",s.disabled&&"cinna-step__minimal-dot--disabled"),"aria-label":typeof s.title=="string"?s.title:`Step ${o+1}`,"aria-current":o===r?"step":void 0,disabled:u?s.disabled:void 0,onClick:pe=>O(s,o,pe)},s.key??o)})}),e&&t.jsxs("div",{className:"cinna-steps__minimal-summary",children:[t.jsx("strong",{className:"cinna-step__title",children:e.title}),i&&t.jsx("small",{className:"cinna-step__description",children:i})]})]})}return t.jsx("div",{ref:L,className:g("cinna-steps",`cinna-steps--${j}`,`cinna-steps--${y}`,`cinna-steps--label-${ce}`,`cinna-steps--marker-${T}`,te&&"cinna-steps--underline",h&&"cinna-steps--clickable",U),style:J,...E,children:n.map((e,i)=>t.jsxs(_.Fragment,{children:[de(e,i),ae(i)]},e.key??i))})});c.displayName="Steps";const ge=()=>{const[n,d]=_.useState(1);return t.jsx(c,{clickable:!0,current:n,onChange:d,items:[{title:"Create",description:"Prepare the draft"},{title:"Review",description:"Check details"},{title:"Publish",description:"Ship changes"}]})},Se={examples:[{id:"basic-steps",zh:{title:"基本用法",description:"把有先后关系的任务拆成清晰的阶段，current 之前的步骤会自动进入完成状态。",codeToggle:"查看基本用法代码"},en:{title:"Basic steps",description:"Break an ordered task into clear stages. Steps before current become finished automatically.",codeToggle:"View basic steps code"},code:`import { Icon, Steps } from '@cinna-design/react';

export default () => (
  <Steps
    current={1}
    items={[
      { title: 'Create' },
      { title: 'Review' },
      { title: 'Publish' },
    ]}
  />
);`,render:()=>t.jsx(c,{current:1,items:[{title:"Create"},{title:"Review"},{title:"Publish"}]})},{id:"clickable-steps",zh:{title:"可点击步骤",description:"clickable 让步骤可以切换，点击某一步后，它之前的步骤会展示为完成状态。",codeToggle:"查看可点击步骤代码"},en:{title:"Clickable steps",description:"Use clickable to switch steps. Previous steps render as finished after selection.",codeToggle:"View clickable steps code"},code:`import { Steps } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(1);

  return (
    <Steps
      clickable
      current={current}
      onChange={setCurrent}
      items={[
        { title: 'Create', description: 'Prepare the draft' },
        { title: 'Review', description: 'Check details' },
        { title: 'Publish', description: 'Ship changes' },
      ]}
    />
  );
};`,render:()=>t.jsx(ge,{})},{id:"status-steps",zh:{title:"步骤状态",description:"status 可覆盖自动状态，清晰区分完成、进行中、加载中、异常和等待。",codeToggle:"查看步骤状态代码"},en:{title:"Step status",description:"Use status to override automatic progress with finish, process, loading, error, or wait.",codeToggle:"View step status code"},code:`import { Steps } from '@cinna-design/react';

export default () => (
  <Steps
    current={2}
    items={[
      { title: 'Upload', status: 'finish' },
      { title: 'Validate', status: 'finish' },
      { title: 'Build', status: 'loading', description: 'Token mismatch' },
      { title: 'Deploy', status: 'error' },
    ]}
  />
);`,render:()=>t.jsx(c,{current:2,items:[{title:"Upload",status:"finish"},{title:"Validate",status:"finish"},{title:"Build",status:"loading",description:"Token mismatch"},{title:"Deploy",status:"error"}]})},{id:"vertical-steps",zh:{title:"竖向步骤条",description:'direction="vertical" 会真正纵向排列，适合说明较长或空间较窄的流程。',codeToggle:"查看竖向步骤条代码"},en:{title:"Vertical steps",description:'direction="vertical" stacks steps vertically for narrow areas or longer descriptions.',codeToggle:"View vertical steps code"},code:`import { Steps } from '@cinna-design/react';

export default () => (
  <Steps
    direction="vertical"
    current={1}
    items={[
      { title: 'Collect feedback', description: 'Read notes from the release room.' },
      { title: 'Update component', description: 'Adjust styles and examples.' },
      { title: 'Verify docs', description: 'Run build and browser checks.' },
    ]}
  />
);`,render:()=>t.jsx(c,{direction:"vertical",current:1,items:[{title:"Collect feedback",description:"Read notes from the release room."},{title:"Update component",description:"Adjust styles and examples."},{title:"Verify docs",description:"Run build and browser checks."}]})},{id:"size-steps",zh:{title:"尺寸对比",description:"small、medium、large 会同时调整序号容器、标题和描述的视觉层级。",codeToggle:"查看尺寸对比代码"},en:{title:"Size comparison",description:"small, medium, and large adjust marker, title, and description hierarchy together.",codeToggle:"View size comparison code"},code:`import { Space, Steps } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Steps size="small" current={1} items={[{ title: 'Queued' }, { title: 'Running' }, { title: 'Done' }]} />
    <Steps current={1} items={[{ title: 'Queued' }, { title: 'Running' }, { title: 'Done' }]} />
    <Steps size="large" current={1} items={[{ title: 'Queued' }, { title: 'Running' }, { title: 'Done' }]} />
  </Space>
);`,render:()=>t.jsxs(X,{direction:"vertical",align:"stretch",children:[t.jsx(c,{size:"small",current:1,items:[{title:"Queued"},{title:"Running"},{title:"Done"}]}),t.jsx(c,{current:1,items:[{title:"Queued"},{title:"Running"},{title:"Done"}]}),t.jsx(c,{size:"large",current:1,items:[{title:"Queued"},{title:"Running"},{title:"Done"}]})]})},{id:"logo-label-steps",zh:{title:"图标与标签位置",description:"logo 或 icon 可以替换默认序号，labelPlacement 控制标题放在右侧或下方。",codeToggle:"查看图标与标签位置代码"},en:{title:"Icon and label placement",description:"logo or icon replaces the default number. labelPlacement puts labels beside or below markers.",codeToggle:"View icon and label placement code"},code:`import { Space, Steps } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Steps
      current={1}
      items={[
        { title: 'Cloud', logo: '☁' },
        { title: 'Cat', logo: 'ฅ' },
        { title: 'Done', logo: '✓' },
      ]}
    />
    <Steps
      labelPlacement="bottom"
      current={1}
      items={[
        { title: 'Cloud', icon: '☁' },
        { title: 'Cat', icon: 'ฅ' },
        { title: 'Done', icon: '✓' },
      ]}
    />
  </Space>
);`,render:()=>t.jsxs(X,{direction:"vertical",align:"stretch",children:[t.jsx(c,{current:1,items:[{title:"Cloud",logo:"☁"},{title:"Cat",logo:"ฅ"},{title:"Done",logo:"✓"}]}),t.jsx(c,{labelPlacement:"bottom",current:1,items:[{title:"Cloud",icon:"☁"},{title:"Cat",icon:"ฅ"},{title:"Done",icon:"✓"}]})]})},{id:"underline-steps",zh:{title:"下划线高亮",description:"underline 会在当前步骤标题下方增加主题下划线。",codeToggle:"查看下划线高亮代码"},en:{title:"Underline highlight",description:"underline adds a themed underline below the current step title.",codeToggle:"View underline highlight code"},code:`import { Steps } from '@cinna-design/react';

export default () => (
  <Steps
    underline
    current={1}
    items={[
      { title: 'Draft' },
      { title: 'Review' },
      { title: 'Release' },
    ]}
  />
);`,render:()=>t.jsx(c,{underline:!0,current:1,items:[{title:"Draft"},{title:"Review"},{title:"Release"}]})},{id:"minimal-steps",zh:{title:"最小简化版",description:'type="minimal" 只展示圆点进度和当前步骤的一组标题描述。',codeToggle:"查看最小简化版代码"},en:{title:"Minimal steps",description:'type="minimal" renders only dots and one title-description summary for the current step.',codeToggle:"View minimal steps code"},code:`import { Steps } from '@cinna-design/react';

export default () => (
  <Steps
    type="minimal"
    current={1}
    items={[
      { title: 'Queued', description: 'Waiting for resources.' },
      { title: 'Running', description: 'Building the current package.' },
      { title: 'Done', description: 'Ready for verification.' },
    ]}
  />
);`,render:()=>t.jsx(c,{type:"minimal",current:1,items:[{title:"Queued",description:"Waiting for resources."},{title:"Running",description:"Building the current package."},{title:"Done",description:"Ready for verification."}]})},{id:"custom-steps",zh:{title:"自定义外观",description:"可自定义序号容器形状、字体、颜色、主副标题字体，以及步骤之间的连接符和数量。",codeToggle:"查看自定义外观代码"},en:{title:"Custom appearance",description:"Customize marker shape, fonts, colors, title typography, and connector content or count.",codeToggle:"View custom appearance code"},code:`import { Steps } from '@cinna-design/react';

export default () => (
  <Steps
    current={1}
    markerShape="rounded"
    connector={<Icon name="chevron-right" size={12} />}
    connectorCount={4}
    connectorColor="#df6677"
    markerFontSize={15}
    markerBackgroundColor="#ffe8a8"
    markerBorderColor="#d8984f"
    titleFontSize={18}
    titleColor="#46332a"
    subTitleColor="#3d8eaa"
    descriptionColor="#8a6c5f"
    items={[
      { title: 'Token', subTitle: 'A', description: 'Choose theme seed' },
      { title: 'Recipe', subTitle: 'B', description: 'Apply custom connector' },
      { title: 'Preview', subTitle: 'C', description: 'Check the final state' },
    ]}
  />
);`,render:()=>t.jsx(c,{current:1,markerShape:"rounded",connector:t.jsx(ue,{name:"chevron-right",size:12}),connectorCount:4,connectorColor:"#df6677",markerFontSize:15,markerBackgroundColor:"#ffe8a8",markerBorderColor:"#d8984f",titleFontSize:18,titleColor:"#46332a",subTitleColor:"#3d8eaa",descriptionColor:"#8a6c5f",items:[{title:"Token",subTitle:"A",description:"Choose theme seed"},{title:"Recipe",subTitle:"B",description:"Apply custom connector"},{title:"Preview",subTitle:"C",description:"Check the final state"}]})}]};export{Se as stepsDoc};
