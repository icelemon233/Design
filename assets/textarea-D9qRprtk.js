import{j as e}from"./index-_8eXcLz2.js";import{T as t}from"./index-Bqn4McjG.js";import{S as a}from"./index-n3tSMIzx.js";import"./useIsomorphicLayoutEffect-Clyg1nNa.js";const l={examples:[{id:"basic-textarea",zh:{title:"基本用法",description:"用于收集备注、说明和多行文本。",codeToggle:"查看基本用法代码"},en:{title:"Basic textarea",description:"Use it for notes, descriptions, and multiline text.",codeToggle:"View basic textarea code"},code:`import { TextArea } from '@cinna-design/react';

export default () => (
  <TextArea placeholder="Write a release note..." rows={4} />
);`,render:()=>e.jsx("div",{style:{width:"min(480px, 100%)"},children:e.jsx(t,{placeholder:"Write a release note...",rows:4})})},{id:"textarea-autosize",zh:{title:"自适应高度",description:"autoSize 让文本域随内容高度自然扩展。",codeToggle:"查看自适应高度代码"},en:{title:"Auto size",description:"autoSize lets the textarea grow with its content.",codeToggle:"View auto size code"},code:`import { TextArea } from '@cinna-design/react';

export default () => (
  <TextArea
    autoSize
    defaultValue={'First line\\nSecond line\\nThird line'}
  />
);`,render:()=>e.jsx("div",{style:{width:"min(480px, 100%)"},children:e.jsx(t,{autoSize:!0,defaultValue:`First line
Second line
Third line`})})},{id:"textarea-count",zh:{title:"字数统计",description:"showCount 与 maxLength 组合展示当前输入长度。",codeToggle:"查看字数统计代码"},en:{title:"Character count",description:"Combine showCount and maxLength to display current length.",codeToggle:"View character count code"},code:`import { TextArea } from '@cinna-design/react';

export default () => (
  <TextArea
    showCount
    maxLength={120}
    defaultValue="Tiny release notes keep the changelog readable."
  />
);`,render:()=>e.jsx("div",{style:{width:"min(480px, 100%)"},children:e.jsx(t,{showCount:!0,maxLength:120,defaultValue:"Tiny release notes keep the changelog readable."})})},{id:"textarea-status",zh:{title:"校验状态",description:"status 用于表达错误或警告状态。",codeToggle:"查看校验状态代码"},en:{title:"Validation status",description:"Use status to show error or warning feedback.",codeToggle:"View validation status code"},code:`import { Space, TextArea } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: 'min(480px, 100%)' }}>
    <TextArea status="warning" defaultValue="The summary is a little long." />
    <TextArea status="error" defaultValue="Missing approval reason." />
  </Space>
);`,render:()=>e.jsxs(a,{direction:"vertical",align:"stretch",style:{width:"min(480px, 100%)"},children:[e.jsx(t,{status:"warning",defaultValue:"The summary is a little long."}),e.jsx(t,{status:"error",defaultValue:"Missing approval reason."})]})},{id:"textarea-native-props",zh:{title:"原生属性",description:"TextArea 继承原生 textarea 属性，可直接使用 disabled、readOnly、placeholder 等能力。",codeToggle:"查看原生属性代码"},en:{title:"Native attributes",description:"TextArea extends native textarea attributes such as disabled, readOnly, and placeholder.",codeToggle:"View native attributes code"},code:`import { Space, TextArea } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: 'min(480px, 100%)' }}>
    <TextArea readOnly defaultValue="Read-only audit note." />
    <TextArea disabled placeholder="Disabled note" />
  </Space>
);`,render:()=>e.jsxs(a,{direction:"vertical",align:"stretch",style:{width:"min(480px, 100%)"},children:[e.jsx(t,{readOnly:!0,defaultValue:"Read-only audit note."}),e.jsx(t,{disabled:!0,placeholder:"Disabled note"})]})}]};export{l as textareaDoc};
