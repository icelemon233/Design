import{R as j,r as u,j as e,I as x,c as f}from"./index-_8eXcLz2.js";import{S as M}from"./index-n3tSMIzx.js";import{T as k}from"./index-BAwLJX5K.js";const l=j.forwardRef(({items:o,autoplay:t,autoplaySpeed:d=2600,defaultActiveIndex:N=0,activeIndex:c,pauseOnHover:w=!0,dots:C=!0,arrows:y=!0,afterChange:m,className:b,onMouseEnter:S,onMouseLeave:T,...p},A)=>{const[_,v]=u.useState(N),[h,g]=u.useState(!1),r=Math.max(o.length,1),i=Math.max(0,Math.min(r-1,c??_));u.useEffect(()=>{c===void 0&&v(s=>Math.max(0,Math.min(r-1,s)))},[r,c]);const n=s=>{const a=(s+r)%r;c===void 0&&v(a),m?.(a)};return u.useEffect(()=>{if(!t||h||r<=1)return;const s=window.setInterval(()=>{n(i+1)},d);return()=>window.clearInterval(s)},[i,c,m,t,d,r,h]),e.jsxs("div",{ref:A,role:"region","aria-roledescription":"carousel","aria-label":p["aria-label"]??"Carousel",className:f("cinna-carousel",b),onMouseEnter:s=>{w&&g(!0),S?.(s)},onMouseLeave:s=>{g(!1),T?.(s)},...p,children:[e.jsx("div",{className:"cinna-carousel__viewport",children:e.jsx("div",{className:"cinna-carousel__track",style:{transform:`translateX(-${i*100}%)`},children:o.map((s,a)=>e.jsx("div",{className:"cinna-carousel__item",role:"group","aria-roledescription":"slide","aria-label":`${a+1} / ${o.length}`,"aria-hidden":a!==i,...a!==i?{inert:""}:{},children:s},a))})}),y&&o.length>1&&e.jsxs("span",{className:"cinna-carousel__arrows",children:[e.jsx("button",{type:"button","aria-label":"Previous slide",onClick:()=>n(i-1),children:e.jsx(x,{name:"chevron-left",size:14})}),e.jsx("button",{type:"button","aria-label":"Next slide",onClick:()=>n(i+1),children:e.jsx(x,{name:"chevron-right",size:14})})]}),C&&o.length>1&&e.jsx("span",{className:"cinna-carousel__dots",children:o.map((s,a)=>e.jsx("button",{type:"button","aria-label":`Go to slide ${a+1}`,className:f(a===i&&"cinna-carousel__dot--active"),onClick:()=>n(a)},a))})]})});l.displayName="Carousel";const R={examples:[{id:"basic-carousel",zh:{title:"基本轮播",description:"items 传入一组同级内容，Carousel 会以横向轮播方式展示。",codeToggle:"查看基本轮播代码"},en:{title:"Basic carousel",description:"Pass peer content through items and Carousel will show it as a horizontal carousel.",codeToggle:"View basic carousel code"},code:`import { Carousel } from '@cinna-design/react';

const slides = ['Cloud cake', 'Berry soda', 'Mint tart'];

export default () => (
  <Carousel
    items={slides.map((title) => (
      <div className="demo-carousel-slide">{title}</div>
    ))}
  />
);`,render:()=>{const o=["Cloud cake","Berry soda","Mint tart"];return e.jsx(l,{items:o.map(t=>e.jsx("div",{className:"demo-carousel-slide",children:t},t))})}},{id:"carousel-autoplay",zh:{title:"自动切换",description:"autoplay 开启定时切换，autoplaySpeed 控制每次切换间隔。",codeToggle:"查看自动切换代码"},en:{title:"Autoplay",description:"Use autoplay for timed switching and autoplaySpeed for the interval.",codeToggle:"View autoplay carousel code"},code:`import { Carousel } from '@cinna-design/react';

export default () => (
  <Carousel
    autoplay
    autoplaySpeed={1800}
    items={[
      <div className="demo-carousel-slide">Morning batch</div>,
      <div className="demo-carousel-slide">Afternoon tasting</div>,
      <div className="demo-carousel-slide">Evening pickup</div>,
    ]}
  />
);`,render:()=>e.jsx(l,{autoplay:!0,autoplaySpeed:1800,items:[e.jsx("div",{className:"demo-carousel-slide",children:"Morning batch"},"morning"),e.jsx("div",{className:"demo-carousel-slide",children:"Afternoon tasting"},"afternoon"),e.jsx("div",{className:"demo-carousel-slide",children:"Evening pickup"},"evening")]})},{id:"carousel-arrows",zh:{title:"切换箭头",description:"arrows 控制左右切换按钮，适合需要明确手动翻页的内容区。",codeToggle:"查看切换箭头代码"},en:{title:"Arrows",description:"Use arrows to show previous and next controls for manual switching.",codeToggle:"View carousel arrows code"},code:`import { Carousel } from '@cinna-design/react';

export default () => (
  <Carousel
    arrows
    items={[
      <div className="demo-carousel-slide">Recipe card</div>,
      <div className="demo-carousel-slide">Prep notes</div>,
      <div className="demo-carousel-slide">Delivery window</div>,
    ]}
  />
);`,render:()=>e.jsx(l,{arrows:!0,items:[e.jsx("div",{className:"demo-carousel-slide",children:"Recipe card"},"recipe"),e.jsx("div",{className:"demo-carousel-slide",children:"Prep notes"},"prep"),e.jsx("div",{className:"demo-carousel-slide",children:"Delivery window"},"delivery")]})},{id:"carousel-dots",zh:{title:"指示点",description:"dots 控制底部指示点，可在更紧凑的区域里关闭。",codeToggle:"查看指示点代码"},en:{title:"Dots",description:"Use dots to control bottom indicators, or hide them in compact areas.",codeToggle:"View carousel dots code"},code:`import { Carousel } from '@cinna-design/react';

export default () => (
  <Carousel
    dots={false}
    items={[
      <div className="demo-carousel-slide">Dense panel</div>,
      <div className="demo-carousel-slide">Quiet update</div>,
    ]}
  />
);`,render:()=>e.jsx(l,{dots:!1,items:[e.jsx("div",{className:"demo-carousel-slide",children:"Dense panel"},"dense"),e.jsx("div",{className:"demo-carousel-slide",children:"Quiet update"},"quiet")]})},{id:"carousel-after-change",zh:{title:"初始页与回调",description:"defaultActiveIndex 设置初始页，afterChange 在页签切换后返回当前索引。",codeToggle:"查看初始页与回调代码"},en:{title:"Initial slide and callback",description:"defaultActiveIndex sets the initial slide and afterChange returns the active index.",codeToggle:"View initial slide code"},code:`import { Carousel, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [active, setActive] = useState(1);

  return (
    <>
      <Carousel
        defaultActiveIndex={1}
        afterChange={setActive}
        items={[
          <div className="demo-carousel-slide">Step 1</div>,
          <div className="demo-carousel-slide">Step 2</div>,
          <div className="demo-carousel-slide">Step 3</div>,
        ]}
      />
      <Text tone="secondary">Active slide: {active + 1}</Text>
    </>
  );
};`,render:()=>{const o=()=>{const[t,d]=j.useState(1);return e.jsxs(M,{direction:"vertical",align:"stretch",children:[e.jsx(l,{defaultActiveIndex:1,afterChange:d,items:[e.jsx("div",{className:"demo-carousel-slide",children:"Step 1"},"step-1"),e.jsx("div",{className:"demo-carousel-slide",children:"Step 2"},"step-2"),e.jsx("div",{className:"demo-carousel-slide",children:"Step 3"},"step-3")]}),e.jsxs(k,{tone:"secondary",children:["Active slide: ",t+1]})]})};return e.jsx(o,{})}}]};export{R as carouselDoc};
