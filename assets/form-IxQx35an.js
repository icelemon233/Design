import{r as m,j as e,B as l}from"./index-BZKQtVdI.js";import{F as a,a as r}from"./index-Dazdylvb.js";import{I as t}from"./index-CKsv-bR_.js";import{S as o}from"./index-CGJnK8xI.js";function c(){const[i]=a.useForm(),[n,s]=m.useState("");return e.jsxs(a,{form:i,initialValues:{name:"Cloud cake"},onFinish:d=>s(String(d.name)),children:[e.jsx(r,{name:"name",label:"Recipe name",rules:[{required:!0,message:"Enter a recipe name."},{min:3,message:"Use at least three characters."}],children:e.jsx(t,{placeholder:"Recipe name"})}),e.jsxs(o,{wrap:!0,children:[e.jsx(l,{htmlType:"submit",children:"Save recipe"}),e.jsx(l,{variant:"cream",onClick:()=>{i.resetFields(),s("")},children:"Reset recipe"})]}),n&&e.jsxs("p",{role:"status",children:["Saved: ",n]})]})}const u=`import { Button, Form, FormItem, Input, Space } from '@cinna-design/react';
import { useState } from 'react';
export default function ValidatedForm() {
  const [form] = Form.useForm();
  const [saved, setSaved] = useState('');
  return (
    <Form
      form={form}
      initialValues={{ name: 'Cloud cake' }}
      onFinish={(values) => setSaved(String(values.name))}
    >
      <FormItem
        name="name"
        label="Recipe name"
        rules={[
          { required: true, message: 'Enter a recipe name.' },
          { min: 3, message: 'Use at least three characters.' },
        ]}
      >
        <Input placeholder="Recipe name" />
      </FormItem>
      <Space wrap>
        <Button htmlType="submit">Save recipe</Button>
        <Button
          variant="cream"
          onClick={() => {
            form.resetFields();
            setSaved('');
          }}
        >
          Reset recipe
        </Button>
      </Space>
      {saved && <p role="status">Saved: {saved}</p>}
    </Form>
  );
}
`,x={examples:[{id:"enhanced-form",zh:{title:"校验、提交和重置",description:"通过字段名绑定值；必填、长度和异步规则可组合使用。",codeToggle:"查看完整示例代码"},en:{title:"Validation, submit and reset",description:"Bind values by field name and combine validation rules.",codeToggle:"View complete example"},code:u,render:()=>e.jsx(c,{})},{id:"basic-form",zh:{title:"基本表单",description:"使用 Form 和 FormItem 组织标签、输入框、帮助信息和提交按钮。",codeToggle:"查看基本表单代码"},en:{title:"Basic form",description:"Use Form and FormItem to organize labels, fields, help text, and submit actions.",codeToggle:"View basic form code"},code:`import { Button, Form, FormItem, Input } from '@cinna-design/react';

export default () => (
  <Form onSubmit={(event) => event.preventDefault()}>
    <FormItem label="Project name" required help="Use a short public name.">
      <Input placeholder="Cinna docs" />
    </FormItem>
    <Button htmlType="submit">Create project</Button>
  </Form>
);`,render:()=>e.jsx("div",{style:{width:"min(520px, 100%)"},children:e.jsxs(a,{onSubmit:i=>i.preventDefault(),children:[e.jsx(r,{label:"Project name",required:!0,help:"Use a short public name.",children:e.jsx(t,{placeholder:"Cinna docs"})}),e.jsx(l,{htmlType:"submit",children:"Create project"})]})})},{id:"form-layouts",zh:{title:"表单布局",description:"layout 支持 vertical、horizontal 和 inline，用于不同密度的录入场景。",codeToggle:"查看表单布局代码"},en:{title:"Form layouts",description:"layout supports vertical, horizontal, and inline for different input densities.",codeToggle:"View form layout code"},code:`import { Button, Form, FormItem, Input, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" size="large">
    <Form layout="vertical">
      <FormItem label="Vertical">
        <Input placeholder="Stacked label" />
      </FormItem>
    </Form>
    <Form layout="horizontal">
      <FormItem label="Horizontal">
        <Input placeholder="Label beside field" />
      </FormItem>
    </Form>
    <Form layout="inline">
      <FormItem label="Inline">
        <Input placeholder="Compact field" />
      </FormItem>
      <Button>Search</Button>
    </Form>
  </Space>
);`,render:()=>e.jsxs(o,{direction:"vertical",align:"stretch",size:"large",style:{width:"min(620px, 100%)"},children:[e.jsx(a,{layout:"vertical",children:e.jsx(r,{label:"Vertical",children:e.jsx(t,{placeholder:"Stacked label"})})}),e.jsx(a,{layout:"horizontal",children:e.jsx(r,{label:"Horizontal",children:e.jsx(t,{placeholder:"Label beside field"})})}),e.jsxs(a,{layout:"inline",children:[e.jsx(r,{label:"Inline",children:e.jsx(t,{placeholder:"Compact field"})}),e.jsx(l,{children:"Search"})]})]})},{id:"form-required-extra",zh:{title:"必填与辅助信息",description:"FormItem 的 required、help 和 extra 分别展示必填标记、当前提示和补充说明。",codeToggle:"查看必填与辅助信息代码"},en:{title:"Required and helper text",description:"FormItem required, help, and extra render the required mark, current hint, and extra copy.",codeToggle:"View required helper code"},code:`import { Form, FormItem, Input } from '@cinna-design/react';

export default () => (
  <Form>
    <FormItem
      label="Release alias"
      required
      help="Shown in release notes."
      extra="Keep it under 24 characters."
    >
      <Input placeholder="Cloud breakfast" />
    </FormItem>
  </Form>
);`,render:()=>e.jsx("div",{style:{width:"min(520px, 100%)"},children:e.jsx(a,{children:e.jsx(r,{label:"Release alias",required:!0,help:"Shown in release notes.",extra:"Keep it under 24 characters.",children:e.jsx(t,{placeholder:"Cloud breakfast"})})})})},{id:"form-validation-status",zh:{title:"校验状态",description:"validateStatus 与 help 搭配，用于展示成功、警告和错误反馈。",codeToggle:"查看校验状态代码"},en:{title:"Validation status",description:"Pair validateStatus with help to show success, warning, and error feedback.",codeToggle:"View validation status code"},code:`import { Form, FormItem, Input, Space } from '@cinna-design/react';

export default () => (
  <Form>
    <Space direction="vertical" align="stretch">
      <FormItem label="Slug" validateStatus="success" help="This slug is available.">
        <Input value="cloud-note" readOnly />
      </FormItem>
      <FormItem label="Summary" validateStatus="warning" help="A shorter summary will scan better.">
        <Input value="A very detailed launch summary" readOnly />
      </FormItem>
      <FormItem label="Owner" validateStatus="error" help="Owner is required before publishing.">
        <Input placeholder="Choose owner" />
      </FormItem>
    </Space>
  </Form>
);`,render:()=>e.jsx("div",{style:{width:"min(540px, 100%)"},children:e.jsx(a,{children:e.jsxs(o,{direction:"vertical",align:"stretch",children:[e.jsx(r,{label:"Slug",validateStatus:"success",help:"This slug is available.",children:e.jsx(t,{value:"cloud-note",readOnly:!0})}),e.jsx(r,{label:"Summary",validateStatus:"warning",help:"A shorter summary will scan better.",children:e.jsx(t,{value:"A very detailed launch summary",readOnly:!0})}),e.jsx(r,{label:"Owner",validateStatus:"error",help:"Owner is required before publishing.",children:e.jsx(t,{placeholder:"Choose owner"})})]})})})},{id:"form-disabled-submit",zh:{title:"禁用与原生提交",description:"disabled 会让表单整体不可交互，Form 也继承原生 form 的提交属性。",codeToggle:"查看禁用与提交代码"},en:{title:"Disabled and native submit",description:"disabled makes the form non-interactive, and Form also extends native form submit attributes.",codeToggle:"View disabled submit code"},code:`import { Button, Form, FormItem, Input, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Form disabled>
      <FormItem label="Locked name">
        <Input value="Archived project" readOnly />
      </FormItem>
    </Form>
    <Form name="search" onSubmit={(event) => event.preventDefault()}>
      <FormItem label="Keyword">
        <Input name="keyword" placeholder="Search docs" />
      </FormItem>
      <Button htmlType="submit" variant="secondary">Submit</Button>
    </Form>
  </Space>
);`,render:()=>e.jsxs(o,{direction:"vertical",align:"stretch",style:{width:"min(540px, 100%)"},children:[e.jsx(a,{disabled:!0,children:e.jsx(r,{label:"Locked name",children:e.jsx(t,{value:"Archived project",readOnly:!0})})}),e.jsxs(a,{name:"search",onSubmit:i=>i.preventDefault(),children:[e.jsx(r,{label:"Keyword",children:e.jsx(t,{name:"keyword",placeholder:"Search docs"})}),e.jsx(l,{htmlType:"submit",variant:"secondary",children:"Submit"})]})]})}]};export{x as formDoc};
