import{j as e,R as r,B as d}from"./index-BKj7f8pq.js";import{L as i}from"./index-XnEiPX-m.js";import{S as a}from"./index-Dv7KxCjI.js";import{C as c}from"./index-CJF20kXI.js";const u={examples:[{id:"basic-loading",zh:{title:"基础加载",description:"Loading 展示品牌化加载动画，默认带有 Loading 文案。",codeToggle:"查看基础加载代码"},en:{title:"Basic loading",description:"Loading renders the branded loading animation with Loading copy by default.",codeToggle:"View basic loading code"},code:`import { Loading } from '@cinna-design/react';

export default () => <Loading />;`,render:()=>e.jsx(i,{})},{id:"loading-sizes",zh:{title:"加载尺寸",description:"size 支持 small、medium 和 large。",codeToggle:"查看加载尺寸代码"},en:{title:"Sizes",description:"size supports small, medium, and large.",codeToggle:"View loading sizes code"},code:`import { Loading, Space } from '@cinna-design/react';

export default () => (
  <Space wrap align="center">
    <Loading size="small" />
    <Loading size="medium" />
    <Loading size="large" />
  </Space>
);`,render:()=>e.jsxs(a,{wrap:!0,align:"center",children:[e.jsx(i,{size:"small"}),e.jsx(i,{size:"medium"}),e.jsx(i,{size:"large"})]})},{id:"loading-label",zh:{title:"加载文案",description:"label 可替换默认文案，设置为 null 可隐藏文案。",codeToggle:"查看加载文案代码"},en:{title:"Loading label",description:"Use label to replace the default copy, or set it to null to hide the copy.",codeToggle:"View loading label code"},code:`import { Loading, Space } from '@cinna-design/react';

export default () => (
  <Space wrap align="center">
    <Loading label="Baking preview" />
    <Loading label={null} />
  </Space>
);`,render:()=>e.jsxs(a,{wrap:!0,align:"center",children:[e.jsx(i,{label:"Baking preview"}),e.jsx(i,{label:null})]})},{id:"loading-active",zh:{title:"控制显示",description:"active 为 false 时不渲染加载动画。",codeToggle:"查看控制显示代码"},en:{title:"Controlled visibility",description:"When active is false, the loading animation is not rendered.",codeToggle:"View loading active code"},code:`import { Button, Loading, Space } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [active, setActive] = useState(true);

  return (
    <Space wrap direction="vertical" align="flex-start">
      <Button onClick={() => setActive((value) => !value)}>Toggle loading</Button>
      <Loading active={active} label="Preparing" />
    </Space>
  );
};`,render:()=>{const o=()=>{const[t,n]=r.useState(!0);return e.jsxs(a,{wrap:!0,direction:"vertical",align:"flex-start",children:[e.jsx(d,{onClick:()=>n(l=>!l),children:"Toggle loading"}),e.jsx(i,{active:t,label:"Preparing"})]})};return e.jsx(o,{})}},{id:"loading-region",zh:{title:"区域加载",description:"作为普通组件使用时，可放进卡片、面板或局部内容区域。",codeToggle:"查看区域加载代码"},en:{title:"Region loading",description:"As a normal component, it can be placed inside cards, panels, or local content areas.",codeToggle:"View loading region code"},code:`import { Card, Loading } from '@cinna-design/react';

export default () => (
  <Card title="Preview">
    <Loading size="small" label="Loading preview" />
  </Card>
);`,render:()=>e.jsx(c,{title:"Preview",children:e.jsx(i,{size:"small",label:"Loading preview"})})}]};export{u as loadingDoc};
