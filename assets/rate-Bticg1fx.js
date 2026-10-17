import{R as j,u as A,r as T,j as e,c as V}from"./index-42cP9WwP.js";import{u as H}from"./useControllable-B5J83UD_.js";import{S as b}from"./index-1s6UphMX.js";import{T as E}from"./index-Csiu30sr.js";const r=j.forwardRef(({count:o=5,value:c,defaultValue:d=0,onChange:C,allowClear:y=!0,allowHalf:h,tooltips:m,character:u="★",disabled:S,className:k,...f},D)=>{const n=A(S),[l,x]=H(c,d,C),[M,R]=T.useState(null),s=Math.max(0,Math.floor(o)),_=M??l,z=a=>{n||x(y&&l===a?0:a)},w=(a,t)=>h&&a.clientX-a.currentTarget.getBoundingClientRect().left<a.currentTarget.offsetWidth/2?t-.5:t;return e.jsx("div",{...f,ref:D,className:V("cinna-rate",n&&"cinna-rate--disabled",k),role:"slider","aria-label":f["aria-label"]??"Rating","aria-valuemin":0,"aria-valuemax":s,"aria-valuenow":l,"aria-disabled":n||void 0,"aria-valuetext":m?.[Math.ceil(l)-1]??l+" / "+s,tabIndex:n?-1:0,onMouseDown:a=>{n||a.currentTarget.focus()},onMouseLeave:()=>R(null),onKeyDown:a=>{if(f.onKeyDown?.(a),n||a.defaultPrevented)return;const t=h?.5:1,i=a.key==="Home"?0:a.key==="End"?s:["ArrowRight","ArrowUp"].includes(a.key)?Math.min(s,l+t):["ArrowLeft","ArrowDown"].includes(a.key)?Math.max(0,l-t):void 0;i!==void 0&&(a.preventDefault(),x(i))},children:Array.from({length:s},(a,t)=>{const i=t+1,g=Math.max(0,Math.min(1,_-t)),v=typeof u=="function"?u(i):u;return e.jsxs("span",{"aria-hidden":"true",title:m?.[t],className:V("cinna-rate__star",g===1&&"cinna-rate__star--active",g===.5&&"cinna-rate__star--half"),onMouseMove:p=>!n&&R(w(p,i)),onClick:p=>z(w(p,i)),children:[e.jsx("span",{children:v}),g===.5&&e.jsx("span",{className:"cinna-rate__half","aria-hidden":"true",children:v})]},i)})})});r.displayName="Rate";function N(){const[o,c]=T.useState(3.5);return e.jsxs(e.Fragment,{children:[e.jsx(r,{allowHalf:!0,value:o,onChange:c,"aria-label":"Rate the recipe"}),e.jsxs("p",{role:"status",children:["Rating: ",o," / 5. Use arrow keys for half-star steps."]})]})}const U=`import { Rate } from '@cinna-design/react';
import { useState } from 'react';
export default function HalfRatingDemo() {
  const [value, setValue] = useState(3.5);
  return (
    <>
      <Rate allowHalf value={value} onChange={setValue} aria-label="Rate the recipe" />
      <p role="status">Rating: {value} / 5. Use arrow keys for half-star steps.</p>
    </>
  );
}
`,F={examples:[{id:"enhanced-rate",zh:{title:"半星与键盘",description:"使用鼠标选择半星，或通过方向键以半星步进。",codeToggle:"查看完整示例代码"},en:{title:"Half stars and keyboard",description:"Choose half stars with the pointer or arrow keys.",codeToggle:"View complete example"},code:U,render:()=>e.jsx(N,{})},{id:"basic-rate",zh:{title:"基本用法",description:"用于对对象进行快速评分。",codeToggle:"查看基本用法代码"},en:{title:"Basic rate",description:"Use it for quick rating interactions.",codeToggle:"View basic rate code"},code:`import { Rate } from '@cinna-design/react';

export default () => <Rate defaultValue={3} />;`,render:()=>e.jsx(r,{defaultValue:3})},{id:"rate-count",zh:{title:"评分数量",description:"count 可调整评分项总数。",codeToggle:"查看评分数量代码"},en:{title:"Rating count",description:"count adjusts the total number of rating items.",codeToggle:"View rating count code"},code:`import { Rate } from '@cinna-design/react';

export default () => <Rate count={7} defaultValue={4} />;`,render:()=>e.jsx(r,{count:7,defaultValue:4})},{id:"rate-clear",zh:{title:"允许清除",description:"allowClear 允许再次点击当前分值后清空选择。",codeToggle:"查看允许清除代码"},en:{title:"Allow clear",description:"allowClear lets users click the current value again to clear it.",codeToggle:"View allow clear code"},code:`import { Rate } from '@cinna-design/react';

export default () => <Rate allowClear defaultValue={3} />;`,render:()=>e.jsx(r,{allowClear:!0,defaultValue:3})},{id:"rate-character",zh:{title:"自定义字符",description:"character 可替换默认评分字符，也可以按序号返回不同内容。",codeToggle:"查看自定义字符代码"},en:{title:"Custom character",description:"character replaces the default rating mark and can vary by index.",codeToggle:"View custom character code"},code:`import { Rate, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Rate character="+" defaultValue={3} />
    <Rate character={(index) => index} defaultValue={4} />
  </Space>
);`,render:()=>e.jsxs(b,{direction:"vertical",align:"flex-start",children:[e.jsx(r,{character:"+",defaultValue:3}),e.jsx(r,{character:o=>o,defaultValue:4})]})},{id:"rate-disabled-controlled",zh:{title:"禁用与受控",description:"disabled 阻止交互，value 与 onChange 可接入外部状态。",codeToggle:"查看禁用与受控代码"},en:{title:"Disabled and controlled",description:"disabled prevents interaction, while value and onChange connect external state.",codeToggle:"View disabled and controlled code"},code:`import { Rate, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState(2);

  return (
    <Space direction="vertical" align="flex-start">
      <Rate defaultValue={4} disabled />
      <Rate value={value} onChange={setValue} />
      <Text tone="secondary">Rating: {value}</Text>
    </Space>
  );
};`,render:()=>{const o=()=>{const[c,d]=j.useState(2);return e.jsxs(b,{direction:"vertical",align:"flex-start",children:[e.jsx(r,{defaultValue:4,disabled:!0}),e.jsx(r,{value:c,onChange:d}),e.jsxs(E,{tone:"secondary",children:["Rating: ",c]})]})};return e.jsx(o,{})}}]};export{F as rateDoc};
