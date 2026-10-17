import{j as e,R as n}from"./index-_8eXcLz2.js";import{S as l}from"./index-DspvPzbg.js";import{S as o}from"./index-n3tSMIzx.js";import{T as s}from"./index-BAwLJX5K.js";import"./useControllable-BAjGFdKN.js";const m={examples:[{id:"basic-segmented",zh:{title:"基本用法",description:"用于在少量互斥选项之间切换。",codeToggle:"查看基本用法代码"},en:{title:"Basic segmented",description:"Use it to switch between a small set of exclusive options.",codeToggle:"View basic segmented code"},code:`import { Segmented } from '@cinna-design/react';

const options = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Calendar', value: 'calendar' },
];

export default () => <Segmented options={options} defaultValue="board" />;`,render:()=>e.jsx(l,{options:[{label:"List",value:"list"},{label:"Board",value:"board"},{label:"Calendar",value:"calendar"}],defaultValue:"board"})},{id:"segmented-sizes",zh:{title:"控件尺寸",description:"size 提供 small、medium 与 large 三种尺寸。",codeToggle:"查看控件尺寸代码"},en:{title:"Control sizes",description:"size supports small, medium, and large controls.",codeToggle:"View control sizes code"},code:`import { Segmented, Space } from '@cinna-design/react';

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

export default () => (
  <Space direction="vertical" align="flex-start">
    <Segmented size="small" options={options} defaultValue="day" />
    <Segmented size="medium" options={options} defaultValue="week" />
    <Segmented size="large" options={options} defaultValue="month" />
  </Space>
);`,render:()=>{const t=[{label:"Day",value:"day"},{label:"Week",value:"week"},{label:"Month",value:"month"}];return e.jsxs(o,{direction:"vertical",align:"flex-start",children:[e.jsx(l,{size:"small",options:t,defaultValue:"day"}),e.jsx(l,{size:"medium",options:t,defaultValue:"week"}),e.jsx(l,{size:"large",options:t,defaultValue:"month"})]})}},{id:"segmented-block",zh:{title:"撑满宽度",description:"block 让分段选择器填满父容器宽度。",codeToggle:"查看撑满宽度代码"},en:{title:"Block",description:"block makes the segmented control fill its parent width.",codeToggle:"View block code"},code:`import { Segmented } from '@cinna-design/react';

const options = [
  { label: 'Map', value: 'map' },
  { label: 'Transit', value: 'transit' },
  { label: 'Satellite', value: 'satellite' },
];

export default () => (
  <div style={{ width: 460 }}>
    <Segmented block options={options} defaultValue="map" />
  </div>
);`,render:()=>e.jsx("div",{style:{width:"min(460px, 100%)"},children:e.jsx(l,{block:!0,options:[{label:"Map",value:"map"},{label:"Transit",value:"transit"},{label:"Satellite",value:"satellite"}],defaultValue:"map"})})},{id:"segmented-disabled-option",zh:{title:"禁用选项",description:"可在单个 option 上设置 disabled。",codeToggle:"查看禁用选项代码"},en:{title:"Disabled option",description:"Set disabled on an individual option.",codeToggle:"View disabled option code"},code:`import { Segmented } from '@cinna-design/react';

const options = [
  { label: 'Draft', value: 'draft' },
  { label: 'Review', value: 'review', disabled: true },
  { label: 'Published', value: 'published' },
];

export default () => <Segmented options={options} defaultValue="draft" />;`,render:()=>e.jsx(l,{options:[{label:"Draft",value:"draft"},{label:"Review",value:"review",disabled:!0},{label:"Published",value:"published"}],defaultValue:"draft"})},{id:"segmented-custom-label",zh:{title:"自定义标签",description:"label 支持 ReactNode，可组合图标、数字或多层文本。",codeToggle:"查看自定义标签代码"},en:{title:"Custom label",description:"label accepts ReactNode for icons, numbers, or composed text.",codeToggle:"View custom label code"},code:`import { Segmented } from '@cinna-design/react';

const options = [
  { label: <span>+ Boost</span>, value: 'boost' },
  { label: <span># Stream</span>, value: 'stream' },
  { label: <span>* Cloud</span>, value: 'cloud' },
];

export default () => <Segmented options={options} defaultValue="cloud" />;`,render:()=>e.jsx(l,{options:[{label:e.jsx("span",{children:"+ Boost"}),value:"boost"},{label:e.jsx("span",{children:"# Stream"}),value:"stream"},{label:e.jsx("span",{children:"* Cloud"}),value:"cloud"}],defaultValue:"cloud"})},{id:"segmented-controlled",zh:{title:"受控状态",description:"value 与 onChange 可用于接入外部状态。",codeToggle:"查看受控状态代码"},en:{title:"Controlled",description:"Use value and onChange to connect the segmented control to external state.",codeToggle:"View controlled code"},code:`import { Segmented, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

const options = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

export default () => {
  const [value, setValue] = useState('weekly');

  return (
    <Space direction="vertical" align="flex-start">
      <Segmented options={options} value={value} onChange={setValue} />
      <Text tone="secondary">Selected: {value}</Text>
    </Space>
  );
};`,render:()=>{const t=()=>{const[a,i]=n.useState("weekly");return e.jsxs(o,{direction:"vertical",align:"flex-start",children:[e.jsx(l,{options:[{label:"Daily",value:"daily"},{label:"Weekly",value:"weekly"},{label:"Monthly",value:"monthly"}],value:a,onChange:i}),e.jsxs(s,{tone:"secondary",children:["Selected: ",a]})]})};return e.jsx(t,{})}}]};export{m as segmentedDoc};
