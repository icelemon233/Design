import{R as p,j as e,c as h,B as g}from"./index-Ce0SFtqJ.js";import{T as b}from"./index-DtiBGdN8.js";import{T as u}from"./index-DMVNuElq.js";import{S as f}from"./index-CJ3PbIrN.js";import{C as x}from"./index-BWuH497B.js";const i=p.forwardRef(({items:t,column:r,bordered:n=!0,size:l="medium",className:o,style:c,...a},d)=>e.jsx("dl",{ref:d,className:h("cinna-descriptions",`cinna-descriptions--${l}`,!n&&"cinna-descriptions--borderless",o),style:{gridTemplateColumns:r?`repeat(${r}, minmax(0, 1fr))`:void 0,...c},...a,children:t.map((s,m)=>e.jsxs("div",{style:{gridColumn:s.span?"span "+Math.min(s.span,r??1):void 0},children:[e.jsx("dt",{children:s.label}),e.jsx("dd",{children:s.children})]},s.key??m))}));i.displayName="Descriptions";const S={examples:[{id:"basic-descriptions",zh:{title:"基本描述列表",description:"items 用于展示一组只读键值信息。",codeToggle:"查看基本描述列表代码"},en:{title:"Basic descriptions",description:"Use items to display a readonly set of key-value information.",codeToggle:"View basic descriptions code"},code:`import { Descriptions } from '@cinna-design/react';

const items = [
  { label: 'Component', children: 'Table' },
  { label: 'Owner', children: 'Docs team' },
  { label: 'Status', children: 'Review' },
];

export default () => <Descriptions items={items} />;`,render:()=>e.jsx(i,{items:[{label:"Component",children:"Table"},{label:"Owner",children:"Docs team"},{label:"Status",children:"Review"}]})},{id:"descriptions-column",zh:{title:"列数控制",description:"column 指定每行展示的描述项数量，适合稳定详情页布局。",codeToggle:"查看列数控制代码"},en:{title:"Column count",description:"column controls how many items appear per row for stable detail layouts.",codeToggle:"View column count code"},code:`import { Descriptions } from '@cinna-design/react';

const items = [
  { label: 'Package', children: '@cinna-design/react' },
  { label: 'Version', children: '0.2.0' },
  { label: 'Theme', children: 'Cloud soft' },
  { label: 'Mode', children: 'Docs' },
];

export default () => <Descriptions column={2} items={items} />;`,render:()=>e.jsx(i,{column:2,items:[{label:"Package",children:"@cinna-design/react"},{label:"Version",children:"0.2.0"},{label:"Theme",children:"Cloud soft"},{label:"Mode",children:"Docs"}]})},{id:"descriptions-rich-content",zh:{title:"富内容",description:"children 可传入任意 ReactNode，用于标签、按钮或强调文本。",codeToggle:"查看富内容代码"},en:{title:"Rich content",description:"children accepts any ReactNode for tags, buttons, or emphasized text.",codeToggle:"View rich content code"},code:`import { Button, Descriptions, Tag, Text } from '@cinna-design/react';

const items = [
  { label: 'Status', children: <Tag color="pistachio">Ready</Tag> },
  { label: 'Score', children: <Text strong>98%</Text> },
  { label: 'Action', children: <Button size="small" variant="text">Open</Button> },
];

export default () => <Descriptions column={3} items={items} />;`,render:()=>e.jsx(i,{column:3,items:[{label:"Status",children:e.jsx(b,{color:"pistachio",children:"Ready"})},{label:"Score",children:e.jsx(u,{strong:!0,children:"98%"})},{label:"Action",children:e.jsx(g,{size:"small",variant:"text",children:"Open"})}]})},{id:"descriptions-size",zh:{title:"尺寸密度",description:"size 支持 small、medium 和 large，用于不同信息密度的详情区。",codeToggle:"查看尺寸密度代码"},en:{title:"Size density",description:"size supports small, medium, and large for different detail densities.",codeToggle:"View size density code"},code:`import { Descriptions, Space } from '@cinna-design/react';

const items = [
  { label: 'Name', children: 'Cinna' },
  { label: 'Tone', children: 'Soft' },
];

export default () => (
  <Space direction="vertical" align="stretch">
    <Descriptions size="small" items={items} />
    <Descriptions size="large" items={items} />
  </Space>
);`,render:()=>{const t=[{label:"Name",children:"Cinna"},{label:"Tone",children:"Soft"}];return e.jsxs(f,{direction:"vertical",align:"stretch",children:[e.jsx(i,{size:"small",items:t}),e.jsx(i,{size:"large",items:t})]})}},{id:"descriptions-borderless",zh:{title:"无边框",description:"bordered={false} 可去掉外框，用在卡片内部或轻量详情区。",codeToggle:"查看无边框代码"},en:{title:"Borderless",description:"bordered={false} removes the frame for card interiors or lightweight details.",codeToggle:"View borderless code"},code:`import { Card, Descriptions } from '@cinna-design/react';

const items = [
  { label: 'Release', children: 'June notes' },
  { label: 'Owner', children: 'Design system' },
];

export default () => (
  <Card title="Summary">
    <Descriptions bordered={false} items={items} />
  </Card>
);`,render:()=>e.jsx(x,{title:"Summary",children:e.jsx(i,{bordered:!1,items:[{label:"Release",children:"June notes"},{label:"Owner",children:"Design system"}]})})}]};export{S as descriptionsDoc};
