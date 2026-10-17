import{R as w,u as P,r as o,j as t,c as b,I as D}from"./index-42cP9WwP.js";import{F as A}from"./FloatingPanel-CPp0TJ-w.js";import{u as L}from"./useControllable-B5J83UD_.js";import{u as M}from"./useOutside-Dd8PYi6n.js";import{T as O}from"./index-berJk4lm.js";import{S as q}from"./index-1s6UphMX.js";import{T as I}from"./index-Csiu30sr.js";import"./useIsomorphicLayoutEffect-BKHapNyU.js";import"./ComponentPage-3kNlcmh3.js";import"./index-U-tp-t51.js";const c=w.forwardRef(({treeData:l,placeholder:r="Select node",value:g,defaultValue:j="",onChange:V,allowClear:_,disabled:E,showSearch:N,defaultExpandedKeys:R=[],className:z,...m},d)=>{const i=P(E),[u,k]=L(g,j,V),[n,s]=o.useState(!1),[p,F]=o.useState(""),h=o.useRef(null),f=o.useRef(null),x=o.useId(),S=e=>e.flatMap(a=>[a,...S(a.children??[])]),v=S(l),K=v.find(e=>e.key===u)?.title??r,T=e=>e.flatMap(a=>{const y=T(a.children??[]);return String(typeof a.title=="string"?a.title:a.key).toLowerCase().includes(p.toLowerCase())||y.length?[{...a,children:y.length?y:a.children}]:[]}),C=p?T(l):l;return M(h,n,()=>s(!1)),t.jsxs("div",{...m,ref:e=>{h.current=e,typeof d=="function"?d(e):d&&(d.current=e)},className:b("cinna-select","cinna-tree-select",n&&!i&&"cinna-select--open",z),children:[t.jsxs("button",{ref:f,type:"button",className:"cinna-select__control","aria-labelledby":m["aria-labelledby"],disabled:i,"aria-label":m["aria-label"]??r,"aria-haspopup":"tree","aria-expanded":n&&!i,"aria-controls":n?x:void 0,onClick:()=>s(!n),onKeyDown:e=>{e.key==="ArrowDown"&&(e.preventDefault(),s(!0),requestAnimationFrame(()=>h.current?.querySelector("[role=treeitem]")?.focus()))},children:[t.jsx("span",{className:b(!u&&"cinna-select__placeholder"),children:K}),t.jsx(D,{name:"chevron-down",size:13})]}),_&&u&&t.jsx("button",{type:"button",className:"cinna-select__clear","aria-label":"Clear selection",disabled:i,onClick:()=>k(""),children:t.jsx(D,{name:"close-blue",size:12})}),n&&!i&&t.jsx(A,{anchor:h,matchWidth:!0,children:t.jsxs("div",{id:x,className:"cinna-select__popup",onKeyDown:e=>{e.key==="Escape"&&(e.stopPropagation(),s(!1),f.current?.focus())},children:[N&&t.jsx("input",{autoFocus:!0,"data-cinna-autofocus":!0,"aria-label":"Search nodes",className:"cinna-select__search",value:p,onChange:e=>F(e.target.value)}),C.length?t.jsx(O,{treeData:C,defaultExpandedKeys:R,expandedKeys:p?v.filter(e=>e.children?.length).map(e=>e.key):void 0,selectedKey:u,selectable:!0,onSelect:e=>{k(e),s(!1),f.current?.focus()}}):t.jsx("span",{role:"status",children:"No options"})]})})]})});c.displayName="TreeSelect";function B(){const[l,r]=o.useState("");return t.jsx(c,{value:l,onChange:r,showSearch:!0,allowClear:!0,placeholder:"Find a recipe",defaultExpandedKeys:["recipes"],treeData:[{key:"recipes",title:"Recipes",children:[{key:"cloud",title:t.jsx("strong",{children:"Cloud cake"})},{key:"cinnamon",title:"Cinnamon tart"},{key:"locked",title:"Archived recipe",disabled:!0}]}]})}const Q=`import { TreeSelect } from '@cinna-design/react';
import { useState } from 'react';
export default function SearchTreeDemo() {
  const [value, setValue] = useState('');
  return (
    <TreeSelect
      value={value}
      onChange={setValue}
      showSearch
      allowClear
      placeholder="Find a recipe"
      defaultExpandedKeys={['recipes']}
      treeData={[
        {
          key: 'recipes',
          title: 'Recipes',
          children: [
            { key: 'cloud', title: <strong>Cloud cake</strong> },
            { key: 'cinnamon', title: 'Cinnamon tart' },
            { key: 'locked', title: 'Archived recipe', disabled: true },
          ],
        },
      ]}
    />
  );
}
`,te={examples:[{id:"enhanced-tree-select",zh:{title:"搜索树节点",description:"保留层级和富文本标题，支持搜索、清除和键盘操作。",codeToggle:"查看完整示例代码"},en:{title:"Search tree nodes",description:"Preserve hierarchy and rich labels while searching, clearing and using the keyboard.",codeToggle:"View complete example"},code:Q,render:()=>t.jsx(B,{})},{id:"basic-tree-select",zh:{title:"基本用法",description:"treeData 提供树形数据，组件会展示可选择的节点。",codeToggle:"查看基本用法代码"},en:{title:"Basic tree select",description:"treeData provides hierarchical data and renders selectable nodes.",codeToggle:"View basic tree select code"},code:`import { TreeSelect } from '@cinna-design/react';

const treeData = [
  {
    key: 'docs',
    title: 'Docs',
    children: [
      { key: 'overview', title: 'Overview' },
      { key: 'changelog', title: 'Changelog' },
    ],
  },
  { key: 'tokens', title: 'Tokens' },
];

export default () => <TreeSelect treeData={treeData} placeholder="Choose node" />;`,render:()=>t.jsx(c,{treeData:[{key:"docs",title:"Docs",children:[{key:"overview",title:"Overview"},{key:"changelog",title:"Changelog"}]},{key:"tokens",title:"Tokens"}],placeholder:"Choose node"})},{id:"tree-select-default-value",zh:{title:"默认选中",description:"defaultValue 使用节点 key，展示内容会保留树层级缩进。",codeToggle:"查看默认选中代码"},en:{title:"Default value",description:"defaultValue uses the node key and keeps indentation in the displayed label.",codeToggle:"View default value code"},code:`import { TreeSelect } from '@cinna-design/react';

const treeData = [
  {
    key: 'surface',
    title: 'Surface',
    children: [
      { key: 'card', title: 'Card' },
      { key: 'modal', title: 'Modal' },
    ],
  },
];

export default () => <TreeSelect treeData={treeData} defaultValue="modal" />;`,render:()=>t.jsx(c,{treeData:[{key:"surface",title:"Surface",children:[{key:"card",title:"Card"},{key:"modal",title:"Modal"}]}],defaultValue:"modal"})},{id:"tree-select-clearable",zh:{title:"可清除",description:"allowClear 在已有选中值时提供清除入口。",codeToggle:"查看可清除代码"},en:{title:"Clearable",description:"allowClear provides a clear action when a value is selected.",codeToggle:"View clearable code"},code:`import { TreeSelect } from '@cinna-design/react';

const treeData = [
  { key: 'design', title: 'Design' },
  { key: 'engineering', title: 'Engineering' },
];

export default () => <TreeSelect allowClear treeData={treeData} defaultValue="design" />;`,render:()=>t.jsx(c,{allowClear:!0,treeData:[{key:"design",title:"Design"},{key:"engineering",title:"Engineering"}],defaultValue:"design"})},{id:"tree-select-controlled",zh:{title:"受控选择",description:"value 与 onChange 可用于接入外部状态。",codeToggle:"查看受控选择代码"},en:{title:"Controlled selection",description:"Use value and onChange to connect TreeSelect to external state.",codeToggle:"View controlled selection code"},code:`import { Space, Text, TreeSelect } from '@cinna-design/react';
import { useState } from 'react';

const treeData = [
  {
    key: 'library',
    title: 'Library',
    children: [
      { key: 'components', title: 'Components' },
      { key: 'patterns', title: 'Patterns' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState('components');

  return (
    <Space direction="vertical" align="flex-start">
      <TreeSelect treeData={treeData} value={value} onChange={setValue} />
      <Text tone="secondary">Selected: {value}</Text>
    </Space>
  );
};`,render:()=>{const l=()=>{const[r,g]=w.useState("components");return t.jsxs(q,{direction:"vertical",align:"flex-start",children:[t.jsx(c,{treeData:[{key:"library",title:"Library",children:[{key:"components",title:"Components"},{key:"patterns",title:"Patterns"}]}],value:r,onChange:g}),t.jsxs(I,{tone:"secondary",children:["Selected: ",r]})]})};return t.jsx(l,{})}}]};export{te as treeSelectDoc};
