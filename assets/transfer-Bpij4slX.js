import{R as T,u as B,r as b,j as t,c as E}from"./index-BZKQtVdI.js";import{u as P}from"./useControllable-Dra3MelW.js";import{C as v}from"./index-D0ajprhb.js";import{S as G}from"./index-CGJnK8xI.js";import{T as L}from"./index-PYGa7LZ7.js";const d=T.forwardRef(({dataSource:f,targetKeys:u,defaultTargetKeys:y=[],onChange:x,titles:w=["Source","Target"],showSearch:j,disabled:C,selectedKeys:p,className:R,onSelectChange:_,...A},D)=>{const c=B(C),[h,K]=P(u,y,x),[N,I]=b.useState([]),l=p??N,[m,z]=b.useState(["",""]),k=a=>{p===void 0&&I(a),_?.(a.filter(r=>!h.includes(r)),a.filter(r=>h.includes(r)))},S=(a,r)=>{if(c)return;const i=a.filter(s=>!f.find(n=>n.key===s)?.disabled);K(r?[...new Set([...h,...i])]:h.filter(s=>!i.includes(s))),k(l.filter(s=>!i.includes(s)))};return t.jsx("div",{...A,ref:D,className:E("cinna-transfer",R),"aria-disabled":c||void 0,children:[!1,!0].map((a,r)=>{const i=f.filter(e=>h.includes(e.key)===a&&e.title.toLowerCase().includes(m[r].toLowerCase())),s=i.filter(e=>!e.disabled),n=s.filter(e=>l.includes(e.key));return t.jsxs("section",{className:"cinna-transfer__list","aria-label":a?"Target items":"Source items",children:[t.jsxs("strong",{children:[w[r]," ",t.jsx("small",{children:i.length})]}),t.jsx(v,{label:"Select all",disabled:c||!s.length,checked:s.length>0&&n.length===s.length,indeterminate:n.length>0&&n.length<s.length,onChange:e=>k(e.target.checked?[...new Set([...l,...s.map(o=>o.key)])]:l.filter(o=>!s.some(g=>g.key===o)))}),j&&t.jsx("input",{className:"cinna-native-input cinna-transfer__search","aria-label":a?"Search target":"Search source",placeholder:"Search items",disabled:c,value:m[r],onChange:e=>z(o=>o.map((g,V)=>V===r?e.target.value:g))}),!i.length&&t.jsx("span",{className:"cinna-transfer__empty",children:"Empty"}),i.map(e=>t.jsxs("div",{className:"cinna-transfer__item",children:[t.jsx(v,{label:e.title,disabled:c||e.disabled,checked:l.includes(e.key),onChange:o=>k(o.target.checked?[...l,e.key]:l.filter(g=>g!==e.key))}),t.jsx("button",{type:"button","aria-label":(a?"Remove ":"Add ")+e.title,disabled:c||e.disabled,onClick:()=>S([e.key],!a),children:a?"←":"→"})]},e.key)),t.jsx("button",{type:"button",className:"cinna-transfer__move",disabled:c||!n.length,onClick:()=>S(n.map(e=>e.key),!a),children:a?"Move selected to source":"Move selected to target"})]},r)})})});d.displayName="Transfer";const F={examples:[{id:"basic-transfer",zh:{title:"基本用法",description:"dataSource 提供源数据，点击条目可在左右两栏之间移动。",codeToggle:"查看基本用法代码"},en:{title:"Basic transfer",description:"Provide dataSource and click items to move them between the two lists.",codeToggle:"View basic transfer code"},code:`import { Transfer } from '@cinna-design/react';

const dataSource = [
  { key: 'docs', title: 'Docs' },
  { key: 'tokens', title: 'Tokens' },
  { key: 'icons', title: 'Icons' },
];

export default () => <Transfer dataSource={dataSource} />;`,render:()=>t.jsx(d,{dataSource:[{key:"docs",title:"Docs"},{key:"tokens",title:"Tokens"},{key:"icons",title:"Icons"}]})},{id:"transfer-target-keys",zh:{title:"默认目标项",description:"targetKeys 决定初始展示在右侧目标栏的条目。",codeToggle:"查看默认目标项代码"},en:{title:"Initial target items",description:"targetKeys decides which items are initially displayed in the target list.",codeToggle:"View target keys code"},code:`import { Transfer } from '@cinna-design/react';

const dataSource = [
  { key: 'overview', title: 'Overview' },
  { key: 'api', title: 'API' },
  { key: 'changelog', title: 'Changelog' },
];

export default () => (
  <Transfer dataSource={dataSource} targetKeys={['api']} />
);`,render:()=>t.jsx(d,{dataSource:[{key:"overview",title:"Overview"},{key:"api",title:"API"},{key:"changelog",title:"Changelog"}],targetKeys:["api"]})},{id:"transfer-search",zh:{title:"搜索筛选",description:"showSearch 会显示搜索框，并按条目 title 过滤左右两栏。",codeToggle:"查看搜索筛选代码"},en:{title:"Search filter",description:"showSearch displays a search field and filters both lists by item title.",codeToggle:"View search filter code"},code:`import { Transfer } from '@cinna-design/react';

const dataSource = [
  { key: 'research', title: 'Research notes' },
  { key: 'design', title: 'Design draft' },
  { key: 'release', title: 'Release checklist' },
  { key: 'archive', title: 'Archive plan' },
];

export default () => <Transfer showSearch dataSource={dataSource} />;`,render:()=>t.jsx(d,{showSearch:!0,dataSource:[{key:"research",title:"Research notes"},{key:"design",title:"Design draft"},{key:"release",title:"Release checklist"},{key:"archive",title:"Archive plan"}]})},{id:"transfer-titles",zh:{title:"自定义标题",description:"titles 用于定义左右两栏的标题，方便贴合具体业务语义。",codeToggle:"查看自定义标题代码"},en:{title:"Custom titles",description:"Use titles to name the two lists with product-specific language.",codeToggle:"View custom titles code"},code:`import { Transfer } from '@cinna-design/react';

const dataSource = [
  { key: 'draft', title: 'Draft' },
  { key: 'review', title: 'Review' },
  { key: 'ready', title: 'Ready' },
];

export default () => (
  <Transfer
    titles={['Available stages', 'Selected stages']}
    dataSource={dataSource}
    targetKeys={['review']}
  />
);`,render:()=>t.jsx(d,{titles:["Available stages","Selected stages"],dataSource:[{key:"draft",title:"Draft"},{key:"review",title:"Review"},{key:"ready",title:"Ready"}],targetKeys:["review"]})},{id:"transfer-on-change",zh:{title:"变化回调",description:"onChange 会在条目移动后返回新的目标 key 列表。",codeToggle:"查看变化回调代码"},en:{title:"Change callback",description:"onChange returns the next target key list after an item moves.",codeToggle:"View change callback code"},code:`import { Space, Text, Transfer } from '@cinna-design/react';
import { useState } from 'react';

const dataSource = [
  { key: 'alpha', title: 'Alpha' },
  { key: 'beta', title: 'Beta' },
  { key: 'gamma', title: 'Gamma' },
];

export default () => {
  const [selected, setSelected] = useState(['beta']);

  return (
    <Space direction="vertical" align="stretch">
      <Transfer dataSource={dataSource} targetKeys={selected} onChange={setSelected} />
      <Text tone="secondary">Selected keys: {selected.join(', ') || 'none'}</Text>
    </Space>
  );
};`,render:()=>{const f=()=>{const[u,y]=T.useState(["beta"]);return t.jsxs(G,{direction:"vertical",align:"stretch",children:[t.jsx(d,{dataSource:[{key:"alpha",title:"Alpha"},{key:"beta",title:"Beta"},{key:"gamma",title:"Gamma"}],targetKeys:u,onChange:y}),t.jsxs(L,{tone:"secondary",children:["Selected keys: ",u.join(", ")||"none"]})]})};return t.jsx(f,{})}}]};export{F as transferDoc};
