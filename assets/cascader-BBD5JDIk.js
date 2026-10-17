import{r as h,R as X,u as Wn,j as a,c as S,I as G}from"./index-Ce0SFtqJ.js";import{F as Mn}from"./FloatingPanel-D5atM333.js";import{u as $n}from"./ComponentPage-BW_SxuBs.js";import{u as Kn}from"./useIsomorphicLayoutEffect-CL4Yw0F3.js";import{S as Xe}from"./index-CJ3PbIrN.js";import{T as Un}from"./index-DMVNuElq.js";const Te=n=>typeof n=="string"||typeof n=="number"?String(n):Array.isArray(n)?n.map(Te).join(""):X.isValidElement(n)?Te(n.props.children):"";function Jn(n,s,c){const[i,x]=h.useState(1),p=s.map(Te).join("\0");return Kn(()=>{const m=n.current;if(!c||!m)return;let d=!0;const _=()=>{if(!d)return;const L=m.getBoundingClientRect().width;if(!L)return;const A=document.createElement("span");A.style.cssText="position:fixed;visibility:hidden;white-space:nowrap;pointer-events:none;",A.style.font=getComputedStyle(m).font,document.body.appendChild(A);let ae=70,Z=0;for(const re of p.split("\0")){A.textContent=re;const W=A.getBoundingClientRect().width+40;if(Z&&ae+W>L)break;ae+=W,Z++}A.remove(),x(Math.max(1,Z))};_();const P=typeof ResizeObserver>"u"?null:new ResizeObserver(_);return P?.observe(m),window.addEventListener("resize",_),document.fonts?.ready.then(_),()=>{d=!1,P?.disconnect(),window.removeEventListener("resize",_)}},[n,p,c]),i}const Qn={label:"label",value:"value",children:"children",disabled:"disabled",isLeaf:"isLeaf",loading:"loading"},Gn=n=>({...Qn,...n}),te=(n,s)=>n[s.value],tn=(n,s)=>n[s.label]??te(n,s),Y=(n,s)=>n[s.children],J=(n,s)=>!!n[s.disabled],Ye=(n,s)=>!!n[s.loading],Q=(n,s)=>Y(n,s)?.length?!1:n[s.isLeaf]!==!1,Ze=n=>Array.isArray(n)&&!Array.isArray(n[0]),en=n=>Array.isArray(n)&&Array.isArray(n[0]),ne=n=>n.map(s=>String(s)).join("__cinna__"),w=(n,s)=>n.length===s.length&&n.every((c,i)=>c===s[i]),ue=(n,s)=>n.map(c=>tn(c,s)),z=(n,s)=>n.map(c=>te(c,s)).filter(c=>c!==void 0);function he(n,s,c,i=[]){if(s==null)return[];const x=Array.isArray(s)?s:void 0;for(const p of n){const m=te(p,c),d=[...i,p],_=z(d,c);if(x?w(_,x):m===s)return d;const P=he(Y(p,c)??[],s,c,d);if(P.length)return P}return[]}function fe(n,s,c=!1,i=[]){return n.flatMap(x=>{const p=[...i,x],m=Y(x,s)??[],d=m.length?fe(m,s,c,p):[];return c||!m.length?[p,...d]:d})}function Oe(n,s,c,i){if(n==null||Array.isArray(n)&&n.length===0)return[];if(i){if(en(n))return n.filter(p=>p.length>0);if(Ze(n))return[n];const x=he(s,n,c);return x.length?[z(x,c)]:[]}return en(n)?n[0]??[]:Ze(n)?n:z(he(s,n,c),c)}function pe(n,s,c){return he(s,n,c)}function Xn(n,s,c){const i=[n];let x=n;return s.forEach(p=>{const m=x.find(_=>te(_,c)===p),d=m?Y(m,c):void 0;d?.length&&(i.push(d),x=d)}),i}function an(n,s,c,i,x=[]){let p=!1;const m=n.map(d=>{const _=te(d,c),P=_===void 0?x:[...x,_];if(w(P,s))return p=!0,i(d);const L=Y(d,c);if(!L?.length)return d;const A=an(L,s,c,i,P);return A===L?d:(p=!0,{...d,[c.children]:A})});return p?m:n}const Yn=n=>!!(n&&typeof n.then=="function");function Zn(n){return n?n===!0?{}:n:null}const et=[],rn=X.forwardRef(({options:n=et,value:s,defaultValue:c,multiple:i=!1,onChange:x,placeholder:p="Select path",separator:m=" / ",allowClear:d=!0,changeOnSelect:_=!1,disabled:P=!1,displayRender:L,tagRender:A,expandTrigger:ae="click",expandIcon:Z=a.jsx(G,{name:"chevron-right",size:12}),fieldNames:re,loadData:W,onLoadError:sn,loadingIcon:on=a.jsx("span",{className:"cinna-cascader__loading",role:"status","aria-label":"Loading"}),maxTagCount:ee,maxTagPlaceholder:ge,maxTagTextLength:me,notFoundContent:Le="Not Found",open:Re,defaultOpen:cn=!1,onOpenChange:ke,placement:be="bottomLeft",prefix:Ee,popupRender:Pe,showCheckedStrategy:De="SHOW_PARENT",showSearch:ln,suffixIcon:dn=a.jsx(G,{name:"chevron-down",size:13}),removeIcon:un=a.jsx(G,{name:"close-blue",size:10}),controlSize:pn,size:fn,status:Ie,variant:hn="outlined",optionRender:gn,classNames:j,styles:y,className:mn,style:bn,...ze},se)=>{const V=Wn(P),[Ne,xe]=h.useState(""),oe=h.useRef(0),qe=h.useRef(n),ye=h.useRef(!0),M=h.useRef(new Map),xn=h.useRef(0);qe.current!==n&&(qe.current=n,oe.current++,M.current.clear()),h.useEffect(()=>(ye.current=!0,()=>{ye.current=!1,oe.current++,M.current.clear()}),[]);const o=h.useMemo(()=>Gn(re),[re]),yn=pn??fn??"medium",D=h.useRef(null),[vn,He]=h.useState(n),[Cn,_n]=h.useState(cn),ve=Re!==void 0,N=!V&&(ve?!!Re:Cn),ce=s!==void 0,[jn,Sn]=h.useState(()=>Oe(c,n,o,i)),R=vn,Be=Oe(ce?s:jn,R,o,i),H=i?Be:[],$=i?[]:Be,wn=i?H[0]??[]:$,[Ce,ie]=h.useState(wn),v=Zn(ln),_e=v?.searchValue!==void 0,[Vn,Fe]=h.useState(""),B=_e?String(v?.searchValue??""):Vn,K=pe($,R,o),We=h.useMemo(()=>fe(R,o,_||i),[_,o,i,R]),An=Xn(R,Ce,o),Me=h.useId();h.useEffect(()=>{He(n),xe("")},[n]);const On=e=>{D.current=e,typeof se=="function"?se(e):se&&(se.current=e)},U=e=>{const t=V?!1:e;ve||_n(t),N!==t&&ke?.(t),!t&&!_e&&Fe("")};$n(N,D,()=>{U(!1),D.current?.querySelector("[role=combobox]")?.focus()});const Tn=JSON.stringify(s);h.useEffect(()=>{ce&&ie(i?H[0]??[]:$)},[ce,Tn,i]);const je=(e,t)=>{V||(ce||Sn(e),x?.(e,t))},Se=e=>{_e||Fe(e),v?.onSearch?.(e)},Ln=()=>{if(!K.length)return null;const e=ue(K,o);return L?L(e,K):e.map((t,r)=>a.jsxs(X.Fragment,{children:[r>0?m:null,t]},r))},Rn=()=>H.map(e=>{const t=pe(e,R,o),r=t[t.length-1]??{},u=ue(t,o);let g=L?L(u,t):u.map(k=>String(k)).join(String(m));return me&&typeof g=="string"&&g.length>me&&(g=`${g.slice(0,me)}...`),{label:g,value:e,option:r,path:t,onClose:()=>we(t,!1)}}).filter(e=>e.path.length>0),le=()=>{const e=Rn();return De==="SHOW_CHILD"?e.filter(t=>!e.some(r=>r!==t&&w(t.value,r.value.slice(0,t.value.length)))):De==="SHOW_PARENT"?e.filter(t=>!e.some(r=>r!==t&&w(r.value,t.value.slice(0,r.value.length)))):e},we=(e,t=!0)=>{if(V||e.some(k=>J(k,o)))return;const r=z(e,o);if(!r.length)return;const u=e[e.length-1],g=Q(u,o);if(i){const O=fe(R,o,!1).filter(l=>l.every(f=>!J(f,o))&&Q(l[l.length-1],o)).map(l=>z(l,o)),T=O.filter(l=>H.some(f=>w(f,l.slice(0,f.length)))),b=O.filter(l=>w(r,l.slice(0,r.length)));if(!b.length)return;let q=b.every(l=>T.some(f=>w(l,f)))?T.filter(l=>!b.some(f=>w(l,f))):[...T,...b.filter(l=>!T.some(f=>w(l,f)))];const E=fe(R,o,!0).filter(l=>!Q(l[l.length-1],o)&&l.every(f=>!J(f,o)));for(const l of E){const f=z(l,o),Ge=O.filter(Ae=>w(f,Ae.slice(0,f.length)));Ge.length&&Ge.every(Ae=>q.some(Fn=>w(Ae,Fn)))&&q.push(f)}const de=q.map(l=>pe(l,R,o));je(q,de),v?.autoClearSearchValue!==!1&&Se("");return}(g||_)&&(je(r,e),g&&t&&U(!1))},$e=(e,t)=>{He(r=>an(r,e,o,t))},kn=(e,t)=>{$e(e,r=>({...r,[o.loading]:t}))},En=(e,t)=>{$e(e,r=>({...r,[o.loading]:!1,...t?{[o.children]:t}:{}}))},Pn=e=>{if(!W||V)return;const t=z(e,o),r=ne(t);if(!t.length||M.current.has(r))return;const u=oe.current,g=++xn.current;M.current.set(r,g),kn(t,!0),xe("");const k=()=>ye.current&&u===oe.current&&M.current.get(r)===g,O=b=>{k()&&(M.current.delete(r),En(t,b))},T=b=>{k()&&(O(),xe(b instanceof Error?b.message:"Unable to load options. Try again."),sn?.(b,e))};try{const b=W(e);Array.isArray(b)?O(b):Yn(b)?b.then(C=>O(Array.isArray(C)?C:void 0),T):O()}catch(b){T(b)}},Ve=(e,t)=>{if(V)return;const r=e[e.length-1];if(!r||J(r,o))return;const u=z(e,o),g=Ye(r,o);ie(u),!g&&(!Q(r,o)&&W&&!Y(r,o)?.length&&Pn(e),t&&(Q(r,o)||_||i)&&we(e,!0))},Ke=e=>{e?.stopPropagation(),je(i?[]:[],i?[]:[]),ie([]),Se(""),U(!1)},Dn=(e,t)=>{const r=e.toLowerCase();return ue(t,o).some(u=>String(u).toLowerCase().includes(r))},Ue=h.useMemo(()=>{if(!v||!B)return[];const e=v.filter??Dn;let t=We.filter(r=>e(B,r));return v.sort&&(t=[...t].sort((r,u)=>v.sort?.(r,u,B)??0)),typeof v.limit=="number"?t=t.slice(0,v.limit):v.limit!==!1&&(t=t.slice(0,50)),t},[v,B,We]);h.useEffect(()=>{if(!N)return;const e=t=>{t instanceof KeyboardEvent&&t.key!=="Escape"||t.type==="pointerdown"&&D.current?.contains(t.target)||(U(!1),t instanceof KeyboardEvent&&D.current?.querySelector("[role=combobox]")?.focus())};return document.addEventListener("pointerdown",e,!0),()=>{document.removeEventListener("pointerdown",e,!0)}},[N,V,ve,ke]);const Je=Jn(D,le().map(e=>e.label),ee==="responsive"),In=i?a.jsxs("span",{className:S("cinna-cascader__tags",j?.content),style:y?.content,children:[le().slice(0,ee==="responsive"?Je:ee).map(e=>A?a.jsx(X.Fragment,{children:A(e)},ne(e.value)):a.jsxs("span",{className:S("cinna-cascader__tag",j?.tag),style:y?.tag,children:[e.label,a.jsx("button",{type:"button",disabled:V,"aria-label":"Remove selected path",onClick:t=>{t.stopPropagation(),e.onClose()},children:un})]},ne(e.value))),(()=>{const e=le(),t=ee==="responsive"?Je:ee,r=typeof t=="number"?e.slice(t):[];if(!r.length)return null;const u=typeof ge=="function"?ge(r):ge??`+${r.length}`;return a.jsx("span",{className:"cinna-cascader__tag cinna-cascader__tag--omitted",children:u})})(),!le().length&&a.jsx("span",{className:S("cinna-cascader__placeholder",j?.placeholder),style:y?.placeholder,children:p})]}):a.jsx("span",{className:S("cinna-cascader__content",j?.content,!K.length&&"cinna-cascader__placeholder"),style:K.length?y?.content:y?.placeholder,children:K.length?Ln():p}),zn=(e,t)=>gn?.(e,t)??tn(e,o),Nn=(e,t)=>{const r=z(t,o),u=w(Ce.slice(0,r.length),r),g=i?H.some(C=>w(C,r.slice(0,C.length))):w($,r),k=!Q(e,o),O=J(e,o),T=Ye(e,o),b={onMouseEnter:ae==="hover"&&k&&!O&&!T?()=>Ve(t,!1):void 0,onClick:()=>Ve(t,!0),onKeyDown:C=>{const q=C.currentTarget.parentElement,E=Array.from(q?.querySelectorAll('button[role="option"]:not(:disabled)')??[]),de=E.indexOf(C.currentTarget),l=C.key==="ArrowDown"?E[(de+1)%E.length]:C.key==="ArrowUp"?E[(de-1+E.length)%E.length]:C.key==="Home"?E[0]:C.key==="End"?E[E.length-1]:void 0;if(l&&(C.preventDefault(),l.focus()),C.key==="ArrowRight"&&k&&(C.preventDefault(),Ve(t,!1),requestAnimationFrame(()=>{const f=Array.from(D.current?.querySelectorAll(".cinna-cascader__menu")??[]);f[f.indexOf(q)+1]?.querySelector("button:not(:disabled)")?.focus()})),C.key==="ArrowLeft"){C.preventDefault();const f=Array.from(D.current?.querySelectorAll(".cinna-cascader__menu")??[]);f[f.indexOf(q)-1]?.querySelector(".cinna-cascader__option--active")?.focus()}}};return a.jsxs("button",{type:"button",role:"option","aria-selected":g,disabled:O,className:S("cinna-cascader__option",u&&"cinna-cascader__option--active",g&&"cinna-cascader__option--checked",O&&"cinna-cascader__option--disabled",T&&"cinna-cascader__option--loading",e.className,j?.option),style:{...y?.option,...e.style},"aria-busy":T||void 0,...b,children:[i&&a.jsx("span",{className:"cinna-cascader__check","aria-hidden":"true",children:g?"✓":""}),a.jsx("span",{children:zn(e,t)}),T?a.jsx("small",{className:"cinna-cascader__loading-icon",children:on}):k?a.jsx("small",{className:"cinna-cascader__expand-icon",children:Z}):null]},ne(r))},Qe=v&&B?a.jsx("span",{className:"cinna-cascader__search-results",role:"listbox",children:Ue.length?Ue.map(e=>{const t=z(e,o),r=v.render?v.render(B,e):ue(e,o).map((u,g)=>a.jsxs(X.Fragment,{children:[g>0?m:null,u]},g));return a.jsx("button",{type:"button",role:"option","aria-selected":i?H.some(u=>w(u,t)):w($,t),disabled:e.some(u=>J(u,o)),className:S("cinna-cascader__option",j?.option),style:y?.option,onClick:()=>{ie(t),we(e,!0)},children:a.jsx("span",{children:r})},ne(t))}):a.jsx("span",{className:S("cinna-cascader__empty",j?.empty),style:y?.empty,children:Le})}):a.jsx("span",{className:S("cinna-cascader__menus",j?.menus),role:"listbox",style:y?.menus,children:An.map((e,t)=>a.jsx("span",{className:S("cinna-cascader__menu",j?.menu),style:y?.menu,children:e.length?e.map(r=>{const u=Ce.slice(0,t);return Nn(r,[...pe(u,R,o).slice(0,t),r])}):a.jsx("span",{className:S("cinna-cascader__empty",j?.empty),style:y?.empty,children:Le})},t))}),qn=a.jsx(Mn,{anchor:D,placement:be,children:a.jsxs("span",{className:S("cinna-cascader__popup",`cinna-cascader__popup--${be}`,j?.popup),style:y?.popup,children:[v&&a.jsxs("label",{className:S("cinna-cascader__search",j?.search),style:y?.search,children:[v.searchIcon&&a.jsx("span",{children:v.searchIcon}),a.jsx("input",{value:B,placeholder:"Search path",onChange:e=>Se(e.currentTarget.value)})]}),Ne&&a.jsx("span",{className:"cinna-cascader__error",role:"alert",children:Ne}),Pe?Pe(Qe):Qe]})}),Hn=i?H.length>0:$.length>0,Bn=d&&typeof d=="object"?d.clearIcon??a.jsx(G,{name:"close-blue",size:11}):a.jsx(G,{name:"close-blue",size:11});return a.jsxs("div",{ref:On,className:S("cinna-cascader",`cinna-cascader--${yn}`,`cinna-cascader--${hn}`,`cinna-cascader--${be}`,Ie&&`cinna-cascader--${Ie}`,N&&"cinna-cascader--open",i&&"cinna-cascader--multiple",V&&"cinna-cascader--disabled",j?.root,mn),style:{...y?.root,...bn},...ze,children:[a.jsxs("div",{role:"combobox","aria-label":ze["aria-label"]??(typeof p=="string"?p:"Select path"),tabIndex:V?-1:0,className:S("cinna-cascader__control",j?.control),style:y?.control,"aria-disabled":V||void 0,"aria-haspopup":"listbox","aria-expanded":N,"aria-controls":N?Me:void 0,onClick:()=>U(!N),onKeyDown:e=>{e.target!==e.currentTarget||V||["Enter"," ","ArrowDown"].includes(e.key)&&(e.preventDefault(),U(!0),e.key==="ArrowDown"&&requestAnimationFrame(()=>D.current?.querySelector("[role=option]:not(:disabled)")?.focus()))},children:[Ee&&a.jsx("span",{className:S("cinna-cascader__prefix",j?.prefix),style:y?.prefix,children:Ee}),In,d&&Hn&&!V&&a.jsx("span",{role:"button",tabIndex:0,"aria-label":"Clear cascader",className:S("cinna-cascader__clear",j?.clear),style:y?.clear,onClick:Ke,onKeyDown:e=>{["Enter"," "].includes(e.key)&&(e.preventDefault(),e.stopPropagation(),Ke())},children:Bn}),a.jsx("span",{className:S("cinna-cascader__suffix",j?.suffix),style:y?.suffix,"aria-hidden":"true",children:dn})]}),N&&a.jsx("span",{id:Me,children:qn})]})});rn.displayName="Cascader";const I=Object.assign(rn,{SHOW_PARENT:"SHOW_PARENT",SHOW_CHILD:"SHOW_CHILD"}),F=[{label:"Docs",value:"docs",children:[{label:"Overview",value:"overview"},{label:"Changelog",value:"changelog"},{label:"API",value:"api"}]},{label:"Assets",value:"assets",children:[{label:"Icons",value:"icons"},{label:"Tokens",value:"tokens"}]}],nn=[{label:"Product",value:"product",children:[{label:"Research",value:"research"},{label:"Design",value:"design"}]},{label:"Engineering",value:"engineering",children:[{label:"Frontend",value:"frontend"},{label:"Quality",value:"quality",disabled:!0}]}],ct={examples:[{id:"basic-cascader",zh:{title:"基本用法",description:"级联选择按列展开，每一级选项都保留在同一个弹层中完成选择。",codeToggle:"查看基本用法代码"},en:{title:"Basic usage",description:"Cascader expands by columns and keeps every level inside the same popup.",codeToggle:"View basic usage code"},code:`import { Cascader, Icon } from '@cinna-design/react';

const options = [
  {
    label: 'Docs',
    value: 'docs',
    children: [
      { label: 'Overview', value: 'overview' },
      { label: 'Changelog', value: 'changelog' },
    ],
  },
  {
    label: 'Assets',
    value: 'assets',
    children: [{ label: 'Icons', value: 'icons' }],
  },
];

export default () => <Cascader options={options} placeholder="Choose path" />;`,render:()=>a.jsx(I,{options:F,placeholder:"Choose path"})},{id:"cascader-default-display",zh:{title:"默认值与展示",description:"defaultValue 推荐传路径数组，displayRender 可控制选中后的回填内容。",codeToggle:"查看默认值与展示代码"},en:{title:"Default value and display",description:"Use a path array as defaultValue, and customize selected display with displayRender.",codeToggle:"View default display code"},code:`import { Cascader } from '@cinna-design/react';

export default () => (
  <Cascader
    options={options}
    defaultValue={['docs', 'api']}
    displayRender={(labels) => labels.join(' / ')}
  />
);`,render:()=>a.jsx(I,{options:F,defaultValue:["docs","api"],displayRender:n=>n.join(" / ")})},{id:"cascader-hover-disabled",zh:{title:"移入展开与禁用项",description:'expandTrigger="hover" 可移入展开子级，disabled 可禁用单个路径节点。',codeToggle:"查看移入展开代码"},en:{title:"Hover expand and disabled options",description:'Use expandTrigger="hover" to reveal children and disabled to lock a node.',codeToggle:"View hover expand code"},code:`import { Cascader } from '@cinna-design/react';

export default () => (
  <Cascader
    expandTrigger="hover"
    options={options}
    placeholder="Hover to expand"
  />
);`,render:()=>a.jsx(I,{expandTrigger:"hover",options:nn,placeholder:"Hover to expand"})},{id:"cascader-change-on-select",zh:{title:"选择即改变",description:"changeOnSelect 允许选择非叶子节点，并在每一级选择后立即触发变更。",codeToggle:"查看选择即改变代码"},en:{title:"Change on select",description:"changeOnSelect allows selecting parent nodes and emits changes at each level.",codeToggle:"View change on select code"},code:`import { Cascader, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState([]);

  return (
    <Space direction="vertical" align="flex-start">
      <Cascader changeOnSelect options={options} onChange={(next) => setValue(next)} />
      <Text tone="secondary">Selected: {value.join(' / ') || 'none'}</Text>
    </Space>
  );
};`,render:()=>{const n=()=>{const[s,c]=X.useState([]);return a.jsxs(Xe,{direction:"vertical",align:"flex-start",children:[a.jsx(I,{changeOnSelect:!0,options:nn,onChange:i=>c(i)}),a.jsxs(Un,{tone:"secondary",children:["Selected: ",s.join(" / ")||"none"]})]})};return a.jsx(n,{})}},{id:"cascader-multiple-tags",zh:{title:"多选与标签",description:"multiple 支持选择多条路径，maxTagCount 和 tagRender 控制标签展示。",codeToggle:"查看多选代码"},en:{title:"Multiple selection and tags",description:"multiple selects several paths, while maxTagCount and tagRender control tag display.",codeToggle:"View multiple code"},code:`import { Cascader } from '@cinna-design/react';

export default () => (
  <Cascader
    multiple
    maxTagCount={2}
    options={options}
    defaultValue={[
      ['docs', 'api'],
      ['assets', 'icons'],
    ]}
  />
);`,render:()=>a.jsx(I,{multiple:!0,maxTagCount:2,options:F,defaultValue:[["docs","api"],["assets","icons"]]})},{id:"cascader-search",zh:{title:"搜索路径",description:"showSearch 可在弹层中搜索完整路径，也可以传入 filter、sort 和 render 定制结果。",codeToggle:"查看搜索路径代码"},en:{title:"Path search",description:"showSearch searches full paths and can customize filter, sort, and render.",codeToggle:"View path search code"},code:`import { Cascader } from '@cinna-design/react';

export default () => (
  <Cascader
    showSearch={{
      filter: (input, path) =>
        path.some((option) => String(option.label).toLowerCase().includes(input.toLowerCase())),
      render: (_, path) => path.map((option) => option.label).join(' -> '),
    }}
    options={options}
    placeholder="Search path"
  />
);`,render:()=>a.jsx(I,{showSearch:{filter:(n,s)=>s.some(c=>String(c.label).toLowerCase().includes(n.toLowerCase())),render:(n,s)=>s.map(c=>c.label).join(" -> ")},options:F,placeholder:"Search path"})},{id:"cascader-load-field-names",zh:{title:"动态加载与字段名",description:"isLeaf=false 会展示可展开状态，loadData 用于接入异步加载；fieldNames 可适配不同数据结构。",codeToggle:"查看动态加载代码"},en:{title:"Lazy loading and field names",description:"isLeaf=false marks expandable nodes for loadData, and fieldNames adapts custom data shapes.",codeToggle:"View lazy loading code"},code:`import { Cascader } from '@cinna-design/react';

const options = [
  {
    name: 'Workspace',
    id: 'workspace',
    isLeaf: false,
  },
];

export default () => (
  <Cascader
    fieldNames={{ label: 'name', value: 'id', children: 'nodes' }}
    options={options}
    loadData={() =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { name: 'Design kit', id: 'design-kit' },
            { name: 'Release notes', id: 'release-notes' },
          ]);
        }, 900);
      })}
  />
);`,render:()=>a.jsx(I,{fieldNames:{label:"name",value:"id",children:"nodes"},options:[{name:"Workspace",id:"workspace",isLeaf:!1}],loadData:()=>new Promise(n=>{window.setTimeout(()=>{n([{name:"Design kit",id:"design-kit"},{name:"Release notes",id:"release-notes"}])},900)})})},{id:"cascader-variant-popup",zh:{title:"形态、状态与弹层",description:"variant、status、prefix、suffixIcon、popupRender 和语义样式可组合定制展示。",codeToggle:"查看形态与弹层代码"},en:{title:"Variant, status, and popup",description:"Combine variant, status, prefix, suffixIcon, popupRender, and semantic styles.",codeToggle:"View variant and popup code"},code:`import { Cascader, Icon } from '@cinna-design/react';

export default () => (
  <Cascader
    variant="filled"
    status="warning"
    prefix="☁"
    suffixIcon={<Icon name="chevron-down" size={13} />}
    options={options}
    popupRender={(menus) => (
      <div style={{ display: 'grid', gap: 8 }}>
        {menus}
        <small style={{ color: '#8a6c5f', fontWeight: 800 }}>Choose one path</small>
      </div>
    )}
    styles={{ popup: { borderColor: '#73c4e0' } }}
  />
);`,render:()=>a.jsx(I,{variant:"filled",status:"warning",prefix:"☁",suffixIcon:a.jsx(G,{name:"chevron-down",size:13}),options:F,popupRender:n=>a.jsxs("div",{style:{display:"grid",gap:8},children:[n,a.jsx("small",{style:{color:"#8a6c5f",fontWeight:800},children:"Choose one path"})]}),styles:{popup:{borderColor:"#73c4e0"}}})},{id:"cascader-placement",zh:{title:"弹层位置",description:"placement 用于单独控制弹层相对选择框的左对齐或右对齐。",codeToggle:"查看弹层位置代码"},en:{title:"Popup placement",description:"Use placement to align the popup to the left or right edge of the control.",codeToggle:"View popup placement code"},code:`import { Cascader, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Cascader placement="bottomLeft" options={options} placeholder="Bottom left" />
    <Cascader placement="bottomRight" options={options} placeholder="Bottom right" />
  </Space>
);`,render:()=>a.jsxs(Xe,{wrap:!0,children:[a.jsx(I,{placement:"bottomLeft",options:F,placeholder:"Bottom left"}),a.jsx(I,{placement:"bottomRight",options:F,placeholder:"Bottom right"})]})}]};export{ct as cascaderDoc};
