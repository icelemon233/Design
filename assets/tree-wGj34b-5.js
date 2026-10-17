import{r as i,j as e,R as o}from"./index-_8eXcLz2.js";import{T as t}from"./index-Oy7xcklE.js";import{T as l}from"./index-DV4i4EP4.js";import{S as n}from"./index-n3tSMIzx.js";import{T as d}from"./index-BAwLJX5K.js";import"./useControllable-BAjGFdKN.js";import"./index-DUJ1f9j5.js";function p(){const[r,c]=i.useState([]),[a,s]=i.useState(["recipes"]);return e.jsxs(e.Fragment,{children:[e.jsx(t,{checkable:!0,checkedKeys:r,onCheck:c,expandedKeys:a,onExpand:s,treeData:[{key:"recipes",title:"Recipes",children:[{key:"cloud",title:"Cloud cake"},{key:"cinnamon",title:"Cinnamon tart"},{key:"locked",title:"Archived recipe",disabled:!0}]}]}),e.jsxs("p",{role:"status",children:["Checked: ",r.join(", ")||"none"]})]})}const k=`import { Tree } from '@cinna-design/react';
import { useState } from 'react';
export default function CheckedTreeDemo() {
  const [checked, setChecked] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(['recipes']);
  return (
    <>
      <Tree
        checkable
        checkedKeys={checked}
        onCheck={setChecked}
        expandedKeys={expanded}
        onExpand={setExpanded}
        treeData={[
          {
            key: 'recipes',
            title: 'Recipes',
            children: [
              { key: 'cloud', title: 'Cloud cake' },
              { key: 'cinnamon', title: 'Cinnamon tart' },
              { key: 'locked', title: 'Archived recipe', disabled: true },
            ],
          },
        ]}
      />
      <p role="status">Checked: {checked.join(', ') || 'none'}</p>
    </>
  );
}
`,f={examples:[{id:"enhanced-tree",zh:{title:"受控展开与勾选",description:"勾选父节点会联动可用的子节点；禁用节点不会被修改。",codeToggle:"查看完整示例代码"},en:{title:"Controlled expansion and checks",description:"Checking a parent affects enabled children; disabled nodes remain unchanged.",codeToggle:"View complete example"},code:k,render:()=>e.jsx(p,{})},{id:"basic-tree",zh:{title:"基本树",description:"treeData 使用 key、title 和 children 描述层级结构。",codeToggle:"查看基本树代码"},en:{title:"Basic tree",description:"Use key, title, and children in treeData to describe hierarchy.",codeToggle:"View basic tree code"},code:`import { Tree } from '@cinna-design/react';

const treeData = [
  {
    key: 'bakery',
    title: 'Bakery',
    children: [
      { key: 'cakes', title: 'Cakes' },
      { key: 'drinks', title: 'Drinks' },
    ],
  },
];

export default () => <Tree treeData={treeData} />;`,render:()=>e.jsx(t,{treeData:[{key:"bakery",title:"Bakery",children:[{key:"cakes",title:"Cakes"},{key:"drinks",title:"Drinks"}]}]})},{id:"tree-expanded",zh:{title:"默认展开",description:"defaultExpandedKeys 指定初始展开的分支节点。",codeToggle:"查看默认展开代码"},en:{title:"Default expanded",description:"Use defaultExpandedKeys to set initially expanded branch nodes.",codeToggle:"View default expanded tree code"},code:`import { Tree } from '@cinna-design/react';

const treeData = [
  {
    key: 'workspace',
    title: 'Workspace',
    children: [
      {
        key: 'docs',
        title: 'Docs',
        children: [
          { key: 'intro', title: 'Intro' },
          { key: 'release', title: 'Release notes' },
        ],
      },
      { key: 'assets', title: 'Assets' },
    ],
  },
];

export default () => <Tree treeData={treeData} defaultExpandedKeys={['workspace', 'docs']} />;`,render:()=>e.jsx(t,{defaultExpandedKeys:["workspace","docs"],treeData:[{key:"workspace",title:"Workspace",children:[{key:"docs",title:"Docs",children:[{key:"intro",title:"Intro"},{key:"release",title:"Release notes"}]},{key:"assets",title:"Assets"}]}]})},{id:"tree-selectable",zh:{title:"可选节点",description:"selectable 开启叶子节点选择，defaultSelectedKey 设置默认选中项。",codeToggle:"查看可选节点代码"},en:{title:"Selectable nodes",description:"Use selectable for leaf selection and defaultSelectedKey for the initial selected item.",codeToggle:"View selectable tree code"},code:`import { Tree } from '@cinna-design/react';

const treeData = [
  {
    key: 'menu',
    title: 'Menu',
    children: [
      { key: 'classic', title: 'Classic set' },
      { key: 'seasonal', title: 'Seasonal set' },
    ],
  },
];

export default () => (
  <Tree treeData={treeData} selectable defaultSelectedKey="seasonal" />
);`,render:()=>e.jsx(t,{selectable:!0,defaultSelectedKey:"seasonal",treeData:[{key:"menu",title:"Menu",children:[{key:"classic",title:"Classic set"},{key:"seasonal",title:"Seasonal set"}]}]})},{id:"tree-controlled",zh:{title:"受控选中",description:"selectedKey 与 onSelect 可把当前选择同步给外部状态。",codeToggle:"查看受控选中代码"},en:{title:"Controlled selection",description:"Use selectedKey and onSelect to sync the current selection with external state.",codeToggle:"View controlled tree code"},code:`import { Space, Text, Tree } from '@cinna-design/react';
import { useState } from 'react';

const treeData = [
  {
    key: 'regions',
    title: 'Regions',
    children: [
      { key: 'north', title: 'North shop' },
      { key: 'south', title: 'South shop' },
    ],
  },
];

export default () => {
  const [selected, setSelected] = useState('north');

  return (
    <Space direction="vertical" align="flex-start">
      <Tree treeData={treeData} selectable selectedKey={selected} onSelect={setSelected} />
      <Text tone="secondary">Selected: {selected}</Text>
    </Space>
  );
};`,render:()=>{const r=()=>{const[c,a]=o.useState("north");return e.jsxs(n,{direction:"vertical",align:"flex-start",children:[e.jsx(t,{selectable:!0,selectedKey:c,onSelect:a,treeData:[{key:"regions",title:"Regions",children:[{key:"north",title:"North shop"},{key:"south",title:"South shop"}]}]}),e.jsxs(d,{tone:"secondary",children:["Selected: ",c]})]})};return e.jsx(r,{})}},{id:"tree-rich-title",zh:{title:"节点标题内容",description:"title 支持 ReactNode，可组合文本与轻量标记。",codeToggle:"查看节点标题代码"},en:{title:"Node title content",description:"title accepts ReactNode, so text can be combined with lightweight markers.",codeToggle:"View tree title code"},code:`import { Tag, Tree } from '@cinna-design/react';

const treeData = [
  {
    key: 'pipeline',
    title: 'Pipeline',
    children: [
      { key: 'ready', title: <>Ready <Tag color="pistachio">12</Tag></> },
      { key: 'blocked', title: <>Blocked <Tag color="strawberry">3</Tag></> },
    ],
  },
];

export default () => <Tree treeData={treeData} selectable />;`,render:()=>e.jsx(t,{selectable:!0,treeData:[{key:"pipeline",title:"Pipeline",children:[{key:"ready",title:e.jsxs(e.Fragment,{children:["Ready ",e.jsx(l,{color:"pistachio",children:"12"})]})},{key:"blocked",title:e.jsxs(e.Fragment,{children:["Blocked ",e.jsx(l,{color:"strawberry",children:"3"})]})}]}]})}]};export{f as treeDoc};
