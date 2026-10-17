import{R as p,j as e,c as r}from"./index-42cP9WwP.js";import{T as n}from"./index-Csiu30sr.js";const l=p.forwardRef(({items:t,mode:c="left",reverse:a,pending:o,className:s,...d},m)=>e.jsxs("ol",{ref:m,className:r("cinna-timeline",`cinna-timeline--${c}`,s),...d,children:[(a?[...t].reverse():t).map((i,h)=>e.jsxs("li",{className:r(i.color&&`cinna-timeline__item--${i.color}`),children:[i.label&&e.jsx("em",{children:i.label}),e.jsx("span",{children:i.dot}),e.jsx("div",{children:i.children})]},h)),o&&e.jsxs("li",{className:"cinna-timeline__pending",children:[e.jsx("span",{"aria-hidden":"true",children:"…"}),e.jsx("div",{children:o})]})]}));l.displayName="Timeline";const x={examples:[{id:"basic-timeline",zh:{title:"基本时间轴",description:"items 按顺序展示事件内容，适合串联流程和更新记录。",codeToggle:"查看基本时间轴代码"},en:{title:"Basic timeline",description:"items render events in order for flows and update history.",codeToggle:"View basic timeline code"},code:`import { Timeline } from '@cinna-design/react';

const items = [
  { label: '09:00', children: 'Create component notes' },
  { label: '11:30', children: 'Review API details' },
  { label: '16:00', children: 'Publish docs' },
];

export default () => <Timeline items={items} />;`,render:()=>e.jsx(l,{items:[{label:"09:00",children:"Create component notes"},{label:"11:30",children:"Review API details"},{label:"16:00",children:"Publish docs"}]})},{id:"timeline-colors",zh:{title:"节点颜色",description:"color 支持 blue、butter、strawberry 和 pistachio 四种主题色。",codeToggle:"查看节点颜色代码"},en:{title:"Node colors",description:"color supports blue, butter, strawberry, and pistachio theme dots.",codeToggle:"View node color code"},code:`import { Timeline } from '@cinna-design/react';

export default () => (
  <Timeline
    items={[
      { label: 'Plan', children: 'Scope examples', color: 'blue' },
      { label: 'Check', children: 'Review edge cases', color: 'butter' },
      { label: 'Fix', children: 'Resolve blockers', color: 'strawberry' },
      { label: 'Ship', children: 'Mark as ready', color: 'pistachio' },
    ]}
  />
);`,render:()=>e.jsx(l,{items:[{label:"Plan",children:"Scope examples",color:"blue"},{label:"Check",children:"Review edge cases",color:"butter"},{label:"Fix",children:"Resolve blockers",color:"strawberry"},{label:"Ship",children:"Mark as ready",color:"pistachio"}]})},{id:"timeline-labels",zh:{title:"时间标签",description:"label 可放置时间、阶段名或简短上下文。",codeToggle:"查看时间标签代码"},en:{title:"Time labels",description:"label can hold time, stage names, or short context.",codeToggle:"View label code"},code:`import { Timeline, Text } from '@cinna-design/react';

export default () => (
  <Timeline
    items={[
      { label: 'Draft', children: <Text strong>Write initial content</Text> },
      { label: 'Review', children: <Text tone="secondary">Check true component props</Text> },
    ]}
  />
);`,render:()=>e.jsx(l,{items:[{label:"Draft",children:e.jsx(n,{strong:!0,children:"Write initial content"})},{label:"Review",children:e.jsx(n,{tone:"secondary",children:"Check true component props"})}]})},{id:"timeline-custom-dot",zh:{title:"自定义节点",description:"dot 可替换节点中的内容，用于展示短符号或状态标记。",codeToggle:"查看自定义节点代码"},en:{title:"Custom dot",description:"dot replaces the marker content for short symbols or status marks.",codeToggle:"View custom dot code"},code:`import { Timeline } from '@cinna-design/react';

export default () => (
  <Timeline
    items={[
      { label: 'Start', dot: '1', children: 'Collect component API' },
      { label: 'Done', dot: '✓', color: 'pistachio', children: 'Examples verified' },
    ]}
  />
);`,render:()=>e.jsx(l,{items:[{label:"Start",dot:"1",children:"Collect component API"},{label:"Done",dot:"✓",color:"pistachio",children:"Examples verified"}]})},{id:"timeline-alternate",zh:{title:"交替布局",description:'mode="alternate" 会让相邻节点在左右两侧交替展示。',codeToggle:"查看交替布局代码"},en:{title:"Alternate layout",description:'mode="alternate" alternates neighboring items across both sides.',codeToggle:"View alternate code"},code:`import { Timeline } from '@cinna-design/react';

export default () => (
  <Timeline
    mode="alternate"
    items={[
      { label: 'Morning', children: 'Prepare examples' },
      { label: 'Noon', children: 'Run checks', color: 'butter' },
      { label: 'Evening', children: 'Review page switching', color: 'pistachio' },
    ]}
  />
);`,render:()=>e.jsx(l,{mode:"alternate",items:[{label:"Morning",children:"Prepare examples"},{label:"Noon",children:"Run checks",color:"butter"},{label:"Evening",children:"Review page switching",color:"pistachio"}]})}]};export{x as timelineDoc};
