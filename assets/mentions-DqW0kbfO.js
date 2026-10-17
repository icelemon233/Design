import{R,u as _,r as i,j as t,c as H}from"./index-_8eXcLz2.js";import{F as G}from"./FloatingPanel-CnLNE9BF.js";import{u as J}from"./useOutside-B5Pjeknc.js";import{T as Q}from"./index-Bqn4McjG.js";import{S as L}from"./index-n3tSMIzx.js";import{T as X}from"./index-BAwLJX5K.js";import"./useIsomorphicLayoutEffect-Clyg1nNa.js";import"./ComponentPage-BGTThW6u.js";const a=R.forwardRef(({options:S=[],prefix:s="@",onSelect:b,className:N,value:v,defaultValue:F="",onChange:M,onFocus:I,onBlur:U,onKeyDown:K,disabled:O,readOnly:g,...T},m)=>{const f=_(O),y=i.useRef(null),k=i.useRef(null),[W,D]=i.useState(String(F)),[r,l]=i.useState(!1),[j,h]=i.useState(0),[c,z]=i.useState(0),x=i.useId(),p=String(v??W),w=p.slice(0,j),d=w.lastIndexOf(s),q=d>=0&&!/\s/.test(w.slice(d+s.length))?w.slice(d+s.length):"",o=S.map(e=>typeof e=="string"?{label:e,value:e}:e).filter(e=>e.value.toLowerCase().includes(q.toLowerCase())),C=!f&&!g&&o.length>0;J(y,r,()=>l(!1));const V=e=>{const n=k.current;if(!n||f||g)return;const u=d>=0&&!/\s/.test(w.slice(d+s.length))?d:j,A=(u>0&&!/\s/.test(p[u-1])?" ":"")+s+e+" ",P=p.slice(0,u)+A+p.slice(j);v===void 0&&D(P),Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set?.call(n,P);const B={target:n,currentTarget:n,type:"change",nativeEvent:new Event("input",{bubbles:!0}),bubbles:!0,cancelable:!1,defaultPrevented:!1,eventPhase:3,isTrusted:!1,timeStamp:Date.now(),preventDefault(){},stopPropagation(){},isDefaultPrevented:()=>!1,isPropagationStopped:()=>!1,persist(){}};M?.(B),b?.(e),l(!1),requestAnimationFrame(()=>{n.focus();const E=u+A.length;n.setSelectionRange(E,E)})};return t.jsxs("div",{ref:y,className:H("cinna-mentions",r&&"cinna-mentions--open",N),children:[t.jsx(Q,{...T,ref:e=>{k.current=e,typeof m=="function"?m(e):m&&(m.current=e)},value:p,onClick:e=>{h(e.currentTarget.selectionStart),T.onClick?.(e)},onKeyUp:e=>{h(e.currentTarget.selectionStart),T.onKeyUp?.(e)},disabled:f,readOnly:g,"aria-controls":r?x:void 0,"aria-autocomplete":"list","aria-activedescendant":r&&o[c]?x+"-"+c:void 0,onFocus:e=>{h(e.currentTarget.selectionStart),C&&l(!0),I?.(e)},onBlur:e=>{l(!1),U?.(e)},onChange:e=>{v===void 0&&D(e.currentTarget.value),h(e.currentTarget.selectionStart),z(0),!f&&!g&&l(!0),M?.(e)},onKeyDown:e=>{K?.(e),!(e.defaultPrevented||e.nativeEvent.isComposing||!r)&&(e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),l(!1)),["ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),z(n=>(n+(e.key==="ArrowDown"?1:-1)+o.length)%o.length)),e.key==="Enter"&&o[c]&&!o[c].disabled&&(e.preventDefault(),V(o[c].value)))}}),r&&C&&t.jsx(G,{anchor:y,matchWidth:!0,children:t.jsx("div",{id:x,className:"cinna-mentions__options",role:"listbox","aria-label":"Mention suggestions",children:o.map((e,n)=>t.jsxs("button",{id:x+"-"+n,type:"button",tabIndex:-1,role:"option","aria-selected":n===c,disabled:e.disabled,onMouseDown:u=>u.preventDefault(),onClick:()=>V(e.value),children:[s,e.label]},e.value))})})]})});a.displayName="Mentions";const re={examples:[{id:"basic-mentions",zh:{title:"基本用法",description:"通过 options 提供可插入的提及对象。",codeToggle:"查看基本用法代码"},en:{title:"Basic mentions",description:"Use options to provide mention targets that can be inserted.",codeToggle:"View basic mentions code"},code:`import { Mentions } from '@cinna-design/react';

export default () => (
  <Mentions options={['icelemon', 'design', 'release']} placeholder="Write a note" />
);`,render:()=>t.jsx("div",{style:{width:"min(520px, 100%)"},children:t.jsx(a,{options:["icelemon","design","release"],placeholder:"Write a note"})})},{id:"mentions-prefix",zh:{title:"自定义前缀",description:"prefix 可把触发字符改成 # 等业务标记。",codeToggle:"查看自定义前缀代码"},en:{title:"Custom prefix",description:"prefix can change the mention mark to symbols such as #.",codeToggle:"View custom prefix code"},code:`import { Mentions } from '@cinna-design/react';

export default () => (
  <Mentions
    prefix="#"
    options={[
      { label: 'docs', value: 'docs' },
      { label: 'bug', value: 'bug' },
      { label: 'release', value: 'release' },
    ]}
    defaultValue="Tag this update"
  />
);`,render:()=>t.jsx("div",{style:{width:"min(520px, 100%)"},children:t.jsx(a,{prefix:"#",options:[{label:"docs",value:"docs"},{label:"bug",value:"bug"},{label:"release",value:"release"}],defaultValue:"Tag this update"})})},{id:"mentions-count-auto-size",zh:{title:"字数与自适应",description:"Mentions 继承 TextArea 的 showCount、maxLength 与 autoSize 能力。",codeToggle:"查看字数与自适应代码"},en:{title:"Count and auto size",description:"Mentions inherits showCount, maxLength, and autoSize from TextArea.",codeToggle:"View count and auto size code"},code:`import { Mentions } from '@cinna-design/react';

export default () => (
  <Mentions
    autoSize
    showCount
    maxLength={120}
    options={['docs', 'tokens']}
    defaultValue="Thanks @docs for the update."
  />
);`,render:()=>t.jsx("div",{style:{width:"min(520px, 100%)"},children:t.jsx(a,{autoSize:!0,showCount:!0,maxLength:120,options:["docs","tokens"],defaultValue:"Thanks @docs for the update."})})},{id:"mentions-status",zh:{title:"校验状态",description:"status 可展示警告或错误状态。",codeToggle:"查看校验状态代码"},en:{title:"Validation status",description:"status can show warning or error feedback.",codeToggle:"View validation status code"},code:`import { Mentions, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: 'min(520px, 100%)' }}>
    <Mentions status="warning" options={['review']} defaultValue="Need @review" />
    <Mentions status="error" options={['owner']} defaultValue="Missing @owner" />
  </Space>
);`,render:()=>t.jsxs(L,{direction:"vertical",align:"stretch",style:{width:"min(520px, 100%)"},children:[t.jsx(a,{status:"warning",options:["review"],defaultValue:"Need @review"}),t.jsx(a,{status:"error",options:["owner"],defaultValue:"Missing @owner"})]})},{id:"mentions-select",zh:{title:"选择回调",description:"onSelect 会在点击候选项时返回选中的 value。",codeToggle:"查看选择回调代码"},en:{title:"Select callback",description:"onSelect returns the selected value when an option is clicked.",codeToggle:"View select callback code"},code:`import { Mentions, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [selected, setSelected] = useState('none');

  return (
    <Space direction="vertical" align="flex-start" style={{ width: 'min(520px, 100%)' }}>
      <Mentions options={['design', 'review', 'ship']} onSelect={setSelected} />
      <Text tone="secondary">Selected: {selected}</Text>
    </Space>
  );
};`,render:()=>{const S=()=>{const[s,b]=R.useState("none");return t.jsxs(L,{direction:"vertical",align:"flex-start",style:{width:"min(520px, 100%)"},children:[t.jsx(a,{options:["design","review","ship"],onSelect:b}),t.jsxs(X,{tone:"secondary",children:["Selected: ",s]})]})};return t.jsx(S,{})}}]};export{re as mentionsDoc};
