import{R as O,r as b,j as a,c as C,I as xe}from"./index-BKj7f8pq.js";import{u as we}from"./useIsomorphicLayoutEffect-DYwKHNn_.js";import{n as $}from"./ComponentPage-CxK9ZWuC.js";import{S as ae}from"./index-Dv7KxCjI.js";const r=O.forwardRef(({items:n,activeKey:o,defaultActiveKey:y,onChange:f,tabPosition:T="top",type:D="line",variant:ne,size:N="medium",scrollable:ie=!0,addable:P=!1,addIcon:le="+",closeIcon:se=a.jsx(xe,{name:"close-blue",size:10}),closable:re=!1,draggable:h=!1,onAdd:S,onClose:oe,onOrderChange:ce,tabFontSize:E,tabFontWeight:R,tabColor:V,activeTabColor:B,tabBackgroundColor:M,activeTabBackgroundColor:K,tabBorderColor:L,activeTabBorderColor:F,tabRadius:H,indicatorColor:W,listBackgroundColor:q,listBorderColor:U,panelColor:X,panelFontSize:Y,panelBackgroundColor:G,panelBorderColor:J,destroyInactiveTabPanel:de=!0,className:be,style:ye,...Q},ge)=>{const p=b.useId(),v=n.find(e=>!e.disabled)?.key,[ue,Z]=b.useState(y??v),[u,A]=b.useState(null),[fe,_]=b.useState(null),[he,pe]=b.useState(0),ee=b.useRef(null),x=b.useRef({}),[ve,j]=b.useState({}),k=o??ue??v,s=n.some(e=>e.key===k&&!e.disabled)?k:v;n.find(e=>e.key===s);const te=ne??(D==="card"?"bordered":"borderless"),w=T==="left"||T==="right",z=o!==void 0,ke=te==="borderless"?`cinna-tabs__panel--motion-${he%2}`:void 0,me={...E!==void 0?{"--cinna-tabs-tab-font-size":$(E)}:null,...R!==void 0?{"--cinna-tabs-tab-font-weight":R}:null,...V?{"--cinna-tabs-tab-color":V}:null,...B?{"--cinna-tabs-active-color":B}:null,...M?{"--cinna-tabs-tab-bg":M}:null,...K?{"--cinna-tabs-active-bg":K}:null,...L?{"--cinna-tabs-tab-border":L}:null,...F?{"--cinna-tabs-active-border":F}:null,...H!==void 0?{"--cinna-tabs-tab-radius":$(H)}:null,...W?{"--cinna-tabs-indicator-color":W}:null,...q?{"--cinna-tabs-list-bg":q}:null,...U?{"--cinna-tabs-list-border":U}:null,...X?{"--cinna-tabs-panel-color":X}:null,...Y!==void 0?{"--cinna-tabs-panel-font-size":$(Y)}:null,...G?{"--cinna-tabs-panel-bg":G}:null,...J?{"--cinna-tabs-panel-border":J}:null,...ye};b.useEffect(()=>{!z&&k&&!n.some(e=>e.key===k)&&Z(v)},[z,v,n,k]),we(()=>{if(!s){j({});return}const e=ee.current,t=x.current[s];if(!e||!t){j({});return}let i=0;const c=()=>{window.cancelAnimationFrame(i),i=window.requestAnimationFrame(()=>{const l=t.offsetLeft,m=t.offsetTop;j({"--cinna-tabs-active-opacity":"1","--cinna-tabs-active-x":`${l}px`,"--cinna-tabs-active-y":`${m}px`,"--cinna-tabs-active-width":`${t.offsetWidth}px`,"--cinna-tabs-active-height":`${t.offsetHeight}px`})})};c(),window.addEventListener("resize",c);const d=window.ResizeObserver,g=d?new d(c):null;return g?.observe(e),g?.observe(t),()=>{window.cancelAnimationFrame(i),window.removeEventListener("resize",c),g?.disconnect()}},[n,s,N,T]);const I=e=>{e.disabled||e.key!==s&&(e.key!==s&&pe(t=>t+1),z||Z(e.key),f?.(e.key))},Te=(e,t)=>{if(e===t)return;const i=n.findIndex(l=>l.key===e),c=n.findIndex(l=>l.key===t);if(i<0||c<0)return;const d=[...n],[g]=d.splice(i,1);d.splice(c,0,g),ce?.(d.map(l=>l.key),d,{fromKey:e,toKey:t})};return a.jsxs("div",{ref:ge,className:C("cinna-tabs",`cinna-tabs--${T}`,`cinna-tabs--${D}`,`cinna-tabs--${te}`,`cinna-tabs--${N}`,w&&"cinna-tabs--vertical",ie&&"cinna-tabs--scrollable",(P||S)&&"cinna-tabs--addable",h&&"cinna-tabs--draggable",be),style:me,...Q,children:[a.jsxs("div",{ref:ee,className:"cinna-tabs__list",children:[a.jsx("div",{className:"cinna-tabs__semantic-list",role:"tablist","aria-label":Q["aria-label"]??"Tabs","aria-orientation":w?"vertical":"horizontal","aria-owns":n.map(e=>p+"-tab-"+e.key).join(" ")}),a.jsx("span",{className:"cinna-tabs__active-pill","aria-hidden":"true",style:ve}),n.map(e=>a.jsxs("div",{ref:t=>{x.current[e.key]=t},draggable:h&&!e.disabled,className:C("cinna-tabs__tab",s===e.key&&"cinna-tabs__tab--active",e.disabled&&"cinna-tabs__tab--disabled",u===e.key&&"cinna-tabs__tab--dragging",fe===e.key&&u!==e.key&&"cinna-tabs__tab--drag-over",e.className),style:e.style,onClick:()=>{I(e)},onKeyDown:t=>{if(t.target.getAttribute("role")!=="tab")return;const i=n.filter(m=>!m.disabled),c=i.findIndex(m=>m.key===e.key),d=w?"ArrowDown":"ArrowRight",g=w?"ArrowUp":"ArrowLeft";let l=t.key==="Home"?0:t.key==="End"?i.length-1:t.key===d?(c+1)%i.length:t.key===g?(c-1+i.length)%i.length:-1;l>=0&&i[l]&&(t.preventDefault(),I(i[l]),x.current[i[l].key]?.querySelector('[role="tab"]')?.focus(),x.current[i[l].key]?.scrollIntoView?.({block:"nearest",inline:"nearest"})),(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),I(e))},onDragStart:t=>{!h||e.disabled||(A(e.key),t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",e.key))},onDragOver:t=>{!h||!u||u===e.key||(t.preventDefault(),t.dataTransfer.dropEffect="move",_(e.key))},onDrop:t=>{!h||!u||(t.preventDefault(),Te(u,e.key),A(null),_(null))},onDragEnd:()=>{A(null),_(null)},children:[a.jsxs("button",{type:"button",className:"cinna-tabs__target",role:"tab",id:p+"-tab-"+e.key,"aria-controls":p+"-panel-"+e.key,"aria-selected":s===e.key,disabled:e.disabled,"aria-disabled":e.disabled||void 0,tabIndex:e.disabled?-1:s===e.key?0:-1,children:[e.icon&&a.jsx("span",{className:"cinna-tabs__icon","aria-hidden":"true",children:e.icon}),a.jsx("span",{className:"cinna-tabs__label",children:e.label})]}),(re||e.closable)&&a.jsx("button",{type:"button",className:"cinna-tabs__close","aria-label":typeof e.label=="string"?`Close ${e.label}`:"Close tab",disabled:e.disabled,onClick:t=>{t.stopPropagation(),oe?.(e.key,e,t)},children:e.closeIcon??se})]},e.key)),(P||S)&&a.jsx("button",{type:"button",className:"cinna-tabs__add","aria-label":"Add tab",onClick:S,children:le})]}),n.map(e=>a.jsx("div",{id:`${p}-panel-${e.key}`,"aria-labelledby":`${p}-tab-${e.key}`,hidden:e.key!==s,className:C("cinna-tabs__panel",e.key===s&&ke),role:"tabpanel",tabIndex:0,children:(!de||e.key===s)&&e.children},e.key))]})});r.displayName="Tabs";const Se=Array.from({length:14},(n,o)=>({key:`tab-${o+1}`,label:`Tab ${o+1}`,children:`Panel ${o+1}`})),Ae=()=>{const[n,o]=O.useState([{key:"tab-1",label:"Tab 1",children:"Tab 1 content",closable:!0},{key:"tab-2",label:"Tab 2",children:"Tab 2 content",closable:!0},{key:"tab-3",label:"Tab 3",children:"Tab 3 content"}]);return a.jsx(r,{variant:"bordered",items:n,addable:!0,onAdd:()=>{const y=n.length+1;o([...n,{key:`tab-${y}`,label:`Tab ${y}`,children:`Tab ${y} content`,closable:!0}])},onClose:y=>o(n.filter(f=>f.key!==y))})},_e=()=>{const[n,o]=O.useState([{key:"overview",icon:"O",label:"Overview",children:"Overview content"},{key:"activity",icon:"A",label:"Activity",children:"Activity content"},{key:"settings",icon:"S",label:"Settings",children:"Settings content"},{key:"team",icon:"T",label:"Team",children:"Team content"}]);return a.jsx(r,{draggable:!0,variant:"bordered",items:n,onOrderChange:(y,f)=>o(f)})},$e={examples:[{id:"basic-tabs",zh:{title:"基本用法",description:"默认是无边框标签页，用于在同一层级的内容区域之间切换。",codeToggle:"查看基本用法代码"},en:{title:"Basic tabs",description:"The default borderless tabs switch between content areas on the same level.",codeToggle:"View basic tabs code"},code:`import { Tabs } from '@cinna-design/react';

export default () => (
  <Tabs
    items={[
      { key: 'overview', label: 'Overview', children: 'Overview content' },
      { key: 'activity', label: 'Activity', children: 'Activity content' },
      { key: 'settings', label: 'Settings', children: 'Settings content' },
    ]}
  />
);`,render:()=>a.jsx(r,{items:[{key:"overview",label:"Overview",children:"Overview content"},{key:"activity",label:"Activity",children:"Activity content"},{key:"settings",label:"Settings",children:"Settings content"}]})},{id:"bordered-tabs",zh:{title:"有边框模式",description:'variant="bordered" 会让标签呈现为卡片式入口，适合更明确的页面分组。',codeToggle:"查看有边框模式代码"},en:{title:"Bordered tabs",description:'variant="bordered" renders card-like tab entries for stronger grouping.',codeToggle:"View bordered tabs code"},code:`import { Tabs } from '@cinna-design/react';

export default () => (
  <Tabs
    variant="bordered"
    defaultActiveKey="tab-1"
    items={[
      { key: 'tab-1', label: 'Tab 1', children: 'Tab 1 content' },
      { key: 'tab-2', label: 'Tab 2', children: 'Tab 2 content' },
      { key: 'tab-3', label: 'Tab 3', children: 'Tab 3 content' },
    ]}
  />
);`,render:()=>a.jsx(r,{variant:"bordered",defaultActiveKey:"tab-1",items:[{key:"tab-1",label:"Tab 1",children:"Tab 1 content"},{key:"tab-2",label:"Tab 2",children:"Tab 2 content"},{key:"tab-3",label:"Tab 3",children:"Tab 3 content"}]})},{id:"direction-tabs",zh:{title:"横向和纵向",description:"tabPosition 支持 top、bottom、left、right，可按内容布局选择横向或纵向。",codeToggle:"查看横向和纵向代码"},en:{title:"Horizontal and vertical",description:"tabPosition supports top, bottom, left, and right for horizontal or vertical layouts.",codeToggle:"View direction code"},code:`import { Space, Tabs } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: '100%' }}>
    <Tabs tabPosition="top" items={[
      { key: 'north', label: 'North', children: 'Top tabs content' },
      { key: 'south', label: 'South', children: 'Top tabs content' },
    ]} />
    <Tabs tabPosition="left" variant="bordered" items={[
      { key: 'profile', label: 'Profile', children: 'Profile settings' },
      { key: 'billing', label: 'Billing', children: 'Billing settings' },
      { key: 'team', label: 'Team', children: 'Team settings' },
    ]} />
  </Space>
);`,render:()=>a.jsxs(ae,{direction:"vertical",align:"stretch",style:{width:"100%"},children:[a.jsx(r,{tabPosition:"top",items:[{key:"north",label:"North",children:"Top tabs content"},{key:"south",label:"South",children:"Top tabs content"}]}),a.jsx(r,{tabPosition:"left",variant:"bordered",items:[{key:"profile",label:"Profile",children:"Profile settings"},{key:"billing",label:"Billing",children:"Billing settings"},{key:"team",label:"Team",children:"Team settings"}]})]})},{id:"icon-size-tabs",zh:{title:"图标和尺寸",description:"每个标签可以设置 icon，size 支持 small、medium、large。",codeToggle:"查看图标和尺寸代码"},en:{title:"Icons and sizes",description:"Each tab can render an icon, and size supports small, medium, and large.",codeToggle:"View icons and sizes code"},code:`import { Space, Tabs } from '@cinna-design/react';

const items = [
  { key: 'overview', icon: 'O', label: 'Overview', children: 'Overview content' },
  { key: 'activity', icon: 'A', label: 'Activity', children: 'Activity content' },
  { key: 'settings', icon: 'S', label: 'Settings', children: 'Settings content' },
];

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: '100%' }}>
    <Tabs size="small" items={items} />
    <Tabs size="medium" items={items} />
    <Tabs size="large" items={items} />
  </Space>
);`,render:()=>{const n=[{key:"overview",icon:"O",label:"Overview",children:"Overview content"},{key:"activity",icon:"A",label:"Activity",children:"Activity content"},{key:"settings",icon:"S",label:"Settings",children:"Settings content"}];return a.jsxs(ae,{direction:"vertical",align:"stretch",style:{width:"100%"},children:[a.jsx(r,{size:"small",items:n}),a.jsx(r,{size:"medium",items:n}),a.jsx(r,{size:"large",items:n})]})}},{id:"scrollable-tabs",zh:{title:"超多标签",description:"标签数量很多时，标签栏会在对应方向上滚动，内容区保持稳定。",codeToggle:"查看超多标签代码"},en:{title:"Many tabs",description:"When there are many tabs, the tab bar scrolls while the panel stays stable.",codeToggle:"View many tabs code"},code:"import { Tabs } from '@cinna-design/react';\n\nconst items = Array.from({ length: 14 }, (_, index) => ({\n  key: `tab-${index + 1}`,\n  label: `Tab ${index + 1}`,\n  children: `Panel ${index + 1}`,\n}));\n\nexport default () => <Tabs items={items} />;",render:()=>a.jsx(r,{items:Se})},{id:"editable-tabs",zh:{title:"新增和关闭",description:"addable 展示新增入口，closable 或单项 closable 可以展示关闭按钮。",codeToggle:"查看新增和关闭代码"},en:{title:"Add and close",description:"addable renders an add entry, and closable can be enabled globally or per item.",codeToggle:"View add and close code"},code:`import { Tabs } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [items, setItems] = useState([
    { key: 'tab-1', label: 'Tab 1', children: 'Tab 1 content', closable: true },
    { key: 'tab-2', label: 'Tab 2', children: 'Tab 2 content', closable: true },
    { key: 'tab-3', label: 'Tab 3', children: 'Tab 3 content' },
  ]);

  return (
    <Tabs
      variant="bordered"
      items={items}
      addable
      onAdd={() => {
        const next = items.length + 1;
        setItems([...items, { key: \`tab-\${next}\`, label: \`Tab \${next}\`, children: \`Tab \${next} content\`, closable: true }]);
      }}
      onClose={(key) => setItems(items.filter((item) => item.key !== key))}
    />
  );
};`,render:()=>a.jsx(Ae,{})},{id:"draggable-tabs",zh:{title:"拖动排序",description:"draggable 开启后可以拖动标签改变顺序，onOrderChange 返回新的顺序。",codeToggle:"查看拖动排序代码"},en:{title:"Drag to reorder",description:"draggable lets users reorder tabs; onOrderChange returns the next order.",codeToggle:"View drag reorder code"},code:`import { Tabs } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [items, setItems] = useState([
    { key: 'overview', icon: 'O', label: 'Overview', children: 'Overview content' },
    { key: 'activity', icon: 'A', label: 'Activity', children: 'Activity content' },
    { key: 'settings', icon: 'S', label: 'Settings', children: 'Settings content' },
    { key: 'team', icon: 'T', label: 'Team', children: 'Team content' },
  ]);

  return (
    <Tabs
      draggable
      variant="bordered"
      items={items}
      onOrderChange={(_, nextItems) => setItems(nextItems)}
    />
  );
};`,render:()=>a.jsx(_e,{})},{id:"custom-tabs",zh:{title:"自定义字体和颜色",description:"可以分别调整标签、激活态、指示线和内容面板的字体、颜色、背景和边框。",codeToggle:"查看自定义样式代码"},en:{title:"Custom font and color",description:"Customize tab, active state, indicator, and panel font, color, background, and border.",codeToggle:"View custom style code"},code:`import { Tabs } from '@cinna-design/react';

export default () => (
  <Tabs
    variant="bordered"
    tabFontSize={15}
    tabFontWeight={900}
    tabColor="#6b584b"
    activeTabColor="#3d8eaa"
    tabBackgroundColor="#fff8ee"
    activeTabBackgroundColor="#ffffff"
    tabBorderColor="#ead8c0"
    activeTabBorderColor="#8bd4eb"
    tabRadius={12}
    panelColor="#513323"
    panelBackgroundColor="#fffcf6"
    panelBorderColor="#ead8c0"
    items={[
      { key: 'tone', label: 'Tone', children: 'Custom tone panel' },
      { key: 'motion', label: 'Motion', children: 'Custom motion panel' },
      { key: 'access', label: 'Access', children: 'Custom access panel' },
    ]}
  />
);`,render:()=>a.jsx(r,{variant:"bordered",tabFontSize:15,tabFontWeight:900,tabColor:"#6b584b",activeTabColor:"#3d8eaa",tabBackgroundColor:"#fff8ee",activeTabBackgroundColor:"#ffffff",tabBorderColor:"#ead8c0",activeTabBorderColor:"#8bd4eb",tabRadius:12,panelColor:"#513323",panelBackgroundColor:"#fffcf6",panelBorderColor:"#ead8c0",items:[{key:"tone",label:"Tone",children:"Custom tone panel"},{key:"motion",label:"Motion",children:"Custom motion panel"},{key:"access",label:"Access",children:"Custom access panel"}]})}]};export{$e as tabsDoc};
