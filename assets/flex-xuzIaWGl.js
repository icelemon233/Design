import{R as f,j as e,c as T,B as n}from"./index-BKj7f8pq.js";import{T as i}from"./index-ryGFQma_.js";import{C as l}from"./index-CJF20kXI.js";import{T as r}from"./index-CQlblGpd.js";import{A as j}from"./index-4v7BoW4U.js";const t=f.forwardRef(({vertical:o,align:s,justify:c,gap:a="medium",wrap:d,inline:x,className:g,style:p,...h},u)=>{const m=typeof a=="number"?`${a}px`:void 0;return e.jsx("div",{ref:u,className:T("cinna-flex",x&&"cinna-flex--inline",o&&"cinna-flex--vertical",typeof a=="string"&&`cinna-flex--${a}`,d&&"cinna-flex--wrap",g),style:{alignItems:s,justifyContent:c,gap:m,...p},...h})});t.displayName="Flex";const B={examples:[{id:"basic-flex",zh:{title:"基本布局",description:"Flex 用于块级内容的水平排列和对齐。",codeToggle:"查看基本布局代码"},en:{title:"Basic layout",description:"Use Flex for block-level horizontal layout and alignment.",codeToggle:"View basic layout code"},code:`import { Button, Flex } from '@cinna-design/react';

export default () => (
  <Flex gap="medium">
    <Button>Primary</Button>
    <Button variant="cream">Default</Button>
    <Button variant="dashed">Dashed</Button>
    <Button variant="text">Text</Button>
  </Flex>
);`,render:()=>e.jsxs(t,{gap:"medium",children:[e.jsx(n,{children:"Primary"}),e.jsx(n,{variant:"cream",children:"Default"}),e.jsx(n,{variant:"dashed",children:"Dashed"}),e.jsx(n,{variant:"text",children:"Text"})]})},{id:"flex-align-justify",zh:{title:"主轴与交叉轴对齐",description:"使用 justify 与 align 控制内容在主轴和交叉轴上的位置。",codeToggle:"查看对齐代码"},en:{title:"Justify and align",description:"Control placement on the main axis and cross axis with justify and align.",codeToggle:"View justify and align code"},code:`import { Flex, Text } from '@cinna-design/react';

export default () => (
  <Flex vertical gap="medium">
    <Flex justify="space-between" align="center" style={{ minHeight: 72, padding: 12, borderRadius: 18, background: '#f0fafe' }}>
      <Text strong>space-between</Text>
      <Text tone="secondary">center aligned</Text>
    </Flex>
    <Flex justify="flex-end" align="flex-start" style={{ minHeight: 72, padding: 12, borderRadius: 18, background: '#fff8ee' }}>
      <Text tone="secondary">flex-end / flex-start</Text>
    </Flex>
  </Flex>
);`,render:()=>e.jsxs(t,{vertical:!0,gap:"medium",children:[e.jsxs(t,{justify:"space-between",align:"center",style:{minHeight:72,padding:12,borderRadius:18,background:"#f0fafe"},children:[e.jsx(i,{strong:!0,children:"space-between"}),e.jsx(i,{tone:"secondary",children:"center aligned"})]}),e.jsx(t,{justify:"flex-end",align:"flex-start",style:{minHeight:72,padding:12,borderRadius:18,background:"#fff8ee"},children:e.jsx(i,{tone:"secondary",children:"flex-end / flex-start"})})]})},{id:"vertical-flex",zh:{title:"垂直方向",description:"vertical 会把主轴切换为纵向，适合信息块堆叠。",codeToggle:"查看垂直方向代码"},en:{title:"Vertical direction",description:"Use vertical to switch the main axis for stacked information blocks.",codeToggle:"View vertical direction code"},code:`import { Card, Flex, Text } from '@cinna-design/react';

export default () => (
  <Flex vertical gap="large">
    <Card title="Morning batch" tone="blue">
      <Text tone="secondary">Cards can stack with one consistent vertical rhythm.</Text>
    </Card>
    <Card title="Afternoon batch" tone="pistachio">
      <Text tone="secondary">The container controls spacing without wrapper markup.</Text>
    </Card>
  </Flex>
);`,render:()=>e.jsxs(t,{vertical:!0,gap:"large",children:[e.jsx(l,{title:"Morning batch",tone:"blue",children:e.jsx(i,{tone:"secondary",children:"Cards can stack with one consistent vertical rhythm."})}),e.jsx(l,{title:"Afternoon batch",tone:"pistachio",children:e.jsx(i,{tone:"secondary",children:"The container controls spacing without wrapper markup."})})]})},{id:"flex-gap",zh:{title:"设置间隙",description:"支持 small、medium、large，也可以传入数字。",codeToggle:"查看间隙代码"},en:{title:"Gap",description:"Use small, medium, large, or a numeric value for custom gaps.",codeToggle:"View gap code"},code:`import { Button, Flex, Text } from '@cinna-design/react';

export default () => (
  <Flex vertical gap="large" align="flex-start">
    <Flex gap="small" align="center">
      <Text strong style={{ width: 72 }}>small</Text>
      <Button size="small">A</Button>
      <Button size="small">B</Button>
    </Flex>
    <Flex gap="large" align="center">
      <Text strong style={{ width: 72 }}>large</Text>
      <Button>A</Button>
      <Button>B</Button>
    </Flex>
    <Flex gap={30} align="center">
      <Text strong style={{ width: 72 }}>30px</Text>
      <Button variant="ghost">A</Button>
      <Button variant="ghost">B</Button>
    </Flex>
  </Flex>
);`,render:()=>e.jsxs(t,{vertical:!0,gap:"large",align:"flex-start",children:[e.jsxs(t,{gap:"small",align:"center",children:[e.jsx(i,{strong:!0,style:{width:72},children:"small"}),e.jsx(n,{size:"small",children:"A"}),e.jsx(n,{size:"small",children:"B"})]}),e.jsxs(t,{gap:"large",align:"center",children:[e.jsx(i,{strong:!0,style:{width:72},children:"large"}),e.jsx(n,{children:"A"}),e.jsx(n,{children:"B"})]}),e.jsxs(t,{gap:30,align:"center",children:[e.jsx(i,{strong:!0,style:{width:72},children:"30px"}),e.jsx(n,{variant:"ghost",children:"A"}),e.jsx(n,{variant:"ghost",children:"B"})]})]})},{id:"flex-wrap",zh:{title:"自动换行",description:"Flex 可以让一组块级元素在窄容器中自然折行。",codeToggle:"查看自动换行代码"},en:{title:"Wrap",description:"Let block-level items wrap naturally inside narrow containers.",codeToggle:"View wrap code"},code:`import { Flex, Tag } from '@cinna-design/react';

export default () => (
  <Flex wrap gap={12}>
    <Tag color="blue">Dashboard</Tag>
    <Tag color="butter">Metrics</Tag>
    <Tag color="pistachio">Stable</Tag>
    <Tag color="strawberry">Incident</Tag>
    <Tag color="lavender">Review</Tag>
    <Tag color="cream">Release</Tag>
  </Flex>
);`,render:()=>e.jsxs(t,{wrap:!0,gap:12,children:[e.jsx(r,{color:"blue",children:"Dashboard"}),e.jsx(r,{color:"butter",children:"Metrics"}),e.jsx(r,{color:"pistachio",children:"Stable"}),e.jsx(r,{color:"strawberry",children:"Incident"}),e.jsx(r,{color:"lavender",children:"Review"}),e.jsx(r,{color:"cream",children:"Release"})]})},{id:"inline-composition",zh:{title:"内联组合",description:"inline 适合把头像、文字和操作排成紧凑行内单元。",codeToggle:"查看内联组合代码"},en:{title:"Inline composition",description:"Use inline for compact rows with avatars, copy, and actions.",codeToggle:"View inline composition code"},code:`import { Avatar, Button, Flex, Text } from '@cinna-design/react';

export default () => (
  <Flex inline gap="medium" align="center">
    <Avatar size={40}>CD</Avatar>
    <Flex vertical gap={4}>
      <Text strong>Cinna Design</Text>
      <Text tone="secondary">Ready for review</Text>
    </Flex>
    <Button size="small" variant="cream">Open</Button>
  </Flex>
);`,render:()=>e.jsxs(t,{inline:!0,gap:"medium",align:"center",children:[e.jsx(j,{size:40,children:"CD"}),e.jsxs(t,{vertical:!0,gap:4,children:[e.jsx(i,{strong:!0,children:"Cinna Design"}),e.jsx(i,{tone:"secondary",children:"Ready for review"})]}),e.jsx(n,{size:"small",variant:"cream",children:"Open"})]})}]};export{B as flexDoc};
