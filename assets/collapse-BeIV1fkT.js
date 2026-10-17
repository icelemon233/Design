import{R as y,r as T,j as a,c as d}from"./index-BZKQtVdI.js";import{u as j}from"./useControllable-Dra3MelW.js";import{t as p}from"./ComponentPage-CVreqOMm.js";import{T as h}from"./index-C-WBHfFC.js";import{C as A}from"./index-3EVt9kje.js";import{S as w}from"./index-CGJnK8xI.js";import{T as K}from"./index-PYGa7LZ7.js";const o=y.forwardRef(({items:n,activeKey:t,defaultActiveKey:c,accordion:i,bordered:m=!0,onChange:u,destroyInactivePanel:b=!0,className:g,...x},f)=>{const s=T.useId(),[r,k]=j(t===void 0?void 0:p(t),p(c),u),l=i?r.slice(0,1):r,v=e=>k(l.includes(e)?l.filter(C=>C!==e):i?[e]:[...l,e]);return a.jsx("div",{...x,ref:f,className:d("cinna-collapse",!m&&"cinna-collapse--borderless",g),children:n.map(e=>a.jsxs("div",{className:d("cinna-collapse__item",e.disabled&&"cinna-collapse__item--disabled"),children:[a.jsxs("div",{className:"cinna-collapse__header",children:[a.jsxs("button",{id:s+"-header-"+e.key,type:"button",disabled:e.disabled,"aria-expanded":l.includes(e.key),"aria-controls":s+"-panel-"+e.key,onClick:()=>v(e.key),children:[a.jsx("span",{children:e.label}),a.jsx("span",{"aria-hidden":"true",children:l.includes(e.key)?"−":"+"})]}),e.extra&&a.jsx("span",{className:"cinna-collapse__extra",children:e.extra})]}),(!b||l.includes(e.key))&&a.jsx("div",{id:s+"-panel-"+e.key,className:"cinna-collapse__body",role:"region","aria-labelledby":s+"-header-"+e.key,hidden:!l.includes(e.key),children:e.children})]},e.key))})});o.displayName="Collapse";const E={examples:[{id:"basic-collapse",zh:{title:"基本折叠面板",description:"items 定义每个面板，defaultActiveKey 设置默认展开项。",codeToggle:"查看基本折叠面板代码"},en:{title:"Basic collapse",description:"items defines panels, and defaultActiveKey sets initially open panels.",codeToggle:"View basic collapse code"},code:`import { Collapse } from '@cinna-design/react';

const items = [
  { key: 'usage', label: 'Usage examples', children: 'Each example has a preview and collapsible code.' },
  { key: 'api', label: 'API notes', children: 'Only document props currently supported by the component.' },
];

export default () => <Collapse defaultActiveKey="usage" items={items} />;`,render:()=>a.jsx(o,{defaultActiveKey:"usage",items:[{key:"usage",label:"Usage examples",children:"Each example has a preview and collapsible code."},{key:"api",label:"API notes",children:"Only document props currently supported by the component."}]})},{id:"collapse-accordion",zh:{title:"手风琴模式",description:"accordion 会让同一时间只保留一个面板展开。",codeToggle:"查看手风琴模式代码"},en:{title:"Accordion mode",description:"accordion keeps only one panel open at a time.",codeToggle:"View accordion code"},code:`import { Collapse } from '@cinna-design/react';

export default () => (
  <Collapse
    accordion
    defaultActiveKey="one"
    items={[
      { key: 'one', label: 'Step one', children: 'Read the component API.' },
      { key: 'two', label: 'Step two', children: 'Create focused examples.' },
      { key: 'three', label: 'Step three', children: 'Verify route switching.' },
    ]}
  />
);`,render:()=>a.jsx(o,{accordion:!0,defaultActiveKey:"one",items:[{key:"one",label:"Step one",children:"Read the component API."},{key:"two",label:"Step two",children:"Create focused examples."},{key:"three",label:"Step three",children:"Verify route switching."}]})},{id:"collapse-extra-disabled",zh:{title:"额外内容与禁用项",description:"extra 放在面板标题右侧，disabled 禁止该面板切换。",codeToggle:"查看额外内容代码"},en:{title:"Extra content and disabled item",description:"extra renders on the right side of the header, and disabled prevents toggling.",codeToggle:"View extra disabled code"},code:`import { Collapse, Tag } from '@cinna-design/react';

export default () => (
  <Collapse
    defaultActiveKey={['ready']}
    items={[
      { key: 'ready', label: 'Ready panel', extra: <Tag color="pistachio">Ready</Tag>, children: 'This panel is available.' },
      { key: 'locked', label: 'Locked panel', extra: <Tag color="cream">Locked</Tag>, disabled: true, children: 'Disabled content.' },
    ]}
  />
);`,render:()=>a.jsx(o,{defaultActiveKey:["ready"],items:[{key:"ready",label:"Ready panel",extra:a.jsx(h,{color:"pistachio",children:"Ready"}),children:"This panel is available."},{key:"locked",label:"Locked panel",extra:a.jsx(h,{color:"cream",children:"Locked"}),disabled:!0,children:"Disabled content."}]})},{id:"collapse-controlled",zh:{title:"受控展开",description:"activeKey 与 onChange 可用于接入外部展开状态。",codeToggle:"查看受控展开代码"},en:{title:"Controlled active keys",description:"Use activeKey and onChange to connect open panels to external state.",codeToggle:"View controlled collapse code"},code:`import { Collapse, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [active, setActive] = useState(['docs']);

  return (
    <Space direction="vertical" align="stretch">
      <Collapse
        activeKey={active}
        onChange={setActive}
        items={[
          { key: 'docs', label: 'Docs', children: 'Documentation panel.' },
          { key: 'tests', label: 'Tests', children: 'Verification panel.' },
        ]}
      />
      <Text tone="secondary">Open: {active.join(', ') || 'none'}</Text>
    </Space>
  );
};`,render:()=>{const n=()=>{const[t,c]=y.useState(["docs"]);return a.jsxs(w,{direction:"vertical",align:"stretch",children:[a.jsx(o,{activeKey:t,onChange:c,items:[{key:"docs",label:"Docs",children:"Documentation panel."},{key:"tests",label:"Tests",children:"Verification panel."}]}),a.jsxs(K,{tone:"secondary",children:["Open: ",t.join(", ")||"none"]})]})};return a.jsx(n,{})}},{id:"collapse-borderless",zh:{title:"无边框",description:"bordered={false} 去掉外框，适合放在卡片或页面区块内部。",codeToggle:"查看无边框代码"},en:{title:"Borderless",description:"bordered={false} removes the frame for cards or page sections.",codeToggle:"View borderless collapse code"},code:`import { Card, Collapse } from '@cinna-design/react';

export default () => (
  <Card title="Compact notes">
    <Collapse
      bordered={false}
      defaultActiveKey="note"
      items={[{ key: 'note', label: 'Note', children: 'Quiet supporting content.' }]}
    />
  </Card>
);`,render:()=>a.jsx(A,{title:"Compact notes",children:a.jsx(o,{bordered:!1,defaultActiveKey:"note",items:[{key:"note",label:"Note",children:"Quiet supporting content."}]})})}]};export{E as collapseDoc};
