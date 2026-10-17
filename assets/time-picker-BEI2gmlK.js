import{R as D,u as G,r as u,j as i,c as H,I as J}from"./index-BKj7f8pq.js";import{F as K}from"./FloatingPanel-DY7kXLHU.js";import{u as L}from"./useOutside-Cnu6F3q8.js";import{i as _}from"./inputChange-BAY29qBj.js";import{S as T}from"./index-Dv7KxCjI.js";import{T as Q}from"./index-ryGFQma_.js";import"./useIsomorphicLayoutEffect-DYwKHNn_.js";import"./ComponentPage-CxK9ZWuC.js";const t=D.forwardRef(({controlSize:k="medium",status:o,allowClear:b,hourStep:h=1,minuteStep:R=1,use12Hours:E,disabledHours:w,disabledMinutes:F,className:A,value:m,defaultValue:I,onChange:v,disabled:M,readOnly:n,min:S,max:j,...N},p)=>{const l=G(M),[O,V]=u.useState(String(I??"")),[s,P]=u.useState(!1),f=String(m??O),[d,z]=f.split(":").map(Number),g=u.useRef(null),c=u.useRef(null);L(g,s,()=>P(!1)),u.useEffect(()=>{s&&g.current?.querySelectorAll('.cinna-time-panel [aria-selected="true"]').forEach(e=>e.scrollIntoView?.({block:"nearest",inline:"nearest"}))},[s,f]);const r=e=>String(e).padStart(2,"0"),C=(e,a)=>w?.().includes(e)||F?.(e).includes(a)||S!==void 0&&r(e)+":"+r(a)<String(S)||j!==void 0&&r(e)+":"+r(a)>String(j),y=(e,a)=>{if(l||n||C(e,a))return;const x=r(e)+":"+r(a);m===void 0&&V(x),c.current&&v?.(_(c.current,x))},U=()=>{m===void 0&&V(""),c.current&&v?.(_(c.current,""))},q=Array.from({length:24},(e,a)=>a).filter(e=>e%Math.max(1,h)===0),B=Array.from({length:60},(e,a)=>a).filter(e=>e%Math.max(1,R)===0);return i.jsxs("span",{ref:g,className:"cinna-picker",children:[i.jsx("input",{...N,ref:e=>{c.current=e,typeof p=="function"?p(e):p&&(p.current=e)},type:"time",disabled:l,readOnly:n,min:S,max:j,value:f,"aria-label":N["aria-label"]??"Choose time",className:H("cinna-native-input","cinna-native-input--"+k,o&&"cinna-native-input--"+o,A),onChange:e=>{const[a,x]=e.target.value.split(":").map(Number);e.target.value&&C(a,x)||(m===void 0&&V(e.target.value),v?.(e))}}),i.jsx("button",{type:"button",className:"cinna-picker__trigger","aria-label":"Open time panel","aria-haspopup":"dialog","aria-expanded":s&&!l&&!n,disabled:l||n,onClick:()=>P(!s),children:i.jsx(J,{name:"chevron-down",size:12})}),b&&f&&i.jsx("button",{className:"cinna-picker__clear",type:"button","aria-label":"Clear time",disabled:l||n,onClick:U,children:"×"}),s&&!l&&!n&&i.jsx(K,{anchor:g,children:i.jsxs("div",{className:"cinna-picker__popup",role:"dialog","aria-label":"Time selection",children:[i.jsxs("div",{className:"cinna-time-panel",children:[i.jsx("div",{role:"listbox","aria-label":"Hours",children:q.map(e=>i.jsx("button",{type:"button",role:"option","aria-selected":e===d,disabled:w?.().includes(e),onClick:()=>y(e,Number.isFinite(z)?z:0),children:E?r(e%12||12)+(e<12?" AM":" PM"):r(e)},e))}),i.jsx("div",{role:"listbox","aria-label":"Minutes",children:B.map(e=>i.jsx("button",{type:"button",role:"option","aria-selected":e===z,disabled:C(Number.isFinite(d)?d:0,e),onClick:()=>y(Number.isFinite(d)?d:0,e),children:r(e)},e))})]}),i.jsx("button",{type:"button",onClick:()=>{P(!1),c.current?.focus()},children:"Done"})]})})]})});t.displayName="TimePicker";function W(){return i.jsx(t,{defaultValue:"09:30",minuteStep:15,use12Hours:!0,allowClear:!0,"aria-label":"Collection time",disabledHours:()=>[0,1,2,3,4,5,6,22,23]})}const X=`import { TimePicker } from '@cinna-design/react';
export default function TimePanelDemo() {
  return (
    <TimePicker
      defaultValue="09:30"
      minuteStep={15}
      use12Hours
      allowClear
      aria-label="Collection time"
      disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 22, 23]}
    />
  );
}
`,ne={examples:[{id:"enhanced-time-picker",zh:{title:"步进和禁用时间",description:"面板按 15 分钟步进；12 小时显示仍返回 24 小时值。",codeToggle:"查看完整示例代码"},en:{title:"Stepped and disabled times",description:"The panel advances in 15-minute steps and returns a 24-hour value.",codeToggle:"View complete example"},code:X,render:()=>i.jsx(W,{})},{id:"basic-time-picker",zh:{title:"基本用法",description:"用于录入单个时间。",codeToggle:"查看基本用法代码"},en:{title:"Basic time picker",description:"Use it to enter a single time.",codeToggle:"View basic time picker code"},code:`import { TimePicker } from '@cinna-design/react';

export default () => <TimePicker defaultValue="09:30" />;`,render:()=>i.jsx(t,{defaultValue:"09:30"})},{id:"time-picker-sizes",zh:{title:"控件尺寸",description:"controlSize 提供 small、medium 与 large 三种尺寸。",codeToggle:"查看控件尺寸代码"},en:{title:"Control sizes",description:"controlSize supports small, medium, and large controls.",codeToggle:"View control sizes code"},code:`import { Space, TimePicker } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <TimePicker controlSize="small" defaultValue="09:00" />
    <TimePicker controlSize="medium" defaultValue="13:30" />
    <TimePicker controlSize="large" defaultValue="18:45" />
  </Space>
);`,render:()=>i.jsxs(T,{direction:"vertical",align:"flex-start",children:[i.jsx(t,{controlSize:"small",defaultValue:"09:00"}),i.jsx(t,{controlSize:"medium",defaultValue:"13:30"}),i.jsx(t,{controlSize:"large",defaultValue:"18:45"})]})},{id:"time-picker-limits-step",zh:{title:"时间限制与步长",description:"min、max 与 step 来自原生时间输入，可限制可选时间和秒级步长。",codeToggle:"查看时间限制与步长代码"},en:{title:"Time limits and step",description:"min, max, and step come from native time input to constrain time and second step.",codeToggle:"View limits and step code"},code:`import { TimePicker } from '@cinna-design/react';

export default () => (
  <TimePicker min="09:00" max="18:00" step={900} defaultValue="13:30" />
);`,render:()=>i.jsx(t,{min:"09:00",max:"18:00",step:900,defaultValue:"13:30"})},{id:"time-picker-status",zh:{title:"校验状态",description:"status 可表达成功、警告或错误状态。",codeToggle:"查看校验状态代码"},en:{title:"Validation status",description:"status can express success, warning, or error feedback.",codeToggle:"View validation status code"},code:`import { Space, TimePicker } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <TimePicker status="success" defaultValue="09:30" />
    <TimePicker status="warning" defaultValue="09:30" />
    <TimePicker status="error" defaultValue="09:30" />
  </Space>
);`,render:()=>i.jsxs(T,{direction:"vertical",align:"flex-start",children:[i.jsx(t,{status:"success",defaultValue:"09:30"}),i.jsx(t,{status:"warning",defaultValue:"09:30"}),i.jsx(t,{status:"error",defaultValue:"09:30"})]})},{id:"time-picker-native-props",zh:{title:"原生属性",description:"TimePicker 继承原生 input 属性，可使用 disabled、readOnly、name 等能力。",codeToggle:"查看原生属性代码"},en:{title:"Native attributes",description:"TimePicker extends native input attributes such as disabled, readOnly, and name.",codeToggle:"View native attributes code"},code:`import { Space, TimePicker } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <TimePicker name="meetingTime" defaultValue="09:30" readOnly />
    <TimePicker defaultValue="09:30" disabled />
  </Space>
);`,render:()=>i.jsxs(T,{direction:"vertical",align:"flex-start",children:[i.jsx(t,{name:"meetingTime",defaultValue:"09:30",readOnly:!0}),i.jsx(t,{defaultValue:"09:30",disabled:!0})]})},{id:"time-picker-controlled",zh:{title:"受控时间",description:"value 与 onChange 可用于接入外部状态。",codeToggle:"查看受控时间代码"},en:{title:"Controlled time",description:"Use value and onChange to connect TimePicker to external state.",codeToggle:"View controlled time code"},code:`import { Space, Text, TimePicker } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState('09:30');

  return (
    <Space direction="vertical" align="flex-start">
      <TimePicker value={value} onChange={(event) => setValue(event.currentTarget.value)} />
      <Text tone="secondary">Time: {value}</Text>
    </Space>
  );
};`,render:()=>{const k=()=>{const[o,b]=D.useState("09:30");return i.jsxs(T,{direction:"vertical",align:"flex-start",children:[i.jsx(t,{value:o,onChange:h=>b(h.currentTarget.value)}),i.jsxs(Q,{tone:"secondary",children:["Time: ",o]})]})};return i.jsx(k,{})}}]};export{ne as timePickerDoc};
