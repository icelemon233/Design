import{R as l,j as e,c as h,B as t}from"./index-BZKQtVdI.js";import{S as g}from"./index-CGJnK8xI.js";import{C as o}from"./index-3EVt9kje.js";import{T as d}from"./index-PYGa7LZ7.js";const i=l.forwardRef(({offsetTop:a,offsetBottom:s,className:n,style:r,...f},c)=>e.jsx("div",{ref:c,className:h("cinna-affix",n),style:{top:a,bottom:s,...r},...f})),v={examples:[{id:"affix-top",zh:{title:"顶部固钉",description:"offsetTop 用于设置元素吸附到容器顶部时的距离。",codeToggle:"查看顶部固钉代码"},en:{title:"Top affix",description:"Use offsetTop to set the distance from the top edge while sticky.",codeToggle:"View top affix code"},code:`import { Affix, Button } from '@cinna-design/react';

export default () => (
  <div style={{ height: 160, overflow: 'auto', padding: 12, borderRadius: 18, background: '#f0fafe' }}>
    <Affix offsetTop={12}>
      <Button size="small">Sticky top action</Button>
    </Affix>
    <div style={{ height: 240, paddingTop: 24 }}>Scroll this area</div>
  </div>
);`,render:()=>e.jsxs("div",{style:{height:160,overflow:"auto",padding:12,borderRadius:18,background:"#f0fafe"},children:[e.jsx(i,{offsetTop:12,children:e.jsx(t,{size:"small",children:"Sticky top action"})}),e.jsx("div",{style:{height:240,paddingTop:24},children:"Scroll this area"})]})},{id:"affix-bottom",zh:{title:"底部固钉",description:"offsetBottom 用于设置元素吸附到底部时的距离。",codeToggle:"查看底部固钉代码"},en:{title:"Bottom affix",description:"Use offsetBottom to set the distance from the bottom edge while sticky.",codeToggle:"View bottom affix code"},code:`import { Affix, Button } from '@cinna-design/react';

export default () => (
  <div style={{ height: 160, overflow: 'auto', padding: 12, borderRadius: 18, background: '#fff8ee' }}>
    <div style={{ height: 220 }}>Long content</div>
    <Affix offsetBottom={12}>
      <Button size="small" variant="cream">Sticky bottom action</Button>
    </Affix>
  </div>
);`,render:()=>e.jsxs("div",{style:{height:160,overflow:"auto",padding:12,borderRadius:18,background:"#fff8ee"},children:[e.jsx("div",{style:{height:220},children:"Long content"}),e.jsx(i,{offsetBottom:12,children:e.jsx(t,{size:"small",variant:"cream",children:"Sticky bottom action"})})]})},{id:"affix-toolbar",zh:{title:"固定工具条",description:"把常用操作放入 Affix，可以在长内容滚动时保持可见。",codeToggle:"查看固定工具条代码"},en:{title:"Sticky toolbar",description:"Place common actions in Affix so they remain visible while content scrolls.",codeToggle:"View sticky toolbar code"},code:`import { Affix, Button, Space } from '@cinna-design/react';

export default () => (
  <div style={{ height: 170, overflow: 'auto', padding: 12, borderRadius: 18, background: '#fffcf6' }}>
    <Affix offsetTop={8}>
      <Space wrap style={{ padding: 8, borderRadius: 16, background: '#ffffffcc' }}>
        <Button size="small">Save</Button>
        <Button size="small" variant="cream">Preview</Button>
      </Space>
    </Affix>
    <div style={{ height: 240, paddingTop: 28 }}>Editable document content</div>
  </div>
);`,render:()=>e.jsxs("div",{style:{height:170,overflow:"auto",padding:12,borderRadius:18,background:"#fffcf6"},children:[e.jsx(i,{offsetTop:8,children:e.jsxs(g,{wrap:!0,style:{padding:8,borderRadius:16,background:"#ffffffcc"},children:[e.jsx(t,{size:"small",children:"Save"}),e.jsx(t,{size:"small",variant:"cream",children:"Preview"})]})}),e.jsx("div",{style:{height:240,paddingTop:28},children:"Editable document content"})]})},{id:"affix-side-summary",zh:{title:"固定摘要",description:"也可以把提示、目录或摘要放在滚动区域的可视范围内。",codeToggle:"查看固定摘要代码"},en:{title:"Sticky summary",description:"Use it for hints, navigation, or summaries within a scrolling area.",codeToggle:"View sticky summary code"},code:`import { Affix, Card, Text } from '@cinna-design/react';

export default () => (
  <div style={{ height: 210, overflow: 'auto', padding: 14, borderRadius: 18, background: '#f7ffe8' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 220px', gap: 16, alignItems: 'start' }}>
      <div style={{ display: 'grid', gap: 12 }}>
        <Card tone="cream" title="Long review content">
          <Text tone="secondary">Read through the review details in the main column.</Text>
        </Card>
        <Card tone="cream" title="Checklist">
          <Text tone="secondary">Confirm copy, spacing, status, and handoff notes.</Text>
        </Card>
        <div style={{ height: 120 }} />
      </div>
      <Affix offsetTop={12}>
        <Card tone="pistachio" title="Review note">
          <Text tone="secondary">Keep this note visible while reading.</Text>
        </Card>
      </Affix>
    </div>
  </div>
);`,render:()=>e.jsx("div",{style:{height:210,overflow:"auto",padding:14,borderRadius:18,background:"#f7ffe8"},children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(0, 1fr) 220px",gap:16,alignItems:"start"},children:[e.jsxs("div",{style:{display:"grid",gap:12},children:[e.jsx(o,{tone:"cream",title:"Long review content",children:e.jsx(d,{tone:"secondary",children:"Read through the review details in the main column."})}),e.jsx(o,{tone:"cream",title:"Checklist",children:e.jsx(d,{tone:"secondary",children:"Confirm copy, spacing, status, and handoff notes."})}),e.jsx("div",{style:{height:120}})]}),e.jsx(i,{offsetTop:12,children:e.jsx(o,{tone:"pistachio",title:"Review note",children:e.jsx(d,{tone:"secondary",children:"Keep this note visible while reading."})})})]})})}]};export{v as affixDoc};
