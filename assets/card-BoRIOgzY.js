import{j as e,B as a}from"./index-BZKQtVdI.js";import{C as t}from"./index-3EVt9kje.js";import{T as r}from"./index-PYGa7LZ7.js";import{S as i}from"./index-CGJnK8xI.js";const s={examples:[{id:"basic-card",zh:{title:"基本卡片",description:"Card 用于承载一组相对独立的信息，默认带有柔和背景和内边距。",codeToggle:"查看基本卡片代码"},en:{title:"Basic card",description:"Use Card to hold an independent piece of content with soft surface and padding.",codeToggle:"View basic card code"},code:`import { Card, Text } from '@cinna-design/react';

export default () => (
  <Card>
    <Text tone="secondary">A calm surface for notes, summaries, and compact modules.</Text>
  </Card>
);`,render:()=>e.jsx(t,{children:e.jsx(r,{tone:"secondary",children:"A calm surface for notes, summaries, and compact modules."})})},{id:"card-title-extra",zh:{title:"标题与扩展区域",description:"title 放在卡片头部左侧，extra 适合放状态、链接或轻量操作。",codeToggle:"查看标题与扩展区域代码"},en:{title:"Title and extra",description:"title renders on the left of the header, while extra fits status, links, or light actions.",codeToggle:"View title extra code"},code:`import { Button, Card, Text } from '@cinna-design/react';

export default () => (
  <Card title="Release card" extra={<Button variant="text">Edit</Button>}>
    <Text tone="secondary">Review the final copy before publishing.</Text>
  </Card>
);`,render:()=>e.jsx(t,{title:"Release card",extra:e.jsx(a,{variant:"text",children:"Edit"}),children:e.jsx(r,{tone:"secondary",children:"Review the final copy before publishing."})})},{id:"card-tones",zh:{title:"卡片色调",description:"tone 提供 cream、blue、butter、strawberry、pistachio 和 lavender 六种柔和色调。",codeToggle:"查看卡片色调代码"},en:{title:"Card tones",description:"tone supports cream, blue, butter, strawberry, pistachio, and lavender surfaces.",codeToggle:"View card tones code"},code:`import { Card, Space, Text } from '@cinna-design/react';

export default () => (
  <Space wrap align="stretch">
    <Card tone="cream" title="Cream"><Text>Default</Text></Card>
    <Card tone="blue" title="Blue"><Text>Info</Text></Card>
    <Card tone="butter" title="Butter"><Text>Warm</Text></Card>
    <Card tone="pistachio" title="Pistachio"><Text>Fresh</Text></Card>
  </Space>
);`,render:()=>e.jsxs(i,{wrap:!0,align:"stretch",children:[e.jsx(t,{tone:"cream",title:"Cream",children:e.jsx(r,{children:"Default"})}),e.jsx(t,{tone:"blue",title:"Blue",children:e.jsx(r,{children:"Info"})}),e.jsx(t,{tone:"butter",title:"Butter",children:e.jsx(r,{children:"Warm"})}),e.jsx(t,{tone:"pistachio",title:"Pistachio",children:e.jsx(r,{children:"Fresh"})})]})},{id:"card-interactive",zh:{title:"可交互卡片",description:"interactive 会启用 hover 浮起效果，适合列表入口或可点击模块。",codeToggle:"查看可交互卡片代码"},en:{title:"Interactive card",description:"interactive enables the hover lift for list entries or clickable modules.",codeToggle:"View interactive card code"},code:`import { Card, Space, Text } from '@cinna-design/react';

export default () => (
  <Space wrap align="stretch">
    <Card interactive title="Docs">
      <Text tone="secondary">Open the documentation hub.</Text>
    </Card>
    <Card interactive tone="strawberry" title="Issues">
      <Text tone="secondary">Review blockers before release.</Text>
    </Card>
  </Space>
);`,render:()=>e.jsxs(i,{wrap:!0,align:"stretch",children:[e.jsx(t,{interactive:!0,title:"Docs",children:e.jsx(r,{tone:"secondary",children:"Open the documentation hub."})}),e.jsx(t,{interactive:!0,tone:"strawberry",title:"Issues",children:e.jsx(r,{tone:"secondary",children:"Review blockers before release."})})]})},{id:"card-padded-native",zh:{title:"留白与原生属性",description:"padded={false} 可关闭内置留白，Card 也继承原生 div 属性。",codeToggle:"查看留白与原生属性代码"},en:{title:"Padding and native attributes",description:"padded={false} removes built-in padding, and Card extends native div attributes.",codeToggle:"View padding native code"},code:`import { Card } from '@cinna-design/react';

export default () => (
  <Card
    padded={false}
    title="Custom body"
    style={{ width: 260 }}
  >
    <div style={{ padding: 18, background: '#f0fafe' }}>Custom inner layout</div>
  </Card>
);`,render:()=>e.jsx(t,{padded:!1,title:"Custom body",style:{width:260},children:e.jsx("div",{style:{padding:18,background:"#f0fafe"},children:"Custom inner layout"})})}]};export{s as cardDoc};
