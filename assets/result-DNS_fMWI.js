import{R as p,j as e,c as h,B as n}from"./index-Ce0SFtqJ.js";import{s as m}from"./ComponentPage-BW_SxuBs.js";import{S as o}from"./index-CJ3PbIrN.js";import{T as g}from"./index-DMVNuElq.js";const t=p.forwardRef(({status:s="info",title:c,subTitle:i,extra:r,icon:l,className:a,...u},d)=>e.jsxs("div",{ref:d,className:h("cinna-result",`cinna-result--${s}`,a),...u,children:[e.jsx("div",{className:"cinna-result__icon","aria-hidden":"true",children:l??(s==="403"||s==="404"||s==="500"?s:m(s))}),e.jsx("div",{className:"cinna-result__title",children:c}),i&&e.jsx("div",{className:"cinna-result__subtitle",children:i}),r&&e.jsx("div",{className:"cinna-result__extra",children:r})]})),w={examples:[{id:"basic-result",zh:{title:"基础结果",description:"title 展示主要结果，subTitle 展示补充说明。",codeToggle:"查看基础结果代码"},en:{title:"Basic result",description:"title renders the main result and subTitle renders supporting copy.",codeToggle:"View basic result code"},code:`import { Result } from '@cinna-design/react';

export default () => (
  <Result title="All changes saved" subTitle="The draft can be reopened from your workspace." />
);`,render:()=>e.jsx(t,{title:"All changes saved",subTitle:"The draft can be reopened from your workspace."})},{id:"result-status",zh:{title:"状态类型",description:"status 支持 info、success、warning 和 error 四种反馈状态。",codeToggle:"查看状态类型代码"},en:{title:"Status types",description:"status supports info, success, warning, and error feedback states.",codeToggle:"View result status code"},code:`import { Result, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Result status="success" title="Published" />
    <Result status="warning" title="Needs review" />
    <Result status="error" title="Publish failed" />
  </Space>
);`,render:()=>e.jsxs(o,{direction:"vertical",align:"stretch",children:[e.jsx(t,{status:"success",title:"Published"}),e.jsx(t,{status:"warning",title:"Needs review"}),e.jsx(t,{status:"error",title:"Publish failed"})]})},{id:"result-extra",zh:{title:"操作区",description:"extra 可放置按钮，帮助用户继续处理结果后的下一步。",codeToggle:"查看操作区代码"},en:{title:"Actions",description:"Use extra for buttons that help users continue after the result.",codeToggle:"View result actions code"},code:`import { Button, Result, Space } from '@cinna-design/react';

export default () => (
  <Result
    status="success"
    title="Menu published"
    subTitle="Customers can now see the latest seasonal menu."
    extra={
      <Space>
        <Button>Preview</Button>
        <Button variant="primary">Share</Button>
      </Space>
    }
  />
);`,render:()=>e.jsx(t,{status:"success",title:"Menu published",subTitle:"Customers can now see the latest seasonal menu.",extra:e.jsxs(o,{children:[e.jsx(n,{children:"Preview"}),e.jsx(n,{variant:"primary",children:"Share"})]})})},{id:"result-custom-icon",zh:{title:"自定义图标",description:"icon 可替换默认状态图标。",codeToggle:"查看自定义图标代码"},en:{title:"Custom icon",description:"Use icon to replace the default status icon.",codeToggle:"View result icon code"},code:`import { Result } from '@cinna-design/react';

export default () => <Result icon="OK" title="Custom icon result" />;`,render:()=>e.jsx(t,{icon:"OK",title:"Custom icon result"})},{id:"result-subtitle",zh:{title:"长说明",description:"subTitle 支持 ReactNode，可承载更完整的结果说明。",codeToggle:"查看长说明代码"},en:{title:"Long description",description:"subTitle accepts ReactNode for richer result details.",codeToggle:"View result subtitle code"},code:`import { Result, Text } from '@cinna-design/react';

export default () => (
  <Result
    status="warning"
    title="Some fields need attention"
    subTitle={<Text tone="secondary">Check price, pickup time, and inventory before publishing.</Text>}
  />
);`,render:()=>e.jsx(t,{status:"warning",title:"Some fields need attention",subTitle:e.jsx(g,{tone:"secondary",children:"Check price, pickup time, and inventory before publishing."})})}]};export{w as resultDoc};
