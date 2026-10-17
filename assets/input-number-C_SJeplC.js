import{R as C,u as D,r as M,j as e,c as R}from"./index-42cP9WwP.js";import{c as k}from"./ComponentPage-3kNlcmh3.js";import{S as E}from"./index-1s6UphMX.js";const n=C.forwardRef(({controlSize:v="medium",controls:f=!0,className:V,value:o,defaultValue:u,min:r,max:a,step:d=1,disabled:z,readOnly:c,precision:N,onChange:j,...h},S)=>{const l=D(z),[T,w]=M.useState(u==null||u===""?null:Number(u)),i=o===void 0?T:o===null||o===""?null:Number(o),p=d==="any"?1:Number(d),m=Number.isFinite(p)&&p>0?p:1,x=t=>{const[g,s="0"]=String(t).toLowerCase().split("e");return Math.max(0,(g.split(".")[1]?.length??0)-Number(s))},y=N??Math.min(15,Math.max(x(m),x(i??0))),b=(t,g=!1)=>{if(l||c||t!==null&&!Number.isFinite(t))return;const s=t===null?null:!g&&N===void 0?t:Number(t.toFixed(Math.max(0,Math.min(15,y)))),I=s===null?null:k(s,r===void 0?-1/0:Number(r),a===void 0?1/0:Number(a));w(I),j?.(I)};return e.jsxs("span",{className:R("cinna-input-number",`cinna-input-number--${v}`,l&&"cinna-input-number--disabled",V),children:[f&&e.jsx("button",{type:"button",disabled:l||c||r!==void 0&&i!==null&&i<=Number(r),"aria-label":"Decrease value",onClick:()=>b((i??0)-m,!0),children:"-"}),e.jsx("input",{ref:S,type:"number","aria-label":h["aria-label"]??"Number",value:i??"",min:r,max:a,step:d,disabled:l,readOnly:c,onChange:t=>b(t.currentTarget.value===""?null:Number(t.currentTarget.value)),...h}),f&&e.jsx("button",{type:"button",disabled:l||c||a!==void 0&&i!==null&&i>=Number(a),"aria-label":"Increase value",onClick:()=>b((i??0)+m,!0),children:"+"})]})});n.displayName="InputNumber";function F(){return e.jsx(n,{defaultValue:.1,min:0,max:1,step:.2,precision:2,"aria-label":"Cream ratio"})}const U=`import { InputNumber } from '@cinna-design/react';
export default function DecimalNumberDemo() {
  return (
    <InputNumber
      defaultValue={0.1}
      min={0}
      max={1}
      step={0.2}
      precision={2}
      aria-label="Cream ratio"
    />
  );
}
`,P={examples:[{id:"enhanced-input-number",zh:{title:"精确小数步进",description:"小数加减避免浮点误差，并遵守最小值、最大值与精度。",codeToggle:"查看完整示例代码"},en:{title:"Precise decimal stepping",description:"Step decimal values without floating-point drift and respect limits and precision.",codeToggle:"View complete example"},code:U,render:()=>e.jsx(F,{})},{id:"basic-input-number",zh:{title:"基本用法",description:"用于录入标准数字值，并提供默认增减控制。",codeToggle:"查看基本用法代码"},en:{title:"Basic input number",description:"Use it to enter numeric values with default step controls.",codeToggle:"View basic input number code"},code:`import { InputNumber } from '@cinna-design/react';

export default () => <InputNumber defaultValue={3} />;`,render:()=>e.jsx(n,{defaultValue:3})},{id:"input-number-sizes",zh:{title:"控件尺寸",description:"controlSize 提供 small、medium 与 large 三种高度。",codeToggle:"查看控件尺寸代码"},en:{title:"Control sizes",description:"controlSize supports small, medium, and large heights.",codeToggle:"View control sizes code"},code:`import { InputNumber, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <InputNumber controlSize="small" defaultValue={1} />
    <InputNumber controlSize="medium" defaultValue={2} />
    <InputNumber controlSize="large" defaultValue={3} />
  </Space>
);`,render:()=>e.jsxs(E,{direction:"vertical",align:"flex-start",children:[e.jsx(n,{controlSize:"small",defaultValue:1}),e.jsx(n,{controlSize:"medium",defaultValue:2}),e.jsx(n,{controlSize:"large",defaultValue:3})]})},{id:"input-number-range-step",zh:{title:"范围与步长",description:"min、max 与 step 用于约束数值范围和每次变化幅度。",codeToggle:"查看范围与步长代码"},en:{title:"Range and step",description:"Use min, max, and step to constrain the value and each change.",codeToggle:"View range and step code"},code:`import { InputNumber } from '@cinna-design/react';

export default () => (
  <InputNumber min={0} max={100} step={5} defaultValue={40} />
);`,render:()=>e.jsx(n,{min:0,max:100,step:5,defaultValue:40})},{id:"input-number-without-controls",zh:{title:"隐藏控制按钮",description:"controls={false} 会保留数字输入能力，但隐藏两侧增减按钮。",codeToggle:"查看隐藏控制按钮代码"},en:{title:"Without controls",description:"controls={false} keeps numeric input while hiding the step buttons.",codeToggle:"View controls code"},code:`import { InputNumber } from '@cinna-design/react';

export default () => <InputNumber controls={false} defaultValue={18} />;`,render:()=>e.jsx(n,{controls:!1,defaultValue:18})},{id:"input-number-disabled",zh:{title:"禁用状态",description:"disabled 会同时禁用输入框与增减按钮。",codeToggle:"查看禁用状态代码"},en:{title:"Disabled",description:"disabled prevents both typing and step button interaction.",codeToggle:"View disabled code"},code:`import { InputNumber } from '@cinna-design/react';

export default () => <InputNumber defaultValue={8} disabled />;`,render:()=>e.jsx(n,{defaultValue:8,disabled:!0})},{id:"input-number-native-props",zh:{title:"原生属性",description:"InputNumber 继承原生 input 属性，可使用 placeholder、readOnly、name 等能力。",codeToggle:"查看原生属性代码"},en:{title:"Native attributes",description:"InputNumber extends native input attributes such as placeholder, readOnly, and name.",codeToggle:"View native attributes code"},code:`import { InputNumber } from '@cinna-design/react';

export default () => (
  <InputNumber
    controls={false}
    name="capacity"
    placeholder="Capacity"
    readOnly
    value={24}
  />
);`,render:()=>e.jsx(n,{controls:!1,name:"capacity",placeholder:"Capacity",readOnly:!0,value:24})}]};export{P as inputNumberDoc};
