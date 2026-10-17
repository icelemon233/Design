import{R as y,u as we,r as i,c as b,j as o,I as G,B as Se}from"./index-BKj7f8pq.js";import{F as ke}from"./FloatingPanel-DY7kXLHU.js";import{u as je}from"./ComponentPage-CxK9ZWuC.js";import{S as V}from"./index-Dv7KxCjI.js";import{T as Ae}from"./index-ryGFQma_.js";import"./useIsomorphicLayoutEffect-DYwKHNn_.js";const Te=(n=[])=>n.map(l=>typeof l=="string"?{label:l,value:l}:{...l,label:l.label??l.value}),De=n=>typeof n=="string"||typeof n=="number"?String(n):"",ze=n=>n.findIndex(l=>!l.disabled),Ee=(n,l,d)=>{if(!n.length)return-1;let s=l;for(let c=0;c<n.length;c+=1)if(s=(s+d+n.length)%n.length,!n[s]?.disabled)return s;return-1},r=y.forwardRef(({options:n=[],children:l,controlSize:d="medium",variant:s="outlined",status:c,allowClear:j,backfill:q=!1,defaultActiveFirstOption:L=!0,open:N,defaultOpen:H=!1,onOpenChange:$,onChange:J,onSelect:Q,onSearch:X,onClear:Y,onInputKeyDown:Z,onPopupScroll:ee,filterOption:A=!0,notFoundContent:F=null,popupRender:B,popupMatchInputWidth:T=!0,classNames:m,styles:f,className:oe,style:te,value:ne,defaultValue:le="",disabled:se,readOnly:D,onFocus:ae,onBlur:ie,onKeyDown:re,...ce},z)=>{const E=we(se),C=i.useRef(null),U=i.useRef(null),[pe,de]=i.useState(String(le)),[ue,me]=i.useState(H),[g,x]=i.useState(-1),[fe,_]=i.useState(null),R=N!==void 0,u=R?!!N:ue,w=String(ne??pe),ge=fe??w,S=i.useMemo(()=>Te(n),[n]),a=i.useMemo(()=>{if(A===!1)return S;if(typeof A=="function")return S.filter(t=>A(w,t));const e=w.trim().toLowerCase();return e?S.filter(t=>{const O=De(t.label).toLowerCase();return t.value.toLowerCase().includes(e)||O.includes(e)}):S},[w,A,S]),k=!E&&!D,h=k&&u&&(a.length>0||F!==null),I=i.useId(),he=e=>{U.current=e,typeof z=="function"?z(e):z&&(z.current=e)},p=e=>{const t=k?e:!1;R||me(t),u!==t&&$?.(t),t||(x(-1),_(null))};je(h,C,()=>p(!1));const P=e=>{_(null),de(e),J?.(e)},K=e=>{e.disabled||(P(e.value),Q?.(e.value,e),p(!1))},be=()=>{P(""),Y?.(),p(!1),U.current?.focus()};i.useEffect(()=>{if(!u)return;const e=t=>{C.current?.contains(t.target)||p(!1)};return document.addEventListener("pointerdown",e,!0),()=>{document.removeEventListener("pointerdown",e,!0)}},[u,k,R,$]),i.useEffect(()=>{if(!u){x(-1);return}x(e=>!L||e>=0&&a[e]&&!a[e].disabled?e:ze(a))},[u,L,a]);const v=y.isValidElement(l)?l.props:void 0,ve=b("cinna-native-input",`cinna-native-input--${d}`,c&&`cinna-native-input--${c}`,m?.input,v?.className),W={...ce,ref:he,className:ve,style:{...f?.input,...v?.style},value:ge,disabled:E,readOnly:D,role:"combobox","aria-autocomplete":"list","aria-expanded":h,"aria-controls":h?I:void 0,"aria-activedescendant":h&&g>=0?`${I}-option-${g}`:void 0,onFocus:e=>{v?.onFocus?.(e),k&&p(!0),ae?.(e)},onBlur:e=>{v?.onBlur?.(e),ie?.(e),window.setTimeout(()=>{C.current?.contains(document.activeElement)||p(!1)})},onChange:e=>{v?.onChange?.(e);const t=e.currentTarget.value;P(t),X?.(t),k&&p(!0)},onKeyDown:e=>{if(v?.onKeyDown?.(e),Z?.(e),re?.(e),!(e.defaultPrevented||e.nativeEvent.isComposing))if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault(),u||p(!0);const t=Ee(a,g,e.key==="ArrowDown"?1:-1);x(t),q&&t>=0&&_(a[t].value)}else e.key==="Enter"&&h&&g>=0&&a[g]?(e.preventDefault(),K(a[g])):e.key==="Escape"&&h?(e.preventDefault(),e.stopPropagation(),p(!1)):e.key==="Tab"&&p(!1)}},ye=j&&typeof j=="object"?j.clearIcon??o.jsx(G,{name:"close-blue",size:11}):o.jsx(G,{name:"close-blue",size:11}),Ce=typeof T=="number"?T:T===!1?"max-content":void 0,M=o.jsx("span",{id:I,className:b("cinna-auto-complete__list",m?.list),role:"listbox",onScroll:ee,style:f?.list,children:a.length>0?a.map((e,t)=>{const O=t===g;return o.jsxs("button",{id:`${I}-option-${t}`,type:"button",role:"option","aria-selected":O,disabled:e.disabled,className:b("cinna-auto-complete__option",O&&"cinna-auto-complete__option--active",e.disabled&&"cinna-auto-complete__option--disabled",m?.option,e.className),style:{...f?.option,...e.style},onMouseDown:xe=>xe.preventDefault(),onMouseEnter:()=>x(t),onClick:()=>K(e),children:[o.jsx("span",{className:"cinna-auto-complete__label",children:e.label}),e.description&&o.jsx("small",{children:e.description})]},`${e.value}-${t}`)}):o.jsx("span",{className:b("cinna-auto-complete__empty",m?.empty),style:f?.empty,children:F})});return o.jsxs("span",{ref:C,className:b("cinna-auto-complete",`cinna-auto-complete--${d}`,`cinna-auto-complete--${s}`,c&&`cinna-auto-complete--${c}`,u&&"cinna-auto-complete--open",E&&"cinna-auto-complete--disabled",D&&"cinna-auto-complete--readonly",m?.root,oe),style:{...f?.root,...te},children:[y.isValidElement(l)?y.cloneElement(l,W):o.jsx("input",{...W}),j&&w&&!E&&!D&&o.jsx("button",{type:"button",className:b("cinna-auto-complete__clear",m?.clear),style:f?.clear,"aria-label":"Clear input",onMouseDown:e=>e.preventDefault(),onClick:be,children:ye}),h&&o.jsx(ke,{anchor:C,matchWidth:T===!0,children:o.jsx("span",{className:b("cinna-auto-complete__popup",m?.popup),style:{width:Ce,...f?.popup},children:B?B(M):M})})]})});r.displayName="AutoComplete";const Ie=[{label:"Docs",value:"docs",description:"Guides and API"},{label:"Design tokens",value:"tokens",description:"Color and radius"},{label:"Icons",value:"icons",description:"UI symbols"},{label:"Components",value:"components",description:"Reusable controls"},{label:"Changelog",value:"changelog",description:"Release notes"}],Ne={examples:[{id:"basic-auto-complete",zh:{title:"基本用法",description:"输入内容后展示匹配建议，用户仍然可以保留任意自由输入。",codeToggle:"查看基本用法代码"},en:{title:"Basic usage",description:"Typing shows matching suggestions while still allowing free text.",codeToggle:"View basic usage code"},code:`import { AutoComplete } from '@cinna-design/react';

const options = ['docs', 'design', 'tokens', 'icons', 'components'];

export default () => (
  <AutoComplete options={options} placeholder="Search resources" />
);`,render:()=>o.jsx(r,{options:["docs","design","tokens","icons","components"],placeholder:"Search resources"})},{id:"auto-complete-rich-options",zh:{title:"对象选项",description:"选项支持 label、value、description、disabled 和单项样式。",codeToggle:"查看对象选项代码"},en:{title:"Rich options",description:"Options support label, value, description, disabled state, and item styles.",codeToggle:"View rich options code"},code:`import { AutoComplete } from '@cinna-design/react';

const options = [
  { label: 'Docs', value: 'docs', description: 'Guides and API' },
  { label: 'Design tokens', value: 'tokens', description: 'Color and radius' },
  { label: 'Private notes', value: 'private', disabled: true },
];

export default () => (
  <AutoComplete options={options} placeholder="Choose a resource" />
);`,render:()=>o.jsx(r,{options:[{label:"Docs",value:"docs",description:"Guides and API"},{label:"Design tokens",value:"tokens",description:"Color and radius"},{label:"Private notes",value:"private",disabled:!0}],placeholder:"Choose a resource"})},{id:"auto-complete-search-filter",zh:{title:"搜索与筛选",description:"onSearch 监听输入内容，filterOption 可以接管匹配逻辑。",codeToggle:"查看搜索与筛选代码"},en:{title:"Search and filter",description:"Use onSearch for input changes and filterOption to customize matching.",codeToggle:"View search and filter code"},code:`import { AutoComplete, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

const options = [
  { label: 'Docs', value: 'docs' },
  { label: 'Design tokens', value: 'tokens' },
  { label: 'Components', value: 'components' },
];

export default () => {
  const [keyword, setKeyword] = useState('');

  return (
    <Space direction="vertical" align="flex-start">
      <AutoComplete
        options={options}
        placeholder="Try do or token"
        onSearch={setKeyword}
        filterOption={(input, option) =>
          option.value.includes(input.toLowerCase()) ||
          String(option.label).toLowerCase().includes(input.toLowerCase())
        }
      />
      <Text tone="secondary">Searching: {keyword || 'empty'}</Text>
    </Space>
  );
};`,render:()=>{const n=()=>{const[l,d]=y.useState("");return o.jsxs(V,{direction:"vertical",align:"flex-start",children:[o.jsx(r,{options:Ie,placeholder:"Try do or token",onSearch:d,filterOption:(s,c)=>c.value.includes(s.toLowerCase())||String(c.label).toLowerCase().includes(s.toLowerCase())}),o.jsxs(Ae,{tone:"secondary",children:["Searching: ",l||"empty"]})]})};return o.jsx(n,{})}},{id:"auto-complete-controlled-open",zh:{title:"受控展开与空状态",description:"open 和 onOpenChange 控制弹层，notFoundContent 定义无匹配内容。",codeToggle:"查看受控展开代码"},en:{title:"Controlled open and empty state",description:"Control the popup with open and onOpenChange, and customize empty content.",codeToggle:"View controlled open code"},code:`import { AutoComplete, Button, Space } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Space align="center">
      <AutoComplete
        open={open}
        onOpenChange={setOpen}
        options={['docs', 'tokens']}
        placeholder="Controlled popup"
        notFoundContent="No matching resource"
      />
      <Button size="small" onClick={() => setOpen((value) => !value)}>
        Toggle
      </Button>
    </Space>
  );
};`,render:()=>{const n=()=>{const[l,d]=y.useState(!1);return o.jsxs(V,{align:"center",wrap:!0,children:[o.jsx(r,{open:l,onOpenChange:d,options:["docs","tokens"],placeholder:"Controlled popup",notFoundContent:"No matching resource"}),o.jsx(Se,{size:"small",onClick:()=>d(s=>!s),children:"Toggle"})]})};return o.jsx(n,{})}},{id:"auto-complete-size-variant-status",zh:{title:"尺寸、形态与状态",description:"controlSize 控制高度，variant 和 status 用于不同输入语义。",codeToggle:"查看尺寸与状态代码"},en:{title:"Size, variant, and status",description:"Use controlSize for height, while variant and status express input state.",codeToggle:"View size and status code"},code:`import { AutoComplete, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: 'min(420px, 100%)' }}>
    <AutoComplete controlSize="small" options={['small']} placeholder="Small" />
    <AutoComplete variant="filled" options={['filled']} placeholder="Filled" />
    <AutoComplete variant="underlined" status="warning" options={['warning']} placeholder="Warning" />
    <AutoComplete status="error" options={['error']} placeholder="Error" />
  </Space>
);`,render:()=>o.jsxs(V,{direction:"vertical",align:"stretch",style:{width:"min(420px, 100%)"},children:[o.jsx(r,{controlSize:"small",options:["small"],placeholder:"Small"}),o.jsx(r,{variant:"filled",options:["filled"],placeholder:"Filled"}),o.jsx(r,{variant:"underlined",status:"warning",options:["warning"],placeholder:"Warning"}),o.jsx(r,{status:"error",options:["error"],placeholder:"Error"})]})},{id:"auto-complete-keyboard-backfill",zh:{title:"键盘选择与回填",description:"方向键移动高亮项，Enter 选择；backfill 会在键盘移动时临时回填输入框。",codeToggle:"查看键盘选择代码"},en:{title:"Keyboard and backfill",description:"Arrow keys move the active option and Enter selects it; backfill previews the active value.",codeToggle:"View keyboard code"},code:`import { AutoComplete } from '@cinna-design/react';

export default () => (
  <AutoComplete
    backfill
    defaultActiveFirstOption
    options={['docs', 'design', 'tokens', 'components']}
    placeholder="Use arrow keys"
  />
);`,render:()=>o.jsx(r,{backfill:!0,defaultActiveFirstOption:!0,options:["docs","design","tokens","components"],placeholder:"Use arrow keys"})},{id:"auto-complete-popup-style",zh:{title:"弹层与语义样式",description:"popupRender 可包裹弹层内容，classNames 和 styles 可定制关键语义节点。",codeToggle:"查看弹层样式代码"},en:{title:"Popup and semantic styles",description:"Use popupRender to wrap popup content, and classNames/styles for semantic nodes.",codeToggle:"View popup style code"},code:`import { AutoComplete } from '@cinna-design/react';

export default () => (
  <AutoComplete
    allowClear={{ clearIcon: '×' }}
    popupMatchInputWidth={360}
    options={[
      { label: 'Docs', value: 'docs', description: 'Stable content' },
      { label: 'Design tokens', value: 'tokens', description: 'Theme source' },
    ]}
    placeholder="Styled popup"
    popupRender={(node) => (
      <div style={{ display: 'grid', gap: 8 }}>
        {node}
        <small style={{ color: '#8a6c5f', fontWeight: 800 }}>2 resources</small>
      </div>
    )}
    styles={{
      popup: { borderColor: '#73c4e0' },
      option: { color: '#46332a' },
    }}
  />
);`,render:()=>o.jsx(r,{allowClear:{clearIcon:"×"},popupMatchInputWidth:360,options:[{label:"Docs",value:"docs",description:"Stable content"},{label:"Design tokens",value:"tokens",description:"Theme source"}],placeholder:"Styled popup",popupRender:n=>o.jsxs("div",{style:{display:"grid",gap:8},children:[n,o.jsx("small",{style:{color:"#8a6c5f",fontWeight:800},children:"2 resources"})]}),styles:{popup:{borderColor:"#73c4e0"},option:{color:"#46332a"}}})}]};export{Ne as autoCompleteDoc};
