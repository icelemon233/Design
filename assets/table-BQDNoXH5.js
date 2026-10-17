import{r as x,j as t,R as O,c as M}from"./index-42cP9WwP.js";import{C as F}from"./index-U-tp-t51.js";import{P as ne}from"./index-9yLKRht3.js";import{e as oe}from"./ComponentPage-3kNlcmh3.js";import{T as se}from"./index-BCtRd6bT.js";import{S as re}from"./index-1s6UphMX.js";import{T as ce}from"./index-Csiu30sr.js";function f({columns:s,dataSource:c,rowKey:o,bordered:d,size:I="medium",emptyText:A="No data",rowSelection:m,loading:_,pagination:h=!1,scroll:N,onSortChange:W,onFilterChange:H,expandable:u,onRow:L,className:q,...G}){const[J,Q]=x.useState(null),[T,U]=x.useState({}),[X,Y]=x.useState([]),[Z,D]=x.useState(typeof h=="object"?h.defaultCurrent??1:1),[$,ee]=x.useState(u?.defaultExpandedRowKeys??[]),K=(e,n)=>{const a=typeof o=="function"?o(e,n):o?e[o]:e.key??n;return typeof a=="string"||typeof a=="number"?a:n},g=m?.selectedRowKeys??X,y=u?.expandedRowKeys??$,k=(e,n)=>e.key??String(e.dataIndex??n),b=s.findIndex(e=>e.sortOrder!==void 0),i=b<0?J:s[b].sortOrder?{key:k(s[b],b),direction:s[b].sortOrder}:null,j=x.useMemo(()=>{let e=c.map((n,a)=>({record:n,index:a,key:K(n,a)}));if(s.forEach((n,a)=>{const r=n.filteredValue??T[k(n,a)];r&&n.onFilter&&(e=e.filter(p=>n.onFilter(r,p.record)))}),i){const n=s.find((a,r)=>k(a,r)===i.key);n?.sorter&&(e=[...e].sort((a,r)=>i.direction==="asc"?n.sorter(a.record,r.record):n.sorter(r.record,a.record)))}return e},[s,c,o,T,i?.key,i?.direction]),C=typeof h=="object"?h:{},w=Math.max(1,C.pageSize??10),te=Math.max(1,Math.ceil(j.length/w)),R=Math.max(1,Math.min(te,C.current??Z)),z=h?j.slice((R-1)*w,R*w):j,S=z.filter(e=>!m?.getCheckboxProps?.(e.record).disabled),V=S.length>0&&S.every(e=>g.includes(e.key)),ae=S.some(e=>g.includes(e.key)),P=e=>{m?.selectedRowKeys===void 0&&Y(e),m?.onChange?.(e,c.filter((n,a)=>e.includes(K(n,a))))},B=Math.max(1,s.length+(m?1:0)+(u?1:0));return t.jsxs("div",{...G,className:M("cinna-table","cinna-table--"+I,d&&"cinna-table--bordered",q),"aria-busy":_||void 0,children:[_&&t.jsx("div",{className:"cinna-table__loading",role:"status",children:"Loading…"}),t.jsx("div",{className:"cinna-table__scroll",style:{overflow:"auto",maxHeight:N?.y},children:t.jsxs("table",{style:{minWidth:N?.x},children:[t.jsx("thead",{children:t.jsxs("tr",{children:[u&&t.jsx("th",{"aria-label":"Expand rows"}),m&&t.jsx("th",{className:"cinna-table__selection",children:t.jsx(F,{"aria-label":"Select all rows",checked:V,indeterminate:!V&&ae,disabled:!S.length,onChange:e=>P(e.target.checked?[...new Set([...g,...S.map(n=>n.key)])]:g.filter(n=>!S.some(a=>a.key===n)))})}),s.map((e,n)=>{const a=k(e,n);return t.jsxs("th",{style:{textAlign:e.align,width:e.width},"aria-sort":e.sorter?i?.key===a?i.direction==="asc"?"ascending":"descending":"none":void 0,children:[e.sorter?t.jsxs("button",{type:"button",className:"cinna-table__sorter",onClick:()=>{const r=i?.key!==a?{key:a,direction:"asc"}:i.direction==="asc"?{key:a,direction:"desc"}:null;b<0&&Q(r),W?.(r)},children:[e.title,t.jsx("span",{"aria-hidden":"true",children:i?.key===a?i.direction==="asc"?"↑":"↓":"↕"})]}):e.title,e.filters&&t.jsxs("select",{className:"cinna-table__filter","aria-label":"Filter "+(typeof e.title=="string"?e.title:a),value:e.filteredValue??T[a]??"",onChange:r=>{const p={...T,[a]:r.target.value};U(p),D(1),H?.(p)},children:[t.jsx("option",{value:"",children:"All"}),e.filters.map(r=>t.jsx("option",{value:r.value,children:r.text},r.value))]})]},a)})]})}),t.jsx("tbody",{children:z.length?z.map(({record:e,index:n,key:a},r)=>{const p=L?.(e,n);return t.jsxs(O.Fragment,{children:[t.jsxs("tr",{...p,className:M(g.includes(a)&&"cinna-table__row--selected",p?.className),children:[u&&t.jsx("td",{children:t.jsx("button",{type:"button","aria-label":"Expand row "+(r+1),"aria-expanded":y.includes(a),onClick:()=>{const l=y.includes(a)?y.filter(v=>v!==a):[...y,a];u.expandedRowKeys===void 0&&ee(l),u.onExpandedRowsChange?.(l)},children:y.includes(a)?"−":"+"})}),m&&t.jsx("td",{className:"cinna-table__selection",children:t.jsx(F,{"aria-label":"Select row "+(r+1),disabled:m.getCheckboxProps?.(e).disabled,checked:g.includes(a),onChange:l=>P(l.target.checked?[...new Set([...g,a])]:g.filter(v=>v!==a))})}),s.map((l,v)=>{const E=l.dataIndex?e[l.dataIndex]:void 0;return t.jsx("td",{style:{textAlign:l.align},children:l.render?l.render(E,e,n):oe(E)},k(l,v))})]}),u&&y.includes(a)&&t.jsx("tr",{children:t.jsx("td",{colSpan:B,children:u.expandedRowRender(e,n)})})]},a)}):t.jsx("tr",{children:t.jsx("td",{className:"cinna-table__empty",colSpan:B,children:A})})})]})}),h&&t.jsx("div",{className:"cinna-table__pagination",children:t.jsx(ne,{current:R,total:j.length,pageSize:w,onChange:e=>{C.current===void 0&&D(e),C.onChange?.(e,w)}})})]})}const de=[{key:1,name:"Cloud cake",category:"cake",servings:8},{key:2,name:"Cinnamon tart",category:"tart",servings:6},{key:3,name:"Blueberry cake",category:"cake",servings:4},{key:4,name:"Vanilla cloud",category:"cake",servings:10}];function ie(){const[s,c]=x.useState([]);return t.jsxs(t.Fragment,{children:[t.jsx(f,{dataSource:de,pagination:{pageSize:2},rowSelection:{selectedRowKeys:s,onChange:o=>c(o)},columns:[{title:"Recipe",dataIndex:"name",sorter:(o,d)=>o.name.localeCompare(d.name)},{title:"Category",dataIndex:"category",filters:[{text:"Cake",value:"cake"},{text:"Tart",value:"tart"}],onFilter:(o,d)=>d.category===o},{title:"Servings",dataIndex:"servings",sorter:(o,d)=>o.servings-d.servings}],expandable:{expandedRowRender:o=>t.jsxs("p",{children:["Prepare ",o.servings," servings of ",o.name,"."]})}}),t.jsxs("p",{role:"status",children:["Selected recipes: ",s.length]})]})}const le=`import { Table } from '@cinna-design/react';
import { useState } from 'react';
const recipes = [
  { key: 1, name: 'Cloud cake', category: 'cake', servings: 8 },
  { key: 2, name: 'Cinnamon tart', category: 'tart', servings: 6 },
  { key: 3, name: 'Blueberry cake', category: 'cake', servings: 4 },
  { key: 4, name: 'Vanilla cloud', category: 'cake', servings: 10 },
];
export default function TableWorkflowDemo() {
  const [selected, setSelected] = useState<Array<string | number>>([]);
  return (
    <>
      <Table
        dataSource={recipes}
        pagination={{ pageSize: 2 }}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: (keys) => setSelected(keys as Array<string | number>),
        }}
        columns={[
          { title: 'Recipe', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
          {
            title: 'Category',
            dataIndex: 'category',
            filters: [
              { text: 'Cake', value: 'cake' },
              { text: 'Tart', value: 'tart' },
            ],
            onFilter: (value, record) => record.category === value,
          },
          { title: 'Servings', dataIndex: 'servings', sorter: (a, b) => a.servings - b.servings },
        ]}
        expandable={{
          expandedRowRender: (record) => (
            <p>
              Prepare {record.servings} servings of {record.name}.
            </p>
          ),
        }}
      />
      <p role="status">Selected recipes: {selected.length}</p>
    </>
  );
}
`,be={examples:[{id:"enhanced-table",zh:{title:"排序、筛选与分页",description:"稳定的行键使排序、选择、展开和分页可以组合使用。",codeToggle:"查看完整示例代码"},en:{title:"Sort, filter and paginate",description:"Stable row keys let sorting, selection, expansion and pagination work together.",codeToggle:"View complete example"},code:le,render:()=>t.jsx(ie,{})},{id:"basic-table",zh:{title:"基本表格",description:"通过 columns 描述列，通过 dataSource 提供行数据。",codeToggle:"查看基本表格代码"},en:{title:"Basic table",description:"Describe columns with columns and provide rows with dataSource.",codeToggle:"View basic table code"},code:`import { Table } from '@cinna-design/react';

const columns = [
  { title: 'Component', dataIndex: 'component' },
  { title: 'Owner', dataIndex: 'owner' },
  { title: 'Status', dataIndex: 'status' },
];

const dataSource = [
  { key: 'button', component: 'Button', owner: 'Design', status: 'Ready' },
  { key: 'table', component: 'Table', owner: 'Docs', status: 'Review' },
  { key: 'modal', component: 'Modal', owner: 'Product', status: 'Draft' },
];

export default () => <Table columns={columns} dataSource={dataSource} />;`,render:()=>{const s=[{title:"Component",dataIndex:"component"},{title:"Owner",dataIndex:"owner"},{title:"Status",dataIndex:"status"}],c=[{key:"button",component:"Button",owner:"Design",status:"Ready"},{key:"table",component:"Table",owner:"Docs",status:"Review"},{key:"modal",component:"Modal",owner:"Product",status:"Draft"}];return t.jsx(f,{columns:s,dataSource:c})}},{id:"table-render-align",zh:{title:"自定义渲染与对齐",description:"render 可自定义单元格内容，align 和 width 控制列的展示方式。",codeToggle:"查看自定义渲染代码"},en:{title:"Custom render and alignment",description:"render customizes cells, while align and width control column presentation.",codeToggle:"View render alignment code"},code:`import { Table, Tag } from '@cinna-design/react';

const columns = [
  { title: 'Task', dataIndex: 'task', width: 180 },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (value) => <Tag color={value === 'Ready' ? 'pistachio' : 'butter'}>{value}</Tag>,
  },
  { title: 'Score', dataIndex: 'score', align: 'right' },
];

const dataSource = [
  { key: '1', task: 'Docs pass', status: 'Ready', score: 98 },
  { key: '2', task: 'Visual review', status: 'Review', score: 86 },
];

export default () => <Table columns={columns} dataSource={dataSource} />;`,render:()=>{const s=[{title:"Task",dataIndex:"task",width:180},{title:"Status",dataIndex:"status",render:o=>t.jsx(se,{color:o==="Ready"?"pistachio":"butter",children:String(o)})},{title:"Score",dataIndex:"score",align:"right"}],c=[{key:"1",task:"Docs pass",status:"Ready",score:98},{key:"2",task:"Visual review",status:"Review",score:86}];return t.jsx(f,{columns:s,dataSource:c})}},{id:"table-sorter",zh:{title:"列排序",description:"为列设置 sorter 后，点击表头可以在升序和降序之间切换。",codeToggle:"查看列排序代码"},en:{title:"Column sorting",description:"Set sorter on a column to toggle ascending and descending order from the header.",codeToggle:"View sorter code"},code:`import { Table } from '@cinna-design/react';

const columns = [
  { title: 'Component', dataIndex: 'component', sorter: (a, b) => a.component.localeCompare(b.component) },
  { title: 'Score', dataIndex: 'score', align: 'right', sorter: (a, b) => a.score - b.score },
];

const dataSource = [
  { key: 'input', component: 'Input', score: 91 },
  { key: 'button', component: 'Button', score: 98 },
  { key: 'card', component: 'Card', score: 94 },
];

export default () => <Table columns={columns} dataSource={dataSource} />;`,render:()=>{const s=[{title:"Component",dataIndex:"component",sorter:(o,d)=>o.component.localeCompare(d.component)},{title:"Score",dataIndex:"score",align:"right",sorter:(o,d)=>o.score-d.score}],c=[{key:"input",component:"Input",score:91},{key:"button",component:"Button",score:98},{key:"card",component:"Card",score:94}];return t.jsx(f,{columns:s,dataSource:c})}},{id:"table-selection-row-key",zh:{title:"行选择与 rowKey",description:"rowSelection 启用行选择，rowKey 可指定每行的稳定 key。",codeToggle:"查看行选择代码"},en:{title:"Row selection and rowKey",description:"rowSelection enables row selection, and rowKey defines the stable key for each row.",codeToggle:"View row selection code"},code:`import { Space, Table, Text } from '@cinna-design/react';
import { useState, type Key } from 'react';

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Name', dataIndex: 'name' },
];

const dataSource = [
  { id: 'button', name: 'Button docs' },
  { id: 'table', name: 'Table docs' },
  { id: 'tag', name: 'Tag docs' },
];

export default () => {
  const [selected, setSelected] = useState<Key[]>(['button']);

  return (
    <Space direction="vertical" align="stretch">
      <Table rowKey="id" columns={columns} dataSource={dataSource} rowSelection={{ selectedRowKeys: selected, onChange: setSelected }} />
      <Text tone="secondary">Selected: {selected.join(', ')}</Text>
    </Space>
  );
};`,render:()=>{const s=()=>{const[c,o]=O.useState(["button"]),d=[{title:"ID",dataIndex:"id"},{title:"Name",dataIndex:"name"}],I=[{id:"button",name:"Button docs"},{id:"table",name:"Table docs"},{id:"tag",name:"Tag docs"}];return t.jsxs(re,{direction:"vertical",align:"stretch",children:[t.jsx(f,{rowKey:"id",columns:d,dataSource:I,rowSelection:{selectedRowKeys:c,onChange:o}}),t.jsxs(ce,{tone:"secondary",children:["Selected: ",c.join(", ")]})]})};return t.jsx(s,{})}},{id:"table-bordered-empty-size",zh:{title:"边框、尺寸与空态",description:"bordered 显示表格边框，size 调整单元格密度，emptyText 定义无数据文案。",codeToggle:"查看边框尺寸代码"},en:{title:"Border, size, and empty state",description:"bordered shows table borders, size adjusts density, and emptyText customizes empty copy.",codeToggle:"View border size code"},code:`import { Table } from '@cinna-design/react';

const columns = [
  { title: 'Component', dataIndex: 'component' },
  { title: 'Status', dataIndex: 'status' },
];

export default () => (
  <Table
    bordered
    size="small"
    columns={columns}
    dataSource={[]}
    emptyText="No components found"
  />
);`,render:()=>{const s=[{title:"Component",dataIndex:"component"},{title:"Status",dataIndex:"status"}];return t.jsx(f,{bordered:!0,size:"small",columns:s,dataSource:[],emptyText:"No components found"})}}]};export{be as tableDoc};
