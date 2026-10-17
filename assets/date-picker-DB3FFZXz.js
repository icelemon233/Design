import{R as N,u as O,r as c,j as e,c as U,I as B}from"./index-BKj7f8pq.js";import{F as M}from"./FloatingPanel-DY7kXLHU.js";import{u as Y}from"./useOutside-Cnu6F3q8.js";import{i as q}from"./inputChange-BAY29qBj.js";import{C as A}from"./index-BBtC7fVR.js";import{S as g}from"./index-Dv7KxCjI.js";import{T as G}from"./index-ryGFQma_.js";import"./useIsomorphicLayoutEffect-DYwKHNn_.js";import"./ComponentPage-CxK9ZWuC.js";const a=N.forwardRef(({controlSize:n="medium",status:l,allowClear:f,disabledDate:x,className:R,value:D,defaultValue:_,onChange:j,disabled:E,readOnly:i,min:k,max:v,...P},o)=>{const r=O(E),[F,C]=c.useState(String(_??"")),[s,h]=c.useState(!1),[I,T]=c.useState(new Date),d=String(D??F),S=c.useRef(null),u=c.useRef(null);Y(S,s,()=>h(!1));const b=t=>{const[w,z,y]=t.split("-").map(Number);return w&&z&&y?new Date(w,z-1,y):new Date},p=t=>t.getFullYear()+"-"+String(t.getMonth()+1).padStart(2,"0")+"-"+String(t.getDate()).padStart(2,"0"),m=t=>!!x?.(t)||k!==void 0&&p(t)<String(k)||v!==void 0&&p(t)>String(v),V=t=>{r||i||t&&m(b(t))||(D===void 0&&C(t),u.current&&j?.(q(u.current,t)),h(!1),u.current?.focus())};return e.jsxs("span",{ref:S,className:"cinna-picker",children:[e.jsx("input",{...P,ref:t=>{u.current=t,typeof o=="function"?o(t):o&&(o.current=t)},type:"date",min:k,max:v,disabled:r,readOnly:i,value:d,"aria-label":P["aria-label"]??"Choose date",className:U("cinna-native-input","cinna-native-input--"+n,l&&"cinna-native-input--"+l,R),onChange:t=>{t.target.value&&m(b(t.target.value))||(D===void 0&&C(t.target.value),j?.(t))}}),e.jsx("button",{type:"button",className:"cinna-picker__trigger","aria-label":"Open calendar","aria-haspopup":"dialog","aria-expanded":s&&!r&&!i,disabled:r||i,onClick:()=>{T(d?b(d):new Date),h(!s)},children:e.jsx(B,{name:"chevron-down",size:12})}),f&&d&&e.jsx("button",{className:"cinna-picker__clear",type:"button","aria-label":"Clear date",disabled:r||i,onClick:()=>V(""),children:"×"}),s&&!r&&!i&&e.jsx(M,{anchor:S,children:e.jsxs("div",{className:"cinna-picker__popup",role:"dialog","aria-label":"Choose date",children:[e.jsx(A,{value:I,disabledDate:m,onChange:T,onSelect:t=>V(p(t))}),e.jsx("button",{type:"button",disabled:m(new Date),onClick:()=>V(p(new Date)),children:"Today"})]})})]})});a.displayName="DatePicker";function H(){return e.jsx(a,{defaultValue:"2026-10-17",min:"2026-10-01",max:"2026-12-31",allowClear:!0,"aria-label":"Delivery date",disabledDate:n=>n.getDay()===0})}const J=`import { DatePicker } from '@cinna-design/react';
export default function CalendarPanelDemo() {
  return (
    <DatePicker
      defaultValue="2026-10-17"
      min="2026-10-01"
      max="2026-12-31"
      allowClear
      aria-label="Delivery date"
      disabledDate={(date) => date.getDay() === 0}
    />
  );
}
`,ae={examples:[{id:"enhanced-date-picker",zh:{title:"日历面板与日期限制",description:"原生输入与云朵日历面板共享同一值；示例禁止星期日。",codeToggle:"查看完整示例代码"},en:{title:"Calendar panel and date limits",description:"The native input and themed calendar share a value; Sundays are disabled here.",codeToggle:"View complete example"},code:J,render:()=>e.jsx(H,{})},{id:"basic-date-picker",zh:{title:"基本用法",description:"用于录入单个日期。",codeToggle:"查看基本用法代码"},en:{title:"Basic date picker",description:"Use it to enter a single date.",codeToggle:"View basic date picker code"},code:`import { DatePicker } from '@cinna-design/react';

export default () => <DatePicker defaultValue="2026-06-17" />;`,render:()=>e.jsx(a,{defaultValue:"2026-06-17"})},{id:"date-picker-sizes",zh:{title:"控件尺寸",description:"controlSize 提供 small、medium 与 large 三种尺寸。",codeToggle:"查看控件尺寸代码"},en:{title:"Control sizes",description:"controlSize supports small, medium, and large controls.",codeToggle:"View control sizes code"},code:`import { DatePicker, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <DatePicker controlSize="small" defaultValue="2026-01-01" />
    <DatePicker controlSize="medium" defaultValue="2026-06-17" />
    <DatePicker controlSize="large" defaultValue="2026-12-31" />
  </Space>
);`,render:()=>e.jsxs(g,{direction:"vertical",align:"flex-start",children:[e.jsx(a,{controlSize:"small",defaultValue:"2026-01-01"}),e.jsx(a,{controlSize:"medium",defaultValue:"2026-06-17"}),e.jsx(a,{controlSize:"large",defaultValue:"2026-12-31"})]})},{id:"date-picker-range-limits",zh:{title:"日期限制",description:"min 与 max 来自原生日期输入，可限制可选日期范围。",codeToggle:"查看日期限制代码"},en:{title:"Date limits",description:"min and max come from native date input and constrain selectable dates.",codeToggle:"View date limits code"},code:`import { DatePicker } from '@cinna-design/react';

export default () => (
  <DatePicker min="2026-01-01" max="2026-12-31" defaultValue="2026-06-17" />
);`,render:()=>e.jsx(a,{min:"2026-01-01",max:"2026-12-31",defaultValue:"2026-06-17"})},{id:"date-picker-status",zh:{title:"校验状态",description:"status 可表达成功、警告或错误状态。",codeToggle:"查看校验状态代码"},en:{title:"Validation status",description:"status can express success, warning, or error feedback.",codeToggle:"View validation status code"},code:`import { DatePicker, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <DatePicker status="success" defaultValue="2026-06-17" />
    <DatePicker status="warning" defaultValue="2026-06-17" />
    <DatePicker status="error" defaultValue="2026-06-17" />
  </Space>
);`,render:()=>e.jsxs(g,{direction:"vertical",align:"flex-start",children:[e.jsx(a,{status:"success",defaultValue:"2026-06-17"}),e.jsx(a,{status:"warning",defaultValue:"2026-06-17"}),e.jsx(a,{status:"error",defaultValue:"2026-06-17"})]})},{id:"date-picker-native-props",zh:{title:"原生属性",description:"DatePicker 继承原生 input 属性，可使用 disabled、readOnly、name 等能力。",codeToggle:"查看原生属性代码"},en:{title:"Native attributes",description:"DatePicker extends native input attributes such as disabled, readOnly, and name.",codeToggle:"View native attributes code"},code:`import { DatePicker, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <DatePicker name="releaseDate" defaultValue="2026-06-17" readOnly />
    <DatePicker defaultValue="2026-06-17" disabled />
  </Space>
);`,render:()=>e.jsxs(g,{direction:"vertical",align:"flex-start",children:[e.jsx(a,{name:"releaseDate",defaultValue:"2026-06-17",readOnly:!0}),e.jsx(a,{defaultValue:"2026-06-17",disabled:!0})]})},{id:"date-picker-controlled",zh:{title:"受控日期",description:"value 与 onChange 可用于接入外部状态。",codeToggle:"查看受控日期代码"},en:{title:"Controlled date",description:"Use value and onChange to connect DatePicker to external state.",codeToggle:"View controlled date code"},code:`import { DatePicker, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState('2026-06-17');

  return (
    <Space direction="vertical" align="flex-start">
      <DatePicker value={value} onChange={(event) => setValue(event.currentTarget.value)} />
      <Text tone="secondary">Date: {value}</Text>
    </Space>
  );
};`,render:()=>{const n=()=>{const[l,f]=N.useState("2026-06-17");return e.jsxs(g,{direction:"vertical",align:"flex-start",children:[e.jsx(a,{value:l,onChange:x=>f(x.currentTarget.value)}),e.jsxs(G,{tone:"secondary",children:["Date: ",l]})]})};return e.jsx(n,{})}}]};export{ae as datePickerDoc};
