import{r,j as e,R as c}from"./index-_8eXcLz2.js";import{S as a}from"./index--75eZf6r.js";import{S as t}from"./index-n3tSMIzx.js";import{T as d}from"./index-BAwLJX5K.js";import"./FloatingPanel-CnLNE9BF.js";import"./useIsomorphicLayoutEffect-Clyg1nNa.js";import"./useControllable-BAjGFdKN.js";import"./useOutside-B5Pjeknc.js";import"./ComponentPage-BGTThW6u.js";function u(){const[l,o]=r.useState([]);return e.jsx(a,{showSearch:!0,allowClear:!0,mode:"multiple",value:l,onChange:o,placeholder:"Search ingredients",options:[{value:"cream",label:"Cream"},{value:"cinnamon",label:"Cinnamon"},{value:"blueberry",label:"Blueberry"},{value:"sold-out",label:"Vanilla (sold out)",disabled:!0}]})}const p=`import { Select } from '@cinna-design/react';
import { useState } from 'react';
export default function SearchSelectDemo() {
  const [value, setValue] = useState<string | string[]>([]);
  return (
    <Select
      showSearch
      allowClear
      mode="multiple"
      value={value}
      onChange={setValue}
      placeholder="Search ingredients"
      options={[
        { value: 'cream', label: 'Cream' },
        { value: 'cinnamon', label: 'Cinnamon' },
        { value: 'blueberry', label: 'Blueberry' },
        { value: 'sold-out', label: 'Vanilla (sold out)', disabled: true },
      ]}
    />
  );
}
`,C={examples:[{id:"enhanced-select",zh:{title:"搜索与多选",description:"搜索可选项，支持清除、禁用项与键盘方向键。",codeToggle:"查看完整示例代码"},en:{title:"Search and multiple selection",description:"Search options, clear the value and navigate enabled choices with arrow keys.",codeToggle:"View complete example"},code:p,render:()=>e.jsx(u,{})},{id:"basic-select",zh:{title:"基本用法",description:"通过 options 提供选项，defaultValue 设置默认选中项。",codeToggle:"查看基本用法代码"},en:{title:"Basic select",description:"Provide options and use defaultValue for the initial selection.",codeToggle:"View basic select code"},code:`import { Select } from '@cinna-design/react';

const options = [
  { label: 'Docs', value: 'docs' },
  { label: 'Playground', value: 'playground' },
  { label: 'Changelog', value: 'changelog' },
];

export default () => <Select options={options} defaultValue="docs" />;`,render:()=>e.jsx(a,{options:[{label:"Docs",value:"docs"},{label:"Playground",value:"playground"},{label:"Changelog",value:"changelog"}],defaultValue:"docs"})},{id:"select-sizes",zh:{title:"控件尺寸",description:"controlSize 提供 small、medium 与 large 三种高度。",codeToggle:"查看控件尺寸代码"},en:{title:"Control sizes",description:"controlSize supports small, medium, and large heights.",codeToggle:"View control sizes code"},code:`import { Select, Space } from '@cinna-design/react';

const options = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

export default () => (
  <Space direction="vertical" align="flex-start">
    <Select controlSize="small" options={options} defaultValue="small" />
    <Select controlSize="medium" options={options} defaultValue="medium" />
    <Select controlSize="large" options={options} defaultValue="large" />
  </Space>
);`,render:()=>{const l=[{label:"Small",value:"small"},{label:"Medium",value:"medium"},{label:"Large",value:"large"}];return e.jsxs(t,{direction:"vertical",align:"flex-start",children:[e.jsx(a,{controlSize:"small",options:l,defaultValue:"small"}),e.jsx(a,{controlSize:"medium",options:l,defaultValue:"medium"}),e.jsx(a,{controlSize:"large",options:l,defaultValue:"large"})]})}},{id:"select-multiple",zh:{title:"多选模式",description:'mode="multiple" 会以标签形式展示多个选中项。',codeToggle:"查看多选模式代码"},en:{title:"Multiple selection",description:'mode="multiple" displays selected values as compact tags.',codeToggle:"View multiple selection code"},code:`import { Select } from '@cinna-design/react';

const options = [
  { label: 'Design', value: 'design' },
  { label: 'Research', value: 'research' },
  { label: 'Engineering', value: 'engineering' },
];

export default () => (
  <Select
    mode="multiple"
    options={options}
    defaultValue={['design', 'engineering']}
  />
);`,render:()=>e.jsx(a,{mode:"multiple",options:[{label:"Design",value:"design"},{label:"Research",value:"research"},{label:"Engineering",value:"engineering"}],defaultValue:["design","engineering"]})},{id:"select-clearable",zh:{title:"可清除",description:"allowClear 在已选择时提供清除入口。",codeToggle:"查看可清除代码"},en:{title:"Clearable",description:"allowClear provides a clear action once a value is selected.",codeToggle:"View clearable code"},code:`import { Select } from '@cinna-design/react';

const options = [
  { label: 'Morning', value: 'morning' },
  { label: 'Afternoon', value: 'afternoon' },
  { label: 'Evening', value: 'evening' },
];

export default () => (
  <Select
    allowClear
    options={options}
    defaultValue="afternoon"
  />
);`,render:()=>e.jsx(a,{allowClear:!0,options:[{label:"Morning",value:"morning"},{label:"Afternoon",value:"afternoon"},{label:"Evening",value:"evening"}],defaultValue:"afternoon"})},{id:"select-disabled",zh:{title:"禁用状态",description:"disabled 禁用选择器，option.disabled 可禁用单个选项。",codeToggle:"查看禁用状态代码"},en:{title:"Disabled",description:"disabled blocks the select, while option.disabled blocks a single option.",codeToggle:"View disabled code"},code:`import { Select, Space } from '@cinna-design/react';

const options = [
  { label: 'Available', value: 'available' },
  { label: 'Paused', value: 'paused', disabled: true },
];

export default () => (
  <Space direction="vertical" align="flex-start">
    <Select options={options} placeholder="Choose status" />
    <Select options={options} defaultValue="available" disabled />
  </Space>
);`,render:()=>{const l=[{label:"Available",value:"available"},{label:"Paused",value:"paused",disabled:!0}];return e.jsxs(t,{direction:"vertical",align:"flex-start",children:[e.jsx(a,{options:l,placeholder:"Choose status"}),e.jsx(a,{options:l,defaultValue:"available",disabled:!0})]})}},{id:"select-controlled",zh:{title:"受控选择",description:"value 与 onChange 可用于接入外部状态。",codeToggle:"查看受控选择代码"},en:{title:"Controlled selection",description:"Use value and onChange to connect the select to external state.",codeToggle:"View controlled selection code"},code:`import { Select, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

const options = [
  { label: 'Docs', value: 'docs' },
  { label: 'Tokens', value: 'tokens' },
  { label: 'Icons', value: 'icons' },
];

export default () => {
  const [value, setValue] = useState('tokens');

  return (
    <Space direction="vertical" align="flex-start">
      <Select options={options} value={value} onChange={(next) => setValue(String(next))} />
      <Text tone="secondary">Selected: {value}</Text>
    </Space>
  );
};`,render:()=>{const l=()=>{const[o,n]=c.useState("tokens"),i=[{label:"Docs",value:"docs"},{label:"Tokens",value:"tokens"},{label:"Icons",value:"icons"}];return e.jsxs(t,{direction:"vertical",align:"flex-start",children:[e.jsx(a,{options:i,value:o,onChange:s=>n(String(s))}),e.jsxs(d,{tone:"secondary",children:["Selected: ",o]})]})};return e.jsx(l,{})}}]};export{C as selectDoc};
