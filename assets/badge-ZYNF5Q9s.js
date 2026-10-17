import{j as e,B as a}from"./index-_8eXcLz2.js";import{S as o}from"./index-n3tSMIzx.js";import{B as t}from"./index-ra7S_aY2.js";import{A as s}from"./index-DJg2lxZS.js";const i={examples:[{id:"basic-badge",zh:{title:"基本徽标",description:"count 会显示在包裹元素右上角，用于提示待处理数量。",codeToggle:"查看基本徽标代码"},en:{title:"Basic badge",description:"count renders at the top-right of the wrapped element for pending totals.",codeToggle:"View basic badge code"},code:`import { Badge, Button, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <Badge count={5}>
      <Button variant="cream">Inbox</Button>
    </Badge>
    <Badge count={18}>
      <Button variant="secondary">Reviews</Button>
    </Badge>
  </Space>
);`,render:()=>e.jsxs(o,{children:[e.jsx(t,{count:5,children:e.jsx(a,{variant:"cream",children:"Inbox"})}),e.jsx(t,{count:18,children:e.jsx(a,{variant:"secondary",children:"Reviews"})})]})},{id:"badge-overflow-zero",zh:{title:"封顶与零值",description:"overflowCount 控制数字封顶，showZero 可让 0 也保持显示。",codeToggle:"查看封顶与零值代码"},en:{title:"Overflow and zero",description:"overflowCount caps large numbers, while showZero keeps 0 visible.",codeToggle:"View overflow zero code"},code:`import { Badge, Button, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <Badge count={128} overflowCount={99}>
      <Button variant="cream">Messages</Button>
    </Badge>
    <Badge count={0} showZero>
      <Button variant="cream">Done</Button>
    </Badge>
  </Space>
);`,render:()=>e.jsxs(o,{children:[e.jsx(t,{count:128,overflowCount:99,children:e.jsx(a,{variant:"cream",children:"Messages"})}),e.jsx(t,{count:0,showZero:!0,children:e.jsx(a,{variant:"cream",children:"Done"})})]})},{id:"badge-dot",zh:{title:"小圆点",description:"dot 用于只提示状态存在，不展示具体数字。",codeToggle:"查看小圆点代码"},en:{title:"Dot badge",description:"dot indicates presence without showing a numeric count.",codeToggle:"View dot badge code"},code:`import { Avatar, Badge, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <Badge dot>
      <Avatar>C</Avatar>
    </Badge>
    <Badge dot status="success">
      <Avatar shape="square">OK</Avatar>
    </Badge>
  </Space>
);`,render:()=>e.jsxs(o,{children:[e.jsx(t,{dot:!0,children:e.jsx(s,{children:"C"})}),e.jsx(t,{dot:!0,status:"success",children:e.jsx(s,{shape:"square",children:"OK"})})]})},{id:"badge-status-text",zh:{title:"状态文本",description:"status 与 text 搭配时可作为独立状态徽标使用。",codeToggle:"查看状态文本代码"},en:{title:"Status text",description:"Pair status and text to use Badge as a standalone status marker.",codeToggle:"View status text code"},code:`import { Badge, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Badge status="info" text="Queued" />
    <Badge status="success" text="Published" />
    <Badge status="warning" text="Needs review" />
    <Badge status="error" text="Blocked" />
  </Space>
);`,render:()=>e.jsxs(o,{wrap:!0,children:[e.jsx(t,{status:"info",text:"Queued"}),e.jsx(t,{status:"success",text:"Published"}),e.jsx(t,{status:"warning",text:"Needs review"}),e.jsx(t,{status:"error",text:"Blocked"})]})},{id:"badge-offset-standalone",zh:{title:"位置偏移与独立使用",description:"offset 可微调徽标位置；没有包裹内容时也可以独立展示。",codeToggle:"查看位置偏移代码"},en:{title:"Offset and standalone",description:"offset fine-tunes badge position, and Badge can also render without children.",codeToggle:"View offset standalone code"},code:`import { Badge, Button, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <Badge count={3} offset={[8, -4]}>
      <Button variant="cream">Shifted</Button>
    </Badge>
    <Badge count={7} />
    <Badge text="Live" status="success" />
  </Space>
);`,render:()=>e.jsxs(o,{children:[e.jsx(t,{count:3,offset:[8,-4],children:e.jsx(a,{variant:"cream",children:"Shifted"})}),e.jsx(t,{count:7}),e.jsx(t,{text:"Live",status:"success"})]})}]};export{i as badgeDoc};
