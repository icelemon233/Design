import{R as j,j as e,c as y}from"./index-_8eXcLz2.js";import{S as n}from"./index-n3tSMIzx.js";import{C as p}from"./index-B77ohxiv.js";import{T as b}from"./index-DV4i4EP4.js";const t=j.forwardRef(({title:s,value:i,suffix:c,prefix:o,precision:r,valueStyle:u,formatter:l,groupSeparator:x=",",decimalSeparator:f=".",loading:d,className:m,...g},v)=>{const a=typeof i=="number"?(r===void 0?String(i):i.toFixed(Math.max(0,Math.min(20,r)))).split("."):null,S=a?a[0].replace(/\B(?=(\d{3})+(?!\d))/g,x)+(a[1]?f+a[1]:""):i,h=l?l(i):S;return e.jsxs("div",{ref:v,className:y("cinna-statistic",m),...g,children:[s&&e.jsx("span",{children:s}),e.jsxs("strong",{style:u,"aria-busy":d||void 0,children:[o&&e.jsx("small",{children:o}),d?e.jsx("span",{className:"cinna-statistic__loading","aria-label":"Loading statistic"}):h,c&&e.jsx("small",{children:c})]})]})});t.displayName="Statistic";const V={examples:[{id:"basic-statistic",zh:{title:"基本统计数值",description:"title 和 value 组合展示带标题的关键数字。",codeToggle:"查看基本统计数值代码"},en:{title:"Basic statistic",description:"Combine title and value to show a labeled key metric.",codeToggle:"View basic statistic code"},code:`import { Statistic } from '@cinna-design/react';

export default () => <Statistic title="Active docs" value={128} />;`,render:()=>e.jsx(t,{title:"Active docs",value:128})},{id:"statistic-precision",zh:{title:"数值精度",description:"value 为数字时，precision 可以控制小数位数。",codeToggle:"查看数值精度代码"},en:{title:"Precision",description:"When value is a number, precision controls decimal places.",codeToggle:"View precision code"},code:`import { Statistic } from '@cinna-design/react';

export default () => (
  <Statistic title="Coverage" value={98.642} precision={1} suffix="%" />
);`,render:()=>e.jsx(t,{title:"Coverage",value:98.642,precision:1,suffix:"%"})},{id:"statistic-prefix-suffix",zh:{title:"前缀与后缀",description:"prefix 和 suffix 用于补充单位、符号或状态文案。",codeToggle:"查看前缀与后缀代码"},en:{title:"Prefix and suffix",description:"prefix and suffix add units, symbols, or status copy.",codeToggle:"View prefix suffix code"},code:`import { Space, Statistic } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Statistic title="Revenue" prefix="$" value={8420} />
    <Statistic title="Latency" value={124} suffix="ms" />
  </Space>
);`,render:()=>e.jsxs(n,{wrap:!0,children:[e.jsx(t,{title:"Revenue",prefix:"$",value:8420}),e.jsx(t,{title:"Latency",value:124,suffix:"ms"})]})},{id:"statistic-in-card",zh:{title:"卡片中的统计",description:"可与 Card、Space 组合成轻量指标看板。",codeToggle:"查看卡片统计代码"},en:{title:"Statistic in cards",description:"Combine with Card and Space to build compact metric panels.",codeToggle:"View card statistic code"},code:`import { Card, Space, Statistic } from '@cinna-design/react';

export default () => (
  <Space wrap align="stretch">
    <Card tone="blue"><Statistic title="Ready" value={24} /></Card>
    <Card tone="butter"><Statistic title="Review" value={7} /></Card>
  </Space>
);`,render:()=>e.jsxs(n,{wrap:!0,align:"stretch",children:[e.jsx(p,{tone:"blue",children:e.jsx(t,{title:"Ready",value:24})}),e.jsx(p,{tone:"butter",children:e.jsx(t,{title:"Review",value:7})})]})},{id:"statistic-value-style",zh:{title:"自定义数值样式",description:"valueStyle 可调整数值区域，也可以传入 ReactNode 作为 value。",codeToggle:"查看自定义数值样式代码"},en:{title:"Custom value style",description:"valueStyle adjusts the value area, and value can also be a ReactNode.",codeToggle:"View custom value code"},code:`import { Statistic, Tag } from '@cinna-design/react';

export default () => (
  <Statistic
    title="Launch state"
    value={<Tag color="pistachio">Ready</Tag>}
    valueStyle={{ color: '#3f7a38' }}
  />
);`,render:()=>e.jsx(t,{title:"Launch state",value:e.jsx(b,{color:"pistachio",children:"Ready"}),valueStyle:{color:"#3f7a38"}})}]};export{V as statisticDoc};
