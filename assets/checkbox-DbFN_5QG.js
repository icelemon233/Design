import{j as e,R as r}from"./index-BKj7f8pq.js";import{C as o,a as s}from"./index-BSMocbB9.js";import{S as a}from"./index-Dv7KxCjI.js";import{T as b}from"./index-ryGFQma_.js";const n=[{label:"Docs",value:"docs"},{label:"Tokens",value:"tokens"},{label:"Icons",value:"icons"}],m={examples:[{id:"basic-checkbox",zh:{title:"基本用法",description:"label 用于展示复选框旁的说明文本，勾选框区域会给出轻量反馈。",codeToggle:"查看基本用法代码"},en:{title:"Basic usage",description:"Use label for descriptive text. The box area gives subtle feedback on click.",codeToggle:"View basic usage code"},code:`import { Checkbox } from '@cinna-design/react';

export default () => <Checkbox label="Receive release notes" />;`,render:()=>e.jsx(o,{label:"Receive release notes"})},{id:"checkbox-animation",zh:{title:"动效选择",description:"animation 支持粒子、弹出、手写勾号和无动效，点击文字也会触发动效，粒子范围仍限制在勾选框区域。",codeToggle:"查看动效选择代码"},en:{title:"Animation",description:"animation supports particles, pop, handwriting, and none. Clicking the label also triggers motion, while particles stay scoped to the box.",codeToggle:"View animation code"},code:`import { Checkbox, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Checkbox label="Particles" animation="particles" />
    <Checkbox label="Pop" animation="pop" />
    <Checkbox label="Handwriting" animation="handwriting" />
    <Checkbox label="No animation" animation="none" />
  </Space>
);`,render:()=>e.jsxs(a,{wrap:!0,children:[e.jsx(o,{label:"Particles",animation:"particles"}),e.jsx(o,{label:"Pop",animation:"pop"}),e.jsx(o,{label:"Handwriting",animation:"handwriting"}),e.jsx(o,{label:"No animation",animation:"none"})]})},{id:"checkbox-group",zh:{title:"复选框组",description:"CheckboxGroup 统一管理多个选项，onChange 会返回当前选中的 value 列表。",codeToggle:"查看复选框组代码"},en:{title:"Checkbox group",description:"CheckboxGroup manages related options and returns checked values from onChange.",codeToggle:"View checkbox group code"},code:`import { CheckboxGroup, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

const options = [
  { label: 'Docs', value: 'docs' },
  { label: 'Tokens', value: 'tokens' },
  { label: 'Icons', value: 'icons' },
];

export default () => {
  const [checked, setChecked] = useState(['docs']);

  return (
    <Space direction="vertical" align="flex-start">
      <CheckboxGroup options={options} value={checked} onChange={setChecked} />
      <Text tone="secondary">Selected: {checked.join(', ') || 'none'}</Text>
    </Space>
  );
};`,render:()=>{const i=()=>{const[t,c]=r.useState(["docs"]);return e.jsxs(a,{direction:"vertical",align:"flex-start",children:[e.jsx(s,{options:n,value:t,onChange:c}),e.jsxs(b,{tone:"secondary",children:["Selected: ",t.join(", ")||"none"]})]})};return e.jsx(i,{})}},{id:"checkbox-indeterminate-linkage",zh:{title:"半选态联动",description:"父级复选框可以通过 indeterminate 表达部分选中，并和子项联动。",codeToggle:"查看半选态联动代码"},en:{title:"Indeterminate linkage",description:"A parent checkbox can use indeterminate for partial selection and link with children.",codeToggle:"View indeterminate linkage code"},code:`import { Checkbox, CheckboxGroup, Space } from '@cinna-design/react';
import { useState } from 'react';

const options = [
  { label: 'Docs', value: 'docs' },
  { label: 'Tokens', value: 'tokens' },
  { label: 'Icons', value: 'icons' },
];

export default () => {
  const [checked, setChecked] = useState(['docs']);
  const allChecked = checked.length === options.length;
  const indeterminate = checked.length > 0 && !allChecked;

  return (
    <Space direction="vertical" align="flex-start">
      <Checkbox
        label="Select all resources"
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={(event) => setChecked(event.currentTarget.checked ? options.map((item) => item.value) : [])}
      />
      <CheckboxGroup options={options} value={checked} onChange={setChecked} />
    </Space>
  );
};`,render:()=>{const i=()=>{const[t,c]=r.useState(["docs"]),l=t.length===n.length,d=t.length>0&&!l;return e.jsxs(a,{direction:"vertical",align:"flex-start",children:[e.jsx(o,{label:"Select all resources",checked:l,indeterminate:d,onChange:h=>c(h.currentTarget.checked?n.map(p=>p.value):[])}),e.jsx(s,{options:n,value:t,onChange:c})]})};return e.jsx(i,{})}},{id:"checkbox-disabled",zh:{title:"不可用",description:"disabled 会阻止用户改变选中状态，并以置灰方式降低可操作感。",codeToggle:"查看不可用代码"},en:{title:"Disabled",description:"disabled prevents changes and uses a muted gray visual state.",codeToggle:"View disabled code"},code:`import { Checkbox, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Checkbox label="Disabled" disabled />
    <Checkbox label="Checked disabled" defaultChecked disabled />
  </Space>
);`,render:()=>e.jsxs(a,{wrap:!0,children:[e.jsx(o,{label:"Disabled",disabled:!0}),e.jsx(o,{label:"Checked disabled",defaultChecked:!0,disabled:!0})]})},{id:"checkbox-custom-style",zh:{title:"字体与颜色",description:"fontSize、labelColor、checkedColor 等参数可调整文本和方框颜色。",codeToggle:"查看字体与颜色代码"},en:{title:"Font and color",description:"Use fontSize, labelColor, checkedColor, and related props to tune text and box color.",codeToggle:"View font and color code"},code:`import { Checkbox, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Checkbox
      label="Lake blue checkbox"
      defaultChecked
      fontSize={18}
      labelColor="#46332a"
      checkedColor="#73c4e0"
      borderColor="#8a6c5f"
    />
    <Checkbox
      label="Peach particles"
      animation="particles"
      rippleParticleColors={['#73c4e0', '#ffd8c2', '#df6677']}
    />
  </Space>
);`,render:()=>e.jsxs(a,{direction:"vertical",align:"flex-start",children:[e.jsx(o,{label:"Lake blue checkbox",defaultChecked:!0,fontSize:18,labelColor:"#46332a",checkedColor:"#73c4e0",borderColor:"#8a6c5f"}),e.jsx(o,{label:"Peach particles",animation:"particles",rippleParticleColors:["#73c4e0","#ffd8c2","#df6677"]})]})}]};export{m as checkboxDoc};
