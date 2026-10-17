import{j as e,c as f,B as v}from"./index-42cP9WwP.js";import{T as s}from"./index-Csiu30sr.js";import{T as l}from"./index-BCtRd6bT.js";import{S as j}from"./index-1s6UphMX.js";function a({dataSource:t,renderItem:i,header:n,footer:d,bordered:m=!0,itemLayout:u="horizontal",rowKey:p,emptyText:x="No data",loading:r,loadMore:g,className:h,...T}){return e.jsxs("div",{"aria-busy":r||void 0,className:f("cinna-list",`cinna-list--${u}`,!m&&"cinna-list--borderless",h),...T,children:[n&&e.jsx("div",{className:"cinna-list__header",children:n}),!r&&!t.length&&e.jsx("div",{className:"cinna-list__empty",children:x}),t.map((c,o)=>e.jsx("div",{className:"cinna-list__item",children:i(c,o)},p?.(c,o)??o)),r&&e.jsx("div",{role:"status",className:"cinna-list__empty",children:"Loading…"}),g,d&&e.jsx("div",{className:"cinna-list__footer",children:d})]})}const S={examples:[{id:"basic-list",zh:{title:"基本列表",description:"dataSource 提供列表数据，renderItem 决定每一项如何展示。",codeToggle:"查看基本列表代码"},en:{title:"Basic list",description:"dataSource provides list data, and renderItem controls each row.",codeToggle:"View basic list code"},code:`import { List, Text } from '@cinna-design/react';

const items = ['Button', 'Input', 'Card'];

export default () => (
  <List dataSource={items} renderItem={(item) => <Text strong>{item}</Text>} />
);`,render:()=>e.jsx(a,{dataSource:["Button","Input","Card"],renderItem:t=>e.jsx(s,{strong:!0,children:t})})},{id:"list-header-footer",zh:{title:"头部与底部",description:"header 和 footer 可补充列表标题、统计信息或批量操作入口。",codeToggle:"查看头部与底部代码"},en:{title:"Header and footer",description:"header and footer can add titles, summaries, or batch action areas.",codeToggle:"View header footer code"},code:`import { List, Tag } from '@cinna-design/react';

const items = ['Docs review', 'Token polish', 'Release note'];

export default () => (
  <List
    header="Current checklist"
    footer="3 tasks"
    dataSource={items}
    renderItem={(item) => <Tag color="blue">{item}</Tag>}
  />
);`,render:()=>e.jsx(a,{header:"Current checklist",footer:"3 tasks",dataSource:["Docs review","Token polish","Release note"],renderItem:t=>e.jsx(l,{color:"blue",children:t})})},{id:"list-vertical",zh:{title:"纵向条目",description:'itemLayout="vertical" 适合展示标题、说明和标签等多行内容。',codeToggle:"查看纵向条目代码"},en:{title:"Vertical items",description:'itemLayout="vertical" fits multi-line content such as title, description, and tags.',codeToggle:"View vertical list code"},code:`import { List, Tag, Text } from '@cinna-design/react';

const items = [
  { title: 'Usage examples', desc: 'Merge basic and advanced demos.', tag: 'Docs' },
  { title: 'API polish', desc: 'Keep descriptions compact and readable.', tag: 'Copy' },
];

export default () => (
  <List
    itemLayout="vertical"
    dataSource={items}
    renderItem={(item) => (
      <>
        <Text strong>{item.title}</Text>
        <Text tone="secondary">{item.desc}</Text>
        <Tag color="pistachio">{item.tag}</Tag>
      </>
    )}
  />
);`,render:()=>{const t=[{title:"Usage examples",desc:"Merge basic and advanced demos.",tag:"Docs"},{title:"API polish",desc:"Keep descriptions compact and readable.",tag:"Copy"}];return e.jsx(a,{itemLayout:"vertical",dataSource:t,renderItem:i=>e.jsxs(e.Fragment,{children:[e.jsx(s,{strong:!0,children:i.title}),e.jsx(s,{tone:"secondary",children:i.desc}),e.jsx(l,{color:"pistachio",children:i.tag})]})})}},{id:"list-horizontal-actions",zh:{title:"横向操作区",description:"默认横向布局适合在条目右侧放置状态或操作。",codeToggle:"查看横向操作区代码"},en:{title:"Horizontal actions",description:"The default horizontal layout works well for status or actions on the right.",codeToggle:"View horizontal action code"},code:`import { Button, List, Space, Text } from '@cinna-design/react';

const items = [
  { name: 'Button docs', status: 'Ready' },
  { name: 'Table docs', status: 'Review' },
];

export default () => (
  <List
    dataSource={items}
    renderItem={(item) => (
      <>
        <Space direction="vertical" size="small" align="flex-start">
          <Text strong>{item.name}</Text>
          <Text tone="secondary">{item.status}</Text>
        </Space>
        <Button size="small" variant="text">Open</Button>
      </>
    )}
  />
);`,render:()=>{const t=[{name:"Button docs",status:"Ready"},{name:"Table docs",status:"Review"}];return e.jsx(a,{dataSource:t,renderItem:i=>e.jsxs(e.Fragment,{children:[e.jsxs(j,{direction:"vertical",size:"small",align:"flex-start",children:[e.jsx(s,{strong:!0,children:i.name}),e.jsx(s,{tone:"secondary",children:i.status})]}),e.jsx(v,{size:"small",variant:"text",children:"Open"})]})})}},{id:"list-borderless-native",zh:{title:"无边框与原生属性",description:"bordered={false} 去掉外框，List 也继承原生 div 属性。",codeToggle:"查看无边框代码"},en:{title:"Borderless and native attributes",description:"bordered={false} removes the frame, and List extends native div attributes.",codeToggle:"View borderless code"},code:`import { List, Text } from '@cinna-design/react';

export default () => (
  <List
    bordered={false}
    aria-label="Quiet notes"
    dataSource={['Quiet note', 'Inline update']}
    renderItem={(item) => <Text tone="secondary">{item}</Text>}
  />
);`,render:()=>e.jsx(a,{bordered:!1,"aria-label":"Quiet notes",dataSource:["Quiet note","Inline update"],renderItem:t=>e.jsx(s,{tone:"secondary",children:t})})}]};export{S as listDoc};
