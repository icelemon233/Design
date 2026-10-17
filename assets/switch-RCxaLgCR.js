import{R as u,u as b,r as j,j as e,c as z}from"./index-BZKQtVdI.js";import{S as l}from"./index-CGJnK8xI.js";import{T}from"./index-PYGa7LZ7.js";const t=u.forwardRef(({checked:s,defaultChecked:i,onChange:a,size:p="medium",checkedChildren:o,unCheckedChildren:r,loading:n,className:w,disabled:f,onClick:m,...h},x)=>{const g=b(f),[S,k]=j.useState(!!i),d=s??S,C=()=>{if(g||n)return;const c=!d;k(c),a?.(c)};return e.jsxs("button",{ref:x,type:"button",role:"switch","aria-label":h["aria-label"]??"Toggle","aria-checked":d,disabled:g||n,className:z("cinna-switch",`cinna-switch--${p}`,d&&"cinna-switch--checked",n&&"cinna-switch--loading",w),onClick:c=>{m?.(c),c.defaultPrevented||C()},...h,children:[e.jsx("span",{className:"cinna-switch__handle"}),(o||r)&&e.jsx("span",{className:"cinna-switch__label",children:d?o:r})]})});t.displayName="Switch";const E={examples:[{id:"basic-switch",zh:{title:"基本用法",description:"用于在开和关之间切换状态。",codeToggle:"查看基本用法代码"},en:{title:"Basic switch",description:"Use it to toggle between on and off states.",codeToggle:"View basic switch code"},code:`import { Switch } from '@cinna-design/react';

export default () => <Switch defaultChecked />;`,render:()=>e.jsx(t,{defaultChecked:!0})},{id:"switch-children",zh:{title:"开关文案",description:"checkedChildren 与 unCheckedChildren 用于展示开关两种状态的短文案。",codeToggle:"查看开关文案代码"},en:{title:"State labels",description:"checkedChildren and unCheckedChildren render short labels for each state.",codeToggle:"View state labels code"},code:`import { Switch } from '@cinna-design/react';

export default () => (
  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
);`,render:()=>e.jsx(t,{checkedChildren:"On",unCheckedChildren:"Off",defaultChecked:!0})},{id:"switch-sizes",zh:{title:"开关尺寸",description:"size 提供 small、medium 与 large 三种尺寸。",codeToggle:"查看开关尺寸代码"},en:{title:"Switch sizes",description:"size supports small, medium, and large controls.",codeToggle:"View switch sizes code"},code:`import { Space, Switch } from '@cinna-design/react';

export default () => (
  <Space>
    <Switch size="small" defaultChecked />
    <Switch size="medium" defaultChecked />
    <Switch size="large" defaultChecked />
  </Space>
);`,render:()=>e.jsxs(l,{children:[e.jsx(t,{size:"small",defaultChecked:!0}),e.jsx(t,{size:"medium",defaultChecked:!0}),e.jsx(t,{size:"large",defaultChecked:!0})]})},{id:"switch-disabled-loading",zh:{title:"禁用与加载",description:"disabled 与 loading 都会阻止用户切换状态，loading 会显示处理中效果。",codeToggle:"查看禁用与加载代码"},en:{title:"Disabled and loading",description:"disabled and loading both prevent toggling, while loading shows progress feedback.",codeToggle:"View disabled and loading code"},code:`import { Space, Switch } from '@cinna-design/react';

export default () => (
  <Space>
    <Switch disabled />
    <Switch defaultChecked disabled />
    <Switch loading defaultChecked />
  </Space>
);`,render:()=>e.jsxs(l,{children:[e.jsx(t,{disabled:!0}),e.jsx(t,{defaultChecked:!0,disabled:!0}),e.jsx(t,{loading:!0,defaultChecked:!0})]})},{id:"switch-controlled",zh:{title:"受控状态",description:"checked 与 onChange 可用于接入外部状态。",codeToggle:"查看受控状态代码"},en:{title:"Controlled",description:"Use checked and onChange to connect the switch to external state.",codeToggle:"View controlled code"},code:`import { Space, Switch, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <Space direction="vertical" align="flex-start">
      <Switch checked={checked} onChange={setChecked} />
      <Text tone="secondary">Enabled: {String(checked)}</Text>
    </Space>
  );
};`,render:()=>{const s=()=>{const[i,a]=u.useState(!0);return e.jsxs(l,{direction:"vertical",align:"flex-start",children:[e.jsx(t,{checked:i,onChange:a}),e.jsxs(T,{tone:"secondary",children:["Enabled: ",String(i)]})]})};return e.jsx(s,{})}}]};export{E as switchDoc};
