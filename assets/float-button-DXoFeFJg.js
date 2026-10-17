import{R as h,u as W,h as K,n as Y,i as J,j as t,k as Q,c as O,r as N,I as F}from"./index-BZKQtVdI.js";import{S as w}from"./index-CGJnK8xI.js";const X=e=>typeof e=="number"?`${e}px`:e,k=h.forwardRef(({icon:e="+",shape:n="circle",tooltip:i,badge:a,ripple:l=!0,rippleEffects:u,rippleParticleColors:p,rippleParticleOpacity:d,theme:m,color:b,backgroundColor:g,borderColor:x,radius:c,shadow:s,activeShadow:E,className:q,children:j,disabled:T,onClick:z,style:I,...B},v)=>{const f=W(T),{activeRippleEffects:G,ripples:y,triggerButtonRipple:R}=K({enabled:l,disabled:f,effects:u,particleColors:p}),S={...J({theme:m,color:b,backgroundColor:g,borderColor:x,shadow:s,activeShadow:E}),...c!==void 0?{"--button-radius":X(c)}:null,...d!==void 0?{"--button-particle-opacity":Y(d)}:null,...I},r=C=>{R(C),z?.(C)};return t.jsxs("button",{ref:v,type:"button",className:O("cinna-float-button",`cinna-float-button--${n}`,q),title:typeof i=="string"?i:void 0,disabled:f,style:S,onClick:r,...B,children:[t.jsx("span",{className:"cinna-float-button__icon",children:e}),j&&t.jsx("small",{className:"cinna-float-button__label",children:j}),a&&t.jsx("em",{children:a}),i&&t.jsx("span",{className:"cinna-float-button__tooltip",children:i}),Q(y,G)]})});k.displayName="FloatButton";const Z=(e,n)=>h.Children.map(e,i=>h.isValidElement(i)?h.cloneElement(i,{shape:i.props.shape??n}):i),_=h.forwardRef(({shape:e="circle",placement:n="top",trigger:i,open:a,defaultOpen:l=!1,icon:u="+",closeIcon:p=t.jsx(F,{name:"close-blue",size:14}),tooltip:d,items:m,children:b,className:g,onOpenChange:x,onClick:c,onMouseEnter:s,onMouseLeave:E,...q},j)=>{const T=a!==void 0,[z,I]=N.useState(l),B=T?!!a:z,v=!!i,f=r=>{T||I(r),x?.(r)},G=m?m.map(({key:r,label:C,content:L,onClick:D,...V},H)=>t.jsx(k,{...V,shape:V.shape??e,onClick:$=>{D?.($),i==="click"&&f(!1)},children:L??C??V.children},r??H)):Z(b,e),y=t.jsx("div",{className:"cinna-float-button-group__list",children:G}),R=v?t.jsx(k,{className:"cinna-float-button-group__trigger",shape:e,icon:B?p:u,tooltip:d,"aria-expanded":B,"aria-haspopup":"menu",onClick:r=>{c?.(r),i==="click"&&f(!B)}}):null,S=n==="top"||n==="left";return t.jsxs("div",{ref:j,className:O("cinna-float-button-group",`cinna-float-button-group--${e}`,`cinna-float-button-group--${n}`,v&&"cinna-float-button-group--menu",B&&"cinna-float-button-group--open",g),onMouseEnter:r=>{i==="hover"&&f(!0),s?.(r)},onMouseLeave:r=>{i==="hover"&&f(!1),E?.(r)},...q,children:[S&&y,R,!S&&y]})});_.displayName="FloatButtonGroup";const P=e=>e?.()??window,U=e=>e===window?window.scrollY||document.documentElement.scrollTop||document.body.scrollTop||0:e.scrollTop,M=(e,n)=>{if(e===window){window.scrollTo(0,n);return}e.scrollTop=n},tt=(e,n)=>{const i=U(e);if(n<=0||i<=0){M(e,0);return}const a=performance.now(),l=u=>{const p=Math.min((u-a)/n,1),d=1-Math.pow(1-p,3);M(e,Math.round(i*(1-d))),p<1&&window.requestAnimationFrame(l)};window.requestAnimationFrame(l)},A=h.forwardRef(({icon:e=t.jsx(F,{name:"arrow-tail-up",size:18}),tooltip:n="Back to top",duration:i=450,visibilityHeight:a=400,target:l,onClick:u,style:p,className:d,...m},b)=>{const[g,x]=N.useState(!1);return N.useEffect(()=>{const c=P(l),s=()=>{x(U(c)>=a)};return s(),c.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s),()=>{c.removeEventListener("scroll",s),window.removeEventListener("resize",s)}},[l,a]),t.jsx(k,{ref:b,icon:e,tooltip:n,"aria-label":typeof n=="string"?n:"Back to top",className:O("cinna-float-button--back-top",!g&&"cinna-float-button--hidden",d),style:{pointerEvents:g?void 0:"none",...p},onClick:c=>{u?.(c),tt(P(l),i)},...m})});A.displayName="FloatButtonBackTop";const o=Object.assign(k,{Group:_,BackTop:A}),nt={examples:[{id:"basic-float-button",zh:{title:"基本用法",description:"用于放置全局可见的快捷操作。",codeToggle:"查看基本用法代码"},en:{title:"Basic float button",description:"Use it for globally visible quick actions.",codeToggle:"View basic float button code"},code:`import { FloatButton } from '@cinna-design/react';

export default () => <FloatButton icon="+" tooltip="Create" />;`,render:()=>t.jsx(o,{icon:"+",tooltip:"Create"})},{id:"float-button-shapes",zh:{title:"按钮形状",description:"shape 支持圆形和方形，适配不同的浮动操作密度。",codeToggle:"查看按钮形状代码"},en:{title:"Shapes",description:"shape supports circle and square for different floating action density.",codeToggle:"View shapes code"},code:`import { FloatButton, Icon, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <FloatButton icon="+" shape="circle" />
    <FloatButton icon="?" shape="square" />
  </Space>
);`,render:()=>t.jsxs(w,{children:[t.jsx(o,{icon:"+",shape:"circle"}),t.jsx(o,{icon:"?",shape:"square"})]})},{id:"float-button-content",zh:{title:"文字内容",description:"children 会作为简短文字显示在图标下方，适合方形按钮。",codeToggle:"查看文字内容代码"},en:{title:"Text content",description:"children renders short text under the icon, useful with square buttons.",codeToggle:"View text content code"},code:`import { FloatButton } from '@cinna-design/react';

export default () => (
  <FloatButton icon="^" shape="square" tooltip="Back to top">
    Top
  </FloatButton>
);`,render:()=>t.jsx(o,{icon:"^",shape:"square",tooltip:"Back to top",children:"Top"})},{id:"float-button-badge",zh:{title:"徽标提示",description:"badge 可用于提示待处理数量或状态。",codeToggle:"查看徽标提示代码"},en:{title:"Badge",description:"Use badge to indicate pending count or status.",codeToggle:"View badge code"},code:`import { FloatButton } from '@cinna-design/react';

export default () => <FloatButton icon="!" badge={3} tooltip="Pending reviews" />;`,render:()=>t.jsx(o,{icon:"!",badge:3,tooltip:"Pending reviews"})},{id:"float-button-tooltip",zh:{title:"悬浮提示",description:"传入 tooltip 后，鼠标悬浮或键盘聚焦时展示提示内容。",codeToggle:"查看悬浮提示代码"},en:{title:"Hover tooltip",description:"Pass tooltip to show helper content on hover or keyboard focus.",codeToggle:"View hover tooltip code"},code:`import { FloatButton, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <FloatButton icon="?" tooltip="Need help?" />
    <FloatButton icon="i" shape="square" tooltip="Open guide">Info</FloatButton>
  </Space>
);`,render:()=>t.jsxs(w,{children:[t.jsx(o,{icon:"?",tooltip:"Need help?"}),t.jsx(o,{icon:"i",shape:"square",tooltip:"Open guide",children:"Info"})]})},{id:"float-button-group",zh:{title:"按钮组",description:"FloatButton.Group 可组合多个同级快捷操作，适合页面右下角的工具入口。",codeToggle:"查看按钮组代码"},en:{title:"Button group",description:"FloatButton.Group combines peer quick actions for page-level tools.",codeToggle:"View button group code"},code:`import { FloatButton } from '@cinna-design/react';

export default () => (
  <FloatButton.Group shape="square">
    <FloatButton icon="+" tooltip="Create">New</FloatButton>
    <FloatButton icon="↗" tooltip="Share">Go</FloatButton>
    <FloatButton icon="?" tooltip="Help">Ask</FloatButton>
  </FloatButton.Group>
);`,render:()=>t.jsxs(o.Group,{shape:"square",children:[t.jsx(o,{icon:"+",tooltip:"Create",children:"New"}),t.jsx(o,{icon:"↗",tooltip:"Share",children:"Go"}),t.jsx(o,{icon:"?",tooltip:"Help",children:"Ask"})]})},{id:"float-button-menu",zh:{title:"菜单模式",description:"trigger 支持 click 和 hover，placement 支持向上、向下、向左、向右展开多个自定义按钮。",codeToggle:"查看菜单模式代码"},en:{title:"Menu mode",description:"Use click or hover trigger with top, bottom, left, or right placement for custom action menus.",codeToggle:"View menu mode code"},code:`import { FloatButton, Space } from '@cinna-design/react';

const menuItems = [
  { key: 'edit', icon: 'E', tooltip: 'Edit' },
  { key: 'copy', icon: 'C', tooltip: 'Copy' },
  { key: 'share', icon: 'S', tooltip: 'Share' },
];

export default () => (
  <Space wrap>
    <FloatButton.Group trigger="click" placement="top" icon="☰" items={menuItems} />
    <FloatButton.Group trigger="hover" placement="left" icon="★" items={menuItems} />
    <FloatButton.Group trigger="click" placement="right" icon={<Icon name="arrow-tail-right" size={18} />} items={menuItems} />
    <FloatButton.Group trigger="hover" placement="bottom" icon={<Icon name="arrow-tail-down" size={18} />} items={menuItems} />
  </Space>
);`,render:()=>{const e=[{key:"edit",icon:"E",tooltip:"Edit"},{key:"copy",icon:"C",tooltip:"Copy"},{key:"share",icon:"S",tooltip:"Share"}];return t.jsxs(w,{wrap:!0,children:[t.jsx(o.Group,{trigger:"click",placement:"top",icon:"☰",items:e}),t.jsx(o.Group,{trigger:"hover",placement:"left",icon:"★",items:e}),t.jsx(o.Group,{trigger:"click",placement:"right",icon:t.jsx(F,{name:"arrow-tail-right",size:18}),items:e}),t.jsx(o.Group,{trigger:"hover",placement:"bottom",icon:t.jsx(F,{name:"arrow-tail-down",size:18}),items:e})]})}},{id:"float-button-back-top",zh:{title:"返回顶部",description:"FloatButton.BackTop 可绑定滚动容器，并在点击后平滑回到顶部。",codeToggle:"查看返回顶部代码"},en:{title:"Back to top",description:"FloatButton.BackTop can target a scroll container and return it to the top.",codeToggle:"View back to top code"},code:`import React from 'react';
import { FloatButton } from '@cinna-design/react';

export default () => {
  const panelRef = React.useRef(null);

  return (
    <div ref={panelRef} style={{ position: 'relative', height: 170, overflow: 'auto', padding: 14, borderRadius: 18, background: '#f0fafe' }}>
      <div style={{ height: 360, fontWeight: 900 }}>Scroll this panel</div>
      <FloatButton.BackTop target={() => panelRef.current ?? window} visibilityHeight={0} duration={300} />
    </div>
  );
};`,render:()=>{const e=()=>{const n=h.useRef(null);return t.jsxs("div",{ref:n,style:{position:"relative",height:170,overflow:"auto",padding:14,borderRadius:18,background:"#f0fafe"},children:[t.jsx("div",{style:{height:360,fontWeight:900},children:"Scroll this panel"}),t.jsx(o.BackTop,{target:()=>n.current??window,visibilityHeight:0,duration:300})]})};return t.jsx(e,{})}},{id:"float-button-theme",zh:{title:"主题与自定义样式",description:"theme 可快速套用配色；也可分别设置文字色、背景色、边框色、圆角和底部阴影。",codeToggle:"查看主题与自定义样式代码"},en:{title:"Theme and custom style",description:"Use theme presets or tune text color, background, border, radius, and bottom shadow directly.",codeToggle:"View theme and custom style code"},code:`import { FloatButton, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <FloatButton icon="S" shape="square" theme="sky">Sky</FloatButton>
    <FloatButton icon="M" shape="square" theme="mint">Mint</FloatButton>
    <FloatButton icon="B" shape="square" theme="blossom">Bloom</FloatButton>
    <FloatButton
      icon="V"
      shape="square"
      color="#fff8ee"
      backgroundColor="#7c5746"
      borderColor="rgba(70, 51, 42, 0.34)"
      radius={18}
      shadow="0 5px 0 #5d4136"
      activeShadow="0 2px 0 #5d4136"
    >
      VIP
    </FloatButton>
  </Space>
);`,render:()=>t.jsxs(w,{wrap:!0,children:[t.jsx(o,{icon:"S",shape:"square",theme:"sky",children:"Sky"}),t.jsx(o,{icon:"M",shape:"square",theme:"mint",children:"Mint"}),t.jsx(o,{icon:"B",shape:"square",theme:"blossom",children:"Bloom"}),t.jsx(o,{icon:"V",shape:"square",color:"#fff8ee",backgroundColor:"#7c5746",borderColor:"rgba(70, 51, 42, 0.34)",radius:18,shadow:"0 5px 0 #5d4136",activeShadow:"0 2px 0 #5d4136",children:"VIP"})]})},{id:"float-button-ripple",zh:{title:"点击动效",description:"支持外层扩散、内部点击处扩散和边缘粒子扩散，也可以叠加使用。",codeToggle:"查看点击动效代码"},en:{title:"Click ripple",description:"Use outer rings, inner click ripples, and edge particles independently or together.",codeToggle:"View click ripple code"},code:`import { FloatButton, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <FloatButton icon="O" tooltip="Outer" rippleEffects="outer" />
    <FloatButton icon="I" tooltip="Inner" rippleEffects="inner" />
    <FloatButton icon="P" tooltip="Particles" rippleEffects="particles" />
    <FloatButton
      icon="*"
      shape="square"
      tooltip="All"
      rippleEffects={['outer', 'inner', 'particles']}
      rippleParticleColors={['#ef8f8f', '#f6c96d', '#72b866', '#54b6cd', '#7a6ff0']}
      rippleParticleOpacity={0.92}
    >
      Go
    </FloatButton>
  </Space>
);`,render:()=>t.jsxs(w,{children:[t.jsx(o,{icon:"O",tooltip:"Outer",rippleEffects:"outer"}),t.jsx(o,{icon:"I",tooltip:"Inner",rippleEffects:"inner"}),t.jsx(o,{icon:"P",tooltip:"Particles",rippleEffects:"particles"}),t.jsx(o,{icon:"*",shape:"square",tooltip:"All",rippleEffects:["outer","inner","particles"],rippleParticleColors:["#ef8f8f","#f6c96d","#72b866","#54b6cd","#7a6ff0"],rippleParticleOpacity:.92,children:"Go"})]})},{id:"float-button-disabled",zh:{title:"禁用状态",description:"禁用后仍保留入口位置，但不会触发点击操作。",codeToggle:"查看禁用状态代码"},en:{title:"Disabled",description:"Keep the entry visible while preventing click actions.",codeToggle:"View disabled code"},code:`import { FloatButton, Icon } from '@cinna-design/react';

export default () => <FloatButton icon={<Icon name="close-blue" size={16} />} tooltip="Unavailable" disabled />;`,render:()=>t.jsx(o,{icon:t.jsx(F,{name:"close-blue",size:16}),tooltip:"Unavailable",disabled:!0})}]};export{nt as floatButtonDoc};
