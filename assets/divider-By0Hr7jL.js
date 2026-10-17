import{j as e}from"./index-Ce0SFtqJ.js";import{b as c,P as d,T as t}from"./index-DMVNuElq.js";import{D as i}from"./index-C0phAwGR.js";import{S as r}from"./index-CJ3PbIrN.js";const s={examples:[{id:"horizontal-divider",zh:{title:"水平分割线",description:"用于拆开段落、模块说明和内容区块。",codeToggle:"查看水平分割线代码"},en:{title:"Horizontal divider",description:"Separate paragraphs, module notes, and content sections.",codeToggle:"View horizontal divider code"},code:`import { Divider, Paragraph, Typography } from '@cinna-design/react';

export default () => (
  <Typography compact>
    <Paragraph>Cloud cake is ready for review.</Paragraph>
    <Divider />
    <Paragraph muted>Use dividers when two blocks need a quiet visual pause.</Paragraph>
  </Typography>
);`,render:()=>e.jsxs(c,{compact:!0,children:[e.jsx(d,{children:"Cloud cake is ready for review."}),e.jsx(i,{}),e.jsx(d,{muted:!0,children:"Use dividers when two blocks need a quiet visual pause."})]})},{id:"divider-with-text",zh:{title:"带文字与位置",description:"通过 left 和 right 快捷属性控制文字靠左、居中或靠右。",codeToggle:"查看带文字分割线代码"},en:{title:"With text and placement",description:"Use left and right shortcuts to place divider text on the left, center, or right.",codeToggle:"View text divider code"},code:`import { Divider, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" block>
    <Divider left>Left text</Divider>
    <Divider>Center text</Divider>
    <Divider right>Right text</Divider>
  </Space>
);`,render:()=>e.jsxs(r,{direction:"vertical",block:!0,children:[e.jsx(i,{left:!0,children:"Left text"}),e.jsx(i,{children:"Center text"}),e.jsx(i,{right:!0,children:"Right text"})]})},{id:"divider-color-and-character",zh:{title:"颜色与自定义字符",description:"color 可统一调整线和文字颜色，character 可用自定义字符组成分割线。",codeToggle:"查看颜色与字符代码"},en:{title:"Color and custom characters",description:"Use color for the line and label, and character to build the divider from custom marks.",codeToggle:"View color and character code"},code:`import { Divider, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" block>
    <Divider color="#73c4e0">Blue sugar line</Divider>
    <Divider color="#ef8f8f" character="✦">Star sprinkle line</Divider>
    <Divider color="#9bcb8e" character="·" plain>Mint dot line</Divider>
  </Space>
);`,render:()=>e.jsxs(r,{direction:"vertical",block:!0,children:[e.jsx(i,{color:"#73c4e0",children:"Blue sugar line"}),e.jsx(i,{color:"#ef8f8f",character:"✦",children:"Star sprinkle line"}),e.jsx(i,{color:"#9bcb8e",character:"·",plain:!0,children:"Mint dot line"})]})},{id:"divider-custom-placement",zh:{title:"自定义文字位置",description:"left 和 right 也可以传入距离，让文字在更精确的位置展示。",codeToggle:"查看自定义位置代码"},en:{title:"Custom text placement",description:"Pass a distance to left or right for more precise label placement.",codeToggle:"View custom placement code"},code:`import { Divider, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" block>
    <Divider left="12%">Recipe start</Divider>
    <Divider right={64}>Ready for review</Divider>
  </Space>
);`,render:()=>e.jsxs(r,{direction:"vertical",block:!0,children:[e.jsx(i,{left:"12%",children:"Recipe start"}),e.jsx(i,{right:64,children:"Ready for review"})]})},{id:"plain-and-dashed",zh:{title:"正文样式与虚线",description:"可用 plain 弱化文字，也可关闭 dashed 得到实线。",codeToggle:"查看正文样式代码"},en:{title:"Plain text and dashed",description:"Use plain for lighter text, and turn dashed off for a solid divider.",codeToggle:"View plain divider code"},code:`import { Divider, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" block>
    <Divider plain>Plain divider copy</Divider>
    <Divider dashed>Dashed divider</Divider>
    <Divider dashed={false}>Solid divider</Divider>
  </Space>
);`,render:()=>e.jsxs(r,{direction:"vertical",block:!0,children:[e.jsx(i,{plain:!0,children:"Plain divider copy"}),e.jsx(i,{dashed:!0,children:"Dashed divider"}),e.jsx(i,{dashed:!1,children:"Solid divider"})]})},{id:"vertical-divider",zh:{title:"垂直分割线",description:"用于行内文字、链接或操作项之间的轻量分隔。",codeToggle:"查看垂直分割线代码"},en:{title:"Vertical divider",description:"Separate inline text, links, or compact actions.",codeToggle:"View vertical divider code"},code:`import { Divider, Space, Text } from '@cinna-design/react';

export default () => (
  <Space>
    <Text>Preview</Text>
    <Divider vertical />
    <Text>Copy</Text>
    <Divider vertical />
    <Text tone="error">Delete</Text>
  </Space>
);`,render:()=>e.jsxs(r,{children:[e.jsx(t,{children:"Preview"}),e.jsx(i,{vertical:!0}),e.jsx(t,{children:"Copy"}),e.jsx(i,{vertical:!0}),e.jsx(t,{tone:"error",children:"Delete"})]})}]};export{s as dividerDoc};
