import{j as e,R as o}from"./index-BZKQtVdI.js";import{C as t}from"./index-DPH5M6AF.js";import{T as d}from"./index-C-WBHfFC.js";import{S as l}from"./index-CGJnK8xI.js";import{T as i}from"./index-PYGa7LZ7.js";const m={examples:[{id:"basic-calendar",zh:{title:"基本日历",description:"Calendar 默认展示当前月份，也可以通过 defaultValue 指定初始日期。",codeToggle:"查看基本日历代码"},en:{title:"Basic calendar",description:"Calendar shows the current month by default, or use defaultValue for the initial date.",codeToggle:"View basic calendar code"},code:`import { Calendar } from '@cinna-design/react';

export default () => <Calendar defaultValue={new Date(2026, 5, 15)} />;`,render:()=>e.jsx(t,{defaultValue:new Date(2026,5,15)})},{id:"calendar-controlled",zh:{title:"受控日期",description:"value 与 onChange 可用于接入外部日期状态。",codeToggle:"查看受控日期代码"},en:{title:"Controlled date",description:"Use value and onChange to connect the selected date to external state.",codeToggle:"View controlled date code"},code:`import { Calendar, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [date, setDate] = useState(new Date(2026, 5, 15));

  return (
    <Space direction="vertical" align="flex-start">
      <Calendar value={date} onChange={setDate} />
      <Text tone="secondary">Selected: {date.toLocaleDateString()}</Text>
    </Space>
  );
};`,render:()=>{const a=()=>{const[n,r]=o.useState(new Date(2026,5,15));return e.jsxs(l,{direction:"vertical",align:"flex-start",children:[e.jsx(t,{value:n,onChange:r}),e.jsxs(i,{tone:"secondary",children:["Selected: ",n.toLocaleDateString()]})]})};return e.jsx(a,{})}},{id:"calendar-month-navigation",zh:{title:"月份切换",description:"默认头部提供上月和下月按钮，切换月份时也会触发 onChange。",codeToggle:"查看月份切换代码"},en:{title:"Month navigation",description:"The default header includes previous and next buttons, and month changes trigger onChange.",codeToggle:"View month navigation code"},code:`import { Calendar } from '@cinna-design/react';

export default () => (
  <Calendar
    defaultValue={new Date(2026, 0, 1)}
    onChange={(date) => console.log(date)}
  />
);`,render:()=>e.jsx(t,{defaultValue:new Date(2026,0,1),onChange:()=>{}})},{id:"calendar-custom-header",zh:{title:"自定义头部",description:"headerRender 可替换默认头部内容，展示当前日历上下文。",codeToggle:"查看自定义头部代码"},en:{title:"Custom header",description:"headerRender replaces the default header with current calendar context.",codeToggle:"View custom header code"},code:`import { Calendar, Tag } from '@cinna-design/react';

export default () => (
  <Calendar
    defaultValue={new Date(2026, 5, 15)}
    headerRender={(date) => (
      <>
        <strong>{date.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</strong>
        <Tag color="butter">Custom</Tag>
      </>
    )}
  />
);`,render:()=>e.jsx(t,{defaultValue:new Date(2026,5,15),headerRender:a=>e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:a.toLocaleString(void 0,{month:"long",year:"numeric"})}),e.jsx(d,{color:"butter",children:"Custom"})]})})},{id:"calendar-fullscreen",zh:{title:"撑满容器",description:"fullscreen 会让日历占满容器宽度，适合嵌入面板或详情区。",codeToggle:"查看撑满容器代码"},en:{title:"Fill container",description:"fullscreen makes the calendar fill its container width for panels or detail sections.",codeToggle:"View fullscreen code"},code:`import { Calendar } from '@cinna-design/react';

export default () => (
  <div style={{ width: 'min(620px, 100%)' }}>
    <Calendar fullscreen defaultValue={new Date(2026, 5, 15)} />
  </div>
);`,render:()=>e.jsx("div",{style:{width:"min(620px, 100%)"},children:e.jsx(t,{fullscreen:!0,defaultValue:new Date(2026,5,15)})})}]};export{m as calendarDoc};
