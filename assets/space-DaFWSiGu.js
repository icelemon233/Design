import{j as e,B as t}from"./index-Ce0SFtqJ.js";import{S as i}from"./index-CJ3PbIrN.js";import{C as s}from"./index-BWuH497B.js";import{T as r}from"./index-DMVNuElq.js";import{T as a}from"./index-DtiBGdN8.js";import{D as n}from"./index-C0phAwGR.js";const x={examples:[{id:"basic-space",zh:{title:"基本用法",description:"用 Space 给相邻按钮提供稳定的水平间距。",codeToggle:"查看基本间距代码"},en:{title:"Basic spacing",description:"Use Space to keep neighboring actions evenly separated.",codeToggle:"View basic spacing code"},code:`import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <Button>Publish</Button>
    <Button variant="cream">Preview</Button>
    <Button variant="ghost">Save draft</Button>
  </Space>
);`,render:()=>e.jsxs(i,{children:[e.jsx(t,{children:"Publish"}),e.jsx(t,{variant:"cream",children:"Preview"}),e.jsx(t,{variant:"ghost",children:"Save draft"})]})},{id:"vertical-space",zh:{title:"垂直间距",description:'direction="vertical" 适合纵向表单块、卡片和说明文字。',codeToggle:"查看垂直间距代码"},en:{title:"Vertical spacing",description:'Use direction="vertical" for stacked cards, form blocks, and helper copy.',codeToggle:"View vertical spacing code"},code:`import { Card, Space, Text } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" size="large" block align="stretch">
    <Card title="Design review">
      <Text tone="secondary">Three details need a final pass before release.</Text>
    </Card>
    <Card title="Launch note" tone="blue">
      <Text tone="secondary">Spacing stays consistent across stacked content.</Text>
    </Card>
  </Space>
);`,render:()=>e.jsxs(i,{direction:"vertical",size:"large",block:!0,align:"stretch",children:[e.jsx(s,{title:"Design review",children:e.jsx(r,{tone:"secondary",children:"Three details need a final pass before release."})}),e.jsx(s,{title:"Launch note",tone:"blue",children:e.jsx(r,{tone:"secondary",children:"Spacing stays consistent across stacked content."})})]})},{id:"space-size",zh:{title:"间距大小",description:"支持 small、medium、large，也可以传入数字作为像素间距。",codeToggle:"查看间距大小代码"},en:{title:"Spacing size",description:"Use small, medium, large, or a numeric pixel value for custom spacing.",codeToggle:"View spacing size code"},code:`import { Button, Space, Text } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start" size="large">
    <Space size="small">
      <Text strong>small</Text>
      <Button size="small">S</Button>
      <Button size="small" variant="cream">S</Button>
    </Space>
    <Space size="medium">
      <Text strong>medium</Text>
      <Button>M</Button>
      <Button variant="cream">M</Button>
    </Space>
    <Space size="large">
      <Text strong>large</Text>
      <Button size="large">L</Button>
      <Button size="large" variant="cream">L</Button>
    </Space>
    <Space size={28}>
      <Text strong>28px</Text>
      <Button variant="ghost">Custom</Button>
      <Button variant="dashed">Gap</Button>
    </Space>
  </Space>
);`,render:()=>e.jsxs(i,{direction:"vertical",align:"flex-start",size:"large",children:[e.jsxs(i,{size:"small",children:[e.jsx(r,{strong:!0,children:"small"}),e.jsx(t,{size:"small",children:"S"}),e.jsx(t,{size:"small",variant:"cream",children:"S"})]}),e.jsxs(i,{size:"medium",children:[e.jsx(r,{strong:!0,children:"medium"}),e.jsx(t,{children:"M"}),e.jsx(t,{variant:"cream",children:"M"})]}),e.jsxs(i,{size:"large",children:[e.jsx(r,{strong:!0,children:"large"}),e.jsx(t,{size:"large",children:"L"}),e.jsx(t,{size:"large",variant:"cream",children:"L"})]}),e.jsxs(i,{size:28,children:[e.jsx(r,{strong:!0,children:"28px"}),e.jsx(t,{variant:"ghost",children:"Custom"}),e.jsx(t,{variant:"dashed",children:"Gap"})]})]})},{id:"space-align-justify",zh:{title:"对齐与分布",description:"使用 align 控制交叉轴对齐，justify 控制主轴分布。",codeToggle:"查看对齐分布代码"},en:{title:"Align and justify",description:"Use align for cross-axis alignment and justify for main-axis distribution.",codeToggle:"View align and justify code"},code:`import { Button, Space, Text } from '@cinna-design/react';

export default () => (
  <Space
    block
    align="flex-start"
    justify="space-between"
    style={{ padding: 16, borderRadius: 18, background: '#f0fafe' }}
  >
    <Space direction="vertical" align="flex-start" size="small">
      <Text strong>Cloud card</Text>
      <Text tone="secondary">Top aligned helper copy.</Text>
    </Space>
    <Button size="large">Review</Button>
  </Space>
);`,render:()=>e.jsxs(i,{block:!0,align:"flex-start",justify:"space-between",style:{padding:16,borderRadius:18,background:"#f0fafe"},children:[e.jsxs(i,{direction:"vertical",align:"flex-start",size:"small",children:[e.jsx(r,{strong:!0,children:"Cloud card"}),e.jsx(r,{tone:"secondary",children:"Top aligned helper copy."})]}),e.jsx(t,{size:"large",children:"Review"})]})},{id:"space-wrap",zh:{title:"自动换行",description:"水平内容超过容器宽度时可以自然换行。",codeToggle:"查看自动换行代码"},en:{title:"Wrap",description:"Let horizontal content wrap naturally when the container becomes narrow.",codeToggle:"View wrap code"},code:`import { Space, Tag } from '@cinna-design/react';

export default () => (
  <Space wrap size={10}>
    <Tag color="blue">Design</Tag>
    <Tag color="butter">Token</Tag>
    <Tag color="pistachio">Release</Tag>
    <Tag color="strawberry">Urgent</Tag>
    <Tag color="lavender">Docs</Tag>
    <Tag color="cream">Story</Tag>
  </Space>
);`,render:()=>e.jsxs(i,{wrap:!0,size:10,children:[e.jsx(a,{color:"blue",children:"Design"}),e.jsx(a,{color:"butter",children:"Token"}),e.jsx(a,{color:"pistachio",children:"Release"}),e.jsx(a,{color:"strawberry",children:"Urgent"}),e.jsx(a,{color:"lavender",children:"Docs"}),e.jsx(a,{color:"cream",children:"Story"})]})},{id:"space-split",zh:{title:"分隔符",description:"使用 split 为相邻项插入分隔元素。",codeToggle:"查看分隔符代码"},en:{title:"Split",description:"Use split to insert a separator between neighboring items.",codeToggle:"View split code"},code:`import { Divider, Space, Text } from '@cinna-design/react';

export default () => (
  <Space split={<Divider vertical />}>
    <Text>Overview</Text>
    <Text>Activity</Text>
    <Text tone="error">Archive</Text>
  </Space>
);`,render:()=>e.jsxs(i,{split:e.jsx(n,{vertical:!0}),children:[e.jsx(r,{children:"Overview"}),e.jsx(r,{children:"Activity"}),e.jsx(r,{tone:"error",children:"Archive"})]})}]};export{x as spaceDoc};
