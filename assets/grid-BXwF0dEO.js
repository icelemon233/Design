import{R as h,j as e,c as v}from"./index-Ce0SFtqJ.js";import{S as m}from"./index-CJ3PbIrN.js";import{T as y}from"./index-DMVNuElq.js";import{S as j}from"./index-uDOdgjAv.js";const w={small:"8px",medium:"16px",large:"24px"},b=(r,t)=>r===void 0?t:typeof r=="number"?`${r}px`:r,f=(r,t)=>r===void 0?t:typeof r=="number"?`${r}px`:w[r]??r,R=(r,t="16px")=>{if(Array.isArray(r))return[f(r[0],t),f(r[1],t)];const n=f(r,t);return[n,n]},k=r=>Array.isArray(r)?[f(r[0],"0px"),f(r[1],"0px")]:[f(r,"0px"),"0px"],S=(r,t)=>t!==void 0?`repeat(auto-fit, minmax(${b(t,"220px")}, 1fr))`:typeof r=="number"?`repeat(${Math.max(1,Math.floor(r))}, minmax(0, 1fr))`:r??"repeat(1, minmax(0, 1fr))",C=h.forwardRef(({columns:r=1,gap:t="medium",minColumnWidth:n,inline:d,className:o,style:p,...g},u)=>{const[c,x]=R(t);return e.jsx("div",{ref:u,className:v("cinna-grid",d&&"cinna-grid--inline",o),style:{"--cinna-grid-template":S(r,n),"--cinna-grid-gap-x":c,"--cinna-grid-gap-y":x,...p},...g})});C.displayName="Grid";const a=h.forwardRef(({gutter:r=0,align:t,justify:n,wrap:d=!0,className:o,style:p,...g},u)=>{const[c,x]=k(r);return e.jsx("div",{ref:u,className:v("cinna-row",!d&&"cinna-row--nowrap",o),style:{alignItems:t,justifyContent:n,rowGap:x,"--cinna-row-gutter-x":c,...p},...g})});a.displayName="Row";const l=h.forwardRef(({span:r=24,offset:t=0,order:n,flex:d,className:o,style:p,...g},u)=>{const c=`${r/24*100}%`,x=d===void 0?{flex:"0 0 auto",flexBasis:c,maxWidth:c}:{flex:d};return e.jsx("div",{ref:u,className:v("cinna-col",o),style:{...x,marginLeft:t?`${t/24*100}%`:void 0,order:n,...p},...g})});l.displayName="Col";const z={minHeight:48,padding:"14px 16px",borderRadius:16,fontWeight:900},i=(r,t)=>({...z,...t?{minHeight:t}:null,background:r}),s=["#f0fafe","#fff8ee","#f7ffe8","#fff1f4","#f7f2ff","#eef8ff"],T=Array.from({length:24},(r,t)=>t+1),G=()=>{const[r,t]=h.useState(24),[n,d]=h.useState(16);return e.jsxs(m,{direction:"vertical",block:!0,size:"large",children:[e.jsxs(m,{direction:"vertical",block:!0,children:[e.jsxs(y,{strong:!0,children:["Horizontal gutter: ",r,"px"]}),e.jsx(j,{min:0,max:48,step:1,value:r,onChange:o=>t(Number(o.currentTarget.value)),marks:{0:"0",24:"24",48:"48"}})]}),e.jsxs(m,{direction:"vertical",block:!0,children:[e.jsxs(y,{strong:!0,children:["Vertical gutter: ",n,"px"]}),e.jsx(j,{min:0,max:40,step:1,value:n,onChange:o=>d(Number(o.currentTarget.value)),marks:{0:"0",16:"16",40:"40"}})]}),e.jsx(a,{gutter:[r,n],children:T.map(o=>e.jsx(l,{span:4,children:e.jsx("div",{style:i(s[(o-1)%s.length]),children:o})},o))})]})},W={examples:[{id:"row-col-gutter",zh:{title:"Row、Col 与 gutter",description:"Row 是一行，Col 是列，Col 的 span 按 24 等分计算；gutter 是列之间的留白，常用 16、24、32，密集工具区可用 8。",codeToggle:"查看 Row、Col 与 gutter 代码"},en:{title:"Row, Col, and gutter",description:"Row creates a line, Col creates columns, and span is measured on a 24-column grid. Use gutter for column spacing: 16, 24, 32 are comfortable; 8 fits dense tool areas.",codeToggle:"View Row, Col, and gutter code"},code:`import { Col, Row } from '@cinna-design/react';

const cell = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

export default () => (
  <Row gutter={16}>
    <Col span={12}><div style={{ ...cell, background: '#f0fafe' }}>span 12</div></Col>
    <Col span={8}><div style={{ ...cell, background: '#fff8ee' }}>span 8</div></Col>
    <Col span={4}><div style={{ ...cell, background: '#fff1f4' }}>span 4</div></Col>
  </Row>
);`,render:()=>e.jsxs(a,{gutter:16,children:[e.jsx(l,{span:12,children:e.jsx("div",{style:i("#f0fafe"),children:"span 12"})}),e.jsx(l,{span:8,children:e.jsx("div",{style:i("#fff8ee"),children:"span 8"})}),e.jsx(l,{span:4,children:e.jsx("div",{style:i("#fff1f4"),children:"span 4"})})]})},{id:"grid-gutter",zh:{title:"水平与垂直间距",description:"gutter 可传入数字或 CSS 长度；需要行间距时使用 [水平间距, 垂直间距]。内容卡片较多时，24/16 是比较稳妥的组合。",codeToggle:"查看间距代码"},en:{title:"Horizontal and vertical gutters",description:"gutter accepts a number or CSS length. Use [horizontal, vertical] when rows also need spacing; 24/16 is a steady choice for card-heavy layouts.",codeToggle:"View gutter code"},code:`import { Col, Row } from '@cinna-design/react';

const cell = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

export default () => (
  <Row gutter={[24, 16]}>
    <Col span={6}><div style={{ ...cell, background: '#f0fafe' }}>A</div></Col>
    <Col span={6}><div style={{ ...cell, background: '#fff8ee' }}>B</div></Col>
    <Col span={6}><div style={{ ...cell, background: '#f7ffe8' }}>C</div></Col>
    <Col span={6}><div style={{ ...cell, background: '#fff1f4' }}>D</div></Col>
    <Col span={8}><div style={{ ...cell, background: '#f7f2ff' }}>E</div></Col>
    <Col span={8}><div style={{ ...cell, background: '#eef8ff' }}>F</div></Col>
  </Row>
);`,render:()=>e.jsxs(a,{gutter:[24,16],children:[e.jsx(l,{span:6,children:e.jsx("div",{style:i(s[0]),children:"A"})}),e.jsx(l,{span:6,children:e.jsx("div",{style:i(s[1]),children:"B"})}),e.jsx(l,{span:6,children:e.jsx("div",{style:i(s[2]),children:"C"})}),e.jsx(l,{span:6,children:e.jsx("div",{style:i(s[3]),children:"D"})}),e.jsx(l,{span:8,children:e.jsx("div",{style:i(s[4]),children:"E"})}),e.jsx(l,{span:8,children:e.jsx("div",{style:i(s[5]),children:"F"})})]})},{id:"grid-gutter-slider",zh:{title:"动态调整 gutter",description:"用滑动输入条观察水平和垂直 gutter 对栅格的影响；这里固定展示四行六列，每列 span 为 4。",codeToggle:"查看动态 gutter 代码"},en:{title:"Adjust gutter dynamically",description:"Use sliders to see how horizontal and vertical gutters affect the grid. This demo keeps four rows and six columns, with span 4 for every column.",codeToggle:"View dynamic gutter code"},code:`import { Col, Row, Slider, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

const cell = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

const palette = ['#f0fafe', '#fff8ee', '#f7ffe8', '#fff1f4', '#f7f2ff', '#eef8ff'];
const cells = Array.from({ length: 24 }, (_, index) => index + 1);

export default () => {
  const [horizontal, setHorizontal] = useState(24);
  const [vertical, setVertical] = useState(16);

  return (
    <Space direction="vertical" block size="large">
      <Space direction="vertical" block>
        <Text strong>Horizontal gutter: {horizontal}px</Text>
        <Slider min={0} max={48} step={1} value={horizontal} onChange={(event) => setHorizontal(Number(event.currentTarget.value))} />
      </Space>
      <Space direction="vertical" block>
        <Text strong>Vertical gutter: {vertical}px</Text>
        <Slider min={0} max={40} step={1} value={vertical} onChange={(event) => setVertical(Number(event.currentTarget.value))} />
      </Space>
      <Row gutter={[horizontal, vertical]}>
        {cells.map((item) => (
          <Col key={item} span={4}>
            <div style={{ ...cell, background: palette[(item - 1) % palette.length] }}>{item}</div>
          </Col>
        ))}
      </Row>
    </Space>
  );
};`,render:()=>e.jsx(G,{})},{id:"grid-offset-order",zh:{title:"偏移与排序",description:"offset 用来在左侧留出栅格空位，order 用来调整视觉顺序。它们适合少量重点布局，不建议替代内容本身的自然顺序。",codeToggle:"查看偏移与排序代码"},en:{title:"Offset and order",description:"Use offset to reserve grid space on the left, and order to adjust visual order. They are best for small layout adjustments.",codeToggle:"View offset and order code"},code:`import { Col, Row, Space } from '@cinna-design/react';

const cell = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

export default () => (
  <Space direction="vertical" block size="large">
    <Row gutter={16}>
      <Col span={8} offset={4}><div style={{ ...cell, background: '#f0fafe' }}>offset 4 / span 8</div></Col>
      <Col span={8}><div style={{ ...cell, background: '#fff8ee' }}>span 8</div></Col>
    </Row>
    <Row gutter={16}>
      <Col span={6} order={3}><div style={{ ...cell, background: '#f0fafe' }}>1 / order 3</div></Col>
      <Col span={6} order={2}><div style={{ ...cell, background: '#fff8ee' }}>2 / order 2</div></Col>
      <Col span={6} order={1}><div style={{ ...cell, background: '#f7ffe8' }}>3 / order 1</div></Col>
    </Row>
  </Space>
);`,render:()=>e.jsxs(m,{direction:"vertical",block:!0,size:"large",children:[e.jsxs(a,{gutter:16,children:[e.jsx(l,{span:8,offset:4,children:e.jsx("div",{style:i("#f0fafe"),children:"offset 4 / span 8"})}),e.jsx(l,{span:8,children:e.jsx("div",{style:i("#fff8ee"),children:"span 8"})})]}),e.jsxs(a,{gutter:16,children:[e.jsx(l,{span:6,order:3,children:e.jsx("div",{style:i("#f0fafe"),children:"1 / order 3"})}),e.jsx(l,{span:6,order:2,children:e.jsx("div",{style:i("#fff8ee"),children:"2 / order 2"})}),e.jsx(l,{span:6,order:1,children:e.jsx("div",{style:i("#f7ffe8"),children:"3 / order 1"})})]})]})},{id:"grid-align-flex",zh:{title:"对齐与弹性填充",description:"Row 的 justify 和 align 控制排列；Col 的 flex 可让某一列吸收剩余空间，适合工具栏或详情页头部。",codeToggle:"查看对齐与填充代码"},en:{title:"Alignment and flexible fill",description:"Use Row justify and align for placement, and Col flex when one column should absorb the remaining space.",codeToggle:"View alignment and fill code"},code:`import { Col, Row } from '@cinna-design/react';

const cell = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

export default () => (
  <Row gutter={16} align="stretch" style={{ padding: 12, borderRadius: 18, background: '#fffcf6' }}>
    <Col flex="120px"><div style={{ ...cell, background: '#f0fafe' }}>120px</div></Col>
    <Col flex="1"><div style={{ ...cell, minHeight: 72, background: '#fff8ee' }}>fills remaining space</div></Col>
    <Col flex="96px"><div style={{ ...cell, background: '#f7ffe8' }}>96px</div></Col>
  </Row>
);`,render:()=>e.jsxs(a,{gutter:16,align:"stretch",style:{padding:12,borderRadius:18,background:"#fffcf6"},children:[e.jsx(l,{flex:"120px",children:e.jsx("div",{style:i("#f0fafe"),children:"120px"})}),e.jsx(l,{flex:"1",children:e.jsx("div",{style:i("#fff8ee",72),children:"fills remaining space"})}),e.jsx(l,{flex:"96px",children:e.jsx("div",{style:i("#f7ffe8"),children:"96px"})})]})},{id:"simple-grid",zh:{title:"更简单的 Grid",description:"只是做等宽卡片或自适应列表时，可以直接用 Grid 声明 columns 和 gap；需要 24 等分、offset、order、flex 时再使用 Row 和 Col。",codeToggle:"查看简单 Grid 代码"},en:{title:"Simpler Grid",description:"For equal-width cards or adaptive lists, use Grid with columns and gap. Switch to Row and Col when you need 24-column spans, offset, order, or flex.",codeToggle:"View simpler Grid code"},code:`import { Grid } from '@cinna-design/react';

const cell = {
  minHeight: 64,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

export default () => (
  <Grid minColumnWidth={180} gap={[24, 16]}>
    <div style={{ ...cell, background: '#f0fafe' }}>Overview</div>
    <div style={{ ...cell, background: '#fff8ee' }}>Metrics</div>
    <div style={{ ...cell, background: '#f7ffe8' }}>Review</div>
    <div style={{ ...cell, background: '#fff1f4' }}>Release</div>
  </Grid>
);`,render:()=>e.jsxs(C,{minColumnWidth:180,gap:[24,16],children:[e.jsx("div",{style:i("#f0fafe",64),children:"Overview"}),e.jsx("div",{style:i("#fff8ee",64),children:"Metrics"}),e.jsx("div",{style:i("#f7ffe8",64),children:"Review"}),e.jsx("div",{style:i("#fff1f4",64),children:"Release"})]})}]};export{W as gridDoc};
