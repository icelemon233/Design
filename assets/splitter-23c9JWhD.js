import{R as _,u as me,r as P,j as e,c as F}from"./index-Ce0SFtqJ.js";import{c as re}from"./ComponentPage-BW_SxuBs.js";import{T as n}from"./index-DMVNuElq.js";const te=(r,l,d)=>r.slice(0,l+1).reduce((h,x)=>h+x,0)+l*d+d/2,J=_.forwardRef(({className:r,...l},d)=>e.jsx("div",{ref:d,className:F("cinna-splitter__panel",r),...l}));J.displayName="SplitterPanel";const ge=r=>_.isValidElement(r)&&r.type===J,W=(r,l)=>{if(r===void 0)return;if(typeof r=="number")return r;const d=r.trim();if(d.endsWith("%"))return l*(Number.parseFloat(d)/100);const h=Number.parseFloat(d);return Number.isFinite(h)?h:void 0},q=(r,l)=>W(r.min,l)??48,G=(r,l)=>W(r.max,l)??Number.POSITIVE_INFINITY,U=(r,l,d)=>{if(!l.length)return[];const h=Math.max(d,l.length*24),x=l.map(g=>q(g,h)),b=l.map((g,p)=>Math.max(x[p],G(g,h))),j=l.map((g,p)=>re(r[p]??h/l.length,x[p],b[p]));let w=0;for(;Math.abs(j.reduce((g,p)=>g+p,0)-h)>.5&&w<l.length*4;){w+=1;const g=j.reduce((m,f)=>m+f,0),p=h-g,z=p>0,N=j.map((m,f)=>({size:m,index:f,room:z?b[f]-m:m-x[f]})).filter(m=>m.room>.5);if(!N.length)break;const Y=Math.abs(p)/N.length;N.forEach(({index:m,room:f})=>{const E=Math.min(Y,f);j[m]+=z?E:-E})}return j},ie=(r,l)=>r===void 0?`${l}px`:typeof r=="number"?`${r}px`:r,Se=(r,l)=>l==="horizontal"?r.clientX:r.clientY,fe=(r,l,d,h)=>{const x=l[d]??0,b=l[d+1]??0,j=q(r[d],h),w=G(r[d],h),g=q(r[d+1],h),p=G(r[d+1],h);return{minDelta:Math.max(j-x,b-p),maxDelta:Math.min(w-x,b-g)}},ne=_.forwardRef(({children:r,first:l,second:d,orientation:h,vertical:x,defaultSize:b=48,min:j=24,max:w=76,disabled:g,lazy:p,divider:z,resetOnDoubleClick:N=!0,onResizeStart:Y,onResize:m,onResizeEnd:f,onDraggerDoubleClick:E,className:le,style:se,...ae},L)=>{const V=me(g),H=P.useRef(null),X=P.useRef(null),I=P.useRef(null),[K,D]=P.useState([]),[$,Q]=P.useState(null),[Z,A]=P.useState(null),y=h??(x?"vertical":"horizontal"),M=W(z?.size,0)??14,oe=ie(z?.size,14),ce=ie(z?.thickness,1.5),c=P.useMemo(()=>{const t=_.Children.toArray(r).filter(Boolean);return t.length?t.map((i,s)=>{if(ge(i)){const{children:a,className:k,style:R,defaultSize:S,size:C,min:B,max:v,resizable:ue=!0}=i.props;return{key:i.key??s,children:a,className:k,style:R,defaultSize:S,size:C,min:B,max:v,resizable:ue}}return{key:s,children:i,resizable:!0}}):[{key:"first",children:l,defaultSize:`${b}%`,min:`${j}%`,max:`${w}%`,resizable:!0},{key:"second",children:d,resizable:!0}].filter(i=>i.children!==void 0)},[r,b,l,w,j,d]),T=()=>{const t=H.current?.getBoundingClientRect(),i=y==="horizontal"?t?.width:t?.height;return Math.max((i||640)-Math.max(0,c.length-1)*M,c.length*48)},O=t=>{const i=c.map(S=>W(S.size??S.defaultSize,t)),s=i.reduce((S,C)=>S+(C??0),0),a=i.filter(S=>S===void 0).length,k=Math.max(0,t-s),R=a?k/a:t/c.length;return U(i.map(S=>S??R),c,t)},de=t=>{H.current=t,typeof L=="function"?L(t):L&&(L.current=t)};P.useEffect(()=>{if(!c.length)return;const t=T();D(i=>{const s=c.some(a=>a.size!==void 0);return!i.length||i.length!==c.length||s?O(t):U(i,c,t)})},[c,y,M]),P.useEffect(()=>{const t=H.current;if(!t||typeof ResizeObserver>"u")return;const i=new ResizeObserver(()=>{const s=T();D(a=>a.length?U(a,c,s):O(s))});return i.observe(t),()=>i.disconnect()},[c,y,M]),P.useEffect(()=>{if($===null)return;const t=s=>{const a=X.current;if(!a)return;s.preventDefault();const k=T(),R=Se(s,y)-a.startPoint,{minDelta:S,maxDelta:C}=fe(c,a.startSizes,a.index,k),B=re(R,S,C),v=[...a.startSizes];v[a.index]+=B,v[a.index+1]-=B,I.current=v,p?A(te(v,a.index,M)):(D(v),m?.(v))},i=()=>{const s=I.current;s&&(D(s),f?.(s),p&&m?.(s)),X.current=null,I.current=null,Q(null),A(null)};return window.addEventListener("pointermove",t),window.addEventListener("pointerup",i,{once:!0}),()=>{window.removeEventListener("pointermove",t),window.removeEventListener("pointerup",i)}},[$,p,m,f,c,y]);const ee=K.length===c.length?K:O(T()),pe=(t,i)=>{if(V||!c[i]?.resizable||!c[i+1]?.resizable)return;t.preventDefault();const s=T(),a=U(ee,c,s);X.current={index:i,startPoint:y==="horizontal"?t.clientX:t.clientY,startSizes:a},I.current=a,Q(i),p&&A(te(a,i,M)),Y?.(a),t.currentTarget.setPointerCapture?.(t.pointerId)},he=t=>{if(!N||V)return;const i=T(),s=O(i);D(s),E?.(t),m?.(s),f?.(s)};return e.jsxs("div",{ref:de,className:F("cinna-splitter",`cinna-splitter--${y}`,V&&"cinna-splitter--disabled",p&&"cinna-splitter--lazy",le),style:{"--cinna-splitter-dragger-size":oe,"--cinna-splitter-divider-color":z?.color,"--cinna-splitter-line-thickness":ce,...se},...ae,children:[c.map((t,i)=>{const s=!!(V||!t.resizable||!c[i+1]?.resizable),a={"--cinna-splitter-panel-size":`${ee[i]??0}px`,...t.style};return e.jsxs(_.Fragment,{children:[e.jsx("div",{className:F("cinna-splitter__panel",t.className),style:a,children:t.children}),i<c.length-1&&e.jsx("button",{type:"button",className:F("cinna-splitter__dragger",z?.dashed!==!1&&"cinna-splitter__dragger--dashed",$===i&&"cinna-splitter__dragger--active",s&&"cinna-splitter__dragger--disabled",z?.className),style:z?.style,role:"separator","aria-label":"Resize panels","aria-orientation":y==="horizontal"?"vertical":"horizontal","aria-disabled":s||void 0,onPointerDown:k=>pe(k,i),onDoubleClick:()=>he(i),children:e.jsx("span",{"aria-hidden":"true"})})]},t.key)}),p&&$!==null&&Z!==null&&e.jsx("span",{className:"cinna-splitter__preview",style:{"--cinna-splitter-preview-position":`${Z}px`},"aria-hidden":"true"})]})});ne.displayName="Splitter";const o=Object.assign(ne,{Panel:J}),u={display:"grid",alignContent:"start",gap:8},Pe={examples:[{id:"basic-splitter",zh:{title:"基本用法",description:"使用 Splitter.Panel 定义面板，拖动中间分割线调整左右区域大小。",codeToggle:"查看基本用法代码"},en:{title:"Basic splitter",description:"Use Splitter.Panel for panels and drag the separator to resize the left and right areas.",codeToggle:"View basic splitter code"},code:`import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter>
    <Splitter.Panel defaultSize="38%" min={140}>
      Project list
    </Splitter.Panel>
    <Splitter.Panel min={180}>
      Workspace
    </Splitter.Panel>
  </Splitter>
);`,render:()=>e.jsxs(o,{children:[e.jsx(o.Panel,{defaultSize:"38%",min:140,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Project list"}),e.jsx(n,{tone:"secondary",children:"Drag the separator to resize."})]})}),e.jsx(o.Panel,{min:180,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Workspace"}),e.jsx(n,{tone:"secondary",children:"The content area keeps its minimum width."})]})})]})},{id:"vertical-splitter",zh:{title:"垂直方向",description:'orientation="vertical" 可改为上下分割，拖动横向分割线调整高度。',codeToggle:"查看垂直方向代码"},en:{title:"Vertical direction",description:'Use orientation="vertical" to split top and bottom areas by height.',codeToggle:"View vertical splitter code"},code:`import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter orientation="vertical" style={{ height: 300 }}>
    <Splitter.Panel defaultSize="44%" min={96}>
      Preview
    </Splitter.Panel>
    <Splitter.Panel min={96}>
      Notes
    </Splitter.Panel>
  </Splitter>
);`,render:()=>e.jsxs(o,{orientation:"vertical",style:{height:300},children:[e.jsx(o.Panel,{defaultSize:"44%",min:96,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Preview"}),e.jsx(n,{tone:"secondary",children:"Top panel."})]})}),e.jsx(o.Panel,{min:96,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Notes"}),e.jsx(n,{tone:"secondary",children:"Bottom panel."})]})})]})},{id:"disabled-splitter",zh:{title:"禁用拖拽",description:"设置 disabled 可禁用全部分割线；设置 Panel 的 resizable={false} 可禁用相邻分割线。",codeToggle:"查看禁用拖拽代码"},en:{title:"Disabled drag",description:"Use disabled for every separator, or resizable={false} on a panel to disable the adjacent separator.",codeToggle:"View disabled drag code"},code:`import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter>
    <Splitter.Panel defaultSize="42%" resizable={false}>
      Locked panel
    </Splitter.Panel>
    <Splitter.Panel>
      Stable panel
    </Splitter.Panel>
  </Splitter>
);`,render:()=>e.jsxs(o,{children:[e.jsx(o.Panel,{defaultSize:"42%",resizable:!1,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Locked panel"}),e.jsx(n,{tone:"secondary",children:"This side disables the adjacent dragger."})]})}),e.jsx(o.Panel,{children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Stable panel"}),e.jsx(n,{tone:"secondary",children:"The separator shows a disabled state."})]})})]})},{id:"complex-splitter",zh:{title:"复杂组合",description:"嵌套水平与垂直 Splitter，可组合出编辑器、预览区和侧边栏。",codeToggle:"查看复杂组合代码"},en:{title:"Complex composition",description:"Nest horizontal and vertical splitters to compose editors, previews, and side panels.",codeToggle:"View complex composition code"},code:`import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter style={{ height: 320 }}>
    <Splitter.Panel defaultSize="30%" min={140}>
      Navigator
    </Splitter.Panel>
    <Splitter.Panel min={260}>
      <Splitter orientation="vertical">
        <Splitter.Panel defaultSize="58%" min={120}>
          Editor
        </Splitter.Panel>
        <Splitter.Panel min={96}>
          Console
        </Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);`,render:()=>e.jsxs(o,{style:{height:320},children:[e.jsx(o.Panel,{defaultSize:"30%",min:140,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Navigator"}),e.jsx(n,{tone:"secondary",children:"Left-right drag."})]})}),e.jsx(o.Panel,{min:260,children:e.jsxs(o,{orientation:"vertical",style:{height:"100%"},children:[e.jsx(o.Panel,{defaultSize:"58%",min:120,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Editor"}),e.jsx(n,{tone:"secondary",children:"Top-bottom drag."})]})}),e.jsx(o.Panel,{min:96,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Console"}),e.jsx(n,{tone:"secondary",children:"Nested panel."})]})})]})})]})},{id:"lazy-splitter",zh:{title:"延迟渲染",description:"lazy 模式会在拖动时显示预览分割线，松开后再提交尺寸变化，减少重复渲染。",codeToggle:"查看延迟渲染代码"},en:{title:"Lazy rendering",description:"With lazy enabled, a preview separator is shown while size updates are committed after release.",codeToggle:"View lazy resize code"},code:`import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter lazy>
    <Splitter.Panel defaultSize="46%" min={160}>
      Heavy chart
    </Splitter.Panel>
    <Splitter.Panel min={160}>
      Detail table
    </Splitter.Panel>
  </Splitter>
);`,render:()=>e.jsxs(o,{lazy:!0,children:[e.jsx(o.Panel,{defaultSize:"46%",min:160,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Heavy chart"}),e.jsx(n,{tone:"secondary",children:"Rendering waits until pointer release."})]})}),e.jsx(o.Panel,{min:160,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Detail table"}),e.jsx(n,{tone:"secondary",children:"Useful for heavier content."})]})})]})},{id:"custom-divider-splitter",zh:{title:"自定义分割线",description:"divider 可控制颜色、虚实线、线条厚度和可拖动区域宽度；分割线不承载文字。",codeToggle:"查看自定义分割线代码"},en:{title:"Custom separator",description:"Use divider for color, line style, thickness, and hit area; the separator does not carry text.",codeToggle:"View custom separator code"},code:`import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter divider={{ color: '#73c4e0', dashed: false, thickness: 3, size: 18 }}>
    <Splitter.Panel defaultSize="45%" min={150}>
      Left panel
    </Splitter.Panel>
    <Splitter.Panel min={150}>
      Right panel
    </Splitter.Panel>
  </Splitter>
);`,render:()=>e.jsxs(o,{divider:{color:"#73c4e0",dashed:!1,thickness:3,size:18},children:[e.jsx(o.Panel,{defaultSize:"45%",min:150,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Left panel"}),e.jsx(n,{tone:"secondary",children:"Custom color and line thickness."})]})}),e.jsx(o.Panel,{min:150,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Right panel"}),e.jsx(n,{tone:"secondary",children:"No text is placed inside the separator."})]})})]})},{id:"double-click-reset-splitter",zh:{title:"双击重置",description:"默认支持双击分割线恢复初始尺寸，也可以通过 resetOnDoubleClick 关闭。",codeToggle:"查看双击重置代码"},en:{title:"Double-click reset",description:"Double-click the separator to restore initial sizes, or disable it with resetOnDoubleClick.",codeToggle:"View double-click reset code"},code:`import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter>
    <Splitter.Panel defaultSize="34%" min={130}>
      Source
    </Splitter.Panel>
    <Splitter.Panel min={180}>
      Result
    </Splitter.Panel>
  </Splitter>
);`,render:()=>e.jsxs(o,{children:[e.jsx(o.Panel,{defaultSize:"34%",min:130,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Source"}),e.jsx(n,{tone:"secondary",children:"Double-click the separator."})]})}),e.jsx(o.Panel,{min:180,children:e.jsxs("div",{style:u,children:[e.jsx(n,{strong:!0,children:"Result"}),e.jsx(n,{tone:"secondary",children:"The panels reset to their defaults."})]})})]})}]};export{Pe as splitterDoc};
