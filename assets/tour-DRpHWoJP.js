import{R as h,r as d,j as e,c as B,B as m}from"./index-42cP9WwP.js";import{u as E}from"./useControllable-B5J83UD_.js";import{u as V}from"./useIsomorphicLayoutEffect-BKHapNyU.js";import{a as _}from"./ComponentPage-3kNlcmh3.js";import{S as g}from"./index-1s6UphMX.js";import{T as O}from"./index-Csiu30sr.js";const l=h.forwardRef(({open:i,current:r,defaultCurrent:s=0,steps:c,onChange:f,onClose:u,onFinish:D,className:S,style:w,...T},y)=>{const[p,x]=E(i,!0),[M,j]=E(r,s,f),a=Math.max(0,Math.min(c.length-1,M)),n=c[a],[o,b]=d.useState(null),k=()=>{const t=n?.target;if(typeof t=="function")return t();if(typeof t=="string")try{return document.querySelector(t)}catch{return null}return t??null};if(V(()=>{if(!p||!n?.target){b(null);return}const t=()=>b(k()?.getBoundingClientRect()??null);return k()?.scrollIntoView?.({block:"center",behavior:"instant"}),t(),window.addEventListener("resize",t),window.addEventListener("scroll",t,!0),()=>{window.removeEventListener("resize",t),window.removeEventListener("scroll",t,!0)}},[p,a,n?.target]),d.useEffect(()=>{if(!p||n?.target)return;const t=P=>{P.key==="Escape"&&(x(!1),u?.())};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[p,n?.target,u,x]),!p||!n)return null;const C=()=>{x(!1),u?.()},L=()=>{D?.(),C()},R=e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"cinna-tour__close",type:"button","aria-label":"Close tour",onClick:C,children:"×"}),e.jsx("strong",{children:n.title}),n.description&&e.jsx("span",{children:n.description}),e.jsxs("small",{"aria-live":"polite",children:[a+1," / ",c.length]}),e.jsxs("span",{className:"cinna-tour__actions",children:[e.jsx("button",{type:"button",disabled:a<=0,onClick:()=>j(a-1),children:"Prev"}),a<c.length-1?e.jsx("button",{type:"button",onClick:()=>j(a+1),children:"Next"}):e.jsx("button",{type:"button",onClick:L,children:"Done"})]})]});if(!n.target)return e.jsx("div",{...T,ref:y,className:B("cinna-tour",S),style:w,children:R});const v=Math.min(320,window.innerWidth-32),z=o?Math.max(16,Math.min(window.innerWidth-v-16,o.left)):Math.max(16,(window.innerWidth-v)/2),F=o?o.bottom+16:window.innerHeight/2-100,N=o&&n.placement==="top"?Math.max(16,o.top-200):Math.max(16,Math.min(window.innerHeight-220,F));return e.jsxs(_,{...T,ref:y,open:p,onDismiss:C,maskClassName:"cinna-overlay cinna-tour-overlay",className:B("cinna-tour","cinna-tour--positioned",S),style:{position:"fixed",left:z,top:N,width:v,...w},"aria-label":typeof n.title=="string"?n.title:"Guided tour",children:[o&&e.jsx("span",{className:"cinna-tour__spotlight","aria-hidden":"true",style:{position:"fixed",left:o.left-6,top:o.top-6,width:o.width+12,height:o.height+12}}),R]})});l.displayName="Tour";function W(){const i=d.useRef(null),r=d.useRef(null),[s,c]=d.useState(!1),[f,u]=d.useState(0);return e.jsxs(e.Fragment,{children:[e.jsxs(g,{wrap:!0,children:[e.jsx(m,{onClick:()=>{u(0),c(!0)},children:"Start guide"}),e.jsx(m,{ref:i,variant:"cream",children:"Choose recipe"}),e.jsx(m,{ref:r,variant:"cream",children:"Save changes"})]}),e.jsx(l,{open:s,current:f,onChange:u,onClose:()=>c(!1),steps:[{title:"Choose a recipe",description:"Start with a recipe from your collection.",target:()=>i.current},{title:"Save your changes",description:"Keep the latest version of your recipe.",target:()=>r.current}]})]})}const H=`import { Button, Space, Tour } from '@cinna-design/react';
import { useRef, useState } from 'react';
export default function TargetTourDemo() {
  const recipe = useRef<HTMLButtonElement>(null),
    save = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false),
    [current, setCurrent] = useState(0);
  return (
    <>
      <Space wrap>
        <Button
          onClick={() => {
            setCurrent(0);
            setOpen(true);
          }}
        >
          Start guide
        </Button>
        <Button ref={recipe} variant="cream">
          Choose recipe
        </Button>
        <Button ref={save} variant="cream">
          Save changes
        </Button>
      </Space>
      <Tour
        open={open}
        current={current}
        onChange={setCurrent}
        onClose={() => setOpen(false)}
        steps={[
          {
            title: 'Choose a recipe',
            description: 'Start with a recipe from your collection.',
            target: () => recipe.current,
          },
          {
            title: 'Save your changes',
            description: 'Keep the latest version of your recipe.',
            target: () => save.current,
          },
        ]}
      />
    </>
  );
}
`,J={examples:[{id:"enhanced-tour",zh:{title:"定位到目标元素",description:"引导会滚动到目标、显示聚焦区域，并支持 Escape 关闭。",codeToggle:"查看完整示例代码"},en:{title:"Guide to target elements",description:"Scroll to a target, highlight it and dismiss the guide with Escape.",codeToggle:"View complete example"},code:H,render:()=>e.jsx(W,{})},{id:"basic-tour",zh:{title:"基础引导",description:"steps 提供每一步的 title 与 description，组件内置上一步、下一步和完成按钮。",codeToggle:"查看基础引导代码"},en:{title:"Basic tour",description:"steps provide title and description for each step, with built-in previous, next, and done buttons.",codeToggle:"View basic tour code"},code:`import { Tour } from '@cinna-design/react';

const steps = [
  { title: 'Choose template', description: 'Start from a saved recipe template.' },
  { title: 'Review details', description: 'Check timing, price, and inventory.' },
  { title: 'Publish', description: 'Share the update with customers.' },
];

export default () => <Tour steps={steps} />;`,render:()=>e.jsx(l,{steps:[{title:"Choose template",description:"Start from a saved recipe template."},{title:"Review details",description:"Check timing, price, and inventory."},{title:"Publish",description:"Share the update with customers."}]})},{id:"tour-open",zh:{title:"控制显隐",description:"open 可控制引导是否渲染。",codeToggle:"查看控制显隐代码"},en:{title:"Controlled visibility",description:"Use open to control whether the tour is rendered.",codeToggle:"View tour visibility code"},code:`import { Button, Space, Tour } from '@cinna-design/react';
import { useState } from 'react';

const steps = [{ title: 'Welcome', description: 'Open the guide when users need help.' }];

export default () => {
  const [open, setOpen] = useState(true);

  return (
    <Space direction="vertical" align="flex-start">
      <Button onClick={() => setOpen(true)}>Show tour</Button>
      <Tour open={open} steps={steps} onClose={() => setOpen(false)} />
    </Space>
  );
};`,render:()=>{const i=()=>{const[r,s]=h.useState(!0);return e.jsxs(g,{direction:"vertical",align:"flex-start",children:[e.jsx(m,{onClick:()=>s(!0),children:"Show tour"}),e.jsx(l,{open:r,steps:[{title:"Welcome",description:"Open the guide when users need help."}],onClose:()=>s(!1)})]})};return e.jsx(i,{})}},{id:"tour-controlled-current",zh:{title:"受控步骤",description:"current 与 onChange 可把当前步骤同步给外部状态。",codeToggle:"查看受控步骤代码"},en:{title:"Controlled step",description:"Use current and onChange to sync the active step with external state.",codeToggle:"View controlled tour code"},code:`import { Space, Text, Tour } from '@cinna-design/react';
import { useState } from 'react';

const steps = [
  { title: 'Draft', description: 'Prepare content.' },
  { title: 'Review', description: 'Confirm changes.' },
  { title: 'Release', description: 'Publish safely.' },
];

export default () => {
  const [current, setCurrent] = useState(0);

  return (
    <Space direction="vertical" align="flex-start">
      <Tour steps={steps} current={current} onChange={setCurrent} />
      <Text tone="secondary">Current step: {current + 1}</Text>
    </Space>
  );
};`,render:()=>{const i=()=>{const[r,s]=h.useState(0);return e.jsxs(g,{direction:"vertical",align:"flex-start",children:[e.jsx(l,{steps:[{title:"Draft",description:"Prepare content."},{title:"Review",description:"Confirm changes."},{title:"Release",description:"Publish safely."}],current:r,onChange:s}),e.jsxs(O,{tone:"secondary",children:["Current step: ",r+1]})]})};return e.jsx(i,{})}},{id:"tour-close",zh:{title:"关闭回调",description:"完成最后一步时会触发 onClose，可用于记录引导结束。",codeToggle:"查看关闭回调代码"},en:{title:"Close callback",description:"Finishing the last step triggers onClose, useful for recording completion.",codeToggle:"View tour close code"},code:`import { Space, Text, Tour } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [status, setStatus] = useState('In progress');

  return (
    <Space direction="vertical" align="flex-start">
      <Tour
        steps={[{ title: 'Finish guide', description: 'Click Done to close.' }]}
        onClose={() => setStatus('Finished')}
      />
      <Text tone="secondary">{status}</Text>
    </Space>
  );
};`,render:()=>{const i=()=>{const[r,s]=h.useState("In progress");return e.jsxs(g,{direction:"vertical",align:"flex-start",children:[e.jsx(l,{steps:[{title:"Finish guide",description:"Click Done to close."}],onClose:()=>s("Finished")}),e.jsx(O,{tone:"secondary",children:r})]})};return e.jsx(i,{})}},{id:"tour-title-only",zh:{title:"仅标题步骤",description:"description 可选，适合简短的步骤提示。",codeToggle:"查看仅标题步骤代码"},en:{title:"Title-only steps",description:"description is optional for short step prompts.",codeToggle:"View title-only tour code"},code:`import { Tour } from '@cinna-design/react';

export default () => (
  <Tour
    steps={[
      { title: 'Open menu' },
      { title: 'Choose item' },
      { title: 'Save changes' },
    ]}
  />
);`,render:()=>e.jsx(l,{steps:[{title:"Open menu"},{title:"Choose item"},{title:"Save changes"}]})}]};export{J as tourDoc};
